import { useState } from "react";
import Header from "../layout/Header";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  ScaleButton,
} from "../animations/motion";

const rewardsHistory = [
  {
    image: "/images/discount-drink.png",
    title: "Free drink",
    date: "06/02/2023",
  },
  {
    image: "/images/discount-menu.png",
    title: "5% Discount for all the menu",
    date: "06/02/2023",
  },
  {
    image: "/images/discount-desert.png",
    title: "15% Discount for Dessert",
    date: "13/03/2023",
  },
  {
    image: "/images/easter-discount.png",
    title: "10% Easter Discount",
    date: "14/04/2023",
  },
];

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
  const [historyStart, setHistoryStart] = useState(0);
  const visibleCount = 4;
  const maxStart = Math.max(0, rewardsHistory.length - visibleCount);

  const handlePrev = () => setHistoryStart((s) => Math.max(0, s - 1));
  const handleNext = () => setHistoryStart((s) => Math.min(maxStart, s + 1));

  return (
    <div className="w-full min-h-screen">
      <MotionContainer className="transition-all duration-300">
        <Header description="My Rewards" navbarTitle="Gram Bistro" />

        <div className="w-full pt-[60px] lg:pt-[120px] px-6 lg:px-[42px] pb-10">
          {/* ─── Top Section: Hero + Points ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 max-h-[350px]">
            {/* Hero Banner */}
            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl bg-(--neutral-900) dark:bg-(--neutral-150) flex items-center justify-between h-full w-[2/3]">
                {/* Text */}
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
                {/* Badge Image */}
                <div className="max-w-[335px] hidden sm:flex items-center justify-center">
                  <img
                    src="/images/reward.png"
                    alt="Reward Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Points + 2x */}
            <div className="flex flex-col gap-5 w-[1/3]">
              {/* Points Card */}
              <PopIn>
                <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between">
                  <div>
                    <p className="text-(--neutral-400) dark:text-(--neutral-800) text-sm font-medium">
                      Your points
                    </p>
                    <p className="text-(--orange-1) font-bold text-[40px] lg:text-[48px] leading-none mt-1">
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
              <PopIn>
                <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between">
                  <div className="max-w-[211px] flex flex-col justify-center">
                    <h3 className="text-(--neutral-400) dark:text-(--neutral-800) font-bold text-base heading-font">
                      2x more points
                    </h3>
                    <p className="text-(--neutral-400) dark:text-(--neutral-600) text-[16px] font-medium mt-1">
                      Your next <b> 5 orders will double</b> your credit points
                    </p>
                  </div>
                  {/* Mini chart line */}
                  <div className="flex items-center justify-between w-[50%]">
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
          <div className="mt-8">
            <FadeIn>
              <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white mb-4">
                Get new rewards
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-4">
              {newRewards.map((reward, index) => (
                <FadeIn key={index}>
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-700) p-5 flex items-center justify-between cursor-pointer group hover:bg-(--neutral-800) dark:hover:bg-(--neutral-600) transition-colors duration-200 h-full">
                    <div className="space-y-1 max-w-[200px]">
                      <h4 className="text-white font-semibold text-sm heading-font">
                        {reward.title}
                      </h4>
                      <p className="text-(--neutral-400) dark:text-(--neutral-300) text-xs font-medium">
                        {reward.description}
                      </p>
                    </div>
                    <div className="w-[36px] h-[36px] rounded-lg bg-(--orange-1)/15 flex items-center justify-center group-hover:bg-(--orange-1)/25 transition-colors duration-200">
                      <FaArrowRight className="text-(--orange-1) text-sm" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ─── Rewards History ─── */}
          <div className="mt-8">
            <FadeIn>
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white">
                  Rewards History
                </h3>
                <div className="flex gap-2">
                  <ScaleButton
                    className={`w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                      historyStart === 0
                        ? "bg-(--neutral-200) dark:bg-(--neutral-700) text-(--neutral-400)"
                        : "bg-(--neutral-900) dark:bg-(--neutral-700) text-white hover:bg-(--neutral-800)"
                    }`}
                  >
                    <FaChevronLeft className="text-xs" onClick={handlePrev} />
                  </ScaleButton>
                  <ScaleButton
                    className={`w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                      historyStart >= maxStart
                        ? "bg-(--neutral-200) dark:bg-(--neutral-700) text-(--neutral-400)"
                        : "bg-(--orange-1) text-white hover:bg-(--yellow-2)"
                    }`}
                  >
                    <FaChevronRight className="text-xs" onClick={handleNext} />
                  </ScaleButton>
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewardsHistory
                .slice(historyStart, historyStart + visibleCount)
                .map((item, index) => (
                  <FadeIn key={`${historyStart}-${index}`}>
                    <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-700) p-5 space-y-4 hover:bg-(--neutral-800) dark:hover:bg-(--neutral-600) transition-colors duration-200 cursor-pointer">
                      <div className="w-[64px] h-[64px] rounded-xl bg-(--neutral-800) dark:bg-(--neutral-600) flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[48px] h-[48px] object-contain"
                        />
                      </div>
                      <h4 className="text-white font-semibold text-sm heading-font">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <HiOutlineCalendar className="text-(--orange-1) text-sm" />
                        <span className="text-(--neutral-400) dark:text-(--neutral-300) text-xs font-medium">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
            </div>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Rewards;
