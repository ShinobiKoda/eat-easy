import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"
import Backdrop from "./layout/Backdrop"
import Location from "/images/Map-pin.png"
import PopSign from "/images/popsign.png"
// import SearchIcon from "/images/search-icon.png"
import { NavLink } from 'react-router-dom'


const Locations: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(id)
    if (id !== null && !isOpen) setIsOpen(true) // open sidebar when submenu opens
  }

  return (
    <div className="w-full  min-h-screen">
      {/* header */}
      <div className='w-full md:hidden'>
        <Header
          toggle={isOpen}
          onToggle={() => setIsOpen(v => !v)}
          title=''
          text='' 
          text1='' 
          link='' 
          showBack={false}
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
        className={`px-[24px] md:px-[70px] transition-all duration-300 ${!isOpen ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>

        <div className='max-w-[700px] mx-auto flex flex-col items-center py-10'>
            <div className='hidden md:block items-center mb-10 text-center space-y-5'>
                <h1 className='md:text-[28px] lg:text-[40px] font-bold text-[#32324D]'>Start the Smart Menu Experience</h1>
                <p className='text-[16px] font-500 text-[#666687]'>Please enter your location or use your current location and enjoy the custom experience in any of your restaurants.</p>
            </div>

            <div className=' md:hidden space-x-3 items-center mb-10'>
                <p className='text-[28px] font-bold'>Set your </p>
                <span className='lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] flex items-center'>
                    <p className='text-[28px] font-bold'> location</p>
                    <img src={PopSign} className='' alt="" />
                </span>
            </div>

            <div className='bg-white text-center flex flex-col items-center p-6 space-y-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] mb-10'>
                <div className=''>
                    <img src="/images/qr-code.png" className='w-[70px] h-[70px]' alt="" />
                </div>
                <div className='items-center'>
                    <p className='text-[20px] font-semibold'>Scan QR Code</p>
                    <p className='text-[14px] font-500'>Choose the simply way, scan your QR Code from our table</p>
                </div>
            </div>

            <div className='bg-white md:hidden text-center flex flex-col items-center p-6 space-y-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] mb-10'>
                <div className=''>
                    <img src="/images/share.svg" className='w-[70px] h-[70px]' alt="" />
                </div>
                <div className='items-center'>
                    <p className='text-[20px] font-semibold'>Select location manually</p>
                    <p className='text-[14px] font-500'>If you prefer to add your location manually, here is your option</p>
                </div>
            </div>
            {/* input field */}
            {/* <div className='py-2 px-3 rounded-2xl border-2 border-gray-500 flex items-center justify-between gap-4 w-full'>
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
            </div> */}
            <div className='bg-white hidden md:flex flex-col items-center p-6 space-y-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]'>
                <div className='rounded-2xl'>
                    <img src="/images/Map Frame1.png" alt="" />
                </div>
                <div className='items-center md:flex'>
                    <motion.button
                    whileTap={{ scale: 0.96 }}
                    className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
                    >
                    <div className='w-5 h-5'>
                        <img src={Location} className='w-full h-full' alt="" />
                    </div>
                    <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Use my current location</p>
                    </motion.button>

                    <div className='border hidden md:flex border-gray-400 my-auto h-4'></div>

                    <NavLink to="/locations">
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
                            >
                            <div className='w-5 h-5'>
                                <img src={Location} className='w-full h-full' alt="" />
                            </div>
                            <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Set my location on map</p>
                        </motion.button>
                    </NavLink>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Locations