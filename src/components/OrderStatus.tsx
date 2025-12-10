import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import { NavLink } from 'react-router-dom'
import Thumbsup from "/images/thumbsup.svg"
import Add from "/images/add.svg"
import { FaChevronDown } from "react-icons/fa6";
import type { PropType } from "../types"
import { OrderStatusSchema } from "../schemas/OrderStatusSchema"

const OrderStatus: React.FC = () => {
  const [order, setOrder] = useState<any>(null)

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

  const [toggleList, setToggleList] = useState(false)

  // locally storage for sentorders persistency
  useEffect(() => {
    try {
      const raw = localStorage.getItem('eat-easy-last-order')
      if (raw) setOrder(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to read saved order', e)
    }
  }, [])

  const { currentStatus, showRecommend, showSubmit } = OrderStatusSchema();

  return (
    <div className="w-full min-h-screen">

      <div className=''>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Gram Bistro" text="Your Order" text1='Your Order' link='/recommended' />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center py-6 px-6 space-y-10 my-5 '>

          <div className='flex flex-col sm:flex-row gap-[12px] lg:gap-[32px] w-full items-center sm:items-start'>

            <div className='bg-[#FFFFFF] dark:bg-[#4A4A6A] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] pt-[30px] max-w-[340px] sm:max-w-full sm:w-[60%] h-[388px] sm:h-fit overflow-clip gap-[21px] lg:gap-[60px] flex flex-col items-center'>
                
              <h1 className='text-[16px] lg:text-[24px] text-[#8E8EA9] font-semibold dark:text-[#DCDCE4]'>{currentStatus.text} <br /> <b className='text-[18px] lg:text-[24px] text-[#FFB01D] font-extrabold'>{currentStatus.time}</b></h1>

              <div className='lg:max-w-full'>
                  <img src={currentStatus.img} alt="" />
              </div>
            </div>

            <div className='bg-[#FFFFFF] dark:bg-[#4A4A6A] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] p-[20px] lg:p-[30px] space-y-[16px] max-w-[340px] sm:max-w-full sm:w-[40%] h-fit'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-[#DCDCE4] font-semibold dark:text-[#DCDCE4]'>Order list and prices</p>
                <FaChevronDown 
                  onClick={() => {setToggleList(!toggleList)}}  
                  className={`w-5 h-5 cursor-pointer fill-[#DCDCE4] dark:fill-[#FFB01D] ${ toggleList ? 'rotate-180' : '' }`} 
                />
              </div>

              <div className={`space-y-[12px] ${!toggleList ? 'flex flex-col' : 'hidden'}`}>
                {order?.items ? (
                  order.items.map((sent: any) => (
                    <div key={sent.id} className='dark:text-[#FFFFFF] flex justify-between items-center gap-[8px]'>
                      <div className='flex items-center gap-[8px]'>
                        <img src={sent.image} className='w-[50px] h-[50px] rounded-full' alt="" />
                        <p className='text-left text-[14px] font-semibold'>{sent.name}</p>
                      </div>
                      <p className='text-[14px]'>
                        <span>{sent.qty}</span>x
                        ${' '}
                        <b>{(sent.price ?? 0).toFixed(2)}</b>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-[14px] text-[#8E8EA9]'>No order found.</p>
                )}
              </div>

              <motion.div 
                  whileTap={{ scale: 0.96 }}
                  className="flex mx-auto items-center cursor-pointer space-x-2 w-fit"
              >
                  <img src={Add} alt="" />
                  <p className="text-[#FFB01D]">Add more food to order</p>
              </motion.div>

            </div>
          </div>

          <div className='w-full flex flex-col space-y-5 sm:flex-row justify-between items-center rounded-2xl px-[20px] py-[16px] text-[#8E8EA9] font-semibold dark:text-[#DCDCE4] bg-[#FFFFFF] dark:bg-[#4A4A6A] shadow-[0_4px_12px_rgba(0,0,0,0.10)]'>
            <p className='text-[18px] font-600'>{currentStatus.action}</p>
            
            {showRecommend && (
              <motion.div
                whileTap={{ scale: 0.96 }} 
                className='p-3 rounded-2xl shadow-sm bg-[#32324D] dark:bg-[#615793] text-[16px] lg:text-[16px] text-white text-center cursor-pointer'>Ask for Recommendations
              </motion.div>
            )}

            {showSubmit && (
              <motion.div
                whileTap={{ scale: 0.96 }} 
                className='p-3 rounded-2xl shadow-sm bg-[#32324D] dark:bg-[#615793] text-[16px] lg:text-[16px] text-white cursor-pointer'>Pay <b>${(order.total ?? 0).toFixed(2)}</b> 
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus