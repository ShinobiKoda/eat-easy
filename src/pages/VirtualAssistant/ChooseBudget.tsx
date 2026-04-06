import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";

const budgetOptions = [
  {
    id: "budget",
    label: "Budget Friendly",
    description: "Under $12",
    emoji: "💰",
  },
  {
    id: "moderate",
    label: "Moderate",
    description: "$12 – $25",
    emoji: "💵",
  },
  {
    id: "premium",
    label: "Premium",
    description: "Over $25",
    emoji: "💎",
  },
  {
    id: "any",
    label: "No Preference",
    description: "Show me everything",
    emoji: "🍽️",
  },
];

const Step2Budget: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  // Get moods from previous step
  const moods: string[] = location.state?.moods || [];

  const handleContinue = () => {
    if (!selectedBudget) return;
    console.debug(
      "[Step2Budget] Selected budget:",
      selectedBudget,
      "Moods:",
      moods,
    );
    navigate("/step3-party", {
      state: { moods, budgetRange: selectedBudget },
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div>
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          showBack={true}
        />

        <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[900px] mx-auto flex flex-col items-center p-6">
          <div className="flex flex-col items-center text-center mb-[60px]">
            <h1 className="text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-white font-medium mb-2">
              What's your budget range?
            </h1>
            <p className="text-[16px] font-medium text-(--neutral-600) dark:text-(--neutral-150)">
              Pick one that fits your appetite:
            </p>
          </div>

          <div className="gap-4 flex flex-col items-center mb-50 md:mb-30 w-full max-w-[480px]">
            {budgetOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedBudget(option.id)}
                whileTap={{ scale: 0.97 }}
                className={`rounded-2xl px-6 py-5 cursor-pointer w-full flex items-center gap-4 border-2 transition-colors duration-200 ${
                  selectedBudget === option.id
                    ? "border-(--yellow-1) bg-(--yellow-1)/10 dark:bg-(--yellow-1)/15"
                    : "border-(--neutral-150) dark:border-(--neutral-600) bg-white dark:bg-(--neutral-700)"
                } shadow-[0_4px_12px_rgba(0,0,0,0.06)]`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <div className="text-left">
                  <p
                    className={`text-[16px] font-semibold ${
                      selectedBudget === option.id
                        ? "text-(--yellow-2)"
                        : "text-(--neutral-800) dark:text-white"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="text-[13px] font-medium text-(--neutral-500) dark:text-(--neutral-300)">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 text-(--neutral-600) space-y-4 w-full lg:w-xl flex flex-col justify-center items-center">
            <motion.button
              onClick={handleContinue}
              disabled={!selectedBudget}
              whileTap={{ scale: selectedBudget ? 0.98 : 1 }}
              className={`rounded-2xl text-white p-4 cursor-pointer w-full md:w-[480px] mx-auto transition-opacity ${
                selectedBudget
                  ? "bg-(--purple-2) dark:bg-[#615793]"
                  : "bg-(--neutral-400) cursor-not-allowed opacity-50"
              }`}
            >
              Continue
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

export default Step2Budget;
