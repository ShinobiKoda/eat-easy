import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  Floaty,
} from "../components/animations/motion";
import SEO from "../components/SEO";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-12">
      <SEO
        title="404 — Page Not Found | EatEasy"
        description="The page you're looking for doesn't exist."
      />

      <MotionContainer className="w-full max-w-lg mx-auto text-center">
        {/* Floating plate illustration */}
        <Floaty className="flex justify-center mb-8">
          <div className="relative">
            {/* Plate */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-linear-to-br from-(--neutral-100) to-(--neutral-200) dark:from-(--neutral-700) dark:to-(--neutral-600) flex items-center justify-center shadow-lg">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white dark:bg-(--neutral-800) flex items-center justify-center shadow-inner">
                <IoRestaurantOutline
                  size={48}
                  className="text-(--neutral-300) dark:text-(--neutral-500)"
                />
              </div>
            </div>

            {/* Decorative dots */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-(--yellow-1)"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-(--purple-2)"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-6 -left-5 w-3 h-3 rounded-full bg-(--orange-1)"
            />
          </div>
        </Floaty>

        {/* 404 text */}
        <PopIn>
          <h1 className="heading-font font-bold text-[80px] sm:text-[100px] leading-none bg-linear-to-r from-(--purple-2) via-(--orange-1) to-(--yellow-1) bg-clip-text text-transparent">
            404
          </h1>
        </PopIn>

        <FadeIn>
          <h2 className="heading-font font-bold text-[22px] sm:text-[28px] text-(--neutral-800) dark:text-white mt-2">
            Oops! Nothing on this plate
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-sm sm:text-base font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-3 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to something delicious.
          </p>
        </FadeIn>

        {/* Action buttons */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/welcome")}
              className="group px-8 py-4 rounded-2xl bg-(--purple-2) text-white font-semibold text-[15px] cursor-pointer flex items-center gap-2.5 shadow-lg shadow-(--purple-2)/20"
            >
              <HiOutlineHome size={18} />
              Go Home
              <FaArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/FullMenu")}
              className="px-8 py-4 rounded-2xl bg-white dark:bg-(--neutral-700) text-(--neutral-800) dark:text-white font-semibold text-[15px] cursor-pointer flex items-center gap-2.5 shadow-sm"
            >
              <IoRestaurantOutline size={18} />
              Browse Menu
            </motion.button>
          </div>
        </FadeIn>

        {/* Subtle branding */}
        <FadeIn>
          <p className="mt-12 text-xs font-medium text-(--neutral-400) dark:text-(--neutral-500)">
            <span className="font-medium text-(--neutral-600) dark:text-(--neutral-300)">
              Eat
            </span>
            <span className="font-bold text-(--orange-1)">Easy</span> &middot;
            Making meals effortless
          </p>
        </FadeIn>
      </MotionContainer>
    </div>
  );
};

export default NotFound;
