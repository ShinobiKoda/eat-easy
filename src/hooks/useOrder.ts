
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
      localStorage.setItem("eat-easy-last-order", JSON.stringify(sent));
      localStorage.setItem("countdown_start", Date.now().toString());
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
