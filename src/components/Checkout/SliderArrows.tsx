import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const SlickPrevArrow = ({
  onClick,
  isDark,
}: {
  onClick?: () => void;
  isDark: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-md transition-all cursor-pointer ${
      isDark
        ? "bg-white/15 hover:bg-white/25 text-white border border-white/20"
        : "bg-white hover:bg-gray-50 text-[#32324D] border border-gray-200"
    }`}
  >
    <FaChevronLeft size={14} />
  </button>
);

export const SlickNextArrow = ({
  onClick,
  isDark,
}: {
  onClick?: () => void;
  isDark: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-md transition-all cursor-pointer ${
      isDark
        ? "bg-white/15 hover:bg-white/25 text-white border border-white/20"
        : "bg-white hover:bg-gray-50 text-[#32324D] border border-gray-200"
    }`}
  >
    <FaChevronRight size={14} />
  </button>
);
