import { motion } from "motion/react";
import { MotionContainer, SlideIn, PopIn, FadeIn } from "./animations/motion";
import { CiSearch } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";
import { TbLocation } from "react-icons/tb";
import { useMemo, useState } from "react";
import Header from "./layout/Header";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const cards = [
    {
      image: "/images/qr-code.svg",
      heading: "Scan QR Code",
      description: "Choose the simple way, scan your QR Code from our table",
    },
    {
      image: "/images/location.svg",
      heading: "Select location manually",
      description:
        "If you prefer to add your location manually, here is your option",
    },
  ];

  const [query, setQuery] = useState("");
  const allLocations = [
    { name: "790 8th Ave, New York, NY", distance: "0.4 km" },
    { name: "5th Avenue & W 34th St, New York, NY", distance: "1.2 km" },
    { name: "Union Square, 14th St, New York, NY", distance: "2.1 km" },
    { name: "Union Square, 14th St, New York, NY", distance: "2.1 km" },
    { name: "Union Square, 14th St, New York, NY", distance: "2.1 km" },
    { name: "Union Square, 14th St, New York, NY", distance: "2.1 km" },
    { name: "Times Square, W 42nd St, New York, NY", distance: "0.9 km" },
    { name: "Brooklyn Bridge Blvd, Brooklyn, NY", distance: "5.4 km" },
    { name: "Queens Blvd, Queens, NY", distance: "8.7 km" },
    { name: "Queens Blvd, Queens, NY", distance: "8.7 km" },
  ];
  const locationList = useMemo(
    () =>
      allLocations.filter((l) =>
        l.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  return (
    <div className="w-full h-full">
      <Header />
      <MotionContainer className="w-full lg:hidden">
        <SlideIn direction="down" className="px-6">
          <h1 className="font-medium text-[22px] text-(--neutral-800) text-center heading-font dark:text-white">
            Set your locations
          </h1>
        </SlideIn>

        <div className="grid grid-cols-1 gap-6 mt-6 px-6">
          {cards.map((card, index) => (
            <motion.div whileTap={{ scale: 0.99 }} key={index}>
              <PopIn className="flex flex-col p-5 gap-5 items-center justify-center text-center rounded-2xl shadow-md">
                <motion.div
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-[70px] h-[70px]"
                >
                  <img src={card.image} alt="Card Image" className="w-full" />
                </motion.div>
                <p className="font-semibold text-base text-(--neutral-900) dark:text-white">
                  {card.heading}
                </p>
                <p className="font-medium text-sm text-(--neutral-600) dark:text-(--neutral-300)">
                  {card.description}
                </p>
              </PopIn>
            </motion.div>
          ))}
        </div>
      </MotionContainer>

      <MotionContainer className="w-full h-screen flex-col items-center justify-center max-w-[700px] mx-auto hidden lg:flex px-6">
        <SlideIn direction="down" className="w-full text-center space-y-4">
          <h1 className="heading-font text-(--neutral-800) font-medium text-[40px] dark:text-white">
            Start the Smart Menu Experience
          </h1>
          <p className="font-medium text-(--neutral-600) text-base dark:text-(--neutral-150)">
            Please enter your location or use your current location and enjoy
            custom experience in any of our restuarants.
          </p>
        </SlideIn>

        <PopIn className="w-full mt-[42px] bg-white dark:bg-(--neutral-700) p-6 rounded-[20px] space-y-5">
          <FadeIn className="w-full relative">
            <div className="w-full flex items-center justify-center px-4 py-3 rounded-2xl border border-(--neutral-150) bg-transparent dark:border-(--neutral-600)">
              <input
                type="text"
                className="outline-none border-none w-full placeholder:text-(--neutral-500) text-(--neutral-500) dark:placeholder:text-(--neutral-200) dark:text-(--neutral-200)"
                placeholder="Search for streets, districts, cities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <CiSearch
                size={20}
                className="text-(--neutral-300) cursor-pointer"
              />
            </div>
            {query.trim().length > 0 && (
              <PopIn className="w-full px-4 py-5 rounded-[20px] bg-white dark:bg-(--neutral-700) shadow-md flex flex-col gap-[18px] absolute top-16 left-0 max-h-64 overflow-y-auto z-10 suggestions-scroll">
                {locationList.length === 0 ? (
                  <FadeIn>
                    <p className="text-(--neutral-600) text-sm">
                      No locations match "{query}"
                    </p>
                  </FadeIn>
                ) : (
                  locationList.map((location, index) => (
                    <SlideIn key={index} direction="up" className="w-full">
                      <motion.button
                        onClick={() => navigate("/set-restaurant")}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between w-full text-left cursor-pointer rounded-lg px-3 py-2 hover:bg-(--neutral-150) dark:hover:bg-(--neutral-600)"
                      >
                        <p className="font-medium text-sm text-(--neutral-700) dark:text-(--neutral-100)">
                          {location.name}
                        </p>
                        <p className="flex items-center gap-1">
                          <TbLocation
                            size={16}
                            className="text-(--neutral-300) dark:text-(--neutral-500)"
                          />
                          <span className="text-(--neutral-500) dark:text-(--neutral-300) font-medium text-sm">
                            {location.distance}
                          </span>
                          <span className="text-(--neutral-500) dark:text-(--neutral-300) font-medium text-sm">
                            away
                          </span>
                        </p>
                      </motion.button>
                    </SlideIn>
                  ))
                )}
              </PopIn>
            )}
          </FadeIn>

          <FadeIn>
            <div
              className="w-full border-[1.5px] border-(--neutral-150) dark:border-(--neutral-600) h-[212px] rounded-2xl bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  theme === "dark"
                    ? "url('/images/dark-map.svg')"
                    : "url('/images/Map.svg')",
              }}
            ></div>
          </FadeIn>

          <div className=" w-full flex items-center gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-px text-(--purple-3) cursor-pointer dark:text-(--purple-5)"
            >
              <HiOutlineLocationMarker size={20} />
              <span className="font-semibold text-base">
                Use my current location
              </span>
            </motion.button>
            <div className="border border-(--neutral-200) h-full w-4 dark:border-(--neutral-400) rotate-90"></div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-px text-(--purple-3) cursor-pointer dark:text-(--purple-5)"
            >
              <HiOutlineLocationMarker size={20} />
              <span className="font-semibold text-base">
                Set my location on the map
              </span>
            </motion.button>
          </div>
        </PopIn>
      </MotionContainer>
    </div>
  );
};

export default SetLocation;
