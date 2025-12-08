import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import { NavLink } from 'react-router-dom'
import Angry from "/images/angry-img.png"
import Bored from "/images/bored-img.png"
import Hungry from "/images/hungry-img.png"
import Sick from "/images/sick-img.png"
import Thirsty from "/images/thirsty-img.png"
import Tired from "/images/tired-img.png"


const Step1: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const toggleNav = () => {
    setToggle(prev => !prev)
    if (!toggle) {
      // when opening, keep menuOpen as is
    } else {
      // when closing clear submenu
      setMenuOpen(null)
    }
  }

  const closeNav = () => {
    setToggle(false)
    setMenuOpen(null)
  }

  // allow multiple feelings to be selected; store selected indices
  const [selectedFeelings, setSelectedFeelings] = useState<number[]>([])

  const toggleFeeling = (index: number) => {
    setSelectedFeelings(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const Feelings = [
    { name: 'Thirsty', image: Thirsty },
    { name: 'Hungry', image: Hungry },
    { name: 'Tired', image: Tired },
    { name: 'Angry', image: Angry },
    { name: 'Bored', image: Bored },
    { name: 'Sick', image: Sick },
    { name: 'Energized', image: Thirsty },
    { name: 'Thirsty', image: Thirsty },
    { name: 'Other', image: Sick },
  ]

  return (
    <div className="w-full min-h-screen">

      <div className=''>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Food Menu &nbsp;&nbsp; | &nbsp;&nbsp; Virtual Assistant" text="Step 1" text1='Step 1' link='/recommend'  />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6 space-y-10 my-5'>

            <div className='flex flex-col items-center text-center max-w-xl'>
              <h1 className='text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold mb-2'>How are you feeling right now?</h1>
              <p className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] dark:text-[#EAEAEF]'>Select all that applies</p>
            </div>

            <div className='text-[16px] font-700 text-[#8E8EA9] dark:text-[#EAEAEF] gap-4 w-full lg:w-xl flex flex-wrap justify-center items-center mb-50 md:mb-20'>
                {Feelings.map((feeling, idx) => (
                <motion.button
                    key={idx}
                    onClick={() => toggleFeeling(idx)}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 border-2 border-gray-500 ${selectedFeelings.includes(idx) ? 'bg-amber-500 text-white dark:text-[#32324D]' : ''}`}>
                    <img src={feeling.image} className='w-5 h-5 md:w-7 md:h-7' alt="" />
                    <p>{feeling.name}</p>
                </motion.button>
                ))}
            </div>

            <div className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] space-y-4 w-full lg:w-xl flex flex-col items-center'>
                <NavLink to="/welcome" className="w-full">
                    <motion.button 
                        whileTap={{ scale: 0.98 }}  
                        className='p-4 cursor-pointer w-full dark:text-[#EBEAF2] rounded-2xl'>Take me to the menu
                    </motion.button>
                </NavLink>
                <NavLink to="/recommended" className="w-full">
                    <motion.button 
                        whileTap={{ scale: 0.98 }}  
                        className='rounded-2xl bg-[#32324D] dark:bg-[#615793] dark:text-[#FFFFFF] p-4 cursor-pointer w-full'>Continue
                    </motion.button>
                </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Step1