import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

import Header from "../layout/Header";

const Recommend: React.FC = () => {

  return (
    <div className="w-full min-h-screen">
      <div>
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className='pt-20 md:py-30 lg:py-50 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6'>

          <div className='flex flex-col items-center text-center max-w-xl mb-20 md:mb-10'>
            <h1 className='text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-[#FFFFFF] font-medium mb-2'>It seems like we already know <br/> each other 🤝</h1>
            <p className='text-[16px] lg:text-[16px] font-medium text-(--neutral-800) dark:text-[#EAEAEF]'>You can use the recommendations configured during your last visit to our restaurant or you can have new ones.</p>
          </div>

          <div className='space-y-4 flex flex-col items-center mb-50 md:mb-20 w-full sm:w-[480px]'>

            <div className='bg-white dark:bg-[#4A4A6A] rounded-2xl w-full mx-auto p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
              <p className='text-[14px] lg:text-[18px] text-(--neutral-900) dark:text-[#FFFFFF] font-semibold'>New recommendation</p>
              <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'>
                <FaArrowRight size={20} className='text-(--yellow-1)' />
              </motion.button>
            </div>

            <div className='bg-white dark:bg-[#4A4A6A] rounded-2xl w-full mx-auto p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
              <div className='space-y-3'>
                <p className='text-[14px] lg:text-[18px] text-(--neutral-900) dark:text-[#FFFFFF] font-semibold'>Your last recommendation</p>
                <div className='flex gap-2 items-center text-(--neutral-500) dark:text-[#8E8EA9]'>
                  <span>
                    <SlCalender className='w-7 text-(--yellow-1)' />
                  </span>
                  07/02/2026
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'>
                <FaArrowRight size={20} className='text-(--yellow-1)' />
              </motion.button>
            </div>
          </div>

          <div className='text-[16px] lg:text-[20px] font-600 space-y-4 w-full lg:w-xl flex flex-col items-center'>
            <NavLink to="/step1" className="w-[100%] md:w-[480px] flex justify-center">
                <motion.button 
                    whileTap={{ scale: 0.95 }}  
                    className='rounded-2xl text-white bg-(--purple-2) dark:bg-[#615793] p-4 cursor-pointer w-full mx-auto'>Next
                </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend