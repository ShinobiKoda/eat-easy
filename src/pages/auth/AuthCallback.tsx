import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { createProfile } from "../../services/userProfile";
import { couponService } from "../../services/couponService";
import Loader from "../../components/Loader";

/**
 * Handles the redirect after Google OAuth sign-in.
 *
 * 1. Waits for the Supabase session to be established.
 * 2. Checks if the user already has a profile in `eat_easy_profile`.
 *    - **Existing user** → navigate straight to `/welcome`.
 *    - **New user** → create profile, grant welcome coupon, flag discount
 *      modal, then navigate to `/set-location`.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent double-processing in StrictMode
      if (processed.current) return;
      processed.current = true;

      try {
        // Wait for the auth session to be set from the URL hash/tokens
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          console.error(
            "[AuthCallback] No session after OAuth redirect:",
            sessionError,
          );
          navigate("/login", { replace: true });
          return;
        }

        const user = session.user;

        // Check if this user already has a profile row
        const { data: existingProfile } = await supabase
          .from("eat_easy_profile")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (existingProfile) {
          // ── Existing user ──
          navigate("/welcome", { replace: true });
        } else {
          // ── New user ──
          // Build profile from Google metadata
          const meta = user.user_metadata ?? {};
          await createProfile(
            {
              username:
                meta.full_name || meta.name || meta.email?.split("@")[0] || "",
              email: user.email ?? "",
              phone_number: meta.phone || "",
            },
            user.id,
          );

          // Grant 30 % welcome coupon
          await couponService.grantWelcomeCoupon(user.id);
          localStorage.setItem("eat-easy-show-welcome-discount", "true");

          navigate("/set-location", { replace: true });
        }
      } catch (err) {
        console.error("[AuthCallback] Error processing OAuth callback:", err);
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return <Loader />;
};

export default AuthCallback;
