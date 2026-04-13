import React, { useState, useRef, useEffect } from "react";
import Header from "../components/layout/Header";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
  fadeIn,
  staggerContainer,
} from "../components/animations/motion";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { couponService, type Coupon } from "../services/couponService";
import CouponDetailModal from "../components/dashboard/CouponDetailModal";
import { supabase } from "../config/supabaseClient";
import { LuTicket, LuTicketCheck, LuFlame } from "react-icons/lu";
import { IoSparkles } from "react-icons/io5";
import SEO from "../components/SEO";

// ─── Milestone tiers (matches couponService logic) ───
const MILESTONES = [
  { orders: 15, percent: 5, label: "5% off" },
  { orders: 30, percent: 10, label: "10% off" },
  { orders: 50, percent: 15, label: "15% off" },
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Rewards: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isMounted, setIsMounted] = useState(false);
  const [liveCoupons, setLiveCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats
  const [activeCoupons, setActiveCoupons] = useState(0);
  const [usedCoupons, setUsedCoupons] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState(0);
  const [luckyDay, setLuckyDay] = useState<string | null>(null);
  const [isLuckyToday, setIsLuckyToday] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Coupons
        const coupons = await couponService.getUserCoupons();
        setLiveCoupons(coupons);

        const now = new Date();
        const active = coupons.filter(
          (c) => !c.isUsed && new Date(c.expiresAt) > now
        );
        const used = coupons.filter((c) => c.isUsed);
        setActiveCoupons(active.length);
        setUsedCoupons(used.length);

        // Weekly orders count (same Monday-start logic as couponService)
        const currentDay = now.getDay() || 7;
        const monday = new Date(now);
        monday.setHours(0, 0, 0, 0);
        monday.setDate(monday.getDate() - currentDay + 1);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { count } = await supabase
            .from("eat_easy_orders")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id)
            .gte("created_at", monday.toISOString());

          setWeeklyOrders(count ?? 0);

          // Lucky day calculation (same deterministic logic as couponService)
          const charSum = user.id
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0);
          const oneJan = new Date(now.getFullYear(), 0, 1);
          const weekNum = Math.ceil(
            ((now.getTime() - oneJan.getTime()) / 86400000 +
              oneJan.getDay() +
              1) /
              7
          );
          const luckyDayIndex = (charSum + weekNum) % 7;
          setLuckyDay(DAY_NAMES[luckyDayIndex]);
          setIsLuckyToday(now.getDay() === luckyDayIndex);
        }
      } catch (err) {
        console.error("Error fetching reward stats", err);
      }
    };

    fetchAll();

    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const maxStart = Math.max(0, liveCoupons.length - slidesToShow);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  // Determine current milestone progress
  const currentMilestone =
    MILESTONES.find((m) => weeklyOrders < m.orders) || MILESTONES[MILESTONES.length - 1];
  const prevThreshold =
    MILESTONES.indexOf(currentMilestone) > 0
      ? MILESTONES[MILESTONES.indexOf(currentMilestone) - 1].orders
      : 0;
  const progress =
    weeklyOrders >= currentMilestone.orders
      ? 100
      : ((weeklyOrders - prevThreshold) /
          (currentMilestone.orders - prevThreshold)) *
        100;
  const ordersRemaining = Math.max(0, currentMilestone.orders - weeklyOrders);
  const allMilestonesReached = weeklyOrders >= 50;

  return (
    <div className="w-full min-h-dvh">
      <SEO
        title="My Rewards | EatEasy"
        description="Track your rewards, coupons, and milestone progress on EatEasy."
      />
      <MotionContainer className="transition-all duration-300">
        <Header description="My Rewards" navbarTitle="My Rewards" />

        <div className="w-full pt-18 md:pt-30 pb-7 overflow-hidden max-w-[1440px] mx-auto">
          <div className="px-6 lg:px-[42px]">
            {/* ─── Stats Row ─── */}
            <PopIn>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
              >
                {/* Active coupons */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-(--purple-2)/10 flex items-center justify-center shrink-0">
                    <LuTicket size={22} className="text-(--purple-2)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-(--neutral-800) dark:text-white heading-font">
                      {activeCoupons}
                    </p>
                    <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400)">
                      Active Coupons
                    </p>
                  </div>
                </motion.div>

                {/* Used coupons */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-(--yellow-1)/10 flex items-center justify-center shrink-0">
                    <LuTicketCheck size={22} className="text-(--yellow-1)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-(--neutral-800) dark:text-white heading-font">
                      {usedCoupons}
                    </p>
                    <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400)">
                      Used Coupons
                    </p>
                  </div>
                </motion.div>

                {/* Weekly orders */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-(--orange-1)/10 flex items-center justify-center shrink-0">
                    <LuFlame size={22} className="text-(--orange-1)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-(--neutral-800) dark:text-white heading-font">
                      {weeklyOrders}
                    </p>
                    <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400)">
                      Orders This Week
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </PopIn>

            {/* ─── Milestone Progress + Lucky Day ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-8">
              {/* Milestone progress */}
              <FadeIn>
                <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--purple-2)/10 flex items-center justify-center">
                      <IoSparkles size={16} className="text-(--purple-2)" />
                    </div>
                    <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                      Weekly Milestone
                    </h3>
                  </div>

                  {allMilestonesReached ? (
                    <div className="flex flex-col items-center py-4 text-center">
                      <span className="text-3xl mb-2">🎉</span>
                      <p className="font-bold text-(--neutral-800) dark:text-white heading-font">
                        All milestones reached!
                      </p>
                      <p className="text-sm text-(--neutral-500) dark:text-(--neutral-400) mt-1">
                        You've unlocked every reward this week. Keep it up!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-end justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-(--neutral-600) dark:text-(--neutral-300)">
                            Next reward at{" "}
                            <span className="font-bold text-(--purple-2)">
                              {currentMilestone.orders} orders
                            </span>
                          </p>
                          <p className="text-xs text-(--neutral-400) mt-0.5">
                            {ordersRemaining} more order{ordersRemaining !== 1 ? "s" : ""} to unlock{" "}
                            <span className="font-semibold text-(--orange-1)">
                              {currentMilestone.label}
                            </span>
                          </p>
                        </div>
                        <p className="text-sm font-bold text-(--purple-2)">
                          {weeklyOrders}/{currentMilestone.orders}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-3 bg-(--neutral-100) dark:bg-(--neutral-600) rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--purple-2), var(--orange-1))",
                          }}
                        />
                      </div>

                      {/* Milestone dots */}
                      <div className="flex items-center justify-between mt-3 px-1">
                        {MILESTONES.map((m) => (
                          <div
                            key={m.orders}
                            className="flex flex-col items-center gap-1"
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                                weeklyOrders >= m.orders
                                  ? "bg-(--purple-2) text-white"
                                  : "bg-(--neutral-150) dark:bg-(--neutral-600) text-(--neutral-400)"
                              }`}
                            >
                              {weeklyOrders >= m.orders ? "✓" : m.orders}
                            </div>
                            <span
                              className={`text-[10px] font-semibold ${
                                weeklyOrders >= m.orders
                                  ? "text-(--purple-2)"
                                  : "text-(--neutral-400)"
                              }`}
                            >
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </FadeIn>

              {/* Lucky day card */}
              <FadeIn>
                <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--yellow-1)/10 flex items-center justify-center">
                      <span className="text-base">🍀</span>
                    </div>
                    <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                      Lucky Day
                    </h3>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    {luckyDay ? (
                      <>
                        <p className="text-sm text-(--neutral-500) dark:text-(--neutral-400) mb-2">
                          Your lucky day this week is
                        </p>
                        <p className="text-2xl font-bold heading-font text-(--neutral-800) dark:text-white">
                          {luckyDay}
                          {isLuckyToday && (
                            <span className="ml-2 text-base">🎯</span>
                          )}
                        </p>
                        {isLuckyToday ? (
                          <p className="text-xs font-medium text-(--orange-1) mt-2">
                            That's today! Order 3+ items for a free drink coupon 🥤
                          </p>
                        ) : (
                          <p className="text-xs text-(--neutral-400) mt-2">
                            Order 3+ items on {luckyDay} for a chance at a free drink!
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-(--neutral-400)">
                        <div className="w-4 h-4 border-2 border-(--neutral-300) border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* ─── Coupons ─── */}
          <div>
            <FadeIn>
              <div className="px-6 lg:px-[42px] flex items-center justify-between mb-4">
                <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                  Your Coupons
                </h3>
                {liveCoupons.length > 0 && (
                  <div className="flex gap-2">
                    <ScaleButton
                      onClick={handlePrev}
                      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                        currentSlide === 0
                          ? "bg-(--neutral-200) dark:bg-(--neutral-700) text-(--neutral-400)"
                          : "text-white bg-(--yellow-2)"
                      }`}
                    >
                      <FaChevronLeft className="text-xs" />
                    </ScaleButton>
                    <ScaleButton
                      onClick={handleNext}
                      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                        currentSlide >= maxStart
                          ? "bg-(--neutral-200) dark:bg-(--neutral-700) text-(--neutral-400)"
                          : " text-white bg-(--yellow-2)"
                      }`}
                    >
                      <FaChevronRight className="text-xs" />
                    </ScaleButton>
                  </div>
                )}
              </div>
            </FadeIn>

            <div className="w-full mb-8">
              {isMounted && (
                <div>
                  {liveCoupons.length === 0 ? (
                    <FadeIn className="flex flex-col items-center justify-center py-16 px-6 text-center bg-(--neutral-50) dark:bg-(--neutral-800)/50 rounded-3xl border border-(--neutral-200) dark:border-(--neutral-700) mx-6 lg:mx-[42px]">
                      <div className="w-20 h-20 bg-white dark:bg-(--neutral-700) rounded-full flex items-center justify-center mb-5 shadow-sm">
                        <span className="text-3xl">🎁</span>
                      </div>
                      <h3 className="text-[22px] font-bold text-(--neutral-900) dark:text-white mb-2 heading-font">
                        No coupons yet
                      </h3>
                      <p className="text-(--neutral-500) dark:text-(--neutral-400) text-base max-w-sm">
                        Keep ordering your favorite meals to unlock special
                        discounts and free treats!
                      </p>
                    </FadeIn>
                  ) : (
                    <Slider
                      ref={sliderRef}
                      {...sliderSettings}
                      slidesToShow={slidesToShow}
                    >
                      {liveCoupons.map((coupon) => {
                        let imgPath = "/images/easter-discount.png";
                        if (coupon.type === "welcome")
                          imgPath = "/images/discount-menu.png";
                        if (coupon.type === "free_drink")
                          imgPath = "/images/discount-drink.png";
                        if (coupon.type === "milestone")
                          imgPath = "/images/discount-desert.png";

                        return (
                          <div
                            key={coupon.id}
                            className="px-6 sm:px-0 sm:pl-6 py-4"
                          >
                            <FadeIn
                              className={`h-full shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-2xl ${coupon.isUsed ? "opacity-60" : ""}`}
                            >
                              <div
                                onClick={() => {
                                  setSelectedCoupon(coupon);
                                  setIsModalOpen(true);
                                }}
                                className="bg-(--neutral-100) dark:bg-(--neutral-700) p-5 cursor-pointer h-[210px] flex flex-col justify-between rounded-2xl relative"
                              >
                                {coupon.isUsed && (
                                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-[10px] font-bold uppercase text-gray-500">
                                    Used
                                  </div>
                                )}
                                <div className="space-y-4">
                                  <div className="w-[80px] h-[80px] rounded-full shrink-0 bg-[#50506F]">
                                    <img
                                      src={imgPath}
                                      alt={coupon.description}
                                      className="w-full h-full object-contain p-2"
                                    />
                                  </div>
                                  <h4 className="text-(--neutral-900) dark:text-white font-semibold text-[18px] font-mullish line-clamp-2">
                                    {coupon.description}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <HiOutlineCalendar className="text-(--orange-1) text-[16px]" />
                                  <span className="text-(--neutral-500) dark:text-(--neutral-300) text-[16px] font-medium">
                                    {new Date(
                                      coupon.expiresAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </FadeIn>
                          </div>
                        );
                      })}
                    </Slider>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MotionContainer>

      <CouponDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coupon={selectedCoupon}
      />
    </div>
  );
};

export default Rewards;
