import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ProcessingPaymentProps = {
  isOpen: boolean;
};

const ProcessingPayment: React.FC<ProcessingPaymentProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-h-dvh bg-black/70 z-100 backdrop-blur-md"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-101 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Animated card icon */}
              <div className="relative">
                <motion.div
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-16 rounded-xl bg-linear-to from-[#615793] to-[#8B5CF6] shadow-2xl shadow-purple-500/30 flex items-center justify-center"
                  style={{ perspective: 800 }}
                >
                  <div className="w-14 h-2 bg-white/30 rounded-full" />
                </motion.div>

                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-xl border-2 border-purple-400"
                />
              </div>

              {/* Dots loader */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-white"
                  />
                ))}
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white text-[20px] font-bold"
                >
                  Processing Payment
                </motion.p>
                <p className="text-gray-400 text-[14px] font-medium">
                  Please wait while we process your transaction
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProcessingPayment;

