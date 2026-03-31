import { useEffect, useState } from "react";

export type ContentStatus = {
    text: string;
    time?: string;
    img: string;
    action?: string;
};

export const OrderStatusSchema = () => {
  const TOTAL_TIME = 2 * 60 * 1000; // 2 mins
  const MID_TIME = 1 * 60 * 1000; // 1 mins

  const status: Record<string, ContentStatus> = {
    start: { text: "Your order will be ready in", time: "10 minutes", action: "Your order is being made. Would you like to order anything else?", img: "/images/thumbsup.svg" },

    mid:   { text: "Your order is", time: "almost ready", action: "Your order is being made. Would you like to order anything else?", img: "/images/almost.svg" },

    end:   { text: "Your order is ready,", time: "enjoy", action: "Pay for your order now", img: "/images/ready.svg" },
  };

  const [batches, setBatches] = useState<any[]>([]);
  const [currentStatus, setCurrentStatus] = useState<ContentStatus>(status.start);
  const [showRecommend, setShowRecommend] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateLoop = () => {
      const raw = localStorage.getItem("eat-easy-order-batches");
      if (!raw) {
        setBatches([]);
        return;
      }

      let currentBatches = JSON.parse(raw);
      let changed = false;

      // Find the active (preparing) batch
      const prepIdx = currentBatches.findIndex((b: any) => b.status === "preparing");
      
      if (prepIdx !== -1) {
        const activeBatch = currentBatches[prepIdx];
        const elapsed = Date.now() - activeBatch.timerStart;
        const remaining = Math.max(0, Math.floor((TOTAL_TIME - elapsed) / 1000));
        
        setTimeLeft(remaining);

        // Update overall UI state based on the active batch
        if (elapsed <= MID_TIME) {
          setCurrentStatus(status.start);
          setShowRecommend(true);
          setShowSubmit(false);
        } else if (elapsed <= TOTAL_TIME) {
          setCurrentStatus(status.mid);
          setShowRecommend(true);
          setShowSubmit(false);
        } else {
          // Batch finished!
          currentBatches[prepIdx].status = "ready";
          changed = true;

          // Check for next pending batch
          const nextPendingIdx = currentBatches.findIndex((b: any) => b.status === "pending");
          if (nextPendingIdx !== -1) {
            currentBatches[nextPendingIdx].status = "preparing";
            currentBatches[nextPendingIdx].timerStart = Date.now();
          }
        }
      } else {
        // No preparing batch. Look for pending to start one.
        const nextPendingIdx = currentBatches.findIndex((b: any) => b.status === "pending");
        if (nextPendingIdx !== -1) {
          currentBatches[nextPendingIdx].status = "preparing";
          currentBatches[nextPendingIdx].timerStart = Date.now();
          changed = true;
        } else {
          // All done or none at all
          const anyReady = currentBatches.some((b: any) => b.status === "ready");
          if (anyReady) {
            setCurrentStatus(status.end);
            setShowSubmit(true);
            setShowRecommend(false);
            setTimeLeft(0);
          }
        }
      }

      if (changed) {
        localStorage.setItem("eat-easy-order-batches", JSON.stringify(currentBatches));
        // Also update the flattened order for Checkout page
        const allItems = currentBatches.flatMap((b: any) => b.items);
        const totalSubtotal = currentBatches.reduce((acc: number, b: any) => acc + b.subtotal, 0);
        const totalTax = currentBatches.reduce((acc: number, b: any) => acc + b.tax, 0);
        const totalTotal = currentBatches.reduce((acc: number, b: any) => acc + (b.total || 0), 0);
        const totalQty = currentBatches.reduce((acc: number, b: any) => acc + b.qty, 0);

        const combinedOrder = {
          items: allItems,
          subtotal: totalSubtotal,
          tax: totalTax,
          total: totalTotal,
          qty: totalQty
        };
        localStorage.setItem("eat-easy-last-order", JSON.stringify(combinedOrder));
      }

      setBatches(currentBatches);
    };

    const interval = setInterval(updateLoop, 1000);
    updateLoop(); // Initial call

    return () => clearInterval(interval);
  }, []);

  return { currentStatus, showRecommend, showSubmit, timeLeft, batches };
};
