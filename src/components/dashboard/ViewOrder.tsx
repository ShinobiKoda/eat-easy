import { motion } from "motion/react";
// import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import type { PropType } from "../../types";
import { type MouseEvent } from "react";
import { RiDeleteBinLine, RiShoppingBag3Line } from "react-icons/ri";
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Navbar from "../layout/Navbar";

export type ViewOrderProps = {
  items: PropType[];
  onClose: () => void;
  removeOrder?: (order: any) => void;
  onSend?: (sent: any) => void;
};

const ViewOrder: React.FC<ViewOrderProps> = ({
  items,
  onClose,
  removeOrder,
  onSend,
}) => {


  // subtotal: sum of item prices (you can expand to include toppings/counts)
  const orderTotal = items.reduce((sum, t) => sum + (t.price || 0), 0);

  // tax at 11%
  const tax = orderTotal * 0.11;

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{
        x: "0",
        opacity: 1,
        transition: { duration: 0.25 },
      }}
      exit={{ x: "100vw", opacity: 0 }}
      className="z-50 top-0 fixed right-0 w-full h-screen flex flex-col sm:w-[55%] md:w-[45%] lg:w-[37%] sm:rounded-l-2xl vieworder-bg"
    >
      {/* header for mobile */}
      <div className="flex sm:hidden">
        <Navbar title='Gram Bistro' description='My Order' showBack={true}  />
      </div>

      {/* header for destop */}
      <div className="hidden sm:flex justify-between p-4">
        <div className="flex items-center">
          <h1 className="px-3 text-[16px] lg:text-[20px] font-bold text-(--neutral-800) dark:text-[#FFFFFF]">
            My Order
          </h1>

          <div className="border border-gray-700 my-auto h-5"></div>

          <div className="px-3 flex items-center">
            <div className="w-5 h-5">
              <HiOutlineLocationMarker
                size={20}
                className="text-(--neutral-500) dark:text-(--purple-5)"
              />
            </div>
            <p className="text-[14px] lg:text-[16px] font-semibold text-(--neutral-500) dark:text-(--purple-5)">
              Gram Bistro
            </p>
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50"
        >
          <FaTimes size={25} className="text-(--neutral-400) dark:text-(--neutral-200)" />
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {items && items.length > 0 ? (
        <div className="p-6 space-y-[27px]">
          <div className="flex flex-col space-y-5">
            {items.map((order) => (
              <div
                key={`${order.id}`}
                className="rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-(--neutral-700) p-3 group"
              >
                <div className="flex space-x-3 items-center relative">
                  <div className="rounded-full">
                    <img
                      src={order.image}
                      className="max-w-[100px] max-h-[100px] rounded-full"
                      alt=""
                    />
                  </div>

                  <div className="">
                    <p className="text-[15px] lg:text-[18px] font-semibold text-(--neutral-800) dark:text-[#FFFFFF]">
                      {order.name} x{" "}
                      <b className="text-(--orange-1) font-extrabold">
                        {(order as any).qty ?? 1}
                      </b>
                    </p>

                    <div className=" text-[14px] text-[#C0C0CF] font-semibold mb-2 flex space-x-1 flex-wrap items-center">
                      <div className="space-x-1 flex items-center">
                        <img src={order.star} className="w-4 h-4" alt="" />
                        <p className="text-(--neutral-500) dark:text-(--neutral-200)">{order.rating}</p>
                      </div>
                      <span className="text-(--neutral-300) dark:text-(--neutral-500)">({order.reviews} reviews)</span>
                    </div>

                    <p className="text-(--orange-1) text-[15px] lg:text-[18px] font-extrabold">
                      ${order.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex md:items-center justify-self-end absolute right-0 bottom-0 ">
                    {/* remove order */}
                    <motion.div
                      onClick={() => removeOrder?.(order)}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                    >
                      <RiDeleteBinLine size={22} className="text-(--neutral-400)" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="flex mx-auto items-center cursor-pointer space-x-2 w-fit"
          >
            <FaPlus size={20} className="text-(--yellow-1)" />

            <p className="text-(--yellow-1) text-[16px] font-semibold">Add more food to order</p>
          </motion.div>

          <div className="border-y border-gray-500 py-5 space-y-5">
            <div className="flex justify-between items-center">
              <p className="text-[16px] font-semibold text-(--neutral-800) dark:text-(--neutral-200)">
                Subtotal
              </p>
              <p className="text-[16px] font-extrabold text-(--neutral-700) dark:text-(--neutral-100)">
                ${orderTotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[16px] font-semibold text-(--neutral-800) dark:text-(--neutral-200)">
                Tax
              </p>
              <p className="text-[16px] font-extrabold text-(--neutral-700) dark:text-(--neutral-100)">
                ${tax.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[18px] font-bold text-(--neutral-700) dark:text-(--neutral-200)">
              Total Price
            </p>
            <p className="text-[18px] font-extrabold text-(--orange-1)">
              ${(orderTotal + tax).toFixed(2)}
            </p>
          </div>
        </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-(--neutral-200) dark:bg-(--neutral-600) flex items-center justify-center">
              <RiShoppingBag3Line size={32} className="text-(--neutral-400) dark:text-(--neutral-300)" />
            </div>
            <div>
              <p className="text-[18px] font-bold text-(--neutral-800) dark:text-white">Your cart is empty</p>
              <p className="text-[14px] text-(--neutral-500) dark:text-(--neutral-300)">Add items from the menu to get started</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="mt-4 px-6 py-3 rounded-xl bg-(--purple-2) text-white font-semibold cursor-pointer"
            >
              Start Ordering
            </motion.button>
          </div>
        )}
      </div>

      {items && items.length > 0 && (
      <div className="w-full flex justify-center bottom-0 p-3">
        <motion.button
          onClick={() => {
            // compute total qty across all items (fall back to 1 per item when qty missing)
            const totalQty = items.reduce(
              (sum, it) => sum + ((it as any).qty ?? 1),
              0,
            );

            const sentItems = items.map((it) => ({
              id: it.id,
              name: it.name,
              image: it.image,
              qty: (it as any).qty ?? 1,
              price: it.price ?? 0,
            }));

            const sent = {
              items: sentItems,
              subtotal: orderTotal,
              tax,
              total: orderTotal + tax,
              qty: totalQty,
            };

            onSend?.(sent);
            onClose();
          }}
          whileTap={{ scale: 0.98 }}
          className="group rounded-2xl bg-(--purple-2) p-4 cursor-pointer w-full flex items-center justify-center space-x-2"
        >
          <p className="text-[16px] text-[#FFFFFF] font-semibold">Send Order</p>
          <FaArrowRight size={18} className="group-hover:translate-x-3 transition-all duration-300 text-[#FFFFFF]"/>
        </motion.button>
      </div>
      )}
    </motion.div>
  );
};

export default ViewOrder;
