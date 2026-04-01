import React from 'react'
import { motion, type Variants } from "motion/react";
import { useState, useRef, useCallback, type MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import { LiaTimesSolid } from "react-icons/lia";
import Star from "/images/star.svg";
import { PriceSelector, type PriceOption } from "./PriceSelector";
export type FiltersProps = {
  onClose: () => void;
  onApply?: (filters: {
    productTypes: string[];
    ratings: number[];
    priceRange: [number, number];
  }) => void;
  initialFilters?: {
    productTypes: string[];
    ratings: number[];
    priceRange: [number, number];
  };
  mainCategory: "Eat" | "Drink" | "Dessert";
};

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
      hidden: { x: "100vw", opacity: 0 },
      visible: {
        x: "0",
        opacity: 1,
        transition: { duration: 0.25 },
      },
      exit: { x: "100vw", opacity: 0 },
    };
  }

  // MOBILE — slide from bottom
  return {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { duration: 0.25 },
    },
    exit: { y: "100vh", opacity: 0 },
  };
};

const FilterOptions: Record<string, { id: number; name: string }[]> = {
  Eat: [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
    { id: 3, name: "Salad" },
    { id: 4, name: "Soup" },
    { id: 5, name: "Chicken" },
    { id: 6, name: "Grill" },
    { id: 7, name: "Breakfast" },
    { id: 8, name: "Lunch" },
    { id: 9, name: "Dinner" },
  ],
  Drink: [
    { id: 10, name: "Coffee" },
    { id: 11, name: "Tea" },
    { id: 12, name: "Milk Drinks" },
    { id: 13, name: "Chocolate" },
    { id: 14, name: "Energy" },
    { id: 15, name: "Smoothie" },
    { id: 16, name: "Juice" },
  ],
  Dessert: [],
};

const Ratings = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
];

const priceOptions: PriceOption[] = [
  {
    id: "10",
    label: "$10",
    value: 10,
    color: "#facc15",
    gradientFrom: "#facc15",
    gradientTo: "#fbbf24",
  },
  {
    id: "20",
    label: "$20",
    value: 20,
    color: "#fbbf24",
    gradientFrom: "#fbbf24",
    gradientTo: "#f59e0b",
  },
  {
    id: "30",
    label: "$30+",
    value: 30,
    color: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#ea580c",
  }
];

const DRAG_DISMISS_THRESHOLD = 120;

const Filters: React.FC<FiltersProps> = ({
  onClose,
  onApply,
  initialFilters,
  mainCategory,
}) => {
  const isDesktop = useIsDesktop();
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentDragY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      currentDragY.current = delta;
      if (panelRef.current) {
        panelRef.current.style.transform = `translateY(${delta}px)`;
        panelRef.current.style.opacity = `${Math.max(0.2, 1 - delta / 300)}`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (currentDragY.current > DRAG_DISMISS_THRESHOLD) {
      onClose();
    } else {
      currentDragY.current = 0;
      if (panelRef.current) {
        panelRef.current.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
        panelRef.current.style.transform = 'translateY(0)';
        panelRef.current.style.opacity = '1';
        setTimeout(() => {
          if (panelRef.current) panelRef.current.style.transition = '';
        }, 250);
      }
    }
  }, [onClose]);

  // Pending states
  const [pendingProductTypes, setPendingProductTypes] = useState<string[]>(
    initialFilters?.productTypes || [],
  );
  const [pendingRatings, setPendingRatings] = useState<number[]>(
    initialFilters?.ratings || [],
  );
  const [pendingMinValue, setPendingMinValue] = useState<number>(
    initialFilters?.priceRange[0] || 0,
  );
  const [pendingMaxValue, setPendingMaxValue] = useState<number>(
    initialFilters?.priceRange[1] || 30,
  );

  const toggleProductType = (name: string) => {
    setPendingProductTypes((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name],
    );
  };

  const toggleRating = (rating: number) => {
    setPendingRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  // slider state management
  const handlePriceChange = (value: number) => {
    // If we only have max values driving this, min value is always 0
    setPendingMinValue(0);
    setPendingMaxValue(value);
  };

  const handleApply = () => {
    onApply?.({
      productTypes: pendingProductTypes,
      ratings: pendingRatings,
      priceRange: [pendingMinValue, pendingMaxValue],
    });
    onClose();
  };

  return (
    <motion.div
      ref={panelRef}
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full sm:min-h-screen sm:w-[55%] md:w-[45%] lg:w-[450px] top-[7%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#f7f7f7] dark:bg-[#32324D]"
    >
      <div className="flex flex-col h-full px-6 py-4">
        {/* Drag handle – touch-drag down to close on mobile */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="top-0 py-3 flex items-center justify-center cursor-grab active:cursor-grabbing sm:hidden touch-none"
        >
          <div className="w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm" />
        </div>

        <div className="flex justify-between mb-4">
          <h1 className="mx-auto sm:ml-0 text-[22px] dark:text-[#FFFFFF] font-semibold">
            Filters
          </h1>

          {/* <motion.img whileTap={{ scale: 0.96 }} onClick={onClose} src={Cancel} className="w-6 sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50" alt="" /> */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50"
          >
            <LiaTimesSolid
              size={24}
              className="text-(--neutral-400) dark:text-(--neutral-200)"
            />
          </motion.div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-6">
          <div className="space-y-[15px]">
            <h1 className="text-[#666687] dark:text-[#DCDCE4] text-4 font-600">
              Select Product Type
            </h1>

            <div className="text-4 font-600 text-[#8E8EA9] gap-4 flex flex-wrap items-center">
              {FilterOptions[mainCategory]?.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => toggleProductType(type.name)}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 ${pendingProductTypes.includes(type.name) ? "bg-amber-500 text-white dark:text-black" : "bg-[#FFFFFF] dark:bg-[#32324D] dark:text-[#EAEAEF] border border-gray-500"}`}
                >
                  <p>{type.name}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-[15px]">
            <h1 className="text-[#666687] dark:text-[#DCDCE4] text-4 font-600">
              Rating
            </h1>

            <div className="text-4 font-600 text-[#8E8EA9] gap-4 flex flex-wrap  items-center">
              {Ratings.map((rating) => (
                <motion.button
                  key={rating.id}
                  onClick={() => toggleRating(parseInt(rating.name))}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 border border-gray-500 ${pendingRatings.includes(parseInt(rating.name)) ? "bg-amber-500 text-white dark:text-black" : "bg-[#FFFFFF] dark:bg-[#32324D] dark:text-[#EAEAEF]"}`}
                >
                  <img src={Star} className="w-[18px] h-[18px]" alt="" />
                  <p className="text-4">{rating.name}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-[15px]">
            <h1 className="text-[#666687] dark:text-[#DCDCE4] text-4 font-600">
              Maximum Price
            </h1>

            <PriceSelector
              options={priceOptions}
              selectedValue={pendingMaxValue}
              onSelectionChange={handlePriceChange}
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
        <div className="flex bottom-0">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="rounded-2xl text-[#FFFFFF] font-semibold bg-[#32324D] dark:bg-[#615793] p-4 cursor-pointer w-full"
          >
            Apply Filters
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters