import { useEffect, useState } from "react";

export type ContentStatus = {
    text: string;
    time?: string;
    img: string;
    action?: string;
};

export const OrderStatusSchema = () => {
  const TOTAL_TIME = 2 * 60 * 1000; // 10 mins
  const MID_TIME = 1 * 60 * 1000; // 5 mins

  const status: Record<string, ContentStatus> = {
    start: { text: "Your order will be ready in", time: "10 minutes", action: "Your order is being made. Would you like to order anything else?", img: "/images/thumbsup.svg" },
    mid:   { text: "Your order is", time: "almost ready", action: "Your order is being made. Would you like to order anything else?", img: "/images/almost.svg" },
    end:   { text: "Your order is ready,", time: "enjoy", action: "Pay for your order now", img: "/images/ready.svg" },
  };

  const [currentStatus, setCurrentStatus] = useState<ContentStatus>(status.start);
  const [showRecommend, setShowRecommend] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    let startTime = localStorage.getItem("countdown_start");

    if (!startTime) {
      const now = Date.now();
      localStorage.setItem("countdown_start", now.toString());
      startTime = now.toString();
    }

    const start = parseInt(startTime);

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      if (elapsed == TOTAL_TIME) {
        setCurrentStatus(status.start);
        setShowRecommend(true);
        setShowSubmit(false);
      } else if (elapsed == MID_TIME) {
        setCurrentStatus(status.mid);
      } else {
        setCurrentStatus(status.end);
        setShowSubmit(true);
        setShowRecommend(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { currentStatus, showRecommend, showSubmit };
};
