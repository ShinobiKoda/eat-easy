import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

function Splash() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Refs for audio
  const popRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);

  const [isAudioReady, setIsAudioReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const popAudio = new Audio("/sounds/pop-up.mp3");
    const dingAudio = new Audio("/sounds/ding.mp3");
    popAudio.volume = dingAudio.volume = 0.9;

    popRef.current = popAudio;
    dingRef.current = dingAudio;

    popAudio
      .play()
      .then(() => {
        localStorage.setItem("soundEnabled", "true");
      })
      .catch(() => {
        if (localStorage.getItem("soundEnabled") === "true") {
          setIsAudioReady(true);
        } else {
          setIsAudioReady(true);
        }
      });

    const timer = setTimeout(() => {
      dingAudio.play().catch(() => {});
      navigate("/get-started");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Handle manual click if autoplay is blocked
  const handlePlayManually = () => {
    if (popRef.current && dingRef.current) {
      popRef.current.play().catch(() => {});
      // Fade overlay then clear audio-prompt state
      setOverlayVisible(false);
      // allow short fade-out before removing the prompt state
      setTimeout(() => setIsAudioReady(false), 240);
    }
  };

  // When autoplay is detected as blocked, show overlay
  useEffect(() => {
    if (isAudioReady) setOverlayVisible(true);
  }, [isAudioReady]);

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
      // overlay handles the manual play gesture; don't attach global click
      onClick={undefined}
    >
      {/* Theme toggle (top-right) */}

      {/* Full-screen centered enable-sound overlay when autoplay is blocked */}
      {overlayVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-40">
          {/* Backdrop layer */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-200" />

          {/* Centered button (above the backdrop) */}
          <button
            onClick={handlePlayManually}
            className="relative z-50 bg-white/95 dark:bg-gray-900/95 text-black dark:text-white px-6 py-3 rounded-xl shadow-xl text-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            Enable sound 🔊
          </button>
        </div>
      )}

      {/* Rotating + 3D Wobble SVG */}
      <motion.img
        src="/images/splash-img-1.svg"
        alt="Spinning Circle"
        className="absolute left-10 -translate-x-1/2 -translate-y-1/2"
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
        className="absolute bottom-10 right-0 opacity-70"
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
          <span className="font-medium text-(--neutral-700) dark:text-(--neutral-150)">
            Eat
          </span>{" "}
          <br />
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
