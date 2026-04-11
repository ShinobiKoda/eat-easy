import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MotionContainer,
  SlideIn,
  PopIn,
  FadeIn,
} from "../components/animations/motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMyLocation } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";
import { useLocation } from "../hooks/useLocation";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SetLocation = () => {
  const { theme } = useTheme();
  const { getCurrentLocation, isLoading, error } = useLocation();
  const navigate = useNavigate();
  const [denied, setDenied] = useState(false);




  const handleDetectAndNavigate = async () => {
    setDenied(false);

    // Check permission state first if the API is available
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        if (status.state === "denied") {
          setDenied(true);
          return;
        }
      } catch {
        // permissions API not supported, proceed anyway
      }
    }

    await getCurrentLocation();

    // Small delay to let state settle, then check
    await new Promise((r) => setTimeout(r, 100));

    // Re-check permission after the attempt
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        if (status.state === "denied") {
          setDenied(true);
          return;
        }
      } catch {
        // ignore
      }
    }

    // If we got here without denial, navigate
    navigate("/set-restaurant");
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* ── Permission Denied Overlay ── */}
      <AnimatePresence>
        {denied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-(--neutral-700) rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-5">
                <IoShieldCheckmarkOutline
                  size={32}
                  className="text-red-500 dark:text-red-400"
                />
              </div>

              <h2 className="heading-font font-bold text-[20px] text-(--neutral-800) dark:text-white mb-2">
                Location Access Required
              </h2>
              <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-300) leading-relaxed mb-6">
                EatEasy needs access to your location to find restaurants near
                you. Please enable location permissions in your browser settings
                and try again.
              </p>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDetectAndNavigate}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-(--purple-2) text-white font-semibold text-sm cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <AiOutlineLoading3Quarters
                        size={16}
                        className="animate-spin"
                      />
                      Checking...
                    </span>
                  ) : (
                    "Try Again"
                  )}
                </motion.button>

                <Link
                  to="/set-custom-location"
                  className="block no-underline"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-2xl bg-(--neutral-100) dark:bg-(--neutral-600) text-(--neutral-800) dark:text-white font-semibold text-sm cursor-pointer"
                  >
                    Enter Location Manually
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile View ── */}
      <MotionContainer className="w-full pt-60 pb-10 px-6 md:hidden">
        <div className="flex flex-col items-center text-center">
          <PopIn>
            <div className="w-20 h-20 rounded-2xl bg-(--purple-2)/10 flex items-center justify-center mb-6">
              <HiOutlineLocationMarker
                size={36}
                className="text-(--purple-2)"
              />
            </div>
          </PopIn>

          <SlideIn direction="down">
            <h1 className="heading-font font-bold text-[24px] text-(--neutral-800) dark:text-white leading-tight mb-2">
              Set your location
            </h1>
          </SlideIn>

          <FadeIn>
            <p className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300) max-w-xs mb-8 leading-relaxed">
              We need your location to find the best restaurants near you and
              deliver your food.
            </p>
          </FadeIn>

          <div className="w-full space-y-3">
            {/* Auto-detect CTA */}
            <FadeIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDetectAndNavigate}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-(--purple-2) text-white font-semibold text-base cursor-pointer disabled:opacity-60 shadow-lg shadow-(--purple-2)/20"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <MdOutlineMyLocation size={20} />
                )}
                {isLoading
                  ? "Getting your location..."
                  : "Use my current location"}
              </motion.button>
            </FadeIn>

            {/* Manual entry */}
            <FadeIn>
              <Link to="/set-custom-location" className="block no-underline">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white dark:bg-(--neutral-700) text-(--neutral-800) dark:text-white font-semibold text-base cursor-pointer border border-(--neutral-200) dark:border-(--neutral-600)"
                >
                  <HiOutlineLocationMarker size={20} />
                  Enter location manually
                </motion.button>
              </Link>
            </FadeIn>
          </div>

          {error && !denied && (
            <FadeIn>
              <div className="mt-4 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 w-full">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </MotionContainer>

      <MotionContainer className="w-full h-dvh flex-col items-center justify-center max-w-[700px] mx-auto hidden md:flex px-6">
        <div className="w-full text-center space-y-4">
          <h1 className="heading-font text-(--neutral-800) font-medium text-[40px] dark:text-white">
            Start the Smart Menu Experience
          </h1>
          <p className="font-medium text-(--neutral-600) text-base dark:text-(--neutral-150)">
            Please enter your location or use your current location and enjoy
            custom experience in any of our restaurants.
          </p>
        </div>

        <PopIn className="w-full mt-[42px] bg-white dark:bg-(--neutral-700) p-6 rounded-[20px] space-y-5">
          <FadeIn>
            <div
              className="w-full border-[1.5px] border-(--neutral-150) dark:border-(--neutral-600) h-[212px] rounded-2xl bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  theme === "dark"
                    ? "url('/images/dark-map.webp')"
                    : "url('/images/Map.webp')",
              }}
            ></div>
          </FadeIn>

          <div className="w-full flex flex-col items-center gap-4 justify-center">
            {error && !denied && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleDetectAndNavigate}
                disabled={isLoading}
                className="flex items-center gap-1 text-(--purple-3) cursor-pointer dark:text-(--purple-5) disabled:opacity-50"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <HiOutlineLocationMarker size={20} />
                )}
                <span className="font-semibold text-base">
                  {isLoading
                    ? "Getting location..."
                    : "Use my current location"}
                </span>
              </motion.button>
              <div className="border border-(--neutral-200) h-full w-4 dark:border-(--neutral-400) rotate-90"></div>
              <Link to="/set-custom-location">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1 text-(--purple-3) cursor-pointer dark:text-(--purple-5)"
                >
                  <HiOutlineLocationMarker size={20} />
                  <span className="font-semibold text-base">
                    Set my location on the map
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </PopIn>
      </MotionContainer>
    </div>
  );
};

export default SetLocation;

