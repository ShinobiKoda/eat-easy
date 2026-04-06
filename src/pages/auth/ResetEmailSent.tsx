import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { RxLightningBolt } from "react-icons/rx";
import { PopIn, MotionContainer } from "../../components/animations/motion";
import ThemeSwitchButton from "../../components/ThemeSwitchButton";
import AsideCard from "../../components/AsideCard";

const ResetEmailSent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = (state?.email as string | undefined) || "your email";

  return (
    <MotionContainer className="w-full">
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="w-full px-6 py-4 min-h-screen lg:flex">
          <div className="absolute top-2 right-2 z-50">
            <ThemeSwitchButton />
          </div>

          <div className="lg:flex-1 min-h-full relative lg:flex lg:flex-col lg:justify-center">
            <div className="w-full lg:max-w-[480px] mx-auto mt-[150px] lg:mt-0">
              <div>
                <PopIn className="mt-3 text-center space-y-3.5">
                  <h1 className="flex items-center heading-font font-medium text-[22px] lg:text-[40px] heading-font justify-center text-(--neutral-800) dark:text-white">
                    <span>Check Your Email</span>
                    <RxLightningBolt color="yellow" />
                  </h1>
                  <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
                    We sent password reset instructions to
                    <span className="font-bold text-(--neutral-700) dark:text-(--neutral-150)">
                      {" "}
                      {email}
                    </span>
                    . Follow the link in the email to set a new password.
                  </p>
                </PopIn>

                <p className="text-center mt-6 font-semibold text-(--neutral-500) dark:text-white">
                  Once you finish resetting your password, return here to sign
                  in.
                </p>

                <div className="w-full flex items-center gap-6 text-center mt-[200px]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 bg-white dark:bg-(--neutral-700) dark:text-white rounded-2xl w-full cursor-pointer font-semibold text-base text-(--purple-2)"
                    onClick={() => navigate("/login")}
                  >
                    Back to Sign In
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AsideCard />
      </div>
    </MotionContainer>
  );
};

export default ResetEmailSent;
