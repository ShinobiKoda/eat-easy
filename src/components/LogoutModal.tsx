import { motion, AnimatePresence } from "framer-motion";
import { IoIosLogOut } from "react-icons/io";
import { ClipLoader } from "react-spinners";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
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
            className="fixed inset-0 bg-black/50 z-100"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-[90%] max-w-[380px]"
          >
            <div className="bg-white dark:bg-(--neutral-800) rounded-3xl p-6 shadow-xl">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-16 h-16 mx-auto mb-5 rounded-full bg-(--purple-2)/10 dark:bg-(--purple-3)/20 flex items-center justify-center"
              >
                <IoIosLogOut
                  className="text-(--purple-2) dark:text-(--purple-4)"
                  size={32}
                />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center heading-font font-medium text-xl text-(--neutral-800) dark:text-white mb-2"
              >
                Logout
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-(--neutral-500) dark:text-(--neutral-300) text-base mb-8"
              >
                Are you sure you want to logout?
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3.5 rounded-2xl border border-(--neutral-200) dark:border-(--neutral-600) text-(--neutral-700) dark:text-(--neutral-200) font-semibold text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3.5 rounded-2xl bg-(--purple-2) text-white font-semibold text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    "Logout"
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
