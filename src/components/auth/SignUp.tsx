import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas/SignupSchema";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MotionContainer, fadeIn, popIn } from "../animations/motion";
import { z } from "zod";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import AsideCard from "../onboarding/AsideCard";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { supabase } from "../../config/supabaseClient";
import { Link } from "react-router-dom";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (data: z.infer<typeof SignUpSchema>) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      // Pre-check: attempt signUp to detect existing account
      const { error: precheckError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-url`,
          data: {
            username: data.username,
            phone_number: data.phoneNumber ?? "",
          },
        },
      });

      if (precheckError) {
        // Supabase returns a specific message when the user exists
        const msg = precheckError.message?.toLowerCase() || "";
        if (
          msg.includes("already registered") ||
          msg.includes("user already exists") ||
          precheckError.status === 400
        ) {
          setSubmitError("This email is already registered. Please log in.");
          return; // Do not send magic link or navigate
        }
        throw precheckError;
      }

      // If signUp succeeded, ensure no active session so we wait for the magic link
      await supabase.auth.signOut();

      // Proceed to send magic link for sign-in completion
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/verify-url`,
          data: {
            username: data.username,
            phone_number: data.phoneNumber ?? "",
          },
        },
      });

      if (error) throw error;

      navigate("/verify-url", {
        state: {
          email: data.email,
          username: data.username,
          phoneNumber: data.phoneNumber,
          password: data.password,
        },
      });
    } catch (err: any) {
      setSubmitError(
        err?.message || "Failed to send verification code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="absolute top-2 right-2 z-50">
        <ThemeSwitchButton />
      </div>
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="w-full min-h-screen max-w-[480px] mx-auto flex flex-col pt-[72px] lg:pt-[100px] px-6"
        >
          <motion.div
            variants={popIn}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full text-center px-6 lg:pt-0 space-y-3.5"
          >
            <h1 className="text-(--neutral-800) dark:text-white font-medium text-[22px] lg:text-[40px] heading-font">
              Getting Started ✌{" "}
            </h1>
            <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
              Looks like you're new to us! Create an account for a complete
              experience.
            </p>
          </motion.div>

          <MotionContainer className="flex flex-col w-full mt-10 gap-10">
            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  {...register("username", {
                    onChange: () => clearErrors("username"),
                  })}
                  className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  {...register("email", {
                    onChange: () => clearErrors("email"),
                  })}
                  className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <Controller
                  name="phoneNumber"
                  defaultValue={undefined}
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry="NG"
                      placeholder="Phone Number"
                      onChange={(value) => {
                        field.onChange(value);
                        clearErrors("phoneNumber");
                      }}
                      className="phone-input"
                    />
                  )}
                />

                {errors.phoneNumber && (
                  <p className="text-sm text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <div className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) flex items-center justify-between dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      onChange: () => clearErrors("password"),
                    })}
                    className="outline-none w-full"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="ml-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </motion.div>
          </MotionContainer>

          <motion.div
            variants={popIn}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full mt-[50px]"
          >
            {submitError && (
              <p className="mb-3 text-sm text-red-500 text-center">
                {submitError}
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white oultine-none border-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? <ClipLoader color="white" size={19} /> : "Next"}
            </motion.button>
            <p className="text-center mt-3 font-semibold text-(--neutral-500) dark:text-(--neutral-150)">
              Already have an account?{" "}
              <Link to="/login" className="text-(--yellow-1)">
                Sign in
              </Link>
            </p>
          </motion.div>
        </form>

        <AsideCard />
      </div>
    </div>
  );
}

export default SignUp;
