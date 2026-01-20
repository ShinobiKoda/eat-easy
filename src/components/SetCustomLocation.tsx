import Navbar from "./layout/Navbar";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { FadeIn, SlideIn, PopIn } from "./animations/motion";
import { TbLocation } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function SetCustomLocation() {
  const navigate = useNavigate();

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
        l.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );
  return (
    <div className="w-full">
      <div
        className="w-full min-h-screen bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/images/set-custom-location-map.svg')",
        }}
      >
        <Navbar />

        <div className="w-full px-4 min-h-screen pt-10 lg:pt-[70px] max-w-[700px] mx-auto">
          <div className="bg-white rounded-[20px] shadow-md p-6 space-y-5 w-full">
            <h1 className="text-center heading-font font-medium text-[22px] text-(--neutral-800) flex items-center justify-center gap-2">
              Set Your Location{" "}
              <span>
                <LiaSearchLocationSolid />
              </span>{" "}
            </h1>

            <div className="px-4 py-3 rounded-2xl border border-(--purple-2) flex items-center justify-between">
              <input
                type="text"
                placeholder="Search for streets, cities, disticts...."
                className="bg-none border-none outline-none w-full mr-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <CiSearch size={24} />
            </div>

            <div className="mt-3 relative">
              {query.trim().length > 0 && (
                <PopIn className="w-full px-4 py-5 rounded-[20px] bg-white dark:bg-(--neutral-700) shadow-md flex flex-col gap-[18px] absolute left-0 max-h-64 overflow-y-auto z-10 suggestions-scroll">
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
                          <p className="items-center gap-1 hidden md:flex">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetCustomLocation;
