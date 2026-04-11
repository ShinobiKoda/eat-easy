import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";

// Food types sourced from the FoodTag union in types.ts — a curated subset users would care about
const foodTypeOptions = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Salad", emoji: "🥗" },
  { name: "Steak", emoji: "🥩" },
  { name: "Chicken", emoji: "🍗" },
  { name: "Seafood", emoji: "🦐" },
  { name: "Soup", emoji: "🍲" },
  { name: "Sandwich", emoji: "🥪" },
  { name: "BBQ", emoji: "🔥" },
  { name: "Vegan", emoji: "🌱" },
  { name: "Spicy", emoji: "🌶️" },
  { name: "Sweet", emoji: "🍬" },
  { name: "Healthy", emoji: "💚" },
  { name: "Comfort Food", emoji: "🫕" },
  { name: "Ice Cream", emoji: "🍦" },
];

const Step4FoodType: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Get all previous step data
  const moods: string[] = location.state?.moods || [];
  const budgetRange: string = location.state?.budgetRange || "any";
  const partySize: string = location.state?.partySize || "solo";

  const toggleType = (name: string) => {
    setSelectedTypes((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name],
    );
  };

  const handleContinue = () => {
    console.debug("[Step4FoodType] Selections:", {
      moods,
      budgetRange,
      partySize,
      foodPreferences: selectedTypes,
    });
    navigate("/generating", {
      state: {
        moods,
        budgetRange,
        partySize,
        foodPreferences: selectedTypes,
      },
    });
  };

  return (
    <div className="w-full min-h-dvh">
      <div>
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          showBack={true}
        />

        <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[900px] mx-auto flex flex-col items-center p-6">
          <div className="flex flex-col items-center text-center mb-[40px]">
            <h1 className="text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-white font-medium mb-2">
              Any food preferences?
            </h1>
            <p className="text-[16px] font-medium text-(--neutral-600) dark:text-(--neutral-150)">
              Select all that sound good (or skip):
            </p>
          </div>

          <div className="gap-3 flex flex-wrap justify-center items-center mb-30 md:mb-20 w-full max-w-[560px]">
            {foodTypeOptions.map((option) => (
              <motion.button
                key={option.name}
                onClick={() => toggleType(option.name)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-2xl px-4 py-2.5 cursor-pointer flex items-center gap-2 border-2 transition-colors duration-200 text-[15px] font-medium ${
                  selectedTypes.includes(option.name)
                    ? "border-(--yellow-1) bg-(--yellow-1) text-white dark:text-(--neutral-800)"
                    : "border-(--neutral-500) text-(--neutral-600) dark:text-(--neutral-150)"
                }`}
              >
                <span>{option.emoji}</span>
                <span>{option.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 text-(--neutral-600) space-y-4 w-full lg:w-xl flex flex-col justify-center items-center">
            <motion.button
              onClick={handleContinue}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl bg-(--purple-2) dark:bg-[#615793] text-white p-4 cursor-pointer w-full md:w-[480px] mx-auto"
            >
              {selectedTypes.length > 0
                ? `Continue with ${selectedTypes.length} preference${selectedTypes.length > 1 ? "s" : ""}`
                : "Skip & Continue"}
            </motion.button>

            <motion.button
              onClick={() => navigate("/welcome")}
              whileTap={{ scale: 0.98 }}
              className="p-4 cursor-pointer w-full md:w-[480px] mx-auto text-(--purple-3) dark:text-[#EBEAF2] rounded-2xl"
            >
              Take me to the menu
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4FoodType;

