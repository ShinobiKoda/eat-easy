import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import { motion } from "motion/react";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { useNavigate } from "react-router-dom";
import AsideCard from "../AsideCard";

function SignUpMethod() {
  const navigate = useNavigate();

  return (
    <MotionContainer className="relative min-h-screen">
      <div className="absolute top-2 right-2 z-50">
        <ThemeSwitchButton />
      </div>

      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="w-full space-y-8 flex flex-col items-center justify-center min-h-screen max-w-[480px] mx-auto relative">
          <SlideIn direction="up" className="px-6">
            <div className="w-full flex flex-col text-center gap-3.5">
              <h1 className="text-(--neutral-800) font-medium text-[26px] lg:text-[40px] dark:text-white heading-font">
                Let's Get Started 😁
              </h1>
              <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
                Sign up or login into to have a full digital experience in our
                restaurant
              </p>
            </div>
          </SlideIn>

          <div className="w-full px-6 mt-14">
            <FadeIn className="w-full space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/signup")}
                className="py-4 bg-(--purple-2) rounded-2xl text-white font-semibold text-base w-full cursor-pointer"
              >
                Get started
              </motion.button>

              <div className="w-full flex items-center justify-between gap-6">
                <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
                <span className="text-(--neutral-400) dark:text-(--purple-4)">
                  OR
                </span>
                <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
              </div>

              <PopIn>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-white dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) shadow-sm rounded-2xl w-full flex items-center justify-center gap-2"
                >
                  <img
                    src="/images/facebook-icon.svg"
                    alt="Social Icon"
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-base text-(--purple-2) dark:text-(--purple-5)">
                    Continue with Facebook
                  </span>
                </motion.button>
              </PopIn>

              <PopIn>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-white dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) shadow-sm rounded-2xl w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  <img
                    src="/images/google-icon.svg"
                    alt="Social Icon"
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-base text-(--purple-2) dark:text-(--purple-5)">
                    Continue with Gmail
                  </span>
                </motion.button>
              </PopIn>
            </FadeIn>
          </div>

          <div className="w-full max-w-[480px] mx-auto text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="px-6 py-4 text-(--purple-3) font-semibold w-full left-0 text-base absolute bottom-[70px] mx-auto dark:text-(--purple-5) cursor-pointer"
            >
              Sign up later
            </motion.button>
          </div>
        </div>

        <AsideCard />
      </div>
    </MotionContainer>
  );
}

export default SignUpMethod;
