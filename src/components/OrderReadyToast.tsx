import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

const DING_SOUND_URL = "/sounds/ding.mp3";
const TOAST_DURATION = 5000; // 5 seconds

const OrderReadyToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Pre-load audio
    audioRef.current = new Audio(DING_SOUND_URL);
    audioRef.current.volume = 0.7;

    const handleReady = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const name = detail?.restaurantName || "Gram Bistro";
      setRestaurantName(name);

      // Play ding
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          /* user hasn't interacted yet – browser blocks autoplay */
        });
      }

      // Show toast
      setVisible(true);

      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), TOAST_DURATION);
    };

    window.addEventListener("order-batch-ready", handleReady);
    return () => {
      window.removeEventListener("order-batch-ready", handleReady);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="order-ready-toast"
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 w-[92%] max-w-[420px]"
        >
          <div
            onClick={() => setVisible(false)}
            className="cursor-pointer flex items-center gap-4 px-5 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.08) 100%)",
              border: "1px solid rgba(34,197,94,0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Animated check icon */}
            <motion.div
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.15,
              }}
              className="shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <IoCheckmarkCircle size={28} className="text-emerald-500" />
              </div>
            </motion.div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[15px] text-emerald-600 dark:text-emerald-400">
                {restaurantName}: Order Ready! 🎉
              </p>
              <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-0.5">
                Your food is ready — enjoy your meal!
              </p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] rounded-b-2xl bg-emerald-500/60"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: TOAST_DURATION / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderReadyToast;
