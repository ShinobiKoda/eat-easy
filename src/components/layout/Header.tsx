import Navbar from "./Navbar";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMyLocation } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  MotionContainer,
  MotionItem,
  FadeIn,
  PopIn,
  SlideIn,
  dropdownContainer,
  dropdownItem,
} from "../animations/motion";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "../../hooks/useLocation";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { closeSidebar } from "../../utils/sidebar";

interface HeaderProps {
  title?: string;
  description?: string;
  previous?: () => void;
  navbarTitle?: string;
  navbarDescription?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Food Menu",
  description = "",
  previous,
  navbarTitle = "",
  navbarDescription = "",
  showBack = false,
}) => {
  const locationCtx = useLocation();
  const location = locationCtx.location;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const tabletMenuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
      }
      if (
        orderRef.current &&
        !orderRef.current.contains(event.target as Node)
      ) {
        setOrderDropdownOpen(false);
      }
      if (
        tabletMenuRef.current &&
        !tabletMenuRef.current.contains(event.target as Node)
      ) {
        setTabletMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      if (detail && typeof detail.open === "boolean") {
        setSidebarOpen(detail.open);
      }
    };
    window.addEventListener("sidebar-state", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar-state", handler as EventListener);
  }, []);

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <div
      style={{ backgroundImage }}
      className={`fixed top-0 right-0 z-30 transition-all duration-300 left-0 ${
        sidebarOpen ? "md:left-[260px]" : "md:left-36"
      }`}
    >
      <SlideIn direction="down" className="w-full md:hidden">
        <Navbar
          title={navbarTitle}
          description={navbarDescription}
          showBack={showBack}
        />
      </SlideIn>

      {/* Tablet Header - Combined dropdown for location & order */}
      <MotionContainer className="w-full hidden md:flex lg:hidden px-[30px] py-5 border-b-[1.5px] border-b-(--neutral-150) dark:border-b-(--neutral-700) items-center justify-between bg-(--light-mode-bg) dark:bg-(--dark-mode-bg)">
        <div className="flex items-center gap-3">
          {showBack && (
            <PopIn>
              <motion.button
                onClick={() => {
                  if (previous) previous();
                  else navigate(-1);
                  closeSidebar();
                }}
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
          )}
          <MotionItem>
            <p className="flex flex-col">
              <span className="font-semibold text-sm text-(--neutral-500) dark:text-(--neutral-200)">
                {title}
              </span>
              <span className="heading-font font-medium text-[22px] text-(--neutral-800) heading-font dark:text-white">
                {description}
              </span>
            </p>
          </MotionItem>
        </div>

        {/* for tablet view */}
        <FadeIn>
          <div className="relative" ref={tabletMenuRef}>
            <motion.button
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-(--neutral-700) rounded-xl shadow-sm cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              onClick={() => setTabletMenuOpen(!tabletMenuOpen)}
            >
              <HiOutlineMenuAlt3 size={22} className="text-(--purple-3)" />
              <motion.div
                animate={{ rotate: tabletMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown size={18} className="text-(--purple-3)" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {tabletMenuOpen && (
                <motion.div
                  variants={dropdownContainer}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute top-full right-0 mt-2 w-[300px] bg-white dark:bg-(--neutral-700) rounded-2xl shadow-lg border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden z-50"
                >
                  <div className="p-3">
                    {/* Location Section */}
                    <motion.div variants={dropdownItem} className="mb-2">
                      <p className="px-3 py-2 text-xs font-semibold text-(--neutral-400) dark:text-(--neutral-300) uppercase tracking-wide">
                        Your Location
                      </p>
                    </motion.div>

                    <motion.div
                      variants={dropdownItem}
                      className="px-4 py-3 rounded-xl bg-(--neutral-50) dark:bg-(--neutral-600)"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-(--purple-2) flex items-center justify-center shrink-0">
                          <CiLocationOn size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
                            {location?.address
                              ? "Current Location"
                              : "No location set"}
                          </p>
                          <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-300) truncate">
                            {location?.address ||
                              "Set your location to continue"}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={dropdownItem}
                      className="px-4 py-3 rounded-xl hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600) cursor-pointer transition-colors mt-1"
                      onClick={async () => {
                        if (
                          typeof locationCtx.getCurrentLocation === "function"
                        ) {
                          await locationCtx.getCurrentLocation();
                        }
                        setTabletMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-(--yellow-1)/10 flex items-center justify-center">
                          <HiOutlineLocationMarker
                            size={20}
                            className="text-(--yellow-1)"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
                            Change location
                          </p>
                          <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-300)">
                            Update your current location
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      variants={dropdownItem}
                      className="mx-3 my-3 border-t border-(--neutral-150) dark:border-(--neutral-600)"
                    />

                    {/* Order Link */}
                    <motion.div variants={dropdownItem}>
                      <Link
                        to="/OrderStatus"
                        onClick={() => setTabletMenuOpen(false)}
                        className="block"
                      >
                        <motion.div
                          className="px-4 py-3 rounded-xl bg-(--purple-2) cursor-pointer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <IoCartOutline
                                  size={20}
                                  className="text-white"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-white">
                                  My Order
                                </p>
                                <p className="font-medium text-xs text-white/70">
                                  View your cart
                                </p>
                              </div>
                            </div>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <FiChevronDown
                                size={20}
                                className="text-white -rotate-90"
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </MotionContainer>

      {/* Desktop Header - Separate location and order dropdowns */}
      <MotionContainer className="w-full hidden lg:flex px-[30px] py-5 border-b-[1.5px] border-b-(--neutral-150) dark:border-b-(--neutral-700) items-center justify-between bg-(--light-mode-bg) dark:bg-(--dark-mode-bg)">
        <div className="flex items-center gap-3">
          {showBack && (
            <PopIn>
              <motion.button
                onClick={() => {
                  if (previous) previous();
                  else navigate(-1);
                  closeSidebar();
                }}
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
          )}
          <MotionItem>
            <p className="flex flex-col">
              <span className="font-semibold text-sm text-(--neutral-500) dark:text-(--neutral-200)">
                {title}
              </span>
              <span className="heading-font font-medium text-[22px] text-(--neutral-800) heading-font dark:text-white">
                {description}
              </span>
            </p>
          </MotionItem>
        </div>
        <div className="flex items-center gap-3">
          <FadeIn>
            <div className="relative" ref={locationRef}>
              <motion.button
                className="flex items-center px-6 py-3 gap-px cursor-pointer text-(--purple-3) dark:text-(--purple-5)"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                onClick={() => {
                  setLocationDropdownOpen(!locationDropdownOpen);
                  setOrderDropdownOpen(false);
                }}
              >
                <CiLocationOn size={20} />
                <span className="font-semibold text-sm">
                  {location?.address || "Set location"}
                </span>
                <motion.div
                  animate={{ rotate: locationDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown size={20} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {locationDropdownOpen && (
                  <motion.div
                    variants={dropdownContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full right-0 mt-2 w-[280px] bg-white dark:bg-(--neutral-700) rounded-2xl shadow-lg border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <motion.div
                        variants={dropdownItem}
                        className="px-4 py-3 rounded-xl hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600) cursor-pointer transition-colors"
                        onClick={async () => {
                          if (
                            typeof locationCtx.getCurrentLocation === "function"
                          ) {
                            await locationCtx.getCurrentLocation();
                          }
                          setLocationDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-(--purple-6) dark:bg-(--purple-3)/20 flex items-center justify-center">
                            <MdOutlineMyLocation
                              size={20}
                              className="text-(--purple-3)"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
                              Use current location
                            </p>
                            <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-300)">
                              Auto-detect your location
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={dropdownItem}
                        className="px-4 py-3 rounded-xl hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600) cursor-pointer transition-colors"
                        onClick={() => {
                          navigate("/set-custom-location");
                          setLocationDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-(--yellow-1)/10 flex items-center justify-center">
                            <HiOutlineLocationMarker
                              size={20}
                              className="text-(--yellow-1)"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
                              Set location manually
                            </p>
                            <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-300)">
                              Search or pick on map
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {location?.address && (
                        <>
                          <div className="mx-4 my-2 border-t border-(--neutral-150) dark:border-(--neutral-600)" />
                          <motion.div
                            variants={dropdownItem}
                            className="px-4 py-3 rounded-xl bg-(--purple-6)/50 dark:bg-(--purple-3)/10"
                          >
                            <div className="flex items-center gap-3 text-(--purple-3) dark:text-(--purple-5)">
                              <div className="w-10 h-10 rounded-xl bg-(--purple-2) flex items-center justify-center">
                                <CiLocationOn size={20} />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm">
                                  Current location
                                </p>
                                <p className="font-medium text-xs  truncate max-w-40">
                                  {location.address}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="w-[21px] h-full border-[1.5px] border-(--neutral-200) rotate-90"></div>
          </FadeIn>

          <SlideIn direction="left">
            <div className="relative" ref={orderRef}>
              <motion.button
                className="px-6 py-3 text-(--purple-3) dark:text-(--purple-5) flex items-center gap-px cursor-pointer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                onClick={() => {
                  setOrderDropdownOpen(!orderDropdownOpen);
                  setLocationDropdownOpen(false);
                }}
              >
                <IoCartOutline size={20} />
                <span className="font-semibold text-sm">My Order</span>
                <motion.div
                  animate={{ rotate: orderDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown size={20} className="" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {orderDropdownOpen && (
                  <motion.div
                    variants={dropdownContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full right-0 mt-2 w-[300px] bg-white dark:bg-(--neutral-700) rounded-2xl shadow-lg border border-(--neutral-150) dark:border-(--neutral-600) overflow-hidden z-50"
                  >
                    <div className="p-4">
                      <motion.div
                        variants={dropdownItem}
                        className="flex items-center justify-between mb-4"
                      >
                        <p className="font-semibold text-base text-(--neutral-800) dark:text-white">
                          Your Order
                        </p>
                        <span className="px-2 py-1 bg-(--purple-6) dark:bg-(--purple-3)/20 rounded-lg text-xs font-semibold text-(--purple-3)">
                          0 items
                        </span>
                      </motion.div>

                      <motion.div
                        variants={dropdownItem}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center mb-4">
                          <RiShoppingBag3Line
                            size={28}
                            className="text-(--neutral-400) dark:text-(--neutral-300)"
                          />
                        </div>
                        <p className="font-semibold text-sm text-(--neutral-800) dark:text-white mb-1">
                          Your cart is empty
                        </p>
                        <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-300)">
                          Add items to get started
                        </p>
                      </motion.div>

                      <motion.div variants={dropdownItem}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-3 bg-(--purple-2) text-white font-semibold text-sm rounded-xl cursor-pointer"
                          onClick={() => {
                            navigate("/orderStatus");
                            setOrderDropdownOpen(false);
                          }}
                        >
                          OrderStatus
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SlideIn>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Header;
