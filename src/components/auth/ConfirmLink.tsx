import { FaArrowLeft } from "react-icons/fa";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { MotionContainer, PopIn, fadeIn } from "../animations/motion";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { ClipLoader } from "react-spinners";
import AsideCard from "../onboarding/AsideCard";
import { supabase } from "../../config/supabaseClient";
import { createProfile } from "../../services/userProfile";

const ConfirmLink = () => {
  const { state } = useLocation();
  const gmail = state?.email as string | undefined;
  const username = state?.username as string | undefined;
  const phoneNumber = state?.phoneNumber as string | undefined;
  const password = state?.password as string | undefined;

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // 4-digit code state
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!gmail) {
      // If accessed directly without state, redirect to signup
      navigate("/signup");
    }
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [gmail, navigate]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    const newCode = [...code];
    pastedData.forEach((char, index) => {
      if (index < 4 && !isNaN(Number(char))) {
        newCode[index] = char;
      }
    });
    setCode(newCode);
    inputRefs.current[Math.min(pastedData.length, 3)]?.focus();
  };

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 4) {
      setError("Please enter the complete 4-digit code.");
      return;
    }

    setError(null);
    setVerifying(true);

    try {
      // 1. Verify code and Create User via backend
      const verifyResponse = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gmail,
          code: verificationCode,
          password: password,
          username: username,
          phoneNumber: phoneNumber,
        }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || "Invalid code");
      }

      if (!password) {
        throw new Error("Missing password for authentication.");
      }

      // User is now created/verified on backend. Sign in.
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: gmail!,
          password: password,
        });

      if (signInError) throw signInError;

      const userId = signInData.user.id;

      // 3. Create/Update Profile (optional if backend didn't handle profile table)
      // Since backend only created Auth user, we still need to create public profile here if needed.
      if (userId) {
        await createProfile(
          {
            username: username ?? "",
            email: gmail!,
            phone_number: phoneNumber ?? "",
          },
          userId,
        );
      }

      navigate("/set-location");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!gmail) return;
    setError(null);
    setResending(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend code");
      }
    } catch (e: any) {
      setError(e?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <MotionContainer className="w-full">
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="w-full px-6 py-4 min-h-screen lg:flex">
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
                    <span>Verify Code </span>
                    <RxLightningBolt color="yellow" />{" "}
                  </h1>
                  <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
                    We sent a 4-digit code to{" "}
                    <span className="font-bold text-(--neutral-700) dark:text-(--neutral-150)">
                      {gmail || "your email"}
                    </span>
                    . Enter it below to continue.
                  </p>
                </PopIn>

                <motion.form
                  onSubmit={handleVerify}
                  variants={fadeIn}
                  initial="hidden"
                  animate="show"
                  className="mt-10 flex flex-col items-center justify-center gap-6"
                >
                  <div className="flex gap-4">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-14 h-14 lg:w-16 lg:h-16 text-center text-2xl font-bold border border-(--neutral-150) rounded-xl outline-none focus:border-(--purple-2) dark:bg-(--dark-mode-input-bg) dark:border-(--neutral-600) dark:text-white transition-colors"
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-center font-semibold text-sm text-red-500">
                      {error}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={verifying || code.join("").length !== 4}
                    className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white outline-none border-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-semibold"
                  >
                    {verifying ? (
                      <ClipLoader color="white" size={19} />
                    ) : (
                      "Verify & Continue"
                    )}
                  </motion.button>
                </motion.form>

                <p className="text-center mt-6 lg:mt-[42px] font-semibold text-base text-(--neutral-500) dark:text-white">
                  Didn't receive code?{" "}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-bold text-(--yellow-1) cursor-pointer disabled:opacity-60"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? "Resending..." : "Resend Code"}
                  </motion.button>
                </p>
              </div>
              <div className="w-full flex items-center gap-6 text-center mt-[150px] lg:mt-[200px]">
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
