import { useEffect, useState } from "react";
import { getRestaurantStorageKey } from "../context/RestaurantContext";

export type ContentStatus = {
    text: string;
    time?: string;
    img: string;
    action?: string;
};

export const OrderStatusSchema = (restaurantId: string | null = null) => {
  const TOTAL_TIME = 2 * 60 * 1000; 
  const MID_TIME = 1 * 60 * 1000;

  const batchesKey = getRestaurantStorageKey(restaurantId, "eat-easy-order-batches");
  const lastOrderKey = getRestaurantStorageKey(restaurantId, "eat-easy-last-order");

  const status: Record<string, ContentStatus> = {
    start: {
      text: "Your order will be ready in",
      time: "2 minutes",
      action:
        "Your order is being made. Would you like to order anything else?",
      img: "/images/thumbsup.svg",
    },

    mid: {
      text: "Your order is",
      time: "almost ready",
      action:
        "Your order is being made. Would you like to order anything else?",
      img: "/images/almost.svg",
    },

    end: {
      text: "Your order is ready,",
      time: "enjoy",
      action: "Pay for your order now",
      img: "/images/ready.svg",
    },
  };

  const [batches, setBatches] = useState<any[]>([]);
  const [currentStatus, setCurrentStatus] = useState<ContentStatus>(status.start);
  const [showRecommend, setShowRecommend] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);


  useEffect(() => {
    const readState = () => {
      const raw = localStorage.getItem(batchesKey);
      if (!raw) {
        setBatches([]);
        return;
      }

      let currentBatches: any[];
      try {
        currentBatches = JSON.parse(raw);
      } catch {
        setBatches([]);
        return;
      }

      // Find the active (preparing) batch
      const prepIdx = currentBatches.findIndex((b: any) => b.status === "preparing");

      if (prepIdx !== -1) {
        const activeBatch = currentBatches[prepIdx];
        const elapsed = Date.now() - activeBatch.timerStart;
        const remaining = Math.max(0, Math.floor((TOTAL_TIME - elapsed) / 1000));

        setTimeLeft(remaining);

        if (elapsed <= MID_TIME) {
          setCurrentStatus(status.start);
          setShowRecommend(true);
          setShowSubmit(false);
        } else if (elapsed <= TOTAL_TIME) {
          setCurrentStatus(status.mid);
          setShowRecommend(true);
          setShowSubmit(false);
        }
      } else {
        // No preparing batch — check if everything is done
        const anyPending = currentBatches.some((b: any) => b.status === "pending");
        const anyReady = currentBatches.some((b: any) => b.status === "ready");

        if (!anyPending && anyReady) {
          setCurrentStatus(status.end);
          setShowSubmit(true);
          setShowRecommend(false);
          setTimeLeft(0);
        }
      }

      setBatches(currentBatches);
    };

    const interval = setInterval(readState, 1000);
    readState(); // Initial call

    return () => clearInterval(interval);
  }, [batchesKey, lastOrderKey]);

  return { currentStatus, showRecommend, showSubmit, timeLeft, batches };
};

