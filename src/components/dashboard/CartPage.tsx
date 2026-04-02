import { motion, AnimatePresence } from "motion/react";
import { useOrder } from "../../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../../context/RestaurantContext";
import SEO from "../SEO";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  staggerContainer,
  fadeIn,
} from "../animations/motion";
import { RiDeleteBinLine, RiShoppingBag3Line } from "react-icons/ri";
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import StarHalf from "/images/star-half-icon.png";
import StarFull from "/images/star.svg";

const CartPage: React.FC = () => {
  const { orderItems, removeOrder, handleSend } = useOrder();
  const { selectedRestaurant } = useRestaurant();
  const navigate = useNavigate();

  const restaurantName = selectedRestaurant?.name || "Gram Bistro";
  const orderTotal = orderItems.reduce((sum, t) => sum + (t.price || 0), 0);
  const tax = orderTotal * 0.11;
  const totalQty = orderItems.reduce(
    (sum, it) => sum + ((it as any).qty ?? 1),
    0,
  );

  const handleSendOrder = () => {
    const sentItems = orderItems.map((it) => ({
      id: it.id,
      name: it.name,
      image: it.image,
      qty: (it as any).qty ?? 1,
      price: it.price ?? 0,
    }));
    handleSend({
      items: sentItems,
      subtotal: orderTotal,
      tax,
      total: orderTotal + tax,
      qty: totalQty,
    });
  };

  return (
    <div className="w-full min-h-screen vieworder-bg flex flex-col">
      <SEO
        title="My Cart | EatEasy"
        description="Review your cart items and place your order."
      />

      {/* ── Header ───────────────────────────────────────────────── */}
      <MotionContainer>
        <header className="sticky top-0 z-30 vieworder-bg w-full px-5 py-4 flex items-center justify-between border-b border-(--neutral-150) dark:border-(--neutral-700)">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-white dark:bg-(--neutral-700) flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Go back"
            >
              <IoArrowBack
                size={20}
                className="text-(--neutral-600) dark:text-white"
              />
            </motion.button>

            <div>
              <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400) flex items-center gap-1">
                <HiOutlineLocationMarker
                  size={13}
                  className="text-(--yellow-1)"
                />
                {restaurantName}
              </p>
              <h1 className="heading-font font-bold text-[20px] text-(--neutral-800) dark:text-white leading-tight">
                My Order
              </h1>
            </div>
          </div>

          {orderItems.length > 0 && (
            <PopIn>
              <span className="px-3 py-1.5 rounded-full bg-(--purple-2)/10 text-(--purple-2) dark:text-(--purple-5) text-xs font-bold">
                {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
              </span>
            </PopIn>
          )}
        </header>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-36 w-full mx-auto max-w-[768px]">
          <AnimatePresence mode="wait">
            {orderItems.length > 0 ? (
              <motion.div
                key="has-items"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="p-5 space-y-4"
              >
                {/* Item cards */}
                {orderItems.map((order, i) => (
                  <motion.div
                    key={`${order.id}-${i}`}
                    variants={fadeIn}
                    layout
                    className="bg-white dark:bg-(--neutral-700) rounded-2xl p-4 shadow-sm flex items-center gap-4"
                  >
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-[72px] h-[72px] rounded-full object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[15px] text-(--neutral-800) dark:text-white truncate">
                        {order.name}{" "}
                        <span className="text-(--orange-1) font-extrabold">
                          x{(order as any).qty ?? 1}
                        </span>
                      </p>

                      <div className="flex flex-col gap-1.5 mt-0.5">
                        <div className="flex items-center">
                          {order.rating < 4.5 ? (
                            <img
                              src={StarHalf}
                              className="w-3.5 h-3.5"
                              alt=""
                            />
                          ) : (
                            <img
                              src={StarFull}
                              className="w-3.5 h-3.5"
                              alt=""
                            />
                          )}
                          <span className="text-xs font-medium text-(--neutral-500) dark:text-(--neutral-300)">
                            {order.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-(--neutral-300) dark:text-(--neutral-500)">
                          ({order.reviews} reviews)
                        </span>
                      </div>

                      <p className="text-(--orange-1) font-extrabold text-[15px] mt-1">
                        ${order.price.toFixed(2)}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeOrder(order)}
                      className="w-9 h-9 rounded-xl bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center cursor-pointer shrink-0"
                      aria-label="Remove item"
                    >
                      <RiDeleteBinLine
                        size={18}
                        className="text-(--neutral-400) dark:text-(--neutral-300)"
                      />
                    </motion.button>
                  </motion.div>
                ))}

                {/* Add more */}
                <FadeIn>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mx-auto cursor-pointer py-2"
                  >
                    <FaPlus size={16} className="text-(--yellow-1)" />
                    <span className="text-(--yellow-1) font-semibold text-[15px]">
                      Add more food to order
                    </span>
                  </motion.button>
                </FadeIn>

                {/* Order summary */}
                <FadeIn>
                  <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm space-y-4 mt-2">
                    <h2 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                      Order Summary
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-(--neutral-600) dark:text-(--neutral-300)">
                          Subtotal
                        </p>
                        <p className="text-sm font-bold text-(--neutral-800) dark:text-white">
                          ${orderTotal.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-(--neutral-600) dark:text-(--neutral-300)">
                          Tax (11%)
                        </p>
                        <p className="text-sm font-bold text-(--neutral-800) dark:text-white">
                          ${tax.toFixed(2)}
                        </p>
                      </div>
                      <div className="h-px bg-(--neutral-150) dark:bg-(--neutral-600)" />
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-base text-(--neutral-800) dark:text-white">
                          Total
                        </p>
                        <p className="font-extrabold text-base text-(--orange-1)">
                          ${(orderTotal + tax).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-[60vh] flex flex-col items-center justify-center p-8 text-center gap-5"
              >
                <div className="w-24 h-24 rounded-full bg-(--neutral-150) dark:bg-(--neutral-600) flex items-center justify-center">
                  <RiShoppingBag3Line
                    size={38}
                    className="text-(--neutral-400) dark:text-(--neutral-300)"
                  />
                </div>
                <div>
                  <p className="heading-font font-bold text-xl text-(--neutral-800) dark:text-white">
                    Your cart is empty
                  </p>
                  <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-1">
                    Add items from the menu to get started
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/FullMenu")}
                  className="mt-2 px-8 py-3.5 rounded-2xl bg-(--purple-2) text-white font-semibold cursor-pointer flex items-center gap-2"
                >
                  Browse Menu
                  <FaArrowRight size={14} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionContainer>

      {/* ── Sticky CTA ───────────────────────────────────────────── */}
      <AnimatePresence>
        {orderItems.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 p-4  z-30 w-full mx-auto max-w-[768px]"
          >
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={handleSendOrder}
              className="w-full rounded-2xl bg-(--purple-2) p-4 cursor-pointer flex items-center justify-center gap-3 group"
            >
              <span className="text-white font-semibold text-base">
                Send Order · ${(orderTotal + tax).toFixed(2)}
              </span>
              <FaArrowRight
                size={16}
                className="text-white group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
