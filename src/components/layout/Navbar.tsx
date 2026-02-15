import React from "react";
import { motion } from "framer-motion";
import { RiMenu2Fill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MotionItem, PopIn } from "../animations/motion";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  description?: string;
  className?: string;
  title?: string;
  previous?: () => void;
  showBack?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({
  title = "",
  description = "",
  className = "",
  previous,
  showBack,
}) => {
  const navigate = useNavigate();
  return (
    <nav
      className={`w-full flex justify-between items-center px-6 py-4 md:hidden ${className}`}
    >
      <MotionItem className="w-full">
        {title && (
          <div className="flex flex-center gap-3 items-center">
            {showBack ? (
              <PopIn>
                <motion.button
                  onClick={previous || (() => navigate(-1))}
                  className="w-12 h-12 rounded-xl bg-white flex items-center justify-center cursor-pointer dark:bg-(--neutral-700)"
                  aria-label="Go back"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                >
                  <IoArrowBack
                    size={20}
                    className="dark:text-white text-(--neutral-600)"
                  />
                </motion.button>
              </PopIn>
            ) : (
              <HiOutlineLocationMarker
                size={20}
                className="dark:text-(--neutral-200)"
              />
            )}
            <p className="flex flex-col">
              <span className="flex gap-2 items-center font-semibold text-[14px] text-(--neutral-500) dark:text-(--neutral-200) ">
                {title}
              </span>
              <span className="heading-font font-semibold text-[18px] text-(--neutral-800) dark:text-white min-w-[145px] whitespace-nowrap">
                {description}
              </span>
            </p>
          </div>
        )}
      </MotionItem>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full outline-none border-none cursor-pointer"
        onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
        aria-label="Toggle sidebar"
      >
        <RiMenu2Fill
          size={24}
          className="ml-auto text-(--neutral-700) dark:text-(--purple-5)"
        />
      </motion.button>
    </nav>
  );
};

export default Navbar;
