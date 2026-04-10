import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Splash() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Silently attempt autoplay — if browser blocks it, just skip
    const popAudio = new Audio("/sounds/pop-up.mp3");
    popAudio.volume = 0.9;
    popAudio.play().catch(() => {});

    const timer = setTimeout(() => {
      navigate("/get-started");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <motion.div
      className="relative w-full h-dvh overflow-hidden flex items-center justify-center"
      style={{ backgroundImage }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1, delay: 3 }}
    >
      {/* Rotating + 3D Wobble SVG */}
      <motion.img
        src="/images/splash-img-1.webp"
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
        src="/images/splash-img-2.webp"
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

