import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../config/supabaseClient";
import Header from "../layout/Header";
import SEO from "../SEO";
import {
  MotionContainer,
  FadeIn,
  PopIn,
  SlideIn,
  staggerContainer,
  fadeIn,
} from "../animations/motion";
import { ClipLoader } from "react-spinners";
import { IoCameraOutline, IoCheckmark, IoClose } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { LuMail, LuUser, LuPhone, LuCalendar, LuMapPin } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiMedalThin } from "react-icons/pi";
import { MdOutlineHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileField {
  label: string;
  key: string;
  value: string;
  icon: React.ReactNode;
  editable: boolean;
  placeholder: string;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: "yellow" | "purple" | "orange";
}) => {
  const bg =
    accent === "yellow"
      ? "bg-(--yellow-1)/10"
      : accent === "purple"
        ? "bg-(--purple-2)/10"
        : "bg-(--orange-1)/10";
  const iconColor =
    accent === "yellow"
      ? "text-(--yellow-1)"
      : accent === "purple"
        ? "text-(--purple-2)"
        : "text-(--orange-1)";

  return (
    <motion.div
      variants={fadeIn}
      className="flex-1 min-w-[120px] bg-white dark:bg-(--neutral-700) rounded-2xl p-4 shadow-sm flex flex-col gap-3"
    >
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-xl font-bold text-(--neutral-800) dark:text-white heading-font">
          {value}
        </p>
        <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400)">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Quick Link ───────────────────────────────────────────────────────────────

const QuickLink = ({
  to,
  icon,
  label,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) => (
  <motion.div variants={fadeIn}>
    <NavLink to={to}>
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="flex items-center gap-4 bg-white dark:bg-(--neutral-700) rounded-2xl px-5 py-4 shadow-sm cursor-pointer group"
      >
        <div className="w-11 h-11 rounded-xl bg-(--purple-2)/10 flex items-center justify-center shrink-0 group-hover:bg-(--purple-2) transition-colors duration-200">
          <span className="text-(--purple-2) group-hover:text-white transition-colors duration-200">
            {icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
            {label}
          </p>
          <p className="font-medium text-xs text-(--neutral-500) dark:text-(--neutral-400) truncate">
            {description}
          </p>
        </div>
        <motion.div
          className="w-7 h-7 rounded-lg bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center shrink-0"
          whileHover={{ x: 2 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-(--neutral-500) dark:text-(--neutral-300)"
            />
          </svg>
        </motion.div>
      </motion.div>
    </NavLink>
  </motion.div>
);

// ─── Editable Field ───────────────────────────────────────────────────────────

const EditableField = ({
  field,
  onSave,
  saving,
}: {
  field: ProfileField;
  onSave: (key: string, value: string) => Promise<void>;
  saving: string | null;
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(field.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(field.value);
  }, [field.value]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = async () => {
    if (draft.trim() === field.value) {
      setEditing(false);
      return;
    }
    await onSave(field.key, draft.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(field.value);
    setEditing(false);
  };

  return (
    <motion.div
      variants={fadeIn}
      className="flex items-center gap-4 bg-white dark:bg-(--neutral-700) rounded-2xl px-5 py-4 shadow-sm"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center shrink-0">
        <span className="text-(--neutral-500) dark:text-(--neutral-300)">
          {field.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-(--neutral-500) dark:text-(--neutral-400) mb-0.5">
          {field.label}
        </p>
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.input
              key="input"
              ref={inputRef}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              className="w-full outline-none bg-transparent font-semibold text-sm text-(--neutral-800) dark:text-white border-b border-(--purple-3) pb-0.5"
              placeholder={field.placeholder}
            />
          ) : (
            <motion.p
              key="value"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="font-semibold text-sm text-(--neutral-800) dark:text-white truncate"
            >
              {field.value || (
                <span className="text-(--neutral-400) font-medium italic">
                  {field.placeholder}
                </span>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      {field.editable && (
        <div className="flex items-center gap-2 shrink-0">
          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit-actions"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-1.5"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  disabled={saving === field.key}
                  className="w-8 h-8 rounded-lg bg-(--purple-2) flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {saving === field.key ? (
                    <ClipLoader color="white" size={12} />
                  ) : (
                    <IoCheckmark size={16} className="text-white" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="w-8 h-8 rounded-lg bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center cursor-pointer"
                >
                  <IoClose size={16} className="text-(--neutral-500) dark:text-(--neutral-300)" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                key="edit-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setEditing(true)}
                className="w-8 h-8 rounded-lg bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center cursor-pointer"
              >
                <MdOutlineEdit size={16} className="text-(--neutral-500) dark:text-(--neutral-300)" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Avatar: gradient colours cycling through app palette
const avatarGradients = [
  "linear-gradient(135deg, #615793, #ff7b2c)",
  "linear-gradient(135deg, #32324d, #615793)",
  "linear-gradient(135deg, #ffb01d, #ff7b2c)",
  "linear-gradient(135deg, #615793, #ffb01d)",
];

function pickGradient(name: string) {
  let code = 0;
  for (let i = 0; i < name.length; i++) code += name.charCodeAt(i);
  return avatarGradients[code % avatarGradients.length];
}

// ─── Main Profile Component ───────────────────────────────────────────────────

const Profile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const meta = (user?.user_metadata as any) || {};
  const provider = user?.app_metadata?.provider || "email";

  const displayName =
    meta?.full_name || meta?.username || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  const phone = meta?.phone || "";
  const username = meta?.username || user?.email?.split("@")[0] || "";
  // Only treat as a real uploaded avatar if it exists in metadata
  const avatarUrl = meta?.avatar_url || null;
  const initials = getInitials(displayName);
  const avatarGradient = pickGradient(displayName);
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const fields: ProfileField[] = [
    {
      label: "Username",
      key: "username",
      value: username,
      icon: <LuUser size={18} />,
      editable: true,
      placeholder: "Enter username",
    },
    {
      label: "Email Address",
      key: "email",
      value: email,
      icon: <LuMail size={18} />,
      editable: false,
      placeholder: "—",
    },
    {
      label: "Phone Number",
      key: "phone",
      value: phone,
      icon: <LuPhone size={18} />,
      editable: true,
      placeholder: "Add phone number",
    },
    {
      label: "Full Name",
      key: "full_name",
      value: meta?.full_name || "",
      icon: <RiShieldUserLine size={18} />,
      editable: provider === "email",
      placeholder: "Enter full name",
    },
    {
      label: "Member Since",
      key: "joined",
      value: joinedDate,
      icon: <LuCalendar size={18} />,
      editable: false,
      placeholder: "—",
    },
  ];

  const handleSaveField = async (key: string, value: string) => {
    setSaving(key);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { [key]: value },
      });
      if (error) throw error;
      await refreshUser();
      setSaveSuccess(key);
      setTimeout(() => setSaveSuccess(null), 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(null);
    }
  };

  const handleAvatarClick = () => {
    if (provider === "email") fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setAvatarLoading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl },
      });
      await refreshUser();
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <SEO
        title="My Profile | EatEasy"
        description="Manage your EatEasy profile, preferences, and account details."
      />
      <MotionContainer>
        <Header title="Account" description="My Profile" />

        <div className="w-full pt-[72px] md:pt-[88px] lg:pt-[100px] px-5 lg:px-[42px] pb-16 max-w-[860px] mx-auto lg:max-w-none">

          {/* ── Hero banner + avatar ───────────────────────────────── */}
          <SlideIn direction="down">
            <div className="relative w-full rounded-3xl overflow-hidden mb-8 mt-4 shadow-sm">
              {/* Banner gradient */}
              <div
                className="w-full h-[120px] md:h-[160px]"
                style={{
                  background:
                    "linear-gradient(135deg, #615793 0%, #32324d 50%, #ff7b2c 100%)",
                }}
              />
              {/* Decorative dots */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Avatar + name row */}
              <div className="bg-white dark:bg-(--neutral-700) px-5 md:px-8 pb-5 pt-0">
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-5">
                  {/* Avatar */}
                  <div className="relative -mt-12 shrink-0 self-start sm:self-auto">
                    <motion.div
                      whileHover={provider === "email" ? { scale: 1.04 } : {}}
                      className="relative w-[88px] h-[88px] md:w-[100px] md:h-[100px] cursor-pointer"
                      onClick={handleAvatarClick}
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Profile avatar"
                          className="w-full h-full rounded-full object-cover border-4 border-white dark:border-(--neutral-700) shadow-md"
                        />
                      ) : (
                        <div
                          className="w-full h-full rounded-full border-4 border-white dark:border-(--neutral-700) shadow-md flex items-center justify-center select-none"
                          style={{ background: avatarGradient }}
                        >
                          <span className="text-white font-bold text-2xl md:text-3xl heading-font tracking-wide">
                            {initials}
                          </span>
                        </div>
                      )}

                      {/* Camera overlay — email accounts only */}
                      {provider === "email" && (
                        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          {avatarLoading ? (
                            <ClipLoader color="white" size={20} />
                          ) : (
                            <IoCameraOutline size={22} className="text-white" />
                          )}
                        </div>
                      )}
                    </motion.div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>

                  {/* Name & badge */}
                  <div className="mt-3 sm:mt-0 sm:mb-1 flex-1 min-w-0">
                    <h1 className="heading-font font-bold text-xl md:text-2xl text-(--neutral-800) dark:text-white truncate">
                      {displayName}
                    </h1>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <span className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) truncate">
                        {email}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          provider === "google"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-(--purple-2)/10 text-(--purple-2) dark:text-(--purple-5)"
                        }`}
                      >
                        {provider === "google" ? "Google" : "Email"} Account
                      </span>
                    </div>
                  </div>

                  {/* Location pill */}
                  <div className="mt-3 sm:mt-0 sm:mb-1 shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-(--neutral-100) dark:bg-(--neutral-600) rounded-full">
                      <LuMapPin size={13} className="text-(--yellow-1)" />
                      <span className="text-xs font-semibold text-(--neutral-600) dark:text-(--neutral-300)">
                        Member since {joinedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

          <div className="lg:grid lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ── Left column ────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Stats row */}
              <PopIn>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col lg:flex-row gap-3 overflow-x-auto scrollbar-hidden pb-1"
                >
                  <StatCard
                    icon={<MdOutlineHistory size={20} />}
                    label="Total Orders"
                    value="—"
                    accent="purple"
                  />
                  <StatCard
                    icon={<PiMedalThin size={20} />}
                    label="Reward Points"
                    value="—"
                    accent="yellow"
                  />
                  <StatCard
                    icon={<HiOutlineSparkles size={20} />}
                    label="AI Assists"
                    value="—"
                    accent="orange"
                  />
                </motion.div>
              </PopIn>

              {/* Account info */}
              <FadeIn>
                <div className="space-y-3">
                  <h2 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white px-1">
                    Account Information
                  </h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-2.5"
                  >
                    {fields.map((field) => (
                      <EditableField
                        key={field.key}
                        field={field}
                        onSave={handleSaveField}
                        saving={saving}
                      />
                    ))}
                  </motion.div>
                </div>
              </FadeIn>

              {/* Save toast */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-(--neutral-900) dark:bg-white text-white dark:text-(--neutral-800) px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold"
                  >
                    <span className="w-6 h-6 rounded-full bg-(--yellow-1) flex items-center justify-center shrink-0">
                      <IoCheckmark size={14} className="text-white" />
                    </span>
                    Profile updated successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right column ───────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Quick navigation */}
              <FadeIn>
                <div className="space-y-3">
                  <h2 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white px-1">
                    Quick Navigation
                  </h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-2.5"
                  >
                    <QuickLink
                      to="/smart-assistant"
                      icon={<HiOutlineSparkles size={20} />}
                      label="Smart Assistant"
                      description="Let AI pick the perfect dish for you"
                    />
                    <QuickLink
                      to="/history"
                      icon={<MdOutlineHistory size={20} />}
                      label="Order History"
                      description="View all your past orders"
                    />
                    <QuickLink
                      to="/rewards"
                      icon={<PiMedalThin size={20} />}
                      label="My Rewards"
                      description="Check your points & redeem coupons"
                    />
                    <QuickLink
                      to="/FullMenu"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      }
                      label="Browse Full Menu"
                      description="Explore the complete food selection"
                    />
                  </motion.div>
                </div>
              </FadeIn>

              {/* Account security */}
              <FadeIn>
                <div className="space-y-3">
                  <h2 className="heading-font font-semibold text-base text-(--neutral-800) dark:text-white px-1">
                    Security
                  </h2>
                  <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-(--purple-2)/10 flex items-center justify-center">
                        <RiShieldUserLine size={20} className="text-(--purple-2)" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-(--neutral-800) dark:text-white">
                          Account Security
                        </p>
                        <p className="text-xs font-medium text-(--neutral-500) dark:text-(--neutral-400)">
                          {provider === "google"
                            ? "Secured by Google OAuth"
                            : "Password authentication"}
                        </p>
                      </div>
                    </div>

                    {provider === "email" && (
                      <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() =>
                          supabase.auth.resetPasswordForEmail(email, {
                            redirectTo: `${window.location.origin}/reset-password`,
                          })
                        }
                        className="w-full py-3 rounded-xl border border-(--neutral-200) dark:border-(--neutral-600) text-sm font-semibold text-(--neutral-700) dark:text-white hover:bg-(--neutral-100) dark:hover:bg-(--neutral-600) transition-colors cursor-pointer"
                      >
                        Change Password
                      </motion.button>
                    )}

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-(--yellow-1)/8 border border-(--yellow-1)/20">
                      <span className="text-[18px]">🔒</span>
                      <p className="text-xs font-medium text-(--neutral-600) dark:text-(--neutral-300)">
                        Your data is encrypted and never shared with third
                        parties.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Profile;
