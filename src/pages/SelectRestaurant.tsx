import { MotionContainer, SlideIn, PopIn } from "../components/animations/motion";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { restaurantService, type Restaurant } from "../services/restaurantService";
import { useRestaurant } from "../context/RestaurantContext";

const SelectRestaurant = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurant();
  const isDark = theme === "dark";

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getAllRestaurants();
        setRestaurants(data);
        
        // Use the currently selected restaurant's ID if available, 
        // otherwise default to the first one in the list.
        if (selectedRestaurant?.id) {
          setSelectedId(selectedRestaurant.id);
        } else if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [selectedRestaurant]);

  const handleContinue = () => {
    const restaurant = restaurants.find((r) => r.id === selectedId);
    if (restaurant) {
      setSelectedRestaurant(restaurant);
      navigate("/welcome");
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* <Header title="Food Menu" description="Set Restaurant" /> */}
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

          <div className="mt-6 max-w-[480px] mx-auto flex flex-col gap-6">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-(--purple-2) border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              restaurants.map((restaurant) => (
                <PopIn key={restaurant.id}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedId(restaurant.id)}
                    className={`flex items-center justify-between rounded-2xl p-5 shadow-sm cursor-pointer transition-all ${
                      selectedId === restaurant.id
                        ? "bg-(--purple-2)/5 border-2 border-(--purple-2)"
                        : "bg-white dark:bg-(--neutral-700) border-2 border-transparent"
                    }`}
                  >
                    <p className="flex flex-col gap-3">
                      <span className="font-semibold text-base text-(--neutral-900) dark:text-white">
                        {restaurant.name}
                      </span>
                      <span className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                        {restaurant.location}
                      </span>
                    </p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selectedId === restaurant.id
                          ? "border-(--yellow-1)"
                          : "border-(--yellow-1) dark:border-(--neutral-500)"
                      }`}
                    >
                      {selectedId === restaurant.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-(--yellow-1)" />
                      )}
                    </div>
                  </motion.div>
                </PopIn>
              ))
            )}
          </div>

          <div className="mt-[76px] w-full max-w-[327px] mx-auto">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full px-6 py-4 rounded-2xl bg-(--purple-2) text-white font-semibold text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              disabled={!selectedId || loading}
            >
              Continue
            </motion.button>
          </div>
        </MotionContainer>
      </div>

      <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[1440px] mx-auto hidden md:flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6">
        <div className="space-y-4 text-center">
          <h1 className="font-medium text-[40px] text-(--neutral-800) heading-font dark:text-white">
            Restaurants based on your selected location.
          </h1>
          <p className="text-(--neutral-600) font-medium text-base max-w-[500px] mx-auto dark:text-(--neutral-150)">
            Please enter your location or allow access to your location to find
            all restaurants that are near you
          </p>
        </div>

        <div className="w-full max-w-[480px] mx-auto flex flex-col gap-8 mt-[60px]">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-(--purple-2) border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <PopIn key={restaurant.id}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedId(restaurant.id)}
                  className={`flex items-center justify-between rounded-2xl pr-5 shadow-sm h-[100px] overflow-hidden relative cursor-pointer border-2 transition-all ${
                    selectedId === restaurant.id
                      ? "bg-(--purple-2)/5 border-(--purple-2)"
                      : "bg-white dark:bg-(--neutral-700) border-transparent"
                  }`}
                >
                  <div className="flex items-center h-full gap-4">
                    <div className="relative flex items-center justify-center h-full overflow-hidden shrink-0 ml-[-8px]">
                      <img
                        src={
                          !isDark
                            ? "/images/dark-food-bg.png"
                            : "/images/food-bg.png"
                        }
                        alt=""
                        className="w-[130%] h-[150%] block z-20"
                      />
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="absolute top-1/2 -left-1/28 -translate-y-1/2 w-[55%] rounded-full overflow-hidden object-cover z-10"
                      />
                    </div>
                    <p className="flex flex-col gap-3">
                      <span className="font-semibold text-base text-(--neutral-900) dark:text-white">
                        {restaurant.name}
                      </span>
                      <span className="font-medium text-sm text-(--neutral-500) dark:text-(--neutral-300)">
                        {restaurant.location}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selectedId === restaurant.id
                        ? "border-(--yellow-1)"
                        : "border-(--yellow-1) dark:border-(--neutral-500)"
                    }`}
                  >
                    {selectedId === restaurant.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-(--yellow-1)" />
                    )}
                  </div>
                </motion.div>
              </PopIn>
            ))
          )}
          <div className="mt-[60px] w-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full px-6 py-4 rounded-2xl bg-(--purple-2) text-white font-semibold text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              disabled={!selectedId || loading}
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

