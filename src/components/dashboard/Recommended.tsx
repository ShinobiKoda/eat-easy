import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Burger from "/images/burger-icon.png";
import GridIcon from "/images/grid-icon.png";
import ListIcon from "/images/list-icon.png";
import { AiOutlinePlus } from "react-icons/ai";
import type { PropType } from "../../types";
import ViewDish from "./ViewDish";
import ViewOrder from "./ViewOrder";
import Filters from "../Filters";
import Header from "../layout/Header";
import Loader from "../Loader";
import SkeletonCard from "../SkeletonCard";
import { AnimatePresence } from "motion/react";
// ...existing code...
import { useOrder } from "../../hooks/useOrder";
import { getMenuItems } from "../../services/menuService";

type RecommendedProps = {
  items?: PropType[];
  showSelected?: (item: PropType) => void;
  onClose?: () => void;
};

const Recommended: React.FC<RecommendedProps> = ({ showSelected }) => {
  const [showLoader, setShowLoader] = useState(true);

  // Loading state for menu items
  const [loading, setLoading] = useState(true);

  // Use shared order logic
  const {
    selectedItem,
    setSelectedItem,
    orderItems,
    // setOrderItems,
    showOrder,
    setShowOrder,
    addToOrder,
    removeOrder,
    handleSend,
  } = useOrder();

  // usestate for the mode
  const [click, setClick] = useState(0);

  const [filter, setFilter] = useState(false);

  // usestate for the categories
  const [menu, setMenu] = useState(0);

  // Helper to get 9 random items from an array
  function getRandomItems<T>(arr: T[], n: number): T[] {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  // For Eat: show 9 random, for Drink: show all, for Dessert: show all from Dessert array
  // All menu items from Supabase
  const [allItems, setAllItems] = useState<(PropType & { category: string })[]>(
    [],
  );

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const items = await getMenuItems();
        setAllItems(items);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  let datum: PropType[] = [];
  const categoryName = (["Eat", "Drink", "Dessert"] as const)[menu];
  const itemsInCategory = allItems.filter(
    (item) => item.category === categoryName,
  );

  if (menu === 0) {
    datum = getRandomItems(itemsInCategory, 9);
  } else {
    datum = itemsInCategory;
  }

  // stop background scroll effect when any of this is open
  const isModalOpen = Boolean(selectedItem || showOrder || filter);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedItem, showOrder, filter]);

  return (
    <div className="w-full min-h-screen">
      <div
        className={``}
      >
        <Header
          title="Full Menu"
          description="See All Our Dishes"
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className={`pt-15 md:pt-20 lg:pt-25 transition-all duration-300`}>
          <div className="max-w-6xl mx-auto flex flex-col p-6 space-y-5">
            <div className="md:hidden flex justify-between items-center">
              <h1 className="text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold">
                We think you might enjoy these specially selected dishes
              </h1>
            </div>

            <div className="md:p-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-(--neutral-700) flex justify-between items-center mb-10">
              <div
                className={`flex md:w-fit h-fit md:mx-0 md:justify-items-normal mx-auto w-full justify-between space-x-4 md:space-x-0 lg:space-x-2 text-[15px]`}
              >
                {["Eat", "Drink", "Dessert"].map((cat, idx) => (
                  <div
                    key={cat}
                    onClick={() => setMenu(idx)}
                    className={`relative h-fit text-center py-2 px-4 w-20 text-[16px] font-medium text-(--neutral-600) dark:text-(--neutral-100) rounded-2xl cursor-pointer transition-colors duration-300 ${menu === idx ? "bg-(--yellow-1) text-white dark:text-(--neutral-800)" : "bg-none"}`}
                  >
                    {cat}
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(!filter)}
                  className="cursor-pointer bg-white rounded-2xl p-3 md:hidden"
                >
                  <img src={Burger} className="w-4 h-3" alt="" />
                </motion.button>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex items-center space-x-4 text-[15px]">
                {/* <div className='cursor-pointer'>View mode</div> */}
                <div
                  className={`rounded-2xl border border-[#32324D] flex w-fit h-fit transition-all duration-300`}
                >
                  <div
                    onClick={() => setClick(0)}
                    className={`relative w-fit h-fit p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 0 ? "bg-[#32324D] text-white" : "bg-none"}`}
                  >
                    <img src={ListIcon} className="w-3 h-3" alt="" />
                  </div>

                  <div
                    onClick={() => setClick(1)}
                    className={`relative w-fit h-fit p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 1 ? "bg-[#32324D] text-white" : "bg-none"}`}
                  >
                    <img src={GridIcon} className="w-3 h-3" alt="" />
                  </div>
                </div>

                <div className="border border-gray-400 my-auto h-4"></div>

                <motion.div
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(!filter)}
                  className="p-3 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-[12px] lg:text-[16px] text-white cursor-pointer"
                >
                  Ask for new proposal
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {loading
                ? Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-(--neutral-700) p-3"
                    >
                      <SkeletonCard variant="horizontal" />
                    </div>
                  ))
                : datum.map((eat) => (
                    <div
                      key={`${menu}-${eat.id}`}
                      className="rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-(--neutral-700) p-3 group"
                    >
                      <div className="flex space-x-3 items-center relative">
                        <div className="rounded-[50%] max-w-[100px] h-[100px]">
                          <img
                            src={eat.image}
                            className="rounded-[50%] w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div className="">
                          <p className="text-[15px] lg:text-[18px] dark:text-[#FFFFFF] font-semibold">
                            {eat.name}
                          </p>

                          <div className=" text-[14px] font-semibold mb-2">
                            <div className="space-x-1 flex items-center">
                              <img src={eat.star} className="w-4 h-4" alt="" />
                              <p className="text-(--neutral-500) dark:text-(--neutral-200)">
                                {eat.rating}
                              </p>
                            </div>
                            <span className="text-(--neutral-300) dark:text-(--neutral-500)">
                              ({eat.reviews} reviews)
                            </span>
                          </div>

                          <p className="text-(--orange-1) text-[15px] lg:text-[18px] font-extrabold">
                            ${eat.price.toFixed(2)}
                          </p>
                        </div>

                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            (setSelectedItem(eat), showSelected?.(eat));
                          }}
                          className="flex justify-self-end absolute right-0 bottom-0 cursor-pointer rounded-xl p-2 bg-[#FFF2EA] dark:bg-(--orange-1)"
                        >
                          <AiOutlinePlus className="w-fit h-fit text-(--orange-1) dark:text-[#FFF2EA]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* floating cart button */}
        <motion.div drag className="fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setShowOrder((v) => !v)}
            className="bg-amber-500 text-white rounded-full px-4 py-3 shadow-lg"
          >
            Cart ({orderItems.length})
          </button>
        </motion.div>

        {/* viewdish component */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <ViewDish
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onAddToOrder={addToOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* vieworder component */}
        <AnimatePresence>
          {showOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <ViewOrder
                items={orderItems}
                onClose={() => setShowOrder(false)}
                removeOrder={removeOrder}
                onSend={handleSend}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* filter component */}
        <AnimatePresence>
          {filter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <Filters
                onClose={() => setFilter(false)}
                mainCategory={(["Eat", "Drink", "Dessert"] as const)[menu]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Recommended;
