import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaChevronDown } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { OrderStatusSchema } from "../schemas/OrderStatusSchema";
import Loader from "../components/Loader";
import Header from "../components/layout/Header";

import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

const OrderStatus: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRestaurant, getStorageKey } = useRestaurant();
  const [showLoader, setShowLoader] = useState(true);
  const [toggleList, setToggleList] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(getStorageKey("eat-easy-last-order"));
      if (raw) setOrder(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read saved order", e);
    }
  }, [getStorageKey]);

  const { currentStatus, showRecommend, showSubmit, timeLeft, batches } =
    OrderStatusSchema(selectedRestaurant?.id ?? null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={`transition-all duration-300 ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
        <Header
          title="Full Menu"
          description="See All Our Dishes"
          navbarDescription="Your order status"
          showBack={true}
        />

        <div className="pt-25 md:pt-30 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-6 space-y-10">
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-8 w-full items-center sm:items-start">
            <div className="bg-[#FFFFFF] dark:bg-(--neutral-700) text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-2xl pt-[30px] max-w-[340px] sm:max-w-full sm:w-[60%] h-auto sm:h-fit overflow-clip gap-[21px] lg:gap-[60px] flex flex-col items-center">
              {order ? (
                <>
                  <h1 className="text-[16px] lg:text-[24px] text-[#8E8EA9] font-semibold dark:text-(--neutral-200)">
                    {currentStatus.text} <br />{" "}
                    <b className="text-[18px] lg:text-[24px] text-(--yellow-1) font-extrabold">
                      {currentStatus.time}{" "}
                      {timeLeft > 0 && `(${formattedTime})`}
                    </b>
                  </h1>

                  <div className="lg:max-w-full">
                    <img src={currentStatus.img} alt="" />
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-10 lg:py-16 px-6 gap-6"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <IoCartOutline className="w-28 h-28 lg:w-36 lg:h-36 text-(--yellow-1)" />
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-[18px] lg:text-[24px] font-bold text-[#32324D] dark:text-white">
                      No active orders
                    </h2>
                    <p className="text-[14px] lg:text-[16px] text-[#8E8EA9] dark:text-[#c0c0cf] max-w-xs mx-auto">
                      Your order status will appear here once you place an
                      order.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-[#FFFFFF] dark:bg-(--neutral-700) text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-2xl p-5 lg:p-[30px] space-y-4 max-w-[340px] sm:max-w-full w-full sm:w-[40%] h-fit">
              <div className="w-full flex justify-between items-center">
                <p className="text-(--neutral-500) font-semibold text-left">
                  Order list and prices
                </p>
                <motion.div
                  animate={{ rotate: toggleList ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setToggleList(!toggleList)}
                  className="cursor-pointer"
                >
                  <FaChevronDown className="w-5 h-5 text-(--yellow-1)" />
                </motion.div>
              </div>

              <AnimatePresence>
                {!toggleList && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pt-4">
                      {batches.length > 0 ? (
                        batches.flatMap((batch: any, batchIdx: number) =>
                          batch.items.map((item: any, itemIdx: number) => (
                            <div
                              key={`${batch.id}-${batchIdx}-${item.id}-${itemIdx}`}
                              className={`dark:text-[#FFFFFF] flex justify-between items-center gap-5 ${batch.status === "pending" ? "opacity-45" : ""}`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <img
                                    src={item.image}
                                    className="w-[50px] h-[50px] rounded-full object-cover"
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-left text-[14px] font-semibold">
                                    {item.name}
                                  </p>
                                  <span
                                    className={`text-[10px] text-left font-semibold ${
                                      batch.status === "ready"
                                        ? "text-green-500"
                                        : batch.status === "preparing"
                                          ? "text-(--yellow-1)"
                                          : "text-gray-400"
                                    }`}
                                  >
                                    {batch.status === "ready"
                                      ? "Ready"
                                      : batch.status === "preparing"
                                        ? "Preparing..."
                                        : "Pending"}
                                  </span>
                                </div>
                              </div>
                              <p className="text-[14px]">
                                <span>{item.qty}</span>x ${" "}
                                <b className="text-(--yellow-1)">
                                  {(item.price ?? 0).toFixed(2)}
                                </b>
                              </p>
                            </div>
                          )),
                        )
                      ) : (
                        <p className="text-[14px] text-[#8E8EA9]">
                          No order found.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/FullMenu")}
                className="flex mx-auto items-center cursor-pointer space-x-2 w-fit"
              >
                <FaPlus size={20} className="text-(--yellow-1)" />
                <p className="text-(--yellow-1) text-[16px] font-semibold">
                  Add more food to order
                </p>
              </motion.div>
            </div>
          </div>

          {order && (
            <div className="max-w-[340px] w-full sm:max-w-full flex flex-col space-y-5 sm:flex-row justify-between sm:items-center rounded-2xl px-5 py-4 text-[#8E8EA9] font-semibold dark:text-(--neutral-200) bg-[#FFFFFF] dark:bg-(--neutral-700) shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
              <p className="text-[14px] font-600">{currentStatus.action}</p>

              {showRecommend && order && (
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className="p-3 rounded-2xl shadow-sm bg-[#32324D] dark:bg-[#615793] text-[12px] text-white text-center cursor-pointer"
                >
                  Ask for Recommendations
                </motion.div>
              )}

              {showSubmit && order && (
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/Checkout", { state: { order } })}
                  className="w-full text-center sm:w-fit lg:w-[375px] p-3 rounded-2xl shadow-sm bg-[#32324D] dark:bg-[#615793] text-[16px] lg:text-[16px] text-white cursor-pointer gap-2 flex justify-center"
                >
                  <span>Pay</span>
                  <span>
                    <b>${(order.total ?? 0).toFixed(2)}</b>
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
