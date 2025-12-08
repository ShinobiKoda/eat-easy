import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Profile from "/images/profile-img.png"
import History from "/images/history-icon.png"
import Reward from "/images/reward-icon.png"
import Help from "/images/help-icon.png"
import Logout from "/images/logout-icon.png"
import Location from "/images/Map-pin.png"
import ChevronLeft from "/images/chevron-left.png"
import FoodMenu from "/images/foodmenu.png"
import { NavLink } from 'react-router-dom'

type SidebarProps = {
  toggle?: boolean
  menuOpen?: number | null
  setMenuOpen?: (id: number | null) => void
  onClose?: () => void
  onToggle?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ toggle, menuOpen, setMenuOpen, onToggle }) => {

  // desktop toggle useState
  const [isOpen, setIsOpen] = useState(false)
  // menu accordion useState
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  
  const controlledOpen = typeof toggle === 'boolean' && typeof onToggle === 'function'
  
  const effectiveIsOpen = controlledOpen ? toggle : isOpen

  const activeMenu = menuOpen !== undefined ? menuOpen : openMenuId

  const handleToggle = () => {
    if (controlledOpen) {
      onToggle && onToggle()
    } else {
      setIsOpen((v) => !v)
    }
  }

  const toggleMenu = (id: number) => {
    if (typeof setMenuOpen === 'function') {
      setMenuOpen(menuOpen === id ? null : id)
    } else {
      setOpenMenuId((prev) => (prev === id ? null : id))
    }
  }

  return (
    <aside 
      className={`w-[60%] sm:w-[45%] h-screen bg-[#32324D] transition-all duration-300 ease-in-out rounded-r-2xl fixed left-0 top-0 z-50 ${effectiveIsOpen ?  'md:w-[20%]' : 'md:-translate-x-0 md:w-[12%] lg:w-[9%]  -translate-x-[100%]'}`}>

      {/* sidebar toggle button for desktop */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleToggle}
        className='hidden md:block w-8 h-8 bg-[#32324D] border-2 border-white top-17 -right-4 absolute rounded-full p-1'
      >
        <img src={ChevronLeft} className={`w-full h-full cursor-pointer ${effectiveIsOpen ? 'rotate-0' : ' rotate-180'}`} alt="" />
      </motion.button>

      {/* sidebar content */}
      <div className={`flex flex-col h-full text-white text-sm font-semibold transition-all duration-300 ${toggle ? '' : ''}`}>

        {/* logo */}
        <div className={`p-4 flex justify-center text-(--neutral-700) dark:text-white border-b-2 border-gray-400 font-500 transition-all duration-300 ${toggle ?  'text-[24px]' : 'text-xl'}`}>Eat<span className='text-(--orange-1)'>Easy</span></div>

        <div className={`flex-1 overflow-y-auto scrollbar-hidden flex flex-col ${effectiveIsOpen ? '' : ''}`}>

          {/* profile */}
          <div className={`flex items-center gap-4 px-3 py-4 ${!effectiveIsOpen ? 'flex-row md:flex-col' : ''}`}>
            <div className='w-15 h-15 md:w-12 md:h-12 lg:w-15 lg:h-15'><img src={Profile} className='rounded-full w-full h-full' alt="" /></div>
            {toggle && (
              <div className={`space-y-1 flex-1 overflow-hidden md:text-[12px] lg:text-[15px]`}>
                <p className=''>Robert Fox</p>
                <button className='cursor-pointer hover:text-(--orange-1)'>View Profile</button>
              </div>
            )}
          </div>

          {/* menu */}
          <div className={`flex justify-center px-3 text-left flex-col space-y-3 mb-6 py-6 border-b-2 border-gray-400 ${toggle ? '' : 'items-center'}`} >
            <h1 className='text-[15px]'>MENU</h1>

            <div>
              <motion.button
                onClick={() => toggleMenu(1)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center mb-3 space-x-3 cursor-pointer'
              >
                <img src={FoodMenu} className='w-11 h-11 bg-[--yellow-1] rounded-2xl p-3' alt="" />
                <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>Food Menu</p>
              </motion.button>
              {effectiveIsOpen && (
                <div className={`border-l-2 border-amber-500 px-7 ml-5 space-y-5 ${activeMenu === 1 ? 'flex flex-col' : 'hidden'}`}>
                  <NavLink to="/recommended">
                    <motion.div whileTap={{ scale: 0.9 }} className='cursor-pointer md:text-[12px] lg:text-[15px]'>Smart Assistance</motion.div>
                  </NavLink>
                  <motion.div whileTap={{ scale: 0.9 }} className='cursor-pointer md:text-[12px] lg:text-[15px]'>Full Menu</motion.div>
                </div>
              )}
            </div>

            <div>
              <motion.button
                // onClick={() => toggleMenu(2)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center mb-3 space-x-2 cursor-pointer'
              >
                <img src={History} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>Order History</p>
              </motion.button>
            </div>

            <NavLink to="/locations">
              <motion.button
                // onClick={() => toggleMenu(3)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center space-x-3 cursor-pointer'
              >
                <img src={Location} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>Location</p>
              </motion.button>
            </NavLink>
          </div>

          {/* General */}
          <div className={`flex justify-center px-3 text-left flex-col space-y-3 ${toggle ? '' : 'items-center'}`}>
            <h1 className='text-[15px]'>GENERAL</h1>

            <div>
              <motion.button 
                whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
                      <img src={Reward} className='w-11 h-11 hover:bg-gray-600 rounded-2xl p-3' alt="" />
                <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>My Rewards</p>
                    </motion.button>
                  </div>

                  <div>
              <motion.button 
                whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
                      <img src={Help} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>Help</p>
              </motion.button>
            </div>
          </div>

        </div>
        {/* Logout */}
        <div className={`flex justify-center px-3 text-left flex-col pt-5 space-y-3 border-t-2 border-gray-400 ${toggle ? '' : 'items-center'}`}>
          <div>
            <motion.button 
              whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
              <img src={Logout} className='w-11 h-11 bg-gray-600 rounded-2xl p-3' alt="" />
              <p className={`md:text-[12px] lg:text-[15px] ${effectiveIsOpen ? 'flex' : 'hidden'}`}>Logout</p>
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
