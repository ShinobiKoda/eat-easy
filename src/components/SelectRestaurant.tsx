import { MotionContainer, SlideIn, PopIn } from "./animations/motion";
import { motion } from "motion/react";
import Header from "../components/layout/Header";

const SelectRestaurant = () => {
  const restuarants = [
    {
      name: "Gram Bistro",
      location: "790 8th Ave, New York",
    },
    {
      name: "Bin 71",
      location: "790 8th Ave, New York",
    },
    {
      name: "Sushi Bar",
      location: "790 8th Ave, New York",
    },
  ];

  return (
    <div className="w-full">
      <Header title="Food Menu" description="Set Restaurant" />
      <div className="w-full px-6">
        <MotionContainer className="md:hidden">
          <SlideIn
            direction="down"
            className="w-full text-center max-w-[327px] mx-auto space-y-3.5"
          >
            <h1 className="heading-font font-medium text-[22px] text-(--neutral-800) dark:text-white">
              Share your location with us to order
            </h1>
            <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
              Please enter your location or allow access to your location to
              find all restaurants that are near you{" "}
            </p>
          </SlideIn>

          <div className="mt-6 flex flex-col gap-6">
            {restuarants.map((restaurant, index) => (
              <PopIn key={index} className="">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-md dark:bg-(--neutral-700)"
                >
                  <p className="flex flex-col gap-3">
                    <span className="font-semibold text-base text-(--neutral-900) dark:text-white">
                      {restaurant.name}
                    </span>
                    <span className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                      {restaurant.location}
                    </span>
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="restaurant"
                      className="hidden peer"
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-(--yellow-1) dark:border-(--neutral-500) flex items-center justify-center peer-checked:before:content-[''] peer-checked:before:block before:hidden peer-checked:before:w-2.5 peer-checked:before:h-2.5 peer-checked:before:rounded-full relative peer-checked:border-(--yellow-1) peer-checked:dark:border-(--yellow-1)">
                      <style>{`.peer:checked + span::before{background-color: var(--yellow-1);}`}</style>
                    </span>
                  </label>
                </motion.div>
              </PopIn>
            ))}
          </div>

          <div className="mt-[76px] w-full max-w-[327px] mx-auto">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-2xl bg-(--purple-2) text-white text-semibold text-base"
            >
              Continue
            </motion.button>
          </div>
        </MotionContainer>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center min-h-screen w-full max-w-[900px] mx-auto">
        <div className="space-y-4 text-center px-8">
          <h1 className="font-medium text-[40px] text-(--neutral-800)">
            Restaurants based on your selected location.
          </h1>
          <p className="text-(--neutral-600) font-medium text-base max-w-[500px] mx-auto">
            Please enter your location or allow access to your location to find
            all restaurants that are near you
          </p>
        </div>
        <div className="w-full max-w-[480px] mx-auto flex flex-col gap-8 mt-[60px]">
          {restuarants.map((restaurant, index) => (
            <PopIn key={index} className="">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-md dark:bg-(--neutral-700)"
              >
                <p className="flex flex-col gap-3">
                  <span className="font-semibold text-base text-(--neutral-900) dark:text-white">
                    {restaurant.name}
                  </span>
                  <span className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                    {restaurant.location}
                  </span>
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="restaurant"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-(--yellow-1) dark:border-(--neutral-500) flex items-center justify-center peer-checked:before:content-[''] peer-checked:before:block before:hidden peer-checked:before:w-2.5 peer-checked:before:h-2.5 peer-checked:before:rounded-full relative peer-checked:border-(--yellow-1) peer-checked:dark:border-(--yellow-1)">
                    <style>{`.peer:checked + span::before{background-color: var(--yellow-1);}`}</style>
                  </span>
                </label>
              </motion.div>
            </PopIn>
          ))}
          <div className="mt-[60px] w-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-2xl bg-(--purple-2) text-white text-semibold text-base"
            >
              Continue
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRestaurant;
