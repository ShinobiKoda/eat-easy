import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Header from "../layout/Header";
import {
  getLatestRecommendation,
  type Recommendation,
} from "../../services/recommendationHistoryService";

const Recommend: React.FC = () => {
  const navigate = useNavigate();
  const [lastRec, setLastRec] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastRec() {
      try {
        console.debug("[Recommend] Fetching latest recommendation...");
        const rec = await getLatestRecommendation();
        setLastRec(rec);
        console.debug("[Recommend] Latest rec:", rec?.id || "none");
      } catch (err) {
        console.error("[Recommend] Error fetching recommendation:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLastRec();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div>
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className="pt-20 md:py-30 lg:pt-50 lg:pb-20 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6">
          <div className="flex flex-col items-center text-center max-w-xl mb-20 md:mb-10">
            <h1 className="text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-[#FFFFFF] font-medium mb-2">
              It seems like we already know <br /> each other 🤝
            </h1>
            <p className="text-[16px] lg:text-[16px] font-medium text-(--neutral-800) dark:text-(--neutral-150) max-w-[520px]">
              You can use the recommendations configured during your last visit
              to our restaurant or you can have new ones.
            </p>
          </div>

          <div className="gap-6 flex flex-col items-center mb-50 md:mb-20 w-full sm:w-[480px]">
            {/* New recommendation card */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/step1")}
              className="bg-white dark:bg-(--neutral-700) rounded-2xl w-full mx-auto p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center cursor-pointer"
            >
              <p className="text-[14px] lg:text-[18px] text-(--neutral-900) dark:text-white font-semibold">
                New recommendation
              </p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 cursor-pointer"
              >
                <FaArrowRight size={20} className="text-(--yellow-1)" />
              </motion.button>
            </motion.div>

            {/* Last recommendation card */}
            {loading ? (
              <div className="bg-white dark:bg-(--neutral-700) rounded-2xl w-full mx-auto p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] animate-pulse">
                <div className="h-5 w-48 bg-(--neutral-150) dark:bg-(--neutral-600) rounded mb-3" />
                <div className="h-4 w-32 bg-(--neutral-150) dark:bg-(--neutral-600) rounded" />
              </div>
            ) : lastRec ? (
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  navigate("/recommended", {
                    state: { itemIds: lastRec.item_ids, fromGeneration: false },
                  })
                }
                className="bg-white dark:bg-(--neutral-700) rounded-2xl w-full mx-auto p-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] flex justify-between items-center cursor-pointer"
              >
                <div className="space-y-3">
                  <p className="text-[14px] lg:text-[18px] text-(--neutral-900) dark:text-white font-semibold">
                    Your last recommendation
                  </p>
                  <div className="flex gap-2 items-center text-(--neutral-500) dark:text-(--neutral-300)">
                    <span>
                      <SlCalender className="w-7 text-(--yellow-1) dark:text-white" />
                    </span>
                    {formatDate(lastRec.created_at)}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 cursor-pointer"
                >
                  <FaArrowRight size={20} className="text-(--yellow-1)" />
                </motion.button>
              </motion.div>
            ) : null}
          </div>

          <div className="text-[16px] lg:text-[20px] font-600 space-y-4 w-full lg:w-xl flex flex-col items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/step1")}
              className="rounded-2xl text-white bg-(--purple-2) dark:bg-[#615793] p-4 cursor-pointer w-full md:w-[480px] mx-auto"
            >
              Start New Recommendation
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
