import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import Calendar from "/images/calender-icon.png"

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

        <div className='pt-18 md:pt-30 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6 space-y-10'>

          <div className='flex flex-col items-center text-center max-w-xl mb-20 md:mb-10'>
            <h1 className='text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold mb-2'>It seems like we already know <br/> each other 🤝</h1>
            <p className='text-[16px] lg:text-[px] font-600 text-[#8E8EA9] dark:text-[#EAEAEF]'>You can use the recommendations configured during your last visit to our restaurant or you can have new ones.</p>
          </div>

          <div className='text-[16px] lg:text-[20px] font-600 space-y-4 w-full lg:w-xl flex flex-col items-center mb-50 md:mb-20'>
            <div className='bg-white dark:bg-[#4A4A6A] rounded-2xl w-full p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
                <p className='text-[14px] lg:text-[18px] text-[#32324D] dark:text-[#FFFFFF]  font-bold'>New recommendation</p>
                <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'>
                  <FaArrowRight className='w-8 h-full' />
                </motion.button>
            </div>

            <div className='bg-white dark:bg-[#4A4A6A] rounded-2xl w-full p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center'>
                <div className='space-y-3'>
                    <p className='text-[14px] lg:text-[18px] text-[#32324D] dark:text-[#FFFFFF]  font-bold'>Your last recommendation</p>
                    <div className='flex gap-2 items-center dark:text-[#8E8EA9]'><span><img src={Calendar} alt="" /></span>02/12/2028</div>
                </div>
                <motion.button whileTap={{ scale: 0.9 }}  className='w-6 h-6 cursor-pointer'>
                  <FaArrowRight className='w-8 h-full' />
                </motion.button>
            </div>
          </div>

          <div className='text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] dark:text-[#FFFFFF] space-y-4 w-full lg:w-xl flex flex-col items-center'>
            <NavLink to="/step1" className="w-full">
                <motion.button 
                    whileTap={{ scale: 0.95 }}  
                    className='rounded-2xl bg-[#32324D] dark:bg-[#615793] p-4 cursor-pointer w-full'>Next
                </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend