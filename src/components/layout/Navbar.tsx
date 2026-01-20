import React from "react";
import { motion } from "framer-motion";
import { RiMenu2Fill } from "react-icons/ri";

type NavbarProps = {
  className?: string;
  title?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className = "", title = " " }) => {
  
  return (
    <nav className={`w-full ${className} lg:hidden`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-4 outline-none border-none cursor-pointer"
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
