import React, { useState } from "react";
import { motion, type Variants } from "motion/react";
import { LiaTimesSolid } from "react-icons/lia";
import useIsDesktop from "../../hooks/useIsDesktop";
import { useTheme } from "../../hooks/useTheme";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa, SiMastercard } from "react-icons/si";
import { cardService } from "../../services/cardService";

type NewcardProps = {
  onClose: () => void;
  onAddCard?: (cardDetails: any) => void;
};

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
      hidden: { x: "100%", opacity: 0 },
      visible: {
        x: "0",
        opacity: 1,
        transition: {
          duration: 0.3,
          type: "spring",
          damping: 25,
          stiffness: 300,
        },
      },
      exit: { x: "100%", opacity: 0 },
    };
  }

  // MOBILE — slide from bottom
  return {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { y: "100%", opacity: 0 },
  };
};

const Newcard: React.FC<NewcardProps> = ({ onClose, onAddCard }) => {
  const isDesktop = useIsDesktop();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string | boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateCardNumber = (number: string) =>
    number.replace(/\s/g, "").length === 16;
  const validateCvv = (value: string) => value.length === 3;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 1 ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric
    if (rawVal.length <= 16) {
      setCardNumber(formatCardNumber(rawVal));
    }
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
    setCardHolder(val);
    if (errors.cardHolder) setErrors({ ...errors, cardHolder: false });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9/]/g, "");

    // If the user is deleting, allow it
    if (e.target.value.length < expiryDate.length) {
      setExpiryDate(e.target.value);
      if (errors.expiryDate) setErrors({ ...errors, expiryDate: false });
      return;
    }

    // Strip slashes for processing
    const digits = val.replace(/\//g, "");

    // Limit to 4 digits (MMYY)
    if (digits.length > 4) return;

    // Month validation as user types
    if (digits.length === 1) {
      // First digit of month can only be 0 or 1
      if (parseInt(digits) > 1) {
        val = "0" + digits + "/";
      } else {
        val = digits;
      }
    } else if (digits.length === 2) {
      const month = parseInt(digits.substring(0, 2));
      if (month < 1 || month > 12) return; // Block invalid months
      val = digits + "/";
    } else if (digits.length > 2) {
      const month = parseInt(digits.substring(0, 2));
      if (month < 1 || month > 12) return;
      val = digits.substring(0, 2) + "/" + digits.substring(2);
    }

    if (val.length <= 5) {
      setExpiryDate(val);
      if (errors.expiryDate) setErrors({ ...errors, expiryDate: false });
    }
  };

  const validateExpiryDate = (value: string): string | false => {
    if (!value || value.length !== 5 || value[2] !== "/") {
      return "Enter a valid date (MM/YY)";
    }

    const month = parseInt(value.substring(0, 2));
    const year = parseInt(value.substring(3, 5));

    if (isNaN(month) || isNaN(year)) return "Enter a valid date (MM/YY)";
    if (month < 1 || month > 12) return "Month must be between 01 and 12";

    const now = new Date();
    const currentYear = now.getFullYear() % 100; // e.g. 26
    const currentMonth = now.getMonth() + 1; // 1-12
    const maxYear = currentYear + 8;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card has expired";
    }
    if (year > maxYear) {
      return `Year cannot exceed ${maxYear}`;
    }

    return false; // No error
  };

  // Determine card type for display
  const getCardTypeIcon = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.startsWith("4"))
      return <SiVisa size={32} className="text-[#EB001B]" />;
    if (cleanNumber.startsWith("5"))
      return <SiMastercard size={32} className="text-[#EB001B]" />;
    return <SiMastercard size={32} className="text-[#EB001B]" />; // Default
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expiryError = validateExpiryDate(expiryDate);
    const newErrors: Record<string, string | boolean> = {
      cardNumber: !validateCardNumber(cardNumber),
      cvv: !validateCvv(cvv),
      cardHolder: !cardHolder.trim(),
      expiryDate: expiryError || false,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        // Save to Supabase (excluding CVV)
        await cardService.saveCard({
          card_number: cardNumber,
          card_holder: cardHolder,
          expiry_date: expiryDate,
        });

        // Update local state and close
        onAddCard?.({ cardNumber, cardHolder, expiryDate, cvv });
        onClose();
      } catch (err: any) {
        console.error("Failed to save card:", err);
        setSubmitError(err.message || "Failed to save card. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 dark:bg-black/50 bg-gray-500 z-40 backdrop-blur-sm min-h-dvh"
      />

      <motion.div
        variants={display(isDesktop)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="z-50 fixed right-0 w-full sm:min-h-dvh sm:w-[55%] md:w-[45%] lg:w-[450px] top-[10%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl bg-(--neutral-100) dark:bg-(--neutral-800) shadow-2xl flex flex-col"
      >
        {/* Mobile Pull Indicator */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-pointer"
        >
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full px-6 py-6 overflow-y-auto scrollbar-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[22px] w-full sm:w-auto text-center sm:text-left font-bold text-(--neutral-800) dark:text-(--neutral-100)">
              Add a new card
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full transition-colors hidden sm:block cursor-pointer"
            >
              <LiaTimesSolid
                size={24}
                className="text-(-neutral-400) dark:text-(--neutral-200)"
              />
            </button>
          </div>

          {/* Card Preview */}
          <div
            style={{
              backgroundImage: isDark
                ? "url('/images/Card-dark.png')"
                : "url('/images/Card.png')",
              backgroundPosition: "center",
            }}
            className="max-w-[402px] h-[240px] bg-no-repeat rounded-2xl p-6 flex flex-col justify-between shadow-xl text-white mb-8"
          >
            <div className="flex justify-between items-center">
              <FcSimCardChip size={48} />
              {getCardTypeIcon(cardNumber)}
            </div>

            <div>
              <p className="text-xs font-medium text-white/60 dark:text-(--neutral-500)">
                Card number
              </p>
              <p className="text-[24px] font-semibold tracking-wider dark:text-(--neutral-800)">
                {cardNumber || "512X XXXX XXXX XXXX"}
              </p>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-xs font-medium text-white/60 dark:text-(--neutral-500)">
                  Cardholder name
                </p>
                <p className="text-sm dark:text-(--neutral-800) font-medium uppercase tracking-wide max-w-[100px] truncate">
                  {cardHolder || "YOUR NAME"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/60 dark:text-(--neutral-500)">
                  mm/yy
                </p>
                <p className="text-sm dark:text-(--neutral-800) font-medium">
                  {expiryDate || "12/24"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-white/60 dark:text-(--neutral-500)">
                  CVV
                </p>
                <p className="text-sm font-medium text-center dark:text-(--neutral-800)">
                  ***
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  minLength={19} // 16 digits + 3 spaces
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="512X XXXX XXXX XXXX"
                  className={`w-full bg-white dark:bg-[#383854] border ${errors.cardNumber ? "border-red-500" : "border-(--neutral-600)"} focus:border-(--purple-2) rounded-2xl px-4 py-3.5 outline-none text-(--neutral-500) dark:text-white transition-all font-mono`}
                />
                <div className="absolute right-4 pointer-events-none">
                  {getCardTypeIcon(cardNumber)}
                </div>
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid 16-digit card number
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="text"
                required
                value={cardHolder}
                onChange={handleCardHolderChange}
                placeholder="Cardholder name"
                className={`w-full bg-white dark:bg-[#383854] border ${errors.cardHolder ? "border-red-500" : "border-(--neutral-600)"} focus:border-(--purple-2) rounded-2xl px-4 py-3.5 outline-none text-(--neutral-500) dark:text-white transition-all`}
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full bg-white dark:bg-[#383854] border ${errors.expiryDate ? "border-red-500" : "border-(--neutral-600)"} focus:border-(--purple-2) rounded-2xl px-4 py-3.5 outline-none text-(--neutral-500) dark:text-white transition-all`}
                />
                {typeof errors.expiryDate === "string" && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value.replace(/\D/g, ""));
                    if (errors.cvv) setErrors({ ...errors, cvv: false });
                  }}
                  placeholder="CVV"
                  className={`w-full bg-white dark:bg-[#383854] border ${errors.cvv ? "border-red-500" : "border-(--neutral-600)"} focus:border-(--purple-2) rounded-2xl px-4 py-3.5 outline-none text-(--neutral-500) dark:text-white transition-all`}
                />
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <div className="mt-8 mb-4">
            {submitError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {submitError}
              </p>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-[#615793] dark:bg-[#6c5dd3] text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding card..." : "Add card"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default Newcard;

