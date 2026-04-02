import { MotionContainer, PopIn, SlideIn } from "../animations/motion";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import ThemeSwitchButton from "../ThemeSwitchButton";
import AsideCard from "./AsideCard";
import SEO from "../SEO";

function GetStarted() {
  const [animateBar, setAnimateBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setAnimateBar(true), []);

  return (
    <MotionContainer className="relative w-full min-h-screen">
      <SEO
        title="Get Started | EatEasy"
        description="Join EatEasy to have a full digital experience in our restaurant."
      />
      <div className="absolute top-2 right-2 z-50">
        <ThemeSwitchButton />
      </div>
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="lg:hidden w-full flex flex-col items-center justify-center min-h-screen max-w-[480px] mx-auto">
          <SlideIn direction="up">
            <div className="w-full overflow-hidden">
              <img
                src="/images/mobile-onboarding-illustration.svg"
                alt="Onboarding Illustration"
                className="w-full"
              />
            </div>
          </SlideIn>

          <div className="w-full flex justify-center px-6">
            <div className="w-full h-1.5 bg-(--light-progress-bg) dark:bg-(--neutral-800) max-w-[140px] rounded-2xl mx-auto flex flex-row overflow-hidden">
              <div className="w-1/3 relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={animateBar ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 3.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute left-0 top-0 h-full w-full bg-[#FFB01D] rounded-2xl"
                />
              </div>
              <div className="flex-1"></div>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="w-full mt-8 space-y-3.5 text-center">
            <SlideIn direction="up">
              <h1 className="font-medium heading-font text-[26px] text-neutral-800 dark:text-white">
                Full Contactless Experience
              </h1>
              <p className="font-medium text-base text-neutral-600 dark:text-(--neutral-150)">
                From ordering to paying, that's all contactless.
              </p>
            </SlideIn>
          </div>

          <div className="mt-8 flex flex-col gap-2.5 w-full px-6">
            

            <PopIn>
              <motion.button
                onClick={() => navigate("/method")}
                className="px-6 py-4 bg-(--purple-2) text-white font-semibold text-base rounded-2xl w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </PopIn>
          </div>
        </div>

        <div className="w-full flex-col items-center justify-center min-h-screen max-w-[480px] mx-auto space-y-[42px] hidden lg:flex">
          <PopIn className="w-full text-center px-6 space-y-3.5">
            <h1 className="text-(--neutral-800) dark:text-white font-medium text-[22px] lg:text-[40px] heading-font">
              Let's Get Started 😎{" "}
            </h1>
            <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
              Sign up or log in to have a full digital experience in our
              restaurant.
            </p>
          </PopIn>

          <PopIn className="w-full flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/method")}
              className="px-6 py-4 rounded-2xl bg-(--purple-2) text-white font-semibold text-base cursor-pointer"
            >
              Get Started
            </motion.button>
            
          </PopIn>
        </div>

        <AsideCard />
      </div>
    </MotionContainer>
  );
}

export default GetStarted;
