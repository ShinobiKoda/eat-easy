import { useState, useRef, useEffect } from "react";
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
  const sliderRef = useRef<Slider>(null);
  const heroSliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStart = Math.max(0, rewardsHistory.length - slidesToShow);

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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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

        <div className="w-full pt-[60px] md:pt-[120px] md:px-6 lg:px-[42px]">
          {/* ─── Top Section: Hero + Points ─── */}
          {/* Mobile-only heading */}
          <h2 className="md:hidden text-(--neutral-400) dark:text-white font-bold text-[20px] heading-font mb-3 px-6">
            Use your rewards or new ones
          </h2>

          {/* ─── Mobile: Center-mode Hero Carousel ─── */}
          <div className="lg:hidden w-full overflow-x-hidden max-h-[220px]">
            <Slider
              ref={heroSliderRef}
              {...heroSliderSettings}
              className="[&_.slick-track]:flex! [&_.slick-slide]:h-auto! [&_.slick-slide]:flex! [&_.slick-slide>div]:w-full! [&_.slick-slide>div]:h-full!"
            >
              {/* Hero Banner Slide */}
              <div className="px-2 h-full">
                <div className="overflow-hidden rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) flex items-center justify-between w-full  max-h-[220px]">
                  <div className="relative pl-6 min-w-[148px]">
                    <p className="text-(--neutral-400) dark:text-(--neutral-600) text-xs font-medium">
                      New client
                    </p>
                    <h2 className="heading-font text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[20px] leading-tight max-w-[180px]">
                      30% Discount for all the menu
                    </h2>
                    <ScaleButton className="bg-(--orange-1) text-white font-semibold text-xs px-4 py-3 rounded-2xl cursor-pointer">
                      Claim reward
                    </ScaleButton>
                  </div>
                  <div className="w-[420px] h-auto relative -right-14 flex items-center justify-center">
                    <img
                      src="/images/reward.png"
                      alt="Reward Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Points Card Slide */}
              <div className="px-2 h-full">
                <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between overflow-hidden w-full  max-h-[220px]">
                  <div className="">
                    <p className="text-(--neutral-400) dark:text-(--neutral-800) text-[16px] font-semibold">
                      Your points
                    </p>
                    <p className="text-(--orange-1) font-bold text-[40px] leading-none mt-1">
                      300
                    </p>
                  </div>
                  <div className="w-[200px] h-auto -right-10 relative">
                    <img
                      src="/images/reward-star.png"
                      alt="Star"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2x More Points Slide */}
              <div className="px-2 h-full">
                <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between overflow-clip w-full  max-h-[220px]">
                  <div className="max-w-[200px] flex flex-col justify-center">
                    <h3 className="text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[20px] heading-font">
                      2x more points
                    </h3>
                    <p className="text-(--neutral-400) dark:text-(--neutral-600) text-[14px] font-medium mt-1">
                      Your next <b>5 orders will double</b> your credit points
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-[200px] h-auto -right-10 relative">
                    <img
                      src="/images/double-credit.png"
                      alt="Star"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </Slider>
          </div>

          {/* ─── Desktop: Original flex layout ─── */}
          <div className="hidden lg:flex gap-5 max-h-[350px] h-full">
            {/* Hero Banner */}
            <FadeIn className="relative h-full w-[65%] shrink-0">
              <div className="overflow-hidden rounded-3xl bg-(--neutral-900) dark:bg-(--neutral-150) flex items-center justify-between w-full">
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
              </div>
            </FadeIn>

            {/* Right Column: Points + 2x */}
            <div className="flex flex-col gap-5 justify-between w-full h-full flex-1">
              {/* Points Card */}
              <PopIn>
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
              <PopIn>
                <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-150) p-5 flex items-center justify-between">
                  <div className="max-w-[211px] flex flex-col justify-center">
                    <h3 className="text-(--neutral-400) dark:text-(--neutral-800) font-bold text-[22px] heading-font">
                      2x more points
                    </h3>
                    <p className="text-(--neutral-400) dark:text-(--neutral-600) text-[16px] font-medium mt-1">
                      Your next <b> 5 orders will double</b> your credit points
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
                  <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-700) p-5 flex items-center justify-between cursor-pointer h-full">
                    <div className="space-y-4 max-w-[272px]">
                      <h4 className="text-white font-semibold text-[18px] heading-font">
                        {reward.title}
                      </h4>
                      <p className="text-(--neutral-400) dark:text-(--neutral-300) text-[16px] font-medium">
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

          {/* ─── Rewards History ─── */}
          <div className="mt-8">
            <FadeIn>
              <div className="px-6 md:px-0 flex items-center justify-between mb-4">
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

            <div className="w-full mx-[-8px] px-2 mb-8">
              <Slider
                ref={sliderRef}
                {...sliderSettings}
                className="flex w-full h-full items-stretch"
              >
                {rewardsHistory.map((item, index) => (
                  <div key={index} className="px-2 h-full!">
                    <FadeIn className="h-full block">
                      <div className="rounded-2xl bg-(--neutral-900) dark:bg-(--neutral-700) p-5 space-y-4 cursor-pointer h-full flex flex-col justify-between">
                        <div className="w-[80px] h-[80px] shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-white font-semibold text-[18px] font-mullish line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1.5 shrink-0 mt-auto">
                          <HiOutlineCalendar className="text-(--orange-1) text-[16px]" />
                          <span className="text-(--neutral-400) dark:text-(--neutral-300) text-[16px] font-medium">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Rewards;
