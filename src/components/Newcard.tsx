import React, { useState } from 'react';
import { motion, type Variants } from "motion/react";
import { FaTimes } from "react-icons/fa";
import useIsDesktop from "../hooks/useIsDesktop";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa, SiMastercard } from "react-icons/si";

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
          transition: { duration: 0.3, type: "spring", damping: 25, stiffness: 300 }
        },
        exit: { x: "100%", opacity: 0 }
    };
  }
  
  // MOBILE — slide from bottom
  return {
      hidden: { y: "100%", opacity: 0 },
      visible: {
          y: "0",
          opacity: 1,
          transition: { duration: 0.3, type: "spring", damping: 25, stiffness: 300 }
      },
      exit: { y: "100%", opacity: 0 }
  };
}

const Newcard: React.FC<NewcardProps> = ({ onClose, onAddCard }) => {
  const isDesktop = useIsDesktop();
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 1 ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.replace(/\s/g, "").length <= 16) {
        setCardNumber(formatCardNumber(val));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/[^0-9]/g, "");
      if (val.length > 2) {
          val = val.substring(0, 2) + "/" + val.substring(2, 4);
      }
      if (val.length <= 5) {
          setExpiryDate(val);
      }
  }

  // Determine card type for display
  const getCardTypeIcon = () => {
      if (cardNumber.startsWith("4")) return <SiVisa size={32} className="text-white/90" />;
      if (cardNumber.startsWith("5")) return <SiMastercard size={32} className="text-white/90" />;
      return <SiMastercard size={32} className="text-white/90" />; // Default
  }

  return (
    <>
        {/* Backdrop */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        />

        <motion.div
            variants={display(isDesktop)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 fixed right-0 w-full sm:min-h-screen sm:w-[500px] top-[10%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl bg-[#f7f7f7] dark:bg-[#2c2c45] shadow-2xl flex flex-col"
        >
             {/* Mobile Pull Indicator */}
            <div onClick={onClose} className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-pointer">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            <div className="flex flex-col h-full px-6 py-6 overflow-y-auto scrollbar-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold font-['DM_Sans'] text-[#32324D] dark:text-white">Add a new card</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <FaTimes size={20} className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>

                {/* Card Preview */}
                <div className="w-full aspect-[1.586/1] rounded-2xl p-6 mb-8 relative overflow-hidden shadow-xl
                    bg-gradient-to-br from-[#2c3e50] to-[#000000] dark:from-[#3a3a52] dark:to-[#1a1a2e]"
                >
                    {/* Abstract circles for decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full text-white">
                        <div className="flex justify-between items-start">
                            <FcSimCardChip size={48} />
                            {getCardTypeIcon()}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-white/60 mb-1">Card number</p>
                                <p className="text-2xl font-mono tracking-wider">{cardNumber || "512X XXXX XXXX XXXX"}</p>
                            </div>
                            
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs font-medium text-white/60 mb-1">Cardholder name</p>
                                    <p className="text-sm font-medium uppercase tracking-wide">{cardHolder || "YOUR NAME"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/60 mb-1">mm/yy</p>
                                    <p className="text-sm font-medium">{expiryDate || "12/24"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/60 mb-1 text-center">CVV</p>
                                    <p className="text-sm font-medium text-center">***</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 flex-1">
                    
                    <div className="space-y-2">
                         <label className="text-sm font-semibold text-[#666687] dark:text-[#a5a5ba]">Card number</label>
                        <div className="relative flex items-center">
                            <input 
                                type="text" 
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="512X XXXX XXXX XXXX"
                                className="w-full bg-white dark:bg-[#383854] border border-transparent focus:border-[#615793] rounded-2xl px-4 py-3.5 outline-none text-[#32324D] dark:text-white transition-all font-mono"
                            />
                            <div className="absolute right-4 pointer-events-none">
                                <SiMastercard className="text-orange-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#666687] dark:text-[#a5a5ba]">Cardholder name</label>
                        <input 
                            type="text" 
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Cardholder name"
                             className="w-full bg-white dark:bg-[#383854] border border-transparent focus:border-[#615793] rounded-2xl px-4 py-3.5 outline-none text-[#32324D] dark:text-white transition-all"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <label className="text-sm font-semibold text-[#666687] dark:text-[#a5a5ba]">Expire date</label>
                            <input 
                                type="text" 
                                value={expiryDate}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                className="w-full bg-white dark:bg-[#383854] border border-transparent focus:border-[#615793] rounded-2xl px-4 py-3.5 outline-none text-[#32324D] dark:text-white transition-all text-center"
                            />
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="text-sm font-semibold text-[#666687] dark:text-[#a5a5ba]">CVV</label>
                            <input 
                                type="text"
                                maxLength={3}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
                                placeholder="CVV"
                                 className="w-full bg-white dark:bg-[#383854] border border-transparent focus:border-[#615793] rounded-2xl px-4 py-3.5 outline-none text-[#32324D] dark:text-white transition-all text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="mt-8 mb-4">
                    <motion.button 
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-[#615793] dark:bg-[#6c5dd3] text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Add card
                    </motion.button>
                </div>

            </div>
        </motion.div>
    </>
  );
};

export default Newcard;
