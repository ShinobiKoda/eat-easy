
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

  // Add a dish to order — merge into existing cart item if same dish
  const addToOrder = (order: PropType) => {
    setOrderItems((prev) => {
      const existingIdx = prev.findIndex((o) => o.id === order.id);
      if (existingIdx !== -1) {
        // Increment qty on the existing item
        const updated = [...prev];
        const existing = updated[existingIdx] as any;
        updated[existingIdx] = {
          ...existing,
          qty: (existing.qty ?? 1) + ((order as any).qty ?? 1),
        };
        return updated;
      }
      // New item — add with qty
      return [...prev, { ...order, qty: (order as any).qty ?? 1 } as any];
    });
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

      // Look for an existing pending batch we can merge into
      const pendingIdx = existingBatches.findIndex((b: any) => b.status === "pending");

      let updatedBatches: any[];

      if (pendingIdx !== -1) {
        // Merge new items into the pending batch
        const pending = existingBatches[pendingIdx];
        const mergedItems = [...pending.items];

        for (const newItem of sent.items) {
          const existingItemIdx = mergedItems.findIndex((i: any) => i.id === newItem.id);
          if (existingItemIdx !== -1) {
            // Same dish — sum quantities
            mergedItems[existingItemIdx] = {
              ...mergedItems[existingItemIdx],
              qty: (mergedItems[existingItemIdx].qty ?? 1) + (newItem.qty ?? 1),
            };
          } else {
            mergedItems.push(newItem);
          }
        }

        const mergedSubtotal = pending.subtotal + sent.subtotal;
        const mergedTax = pending.tax + sent.tax;
        const mergedTotal = (pending.total || 0) + sent.total;
        const mergedQty = pending.qty + sent.qty;

        existingBatches[pendingIdx] = {
          ...pending,
          items: mergedItems,
          subtotal: mergedSubtotal,
          tax: mergedTax,
          total: mergedTotal,
          qty: mergedQty,
        };

        updatedBatches = existingBatches;
      } else {
        // No pending batch — create a new one
        const isAnyPreparing = existingBatches.some((b: any) => b.status === "preparing");

        const newBatch = {
          id: Date.now().toString(),
          restaurantName: selectedRestaurant?.name ?? "Gram Bistro",
          items: sent.items,
          subtotal: sent.subtotal,
          tax: sent.tax,
          total: sent.total,
          qty: sent.qty,
          status: !isAnyPreparing ? "preparing" : "pending",
          timerStart: !isAnyPreparing ? Date.now() : null,
        };

        updatedBatches = [...existingBatches, newBatch];
      }

      localStorage.setItem(batchesKey, JSON.stringify(updatedBatches));

      // For backward compatibility (Checkout page uses this)
      const allItems = updatedBatches.flatMap((b: any) => b.items);
      const totalSubtotal = updatedBatches.reduce((acc: number, b: any) => acc + b.subtotal, 0);
      const totalTax = updatedBatches.reduce((acc: number, b: any) => acc + b.tax, 0);
      const totalTotal = updatedBatches.reduce((acc: number, b: any) => acc + (b.total || 0), 0);
      const totalQty = updatedBatches.reduce((acc: number, b: any) => acc + b.qty, 0);

      const combinedOrder = {
        items: allItems,
        subtotal: totalSubtotal,
        tax: totalTax,
        total: totalTotal,
        qty: totalQty,
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
