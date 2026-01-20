import { motion } from "motion/react";
// import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import type { PropType } from "../types"
import { type MouseEvent } from "react"
import ArrowLeft from "/images/arrow-left.png"
import ArrowRight from "/images/arrow-right.png"
import Delete from "/images/delete.svg"
import Add from "/images/add.svg"
import Cancel from "/images/Cancel.png"
import Location from "/images/Map-pin.png"
import { NavLink } from 'react-router-dom'

export type ViewOrderProps = {
  items: PropType[];
  onClose: () => void;
  removeOrder?: (order: any) => void;
  onSend?: (sent: any) => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({ items, onClose, removeOrder, onSend }) => {

  if (!items || items.length === 0) return null;

  // subtotal: sum of item prices (you can expand to include toppings/counts)
  const orderTotal = items.reduce((sum, t) => sum + (t.price || 0), 0)

  // tax at 11%
  const tax = orderTotal * 0.11


  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{
        x: "0",
        opacity: 1,
        transition: { duration: 0.25 }
      }}
      exit={{ x: "100vw", opacity: 0 }}
      className="z-50 top-0 fixed right-0 w-full h-screen flex flex-col sm:w-[55%] md:w-[45%] lg:w-[37%] sm:rounded-l-2xl bg-[#f7f7f7] dark:bg-[#32324D]"
    >
      {/* header for mobile */}
      <div className="flex sm:hidden p-4">
        <div className="flex space-x-2 items-center">
        
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className='p-2 cursor-pointer bg-[#FFFFFF] rounded-sm' aria-label="Back">
            <img src={ArrowLeft} className='w-5 h-5' alt="Back" />
          </motion.button>
            
          <div className=''>
            <h1 className='text-[14px] font-600 text-[#8E8EA9] dark:text-[#EBEAF2]'>Gram Bistro</h1>
            <p className="text-[18px] font-bold text-[#32324D] dark:text-[#FFFFFF]">My Order</p>
          </div>
        </div>
      </div>

      {/* header for destop */}
      <div className="hidden sm:flex justify-between p-4">
        <div className="flex items-center">
          <h1 className="px-3 text-[16px] lg:text-[20px] font-bold dark:text-[#FFFFFF]">My Order</h1>

          <div className='border border-gray-700 my-auto h-5'></div>

          <div className="px-3 flex items-center">
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p className='text-[14px] lg:text-[16px] font-semibold text-[#8E8EA9] dark:text-[#EBEAF2]'>Gram Bistro</p>
          </div>
        </div>

        <motion.img 
          whileTap={{ scale: 0.96 }} 
          onClick={onClose} src={Cancel} 
          className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50" 
          alt="" 
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="p-[24px] space-y-[27px]">

          <div className='flex flex-col space-y-5'>
            {items.map((order) => (
              <div key={`${order.id}`} className='rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-[#4A4A6A] p-3 group'>
                <div className='flex space-x-3 items-center relative'>
                  <div className='rounded-full'><img src={order.image} className='max-w-[100px] max-h-[100px] rounded-full' alt="" /></div>

                  <div className=''>
                    <p className='text-[15px] lg:text-[18px] font-semibold dark:text-[#FFFFFF]'>{order.name} x <b className='text-[#FF7B2C]'>{(order as any).qty ?? 1}</b></p>

                    <div className=' text-[14px] text-[#C0C0CF] font-semibold mb-2 flex space-x-1 flex-wrap items-center'>
                      <div className='space-x-1 flex items-center'>
                        <img src={order.star} className='w-4 h-4' alt="" />
                        <p>{order.rating}</p> 
                      </div>  
                      <span>({order.reviews} reviews)</span>
                    </div>

                    <p className='text-[#FF7B2C] text-[15px] lg:text-[18px] font-extrabold'>${(order.price).toFixed(2)}</p>
                  </div>

                  <div className='flex md:items-center justify-self-end absolute right-0 bottom-0 '>
                    {/* remove order */}
                    <motion.div 
                      onClick={() => removeOrder?.(order)}
                      whileTap={{ scale: 0.9 }}
                      className=""
                    >
                        <img src={Delete} className='w-fit h-fit cursor-pointer' alt="" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            whileTap={{ scale: 0.96 }}
            className="flex mx-auto items-center cursor-pointer space-x-2 w-fit"
          >
            <img src={Add} alt="" />
            <p className="text-[#FFB01D]">Add more food to order</p>
          </motion.div>

          <div className="border-y border-gray-500 py-5 space-y-5">
            <div className="flex justify-between items-center">
              <p className="text-[16px] font-semibold dark:text-[#DCDCE4]">Subtotal</p>
              <p className="text-[16px] font-extrabold dark:text-[#F6F6F9]">${(orderTotal).toFixed(2)}</p>
            </div>
              <div className="flex justify-between items-center">
              <p className="text-[16px] font-semibold dark:text-[#DCDCE4]">Tax</p>
              <p className="text-[16px] font-extrabold dark:text-[#F6F6F9]">${tax.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[18px] font-bold dark:text-[#DCDCE4]">Total Price</p>
            <p className="text-[18px] font-extrabold text-[#FF7B2C]">${(orderTotal + tax).toFixed(2)}</p>
          </div>

        </div>
      </div>

      <div className="w-full flex justify-center bottom-0 p-3">
        <motion.button 
          onClick={() => {
            // compute total qty across all items (fall back to 1 per item when qty missing)
            const totalQty = items.reduce((sum, it) => sum + ((it as any).qty ?? 1), 0)

            const sentItems = items.map(it => ({
              id: it.id,
              name: it.name,
              image: it.image,
              qty: (it as any).qty ?? 1,
              price: it.price ?? 0
            }))

            const sent = {
              items: sentItems,
              subtotal: orderTotal,
              tax,
              total: orderTotal + tax,
              qty: totalQty,
            }

            onSend?.(sent)
            onClose()
          }}
          whileTap={{ scale: 0.98 }}  
          className='group rounded-2xl bg-[#615793] p-4 cursor-pointer w-full flex items-center justify-center space-x-2'>
            <p className="text-[16px] text-[#FFFFFF] font-semibold">Send Order</p>
            <motion.img className="group-hover:translate-x-3 transition-all duration-300" src={ArrowRight} alt="" />
        </motion.button>
      </div>

    </motion.div>
  )
}

export default ViewOrder


// my mother says you whole life is in the hand of God : John Bellion