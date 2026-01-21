import { FaArrowLeft } from "react-icons/fa";
import { motion } from "motion/react";
import { useState } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MotionContainer, PopIn } from "../animations/motion";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { ClipLoader } from "react-spinners";
import AsideCard from "../onboarding/AsideCard";
import { supabase } from "../../config/supabaseClient";
import { createProfile } from "../../services/userProfile";
import { useEffect } from "react";

const ConfirmLink = () => {
  const { state } = useLocation();
  let gmail = state?.email as string | undefined;
  let username = state?.username as string | undefined;
  let phoneNumber = state?.phoneNumber as string | undefined;
  const password = state?.password as string | undefined;

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [displayEmail, setDisplayEmail] = useState<string | undefined>(gmail);

  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const handleMagicLinkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) return;
      const session = data.session;
      if (!session) return;
      setHasSession(true);

      // If we landed here via magic link redirect, state may be empty.
      // Fallback to session user data.
      if (!gmail) {
        const { data: userData } = await supabase.auth.getUser();
        gmail = userData.user?.email ?? gmail;
        username = (userData.user?.user_metadata as any)?.username ?? username;
        phoneNumber =
          (userData.user?.user_metadata as any)?.phone_number ?? phoneNumber;
      }
      // Update the display email once we know it
      if (gmail && !displayEmail) setDisplayEmail(gmail);
      if (!gmail) return;
      setError(null);
      try {
        // Set password only for brand-new users
        if (password) {
          const { error: updateError } = await supabase.auth.updateUser({
            password,
          });
          if (updateError) {
            // For magic link sign-in, if password matches existing, continue.
            if (updateError?.code !== "same_password") {
              throw updateError;
            }
          }
        }

        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;
        const userId = userData.user?.id;

        if (userId) {
          await createProfile(
            {
              username: username ?? "",
              email: gmail,
              phone_number: phoneNumber ?? "",
            },
            userId,
          );
        }
        navigate("/set-location");
      } catch (e: any) {
        setError(e?.message || "Could not complete sign-in.");
      } finally {
      }
    };

    handleMagicLinkSession();
  }, []);

  const handleResend = async () => {
    if (!gmail) return;
    setError(null);
    setResending(true);
    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({
        email: gmail,
        options: { shouldCreateUser: true },
      });
      if (resendError) throw resendError;
    } catch (e: any) {
      setError(e?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <MotionContainer className="w-full">
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="w-full px-6  py-4 min-h-screen lg:flex">
          <button
            className="px-3 py-3 rounded-2xl bg-white shadow-md max-w-11 dark:bg-(--neutral-700) lg:hidden"
            onClick={() => navigate(-1) || navigate("/signup")}
          >
            <FaArrowLeft className="dark:text-white" />
          </button>

          <div className="absolute top-2 right-2 z-50">
            <ThemeSwitchButton />
          </div>

          <div className="lg:flex-1 min-h-full relative lg:flex lg:flex-col lg:justify-center">
            <div className="w-full lg:max-w-[480px] mx-auto">
              <div>
                <PopIn className="mt-3 text-center space-y-3.5">
                  <h1 className="flex items-center heading-font font-medium text-[22px] lg:text-[40px] heading-font justify-center text-(--neutral-800) dark:text-white">
                    <span>Confirm Sign-In </span>
                    <RxLightningBolt color="yellow" />{" "}
                  </h1>
                  <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
                    We sent a secure sign-in link to{" "}
                    <span className="font-bold text-(--neutral-700) dark:text-(--neutral-150)">
                      {displayEmail || "your email"}
                    </span>
                    . Click the link in your email to continue.
                  </p>
                </PopIn>
                <div className="mt-10 flex flex-col items-center justify-center gap-3">
                  <ClipLoader color="var(--purple-2)" size={24} />
                  <p className="text-center font-medium text-(--neutral-600) dark:text-(--neutral-150)">
                    {hasSession
                      ? "Signing you in… Please wait."
                      : "Waiting for you to click the email link…"}
                  </p>
                </div>

                {error && (
                  <p className="text-center mt-3 font-semibold text-sm text-red-500">
                    {error}
                  </p>
                )}

                <p className="text-center mt-3 lg:mt-[42px] font-semibold text-base text-(--neutral-500) dark:text-white">
                  Didn't get the email?{" "}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-bold text-(--yellow-1) cursor-pointer disabled:opacity-60"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? "Resending..." : "Resend Link"}
                  </motion.button>
                </p>
              </div>
              <div className="w-full flex items-center gap-6 text-center mt-[318px]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-white dark:bg-(--neutral-700) dark:text-white rounded-2xl w-full max-w-[123px] cursor-pointer font-semibold text-base hidden lg:flex items-center gap-2 flex-1 text-(--purple-2)"
                  onClick={() => navigate(-1) || navigate("/signup")}
                >
                  <FaArrowLeft /> <span>Back</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <AsideCard />
      </div>
    </MotionContainer>
  );
};

export default ConfirmLink;
