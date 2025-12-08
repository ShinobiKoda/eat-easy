import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"
import Backdrop from "./layout/Backdrop"
import MapFrame from "/images/Map Frame2.png"
import Location from "/images/Map-pin.png"
import SearchIcon from "/images/search-icon.png"
import PopSign from "/images/popsign.png"
import ArrowRight from "/images/arrow-right.png"
import { NavLink } from 'react-router-dom'


const Locations: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(id)
    if (id !== null && !isOpen) setIsOpen(true) // open sidebar when submenu opens
  }

  const Available = [
    { address: '790 8th Ave New York', distance: '0.6 km away' },
    { address: '723 8th Ave New York', distance: '1.2 km away' },
    { address: '508 8th Ave New York', distance: '3.5 km away' },
    { address: '123 8th Ave New York', distance: '9.7 km away' }
  ]

  return (
    <div className="w-full  min-h-screen"
        style={{ backgroundImage: `url(${MapFrame})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      {/* header */}
      <div className='w-full md:hidden'>
        <Header
          toggle={isOpen}
          onToggle={() => setIsOpen(v => !v)}
          title=''
          text='' 
          text1='' 
          link='' 
          // showBack={false}
        />
      </div>
      {/* sidebar */}
      <div className='flex'>
        <Sidebar
          toggle={isOpen}
          onToggle={() => setIsOpen(v => !v)}
          menuOpen={menuOpen}
          setMenuOpen={handleSetMenuOpen}
        />
      </div>
      {/* backdrop */}
      {isOpen && (
        <Backdrop onClick={() => setIsOpen(v => !v)} />
      )}

      <div 
        className={`py-[70px] px-[24px] md:px-[70px] max-w-6xl transition-all duration-300 ${!isOpen ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>

        <div className='bg-white max-w-[700px] mx-auto flex flex-col items-center p-6 space-y-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]'>

          <div className='flex items-center mb-5'>
            <p className='lg:text-[28px] text-[20px] font-bold'>Set your location</p>
            <span className='lg:w-[30px] lg:h-[30px] w-[25px] h-[25px]'><img src={PopSign} className='w-full h-full' alt="" /></span>
          </div>

          {/* input field */}
          <div className='py-2 px-3 rounded-2xl border-2 border-gray-500 flex items-center justify-between gap-4 w-full'>
            <input 
              type="text"    
              placeholder='Search for streets, cities, districts...'
              className='bg-transparent outline-none w-full'
              aria-expanded='false'
            />

            <motion.button
              whileTap={{ scale: 0.9 }} 
              className='w-6 h-6 cursor-pointer'
            >
              <img src={SearchIcon} className='w-full h-full' alt="" />
            </motion.button>
          </div>

          <div className='items-center sm:flex'>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
            >
              <div className='w-5 h-5'>
                <img src={Location} className='w-full h-full' alt="" />
              </div>
              <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Use my current location</p>
            </motion.button>
  
            <div className='border hidden sm:flex border-gray-400 my-auto h-4'></div>
  
            <motion.button
              whileTap={{ scale: 0.96 }}
              className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
            >
              <div className='w-5 h-5'>
                <img src={Location} className='w-full h-full' alt="" />
              </div>
              <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Set my location on map</p>
            </motion.button>
          </div>

          
          <div className='hidden flex-col items-center rounded-2xl bg-white shadow-2xl w-full' aria-label='input'>
            {Available.map((option, idx) => (
              <div key={idx} className='flex space-y-4 items-center rounded-2xl p-5 w-full'>
                <motion.div 
                  whileTap={{ scale: 0.9 }} 
                  className='cursor-pointer flex justify-between w-full'>
                    <p className='lg:text-[16px] text-[16px] font-500 text-[#8E8EA9]'>{option.address}</p>
                    <span className='flex items-center'>
                        <img src={ArrowRight} className='w-5 h-5' alt="" />
                        <p className='lg:text-[16px] text-[16px] font-500 text-[#8E8EA9]'>{option.distance}</p>
                    </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Locations