import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from "./layout/Navbar"
import Burger from "/images/burger-icon.png"
import GridIcon from "/images/grid-icon.png"
import ListIcon from "/images/list-icon.png"
import { AiOutlinePlus } from "react-icons/ai";
// import { NavLink } from 'react-router-dom'
import type { PropType } from "../types"
import { Eat, Drink, Dessert } from "../data/data"
import ViewDish from "./ViewDish"
import ViewOrder from "./ViewOrder"
import Filters from "./Filters"
import { AnimatePresence } from "motion/react";

type RecommendedProps = {
  items?: PropType[];
  showSelected?: (item: PropType) => void
  onClose?: () => void;
}

const Recommended: React.FC<RecommendedProps> = ({ showSelected }) => {

  // usestate to open and close sidebar
  const [toggle, setToggle] = useState(false)

  // usestate to open and close menuaccordion
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

  // usestate for the selected item
  const [selectedItem, setSelectedItem] = useState<PropType | null>(null);
  // order items collected from ViewDish
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [showOrder, setShowOrder] = useState(false)

  // add a dish to vieworder
  const addToOrder = (order: any) => {
    setOrderItems(prev => [...prev, order])
    setShowOrder(true)
  }
  // remove a dish from the vieworder
  const removeOrder = (order: any) => {
    setOrderItems(prev => {
      const next = prev.filter(o => o !== order)
      // if cart becomes empty, close the order modal
      if (next.length === 0) setShowOrder(false)
      return next
    })
  }
  
  // store ordered dishes and then navigate to the OrderStatus
  const navigate = useNavigate()

  const handleSend = (sent: any) => {
    try {
      localStorage.setItem('eat-easy-last-order', JSON.stringify(sent))
    } catch (e) {
      console.error('Failed to save order to localStorage', e)
    }
    setShowOrder(false)
    navigate('/orderStatus')
  }

  
  // usestate for the mode
  const [click, setClick] = useState(0)

  const [filter, setFilter] = useState(false)

  // usestate for the categories
  const [menu, setMenu] = useState(0)
  const categories = [Eat, Drink, Dessert];
  const datum = categories[menu];

  // stop background scroll effect when any of this is open
  const isModalOpen = Boolean(selectedItem || showOrder || filter);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedItem, showOrder, filter]);

  return (
    <div className="w-full min-h-screen">

      <Navbar showHeader={true} showAside={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Virtual Assitant" text="Our Smart Assistant Recommendations" text1='Gram Bistro' link='/Recommended' />

      <div className={`transition-all duration-300 relative ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col p-6 space-y-5'>
          <div className='md:hidden flex justify-between items-center'>
            <h1 className='text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold'>We think you might enjoy these specially selected dishes</h1>
          </div>

          <div className='md:p-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-[#4A4A6A] flex justify-between items-center mb-10'>

            <div className={`flex md:w-fit h-fit md:mx-0 md:justify-items-normal mx-auto w-full justify-between space-x-4 md:space-x-0 lg:space-x-2 text-[15px] text-black dark:text-[#F6F6F9]`}>
              <div
                onClick={() => setMenu(0)}
                className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300 ${menu === 0 ? 'bg-amber-500 text-white dark:text-black' : 'bg-none'}`}
              >
                Eat
              </div>

              <div
                onClick={() => setMenu(1)}
                className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300 ${menu === 1 ? 'bg-amber-500 text-white dark:text-black' : 'bg-none'}`}
              >
                  Drink
              </div>

              <div
                onClick={() => setMenu(2)}
                className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-300 ${menu === 2 ? 'bg-amber-500 text-white dark:text-black' : 'bg-none'}`}
              >
                  Dessert
              </div>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(!filter)}
                  className='cursor-pointer bg-white rounded-2xl p-3 md:hidden'
                  >
                  <img src={Burger} className='w-4 h-3' alt="" />
              </motion.button>
            </div>

            
            {/* Desktop */}
            <div className='hidden md:flex items-center space-x-4 text-[15px]'>
              {/* <div className='cursor-pointer'>View mode</div> */}
              <div className={`rounded-2xl border border-[#32324D] flex w-fit h-fit transition-all duration-300`}>
                <div
                  onClick={() => setClick(0)}
                  className={`relative w-fit h-fit p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 0 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                >
                  <img src={ListIcon} className='w-3 h-3' alt="" />
                </div>

                <div
                  onClick={() => setClick(1)}
                  className={`relative w-fit h-fit p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 1 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                >
                  <img src={GridIcon} className='w-3 h-3' alt="" />
                </div>
              </div>

              <div className='border border-gray-400 my-auto h-4'></div>

              <motion.div
                whileTap={{ scale: 0.96 }} 
                onClick={() => setFilter(!filter)}
                className='p-3 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-[12px] lg:text-[16px] text-white cursor-pointer'>Ask for new proposal
              </motion.div>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            {datum.map((eat) => (
              <div key={`${menu}-${eat.id}`} className='rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-[#4A4A6A] p-3 group'>
                <div className='flex space-x-3 items-center relative'>
                  <div className='rounded-full'><img src={eat.image} className='max-w-[100px] max-h-[100px] rounded-full' alt="" /></div>
                  <div className=''>
                    <p className='text-[15px] lg:text-[18px] dark:text-[#FFFFFF] font-semibold'>{eat.name}</p>

                    <div className=' text-[14px] text-[#C0C0CF] font-semibold mb-2'>
                      <div className='space-x-1 flex items-center'>
                        <img src={eat.star} className='w-4 h-4' alt="" />
                        <p>{eat.rating}</p> 
                      </div>  
                      <span>({eat.reviews} reviews)</span>
                    </div>

                    <p className='text-[#FF7B2C] text-[15px] lg:text-[18px] font-extrabold'>${(eat.price).toFixed(2)}</p>
                  </div>
                  <motion.div 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setSelectedItem(eat), showSelected?.(eat) }}
                    className='flex justify-self-end absolute right-0 bottom-0 cursor-pointer rounded-xl p-2 bg-[#FFF2EA] dark:bg-[#FF7B2C]'>
                      <AiOutlinePlus className='w-fit h-fit fill-[#FF7B2C] dark:fill-[#FFF2EA]' />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* floating cart button */}
      <motion.div drag className='fixed right-6 bottom-6 z-50'>
        <button onClick={() => setShowOrder(v => !v)} className='bg-amber-500 text-white rounded-full px-4 py-3 shadow-lg'>
          Cart ({orderItems.length})
        </button>
      </motion.div>
      
      {/* viewdish component */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 flex items-center justify-center bg-black/50 z-40'>
            <ViewDish
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onAddToOrder={addToOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* vieworder component */}
      <AnimatePresence>
        {showOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 flex items-center justify-center bg-black/50 z-40'>
            <ViewOrder items={orderItems} onClose={() => setShowOrder(false)} removeOrder={removeOrder} onSend={handleSend} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* filter component */}
      <AnimatePresence>
        {filter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 flex items-center justify-center bg-black/50 z-40'>
            <Filters onClose={() => setFilter(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Recommended