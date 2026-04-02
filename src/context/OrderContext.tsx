
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { PropType } from "../types";
import { useNavigate } from "react-router-dom";

interface OrderContextType {
  selectedItem: PropType | null;
  setSelectedItem: (item: PropType | null) => void;
  orderItems: PropType[];
  setOrderItems: React.Dispatch<React.SetStateAction<PropType[]>>;
  showOrder: boolean;
  setShowOrder: (show: boolean) => void;
  addToOrder: (order: PropType) => void;
  removeOrder: (order: PropType) => void;
  handleSend: (sent: any) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <OrderContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        orderItems,
        setOrderItems,
        showOrder,
        setShowOrder,
        addToOrder,
        removeOrder,
        handleSend,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
