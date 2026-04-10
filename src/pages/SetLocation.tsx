import { motion } from "motion/react";
import { MotionContainer, SlideIn, PopIn, FadeIn } from "../components/animations/motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";
import { useLocation } from "../hooks/useLocation";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "../components/layout/Navbar";

const SetLocation = () => {
  const { theme } = useTheme();
  const { getCurrentLocation, isLoading, error } = useLocation();
  const navigate = useNavigate();

  const handleUseCurrentLocation = async () => {
    await getCurrentLocation();
    navigate("/set-restaurant");
  };

  return (
    <div className="w-full h-full">
      <Navbar />
      <MotionContainer className="w-full mt-20 md:hidden">
        <SlideIn direction="down" className="px-6">
          <h1 className="font-medium text-[22px] text-(--neutral-800) text-center heading-font dark:text-white">
            Set your location
          </h1>
        </SlideIn>

        <div className="grid grid-cols-1 gap-6 mt-6 px-6">
          <motion.div
            whileTap={{ scale: 0.99 }}
            onClick={handleUseCurrentLocation}
            className="cursor-pointer"
          >
            <PopIn className="flex flex-col p-5 gap-5 items-center justify-center text-center rounded-2xl shadow-md bg-white dark:bg-(--neutral-700)">
              <motion.div
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-[70px] h-[70px]"
              >
                <img
                  src="/images/qr-code.webp"
                  alt="Location Icon"
                  className="w-full"
                />
              </motion.div>
              <p className="font-semibold text-base text-(--neutral-900) dark:text-white">
                {isLoading
                  ? "Getting your location..."
                  : "Automatically use your current location"}
              </p>
              <p className="font-medium text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                Choose the simple way and automatically detect your current
                location
              </p>
              {isLoading && (
                <AiOutlineLoading3Quarters
                  size={24}
                  className="animate-spin text-(--purple-3)"
                />
              )}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </PopIn>
          </motion.div>
        </div>
      </MotionContainer>

      <MotionContainer className="w-full h-screen flex-col items-center justify-center max-w-[700px] mx-auto hidden md:flex px-6">
        <div className="w-full text-center space-y-4">
          <h1 className="heading-font text-(--neutral-800) font-medium text-[40px] dark:text-white">
            Start the Smart Menu Experience
          </h1>
          <p className="font-medium text-(--neutral-600) text-base dark:text-(--neutral-150)">
            Please enter your location or use your current location and enjoy
            custom experience in any of our restuarants.
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleUseCurrentLocation}
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
