import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import { BiWallet, BiUser, BiCartAlt } from "react-icons/bi";
import { MdTrendingUp } from "react-icons/md";
import {
  SlideIn,
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "../components/animations/motion";
import {
  adminService,
  type AdminStats,
  type AdminUser,
  type AdminOrder,
} from "../services/adminService";

const tabs = ["Overview", "Users", "Orders"];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  const fetchDashboardData = async (forceRefresh = false) => {
    try {
      if (forceRefresh) setLoading(true);
      setError(null);

      const data = await adminService.getAdminDashboardData(forceRefresh);
      setStats(data.stats);
      setUsers(data.users);
      setOrders(data.orders);
    } catch (err: any) {
      console.error("Admin dashboard fetch error:", err);
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper for KPI Cards
  const renderKpiCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    bgColor: string,
    txtColor: string,
  ) => (
    <PopIn>
      <div className="rounded-2xl bg-white dark:bg-(--neutral-700) p-6 shadow-sm border border-(--neutral-150) dark:border-(--neutral-600) flex items-center justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-sm text-(--neutral-500) dark:text-(--neutral-300)">
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-(--neutral-900) dark:text-white heading-font">
            {value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} ${txtColor}`}
        >
          {icon}
        </div>
      </div>
    </PopIn>
  );

  return (
    <div className="w-full min-h-dvh">
      <MotionContainer className="transition-all duration-300">
        <Header description="Control Panel" navbarTitle="Admin Dashboard" />

        <div className="w-full pt-18 md:pt-30 px-4 md:px-6 lg:px-[42px] pb-10 max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-(--neutral-900) dark:text-white heading-font">
                  Admin Dashboard
                </h1>
                <p className="text-(--neutral-500) dark:text-(--neutral-300) font-medium mt-1">
                  Monitor platform activity and metrics
                </p>
              </div>
              <ScaleButton
                onClick={() => fetchDashboardData(true)}
                className="px-5 py-2.5 bg-(--purple-2) text-white font-semibold rounded-xl text-sm"
              >
                Refresh Data
              </ScaleButton>
            </div>
          </FadeIn>

          {/* Tabs */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-8 border-b border-(--neutral-150) dark:border-(--neutral-700) overflow-x-auto scrollbar-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "text-(--purple-2) dark:text-(--purple-4) border-(--purple-2) dark:border-(--purple-4)"
                      : "text-(--neutral-500) dark:text-(--neutral-400) border-transparent hover:text-(--neutral-800) dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-(--purple-2) border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center">
              <p className="font-semibold">{error}</p>
            </div>
          ) : (
            <MotionContainer>
              {/* Overview Tab */}
              {activeTab === "Overview" && (
                <div className="space-y-8">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {renderKpiCard(
                      "Total Revenue",
                      `$${stats.totalRevenue.toFixed(2)}`,
                      <BiWallet size={24} />,
                      "bg-(--yellow-1)/10",
                      "text-(--yellow-2)",
                    )}
                    {renderKpiCard(
                      "Total Orders",
                      stats.totalOrders,
                      <BiCartAlt size={24} />,
                      "bg-(--purple-2)/10",
                      "text-(--purple-2)",
                    )}
                    {renderKpiCard(
                      "Total Users",
                      stats.totalUsers,
                      <BiUser size={24} />,
                      "bg-(--orange-1)/10",
                      "text-(--orange-1)",
                    )}
                    {renderKpiCard(
                      "Avg Order Value",
                      `$${stats.avgOrderValue.toFixed(2)}`,
                      <MdTrendingUp size={24} />,
                      "bg-blue-500/10",
                      "text-blue-500",
                    )}
                  </div>

                  {/* Recent Orders Preview */}
                  <SlideIn direction="up">
                    <div className="bg-white dark:bg-(--neutral-700) rounded-2xl shadow-sm border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden">
                      <div className="p-6 border-b border-(--neutral-150) dark:border-(--neutral-600) flex justify-between items-center">
                        <h2 className="font-bold text-lg text-(--neutral-900) dark:text-white">
                          Recent Orders
                        </h2>
                        <button
                          onClick={() => setActiveTab("Orders")}
                          className="text-(--purple-2) font-semibold text-sm"
                        >
                          View All
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-(--neutral-50) dark:bg-(--neutral-600) text-(--neutral-500) dark:text-(--neutral-300) text-xs uppercase tracking-wider">
                              <th className="px-6 py-4 font-semibold">User</th>
                              <th className="px-6 py-4 font-semibold">
                                Restaurant
                              </th>
                              <th className="px-6 py-4 font-semibold">Items</th>
                              <th className="px-6 py-4 font-semibold">Total</th>
                              <th className="px-6 py-4 font-semibold">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-(--neutral-150) dark:divide-(--neutral-600)">
                            {orders.slice(0, 5).map((order) => (
                              <tr
                                key={order.id}
                                className="hover:bg-(--neutral-50) dark:hover:bg-(--neutral-600)/50 transition-colors"
                              >
                                <td className="px-6 py-4 text-sm font-medium text-(--neutral-800) dark:text-white">
                                  {users.find((u) => u.userId === order.userId)
                                    ?.username || "Unknown"}
                                </td>
                                <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                  {order.restaurantName}
                                </td>
                                <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                  {order.items.length} items
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-(--orange-1)">
                                  ${order.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-sm text-(--neutral-500) dark:text-(--neutral-400)">
                                  {formatDate(order.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {orders.length === 0 && (
                          <p className="text-center p-6 text-(--neutral-500)">
                            No orders found.
                          </p>
                        )}
                      </div>
                    </div>
                  </SlideIn>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "Users" && (
                <SlideIn direction="up">
                  <div className="bg-white dark:bg-(--neutral-700) rounded-2xl shadow-sm border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-(--neutral-50) dark:bg-(--neutral-600) text-(--neutral-500) dark:text-(--neutral-300) text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">
                              Username
                            </th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Phone</th>
                            <th className="px-6 py-4 font-semibold">Role</th>
                            <th className="px-6 py-4 font-semibold">
                              Joined At
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-(--neutral-150) dark:divide-(--neutral-600)">
                          {users.map((user) => (
                            <tr
                              key={user.id}
                              className="hover:bg-(--neutral-50) dark:hover:bg-(--neutral-600)/50 transition-colors"
                            >
                              <td className="px-6 py-4 text-sm font-medium text-(--neutral-800) dark:text-white">
                                {user.username}
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                {user.email || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                {user.phoneNumber || "N/A"}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${user.isAdmin ? "bg-(--purple-2)/10 text-(--purple-2)" : "bg-(--neutral-150) dark:bg-(--neutral-600) text-(--neutral-600) dark:text-(--neutral-300)"}`}
                                >
                                  {user.isAdmin ? "Admin" : "User"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-500) dark:text-(--neutral-400)">
                                {formatDate(user.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </SlideIn>
              )}

              {/* Orders Tab */}
              {activeTab === "Orders" && (
                <SlideIn direction="up">
                  <div className="bg-white dark:bg-(--neutral-700) rounded-2xl shadow-sm border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-(--neutral-50) dark:bg-(--neutral-600) text-(--neutral-500) dark:text-(--neutral-300) text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">
                              Order ID
                            </th>
                            <th className="px-6 py-4 font-semibold">User</th>
                            <th className="px-6 py-4 font-semibold">
                              Restaurant
                            </th>
                            <th className="px-6 py-4 font-semibold">Items</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-(--neutral-150) dark:divide-(--neutral-600)">
                          {orders.map((order) => (
                            <tr
                              key={order.id}
                              className="hover:bg-(--neutral-50) dark:hover:bg-(--neutral-600)/50 transition-colors"
                            >
                              <td className="px-6 py-4 text-sm font-medium tracking-tight text-(--neutral-400) dark:text-(--neutral-500)">
                                ...{order.id.slice(-6)}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-(--neutral-800) dark:text-white">
                                {users.find((u) => u.userId === order.userId)
                                  ?.username || "Unknown"}
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                {order.restaurantName}
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                                {order.items.length}
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-(--orange-1)">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-sm text-(--neutral-500) dark:text-(--neutral-400)">
                                {formatDate(order.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </SlideIn>
              )}
            </MotionContainer>
          )}
        </div>
      </MotionContainer>
    </div>
  );
};

export default AdminDashboard;

