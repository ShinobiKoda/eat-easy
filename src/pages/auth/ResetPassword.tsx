import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";
import { motion } from "motion/react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ThemeSwitchButton from "../../components/ThemeSwitchButton";
import AsideCard from "../../components/AsideCard";
import { MotionContainer, fadeIn, popIn } from "../../components/animations/motion";
import { supabase } from "../../config/supabaseClient";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setReady(!!data.session);
    };
    checkSession();
  }, []);

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
      navigate("/login");
    } catch (err: any) {
      setSubmitError(
        err?.message || "Failed to reset password. Please try again."
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
      <div className="w-full min-h-dvh lg:grid lg:grid-cols-2 lg:gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-h-dvh max-w-[480px] mx-auto flex flex-col pt-[72px] lg:pt-[100px] px-6"
        >
          <motion.div
            variants={popIn}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full text-center px-6 lg:pt-0 space-y-3.5"
          >
            <h1 className="text-(--neutral-800) dark:text-white font-medium text-[22px] lg:text-[40px] heading-font">
              Reset Password
            </h1>
            <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
              Enter a new password for your account.
            </p>
          </motion.div>

          {!ready && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <ClipLoader color="var(--purple-2)" size={24} />
              <p className="text-(--neutral-600) dark:text-(--neutral-150)">
                Preparing secure reset session...
              </p>
            </div>
          )}

          <MotionContainer className="flex flex-col w-full mt-10 gap-10">
            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <div className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) flex items-center justify-between dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      onChange: () => clearErrors("password"),
                    })}
                    className="outline-none w-full"
                    placeholder="New Password"
                    disabled={!ready}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="ml-2"
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

            <motion.div variants={fadeIn}>
              <div className="flex flex-col gap-2">
                <div className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) flex items-center justify-between dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword", {
                      onChange: () => clearErrors("confirmPassword"),
                    })}
                    className="outline-none w-full"
                    placeholder="Confirm New Password"
                    disabled={!ready}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="ml-2"
                  >
                    {showConfirm ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400">
                    {errors.confirmPassword.message}
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
            className="w-full lg:mt-[214px] mt-[124px]"
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
              disabled={isSubmitting || !ready}
              className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white oultine-none border-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <ClipLoader color="white" size={19} />
              ) : (
                "Update Password"
              )}
            </motion.button>
          </motion.div>
        </form>

        <AsideCard />
      </div>
    </div>
  );
}

export default ResetPassword;

