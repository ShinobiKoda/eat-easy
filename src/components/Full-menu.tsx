import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from "./layout/Header";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { motion } from 'framer-motion'
import Choice from '/images/choiceimg.svg'

import Loader from "./Loader";

const FullMenu: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);


  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={`transition-all duration-300 ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
       <Header title='Full Menu' description="See All Our Dishes" navbarTitle='Gram Bistro'/>

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
                className='flex justify-between gap-2 py-4 px-4 md:py-4 md:px-6 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-[12px] lg:text-[16px] text-white cursor-pointer'>
                    <FaFilter size={20} />
                    <p className='hidden md:block'>Filters</p>
            </motion.div>
        </div>
       </div>

       <div className="px-6 py-4 md:py-8 md:px-10.5">
        <div className='gap-4 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] dark:bg-white bg-[#4A4A6A] flex justify-between items-center'>
            <div className='max-w-[148px] sm:max-w-[180px] flex flex-col left-[22px]'>
                <p>Product of the day</p>
                <h2>Avocado Chicken Salad</h2>
                <p>$10.40</p>
            </div>
            <div>
                <img src={Choice} alt="" />
            </div>
        </div>
       </div>

      </div>
    </div>
  );
};

export default FullMenu;