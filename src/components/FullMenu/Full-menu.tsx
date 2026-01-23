import React, { useState, useEffect, useMemo } from "react";
import Header from "../layout/Header";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

import Loader from "../Loader";
import { Eat } from "../../data/data";
import ProductCarousel from "./ProductCarousel";



const FullMenu: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Dynamically get all unique tags from Eat data
  const allTags = useMemo(() => {
    const tags = Eat.flatMap(dish => dish.tag?.map((t: string) => t.toLowerCase()) || []);
    return Array.from(new Set(tags));
  }, []);

  // Add 'all' as the default filter
  const [filterTag, setFilterTag] = useState<string>('all');

  // Filter dishes based on selected tag
  const filteredDishes = filterTag === 'all'
    ? Eat
    : Eat.filter(dish => dish.tag && dish.tag.some((t: string) => t.toLowerCase() === filterTag));

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
          showBack={false}
        />

       <div className='pt-18 md:pt-24 max-w-[1440px] mx-auto'>
        <div className="px-6 py-4 md:py-8 md:px-10.5">

            <div className='md:p-4 gap-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-[#4A4A6A] flex justify-between items-center'>
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
                    className='flex justify-between gap-2 py-4 px-4 md:py-4 md:px-6 rounded-2xl bg-[#32324D] dark:bg-(--purple-2) text-[12px] lg:text-[16px] text-white cursor-pointer'>
                        <FaFilter size={20} />
                        <p className='hidden md:block'>Filters</p>
                </motion.div>
            </div>
          </div>

        {/* carousel section */}
        <ProductCarousel />

        {/* Dynamic filter buttons */}
        <div className='w-full p-6 lg:p-7 xl:p-10 flex items-center whitespace-nowrap overflow-auto scrollbar-hidden space-x-5 lg:space-y-5 h-fit'>
          <ul className='transition-all duration-700 transform flex items-center gap-2'>
            <motion.li
              whileTap={{ scale: 0.98 }}
              key="all"
              onClick={() => setFilterTag('all')}
              className={`text-center w-full cursor-pointer rounded-2xl text-[clamp(1rem,3vw,1.1rem)] font-medium px-3.5 md:px-6 py-3 transition-colors duration-700 ${filterTag === 'all' ? 'bg-(--yellow-1) text-white' : 'text-(--neutral-600)'}`}
            >
              <p>All Dishes</p>
            </motion.li>
            {allTags.map(tag => (
              <motion.li
                whileTap={{ scale: 0.98 }}
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`text-center w-full cursor-pointer rounded-2xl text-[clamp(1rem,3vw,1.1rem)] font-medium px-3.5 md:px-6 py-3 transition-colors duration-700 ${filterTag === tag ? 'bg-(--yellow-1) text-white' : 'text-(--neutral-600)'}`}
              >
                <p>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* product/dishes listing section */}
        <div className='px-6 py-4 md:py-8 md:px-10.5 flex flex-col gap-6'>

            <h1 className="text-[18px] text-(--neutral-600) font-semibold">Most Popular</h1>
            
            <div className='items-center gap-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {filteredDishes.map(({ id, name, image, star, price, rating }) => (
                  <div key={id} className='bg-white py-3 px-4 h-full w-full rounded-2xl gap-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex flex-col items-center relative'>
                    <div className="rounded-full mb-2">
                      <img
                        src={image}
                        className="max-w-[100px] max-h-[100px] rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-[14px] lg:text-[18px] text-center font-semibold text-[--neutral-800]">
                      {name}
                    </p>
                    <div className='space-x-1 py-1 px-1.5 flex items-center absolute top-2 right-2 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]'>
                      <img src={star} className='w-4 h-4' alt="" />
                      <p className="text-[11px] md:text-[14px]">{rating}</p> 
                    </div>
                    <p className='text-[#FF7B2C] text-[14px] lg:text-[18px] font-extrabold'>${(price).toFixed(2)}</p>
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
