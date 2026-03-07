import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AI from "/images/AI-image.png";
import { NavLink } from "react-router-dom";
import Header from "../layout/Header";
import Loader from "../Loader";
import SEO from "../SEO";

const Virtual: React.FC = () => {
  const [showLoader, setShowLoader] = useState(() => {
    return !sessionStorage.getItem("hasShownLoader_Virtual");
  });
  useEffect(() => {
    if (showLoader) {
      const t = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("hasShownLoader_Virtual", "true");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [showLoader]);

  return (
    <div className="w-full min-h-screen">
      <SEO
        title="Virtual Assistant | EatEasy"
        description="Let our smart virtual assistant help you find the perfect dish."
      />
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
          showBack={true}
        />

        <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[1440px] mx-auto flex flex-col items-center p-6 space-y-10 mb-5">
          <div className="lg:max-w-1/2">
            <div>
              <img src={AI} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-30">
            <h1 className="text-[22px] lg:text-[32px] text-(--neutral-800) dark:text-white font-bold">
              Hello! <br /> I'm your virtual assistant.
            </h1>
            <p className="text-[16px] lg:text-[px] font-600 text-(--neutral-800) dark:text-(--neutral-150)">
              In order to find the best suited choice for you, please answer the
              next few questions.
            </p>
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 w-full lg:w-xl flex flex-col-reverse items-center gap-4">
            <NavLink to="/welcome" className="w-full md:w-[480px]">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-4 cursor-pointer text-white w-full hover:bg-gray-600 rounded-2xl"
              >
                Take me to the menu
              </motion.button>
            </NavLink>
            <NavLink to="/recommend" className="w-full md:w-[480px]">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl bg-(--purple-2) text-white p-4 cursor-pointer w-full"
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
