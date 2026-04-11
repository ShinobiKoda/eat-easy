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
      transition={{ duration: 0.8, delay: 3.2 }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-(--neutral-500) dark:text-(--neutral-300)">
          Welcome to
        </p>
        <h1 className="heading-font text-4xl font-semibold leading-tight sm:text-[40px]">
          <span className="font-medium text-(--neutral-700) dark:text-(--neutral-150)">
            Eat
          </span>{" "}
          <motion.span
            className="inline-block font-bold text-(--orange-text)"
            initial={{ scale: 0.96 }}
            animate={{ scale: [0.96, 1.02, 1] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Easy
          </motion.span>
        </h1>
        <p className="max-w-xs text-sm text-(--neutral-550) dark:text-(--neutral-300)">
          Curating the perfect bite for you.
        </p>

        <motion.div
          className="mt-4 h-[3px] w-40 overflow-hidden rounded-full bg-(--light-progress-bg) dark:bg-(--neutral-700)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <motion.div
            className="h-full w-full rounded-full bg-(--orange-text)"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 3.2, ease: [0.25, 0.8, 0.25, 1] }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Splash;
