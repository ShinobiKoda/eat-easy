const easeInOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Product grid and card animation variants
export const productGridStagger = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easeInOut,
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

export const productCardFade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeInOut } },
  exit: { opacity: 0, y: 32, transition: { duration: 0.4 } },
};
export const scaleButton: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.18, ease: "easeOut" } },
  tap: { scale: 0.95, transition: { duration: 0.12, ease: "easeIn" } },
};

export const ScaleButton = ({
  children,
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <motion.button
    className={className}
    style={style}
    variants={scaleButton}
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    type="button"
    onClick={onClick}
  >
    {children}
  </motion.button>
);
import React, { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { useState, useEffect } from "react";

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const floaty: Variants = {
  hidden: { y: 0 },
  show: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export const slideIn = (
  direction: "left" | "right" | "up" | "down" = "up",
): Variants => {
  const distance = 24;
  const from =
    direction === "left"
      ? { x: -distance }
      : direction === "right"
        ? { x: distance }
        : direction === "up"
          ? { y: distance }
          : { y: -distance };

  return {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };
};

/* ---------------------- WRAPPERS ---------------------- */

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  style?: React.CSSProperties;
}

/* Parent-level container for stagger animation */
export const MotionContainer = ({
  children,
  className,
  variants = staggerContainer,
  style,
}: MotionWrapperProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      animate={ready ? "show" : "hidden"}
      viewport={{ once: false, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/* Base motion wrapper for all other components */
export const MotionItem = ({
  children,
  className,
  variants,
  style,
}: MotionWrapperProps) => (
  <motion.div
    className={className}
    style={style}
    variants={variants}
    initial="hidden"
    animate="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

/* Quick animation wrappers */
export const FadeIn = ({
  children,
  className,
  style,
}: Omit<MotionWrapperProps, "variants">) => (
  <MotionItem className={className} style={style} variants={fadeIn}>
    {children}
  </MotionItem>
);

export const PopIn = ({
  children,
  className,
  style,
}: Omit<MotionWrapperProps, "variants">) => (
  <MotionItem className={className} style={style} variants={popIn}>
    {children}
  </MotionItem>
);

export const Floaty = ({
  children,
  className,
  style,
}: Omit<MotionWrapperProps, "variants">) => (
  <MotionItem className={className} style={style} variants={floaty}>
    {children}
  </MotionItem>
);

/* Slide in from any direction */
export const SlideIn = ({
  children,
  direction = "up",
  className,
  style,
}: {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  style?: React.CSSProperties;
}) => (
  <MotionItem className={className} style={style} variants={slideIn(direction)}>
    {children}
  </MotionItem>
);

/* Extra animations */
export const spinIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -90 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: easeInOut },
  },
};

export const spinFloat: Variants = {
  hidden: { rotate: 0 },
  show: {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: easeInOut,
    },
  },
};

/* Dropdown animations */
export const dropdownContainer: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transformOrigin: "top",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: easeInOut,
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const dropdownItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: easeInOut },
  },
  exit: {
    opacity: 0,
    x: -5,
    transition: { duration: 0.15 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};
