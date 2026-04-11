
import { motion } from "motion/react";
import { useTheme } from "../hooks/useTheme";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

interface Props {
  className?: string;
  size?: number; // px
}

export default function ThemeSwitchButton({
  className = "",
  size = 24,
}: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  // Use motion.create to avoid the deprecated motion() factory warning
  const SunIcon = motion.create(IoMdSunny);
  const MoonIcon = motion.create(FaMoon);

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      whileTap={{ scale: 0.95 }}
      className={
        "flex items-center justify-center rounded-full cursor-pointer" +
        className
      }
      style={{ width: size, height: size }}
    >
      {isDark ? (
        <SunIcon
          className="w-5 h-5 text-(--orange-text)"
          initial={{ rotate: -20, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        />
      ) : (
        <MoonIcon
          className="w-5 h-5 text-(--neutral-800) dark:text-(--neutral-100)"
          initial={{ rotate: 10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        />
      )}
    </motion.button>
  );
}
