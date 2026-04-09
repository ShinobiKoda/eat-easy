import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "../components/animations/motion";
import { orderService, type OrderRecord } from "../services/orderService";
import { restaurantService } from "../services/restaurantService";
import { useTheme } from "../hooks/useTheme";
import { useRestaurant } from "../context/RestaurantContext";
import { motion, AnimatePresence } from "motion/react";
import { IoClose } from "react-icons/io5";

const filterTabs = [
  "All your orders",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
];

const History: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All your orders");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [restaurantImages, setRestaurantImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { selectedRestaurant } = useRestaurant();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, restaurantsData] = await Promise.all([
          orderService.getUserOrders(),
          restaurantService.getAllRestaurants(),
        ]);

        setOrders(ordersData);

        // Map restaurant names to images
        const imageMap: Record<string, string> = {};
        restaurantsData.forEach((r) => {
          imageMap[r.name] = r.image;
        });
        setRestaurantImages(imageMap);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

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
                <div className="relative -ml-9 sm:mr-0 hidden sm:flex items-center justify-center">
                  <img
                    src="/images/active-bg.png"
                    alt=""
                    className="w-full h-full block"
                  />
                  <img
                    src={
                      (selectedRestaurant?.name &&
                        restaurantImages[selectedRestaurant.name]) ||
                      "/images/active.png"
                    }
                    alt={selectedRestaurant?.name || "Active Order"}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[192px] h-[192px] rounded-full object-cover z-10"
                  />
                </div>
                {/* Order info */}
                <div className="space-y-2 p-6 md:p-8">
                  <span className="inline-block text-xs md:text-sm lg:text-base font-medium text-(--neutral-150) dark:text-(--orange-1) bg-(--neutral-150)/20 dark:bg-(--orange-1)/15 px-3 py-1 rounded-[9px]">
                    Active Order
                  </span>
                  <h3 className="text-white dark:text-(--neutral-800) font-bold text-[20px] md:text-[24px] lg:text-[32px] heading-font">
                    {selectedRestaurant?.name || "Gram Bistro"}
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
                  <div className="rounded-2xl bg-(--neutral-100) dark:bg-(--neutral-700) pr-4 flex items-center justify-between cursor-pointer h-full group shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4">
                      {/* Order image (first item) */}
                      <div className="relative flex items-center justify-center w-[50%] overflow-hidden">
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
                          src={
                            restaurantImages[order.restaurantName] ||
                            order.items[0]?.image ||
                            "/images/food-1.jpg"
                          }
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
                    <div className="h-full pt-4 relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="py-3 px-3 rounded-xl bg-(--orange-1) text-white flex items-center justify-center cursor-pointer shrink-0 relative"
                      >
                        <BsThreeDots className="text-sm" />
                      </motion.button>
                    </div>
                  </div>
                </PopIn>
              ))}
            </div>
          )}
        </div>
      </MotionContainer>

      {/* ─── Order Details Modal ─── */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-(--neutral-700) rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Order Details
                    </h3>
                    <p className="text-(--neutral-500) dark:text-(--neutral-300)">
                      {selectedOrder.restaurantName} •{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 rounded-full bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center text-(--neutral-900) dark:text-white hover:bg-(--neutral-200) dark:hover:bg-(--neutral-500) transition-colors"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-2xl bg-(--neutral-100)/50 dark:bg-(--neutral-600)/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                          <img
                            src={item.image || "/images/food-1.jpg"}
                            className="w-full h-full object-cover"
                            alt={item.name}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                            {item.qty} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-(--orange-1)">
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-(--neutral-100) dark:border-(--neutral-600)">
                  <div className="flex items-center justify-between font-bold text-xl dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-(--orange-1)">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
