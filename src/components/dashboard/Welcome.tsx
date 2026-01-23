import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../layout/Header";
import { FaArrowRight } from "react-icons/fa";

import Loader from "../Loader";

const options = [
  {
    icon: "/images/bulb-icon.svg",
    title: "Choose Virtual Assistant",
    description: "Simplify your decisions through our Smart Menu",
  },
  {
    icon: "/images/menu-icon.svg",
    title: "Go to the menu",
    description: "If you already know what to order, this is the best choice",
  },
];

const Welcome: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full min-h-screen">
      {showLoader && <Loader />}

      <div
        className={`transition-all duration-300 ${
          showLoader ? "pointer-events-none overflow-hidden" : ""
        }`}
      >
        <Header description="Browse Our Food Menu" navbarTitle="Gbam Gbistro" />
        <div className="w-full pt-[60px] px-6">
          <h1 className="heading-font text-(--neutral-800) font-medium text-[22px] text-center">
            Let's find the perfect dish for you
          </h1>

          <div className="mt-6 space-y-6">
            {options.map((option, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white shadow-md space-y-5"
              >
                <img src={option.icon} alt="Option Icon" />
                <div className="flex justify-between">
                  <div className="space-y-[23px] max-w-[225px]">
                    <h3 className="font-semibold text-base text-(--neutral-900)">
                      {option.title}
                    </h3>
                    <p className="text-(--neutral-500) font-medium text-sm">
                      {option.description}
                    </p>
                  </div>
                  <div className="w-[46px] h-[46px] rounded-xl bg-(--orange-5) flex items-center justify-center mt-auto">
                    <FaArrowRight className="text-(--orange-1)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
