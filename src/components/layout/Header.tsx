import React, { useState } from 'react'
import { motion } from 'motion/react'
import Location from "/images/Map-pin.png"
import ChevronDown from "/images/chevron-down.png"
import Cart from "/images/cart-img.png"
import { RiMenu2Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'

type HeaderProps = {
  onToggle?: () => void
  toggle?: boolean
  title?: string
  text?: string
  image?: string
  text1?: string
  link: string
  showBack?: boolean
  // toggleOrder?: boolean
}

const Header: React.FC<HeaderProps> = ({ onToggle, toggle, title, text, text1, link, showBack }) => {

  
  const [isOpen, setIsOpen] = useState(false)
  const controlled = typeof onToggle === 'function' && typeof toggle === 'boolean'
  const effectiveOpen = controlled ? toggle : isOpen

  const handleToggle = () => {
    if (controlled) {
      onToggle && onToggle()
    } else {
      setIsOpen((v) => !v)
    }
  }
  
  const [toggleOrder, setToggleOrder] = useState(false)


  return (
    <div className='bg-[#f7f7f7] dark:bg-[#2c2c45] md:border-b border-[#32324D] dark:border-[#f7f7f7] w-full z-40'>
      {/* mobile */}
      <div className="flex md:hidden justify-between items-center mx-auto p-4">
        <div className="flex space-x-2 items-center">
          { !(showBack ) ? (
            <NavLink to={link}>
              <motion.button whileTap={{ scale: 0.9 }}
                className='p-2 cursor-pointer border border-gray-600 bg-[#FFFFFF] dark:bg-[#4A4A6A] rounded-sm' aria-label="Back">
                <FaArrowLeft className='w-4 h-4 dark:fill-[#FFFFFF]' />
              </motion.button>
            </NavLink>
          ) : (
            <img src={Location} className="w-5 h-5" alt="Logo" />
          )}
          <p className="text-lg font-bold text-gray-700 dark:text-[#DCDCE4]">{text1}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleToggle}
          className='w-5 h-4 cursor-pointer'
          // aria-pressed={effectiveOpen}
        >
          <RiMenu2Line size={25} className='dark:fill-[#FFFFFF]' />
        </motion.button>
      </div>

      {/* desktop header */}
      <div className={`hidden md:flex justify-between items-center px-6 py-3 transition-all duration-300 ${!effectiveOpen ?  'md:ml-[12%] lg:ml-[9%]' : 'ml-[20%]'}`}>
        <div className='flex items-center gap-2'>
          {showBack && link && (
            <NavLink to={link}>
              <motion.button whileTap={{ scale: 0.9 }}  
                className='p-2 cursor-pointer border border-gray-600 bg-[#FFFFFF] dark:bg-[#4A4A6A] rounded-sm' aria-label="Back">
                  {/* <img src={ArrowLeft} className='w-4 h-4' alt="Back" /> */}
                  <FaArrowLeft className='w-4 h-4 dark:fill-[#FFFFFF]' />
              </motion.button>
            </NavLink>
          )}
          <div className=''>
            <h1 className='text-[14px] font600 text-[#8E8EA9] dark:text-[#DCDCE4]'>{title}</h1>
            <p className="text-[16px] lg:text-[20px] font-500 text-gray-900 dark:text-[#FFFFFF]">{text}</p>
          </div>
        </div>

        <div className='flex'>
          <motion.button
            onClick={() => {setToggleOrder(!toggleOrder)}}
            whileTap={{ scale: 0.96 }}
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
          >
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Gram Bistro</p>
            <div className='w-5 h-5'>
              <img src={ChevronDown} className={`w-full h-full ${ toggleOrder ? 'rotate-180' : '' }`} alt="" />
            </div>
          </motion.button>

          <div className='border border-gray-700 my-auto h-5'></div>
          
          <NavLink to="/orderStatus">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {setToggleOrder(!toggleOrder)}}
              className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
            >
              <div className='w-5 h-5'>
                <img src={Cart} className='w-full h-full' alt="" />
              </div>
              <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>My Order</p>
            </motion.button>
          </NavLink>
        </div>
      </div>

      {/* <div className={`bg-[#32324D] gap-5 h-fit max-w-[420px] ml-auto right-6 absolute z-50 rounded-2xl px-[16px] py-[20px] top-[80px] shadow-[0_4px_12px_rgba(0,0,0,0.10)] ${toggleOrder ? 'hidden md:flex' : 'hidden'}`}>
        <motion.div whileTap={{ scale: 0.96 }} className='bg-[#FFFFFF] cursor-pointer rounded-xl shadow-sm p-3 text-[15px]'>View Order</motion.div>

        <NavLink to="">
          <motion.div whileTap={{ scale: 0.96 }} className='bg-[#FFFFFF] cursor-pointer rounded-xl shadow-sm p-3 text-[15px]'>Order Status</motion.div>
        </NavLink>
      </div> */}
    </div>
  )
}

export default Header
