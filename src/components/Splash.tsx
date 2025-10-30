import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Splash() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Refs for audio
  const popRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);

  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    // Initialize audio
    const popAudio = new Audio("/sounds/pop-up.mp3");
    const dingAudio = new Audio("/sounds/ding.mp3");
    popAudio.volume = 0.9;
    dingAudio.volume = 0.9;

    popRef.current = popAudio;
    dingRef.current = dingAudio;

    // Try autoplay immediately
    popAudio.play().catch(() => {
      // Wait for user gesture if autoplay blocked
      setIsAudioReady(true);
    });

    // Play ding + navigate
    const timer = setTimeout(() => {
      dingAudio.play().catch(() => {});
      navigate("/started");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Handle manual click if autoplay is blocked
  const handlePlayManually = () => {
    if (popRef.current && dingRef.current) {
      popRef.current.play().catch(() => {});
      setIsAudioReady(false);
    }
  };

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundImage }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1, delay: 3 }}
      onClick={isAudioReady ? handlePlayManually : undefined}
    >
      {/* Only show click-to-enable prompt if needed */}
      {isAudioReady && (
        <div className="absolute top-4 right-4 text-sm bg-black/60 text-white px-3 py-1 rounded-md">
          Click to enable sound 🔊
        </div>
      )}

      {/* Rotating + 3D Wobble SVG */}
      <motion.img
        src="/images/splash-img-1.svg"
        alt="Spinning Circle"
        className="absolute left-10 w-[340px] h-[340px] -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
          rotateX: [0, 10, 0, -10, 0],
          rotateY: [0, -10, 0, 10, 0],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 10, ease: "linear" },
          rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          rotateY: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        }}
      />

      {/* Optional second image */}
      <motion.img
        src="/images/splash-img-2.svg"
        alt="Base Background"
        className="absolute bottom-0 right-0 w-[220px] opacity-70"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Text Animation */}
      <motion.div
        className="absolute bottom-10 left-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h1 className="text-[67px] leading-tight">
          <span className="font-medium">Eat</span> <br />
          <motion.span
            className="font-bold text-(--orange-text) inline-block"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 1.05, 1] }}
            transition={{
              delay: 1.5,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Easy
          </motion.span>
        </h1>
      </motion.div>
    </motion.div>
  );
}

export default Splash;
