import React from "react";
import { motion } from "framer-motion";
import { RiMenu2Fill } from "react-icons/ri";
import { MotionItem } from "../animations/motion";
import { HiOutlineLocationMarker } from "react-icons/hi";

type NavbarProps = {
  title?: string;
  description?: string
  className?: string;
  title?: string;
};

const Navbar: React.FC<NavbarProps> = ({ title = "", description = "", className = "" }) => {
  return (
    <nav className={`w-full flex justify-between items-center px-6 py-4 ${className}`}>
      <MotionItem className="w-full">
        <p className="flex flex-col">
          <span className="flex gap-2 items-center font-semibold text-sm text-(--neutral-500)">
            <HiOutlineLocationMarker size={20} />
            {title}
          </span>
          <span className="heading-font font-medium text-[22px] text-(--neutral-800)">
            {description}
          </span>
        </p>
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
        {title && <p>{title}</p>}
      </motion.button>
    </nav>
  );
};

export default Navbar;
