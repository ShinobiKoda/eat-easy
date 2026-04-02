
import React, { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import type { PropType } from "../types";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "./RestaurantContext";

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
  const { selectedRestaurant, getStorageKey } = useRestaurant();
  const restaurantId = selectedRestaurant?.id ?? null;

  const [selectedItem, setSelectedItem] = useState<PropType | null>(null);
  const [orderItems, setOrderItems] = useState<PropType[]>(() => {
    try {
      const key = restaurantId ? `${restaurantId}:eat-easy-cart` : "eat-easy-cart";
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOrder, setShowOrder] = useState(false);
  const navigate = useNavigate();

  // Track the previous restaurant ID to detect switches
  const prevRestaurantIdRef = useRef<string | null>(restaurantId);

  // When restaurant changes, re-initialize cart from the new restaurant's scoped storage
  useEffect(() => {
    if (prevRestaurantIdRef.current !== restaurantId) {
      prevRestaurantIdRef.current = restaurantId;

      try {
        const key = getStorageKey("eat-easy-cart");
        const saved = localStorage.getItem(key);
        setOrderItems(saved ? JSON.parse(saved) : []);
      } catch {
        setOrderItems([]);
      }

      // Reset UI state
      setSelectedItem(null);
      setShowOrder(false);
    }
  }, [restaurantId, getStorageKey]);

  // Persist cart to restaurant-scoped localStorage
  useEffect(() => {
    const key = getStorageKey("eat-easy-cart");
    localStorage.setItem(key, JSON.stringify(orderItems));
  }, [orderItems, getStorageKey]);

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
      const batchesKey = getStorageKey("eat-easy-order-batches");
      const lastOrderKey = getStorageKey("eat-easy-last-order");

      const existingBatchesRaw = localStorage.getItem(batchesKey);
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
      localStorage.setItem(batchesKey, JSON.stringify(updatedBatches));

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
      localStorage.setItem(lastOrderKey, JSON.stringify(combinedOrder));

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
