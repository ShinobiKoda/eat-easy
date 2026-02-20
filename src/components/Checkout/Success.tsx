import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import wallet from "/images/wallet.png"; // Fallback to existing wallet or generated image
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";

type SuccessProps = {
  isOpen: boolean;
};

const Success: React.FC<SuccessProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden sm:fixed inset-0 bg-black/60 z-100 backdrop-blur-md min-h-screen"
          />
          <Header navbarTitle="Gram Bistro" showBack={false} />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-0 flex items-center justify-center sm:px-4 pointer-events-none top-14"
          >
            <div className="bg-[#2a2a4a] dark:bg-[#2a2a4a] sm:rounded-3xl sm:shadow-2xl h-full w-full md:max-w-[624px] p-10 relative pointer-events-auto">
              {/* Success Asset */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  <img
                    src={wallet}
                    alt="Success"
                    className="w-40 h-auto drop-shadow-[0_20px_50px_rgba(255,176,29,0.3)]"
                  />
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3 mb-10">
                <h2 className="text-[28px] font-bold text-white">Woohoo!</h2>
                <p className="text-[15px] text-gray-400 font-medium">
                  Thank you for your payment!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/welcome")}
                  className="w-full py-4 rounded-2xl bg-[#615793] hover:bg-[#6c5dd3] text-white font-bold text-[18px] shadow-lg shadow-[#615793]/30 transition-all cursor-pointer"
                >
                  Done
                </motion.button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-[14px] text-gray-400 hover:text-white font-medium underline underline-offset-4 cursor-pointer"
                  >
                    Add some feedback
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Success;
