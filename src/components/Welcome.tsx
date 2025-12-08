import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import PopSign from "/images/popsign.png"
import Location from "/images/Map-pin.png"
import Time from "/images/time-img.png"
import Gram from "/images/Gram.png"
import Bulb from "/images/bulb-img.png"
import Book from "/images/menubook.png"
import ArrowRight from "/images/arrow-right.png"
import { NavLink } from 'react-router-dom'

const Welcome: React.FC = () => {
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

  const Next = [
    {
      image: Bulb,
      title: 'Choose Virtual Assistant',
      text: 'Simplify your decisions through our Smart Menu Assistant who will help you.',
      link: "/virtual"
    },
    {
      image: Book,
      title: 'Go to the menu',
      text: 'If you already know what to order, this is the best choice.',
      link: "/welcome"
    }
  ]

  return (
    <div className="w-full min-h-screen">

      <Navbar showHeader={true} showAside={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Food Menu" text="Browse Our Food Menu" text1='Gram Bistro' link='/welcome' />

      <div className={`transition-all duration-300 relative ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col p-6 space-y-10'>
          <div className='bg-[#32324D] text-white rounded-3xl hidden md:flex justify-between items-center'>

            <div className='xl:mx-12 mx-6 py-5 h-fit space-y-1 md:w-[70%] xl:w-[50%]'>
              <p className='xl:text-[32px] lg:text-[28px] md:text-[24px] font-400'>Welcome to </p>
              <div className='flex items-center'>
                <p className='xl:text-[32px] lg:text-[28px] md:text-[20px] font-bold'>Gram Bistro Restaurant</p>
                 <span className='lg:w-[30px] lg:h-[30px] w-[25px] h-[25px]'><img src={PopSign} className='w-full h-full' alt="" /></span>
              </div>
              <div className='flex space-x-4 mt-5'>
                <div className='flex space-x-2'>
                  <span className='w-5 h-5'><img src={Location} alt="" /></span>
                  <p className='lg:text-[16px] text-[12px] font-500'>790 8th Ave, New York</p>
                </div>
                <div className='flex space-x-2'>
                  <span className='w-5 h-5'><img src={Time} alt="" /></span>
                  <p className='lg:text-[16px] text-[12px] font-500'>Mon - Sun: 12AM - 10 PM</p>
                </div>
              </div>
            </div>

            <div className='max-w-[442px] max-h-[271px] lg:px-10 '>
              <img src={Gram} className='w-full h-full' alt="" />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between gap-10'>
            <div className='gap-4 lg:max-w-1/2 hidden md:flex flex-col'>
              <h1 className='lg:text-[26px] text-[23px] font-bold'>Find Your Flavor: <br /> Two Options to Browse Our Menu</h1>
              <p className='text-[16px] lg:text-[18px] font-600 text-[#8E8EA9]'>We've got you covered! Whether you're feeling adventurous or know exactly what you want, we offer two ways to browse our menu that cater to your mood.</p>
            </div>

            <div className='flex flex-col md:hidden'>
              <h1 className='text-[22px] font-bold'>Let’s find the perfect dish for you</h1>
            </div>

            <div className='flex flex-col items-center md:items-stretch md:flex-row gap-6 md:gap-2 lg:max-w-1/2 lg:flex-col'>
              {Next.map((option, idx) => (
                <div key={idx} className='bg-white rounded-2xl sm:w-[80%] md:w-full p-5 space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.10)]'>
                  <div><img src={option.image} alt="" /></div>
                  <h1 className='lg:text-[22px] text-[16px] font-bold'>{option.title}</h1>
                  <div className='flex gap-4 md:gap-9 items-center justify-between'>
                    <p className='lg:text-[16px] text-[16px] font-500 text-[#8E8EA9]'>{option.text}</p>
                    <NavLink to={option.link} className="min-w-10">
                      <motion.button whileTap={{ scale: 0.9 }} className='rounded-xl bg-[#FFF2EA] cursor-pointer'><img src={ArrowRight} className='w-12 h-full p-3' alt="" /></motion.button>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome