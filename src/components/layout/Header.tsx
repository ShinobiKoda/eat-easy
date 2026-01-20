import Navbar from "./Navbar";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import {
  MotionContainer,
  MotionItem,
  FadeIn,
  PopIn,
  SlideIn,
} from "../animations/motion";
import { motion } from "motion/react";
import { useLocation } from "../../hooks/useLocation";
import { useState, useEffect } from "react";

interface HeaderProps {
  title?: string;
  description?: string;
  previous?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Food Menu",
  description = "",
  previous,
}) => {
  const { location } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div
      className={`w-full fixed top-0 right-0 z-40 bg-(--light-mode-bg) dark:bg-(--dark-mode-bg) transition-all duration-300 left-0 ${
        sidebarOpen ? "lg:left-[260px]" : "lg:left-36"
      }`}
    >
      <SlideIn direction="down" className="w-full lg:hidden">
        <Navbar />
      </SlideIn>

      <MotionContainer className="w-full hidden lg:flex px-[30px] py-5 border-b-[1.5px] border-b-(--neutral-150) dark:border-b-(--neutral-700) items-center justify-between bg-(--light-mode-bg) dark:bg-(--dark-mode-bg)">
        <div className="flex items-center gap-3">
          {previous && (
            <PopIn>
              <motion.button
                onClick={previous}
                className="w-12 h-12 rounded-xl bg-white flex items-center justify-center cursor-pointer"
                aria-label="Go back"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <IoArrowBack size={20} />
              </motion.button>
            </PopIn>
          )}
          <MotionItem>
            <p className="flex flex-col">
              <span className="font-semibold text-sm text-(--neutral-500)">
                {title}
              </span>
              <span className="heading-font font-medium text-[22px] text-(--neutral-800)">
                {description}
              </span>
            </p>
          </MotionItem>
        </div>
        <div className="flex items-center gap-3">
          <FadeIn>
            <motion.button
              className="flex items-center px-6 py-3 gap-px cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <CiLocationOn size={20} className="text-(--purple-3)" />
              <span className="font-semibold text-sm text-(--purple-3)">
                {location?.address || "Set location"}
              </span>
              <FiChevronDown size={20} className="text-(--purple-3)" />
            </motion.button>
          </FadeIn>
          <FadeIn>
            <div className="w-[21px] h-full border-[1.5px] border-(--neutral-200) rotate-90"></div>
          </FadeIn>
          <SlideIn direction="left">
            <motion.button
              className="px-6 py-3 text-(--purple-3) flex items-center gap-px cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <IoCartOutline size={20} />
              <span className="font-semibold text-sm">My Order</span>
            </motion.button>
          </SlideIn>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Header;
