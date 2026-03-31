import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface WelcomeDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeDiscountModal: React.FC<WelcomeDiscountModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-100 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-[90%] max-w-[400px]"
          >
            <div className="bg-white dark:bg-(--neutral-800) rounded-[28px] overflow-hidden shadow-2xl border border-white/20">
              <div className="bg-linear-to-br from-(--orange-1) to-(--orange-4) p-8 text-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-4 shadow-lg border border-white/30"
                >
                  <img
                    src="/images/reward.png"
                    alt="Reward"
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                <h2 className="text-3xl font-extrabold text-white heading-font tracking-tight">
                  Welcome! 🎉
                </h2>
              </div>

              <div className="p-8 text-center space-y-6">
                <div>
                  <p className="text-(--neutral-500) dark:text-(--neutral-300) text-lg font-medium">
                    As a thank you for joining{" "}
                    <span className="text-(--neutral-900) dark:text-white font-bold">
                      Gram Bistro
                    </span>
                    , we've added a special gift to your account:
                  </p>
                </div>

                <div className="bg-(--orange-5) dark:bg-orange-900/20 rounded-2xl p-4 border border-(--orange-1)/20">
                  <p className="text-(--orange-1) font-bold text-2xl heading-font">
                    30% OFF
                  </p>
                  <p className="text-(--neutral-600) dark:text-(--neutral-400) font-medium text-sm mt-1">
                    Your first order!
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-4 rounded-xl bg-(--purple-2) text-white font-bold text-[16px] shadow-lg shadow-(--purple-2)/30 cursor-pointer"
                  >
                    Awesome, Thanks!
                  </motion.button>
                  <Link
                    to="/rewards"
                    onClick={onClose}
                    className="text-(--neutral-500) dark:text-(--neutral-400) font-semibold text-sm underline hover:text-(--neutral-800) dark:hover:text-white transition-colors"
                  >
                    View in My Rewards
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDiscountModal;
