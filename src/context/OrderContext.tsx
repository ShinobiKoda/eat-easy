import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
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

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { selectedRestaurant, getStorageKey } = useRestaurant();
  const restaurantId = selectedRestaurant?.id ?? null;

  const [selectedItem, setSelectedItem] = useState<PropType | null>(null);
  const [orderItems, setOrderItems] = useState<PropType[]>(() => {
    try {
      const key = restaurantId
        ? `${restaurantId}:eat-easy-cart`
        : "eat-easy-cart";
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

  // Send order handler: move user to Checkout where they must pay
  // before any batches are prepared.
  const handleSend = (sent: any) => {
    try {
      const lastOrderKey = getStorageKey("eat-easy-last-order");
      // Persist the current order snapshot for status/checkout continuity
      localStorage.setItem(lastOrderKey, JSON.stringify(sent));
    } catch (e) {
      console.error("Failed to save order snapshot", e);
    }

    setShowOrder(false);
    navigate("/Checkout", { state: { order: sent } });
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
