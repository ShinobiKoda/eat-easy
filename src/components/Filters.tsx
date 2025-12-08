import React from 'react'
import { motion, type Variants } from "motion/react";
import { useState, type MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import Cancel from "/images/Cancel.png"
import Star from "/images/star.svg"

export type FiltersProps = {
  onClose: () => void;
}

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
        hidden: { x: "100vw", opacity: 0 },
        visible: {
          x: "0",
          opacity: 1,
          transition: { duration: 0.25 }
        },
        exit: { x: "100vw", opacity: 0 }
    };
  }
  
  // MOBILE — slide from bottom
  return {
      hidden: { y: "100vh", opacity: 0 },
      visible: {
          y: "0",
          opacity: 1,
          transition: { duration: 0.25 }
      },
      exit: { y: "100vh", opacity: 0 }
  };
}

const ProductTypes = [
    { name: 'Pizza' },
    { name: 'Butter' },
    { name: 'Salad' },
    { name: 'Soup' },
    { name: 'Chicken' },
    { name: 'Grill' },
    { name: 'Breakfast' },
]

// NOTE: component state/hooks are declared inside the component below

const Ratings = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' }
]

const Filters: React.FC<FiltersProps> = ({ onClose }) => {
  const isDesktop = useIsDesktop();

    // allow multiple ProductTypes to be selected; store selected indices
    const [selectedProductType, setSelectedProductType] = useState<number[]>([])

    const toggleProductType = (index: number) => {
        setSelectedProductType(prev =>
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    // allow multiple ratings to be selected; store selected indices
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])

    const toggleRating = (index: number) => {
        setSelectedRatings(prev =>
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full min-h-screen sm:w-[55%] md:w-[45%] lg:w-[37%] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#f7f7f7]"
    >
      <div className="flex flex-col h-full px-[24px] py-[16px]">
        <div onClick={onClose} className="top-0 my-2 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm sm:hidden" />

        <div className='flex justify-between mb-4'>
            <h1 className='text-[16px] font-semibold'>Filters</h1>
            <motion.img whileTap={{ scale: 0.96 }} onClick={onClose} src={Cancel} className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50" alt="" />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-[24px]">
            <div>
                <h1 className="text-[#666687] text-[18px] font-semibold">Select Categories</h1>

                <div className={`flex w-full justify-between space-x-4 md:space-x-0 lg:space-x-2 text-[15px] text-black`}>
                    <div
                        // onClick={() => setMenu(0)}
                        className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300`}
                    >
                        Eat
                    </div>

                    <div
                        // onClick={() => setMenu(1)}
                        className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300`}
                    >
                        Drink
                    </div>

                    <div
                        // onClick={() => setMenu(2)}
                        className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300 `}
                    >
                        Dessert
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-[#666687] text-[18px] font-semibold">Select Product Type</h1>

                <div className='text-[16px] font-600 text-[#8E8EA9] gap-4 flex flex-wrap justify-center items-center'>
                    {ProductTypes.map((type, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => toggleProductType(idx)}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 ${selectedProductType.includes(idx) ? 'bg-amber-500 text-white' : 'bg-[#FFFFFF] border-2 border-gray-500'}`}>
                        <p>{type.name}</p>
                    </motion.button>
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-[#666687] text-[18px] font-semibold">Rating</h1>

                <div className='text-[16px] font-600 text-[#8E8EA9] gap-4 flex flex-wrap justify-center items-center'>
                    {Ratings.map((Rating, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => toggleRating(idx)}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 border-2 border-gray-500 ${selectedRatings.includes(idx) ? 'bg-amber-500 text-white' : 'bg-[#FFFFFF]'}`}>
                        <p>{Rating.name}</p>
                        <img src={Star} className='w-5 h-5 md:w-7 md:h-7' alt="" />
                    </motion.button>
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-[#666687] text-[18px] font-semibold">Rating</h1>

            </div>

            <motion.button 
                whileTap={{ scale: 0.98 }}  
                className='rounded-2xl bg-[#32324D] p-4 cursor-pointer w-full'>Apply
            </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Filters