import { supabase } from "../config/supabaseClient";

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
}

export interface AdminUser {
  id: string; // the eat_easy_profile id
  userId: string; // the auth user id
  username: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AdminUserData {
  users: AdminUser[];
}

export interface AdminOrder {
  id: string;
  userId: string;
  restaurantName: string;
  items: any[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  createdAt: string;
}

// In-memory cache for admin status
let isAdminCache: boolean | null = null;
let lastAdminCheckTime = 0;
const ADMIN_CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// In-memory cache for dashboard data
let dashboardDataCache: {
  stats: AdminStats;
  users: AdminUser[];
  orders: AdminOrder[];
} | null = null;
let lastDataFetchTime = 0;
const DATA_CACHE_TTL = 1000 * 30; // 30 seconds

export const adminService = {
  /**
   * Clears the cached admin status and data. Usually called on logout or when explicitly refreshing.
   */
  invalidateCache() {
    isAdminCache = null;
    lastAdminCheckTime = 0;
    dashboardDataCache = null;
    lastDataFetchTime = 0;
  },

  /**
   * Clears only the data cache, useful for pull-to-refresh or explicit reload buttons.
   */
  invalidateDataCache() {
    dashboardDataCache = null;
    lastDataFetchTime = 0;
  },

  /**
   * Checks if the currently authenticated user is an admin.
   */
  async isCurrentUserAdmin(forceRefresh = false): Promise<boolean> {
    if (
      !forceRefresh &&
      isAdminCache !== null &&
      Date.now() - lastAdminCheckTime < ADMIN_CACHE_TTL
    ) {
      return isAdminCache;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      isAdminCache = false;
      return false;
    }

    const { data, error } = await supabase
      .from("eat_easy_profile")
      .select("is_admin")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      isAdminCache = false;
      return false;
    }

    isAdminCache = !!data.is_admin;
    lastAdminCheckTime = Date.now();
    return isAdminCache;
  },

  /**
   * Fetches all admin data in parallel.
   */
  async getAdminDashboardData(forceRefresh = false) {
    if (
      !forceRefresh &&
      dashboardDataCache &&
      Date.now() - lastDataFetchTime < DATA_CACHE_TTL
    ) {
      return dashboardDataCache;
    }

    // Verify admin access first before trying to fetch all data
    const isAdmin = await this.isCurrentUserAdmin();
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required.");
    }

    // Fetch all needed lists in parallel
    const [profilesRes, ordersRes] = await Promise.all([
      supabase
        .from("eat_easy_profile")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("eat_easy_orders")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (profilesRes.error)
      throw new Error(`Error fetching profiles: ${profilesRes.error.message}`);
    if (ordersRes.error)
      throw new Error(`Error fetching orders: ${ordersRes.error.message}`);

    const users: AdminUser[] = (profilesRes.data || []).map((p: any) => ({
      id: p.id,
      userId: p.user_id,
      username: p.username,
      email: p.email,
      phoneNumber: p.phone_number,
      isAdmin: p.is_admin,
      createdAt: p.created_at,
    }));

    const orders: AdminOrder[] = (ordersRes.data || []).map((o: any) => ({
      id: o.id,
      userId: o.user_id,
      restaurantName: o.restaurant_name,
      items: o.items || [],
      subtotal: Number(o.subtotal),
      tax: Number(o.tax),
      tip: Number(o.tip),
      total: Number(o.total),
      createdAt: o.created_at,
    }));

    // Compute stats
    const totalUsers = users.length;
    const totalOrders = orders.length;
    let totalRevenue = 0;

    for (const order of orders) {
      totalRevenue += order.total;
    }

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const stats: AdminStats = {
      totalUsers,
      totalOrders,
      totalRevenue,
      avgOrderValue,
    };

    dashboardDataCache = {
      stats,
      users,
      orders,
    };
    lastDataFetchTime = Date.now();

    return dashboardDataCache;
  },
};
