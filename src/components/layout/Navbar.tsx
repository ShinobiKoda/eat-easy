import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu2Fill } from "react-icons/ri";
import { IoArrowBack, IoCartOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MotionItem, PopIn, FadeIn } from "../animations/motion";
import { useNavigate, Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";

type NavbarProps = {
  description?: string;
  className?: string;
  title?: string;
  previous?: () => void;
  showBack?: boolean;
  orderItems?: any[];
  setShowOrder?: (show: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  title = "",
  description = "",
  className = "",
  previous,
  showBack,
  orderItems = [],
  setShowOrder,
}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = orderItems.length;
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
              <span className="heading-font font-semibold text-[14px] sm:text-[18px] text-(--neutral-800) dark:text-white min-w-[145px] whitespace-nowrap">
                {description}
              </span>
            </p>
          </div>
        )}
      </MotionItem>

      <div className="flex items-center gap-4 ml-auto" ref={dropdownRef}>
        <div className="relative">
          <FadeIn>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-(--neutral-700) dark:text-(--purple-5) cursor-pointer flex items-center gap-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle order menu"
            >
              <div className="relative">
                <IoCartOutline size={26} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-(--orange-1) rounded-full border-2 border-white dark:border-(--dark-mode-bg)">
                    {cartCount}
                  </span>
                )}
              </div>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1"
              >
                <FiChevronDown size={16} />
              </motion.div>
            </motion.button>
          </FadeIn>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-3 w-44 bg-white dark:bg-(--neutral-800) rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden z-50 py-1.5"
              >
                <div
                  className="px-4 py-3 flex items-center gap-3 hover:bg-(--neutral-50) dark:hover:bg-(--neutral-700) cursor-pointer transition-all duration-200"
                  onClick={() => {
                    setShowOrder?.(true);
                    setDropdownOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-(--purple-6) dark:bg-(--purple-3)/20 flex items-center justify-center">
                    <IoCartOutline
                      size={18}
                      className="text-(--purple-4) dark:text-(--purple-5)"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-(--neutral-800) dark:text-white leading-none">
                      My Cart
                    </span>
                    <span className="text-[11px] font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-0.5">
                      {cartCount} {cartCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                <div className="mx-3 border-t border-(--neutral-100) dark:border-(--neutral-700)" />

                <Link
                  to="/orderStatus"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-(--neutral-50) dark:hover:bg-(--neutral-700) cursor-pointer transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-(--purple-2) flex items-center justify-center">
                    <RiShoppingBag3Line size={18} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-(--neutral-800) dark:text-white leading-none">
                      Order Status
                    </span>
                    <span className="text-[11px] font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-0.5">
                      Track deliveries
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="outline-none border-none cursor-pointer p-2"
          onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
          aria-label="Toggle sidebar"
        >
          <RiMenu2Fill
            size={24}
            className="text-(--neutral-700) dark:text-(--purple-5)"
          />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
