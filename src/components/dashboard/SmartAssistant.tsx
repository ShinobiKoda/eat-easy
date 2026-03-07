import { useEffect, useState } from "react";
import { hasRecommendations } from "../../services/recommendationHistoryService";
import Virtual from "./Virtual";
import Recommend from "./Recommend";

/**
 * Smart wrapper that shows Virtual (intro) for new users
 * and Recommend (returning) for users with past recommendations.
 */
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

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-(--purple-2) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return hasPastRecs ? <Recommend /> : <Virtual />;
};

export default SmartAssistant;
