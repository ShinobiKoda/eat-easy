import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCalendar } from "react-icons/hi";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useState } from "react";
import type { Coupon } from "../../services/couponService";

interface CouponDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon | null;
}

const CouponDetailModal: React.FC<CouponDetailModalProps> = ({
  isOpen,
  onClose,
  coupon,
}) => {
  const [copied, setCopied] = useState(false);

  if (!coupon) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = new Date(coupon.expiresAt) < new Date();

  // Mapping type to image
  let imgPath = "/images/easter-discount.png";
  if (coupon.type === "welcome") imgPath = "/images/discount-menu.png";
  if (coupon.type === "free_drink") imgPath = "/images/discount-drink.png";
  if (coupon.type === "milestone") imgPath = "/images/discount-desert.png";

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-[90%] max-w-[420px]"
          >
            <div className="bg-white dark:bg-(--neutral-800) rounded-[24px] overflow-hidden shadow-2xl">
              {/* Header section */}
              <div className="bg-(--neutral-50) dark:bg-(--neutral-700) p-8 flex flex-col items-center justify-center border-b border-(--neutral-150) dark:border-(--neutral-600)">
                <div className="w-24 h-24 rounded-full bg-[#50506F] flex items-center justify-center mb-4 shadow-lg overflow-hidden">
                  <img
                    src={imgPath}
                    alt="Coupon"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <h2 className="text-xl font-bold font-mullish text-(--neutral-900) dark:text-white text-center">
                  {coupon.description}
                </h2>

                <div className="mt-3">
                  {coupon.isUsed ? (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Redeemed
                    </span>
                  ) : isExpired ? (
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Expired
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                {/* Code Box */}
                <div className="space-y-2">
                  <p className="text-sm text-(--neutral-500) dark:text-(--neutral-400) font-medium text-center">
                    Your unique promo code
                  </p>
                  <div
                    onClick={handleCopy}
                    className="flex items-center justify-between bg-(--orange-5) dark:bg-orange-900/10 border-2 border-dashed border-(--orange-1)/50 rounded-2xl p-4 cursor-pointer hover:bg-(--orange-1)/10 transition-colors"
                  >
                    <span className="text-2xl heading-font font-bold text-(--orange-1) tracking-wider">
                      {coupon.code}
                    </span>
                    <button className="text-(--orange-1)">
                      {copied ? <FaCheck size={20} /> : <FaRegCopy size={20} />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-center text-(--orange-1) font-semibold mt-1">
                      Copied to clipboard!
                    </p>
                  )}
                </div>

                <div className="w-full h-px bg-(--neutral-150) dark:bg-(--neutral-700)"></div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-(--neutral-600) dark:text-(--neutral-300) text-sm font-medium flex items-center gap-2">
                      <HiOutlineCalendar size={18} /> Valid until
                    </p>
                    <p className="text-(--neutral-900) dark:text-white font-bold text-sm">
                      {new Date(coupon.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-(--neutral-600) dark:text-(--neutral-300) text-sm font-medium">
                      Discount Type
                    </p>
                    <p className="text-(--neutral-900) dark:text-white font-bold text-sm">
                      {coupon.isFreeItem
                        ? "Free Item"
                        : `${coupon.discountPercent}% OFF`}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-(--neutral-150) dark:bg-(--neutral-700) text-(--neutral-800) dark:text-white font-bold text-sm cursor-pointer hover:opacity-90"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CouponDetailModal;
