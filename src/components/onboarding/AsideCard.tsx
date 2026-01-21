import { motion } from "motion/react";
import { MotionContainer, PopIn, SlideIn, FadeIn } from "../animations/motion";
import { useState, useEffect } from "react";

const AsideCard = () => {
  const [animateBar, setAnimateBar] = useState(false);
  useEffect(() => setAnimateBar(true), []);

  return (
    <div className="min-h-screen p-[30px] hidden lg:block">
      <MotionContainer className="min-h-full lg:flex bg-white dark:bg-(--neutral-700) rounded-3xl flex-col align-center justify-center">
        <PopIn>
          <div className="w-full max-w-[400px] mx-auto">
            <img
              src="/images/desktop-onboarding-illustration.svg"
              alt="Onboarding Illustration"
              className="w-full"
            />
          </div>
        </PopIn>

        <div className="space-y-6 px-6 mt-[42px]">
          <div className="w-full flex justify-center">
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

          <SlideIn direction="up" className="text-center space-y-3.5">
            <h2 className="font-medium text-3xl text-(--neutral-700) dark:text-white heading-font">
              Full Contactless Experience
            </h2>
            <p className="font-medium text-base text-(--neutral-500) dark:text-(-neutral-150)">
              From ordering to paying, that's all contactless
            </p>
          </SlideIn>

          <FadeIn className="font-medium text-[26px] text-center">
            <p>
              <span className="text-(--neutral-700) dark:text-white">Eat</span>
              <span className="text-(--orange-1)">Easy</span>
            </p>
          </FadeIn>
        </div>
      </MotionContainer>
    </div>
  );
};

export default AsideCard;
