import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { generateRecommendations } from "../../services/recommendationService";
import { saveRecommendation } from "../../services/recommendationHistoryService";
import { getMenuItems } from "../../services/menuService";
import Header from "../../components/layout/Header";

const statusMessages = [
  "Analyzing your mood...",
  "Checking the kitchen...",
  "Finding perfect dishes...",
  "Matching your preferences...",
  "Almost ready...",
];

const Generating: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [statusIndex, setStatusIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  // Get all preferences from route state
  const moods: string[] = location.state?.moods || [];
  const budgetRange: string = location.state?.budgetRange || "any";
  const partySize: string = location.state?.partySize || "solo";
  const foodPreferences: string[] = location.state?.foodPreferences || [];

  // Cycle through status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate recommendations on mount
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function generate() {
      try {
        console.debug("[Generating] Starting AI recommendation with:", {
          moods,
          budgetRange,
          partySize,
          foodPreferences,
        });

        // Fetch all menu items for context
        const menuItems = await getMenuItems();
        console.debug("[Generating] Loaded", menuItems.length, "menu items");

        // Call Gemini
        const itemIds = await generateRecommendations(
          { moods, budgetRange, partySize, foodPreferences },
          menuItems,
        );

        console.debug("[Generating] AI returned item IDs:", itemIds);

        // Save to Supabase
        await saveRecommendation({
          moods,
          budgetRange,
          partySize,
          foodPreferences,
          itemIds,
        });

        console.debug(
          "[Generating] Recommendation saved, navigating to results",
        );

        // Navigate to results
        navigate("/recommended", {
          replace: true,
          state: { itemIds, fromGeneration: true },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        console.error("[Generating] Error:", err);
        setError(message);
      }
    }

    generate();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Header
        title="Food Menu"
        description="Virtual Assistant"
        showBack={!error}
      />

      <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[1440px] mx-auto flex flex-col items-center p-6">
        {error ? (
          // ─── Error State ───
          <div className="flex flex-col items-center text-center mt-20 space-y-6">
            <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="text-4xl">😞</span>
            </div>
            <h1 className="text-[22px] md:text-[28px] text-(--neutral-800) dark:text-white font-medium">
              Something went wrong
            </h1>
            <p className="text-(--neutral-500) dark:text-(--neutral-300) max-w-md text-base">
              {error}
            </p>
            <div className="flex gap-4 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setError(null);
                  hasStarted.current = false;
                }}
                className="rounded-2xl bg-(--purple-2) text-white px-8 py-3 cursor-pointer font-semibold"
              >
                Try Again
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/step1")}
                className="rounded-2xl border-2 border-(--neutral-300) dark:border-(--neutral-600) px-8 py-3 cursor-pointer font-semibold text-(--neutral-600) dark:text-(--neutral-200)"
              >
                Go Back
              </motion.button>
            </div>
          </div>
        ) : (
          // ─── Loading Animation ───
          <div className="flex flex-col items-center text-center mt-20 space-y-10">
            {/* Pulsing circles animation */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-(--purple-2) dark:border-(--purple-4)"
                  initial={{ scale: 0.6, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
              <motion.div
                className="w-20 h-20 rounded-full bg-linear-to-br from-(--purple-2) to-(--yellow-1) flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-3xl">🤖</span>
              </motion.div>
            </div>

            <div className="space-y-3">
              <h1 className="text-[22px] md:text-[32px] text-(--neutral-800) dark:text-white font-medium">
                Finding your perfect meal
              </h1>
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-(--purple-3) dark:text-(--purple-4) font-semibold text-lg"
              >
                {statusMessages[statusIndex]}
              </motion.p>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-(--purple-2)"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generating;
