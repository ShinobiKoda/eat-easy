import { MotionContainer, SlideIn, PopIn } from "../animations/motion";
import { motion } from "motion/react";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";


const SelectRestaurant = () => {

  const navigate = useNavigate();


  const restuarants = [
    //add images to restuarnts for desktop
    {
      name: "Gram Bistro",
      location: "790 8th Ave, New York",
      image: "/images/restaurant-location-img.svg",
    },
    {
      name: "Bin 71",
      location: "790 8th Ave, New York",
      image: "/images/restaurant-location-img.svg",
    },
    {
      name: "Sushi Bar",
      location: "790 8th Ave, New York",
      image: "/images/restaurant-location-img.svg",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Header title="Food Menu" description="Set Restaurant" />
      <div className="w-full px-6">
        <MotionContainer className="md:hidden pt-28">
          <SlideIn
            direction="down"
            className="w-full text-center max-w-[387px] mx-auto space-y-3.5"
          >
            <h1 className="heading-font font-medium text-[22px] text-(--neutral-800) dark:text-white">
              Select a restaurant based on your location to order
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

      <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[1440px] mx-auto hidden md:flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6">
        <div className="space-y-4 text-center px-8">
          <h1 className="font-medium text-[40px] text-(--neutral-800) heading-font dark:text-white">
            Restaurants based on your selected location.
          </h1>
          <p className="text-(--neutral-600) font-medium text-base max-w-[500px] mx-auto dark:text-(--neutral-150)">
            Please enter your location or allow access to your location to find
            all restaurants that are near you
          </p>
        </div>

        <div className="w-full max-w-[480px] mx-auto flex flex-col gap-8 mt-[60px]">
          {restuarants.map((restaurant, index) => (
            <PopIn key={index} className="">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between bg-white rounded-2xl pr-5 shadow-md dark:bg-(--neutral-700) h-[100px] overflow-hidden relative"
              >
                <div className="flex items-center h-full">
                  <div className="h-full w-[180px] overflow-hidden rounded-l-2xl absolute -left-16 bottom-0">
                    <img
                      src={restaurant.image}
                      alt="Resturant image"
                      className="h-full w-full object-cover "
                    />
                  </div>
                  <p className="flex flex-col gap-3 ml-[130px]">
                    <span className="font-semibold text-base text-(--neutral-900) dark:text-white">
                      {restaurant.name}
                    </span>
                    <span className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                      {restaurant.location}
                    </span>
                  </p>
                </div>
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
              onClick={() => navigate("/welcome")}
              className="w-full px-6 py-4 rounded-2xl bg-(--purple-2) text-white text-semibold text-base cursor-pointer"
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
