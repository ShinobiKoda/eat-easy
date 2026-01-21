import { motion } from "framer-motion";
import AI from "/images/AI-image.png";
import { NavLink } from "react-router-dom";

const Virtual: React.FC = () => {
  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen">
      <div
        className={`transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center p-6 space-y-10 mb-5">
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
