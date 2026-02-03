import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import AI from "/images/AI-image.png";
import { NavLink } from "react-router-dom";
import Header from "../layout/Header";
import Loader from "../Loader";


const Virtual: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={` ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          navbarTitle="Gram Bistro"
          showBack={false}
        />

        <div className='pt-18 md:pt-30 max-w-[1440px] mx-auto flex flex-col items-center p-6 space-y-10 mb-5'>
          <div className="lg:max-w-1/2">
            <div>
              <img src={AI} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-30">
            <h1 className="text-[22px] lg:text-[32px] text-[#32324D] font-bold">
              Hello! <br /> I'm your virtual assistant.
            </h1>
            <p className="text-[16px] lg:text-[px] font-600 text-[#8E8EA9]">
              In order to find the best suited choice for you, please answer the
              next few questions.
            </p>
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 text-[#8E8EA9] space-y-4 w-full lg:w-xl flex flex-col items-center">
            <NavLink to="/welcome" className="w-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-4 cursor-pointer w-full hover:bg-gray-600 rounded-2xl"
              >
                Take me to the menu
              </motion.button>
            </NavLink>
            <NavLink to="/recommend" className="w-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl bg-[#32324D] p-4 cursor-pointer w-full"
              >
                Great, let's start
              </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Virtual;
