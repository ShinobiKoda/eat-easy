import { useEffect } from "react";
import { useRestaurant } from "../context/RestaurantContext";


const OrderBatchMonitor: React.FC = () => {
  const { selectedRestaurant, getStorageKey } = useRestaurant();

  useEffect(() => {
    const TOTAL_TIME = 2 * 60 * 1000; // 2 minutes

    const batchesKey = getStorageKey("eat-easy-order-batches");
    const lastOrderKey = getStorageKey("eat-easy-last-order");

    const tick = () => {
      const raw = localStorage.getItem(batchesKey);
      if (!raw) return;

      let batches: any[];
      try {
        batches = JSON.parse(raw);
      } catch {
        return;
      }

      let changed = false;

      // Find the active (preparing) batch
      const prepIdx = batches.findIndex((b: any) => b.status === "preparing");

      if (prepIdx !== -1) {
        const elapsed = Date.now() - batches[prepIdx].timerStart;

        if (elapsed > TOTAL_TIME) {
          // Batch finished — mark as ready
          batches[prepIdx].status = "ready";
          changed = true;

          // Notify the rest of the app (ding + toast)
          window.dispatchEvent(new CustomEvent("order-batch-ready"));

          // Start the next pending batch if any
          const nextPendingIdx = batches.findIndex(
            (b: any) => b.status === "pending",
          );
          if (nextPendingIdx !== -1) {
            batches[nextPendingIdx].status = "preparing";
            batches[nextPendingIdx].timerStart = Date.now();
          }
        }
      } else {
        // No batch currently preparing — start the next pending one
        const nextPendingIdx = batches.findIndex(
          (b: any) => b.status === "pending",
        );
        if (nextPendingIdx !== -1) {
          batches[nextPendingIdx].status = "preparing";
          batches[nextPendingIdx].timerStart = Date.now();
          changed = true;
        }
      }

      if (changed) {
        localStorage.setItem(batchesKey, JSON.stringify(batches));

        // Keep the flattened "last order" in sync for the Checkout page
        const allItems = batches.flatMap((b: any) => b.items);
        const totalSubtotal = batches.reduce(
          (acc: number, b: any) => acc + b.subtotal,
          0,
        );
        const totalTax = batches.reduce(
          (acc: number, b: any) => acc + b.tax,
          0,
        );
        const totalTotal = batches.reduce(
          (acc: number, b: any) => acc + (b.total || 0),
          0,
        );
        const totalQty = batches.reduce(
          (acc: number, b: any) => acc + b.qty,
          0,
        );

        localStorage.setItem(
          lastOrderKey,
          JSON.stringify({
            items: allItems,
            subtotal: totalSubtotal,
            tax: totalTax,
            total: totalTotal,
            qty: totalQty,
          }),
        );
      }
    };

    const interval = setInterval(tick, 1000);
    tick(); // run immediately

    return () => clearInterval(interval);
  }, [getStorageKey, selectedRestaurant?.id]);

  return null; // renders nothing
};

export default OrderBatchMonitor;
