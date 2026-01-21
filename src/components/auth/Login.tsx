import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "../../schemas/LoginSchema";
import { motion } from "motion/react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";
import ThemeSwitchButton from "../ThemeSwitchButton";
import AsideCard from "../onboarding/AsideCard";
import { MotionContainer, fadeIn, popIn } from "../animations/motion";
import { supabase } from "../../config/supabaseClient";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onLogin = async (data: z.infer<typeof LoginSchema>) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate("/set-location");
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to sign in. Please try again.");
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
          onSubmit={handleSubmit(onLogin)}
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
              Welcome Back 👋
            </h1>
            <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
              Sign in to continue your delicious journey.
            </p>
          </motion.div>

          <MotionContainer className="flex flex-col w-full mt-10 gap-10">
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
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-(--yellow-1)"
                  >
                    Forgot password?
                  </Link>
                </div>
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
              {isSubmitting ? (
                <ClipLoader color="white" size={19} />
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.div>
        </form>

        <AsideCard />
      </div>
    </div>
  );
}

export default Login;
