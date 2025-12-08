import React from 'react'
import { motion, type Variants } from "motion/react";
import { useState, type MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import Cancel from "/images/Cancel.png"
import Star from "/images/star.svg"
import MultiRangeSlider from "multi-range-slider-react";
// import the component's default styles so we can override them
import 'multi-range-slider-react/lib/multirangeslider.css';

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

const Categories = [
    { id: 1, name: 'Eat', },
    { id: 2, name: 'Drink', },
    { id: 3, name: 'Dessert', }
]

const ProductTypes = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Butter' },
    { id: 3, name: 'Salad' },
    { id: 4, name: 'Soup' },
    { id: 5, name: 'Chicken' },
    { id: 6, name: 'Grill' },
    { id: 7, name: 'Breakfast' },
]

const Ratings = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' }
]

const Filters: React.FC<FiltersProps> = ({ onClose }) => {
  const isDesktop = useIsDesktop();

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    const toggleCategory = (id: number) => {
        setSelectedCategory(prev => prev === id ? null : id)
    }

    const [selectedProductType, setSelectedProductType] = useState<number | null>(null)

    const toggleProductType = (id: number) => {
        setSelectedProductType(prev => prev === id ? null : id)
    }

    const [selectedRatings, setSelectedRatings] = useState<number | null>(null)

    const toggleRating = (id: number) => {
        setSelectedRatings(prev => prev === id ? null : id)
    }

    // slider state management
    const [minValue, set_minValue] = useState<number>(2);
    const [maxValue, set_maxValue] = useState<number>(4);
    const handleInput = (e: { minValue: number; maxValue: number }) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full sm:min-h-screen sm:w-[55%] md:w-[45%] lg:w-[450px] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#f7f7f7]"
    >
      <div className="flex flex-col h-full px-[24px] py-[16px]">
        <div onClick={onClose} className="top-0 my-2 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm sm:hidden" />

        <div className='flex justify-between mb-4'>
            <h1 className='text-[16px] font-semibold'>Filters</h1>
            <motion.img whileTap={{ scale: 0.96 }} onClick={onClose} src={Cancel} className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50" alt="" />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-[24px]">
            <div className='space-y-[15px]'>
                <h1 className="text-[#666687] text-[16px] font-600">Select Categories</h1>

                <div className='text-[16px] font-600 text-[#8E8EA9] gap-4 flex flex-wrap items-center'>
                    {Categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => toggleCategory(cat.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-amber-500 text-white' : 'bg-[#FFFFFF] border border-gray-500'}`}>
                            <p>{cat.name}</p>
                        </motion.button>
                        ))}
                </div>
            </div>

            <div className='space-y-[15px]'>
                <h1 className="text-[#666687] text-[16px] font-600">Select Product Type</h1>

                <div className='text-[16px] font-600 text-[#8E8EA9] gap-4 flex flex-wrap items-center'>
                    {ProductTypes.map((type) => (
                        <motion.button
                            key={type.id}
                            onClick={() => toggleProductType(type.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 ${selectedProductType === type.id ? 'bg-amber-500 text-white' : 'bg-[#FFFFFF] border border-gray-500'}`}>
                            <p>{type.name}</p>
                        </motion.button>
                        ))}
                </div>
            </div>

            <div className='space-y-[15px]'>
                <h1 className="text-[#666687] text-[16px] font-600">Rating</h1>

                <div className='text-[16px] font-600 text-[#8E8EA9] gap-4 flex flex-wrap  items-center'>
                    {Ratings.map((rating) => (
                    <motion.button
                        key={rating.id}
                        onClick={() => toggleRating(rating.id)}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 border border-gray-500 ${selectedRatings === rating.id ? 'bg-amber-500 text-white' : 'bg-[#FFFFFF]'}`}>
                        <img src={Star} className='w-[18px] h-[18px]' alt="" />
                        <p className='text-[16px]'>{rating.name}</p>
                    </motion.button>
                    ))}
                </div>
            </div>

            <div className='space-y-[15px]'>
                <h1 className="text-[#666687] text-[16px] font-600">Price Range</h1>

                <div className='space-y-10'>
                    <div className="App">
                        <MultiRangeSlider
                            min={1.0}
                            max={6.0}
                            step={1}
                            minValue={minValue}
                            maxValue={maxValue}
                            onInput={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className='text-[14px] font-600 text-[#8E8EA9] rounded-2xl px-[16px] py-[12px] flex items-center bg-[#FFFFFF] border border-gray-500'>Minimum price: ${minValue.toFixed(2)}</div>

                        <div className='w-[16px] border border-[#DCDCE4]'></div>

                        <div className='text-[14px] font-600 text-[#8E8EA9] rounded-2xl px-[16px] py-[12px] flex items-center bg-[#FFFFFF] border border-gray-500'>Maximum price: ${maxValue.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div  className='space-y-[15px]'>
                <motion.button 
                    whileTap={{ scale: 0.98 }}  
                    className='rounded-2xl bg-[#32324D] p-4 cursor-pointer w-full'>Apply
                </motion.button>
            </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Filters