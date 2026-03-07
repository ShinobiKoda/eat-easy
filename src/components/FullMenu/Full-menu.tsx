import React, { useState, useEffect, useMemo } from "react";
import Header from "../layout/Header";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { AnimatePresence } from "motion/react";

import SkeletonCard from "../SkeletonCard";
import ProductCarousel from "./ProductCarousel";
import Filters from "../Filters";
import ViewDish from "../dashboard/ViewDish";
import ViewOrder from "../dashboard/ViewOrder";
import { productGridStagger, productCardFade } from "../animations/motion";
import { useOrder } from "../../hooks/useOrder";
import { getMenuItems } from "../../services/menuService";
import type { PropType } from "../../types";
import StarHalf from "/images/star-half-icon.png";
import StarFull from "/images/star.svg";

const FullMenu: React.FC = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Debounce search input
  useEffect(() => {
    if (search === "") {
      setDebouncedSearch("");
    } else {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500); // 500ms debounce
      return () => clearTimeout(handler);
    }
  }, [search]);

  // Loading state for menu items
  const [loading, setLoading] = useState(true);

  // for the filter component
  const [filterButton, setFilterButton] = useState(false);

  // Main Category State
  const [mainCategory, setMainCategory] = useState<"Eat" | "Drink" | "Dessert">(
    "Eat",
  );

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

  // Applied filters state
  const [appliedFilters, setAppliedFilters] = useState<{
    productTypes: string[];
    ratings: number[];
    priceRange: [number, number];
  }>({ productTypes: [], ratings: [], priceRange: [0, 30] });

  // Filter dishes based on selected tag, search input, and applied filters
  const filteredDishes = useMemo(() => {
    let dishes = allItems.filter((item) => item.category === mainCategory);

    if (debouncedSearch.trim() !== "") {
      dishes = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // Apply product type filters
    if (appliedFilters.productTypes.length > 0) {
      dishes = dishes.filter(
        (dish) =>
          dish.tag &&
          dish.tag.some((tag) =>
            appliedFilters.productTypes.some(
              (pt) => pt.toLowerCase() === tag.toLowerCase(),
            ),
          ),
      );
    }

    if (appliedFilters.ratings.length > 0) {
      dishes = dishes.filter((dish) =>
        appliedFilters.ratings.includes(Math.floor(dish.rating)),
      );
    }
    dishes = dishes.filter(
      (dish) =>
        dish.price >= appliedFilters.priceRange[0] &&
        dish.price <= appliedFilters.priceRange[1],
    );
    return dishes;
  }, [mainCategory, debouncedSearch, appliedFilters, allItems]);

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

  // stop background scroll effect when any of this is open
  const isModalOpen = Boolean(selectedItem || showOrder || filterButton);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedItem, showOrder, filterButton]);

  return (
    <div className="w-full min-h-screen">
      <div className={``}>
        <Header
          title="Full Menu"
          description="See All Our Dishes"
          navbarTitle="Gram Bistro"
          showBack={false}
        />

        <div className="pt-18 md:pt-24 max-w-[1440px] mx-auto">
          <div className="px-6 py-4 md:py-8 md:px-10.5">
            <div className="md:p-4 gap-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-[#4A4A6A] flex justify-between items-center">
              <div className="w-full flex items-center justify-center px-4 py-3 rounded-2xl border border-(--neutral-150) bg-transparent dark:border-(--neutral-600)">
                <input
                  type="text"
                  className="outline-none border-none w-full placeholder:text-(--neutral-500) text-(--neutral-500) dark:placeholder:text-(--neutral-200) dark:text-(--neutral-200)"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <CiSearch
                  size={20}
                  className="text-(--neutral-300) cursor-pointer"
                />
              </div>

              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilterButton(!filterButton)}
                className="flex justify-between gap-2 py-4 px-4 md:py-4 md:px-6 rounded-2xl bg-[#32324D] dark:bg-(--purple-2) text-[12px] lg:text-[16px] text-white cursor-pointer"
              >
                <FaFilter size={20} />
                <p className="hidden md:block">Filters</p>
              </motion.div>
            </div>
          </div>

          {/* carousel section */}
          <ProductCarousel />

          {/* Main Category Buttons */}
          <div className="w-full p-6 lg:p-7 xl:p-10 flex items-center whitespace-nowrap overflow-auto scrollbar-hidden space-x-5 lg:space-y-5 h-fit">
            <ul className="transition-all duration-700 transform flex items-center gap-2">
              {(["Eat", "Drink", "Dessert"] as const).map((category) => (
                <motion.li
                  whileTap={{ scale: 0.98 }}
                  key={category}
                  onClick={() => setMainCategory(category)}
                  className={`text-center w-full cursor-pointer rounded-2xl text-[clamp(1rem,3vw,1.1rem)] font-medium px-3.5 md:px-6 py-3 transition-colors duration-700 ${mainCategory === category ? "bg-(--yellow-1) font-bold text-white dark:text-(--neutral-800)" : "text-(--neutral-600) dark:text-(--neutral-100)"}`}
                >
                  <p>{category}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* product/dishes listing section */}
          <div className="px-6 py-4 md:py-8 md:px-10.5 flex flex-col gap-6">
            <h1 className="text-[18px] text-(--neutral-600) dark:text-(--neutral-200) font-semibold">
              {mainCategory}
            </h1>

            <AnimatePresence mode="wait">
              {loading ? (
                <div className="items-center gap-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-(--neutral-700) py-3 px-4 h-full w-full rounded-2xl gap-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex flex-col items-center relative"
                    >
                      <SkeletonCard variant="vertical" />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  key={`${mainCategory}-${debouncedSearch}-${JSON.stringify(appliedFilters)}-${allItems.length}`}
                  className="items-center gap-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
                  variants={productGridStagger}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {filteredDishes.map((dish) => (
                    <motion.div
                      key={dish.id}
                      whileTap={{ scale: 0.98 }}
                      variants={productCardFade}
                      className="bg-white dark:bg-(--neutral-700) py-3 px-4 h-full w-full rounded-2xl gap-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex flex-col items-center relative cursor-pointer"
                      onClick={() => setSelectedItem(dish)}
                    >
                      <div className="rounded-[50%] mb-2 max-w-[100px] h-[100px]">
                        <img
                          src={dish.image}
                          className="rounded-[50%] w-full h-full object-cover"
                          alt=""
                        />
                      </div>

                      <p className="text-[14px] lg:text-[18px] text-center font-semibold text-(--neutral-800) dark:text-white">
                        {dish.name}
                      </p>

                      <div className="space-x-1 py-1 px-1.5 flex items-center absolute top-2 right-2 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                        {dish.rating < 4.5 ? (
                          <img src={StarHalf} className="w-4 h-4" alt="" />
                        ) : (
                          <img src={StarFull} className="w-4 h-4" alt="" />
                        )}
                        <p className="text-[11px] md:text-[14px]">
                          {dish.rating.toFixed(1)}
                        </p>
                      </div>

                      <p className="text-(--orange-1) text-[14px] lg:text-[18px] font-extrabold">
                        ${dish.price.toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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

        {/* floating cart button */}
        <motion.div drag className="fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setShowOrder((v) => !v)}
            className="bg-amber-500 text-white rounded-full px-4 py-3 shadow-lg cursor-pointer"
          >
            Cart ({orderItems.length})
          </button>
        </motion.div>

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
          {filterButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <Filters
                onClose={() => setFilterButton(false)}
                onApply={setAppliedFilters}
                initialFilters={appliedFilters}
                mainCategory={mainCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FullMenu;
