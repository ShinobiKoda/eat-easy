import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import AI from "/images/AI-image.png"
import { NavLink } from 'react-router-dom'

const Virtual: React.FC = () => {
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

  return (
    <div className="w-full min-h-screen">

      <div className='hidden md:flex'>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Food Menu" text="Virtual Assistant" text1='' link='/welcome' />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center p-6 space-y-10 mb-5'>

            <div className='lg:max-w-1/2'>
              <div><img src={AI} alt="" /></div>
            </div>

            <div className='flex flex-col items-center text-center mb-30'>
              <h1 className='text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold'>Hello! <br /> I'm your virtual assistant.</h1>
              <p className='text-[16px] lg:text-[px] font-600 text-[#8E8EA9] dark:text-[#EAEAEF]'>In order to find the best suited choice for you, please answer the next few questions.</p>
            </div>

            <div className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] space-y-4 w-full lg:w-xl flex flex-col items-center'>
                <NavLink to="/recommend" className="w-full">
                    <motion.button 
                        whileTap={{ scale: 0.95 }}  
                        className='rounded-2xl bg-[#32324D] dark:bg-[#615793] dark:text-[#FFFFFF] p-4 cursor-pointer w-full'>Great, let's start
                    </motion.button>
                </NavLink>
                <NavLink to="/welcome" className="w-full">
                    <motion.button 
                        whileTap={{ scale: 0.95 }}  
                        className='p-4 cursor-pointer dark:text-[#EBEAF2] w-full rounded-2xl'>Take me to the menu
                    </motion.button>
                </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Virtual