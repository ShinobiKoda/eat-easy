import { useState } from "react";
import Header from "./components/layout/Header";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import { RiEqualizerLine } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "./components/animations/motion";
import { motion } from "framer-motion";

const orderHistory = [
  {
    id: 1,
    image: "/images/food-1.jpg",
    name: "Bin 71",
    amount: 367.1,
    date: "05/01/2023",
  },
  {
    id: 2,
    image: "/images/food-2.jpg",
    name: "Sushi Bar",
    amount: 134.6,
    date: "12/02/2023",
  },
  {
    id: 3,
    image: "/images/food-3.jpg",
    name: "Gram Bistro",
    amount: 84.2,
    date: "16/02/2023",
  },
  {
    id: 4,
    image: "/images/food-4.jpg",
    name: "Coffee and More",
    amount: 24.2,
    date: "23/02/2023",
  },
  {
    id: 5,
    image: "/images/food-5.jpg",
    name: "Pizza Place",
    amount: 52.0,
    date: "01/03/2023",
  },
  {
    id: 6,
    image: "/images/food-6.jpg",
    name: "Taco Bell",
    amount: 18.5,
    date: "05/03/2023",
  },
];

const filterTabs = [
  "All your orders",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
];

const History: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All your orders");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orderHistory.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen">
      <MotionContainer className="transition-all duration-300">
        <Header description="Order History" navbarTitle="Order History" />

        <div className="w-full pt-[60px] md:pt-[120px] px-4 md:px-6 lg:px-[42px] pb-10">
          {/* ─── Active Order Card ─── */}
          <FadeIn>
            <div className="rounded-3xl bg-(--neutral-900) dark:bg-(--neutral-700) p-6 md:p-8 flex items-center justify-between mb-8 overflow-hidden">
              <div className="flex items-center gap-5 md:gap-8">
                {/* Food image */}
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden shrink-0 border-3 border-(--neutral-600)">
                  <img
                    src="/images/food-1.jpg"
                    alt="Active Order"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Order info */}
                <div className="space-y-2">
                  <span className="inline-block text-xs font-semibold text-(--orange-1) bg-(--orange-1)/15 px-3 py-1 rounded-full">
                    Active Order
                  </span>
                  <h3 className="text-white dark:text-white font-bold text-[20px] md:text-[24px] heading-font">
                    Gram Bistro
                  </h3>
                  <p className="text-(--neutral-400) dark:text-(--neutral-300) text-[13px] md:text-[14px] font-medium max-w-[320px]">
                    From tracking its progress to making changes to the order,
                    you can view real-time updates on your current order.
                  </p>
                </div>
              </div>
              {/* Arrow button */}
              <ScaleButton className="w-[44px] h-[44px] rounded-full bg-(--orange-1) text-white flex items-center justify-center cursor-pointer shrink-0 ml-4">
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
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                    activeFilter === tab
                      ? "bg-(--orange-1) text-white"
                      : "text-(--neutral-500) dark:text-(--neutral-300) hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600)"
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* ─── Order History Grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <PopIn key={order.id}>
                <div className="rounded-2xl bg-(--neutral-100) dark:bg-(--neutral-700) p-4 md:p-5 flex items-center justify-between cursor-pointer h-full group shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-4">
                    {/* Restaurant image */}
                    <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full overflow-hidden shrink-0 border-2 border-(--neutral-200) dark:border-(--neutral-500)">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Order details */}
                    <div className="space-y-2">
                      <h4 className="text-(--neutral-900) dark:text-white font-semibold text-[16px] md:text-[18px]">
                        {order.name}
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MdAttachMoney className="text-(--orange-1) text-[16px]" />
                          <span className="text-(--neutral-500) dark:text-(--neutral-300) text-[13px] md:text-[14px] font-medium">
                            $ {order.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HiOutlineCalendar className="text-(--orange-1) text-[16px]" />
                          <span className="text-(--neutral-500) dark:text-(--neutral-300) text-[13px] md:text-[14px] font-medium">
                            {order.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* More options */}
                  <ScaleButton className="w-[36px] h-[36px] rounded-full bg-(--orange-1) text-white flex items-center justify-center cursor-pointer shrink-0">
                    <BsThreeDots className="text-sm" />
                  </ScaleButton>
                </div>
              </PopIn>
            ))}
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default History;
