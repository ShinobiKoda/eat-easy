import { supabase } from "../config/supabaseClient";

export interface Coupon {
  id: string;
  userId: string;
  code: string;
  type: "welcome" | "milestone" | "free_drink";
  description: string;
  discountPercent: number;
  isFreeItem: boolean;
  isUsed: boolean;
  expiresAt: string;
  createdAt: string;
}

// In-memory cache for user's coupons
let userCouponsCache: Coupon[] | null = null;
let lastCouponsFetchTime = 0;
const COUPONS_CACHE_TTL = 1000 * 30; // 30 seconds

export const couponService = {
  invalidateCache() {
    userCouponsCache = null;
    lastCouponsFetchTime = 0;
  },

  /**
   * Fetches all coupons for the authenticated user.
   */
  async getUserCoupons(forceRefresh = false): Promise<Coupon[]> {
    if (
      !forceRefresh &&
      userCouponsCache &&
      Date.now() - lastCouponsFetchTime < COUPONS_CACHE_TTL
    ) {
      return userCouponsCache;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("eat_easy_coupons")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching coupons:", error);
      return [];
    }

    const coupons: Coupon[] = data.map((c: any) => ({
      id: c.id,
      userId: c.user_id,
      code: c.code,
      type: c.type,
      description: c.description,
      discountPercent: Number(c.discount_percent),
      isFreeItem: c.is_free_item,
      isUsed: c.is_used,
      expiresAt: c.expires_at,
      createdAt: c.created_at,
    }));

    userCouponsCache = coupons;
    lastCouponsFetchTime = Date.now();
    return coupons;
  },

  /**
   * Returns only active (not used, not expired) coupons.
   */
  async getActiveCoupons(forceRefresh = false): Promise<Coupon[]> {
    const allCoupons = await this.getUserCoupons(forceRefresh);
    const now = new Date();
    return allCoupons.filter((c) => !c.isUsed && new Date(c.expiresAt) > now);
  },

  /**
   * Generates a random alphanumeric code of given length.
   */
  generateCode(prefix: string, length = 6): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code}`;
  },

  /**
   * Grants a 30% welcome discount. Called during signup verification.
   */
  async grantWelcomeCoupon(userId: string) {
    // Check if one already exists to avoid duplicates
    const { data: existing } = await supabase
      .from("eat_easy_coupons")
      .select("id")
      .eq("user_id", userId)
      .eq("type", "welcome")
      .single();

    if (existing) return; // Already granted

    const code = this.generateCode("WELCOME", 6);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const { error } = await supabase.from("eat_easy_coupons").insert({
      user_id: userId,
      code,
      type: "welcome",
      description: "30% off your first order",
      discount_percent: 30.0,
      is_free_item: false,
      expires_at: expiresAt.toISOString(),
    });

    if (error) console.error("Error granting welcome coupon:", error);
    this.invalidateCache();
  },

  /**
   * Validates a discount code for the checkout page.
   */
  async validateCouponCode(code: string): Promise<Coupon | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("eat_easy_coupons")
      .select("*")
      .eq("user_id", user.id)
      .eq("code", code.toUpperCase().trim())
      .single();

    if (error || !data) throw new Error("Invalid discount code");

    const coupon: Coupon = {
      id: data.id,
      userId: data.user_id,
      code: data.code,
      type: data.type,
      description: data.description,
      discountPercent: Number(data.discount_percent),
      isFreeItem: data.is_free_item,
      isUsed: data.is_used,
      expiresAt: data.expires_at,
      createdAt: data.created_at,
    };

    if (coupon.isUsed) throw new Error("This coupon has already been used");
    if (new Date(coupon.expiresAt) < new Date())
      throw new Error("This coupon is expired");

    return coupon;
  },

  /**
   * Marks a coupon as used. Called after successful checkout.
   */
  async redeemCoupon(couponId: string) {
    const { error } = await supabase
      .from("eat_easy_coupons")
      .update({ is_used: true })
      .eq("id", couponId);

    if (error) throw error;
    this.invalidateCache();
  },

  /**
   * Main evaluation logic that runs after a user places an order.
   * Checks weekly milestones and free drink criteria.
   */
  async evaluatePostOrderRewards() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Get user's orders from the beginning of this week (Monday)
      const now = new Date();
      const currentDay = now.getDay() || 7; // 1 = Monday, 7 = Sunday
      const monday = new Date(now);
      monday.setHours(0, 0, 0, 0);
      monday.setDate(monday.getDate() - currentDay + 1);

      const { data: weekOrders, error: orderError } = await supabase
        .from("eat_easy_orders")
        .select("created_at, items")
        .eq("user_id", user.id)
        .gte("created_at", monday.toISOString());

      if (orderError) throw orderError;
      const orderCount = weekOrders?.length || 0;

      // 2. Fetch existing coupons granted this week to avoid re-granting
      const { data: weekCoupons } = await supabase
        .from("eat_easy_coupons")
        .select("type, discount_percent, created_at")
        .eq("user_id", user.id)
        .gte("created_at", monday.toISOString());

      const grantedThisWeek = weekCoupons || [];

      // --- Milestone Checks (15, 30, 50) ---
      let milestoneToGrant = null;
      let percentToGrant = null;

      if (
        orderCount >= 50 &&
        !grantedThisWeek.some(
          (c) => c.type === "milestone" && Number(c.discount_percent) === 15,
        )
      ) {
        milestoneToGrant = "50 Orders Milestone";
        percentToGrant = 15;
      } else if (
        orderCount >= 30 &&
        orderCount < 50 &&
        !grantedThisWeek.some(
          (c) => c.type === "milestone" && Number(c.discount_percent) === 10,
        )
      ) {
        milestoneToGrant = "30 Orders Milestone";
        percentToGrant = 10;
      } else if (
        orderCount >= 15 &&
        orderCount < 30 &&
        !grantedThisWeek.some(
          (c) => c.type === "milestone" && Number(c.discount_percent) === 5,
        )
      ) {
        milestoneToGrant = "15 Orders Milestone";
        percentToGrant = 5;
      }

      if (milestoneToGrant && percentToGrant) {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48); // Valid for 48 hours
        await supabase.from("eat_easy_coupons").insert({
          user_id: user.id,
          code: this.generateCode(`M${percentToGrant}`, 6),
          type: "milestone",
          description: `${percentToGrant}% Discount for reaching ${milestoneToGrant.split(" ")[0]} orders this week`,
          discount_percent: percentToGrant,
          expires_at: expiresAt.toISOString(),
        });
      }

      // --- Free Drink Check ---
      // Granted only if: 3 items ordered today + today is the deterministic random day + haven't got one this week
      const hasFreeDrinkThisWeek = grantedThisWeek.some(
        (c) => c.type === "free_drink",
      );

      if (!hasFreeDrinkThisWeek) {
        // Find orders placed exactly today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayOrders = (weekOrders || []).filter(
          (o: any) => new Date(o.created_at) >= todayStart,
        );

        let todayItemsCount = 0;
        todayOrders.forEach((o: any) => {
          if (Array.isArray(o.items)) {
            // Depending on order object structure. Assuming it's an array of { id, qty }
            o.items.forEach((item: any) => (todayItemsCount += item.qty || 1));
          }
        });

        if (todayItemsCount >= 3) {
          // Generate a deterministic offset for the user based on their ID to pick a random day index (0-6)
          const charSum = user.id
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0);
          // Combine with current ISO week number so the day can change week to week
          // Rough week number calculation:
          const oneJan = new Date(now.getFullYear(), 0, 1);
          const weekNum = Math.ceil(
            ((now.getTime() - oneJan.getTime()) / 86400000 +
              oneJan.getDay() +
              1) /
              7,
          );

          const luckyDayIndex = (charSum + weekNum) % 7; // 0 (Sunday) through 6 (Saturday)

          if (now.getDay() === luckyDayIndex) {
            // It's their lucky day and they bought 3 items!
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24); // Valid for 24 hours
            await supabase.from("eat_easy_coupons").insert({
              user_id: user.id,
              code: this.generateCode("DRINK", 5),
              type: "free_drink",
              description:
                "Free drink! You hit your 3-item threshold on your lucky day.",
              discount_percent: 0,
              is_free_item: true,
              expires_at: expiresAt.toISOString(),
            });
          }
        }
      }

      this.invalidateCache();
    } catch (err) {
      console.error("Error evaluating post-order rewards:", err);
    }
  },
};
