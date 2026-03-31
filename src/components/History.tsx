import { useState, useEffect } from "react";
import Header from "./layout/Header";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "./animations/motion";
import { motion } from "framer-motion";
import { orderService, type OrderRecord } from "../services/orderService";
import { useTheme } from "../hooks/useTheme";

const filterTabs = [
  "All your orders",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
];

const History: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All your orders");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by date range
  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "All your orders") return true;

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (activeFilter === "Last 7 days") return diffDays <= 7;
    if (activeFilter === "Last 14 days") return diffDays <= 14;
    if (activeFilter === "Last 30 days") return diffDays <= 30;
    return true;
  });

  // Format date to DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen">
      <MotionContainer className="transition-all duration-300">
        <Header description="Order History" navbarTitle="Order History" />

        <div className="w-full pt-18 md:pt-30 px-4 md:px-6 lg:px-[42px] pb-10 max-w-[1440px] mx-auto">
          {/* ─── Active Order Card ─── */}
          <FadeIn>
            <div className="rounded-3xl bg-(--neutral-900) dark:bg-(--neutral-150) flex items-center justify-between mb-8 overflow-hidden max-h-[240px]">
              <div className="flex items-center gap-5 md:gap-8">
                {/* Food image */}
                <div className="relative -ml-9 sm:mr-0 flex items-center justify-center">
                  <img
                    src="/images/active-bg.png"
                    alt=""
                    className="w-full h-full block"
                  />
                  <img
                    src="/images/active.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[192px] h-[192px] object-contain z-10"
                  />
                </div>
                {/* Order info */}
                <div className="space-y-2 p-6 md:p-8">
                  <span className="inline-block text-xs md:text-sm lg:text-base font-medium text-(--orange-1) bg-(--orange-1)/15 px-3 py-1 rounded-full">
                    Active Order
                  </span>
                  <h3 className="text-white dark:text-(--neutral-800) font-bold text-[20px] md:text-[24px] lg:text-[32px] heading-font">
                    Gram Bistro
                  </h3>
                  <p className="hidden md:block text-(--neutral-400) dark:text-(--neutral-800) text-[13px] md:text-[14px] lg:text-[16px] font-medium max-w-[457px]">
                    From tracking its progress to making changes to the order,
                    you can view real-time updates on your current order.
                  </p>
                </div>
              </div>
              {/* Arrow button */}
              <ScaleButton className="w-[44px] h-[44px] rounded-2xl bg-(--orange-1) text-white flex items-center justify-center cursor-pointer shrink-0 mr-10">
                <FaArrowRight className="text-sm" />
              </ScaleButton>
            </div>
          </FadeIn>

          {/* ─── Filter Tabs ─── */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-6 overflow-x-auto scrollbar-hidden pb-1">
              {filterTabs.map((tab) => (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(tab)}
                  className={`md:px-4 md:py-2.5 px-3 py-2 rounded-[16px] text-[12px] md:text-sm lg:text-[16px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                    activeFilter === tab
                      ? "bg-(--yellow-1) text-(--neutral-800) font-bold"
                      : "text-(--neutral-500) dark:text-(--neutral-300) hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600)"
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* ─── Order History Grid ─── */}
          {loading ? (
            <FadeIn>
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-3 border-(--orange-1) border-t-transparent rounded-full animate-spin" />
              </div>
            </FadeIn>
          ) : filteredOrders.length === 0 ? (
            <FadeIn>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-(--neutral-500) dark:text-(--neutral-300) text-[16px] font-medium">
                  {activeFilter === "All your orders"
                    ? "No orders yet. Place your first order!"
                    : `No orders in the ${activeFilter.toLowerCase()}.`}
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredOrders.map((order) => (
                <PopIn key={order.id}>
                  <div className="rounded-2xl bg-(--neutral-100) dark:bg-(--neutral-700) pr-4 flex items-center justify-between cursor-pointer h-full group shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    <div className="flex items-center gap-4">
                      {/* First item image */}
                      <div className="relative flex items-center justify-center w-[50%]">
                        <img
                          src={
                            !isDark
                              ? "/images/dark-food-bg.png"
                              : "/images/food-bg.png"
                          }
                          alt=""
                          className="w-full h-full block z-20"
                        />
                        <img
                          src={order.items[0]?.image || "/images/food-1.jpg"}
                          alt={order.restaurantName}
                          className="absolute top-1/2 -left-1/10 -translate-y-1/2 w-[65%] h-[60%] rounded-full overflow-hidden object-cover z-10"
                        />
                      </div>

                      {/* Order details */}
                      <div className="space-y-2">
                        <h4 className="text-(--neutral-900) dark:text-white font-semibold text-[16px] md:text-[18px]">
                          {order.restaurantName}
                        </h4>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center gap-1">
                            <BiWallet className="text-(--yellow-2) text-[18px] md:text-[24px]" />
                            <span className="text-(--neutral-500) dark:text-(--neutral-300) text-[13px] md:text-[14px] xl:text-[16px] font-medium whitespace-nowrap">
                              $ {order.total.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <HiOutlineCalendar className="text-(--orange-1) text-[18px] md:text-[24px]" />
                            <span className="text-(--neutral-500) dark:text-(--neutral-300) text-[13px] md:text-[14px] xl:text-[16px] font-medium">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* More options */}
                    <div className="h-full pt-4">
                      <ScaleButton className="py-[12px] px-[12px] rounded-[12px] bg-(--orange-1) text-white flex items-center justify-center cursor-pointer shrink-0">
                        <BsThreeDots className="text-sm" />
                      </ScaleButton>
                    </div>
                  </div>
                </PopIn>
              ))}
            </div>
          )}
        </div>
      </MotionContainer>
    </div>
  );
};

export default History;
