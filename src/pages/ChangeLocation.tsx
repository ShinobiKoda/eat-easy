import React, { useState } from "react";
import Header from "../components/layout/Header";
import SEO from "../components/SEO";
import {
  MotionContainer,
  FadeIn,
  PopIn,
} from "../components/animations/motion";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  HiOutlineLocationMarker,
  HiOutlineCheck,
} from "react-icons/hi";
import { MdOutlineMyLocation, MdOutlineEditLocation } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

/* ─── Predefined suggestions (for manual entry) ─── */
const suggestions = [
  "790 8th Ave, New York, NY",
  "5th Avenue & W 34th St, New York, NY",
  "Union Square, 14th St, New York, NY",
  "Times Square, W 42nd St, New York, NY",
  "Brooklyn Bridge Blvd, Brooklyn, NY",
  "Queens Blvd, Queens, NY",
];

const ChangeLocation: React.FC = () => {
  const { location, getCurrentLocation, setManualLocation, isLoading, error } =
    useLocation();
  const navigate = useNavigate();
  const [showManual, setShowManual] = useState(false);
  const [query, setQuery] = useState("");
  const [justUpdated, setJustUpdated] = useState(false);

  const filteredSuggestions = query.trim()
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const handleAutoDetect = async () => {
    await getCurrentLocation();
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 2500);
  };

  const handleSelectAddress = (address: string) => {
    setManualLocation(address);
    setQuery("");
    setShowManual(false);
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 2500);
  };

  const handleManualSubmit = () => {
    if (query.trim()) {
      handleSelectAddress(query.trim());
    }
  };

  return (
    <div className="w-full min-h-screen">
      <SEO
        title="Change Location | EatEasy"
        description="Update your delivery location for EatEasy."
      />

      <MotionContainer className="transition-all duration-300">
        <Header
          title="Settings"
          description="Your Location"
          navbarTitle="Location"
          showBack={true}
        />

        <div className="w-full pt-18 md:pt-30 pb-12 max-w-[1440px] mx-auto">
          <div className="px-6 lg:px-[42px] space-y-6">
            {/* ── Current Location Card ── */}
            <PopIn>
              <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <IoLocationOutline
                    size={20}
                    className="text-(--purple-2)"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-(--neutral-500) dark:text-(--neutral-300)">
                    Current Location
                  </span>
                </div>

                {location?.address ? (
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-(--purple-2)/10 flex items-center justify-center shrink-0 mt-0.5">
                      <HiOutlineLocationMarker
                        size={22}
                        className="text-(--purple-2)"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base text-(--neutral-800) dark:text-white leading-snug">
                        {location.address}
                      </p>
                      <p className="text-xs font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-1">
                        {location.latitude !== 0 && location.longitude !== 0
                          ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                          : "Manual address"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center shrink-0">
                      <HiOutlineLocationMarker
                        size={22}
                        className="text-(--neutral-400)"
                      />
                    </div>
                    <p className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-400)">
                      No location set yet. Use one of the options below to set
                      your delivery address.
                    </p>
                  </div>
                )}

                {/* Success indicator */}
                <AnimatePresence>
                  {justUpdated && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50"
                    >
                      <HiOutlineCheck
                        size={18}
                        className="text-green-600 dark:text-green-400"
                      />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Location updated successfully
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error display */}
                {error && (
                  <div className="mt-4 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </PopIn>

            {/* ── Action Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Auto-detect */}
              <FadeIn>
                <motion.button
                  onClick={handleAutoDetect}
                  disabled={isLoading}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 24,
                  }}
                  className="w-full bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm text-left cursor-pointer disabled:opacity-60 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-(--purple-2) flex items-center justify-center mb-4">
                    {isLoading ? (
                      <AiOutlineLoading3Quarters
                        size={22}
                        className="animate-spin text-white"
                      />
                    ) : (
                      <MdOutlineMyLocation size={22} className="text-white" />
                    )}
                  </div>
                  <h3 className="font-bold text-base text-(--neutral-800) dark:text-white mb-1">
                    {isLoading ? "Detecting..." : "Use Current Location"}
                  </h3>
                  <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-300) leading-relaxed">
                    Automatically detect your location using GPS.
                  </p>
                </motion.button>
              </FadeIn>

              {/* Enter manually */}
              <FadeIn>
                <motion.button
                  onClick={() => setShowManual(!showManual)}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 24,
                  }}
                  className={`w-full rounded-2xl p-6 shadow-sm text-left cursor-pointer transition-shadow duration-200 hover:shadow-md ${
                    showManual
                      ? "bg-(--purple-2) ring-2 ring-(--purple-2)/30"
                      : "bg-white dark:bg-(--neutral-700)"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      showManual
                        ? "bg-white/15"
                        : "bg-(--orange-1)/10"
                    }`}
                  >
                    <MdOutlineEditLocation
                      size={22}
                      className={showManual ? "text-white" : "text-(--orange-1)"}
                    />
                  </div>
                  <h3
                    className={`font-bold text-base mb-1 ${
                      showManual
                        ? "text-white"
                        : "text-(--neutral-800) dark:text-white"
                    }`}
                  >
                    Enter Manually
                  </h3>
                  <p
                    className={`text-sm font-medium leading-relaxed ${
                      showManual
                        ? "text-white/60"
                        : "text-(--neutral-500) dark:text-(--neutral-300)"
                    }`}
                  >
                    Search for an address or type one in.
                  </p>
                </motion.button>
              </FadeIn>
            </div>

            {/* ── Manual Entry Panel ── */}
            <AnimatePresence>
              {showManual && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm space-y-4">
                    {/* Search input */}
                    <div className="relative">
                      <FiSearch
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--neutral-400)"
                      />
                      <input
                        type="text"
                        placeholder="Search for an address..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleManualSubmit();
                        }}
                        className="w-full bg-(--neutral-100) dark:bg-(--neutral-600) rounded-xl py-3.5 pl-11 pr-20 outline-none text-sm font-medium text-(--neutral-800) dark:text-white border border-transparent focus:border-(--purple-2) placeholder:text-(--neutral-400) dark:placeholder:text-(--neutral-500) transition-colors"
                        autoFocus
                      />
                      {query.trim() && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={handleManualSubmit}
                          whileTap={{ scale: 0.95 }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-(--purple-2) text-white px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Set
                        </motion.button>
                      )}
                    </div>

                    {/* Suggestions */}
                    <AnimatePresence>
                      {filteredSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-1 max-h-56 overflow-y-auto scrollbar-hidden"
                        >
                          {filteredSuggestions.map((address, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleSelectAddress(address)}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600) cursor-pointer transition-colors text-left"
                            >
                              <HiOutlineLocationMarker
                                size={18}
                                className="text-(--neutral-400) shrink-0"
                              />
                              <span className="text-sm font-medium text-(--neutral-700) dark:text-(--neutral-200)">
                                {address}
                              </span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* No results */}
                    {query.trim() && filteredSuggestions.length === 0 && (
                      <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) text-center py-2">
                        No suggestions found. Press <strong>Set</strong> or{" "}
                        <strong>Enter</strong> to use this address.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Change Restaurant Link ── */}
            <FadeIn>
              <motion.button
                onClick={() => navigate("/set-restaurant")}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm flex items-center gap-4 cursor-pointer transition-shadow duration-200 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-(--yellow-1)/10 flex items-center justify-center shrink-0">
                  <IoLocationOutline
                    size={20}
                    className="text-(--yellow-1)"
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[14px] text-(--neutral-800) dark:text-white">
                    Change Restaurant
                  </p>
                  <p className="text-xs font-medium text-(--neutral-500) dark:text-(--neutral-400)">
                    Switch to a different restaurant near you
                  </p>
                </div>
              </motion.button>
            </FadeIn>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default ChangeLocation;
