import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import type { PropType } from "../../types";
import ViewDish from "./ViewDish";
import ViewOrder from "./ViewOrder";
import Header from "../layout/Header";
import SkeletonCard from "../SkeletonCard";
import { AnimatePresence } from "motion/react";
import { useOrder } from "../../hooks/useOrder";
import { getMenuItems } from "../../services/menuService";
import { getLatestRecommendation } from "../../services/recommendationHistoryService";
import { useLocation, useNavigate } from "react-router-dom";
import StarHalf from "/images/star-half-icon.png";
import StarFull from "/images/star.svg";

const Recommended: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedItems, setRecommendedItems] = useState<PropType[]>([]);
  const locationState = useLocation();
  const navigate = useNavigate();

  const {
    selectedItem,
    setSelectedItem,
    orderItems,
    showOrder,
    setShowOrder,
    addToOrder,
    removeOrder,
    handleSend,
  } = useOrder();

  // stop background scroll when modals are open
  const isModalOpen = Boolean(selectedItem || showOrder);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedItem, showOrder]);

  // Load recommended items either from route state or from latest DB recommendation
  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);
        setError(null);

        // Get item IDs from route state (fresh generation) or fetch from DB
        let itemIds: number[] | undefined = locationState.state?.itemIds;

        if (!itemIds || itemIds.length === 0) {
          console.debug(
            "[Recommended] No itemIds in state, fetching from DB...",
          );
          const latestRec = await getLatestRecommendation();
          if (latestRec) {
            itemIds = latestRec.item_ids;
            console.debug("[Recommended] Loaded from DB, IDs:", itemIds);
          } else {
            console.debug("[Recommended] No recommendations found");
            setError("No recommendations yet. Start by telling us your mood!");
            setLoading(false);
            return;
          }
        } else {
          console.debug(
            "[Recommended] Using itemIds from route state:",
            itemIds,
          );
        }

        // Fetch all menu items and filter by recommended IDs
        const allItems = await getMenuItems();
        const idSet = new Set(itemIds);
        const filtered = allItems.filter((item) => idSet.has(item.id));

        if (filtered.length === 0) {
          console.error(
            "[Recommended] No matching items found for IDs:",
            itemIds,
          );
          setError(
            "Couldn't load recommended items. Please try generating new ones.",
          );
        } else {
          console.debug(
            "[Recommended] Showing",
            filtered.length,
            "recommended items",
          );
          setRecommendedItems(filtered);
        }
      } catch (err) {
        console.error("[Recommended] Error loading recommendations:", err);
        setError("Failed to load recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, [locationState.state?.itemIds]);

  return (
    <div className="w-full min-h-screen">
      <div>
        <Header
          title="Smart Assistant"
          description="Your Recommendations"
          navbarTitle="Gram Bistro"
          showBack={true}
        />

        <div className="pt-15 md:pt-20 lg:pt-25">
          <div className="max-w-6xl mx-auto flex flex-col p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-[22px] lg:text-[32px] text-[#32324D] dark:text-[#FFFFFF] font-bold">
                We think you might enjoy these specially selected dishes
              </h1>
            </div>

            {/* Action bar */}
            <div className="md:p-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white md:dark:bg-(--neutral-700) flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <p className="text-sm font-semibold text-(--neutral-600) dark:text-(--neutral-200)">
                  AI-picked just for you
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/step1")}
                className="p-3 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-[12px] lg:text-[16px] text-white cursor-pointer"
              >
                New recommendation
              </motion.button>
            </div>

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center text-center py-20 space-y-6">
                <div className="w-24 h-24 rounded-full bg-(--yellow-1)/10 flex items-center justify-center">
                  <span className="text-4xl">🍽️</span>
                </div>
                <h2 className="text-xl font-semibold text-(--neutral-800) dark:text-white">
                  {error}
                </h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/step1")}
                  className="rounded-2xl bg-(--purple-2) text-white px-8 py-3 cursor-pointer font-semibold"
                >
                  Get Recommendations
                </motion.button>
              </div>
            )}

            {/* Food Grid */}
            {!error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-(--neutral-700) p-3"
                      >
                        <SkeletonCard variant="horizontal" />
                      </div>
                    ))
                  : recommendedItems.map((eat) => (
                      <div
                        key={eat.id}
                        className="rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white dark:bg-(--neutral-700) p-3 group"
                      >
                        <div className="flex space-x-3 items-center relative">
                          <div className="rounded-[50%] max-w-[100px] h-[100px]">
                            <img
                              src={eat.image}
                              className="rounded-[50%] w-full h-full object-cover"
                              alt={eat.name}
                            />
                          </div>
                          <div>
                            <p className="text-[15px] lg:text-[18px] dark:text-[#FFFFFF] font-semibold">
                              {eat.name}
                            </p>

                            <div className="text-[14px] font-semibold mb-2">
                              <div className="space-x-1 flex items-center">
                                {eat.rating < 4.5 ? (
                                  <img
                                    src={StarHalf}
                                    className="w-4 h-4"
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src={StarFull}
                                    className="w-4 h-4"
                                    alt=""
                                  />
                                )}
                                <p className="text-(--neutral-500) dark:text-(--neutral-200)">
                                  {eat.rating.toFixed(1)}
                                </p>
                              </div>
                              <span className="text-(--neutral-300) dark:text-(--neutral-500)">
                                ({eat.reviews} reviews)
                              </span>
                            </div>

                            <p className="text-(--orange-1) text-[15px] lg:text-[18px] font-extrabold">
                              ${eat.price.toFixed(2)}
                            </p>
                          </div>

                          <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedItem(eat)}
                            className="flex justify-self-end absolute right-0 bottom-0 cursor-pointer rounded-xl p-2 bg-[#FFF2EA] dark:bg-(--orange-1)"
                          >
                            <AiOutlinePlus className="w-fit h-fit text-(--orange-1) dark:text-[#FFF2EA]" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating cart */}
        <motion.div drag className="fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setShowOrder((v) => !v)}
            className="bg-amber-500 text-white rounded-full px-4 py-3 shadow-lg"
          >
            Cart ({orderItems.length})
          </button>
        </motion.div>

        {/* ViewDish modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <ViewDish
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onAddToOrder={addToOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ViewOrder modal */}
        <AnimatePresence>
          {showOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
            >
              <ViewOrder
                items={orderItems}
                onClose={() => setShowOrder(false)}
                removeOrder={removeOrder}
                onSend={handleSend}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Recommended;
