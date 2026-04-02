import React, { useState } from "react";
import Header from "../layout/Header";
import SEO from "../SEO";
import {
  MotionContainer,
  FadeIn,
  PopIn,
} from "../animations/motion";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import {
  IoRestaurantOutline,
  IoSparklesOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import {
  HiOutlineLightBulb,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineHeart,
} from "react-icons/hi2";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";

/* ─── FAQ Data ─── */
const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the Full Menu, tap any dish to view details, then add it to your cart. When you're ready, open your cart from the sidebar and hit 'Send Order'. Your order will be prepared and you can track its status in real time.",
  },
  {
    question: "Can I customise my order?",
    answer:
      "Absolutely! When viewing a dish you can select toppings, adjust quantity, and leave special instructions before adding it to your cart.",
  },
  {
    question: "How does the Smart Assistant work?",
    answer:
      "Our AI-powered Smart Assistant asks about your budget, party size, and food preferences, then generates a personalised meal recommendation tailored just for you. It's like having a personal food concierge!",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards, mobile payments (Apple Pay, Google Pay), and EatEasy credit points earned through our rewards programme.",
  },
  {
    question: "How do rewards and points work?",
    answer:
      "Every order earns you credit points. Accumulate points to unlock discounts, free dishes, and exclusive offers. Visit the My Rewards page to track your balance and claim rewards.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "You can modify your order before it's confirmed. Once the restaurant starts preparing it, changes aren't possible — but you can always contact support for help.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We use industry-standard encryption and never share your personal data with third parties. Your privacy is our priority.",
  },
  {
    question: "How do I change my delivery location?",
    answer:
      "Tap the location icon in the header to update your address. You can use GPS auto-detect or enter a custom address manually.",
  },
];

/* ─── Story Highlights ─── */
const storyHighlights = [
  {
    icon: <HiOutlineLightBulb size={28} className="text-(--yellow-1)" />,
    title: "The Idea",
    text: "EatEasy started with a simple question: why is ordering food still so complicated? We set out to build something effortless.",
  },
  {
    icon: <IoSparklesOutline size={28} className="text-(--purple-2)" />,
    title: "Smart by Design",
    text: "We wove AI into every corner — from personalised recommendations to a smart assistant that learns your taste over time.",
  },
  {
    icon: <HiOutlineHeart size={28} className="text-(--orange-1)" />,
    title: "Built with Love",
    text: "Every pixel, animation, and interaction is crafted to make your dining experience delightful, whether you're ordering for one or a party of ten.",
  },
];

/* ─── Quick Links ─── */
const quickLinks = [
  {
    icon: <IoRestaurantOutline size={22} className="text-(--purple-2)" />,
    label: "Browse Menu",
    desc: "Explore all dishes and cuisines",
    href: "/FullMenu",
  },
  {
    icon: <RiShoppingBag3Line size={22} className="text-(--orange-1)" />,
    label: "Order Status",
    desc: "Track your active orders",
    href: "/OrderStatus",
  },
  {
    icon: <MdOutlineDeliveryDining size={22} className="text-(--yellow-1)" />,
    label: "Rewards",
    desc: "View and claim your rewards",
    href: "/rewards",
  },
  {
    icon: <IoShieldCheckmarkOutline size={22} className="text-green-500" />,
    label: "Smart Assistant",
    desc: "Get AI-powered meal suggestions",
    href: "/smart-assistant",
  },
];

/* ─── Accordion Item ─── */
const AccordionItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => (
  <motion.div
    layout
    className="bg-white dark:bg-(--neutral-700) rounded-2xl shadow-sm overflow-hidden"
  >
    <motion.button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left group"
      whileTap={{ scale: 0.995 }}
    >
      <span className="font-semibold text-[15px] text-(--neutral-800) dark:text-white pr-4">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="shrink-0"
      >
        <FiChevronDown
          size={20}
          className="text-(--neutral-400) dark:text-(--neutral-300)"
        />
      </motion.div>
    </motion.button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="px-5 pb-4">
            <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-300) leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ─── Help Page ─── */
