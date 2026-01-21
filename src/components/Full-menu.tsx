import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from "./layout/Header";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { motion } from 'framer-motion'
import Choice from 'public/images/choiceimg.svg'

import Loader from "./Loader";

const Product = [
  { id: 1, name: "Avocado Chicken Salad", price: "$10.00", image: Choice, description: "Product of the day" },
  { id: 2, name: "Grilled Salmon Bowl", price: "$12.50", image: Choice, description: "Chef's special" },
  { id: 3, name: "Vegan Buddha Bowl", price: "$9.80", image: Choice, description: "Healthy pick" },
  { id: 4, name: "Quinoa Power Salad", price: "$11.20", image: Choice, description: "Energizer" },
];

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

       <div className='pt-18 md:pt-24'>
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

        {/* food of the day section */}
        <div className="py-4 flex items-center justify-center overflow-hidden w-full relative h-[145px] md:h-[250px] ">
            {/* products */}
            {Product.map(({ id, name, price, image, description }) => (
                <motion.div 

                    key={id} 
                    className="overflow-clip rounded-2xl dark:bg-white bg-[#4A4A6A] flex items-center justify-between gap-2 h-full absolute w-[85%] sm:w-[70%] max-w-[800px]"
                >

                    <div className="flex-1 space-y-2 sm:space-y-3 relative left-4 w-full py-3">
                        <p className="text-sm text-gray-400 tracking-wide">{description}</p>

                        <h2 className=" text-white dark:text-[#4A4A6A] font-semibold leading-tight text-[clamp(1rem,3vw,2rem)]">{name}</h2>

                        <p className=" text-(--yellow-1) font-bold text-[clamp(1.25rem,3vw,2.25rem)]">{price}</p>
                    </div>

                    <div className="h-full w-full max-w-[190px] sm:max-w-[285px] lg:max-w-[416px] flex items-center justify-center relative -right-10 sm:right-0">
                        <img
                            src={image}
                            alt="Avocado Chicken Salad"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </motion.div>
            ))}

        </div>

       </div>

      </div>
    </div>
  );
};

export default FullMenu;