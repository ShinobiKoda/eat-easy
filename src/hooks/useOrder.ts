
import { useState, useEffect } from "react";
import type { PropType } from "../types";
import { useNavigate } from "react-router-dom";

export function useOrder() {
  const [selectedItem, setSelectedItem] = useState<PropType | null>(null);
  const [orderItems, setOrderItems] = useState<PropType[]>(() => {
    try {
      const saved = localStorage.getItem("eat-easy-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOrder, setShowOrder] = useState(false);
  const navigate = useNavigate();

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("eat-easy-cart", JSON.stringify(orderItems));
  }, [orderItems]);



  // Add a dish to order
  const addToOrder = (order: PropType) => {
    setOrderItems((prev) => [...prev, order]);
    setShowOrder(true);
  };

  // Remove a dish from the order
  const removeOrder = (order: PropType) => {
    setOrderItems((prev) => {
      const next = prev.filter((o) => o !== order);
      if (next.length === 0) setShowOrder(false);
      return next;
    });
  };

  // Send order handler
  const handleSend = (sent: any) => {
    try {
      const existingBatchesRaw = localStorage.getItem("eat-easy-order-batches");
      const existingBatches = existingBatchesRaw ? JSON.parse(existingBatchesRaw) : [];

      const isAnyPreparing = existingBatches.some((b: any) => b.status === "preparing");
      
      const newBatch = {
        id: Date.now().toString(),
        items: sent.items,
        subtotal: sent.subtotal,
        tax: sent.tax,
        total: sent.total,
        qty: sent.qty,
        status: !isAnyPreparing ? "preparing" : "pending",
        timerStart: !isAnyPreparing ? Date.now() : null,
      };

      const updatedBatches = [...existingBatches, newBatch];
      localStorage.setItem("eat-easy-order-batches", JSON.stringify(updatedBatches));

      // For backward compatibility (Checkout page uses this)
      // Flatten all items from all batches
      const allItems = updatedBatches.flatMap((b: any) => b.items);
      const totalSubtotal = updatedBatches.reduce((acc: number, b: any) => acc + b.subtotal, 0);
      const totalTax = updatedBatches.reduce((acc: number, b: any) => acc + b.tax, 0);
      const totalTotal = updatedBatches.reduce((acc: number, b: any) => acc + b.total, 0);
      const totalQty = updatedBatches.reduce((acc: number, b: any) => acc + b.qty, 0);

      const combinedOrder = {
        items: allItems,
        subtotal: totalSubtotal,
        tax: totalTax,
        total: totalTotal,
        qty: totalQty
      };
      localStorage.setItem("eat-easy-last-order", JSON.stringify(combinedOrder));

      setOrderItems([]); // Clear cart after successful order
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
    }
    setShowOrder(false);
    navigate("/orderStatus");
  };

  return {
    selectedItem,
    setSelectedItem,
    orderItems,
    setOrderItems,
    showOrder,
    setShowOrder,
    addToOrder,
    removeOrder,
    handleSend,
  };
}