const Help: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen">
      <SEO
        title="Help & FAQ | EatEasy"
        description="Find answers to frequently asked questions and learn more about EatEasy."
      />

      <MotionContainer className="transition-all duration-300">
        <Header
          title="Support"
          description="Help & FAQ"
          navbarTitle="Help & FAQ"
        />

        <div className="w-full pt-18 md:pt-30 pb-12 max-w-[1440px] mx-auto">
          <div className="px-6 lg:px-[42px] space-y-10">
            {/* ── Hero Banner ── */}
            <PopIn>
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-(--purple-2) to-(--purple-3) p-8 sm:p-10 lg:p-12">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />

                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineChatBubbleLeftRight
                      size={24}
                      className="text-white/80"
                    />
                    <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                      Help Centre
                    </span>
                  </div>
                  <h1 className="heading-font text-white font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight">
                    How can we
                    <br />
                    help you today?
                  </h1>
                  <p className="mt-3 text-white/70 text-base font-medium max-w-md">
                    Browse our FAQ below or reach out — we're always happy to
                    help.
                  </p>
                </div>
              </div>
            </PopIn>

            {/* ── Our Story ── */}
            <div>
              <FadeIn>
                <h2 className="heading-font font-bold text-[20px] text-(--neutral-800) dark:text-white mb-2">
                  Our Story
                </h2>
                <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) max-w-2xl mb-6">
                  EatEasy was born from a passion for great food and great
                  technology. Here's the journey in a nutshell.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {storyHighlights.map((item, i) => (
                  <FadeIn key={i}>
                    <div className="bg-white dark:bg-(--neutral-700) rounded-2xl p-6 shadow-sm h-full flex flex-col gap-3">
                      <div className="w-12 h-12 rounded-xl bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-base text-(--neutral-800) dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-300) leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ── FAQ Section ── */}
            <div>
              <FadeIn>
                <h2 className="heading-font font-bold text-[20px] text-(--neutral-800) dark:text-white mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) mb-6">
                  Quick answers to common questions.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {faqs.map((faq, i) => (
                  <FadeIn key={i}>
                    <AccordionItem
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === i}
                      onToggle={() =>
                        setOpenIndex(openIndex === i ? null : i)
                      }
                    />
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <FadeIn>
                <h2 className="heading-font font-bold text-[20px] text-(--neutral-800) dark:text-white mb-2">
                  Quick Links
                </h2>
                <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) mb-6">
                  Jump to key areas of the app.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, i) => (
                  <FadeIn key={i}>
                    <motion.a
                      href={link.href}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white dark:bg-(--neutral-700) rounded-2xl p-5 shadow-sm flex items-center gap-4 cursor-pointer no-underline"
                    >
                      <div className="w-11 h-11 rounded-xl bg-(--neutral-100) dark:bg-(--neutral-600) flex items-center justify-center shrink-0">
                        {link.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-[15px] text-(--neutral-800) dark:text-white">
                          {link.label}
                        </p>
                        <p className="text-xs font-medium text-(--neutral-500) dark:text-(--neutral-400)">
                          {link.desc}
                        </p>
                      </div>
                    </motion.a>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ── Contact / Support CTA ── */}
            <FadeIn>
              <div className="bg-white dark:bg-(--neutral-700) rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                <div className="w-16 h-16 rounded-2xl bg-(--purple-2)/10 flex items-center justify-center shrink-0">
                  <HiOutlineEnvelope
                    size={32}
                    className="text-(--purple-2)"
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="heading-font font-bold text-lg text-(--neutral-800) dark:text-white">
                    Still need help?
                  </h3>
                  <p className="text-sm font-medium text-(--neutral-500) dark:text-(--neutral-400) mt-1 max-w-md">
                    Our support team is just an email away. We usually reply
                    within a few hours.
                  </p>
                </div>
                <motion.a
                  href="mailto:support@eateasy.com"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 rounded-2xl bg-(--purple-2) text-white font-semibold text-sm cursor-pointer no-underline whitespace-nowrap"
                >
                  Contact Support
                </motion.a>
              </div>
            </FadeIn>

            {/* ── Footer ── */}
            <FadeIn>
              <div className="text-center pt-4 pb-6 space-y-1">
                <p className="text-sm font-semibold text-(--neutral-400) dark:text-(--neutral-500)">
                  <span className="font-medium text-(--neutral-800) dark:text-(--neutral-100)">
                    Eat
                  </span>
                  <span className="font-bold text-(--orange-1)">Easy</span>{" "}
                  &middot; Making meals effortless
                </p>
                <p className="text-xs font-medium text-(--neutral-400) dark:text-(--neutral-500)">
                  &copy; {new Date().getFullYear()} EatEasy. All rights
                  reserved.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Help;
