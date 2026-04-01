import { motion, type Variants } from "motion/react";
import type { PropType } from "../../types";
import { useState, useRef, useCallback, type MouseEvent } from "react";
import useIsDesktop from "../../hooks/useIsDesktop";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import StarHalf from "/images/star-half-icon.png";
import StarFull from "/images/star.svg";

export type ViewDishProps = {
  item: PropType | null;
  onClose: () => void;
  onAddToOrder?: (order: any) => void;
};

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
      hidden: { x: "100vw", opacity: 0 },
      visible: {
        x: "0",
        opacity: 1,
        transition: { duration: 0.25 },
      },
      exit: { x: "100vw", opacity: 0 },
    };
  }

  // MOBILE — slide from bottom
  return {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { duration: 0.25 },
    },
    exit: { y: "100vh", opacity: 0 },
  };
};

const DRAG_DISMISS_THRESHOLD = 120;

const ViewDish: React.FC<ViewDishProps> = ({ item, onClose, onAddToOrder }) => {
  const isDesktop = useIsDesktop();
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentDragY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      currentDragY.current = delta;
      if (panelRef.current) {
        panelRef.current.style.transform = `translateY(${delta}px)`;
        panelRef.current.style.opacity = `${Math.max(0.2, 1 - delta / 300)}`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (currentDragY.current > DRAG_DISMISS_THRESHOLD) {
      onClose();
    } else {
      currentDragY.current = 0;
      if (panelRef.current) {
        panelRef.current.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
        panelRef.current.style.transform = 'translateY(0)';
        panelRef.current.style.opacity = '1';
        setTimeout(() => {
          if (panelRef.current) panelRef.current.style.transition = '';
        }, 250);
      }
    }
  }, [onClose]);

  if (!item) return null;

  // track selected topping ids in a Set for multiple independent checks
  const [selectedToppings, setSelectedToppings] = useState<Set<number>>(
    () => new Set(),
  );

  const toggleCheck = (id: number) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // unchecking: remove from selected set and remove any stored counts
        next.delete(id);
        setToppingCounts((prevCounts) => {
          const nextCounts = { ...prevCounts };
          delete nextCounts[id];
          return nextCounts;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // format prices to two decimals
  const formatPrice = (n: number) => `$${n.toFixed(2)}`;
  const [count, setCount] = useState(1);
  const Increment = () => setCount((c) => c + 1);
  const Decrement = () => setCount((c) => Math.max(0, c - 1));
  // track individual counts per topping (keyed by topping id)
  const [toppingCounts, setToppingCounts] = useState<Record<number, number>>(
    {},
  );

  const incrementTopping = (id: number) => {
    setToppingCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementTopping = (id: number) => {
    setToppingCounts((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };


  const toppingsTotal = item.toppings.reduce((sum, t) => {
    const qty = toppingCounts[t.id] || 0;
    if (!selectedToppings.has(t.id)) return sum;
    return sum + t.price * qty;
  }, 0);

  return (
    <motion.div
      ref={panelRef}
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full min-h-screen sm:w-[55%] md:w-[45%] lg:w-[450px] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl vieworder-bg"
    >
      <div className="flex flex-col h-full">
        {/* Drag handle – touch-drag down to close on mobile */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="top-0 py-3 flex items-center justify-center cursor-grab active:cursor-grabbing sm:hidden touch-none"
        >
          <div className="w-[134px] h-[5px] bg-(--neutral-300) dark:bg-white rounded-sm" />
        </div>

        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50"
        >
          <LiaTimesSolid
            size={25}
            className="text-(--neutral-400) dark:text-(--neutral-200)"
          />
        </motion.div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <div className="max-w-[600px] min-h-[204px] flex flex-col items-center overflow-hidden relative">
            <div className="w-[454px] h-[444px] absolute -top-[265px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
            <div className="w-60 h-[245px] absolute -top-20 rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />

            <img
              src={item.image}
              className="mx-auto absolute w-35 h-35 rounded-full"
              alt=""
            />

            <div className="text-[14px] text-[#C0C0CF] space-x-1 shadow-[0_4px_12px_rgba(0,0,0,0.50)] font-semibold rounded-xl py-1 px-2 bg-[#F7F7F7] ml-auto mr-3 mt-3 sm:mr-auto sm:ml-3 sm:mt-0 relative flex items-center">
              {item.rating < 4.5 ? (
                <img src={StarHalf} className="w-4 h-4" alt="" />
              ) : (
                <img src={StarFull} className="w-4 h-4" alt="" />
              )}
              <p>{item.rating.toFixed(1)}</p>
            </div>
          </div>

          <div className="p-6 space-y-[25px] mb-18 sm:mb-0">
            <div className="flex justify-between items-center">
              <p className="text-[20px] text-(--neutral-800) dark:text-white font-bold">
                {item.name}
              </p>
              <p className="text-(--orange-1) text-[20px] font-extrabold">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <p className="text-[15px] text-(--neutral-600) dark:text-(--neutral-200) font-500">
              {item.text}
            </p>

            {/* nutrients */}
            <div className="p-2.5 space-x-2.5 flex justify-between bg-[#FFFFFF] dark:bg-(--neutral-700)  rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
              {item.nutrients.map((nut, idx) => (
                <div key={idx} className="px-2 text-center">
                  <p className="text-[14px] font-semibold text-(--purple-1) dark:text-white">
                    {nut.amount}
                  </p>
                  <p className="text-[12px] font-600 text-(--neutral-800) dark:text-(--neutral-150)">
                    {nut.unit}
                  </p>
                </div>
              ))}
            </div>

            {/* ingredients */}
            <div>
              <h1 className="text-(--neutral-600) text-[18px] dark:text-(--neutral-200) font-semibold">
                Ingredients
              </h1>
              <div className="py-2.5 space-x-2.5 flex flex-nowrap overflow-x-auto scrollbar-hidden">
                {item.ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="py-3 min-w-20 space-y-2.5 text-center flex flex-col items-center bg-[#FFFFFF] dark:bg-(--neutral-700) rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
                  >
                    <img src={ingredient.ingimage} alt="" />
                    <p className="text-[12px] text-(--neutral-600) dark:text-(--neutral-150) font-600">
                      {ingredient.ingname}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* add toppings */}
            <div>
              <h1 className="text-(--neutral-600) text-[18px] dark:text-(--neutral-200) font-semibold">
                Add toppings
              </h1>
              <div className="py-2.5 space-y-2.5 flex flex-col">
                {item.toppings.map((top) => {
                  const topCount = toppingCounts[top.id] || 1;
                  return (
                    <div
                      key={`${top.id}`}
                      className="flex bg-[#FFFFFF] dark:bg-(--neutral-700) rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
                    >
                      <div className="p-3.5 text-center flex w-full items-center justify-between ">
                        <div className="flex space-x-2 items-center">
                          <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              toggleCheck(top.id);
                              // when selecting a topping initialize its count to 1 if not present
                              if (!selectedToppings.has(top.id))
                                setToppingCounts((prev) => ({
                                  ...prev,
                                  [top.id]: prev[top.id] || 0 || 1,
                                }));
                            }}
                            className={`w-4 h-4 border rounded-sm cursor-pointer flex items-center justify-center ${selectedToppings.has(top.id) ? "bg-(--yellow-1) border-(--yellow-1)" : "border-(--neutral-300) dark:border-(--neutral-150)"}`}
                          >
                            <FaCheck
                              className={`text-white dark:text-(--neutral-700) ${selectedToppings.has(top.id) ? "w-full h-full " : "hidden"}`}
                            />
                          </motion.div>

                          <p className="text-[12px] md:text-[16px] text-(--neutral-600) dark:text-(--neutral-200) font-100">
                            {top.name}
                          </p>
                        </div>
                        <p className="text-(--orange-1) text-[14px] md:text-[16px] font-semibold">
                          {!selectedToppings.has(top.id)
                            ? formatPrice(top.price)
                            : formatPrice(top.price * topCount)}
                        </p>
                      </div>

                      <div
                        className={`${selectedToppings.has(top.id) ? "w-[98px] rounded-r-xl flex items-center justify-center gap-2 bg-(--neutral-150) dark:bg-(--neutral-900) p-2" : "hidden"}`}
                      >
                        {/* minus top */}
                        <button
                          onClick={() => decrementTopping(top.id)}
                          type="button"
                          disabled={topCount === 1}
                          className={
                            topCount === 1
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }
                        >
                          <FaMinus
                            className={`${topCount === 1 ? "text-(--neutral-200)" : "text-(--neutral-500) dark:text-(--neutral-100)"}`}
                          />
                        </button>

                        <p className="text-[14px] dark:text-white text-(--neutral-500) font-semibold">
                          {topCount}
                        </p>

                        {/* add top */}
                        <button
                          onClick={() => incrementTopping(top.id)}
                          type="button"
                          className="cursor-pointer"
                        >
                          <FaPlus className="text-(--neutral-500) dark:text-(--neutral-100)" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* comment */}
            <div className="space-y-3 pb-8">
              <h1 className="text-(--neutral-600) text-[16px] md:text-[18px] dark:text-(--neutral-200) font-semibold">
                Add a request
              </h1>
              <textarea
                name=""
                id=""
                className="px-4 py-3 rounded-2xl text-(--neutral-300) dark:text-(--neutral-500) text-[14px] md:text-[16px] bg-[#FFFFFF] dark:bg-[#4A4A6A4D] border border-(--neutral-150) dark:border-(--neutral-600) w-full"
                placeholder="Ex: Don't add onion"
              ></textarea>
            </div>
          </div>
        </div>

        {/* footer section */}
        <div className="w-full flex justify-center sticky bottom-0 rounded-t-2xl sm:rounded-bl-2xl rounded-b-none p-3 bg-white dark:bg-(--neutral-900) z-10 space-x-4">
          <div className="flex items-center justify-center w-[127px] gap-3.5 rounded-2xl bg-(--neutral-100) dark:bg-(--neutral-700) px-2">
            {/* decrement button */}
            <button
              onClick={Decrement}
              type="button"
              disabled={count === 1}
              className={count === 1 ? "cursor-not-allowed" : "cursor-pointer"}
            >
              <FaMinus
                className={`${count === 1 ? "text-(--neutral-200)" : "text-(--neutral-500) dark:text-(--neutral-100)"}`}
              />
            </button>

            <p className="text-center dark:text-white text-(--neutral-500) text-[14px]">
              {count}
            </p>

            {/* increment button */}
            <button onClick={Increment} type="button" className="">
              <FaPlus className="text-(--neutral-500) dark:text-(--neutral-100)" />
            </button>
          </div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              const selected = Array.from(selectedToppings).map((id) => {
                const t = item.toppings.find((tt) => tt.id === id)!;
                const qty = toppingCounts[id] || 0;
                return {
                  id: t.id,
                  name: t.name,
                  price: t.price,
                  qty,
                  total: t.price * qty,
                };
              });

              const order = {
                id: item.id,
                name: item.name,
                image: item.image,
                rating: item.rating,
                reviews: item.reviews,
                basePrice: item.price,
                toppings: selected,
                qty: count,
                price: (item.price + toppingsTotal) * count,
              };

              onAddToOrder?.(order);
              onClose();
            }}
            className="w-full text-center p-3 rounded-2xl bg-(--purple-2) text-white text-[16px] md:text-[18px] cursor-pointer flex justify-center space-x-2"
          >
            <p className="font-semibold">Add to order</p>
            <p className="font-bold">
              {formatPrice((item.price + toppingsTotal) * count)}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewDish;