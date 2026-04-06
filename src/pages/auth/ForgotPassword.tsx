import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ThemeSwitchButton from "../../components/ThemeSwitchButton";
import AsideCard from "../../components/AsideCard";
import { MotionContainer, fadeIn, popIn } from "../../components/animations/motion";
import { supabase } from "../../config/supabaseClient";

const ForgotSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof ForgotSchema>) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      // If you have a reset handler route in-app, set emailRedirectTo to it
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      navigate("/reset-email-sent", { state: { email: data.email } });
    } catch (err: any) {
      setSubmitError(
        err?.message || "Failed to send reset email. Please try again.",
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
          onSubmit={handleSubmit(onSubmit)}
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
              Forgot Password 🔐
            </h1>
            <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
              Enter the email associated with your account.
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
                "Send Reset Link"
              )}
            </motion.button>
          </motion.div>
        </form>

        <AsideCard />
      </div>
    </div>
  );
}

export default ForgotPassword;
