import { useEffect, useState } from "react";
import { hasRecommendations } from "../../services/recommendationHistoryService";
import Virtual from "./Virtual";
import Recommend from "./Recommend";
import Header from "../layout/Header";
import SEO from "../SEO";

const SmartAssistant: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hasPastRecs, setHasPastRecs] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const result = await hasRecommendations();
        console.debug("[SmartAssistant] Has past recommendations:", result);
        setHasPastRecs(result);
      } catch (err) {
        console.error("[SmartAssistant] Error checking recommendations:", err);
        setHasPastRecs(false);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <SEO
        title="Virtual Assistant | EatEasy"
        description="Let our smart virtual assistant help you find the perfect dish."
      />
      <div>
        <Header
          title="Food Menu"
          description="Virtual Assistant"
          showBack={true}
        />
        {loading ? (
          <div className="pt-20 md:py-30 lg:pt-30 lg:pb-20 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6">
            <div className="flex flex-col items-center text-center max-w-xl mb-20 md:mb-10 w-full mt-[5vh] lg:mt-[10vh]">
              <h1 className="text-[22px] md:text-[32px] lg:text-[40px] text-(--neutral-800) dark:text-[#FFFFFF] font-medium mb-2">
                It seems like we already know <br /> each other 🤝
              </h1>
              <p className="text-[16px] lg:text-[16px] font-medium text-(--neutral-800) dark:text-(--neutral-150) max-w-[520px]">
                You can use the recommendations configured during your last visit
                to our restaurant or you can have new ones.
              </p>
            </div>
            
            <div className="gap-6 flex flex-col items-center mb-50 md:mb-20 w-full sm:w-[480px]">
               <div className="h-[84px] w-full bg-white dark:bg-(--neutral-700) rounded-2xl animate-pulse shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
               <div className="h-[84px] w-full bg-white dark:bg-(--neutral-700) rounded-2xl animate-pulse shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
            </div>
          </div>
        ) : hasPastRecs ? (
          <Recommend hideHeader />
        ) : (
          <Virtual hideHeader />
        )}
      </div>
    </div>
  );
};

export default SmartAssistant;
