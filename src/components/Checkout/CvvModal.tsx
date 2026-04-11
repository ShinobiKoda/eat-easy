import React, { useState } from "react";
import { motion } from "framer-motion";
import { LiaTimesSolid } from "react-icons/lia";
import { MdLock } from "react-icons/md";

type CvvModalProps = {
  onClose: () => void;
  onConfirm: (cvv: string) => void;
  lastFourDigits?: string;
};

const CvvModal: React.FC<CvvModalProps> = ({
  onClose,
  onConfirm,
  lastFourDigits,
}) => {
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 3) {
      setCvv(val);
      if (error) setError(false);
    }
  };

  const handleConfirm = () => {
    if (cvv.length !== 3) {
      setError(true);
      return;
    }
    onConfirm(cvv);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm min-h-dvh"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="bg-white dark:bg-[#2a2a4a] rounded-2xl shadow-2xl w-full max-w-[380px] p-8 relative">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LiaTimesSolid
              size={20}
              className="text-gray-400 dark:text-gray-300"
            />
          </button>

          {/* Lock icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#615793] to-[#6c5dd3] flex items-center justify-center shadow-lg">
              <MdLock size={32} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[20px] font-bold text-[#32324D] dark:text-white text-center mb-2">
            Enter CVV
          </h3>
          <p className="text-[13px] text-[#8E8EA9] text-center mb-6">
            Enter the 3-digit security code on the back of your card
            {lastFourDigits && (
              <span className="font-semibold text-[#32324D] dark:text-white">
                {" "}
                ending in {lastFourDigits}
              </span>
            )}
          </p>

          {/* CVV Input */}
          <div className="mb-6">
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={cvv}
              onChange={handleChange}
              placeholder="• • •"
              autoFocus
              className={`w-full text-center text-[28px] font-bold tracking-[0.5em] bg-gray-50 dark:bg-[#383854] border-2 ${
                error
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-600 focus:border-[#6c5dd3]"
              } rounded-2xl px-4 py-4 outline-none text-[#32324D] dark:text-white transition-all placeholder:text-gray-300 dark:placeholder:text-gray-500`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-2 text-center">
                Please enter a valid 3-digit CVV
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-[#32324D] dark:text-white font-semibold text-[15px] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <motion.button
              type="button"
              onClick={handleConfirm}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="flex-1 py-3.5 rounded-2xl bg-[#615793] dark:bg-[#6c5dd3] text-white font-semibold text-[15px] shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Confirm
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CvvModal;

