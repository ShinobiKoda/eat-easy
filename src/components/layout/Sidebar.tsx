import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "/images/profile-img.png";
import { IoIosLogOut } from "react-icons/io";
import { PiMedalThin } from "react-icons/pi";
import { MdChevronRight } from "react-icons/md";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";
import { MdOutlineHistory } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { useTheme } from "../../hooks/useTheme";
import LogoutModal from "../LogoutModal";
import { supabase } from "../../config/supabaseClient";
import { adminService } from "../../services/adminService";
import { LuShieldCheck } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  // Fetch username from Supabase session
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const meta = user.user_metadata as any;
        let uname = meta?.username || user.email?.split("@")[0] || "User";
        setUsername(uname);

        // Also check admin status
        try {
          const adminStatus = await adminService.isCurrentUserAdmin();
          setIsAdmin(adminStatus);
        } catch (e) {
          console.error("Failed admin check in sidebar", e);
        }
      }
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setShowLogoutModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const effectiveIsOpen = isOpen;
  const activeMenu = openMenuId;
  const isSelfDispatch = useRef(false);

  const handleToggle = () => setIsOpen((v) => !v);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // Listen to global toggle
  useEffect(() => {
    const onGlobalToggle = () => setIsOpen((v) => !v);
    window.addEventListener("toggle-sidebar", onGlobalToggle);
    return () => window.removeEventListener("toggle-sidebar", onGlobalToggle);
  }, []);

  // Listen to explicit open/close states from other components
  useEffect(() => {
    const handler = (e: Event) => {
      if (isSelfDispatch.current) return;
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      if (detail && typeof detail.open === "boolean") {
        setIsOpen(detail.open);
      }
    };
    window.addEventListener("sidebar-state", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar-state", handler as EventListener);
  }, []);

  // Sync sidebar state to Header & App — useLayoutEffect fires before paint
  // so all elements start their CSS transitions in the same frame
  useLayoutEffect(() => {
    isSelfDispatch.current = true;
    window.dispatchEvent(
      new CustomEvent("sidebar-state", { detail: { open: isOpen } }),
    );
    isSelfDispatch.current = false;
  }, [isOpen]);

  // Auto-close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.aside
        initial={false}
        animate={{
          x: typeof window !== "undefined" && window.innerWidth < 768
            ? (effectiveIsOpen ? 0 : -260)
            : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          willChange: "width, transform",
          transitionProperty: "width",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className={`aside h-screen rounded-r-3xl fixed left-0 top-0 z-50 w-[260px] ${effectiveIsOpen ? "md:w-[260px]" : "md:w-36"} md:translate-x-0`}
      >
        <motion.div
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:flex w-[38px] h-[38px] bg-(--neutral-800) top-28 -right-4 absolute rounded-full items-center justify-center border border-(--neutral-400)"
        >
          <button className="rounded-full cursor-pointer">
            <MdChevronRight
              size={24}
              className={`${
                effectiveIsOpen ? "rotate-180" : "rotate-0"
              } text-(--neutral-200)`}
            />
          </button>
        </motion.div>

        <div className={`flex flex-col h-full`}>
          <div
            className={`py-[28.4px] flex justify-center items-center text-center text-[24px] border-b border-b-(--neutral-150) dark:border-b-(--neutral-700)`}
          >
            <span className="font-medium text-(--neutral-100)">Eat</span>
            <span className="font-bold text-(--orange-1)">Easy</span>
          </div>

          <div className="w-full h-px "></div>

          <div
            className={`flex-1 overflow-y-auto scrollbar-hidden flex flex-col px-[30px] pt-5 pb-6  ${
              effectiveIsOpen ? "" : "items-center"
            }`}
          >
            <div
              className={`flex items-center gap-[22px] ${
                !effectiveIsOpen ? "flex-row md:flex-col items-center" : ""
              }`}
            >
              <div className="shrink-0 flex items-center justify-center">
                <img
                  src={Profile}
                  className="w-[68px] h-[68px] rounded-full object-cover"
                  alt="Profile Picture Image"
                />
              </div>

              <div className="text-white space-y-1.5 w-full">
                <p
                  className={`font-semibold text-base max-w-[120px] md:max-w-full ${
                    effectiveIsOpen
                      ? "truncate md:whitespace-normal md:overflow-visible"
                      : "truncate"
                  }`}
                  title={username}
                  style={{ direction: "ltr" }}
                >
                  {effectiveIsOpen
                    ? username
                    : username.length > 12
                      ? username.slice(0, 12) + "..."
                      : username}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer font-medium text-sm underline outline-none border-none"
                >
                  View Profile
                </motion.button>
              </div>
            </div>

            <div className="flex justify-center flex-col mt-10 pt-[18px]">
              <h1 className="text-[13px] font-semibold text-(--neutral-150)">
                MENU
              </h1>

              <div className="w-full space-y-4 mt-4">
                <div className="space-y-4">
                  <motion.button
                    onClick={() => {
                      if (!isOpen) setIsOpen(true);
                      toggleMenu(1);
                      setSelectedItem(1);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        selectedItem === 1 ? "bg-(--yellow-1)" : "bg-white/15"
                      }`}
                    >
                      <TfiBook className="text-white" size={24} />
                    </div>
                    <p
                      className={`${
                        selectedItem === 1
                          ? "text-(--yellow-1) font-bold"
                          : "text-white"
                      } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                    >
                      Food Menu
                    </p>
                  </motion.button>
                  <AnimatePresence>
                    {effectiveIsOpen && activeMenu === 1 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`border-l-2 border-(--yellow-2) ml-[25px] space-y-4 pl-[33px] overflow-hidden ${
                          activeMenu === 1
                            ? "max-h-[300px] overflow-y-auto scrollbar-hidden"
                            : ""
                        }`}
                      >
                        <NavLink to="/smart-assistant">
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer font-medium text-base text-white"
                          >
                            Smart Assistant
                          </motion.div>
                        </NavLink>

                        <NavLink to="/FullMenu">
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer font-medium text-base text-white"
                          >
                            Full Menu
                          </motion.div>
                        </NavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <NavLink to="/history">
                    <motion.button
                      onClick={() => setSelectedItem(2)}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                    >
                      <div
                        className={`p-3 rounded-2xl ${
                          selectedItem === 2 ? "bg-(--yellow-1)" : "bg-white/15"
                        }`}
                      >
                        <MdOutlineHistory className="text-white" size={24} />
                      </div>
                      <p
                        className={`${
                          selectedItem === 2
                            ? "text-(--yellow-1) font-bold"
                            : "text-white"
                        } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                      >
                        Order History
                      </p>
                    </motion.button>
                  </NavLink>
                </div>

                <div className="space-y-4">
                  <NavLink to="/locations">
                    <motion.button
                      onClick={() => setSelectedItem(3)}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                    >
                      <div
                        className={`p-3 rounded-2xl ${
                          selectedItem === 3 ? "bg-(--yellow-1)" : "bg-white/15"
                        }`}
                      >
                        <IoLocationOutline className="text-white" size={24} />
                      </div>

                      <p
                        className={`${
                          selectedItem === 3
                            ? "text-(--yellow-1) font-bold"
                            : "text-white"
                        } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                      >
                        Location
                      </p>
                    </motion.button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white mt-4 mb-4"></div>

            <div
              className={`flex justify-center flex-col ${
                effectiveIsOpen ? "" : "items-center"
              }`}
            >
              <h1 className="text-[13px] font-semibold text-(--neutral-150)">
                GENERAL
              </h1>
              <div className="mt-4 space-y-4">
                <div className="space-y-4">
                  <NavLink to="/rewards">
                    <motion.button
                      onClick={() => setSelectedItem(4)}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                    >
                      <div
                        className={`p-3 rounded-2xl ${
                          selectedItem === 4 ? "bg-(--yellow-1)" : "bg-white/15"
                        }`}
                      >
                        <PiMedalThin className="text-white" size={24} />
                      </div>

                      <p
                        className={`${
                          selectedItem === 4
                            ? "text-(--yellow-1) font-bold"
                            : "text-white"
                        } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                      >
                        My Rewards
                      </p>
                    </motion.button>
                  </NavLink>
                </div>

                {isAdmin && (
                  <div className="space-y-4">
                    <NavLink to="/admin">
                      <motion.button
                        onClick={() => setSelectedItem(99)}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                      >
                        <div
                          className={`p-3 rounded-2xl ${
                            selectedItem === 99
                              ? "bg-(--yellow-1)"
                              : "bg-white/15"
                          }`}
                        >
                          <LuShieldCheck className="text-white" size={24} />
                        </div>
                        <p
                          className={`${
                            selectedItem === 99
                              ? "text-(--yellow-1) font-bold"
                              : "text-white"
                          } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                        >
                          Admin Panel
                        </p>
                      </motion.button>
                    </NavLink>
                  </div>
                )}

                <div className="space-y-4">
                  <motion.button
                    onClick={() => setSelectedItem(5)}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        selectedItem === 5 ? "bg-(--yellow-1)" : "bg-white/15"
                      }`}
                    >
                      <IoIosHelpCircleOutline
                        className="text-white"
                        size={24}
                      />
                    </div>

                    <p
                      className={`${
                        selectedItem === 5
                          ? "text-(--yellow-1) font-bold"
                          : "text-white"
                      } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                    >
                      Help
                    </p>
                  </motion.button>
                </div>

                <motion.div
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer border-none bg-transparent outline-none"
                  role="button"
                  tabIndex={0}
                >
                  <div
                    onClick={toggleTheme}
                    className="p-3 rounded-2xl bg-white/15 cursor-pointer"
                  >
                    <ThemeSwitchButton />
                  </div>
                  <p
                    className={`text-white text-base cursor-pointer ${
                      effectiveIsOpen ? "flex" : "hidden"
                    }`}
                  >
                    {theme === "dark" ? "Dark" : "Light"}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="mt-10 items-center">
              <div className="space-y-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                >
                  <div className="p-3 rounded-2xl bg-white/15">
                    <IoIosLogOut className="text-white" size={24} />
                  </div>

                  <p
                    className={`font-medium text-base text-white ${
                      effectiveIsOpen ? "flex" : "hidden"
                    }`}
                  >
                    Logout
                  </p>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
      <AnimatePresence>
        {effectiveIsOpen && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          />
        )}
      </AnimatePresence>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};

export default Sidebar;
