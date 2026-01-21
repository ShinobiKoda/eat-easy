import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

import Loader from "../Loader";
import { Eat } from "../../data/data";
import ProductCarousel from "./ProductCarousel";

const Categories = [
  { id: 1, name: "All Dishes" },
  { id: 2, name: "Most Popular" },
  { id: 3, name: "Salad" },
  { id: 4, name: "Pizza" },
  { id: 5, name: "Pasta" },
];

const FullMenu: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const [filterDish, setFilterDish] = useState(Categories[0].id);

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
          navbarTitle="Gram Bistro"
        />

        <div className="pt-18 md:pt-24">
          <div className="px-6 py-4 md:py-8 md:px-10.5">
            <div className="md:p-4 gap-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-[#4A4A6A] flex justify-between items-center">
              <div className="w-full flex items-center justify-center px-4 py-3 rounded-2xl border border-(--neutral-150) bg-transparent dark:border-(--neutral-600)">
                <input
                  type="text"
                  className="outline-none border-none w-full placeholder:text-(--neutral-500) text-(--neutral-500) dark:placeholder:text-(--neutral-200) dark:text-(--neutral-200)"
                  placeholder="Search"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
                <CiSearch
                  size={20}
                  className="text-(--neutral-300) cursor-pointer"
                />
              </div>

              <motion.div
                whileTap={{ scale: 0.96 }}
                // onClick={() => setFilter(!filter)}
                className="flex justify-between gap-2 py-4 px-4 md:py-4 md:px-6 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-[12px] lg:text-[16px] text-white cursor-pointer"
              >
                <FaFilter size={20} />
                <p className="hidden md:block">Filters</p>
              </motion.div>
            </div>
          </div>

          {/* carousel section */}
          <ProductCarousel />

          {/* filterDish buttons */}
          <div className="w-full p-6 lg:p-7 xl:p-10 flex items-center whitespace-nowrap overflow-auto scrollbar-hidden space-x-5 lg:space-y-5 h-fit">
            <ul className="transition-all duration-900 transform flex items-center gap-2">
              {Categories.map(({ id, name }) => (
                <motion.li
                  whileTap={{ scale: 0.98 }}
                  key={id}
                  onClick={() => setFilterDish(id)}
                  className={`text-center w-full cursor-pointer rounded-2xl text-[clamp(1rem,3vw,1.1rem)] font-bold px-3.5 md:px-6 py-3 transition-colors duration-900 ${filterDish === id ? "bg-(--yellow-1) text-white" : "text-(--neutral-300)"}`}
                >
                  <p>{name}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="pl-6 py-4 md:py-8 md:pl-10.5">
            <h1 className="text-[#666687] text-[18px] dark:text-[#DCDCE4] font-semibold">
              Most Popular
            </h1>

            <div className="flex items-center gap-4 flex-nowrap">
              {Eat.map(({ id, star, price, rating }) => (
                <div key={id} className="bg-white rounded-2xl py-3 px-4">
                  <div className="space-x-1 flex items-center">
                    <img src={star} className="w-4 h-4" alt="" />
                    <p>{rating}</p>
                  </div>
                  <p className="text-[#FF7B2C] text-[15px] lg:text-[18px] font-extrabold">
                    ${price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenu;
