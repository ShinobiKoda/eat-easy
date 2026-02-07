import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { BsPercent } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import Loader from "../components/Loader";
import Header from "../components/layout/Header";
import { useOrder } from "../hooks/useOrder";
import wallet from "/images/wallet.png";

const Checkout1: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [toggleOrderList, setToggleOrderList] = useState(false);
  const [toggleDiscount, setToggleDiscount] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const { orderItems } = useOrder();

  // Group items by ID to show quantities
  const groupedItems = useMemo(() => {
    const groups: Record<number, { item: any, qty: number }> = {};
    orderItems.forEach(item => {
      if (groups[item.id]) {
        groups[item.id].qty += 1;
      } else {
        groups[item.id] = { item, qty: (item as any).qty || 1 };
      }
    });
    return Object.values(groups);
  }, [orderItems]);

  const orderTotal = useMemo(() => 
    orderItems.reduce((sum, item) => sum + (item.price || 0), 0)
  , [orderItems]);
  
  const tax = orderTotal * 0.11;
  const total = orderTotal + tax;

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
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className="pt-25 md:pt-30 max-w-[1440px] mx-auto flex flex-col items-center py-6 px-4 md:px-6 space-y-6 md:space-y-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-center lg:items-start">
            
            {/* Payment Method Column */}
            <div className="bg-[#FFFFFF] dark:bg-[#4a4a6a]/40 backdrop-blur-sm text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[32px] p-8 md:p-12 w-full lg:w-[60%] flex flex-col items-center justify-center min-h-[450px] border border-white/10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <img src={wallet} alt="Wallet" className="w-56 md:w-64 h-auto drop-shadow-2xl" />
              </motion.div>
              <h2 className="text-[22px] md:text-[28px] font-bold text-[#32324D] dark:text-white mb-3">
                You don't have any card
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#8E8EA9] dark:text-[#c0c0cf] mb-8 max-w-sm">
                Please add a credit or a debit card in order to pay your order.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-(--yellow-1) font-bold text-[18px] cursor-pointer hover:opacity-80 transition-opacity"
              >
                <FaPlus size={18} />
                Add a new card
              </motion.button>
            </div>

            {/* Order Summary Column */}
            <div className="flex flex-col gap-6 w-full lg:w-[40%]">
              
              {/* Order List and Prices */}
              <div className="bg-[#FFFFFF] dark:bg-[#4a4a6a]/40 backdrop-blur-sm rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-6"
                  onClick={() => setToggleOrderList(!toggleOrderList)}
                >
                  <p className="text-[#32324D] dark:text-white font-bold text-[18px]">
                    Order list and prices
                  </p>
                  <motion.div
                    animate={{ rotate: toggleOrderList ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-(--yellow-1)" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {!toggleOrderList && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-5 max-h-[300px] overflow-y-auto scrollbar-hidden pr-2">
                        {groupedItems.map(({ item, qty }) => (
                          <div key={item.id} className="flex justify-between items-center group">
                             <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <p className="text-[15px] font-semibold dark:text-white max-w-[120px] md:max-w-none">{item.name}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[15px] dark:text-white font-medium">
                                   <span className="text-[#8E8EA9] mr-1">{qty}x</span>
                                   <span className="font-bold text-[16px]">${item.price.toFixed(2)}</span>
                                </p>
                             </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 space-y-4">
                         <div className="flex justify-between items-center">
                            <p className="text-[#8E8EA9] dark:text-[#c0c0cf] text-[15px]">Subtotal</p>
                            <p className="font-bold text-[16px] dark:text-white">${orderTotal.toFixed(2)}</p>
                         </div>
                         <div className="flex justify-between items-center">
                            <p className="text-[#8E8EA9] dark:text-[#c0c0cf] text-[15px]">Tax</p>
                            <p className="font-bold text-[16px] dark:text-white">${tax.toFixed(2)}</p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Discount and Tips */}
              <div className="bg-[#FFFFFF] dark:bg-[#4a4a6a]/40 backdrop-blur-sm rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setToggleDiscount(!toggleDiscount)}
                >
                  <p className="text-[#32324D] dark:text-white font-bold text-[18px]">
                    Add discount code/tips
                  </p>
                  <motion.div
                    animate={{ rotate: toggleDiscount ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-(--yellow-1)" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {!toggleDiscount && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-6 space-y-4"
                    >
                      <div className="relative group">
                        <BsPercent className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8EA9] group-focus-within:text-(--yellow-1) transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Apply discount code" 
                          className="w-full bg-[#f6f6f9] dark:bg-[#32324D]/50 rounded-2xl py-4 pl-12 pr-4 outline-none text-[15px] dark:text-white border border-transparent focus:border-(--yellow-1)/50 placeholder:text-[#8E8EA9] transition-all" 
                        />
                      </div>
                      <div className="relative group">
                        <MdOutlinePayments className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8EA9] group-focus-within:text-(--yellow-1) transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Add tips" 
                          className="w-full bg-[#f6f6f9] dark:bg-[#32324D]/50 rounded-2xl py-4 pl-12 pr-4 outline-none text-[15px] dark:text-white border border-transparent focus:border-(--yellow-1)/50 placeholder:text-[#8E8EA9] transition-all" 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total Price Card */}
              <div className="bg-[#FFFFFF] dark:bg-[#4a4a6a]/40 backdrop-blur-sm rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 flex justify-between items-center">
                <p className="text-[#32324D] dark:text-white font-bold text-[20px]">Total price</p>
                <p className="text-(--orange-1) font-extrabold text-[24px] tracking-tight">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center rounded-[32px] px-8 py-6 bg-[#FFFFFF] dark:bg-[#4a4a6a]/60 backdrop-blur-md shadow-[0_10px_40px_rgb(0,0,0,0.2)] border border-white/10 gap-6 mt-4">
            <p className="text-[#8E8EA9] dark:text-[#c0c0cf] font-semibold text-[18px]">
              No card added
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-[320px] py-5 rounded-2xl bg-[#EAEAEF] dark:bg-[#4a4a6a] text-[#8E8EA9] dark:text-white/40 font-bold text-[20px] flex justify-center items-center gap-3 cursor-not-allowed shadow-inner"
            >
              Pay <span className="text-[15px] font-medium opacity-60 ml-1 mt-0.5">${total.toFixed(2)}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout1;
