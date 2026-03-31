import React, { useState, useRef, useEffect } from "react";
import Header from "../layout/Header";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "../animations/motion";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { couponService, type Coupon } from "../../services/couponService";
import CouponDetailModal from "./CouponDetailModal";

// We can keep the dummy newRewards but remove the hardcoded rewardsHistory

const newRewards = [
  {
    title: "Refer a friend",
    description: "Share your promo code with a friend",
  },
  {
    title: "2 for 1",
    description: "Buy 2 dishes and get 1 for free",
  },
  {
    title: "Credit Points",
    description: "Transform your points in real USD",
  },
];

const Rewards: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const heroSliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isMounted, setIsMounted] = useState(false);
  const [liveCoupons, setLiveCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const coupons = await couponService.getUserCoupons();
        setLiveCoupons(coupons);
      } catch (err) {
        console.error("Error fetching coupons", err);
      }
    };
    fetchCoupons();

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

    // Force a resize event after a short delay to fix react-slick width calculation issues
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
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  const heroSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "24px",
  };

  return (
    <div className="w-full min-h-screen">
      <MotionContainer className="transition-all duration-300">
        <Header description="My Rewards" navbarTitle="My Rewards" />

        <div className="w-full pt-18 md:pt-30 pb-7 overflow-hidden max-w-[1440px] mx-auto">
          <div className="md:px-6 lg:px-[42px]">
            {/* ─── Top Section: Hero + Points ─── */}
            {/* Mobile-only heading */}
            <h2 className="md:hidden text-(--neutral-400) dark:text-white font-bold text-[20px] heading-font mb-3 px-6">
              Use your rewards or new ones
            </h2>

            {/* ─── Mobile: Center-mode Hero Carousel ─── */}
            <div className="lg:hidden w-full">
              <Slider
                ref={heroSliderRef}
                {...heroSliderSettings}
                className="flex items-center justify-center"
              >
                {/* Hero Banner Slide */}
                <div className="px-2">
                  <div className="overflow-hidden rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) flex items-center justify-between w-full h-[180px] relative">
                    <div className="relative pl-6 min-w-[148px] space-y-1.5 z-10">
                      <p className="text-(--neutral-400) dark:text-(--neutral-600) text-xs font-medium">
                        New client
                      </p>
                      <h2 className="heading-font text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[20px] leading-tight max-w-[180px]">
                        30% Discount for all the menu
                      </h2>
                      <ScaleButton className="bg-(--orange-1) text-white font-semibold text-xs px-3 py-2 rounded-2xl cursor-pointer">
                        Claim reward
                      </ScaleButton>
                    </div>
                    <div className="absolute -right-14 sm:-right-10 top-0 bottom-0 w-[200px] flex items-center justify-center">
                      <img
                        src="/images/reward.png"
                        alt="Reward Badge"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Points Card Slide */}
                <div className="px-2">
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between overflow-hidden w-full h-[180px] relative">
                    <div className="z-10">
                      <p className="text-(--neutral-400) dark:text-(--neutral-800) text-[16px] font-semibold">
                        Your points
                      </p>
                      <p className="text-(--orange-1) font-bold text-[40px] leading-none mt-1">
                        300
                      </p>
                    </div>
                    <div className="absolute -right-10 top-0 bottom-0 w-[160px] flex items-center justify-center">
                      <img
                        src="/images/reward-star.png"
                        alt="Star"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* 2x More Points Slide */}
                <div className="px-2">
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between overflow-hidden w-full h-[180px] relative">
                    <div className="max-w-[200px] flex flex-col justify-center z-10">
                      <h3 className="text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[20px] heading-font">
                        2x more points
                      </h3>
                      <p className="text-(--neutral-400) dark:text-(--neutral-600) text-[14px] font-medium mt-1">
                        Your next <b>5 orders will double</b> your credit points
                      </p>
                    </div>
                    <div className="absolute -right-10 sm:-right-8 top-0 bottom-0 w-[160px] flex items-center justify-center">
                      <img
                        src="/images/double-credit.png"
                        alt="Star"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </Slider>
            </div>

            {/* ─── Desktop: Original flex layout ─── */}
            <div className="hidden lg:grid grid-cols-[2fr_1fr] gap-5 h-full items-stretch">
              {/* Hero Banner */}
              <FadeIn className="h-full bg-(--neutral-900) dark:bg-(--neutral-150) rounded-3xl flex items-center justify-between w-full">
                <div className="relative px-10 space-y-4">
                  <p className="text-(--neutral-400) dark:text-(--neutral-600) text-sm font-medium">
                    New client
                  </p>
                  <h2 className="heading-font text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[32px] leading-tight max-w-[263px]">
                    30% Discount for all the menu
                  </h2>
                  <ScaleButton className="bg-(--orange-1) text-white font-semibold text-sm px-6 py-4 rounded-2xl cursor-pointer">
                    Claim reward
                  </ScaleButton>
                </div>
                <div className="max-w-[335px] flex items-center justify-center">
                  <img
                    src="/images/reward.png"
                    alt="Reward Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
              </FadeIn>

              {/* Right Column: Points + 2x */}
              <div className="flex flex-col gap-5 justify-between w-full h-full">
                {/* Points Card */}
                <PopIn className="flex-1">
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between">
                    <div>
                      <p className="text-(--neutral-400) dark:text-(--neutral-800) text-[16px] font-semibold">
                        Your points
                      </p>
                      <p className="text-(--orange-1) font-bold text-[40px] lg:text-[68px] leading-none mt-1">
                        300
                      </p>
                    </div>
                    <div className="w-[110.94px] h-[110.94px]">
                      <img
                        src="/images/reward-star.png"
                        alt="Star"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </PopIn>

                {/* 2x More Points */}
                <PopIn className="flex-1">
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between">
                    <div className="max-w-[211px] flex flex-col justify-center">
                      <h3 className="text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[22px] heading-font">
                        2x more points
                      </h3>
                      <p className="text-(--neutral-400) dark:text-(--neutral-600) text-[16px] font-medium mt-1">
                        Your next <b> 5 orders will double</b> your credit
                        points
                      </p>
                    </div>
                    {/* Mini chart line */}
                    <div className="flex items-center justify-between w-[46%]">
                      <img
                        src="/images/double-credit.png"
                        alt="Star"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </PopIn>
              </div>
            </div>

            {/* ─── Get New Rewards ─── */}
            <div className="px-6 md:px-0 mt-8">
              <FadeIn>
                <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white mb-4">
                  Get new rewards
                </h3>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-4">
                {newRewards.map((reward, index) => (
                  <FadeIn key={index}>
                    <div className="rounded-2xl shadow-md bg-(--neutral-100) dark:bg-(--neutral-700) p-5 flex items-center justify-between cursor-pointer h-full">
                      <div className="space-y-4 max-w-[272px]">
                        <h4 className="text-(--neutral-900) dark:text-white font-semibold text-[18px] heading-font">
                          {reward.title}
                        </h4>
                        <p className="text-(--neutral-500) dark:text-(--neutral-300) text-[16px] font-medium">
                          {reward.description}
                        </p>
                      </div>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center"
                      >
                        <FaArrowRight className="text-(--yellow-1) w-5 h-5" />
                      </motion.div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Rewards History ─── */}
          <div className="mt-8">
            <FadeIn>
              <div className="px-6 lg:px-[42px] flex items-center justify-between mb-4">
                <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                  Rewards History
                </h3>
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
              </div>
            </FadeIn>

            <div className="w-full mb-8">
              {isMounted && (
                <div className="">
                  {liveCoupons.length === 0 ? (
                    <FadeIn className="flex flex-col items-center justify-center py-16 px-6 text-center bg-(--neutral-50) dark:bg-(--neutral-800)/50 rounded-3xl border border-(--neutral-200) dark:border-(--neutral-700) mx-6 sm:mx-0">
                      <div className="w-20 h-20 bg-white dark:bg-(--neutral-700) rounded-full flex items-center justify-center mb-5 shadow-sm">
                        <span className="text-3xl">🎁</span>
                      </div>
                      <h3 className="text-[22px] font-bold text-(--neutral-900) dark:text-white mb-2 heading-font">
                        No rewards just yet
                      </h3>
                      <p className="text-(--neutral-500) dark:text-(--neutral-400) text-base max-w-sm">
                        Keep ordering your favorite meals to unlock special
                        discounts and free treats!
                      </p>
                    </FadeIn>
                  ) : (
                    /* Negative margin to offset item padding */
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
                                      coupon.expiresAt,
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
