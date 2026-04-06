import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";

const partyOptions = [
  { id: "solo", label: "Just Me", emoji: "🧑", description: "Table for one" },
  {
    id: "partner",
    label: "With a Partner",
    emoji: "👫",
    description: "Dinner for two",
  },
  {
    id: "family",
    label: "Family",
    emoji: "👨‍👩‍👧‍👦",
    description: "3 – 4 people",
  },
  {
    id: "group",
    label: "Group",
    emoji: "🎉",
    description: "5+ people",
  },
];

const Step3Party: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  // Get previous step data
  const moods: string[] = location.state?.moods || [];
  const budgetRange: string = location.state?.budgetRange || "any";

  const handleContinue = () => {
    if (!selectedParty) return;
    console.debug(
      "[Step3Party] Selected:",
      selectedParty,
      "Budget:",
      budgetRange,
      "Moods:",
      moods,
    );
    navigate("/step4-food-type", {
      state: { moods, budgetRange, partySize: selectedParty },
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
              Who are you dining with?
            </h1>
            <p className="text-[16px] font-medium text-(--neutral-600) dark:text-(--neutral-150)">
              This helps us recommend the right portions:
            </p>
          </div>

          <div className="gap-4 grid grid-cols-2 mb-50 md:mb-30 w-full max-w-[480px]">
            {partyOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedParty(option.id)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-2xl px-4 py-6 cursor-pointer flex flex-col items-center gap-2 border-2 transition-colors duration-200 ${
                  selectedParty === option.id
                    ? "border-(--yellow-1) bg-(--yellow-1)/10 dark:bg-(--yellow-1)/15"
                    : "border-(--neutral-150) dark:border-(--neutral-600) bg-white dark:bg-(--neutral-700)"
                } shadow-[0_4px_12px_rgba(0,0,0,0.06)]`}
              >
                <span className="text-4xl">{option.emoji}</span>
                <p
                  className={`text-[15px] font-semibold ${
                    selectedParty === option.id
                      ? "text-(--yellow-2)"
                      : "text-(--neutral-800) dark:text-white"
                  }`}
                >
                  {option.label}
                </p>
                <p className="text-[12px] font-medium text-(--neutral-500) dark:text-(--neutral-300)">
                  {option.description}
                </p>
              </motion.button>
            ))}
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 text-(--neutral-600) space-y-4 w-full lg:w-xl flex flex-col justify-center items-center">
            <motion.button
              onClick={handleContinue}
              disabled={!selectedParty}
              whileTap={{ scale: selectedParty ? 0.98 : 1 }}
              className={`rounded-2xl text-white p-4 cursor-pointer w-full md:w-[480px] mx-auto transition-opacity ${
                selectedParty
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

export default Step3Party;
