import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Angry from "/images/angry-img.png";
import Bored from "/images/bored-img.png";
import Hungry from "/images/hungry-img.png";
import Sick from "/images/sick-img.png";
import Thirsty from "/images/thirsty-img.png";
import Tired from "/images/tired-img.png";
import Header from "../layout/Header";
import Loader from "../Loader";

const Step1: React.FC = () => {
  // allow multiple feelings to be selected; store selected indices
  const [selectedFeelings, setSelectedFeelings] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleFeeling = (index: number) => {
    setSelectedFeelings((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const Feelings = [
    { name: "Thirsty", image: Thirsty },
    { name: "Hungry", image: Hungry },
    { name: "Tired", image: Tired },
    { name: "Angry", image: Angry },
    { name: "Bored", image: Bored },
    { name: "Sick", image: Sick },
    { name: "Energized", image: Thirsty },
    { name: "Happy", image: Thirsty },
    { name: "Other", image: Sick },
  ];

  const [showLoader, setShowLoader] = useState(() => {
    return !sessionStorage.getItem("hasShownLoader_Step1");
  });
  useEffect(() => {
    if (showLoader) {
      const t = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("hasShownLoader_Step1", "true");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [showLoader]);

  const handleContinue = () => {
    const moodNames = selectedFeelings.map((idx) => Feelings[idx].name);
    console.debug("[Step1] Selected moods:", moodNames);
    navigate("/step2-budget", { state: { moods: moodNames } });
  };

  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={` ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[900px] mx-auto flex flex-col items-center p-6">
          <div className="flex flex-col items-center text-center mb-[60px]">
            <h1 className="text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-white font-medium mb-2">
              How are you feeling right now?
            </h1>
            <p className="text-[16px] lg:text-[16px] font-medium text-(--neutral-600) dark:text-(--neutral-150)">
              Select all that applies:
            </p>
          </div>

          <div className="text-[16px] font-700 text-(--neutral-600) dark:text-(--neutral-150) gap-4 max-w-[523px] mx-auto flex flex-wrap justify-center items-center mb-50 md:mb-30">
            {Feelings.map((feeling, idx) => (
              <motion.button
                key={idx}
                onClick={() => toggleFeeling(idx)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-2xl px-3 md:px-4 py-2 cursor-pointer flex items-center gap-2 border border-(--neutral-500) ${selectedFeelings.includes(idx) ? "bg-(--yellow-1) text-white dark:text-(--neutral-800)" : ""}`}
              >
                <img
                  src={feeling.image}
                  className="w-5 h-5 md:w-7 md:h-7"
                  alt=""
                />
                <p>{feeling.name}</p>
              </motion.button>
            ))}
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 text-(--neutral-600) space-y-4 w-full lg:w-xl flex flex-col justify-center items-center">
            <motion.button
              onClick={handleContinue}
              disabled={selectedFeelings.length === 0}
              whileTap={{ scale: selectedFeelings.length > 0 ? 0.98 : 1 }}
              className={`rounded-2xl text-white p-4 cursor-pointer w-full md:w-[480px] mx-auto ${
                selectedFeelings.length > 0
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

export default Step1;
