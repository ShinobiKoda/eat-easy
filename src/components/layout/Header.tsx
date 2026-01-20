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
import Navbar from "./Navbar";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import {
  MotionContainer,
  MotionItem,
  FadeIn,
  PopIn,
  SlideIn,
} from "../animations/motion";
import { motion } from "motion/react";

interface HeaderProps {
  title?: string;
  description?: string;
  previous?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Food Menu",
  description = "",
  previous,
}) => {
  return (
    <div className="w-full">
      <SlideIn direction="down" className="w-full lg:hidden">
        <Navbar />
      </SlideIn>

      <MotionContainer className="w-full hidden lg:flex px-[30px] py-5 border-b-[1.5px] border-b-(--neutral-150) items-center justify-between">
        <div className="flex items-center gap-3">
          {previous && (
            <PopIn>
              <motion.button
                onClick={previous}
                className="w-12 h-12 rounded-xl bg-white flex items-center justify-center cursor-pointer"
                aria-label="Go back"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <IoArrowBack size={20} />
              </motion.button>
            </PopIn>
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
          <MotionItem>
            <p className="flex flex-col">
              <span className="font-semibold text-sm text-(--neutral-500)">
                {title}
              </span>
              <span className="heading-font font-medium text-[22px] text-(--neutral-800)">
                {description}
              </span>
            </p>
          </MotionItem>
        </div>
        <div className="flex items-center gap-3">
          <FadeIn>
            <motion.button
              className="flex items-center px-6 py-3 gap-px cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <CiLocationOn size={20} className="text-(--purple-3)" />
              <span className="font-semibold text-sm text-(--purple-3)">
                8th Ave, New York
              </span>
              <FiChevronDown size={20} className="text-(--purple-3)" />
            </motion.button>
          </FadeIn>
          <FadeIn>
            <div className="w-[21px] h-full border-[1.5px] border-(--neutral-200) rotate-90"></div>
          </FadeIn>
          <SlideIn direction="left">
            <motion.button
              className="px-6 py-3 text-(--purple-3) flex items-center gap-px cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <IoCartOutline size={20} />
              <span className="font-semibold text-sm">My Order</span>
            </motion.button>
          </SlideIn>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Header;
