import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { PropType } from "../types";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { BsPercent } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import Loader from "../components/Loader";
import Header from "../components/layout/Header";
import { useOrder } from "../hooks/useOrder";
import wallet from "/images/wallet.png";
import Newcard from "../components/Checkout/Newcard";
import CvvModal from "../components/Checkout/CvvModal";
import {
  SlickPrevArrow,
  SlickNextArrow,
} from "../components/Checkout/SliderArrows";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa, SiMastercard } from "react-icons/si";
import { cardService } from "../services/cardService";
import { orderService } from "../services/orderService";
import { couponService, type Coupon } from "../services/couponService";
import { useTheme } from "../hooks/useTheme";
import Success from "../components/Checkout/Success";
import ProcessingPayment from "../components/Checkout/ProcessingPayment";
import { useRestaurant } from "../context/RestaurantContext";

const Checkout1: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [toggleOrderList, setToggleOrderList] = useState(false);
  const [tip, setTip] = useState(0);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showCvvModal, setShowCvvModal] = useState(false);
  const [cvvConfirmed, setCvvConfirmed] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { selectedRestaurant, getStorageKey } = useRestaurant();
  const restaurantName = selectedRestaurant?.name || "Gram Bistro";

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const [cvv, setCvv] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const savedCards = await cardService.getUserCards();
        setCards(savedCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleAddCard = (card: any) => {
    setCards([...cards, card]);
    setCvvConfirmed(false);
  };

  const handleCvvConfirm = (cvvValue: string) => {
    setCvv(cvvValue);
    setCvvConfirmed(true);
    setShowCvvModal(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplyingCoupon(true);
    setCouponError(null);
    try {
      const coupon = await couponService.validateCouponCode(couponCode);
      setAppliedCoupon(coupon);
      setCouponCode("");
    } catch (err: any) {
      setCouponError(err.message || "Invalid coupon");
      setAppliedCoupon(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const currentOrderTotalRef = useRef(0);
  const currentTotalRef = useRef(0);
  const discountAmountRef = useRef(0);

  const handlePay = async () => {
    if (!cvv) return;

    setIsProcessing(true);

    // Use CVV for payment processing here
    // console.log("Processing payment...");
    setCvv("");
    setCvvConfirmed(false);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Save order to database
    try {
      const orderItems = groupedItems.map(({ item, qty }) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty,
      }));

      await orderService.saveOrder({
        restaurantName: restaurantName,
        items: orderItems,
        subtotal: currentOrderTotalRef.current,
        tax: currentOrderTotalRef.current * 0.11,
        tip,
        total: currentTotalRef.current,
      });

      // Post-order logic for coupons
      if (appliedCoupon) {
        await couponService.redeemCoupon(appliedCoupon.id);
      }
      await couponService.evaluatePostOrderRewards();
    } catch (error) {
      console.error("Failed to process payment pipeline:", error);
    } finally {
      setIsProcessing(false);
    }

    setShowSuccessModal(true);

    // Clear order from localStorage after payment (scoped to current restaurant)
    localStorage.removeItem(getStorageKey("eat-easy-last-order"));
    localStorage.removeItem(getStorageKey("eat-easy-order-batches"));
    localStorage.removeItem(getStorageKey("countdown_start"));
    localStorage.removeItem(getStorageKey("eat-easy-cart"));

    // Also clear the React state so the useOrder hook doesn't re-persist the cart
    setOrderItems([]);
  };

  const getCardTypeIcon = (number: string) => {
    if (number.startsWith("4"))
      return <SiVisa size={32} className="text-[#EB001B]" />;
    if (number.startsWith("5"))
      return <SiMastercard size={32} className="text-[#EB001B]" />;
    return <SiMastercard size={32} className="text-[#EB001B]" />;
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <SlickPrevArrow isDark={isDark} />,
    nextArrow: <SlickNextArrow isDark={isDark} />,
    afterChange: (index: number) => {
      setActiveCardIndex(index);
      setCvvConfirmed(false);
      setCvv("");
    },
  };

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const { orderItems: cartItems, setOrderItems } = useOrder();
  const location = useLocation();
  const orderFromState = location.state?.order;

  // Use order items from state if available, otherwise cart
  const itemsToDisplay = orderFromState?.items || cartItems;

  // Group items by ID to show quantities
  const groupedItems = useMemo<{ item: PropType; qty: number }[]>(() => {
    // If using orderFromState, items are already grouped/have qty
    if (orderFromState?.items) {
      return orderFromState.items.map((item: any) => ({
        item: item as PropType,
        qty: item.qty || 1,
      }));
    }

    // Otherwise group cart items
    const groups: Record<number, { item: PropType; qty: number }> = {};
    cartItems.forEach((item) => {
      if (groups[item.id]) {
        groups[item.id].qty += 1;
      } else {
        groups[item.id] = { item, qty: (item as any).qty || 1 };
      }
    });
    return Object.values(groups);
  }, [itemsToDisplay, orderFromState]);

  const orderTotal = useMemo(() => {
    if (orderFromState?.total) return orderFromState.total;
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [itemsToDisplay, orderFromState]);

  const tax = orderTotal * 0.11;
  const discountAmount = appliedCoupon
    ? appliedCoupon.isFreeItem
      ? 5.0 // Example: flat $5 off for free item
      : (orderTotal * appliedCoupon.discountPercent) / 100
    : 0;

  const total = Math.max(0, orderTotal + tax - discountAmount + tip);

  // Sync refs for handlePay closure
  useEffect(() => {
    currentOrderTotalRef.current = orderTotal;
    currentTotalRef.current = total;
    discountAmountRef.current = discountAmount;
  }, [orderTotal, total, discountAmount]);

  // stop background scroll effect when any of this is open (desktop only)
  const isModalOpen =
    Boolean(showNewCard) ||
    Boolean(showCvvModal) ||
    Boolean(showSuccessModal) ||
    Boolean(isProcessing);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isModalOpen && isDesktop) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={`transition-all duration-300 ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
        <Header
          title="My Order"
          description="Checkout"
          navbarTitle={restaurantName}
          showBack={true}
        />

        <div className="pt-25 md:pt-30 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-4 md:px-6 space-y-6 md:space-y-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-center lg:items-start">
            {/* Payment Method Column */}
            <div className="md:bg-[#FFFFFF] dark:md:bg-(--neutral-700) text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-2xl md:p-8 w-full lg:w-[60%] flex flex-col items-center justify-center min-h-[500px]">
              {cards.length === 0 ? (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <img
                      src={wallet}
                      alt="Wallet"
                      className="w-56 md:w-64 h-auto drop-shadow-2xl"
                    />
                  </motion.div>
                  <h2 className="text-[22px] md:text-[28px] font-bold text-[#32324D] dark:text-white mb-3">
                    You don't have any card
                  </h2>
                  <p className="text-[14px] md:text-[16px] text-[#8E8EA9] dark:text-[#c0c0cf] mb-8 max-w-sm">
                    Please add a credit or a debit card in order to pay your
                    order.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-(--yellow-1) font-bold text-[18px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setShowNewCard(true)}
                  >
                    <FaPlus size={18} />
                    Add a new card
                  </motion.button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col gap-8">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-[20px] font-bold text-[#32324D] dark:text-white">
                      Payment method
                    </h2>
                    <button
                      onClick={() => setShowNewCard(true)}
                      className="flex items-center gap-2 text-(--orange-text) font-bold text-[14px] cursor-pointer"
                    >
                      <FaPlus size={12} /> Add a new card
                    </button>
                  </div>

                  <div className="w-full max-w-[400px] mx-auto mb-8">
                    <Slider {...sliderSettings}>
                      {cards.map((card, index) => (
                        <div key={index} className="px-2">
                          <div
                            style={{
                              backgroundImage: isDark
                                ? "url('/images/Card-dark.png')"
                                : "url('/images/Card.png')",
                              backgroundPosition: "center",
                            }}
                            className="w-full bg-no-repeat rounded-2xl p-6 flex flex-col justify-between gap-3 shadow-xl text-white relative"
                          >
                            <div className="flex justify-between items-center">
                              <FcSimCardChip size={48} />
                              {getCardTypeIcon(card.cardNumber)}
                            </div>

                            <div className="mb-2">
                              <p className="text-[20px] md:text-[24px] font-semibold tracking-wider dark:text-(--neutral-800)">
                                {card.cardNumber || "512X XXXX XXXX XXXX"}
                              </p>
                            </div>

                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm dark:text-(--neutral-800) font-medium uppercase tracking-wide max-w-[150px] truncate">
                                  {card.cardHolder || "YOUR NAME"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm dark:text-(--neutral-800) font-medium">
                                  {card.expiryDate || "12/24"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm dark:text-(--neutral-800) font-medium text-center">
                                  ***
                                </p>
                              </div>
                            </div>
                            {/* Enter CVV button */}
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => {
                                setActiveCardIndex(index);
                                setShowCvvModal(true);
                              }}
                              className={`mt-3 w-full py-2 rounded-xl text-[12px] font-bold tracking-wide transition-all cursor-pointer ${
                                cvvConfirmed && activeCardIndex === index
                                  ? "bg-green-500/20 dark:bg-green-900/70 text-green-300 border border-green-400/30"
                                  : "bg-white/15 dark:bg-(--neutral-400)/50 hover:bg-white/25 text-white dark:text-(--neutral-800) border border-white/20"
                              }`}
                            >
                              {cvvConfirmed && activeCardIndex === index
                                ? "✓ CVV Entered"
                                : "Enter CVV to Pay"}
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="bg-[#FFF8E1] dark:bg-(--neutral-400) border border-[#FFB01D]/20 rounded-2xl p-6 flex gap-4 md:gap-8 items-center w-full mt-auto">
                    <div className="min-w-10 h-10">
                      <img
                        src={wallet}
                        className="w-full h-full object-contain"
                        alt="Wallet icon"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-bold text-[#32324D] dark:text-white">
                        More info about your payment
                      </p>
                      <p className="text-[12px] text-(--neutral-200)">
                        This card is used as default for all your payments.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Column */}
            <div className="flex flex-col gap-6 w-full lg:w-[40%]">
              {/* Order List and Prices */}
              <div className="bg-[#FFFFFF] dark:bg-(--neutral-700) rounded-2xl p-6 lg:p-8  shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                <div
                  className="flex justify-between items-center cursor-pointer mb-6"
                  onClick={() => setToggleOrderList(!toggleOrderList)}
                >
                  <p className="text-[#32324D] dark:text-white font-bold text-[18px]">
                    Order list and prices
                  </p>
                  <div>
                    <FaChevronDown
                      className={`text-(--yellow-1) transition-transform duration-300 ${toggleOrderList ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <AnimatePresence>
                    {!toggleOrderList && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-5 max-h-[300px] overflow-y-auto scrollbar-hidden pr-2 mb-6"
                      >
                        {groupedItems.map(({ item, qty }) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                                <img
                                  src={item.image}
                                  className="w-full h-full object-cover"
                                  alt={item.name}
                                />
                              </div>
                              <p className="text-[15px] font-semibold dark:text-white max-w-[120px] md:max-w-none">
                                {item.name}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[15px] dark:text-white font-medium">
                                <span className="text-[#8E8EA9] mr-1">
                                  {qty}x
                                </span>
                                <span className="font-bold text-[16px]">
                                  ${item.price.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[#8E8EA9] dark:text-[#c0c0cf] text-[15px]">
                        Subtotal
                      </p>
                      <p className="font-bold text-[16px] dark:text-white">
                        ${orderTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#8E8EA9] dark:text-[#c0c0cf] text-[15px]">
                        Tax
                      </p>
                      <p className="font-bold text-[16px] dark:text-white">
                        ${tax.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-(--neutral-150)"></div>

                  {/* Discount and Tips */}
                  <div className="">
                    <div className="flex justify-between items-center cursor-pointer">
                      <p className="text-[#32324D] dark:text-white font-bold text-[18px]">
                        Add discount code/tips
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      {/* discount */}
                      <div className="relative group">
                        <BsPercent className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8EA9] group-focus-within:text-(--yellow-1) transition-colors" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Apply discount code"
                          className="w-full bg-[#f6f6f9] dark:bg-[#32324D]/50 rounded-2xl py-4 pl-12 pr-28 outline-none text-[15px] dark:text-white border border-transparent focus:border-(--neutral-500) placeholder:text-[#8E8EA9] transition-all"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={!couponCode || isApplyingCoupon}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-(--purple-2) text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                          {isApplyingCoupon ? "..." : "Apply"}
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-red-500 text-sm font-semibold pl-2">
                          {couponError}
                        </p>
                      )}
                      {appliedCoupon && (
                        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-xl border border-green-200 dark:border-green-800/50">
                          <span className="font-semibold text-sm">
                            ✓ {appliedCoupon.code} applied
                          </span>
                          <button
                            onClick={() => setAppliedCoupon(null)}
                            className="text-xs underline font-bold px-2 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      {/* tip */}
                      <div className="relative group">
                        <MdOutlinePayments className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8EA9] group-focus-within:text-(--yellow-1) transition-colors" />
                        <input
                          type="text"
                          placeholder="Add tips"
                          value={tip > 0 ? `$ ${tip.toFixed(2)}` : ""}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, "");
                            if (!rawValue) {
                              setTip(0);
                              return;
                            }
                            const numericValue = parseInt(rawValue, 10);
                            setTip(numericValue / 100);
                          }}
                          className="w-full bg-[#f6f6f9] dark:bg-[#32324D]/50 rounded-2xl py-4 pl-12 pr-4 outline-none text-[15px] dark:text-white border border-transparent focus:border-(--neutral-500) placeholder:text-[#8E8EA9] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-(--neutral-150)"></div>

                  {/* Total Price Card */}
                  <div className="space-y-4">
                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                        <p className="font-bold text-[16px]">
                          Discount ({appliedCoupon.code})
                        </p>
                        <p className="font-bold text-[16px]">
                          -${discountAmount.toFixed(2)}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-[#32324D] dark:text-white font-bold text-[20px]">
                        Total price
                      </p>
                      <p className="text-(--orange-1) font-extrabold text-[24px] tracking-tight">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center rounded-2xl px-5 py-3 bg-[#FFFFFF] dark:bg-(--neutral-700) shadow-[0_4px_12px_rgba(0,0,0,0.10)] gap-6 mt-4">
            <p className="text-[#8E8EA9] dark:text-[#c0c0cf] font-semibold text-[18px]">
              {cards.length === 0
                ? "No card added"
                : cvvConfirmed
                  ? "Ready to pay"
                  : "Enter CVV to continue"}
            </p>
            <motion.button
              whileHover={
                cards.length > 0 && cvvConfirmed ? { scale: 1.02 } : {}
              }
              whileTap={cards.length > 0 && cvvConfirmed ? { scale: 0.98 } : {}}
              disabled={cards.length === 0 || !cvvConfirmed}
              onClick={handlePay}
              className={`w-full max-w-[320px] py-4 rounded-2xl text-white font-medium text-[20px] flex justify-center items-center gap-3 shadow-inner ${
                cards.length > 0 && cvvConfirmed
                  ? "bg-(--purple-2) cursor-pointer"
                  : "bg-(--purple-4) cursor-not-allowed"
              }`}
            >
              Pay{" "}
              <span className="text-[16px] font-bold ml-1 mt-0.5">
                ${total.toFixed(2)}
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showNewCard && (
              <Newcard
                onClose={() => setShowNewCard(false)}
                onAddCard={handleAddCard}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showCvvModal && (
              <CvvModal
                onClose={() => setShowCvvModal(false)}
                onConfirm={handleCvvConfirm}
                lastFourDigits={
                  cards[activeCardIndex]?.cardNumber
                    ?.replace(/\s/g, "")
                    .slice(-4) || ""
                }
              />
            )}
          </AnimatePresence>

          <Success isOpen={showSuccessModal} />
          <ProcessingPayment isOpen={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default Checkout1;
