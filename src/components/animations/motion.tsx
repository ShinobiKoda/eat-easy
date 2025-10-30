import React, { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
  direction: "left" | "right" | "up" | "down" = "up"
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
};

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  style?: React.CSSProperties;
}

export const MotionContainer = ({
  children,
  className,
  variants = staggerContainer,
  style,
}: MotionWrapperProps) => (
  <motion.div
    className={className}
    style={style}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.15 }}
    variants={variants}
  >
    {children}
  </motion.div>
);

export const MotionItem = ({
  children,
  className,
  variants = fadeIn,
  style,
}: MotionWrapperProps) => (
  <motion.div className={className} style={style} variants={variants}>
    {children}
  </motion.div>
);

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

export const SlideIn = ({
  children,
  direction = "up",
  className,
  style,
}: React.PropsWithChildren<{
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  style?: React.CSSProperties;
}>) => (
  <MotionItem className={className} style={style} variants={slideIn(direction)}>
    {children}
  </MotionItem>
);

export const spinIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -90 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
