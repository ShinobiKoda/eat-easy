import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import { NavLink } from 'react-router-dom'
import ArrowRight from "/images/arrow-right.png"
import Calendar from "/images/calender-icon.png"

const Recommend: React.FC = () => {
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
    <div className="bg-[#F7F7F7] w-full min-h-screen">

      <div className=''>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Food Menu" text="Virtual Assistant" text1='' link='/virtual' />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6 space-y-10 my-5'>

          <div className='flex flex-col items-center text-center max-w-xl mb-20 md:mb-10'>
            <h1 className='text-[22px] lg:text-[32px] text-[#32324D] font-bold mb-2'>It seems like we already know <br/> each other</h1>
            <p className='text-[16px] lg:text-[px] font-600 text-[#8E8EA9]'>You can use the recommendations configured during your last visit to our restaurant or you can have new ones.</p>
          </div>

          <div className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] space-y-4 w-full lg:w-xl flex flex-col items-center mb-50 md:mb-20'>
            <div className='bg-white rounded-2xl w-full p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
                <p className='text-[16px] text-[#32324D] font-bold'>New recommendation</p>
                <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'><img src={ArrowRight} className='w-8 h-full' alt="" /></motion.button>
            </div>
            <div className='bg-white rounded-2xl w-full p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
                <div className='space-y-3'>
                    <p className='text-[16px] text-[#32324D] font-bold'>Your last recommendation</p>
                    <div className='flex gap-2 items-center'><span><img src={Calendar} alt="" /></span>02/12/2028</div>
                </div>
                <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'><img src={ArrowRight} className='w-8 h-full' alt="" /></motion.button>
            </div>
          </div>

          <div className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] space-y-4 w-full lg:w-xl flex flex-col items-center'>
              <NavLink to="/step1" className="w-full">
                  <motion.button 
                      whileTap={{ scale: 0.95 }}  
                      className='rounded-2xl bg-[#32324D] p-4 cursor-pointer w-full'>Next
                  </motion.button>
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend