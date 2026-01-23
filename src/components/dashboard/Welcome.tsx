import Header from "../layout/Header";
import { FaArrowRight } from "react-icons/fa";
import {
  PopIn,
  MotionContainer,
  FadeIn,
  ScaleButton,
} from "../animations/motion";

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
  return (
    <div className="w-full min-h-screen">
      <MotionContainer className={`transition-all duration-300 `}>
        <Header description="Browse Our Food Menu" navbarTitle="Gbam Gbistro" />
        <div className="w-full pt-[60px] px-6">
          <PopIn className="heading-font text-(--neutral-800) font-medium text-[22px] text-center dark:text-white">
            Let's find the perfect dish for you
          </PopIn>

          <MotionContainer className="mt-6 space-y-6">
            {options.map((option, index) => (
              <FadeIn key={index}>
                <div className="p-5 rounded-2xl bg-white shadow-md space-y-5 dark:bg-(--neutral-700)">
                  <img src={option.icon} alt="Option Icon" />
                  <div className="flex justify-between">
                    <div className="space-y-[23px] max-w-[225px]">
                      <h3 className="font-semibold text-base text-(--neutral-900) dark:text-white">
                        {option.title}
                      </h3>
                      <p className="text-(--neutral-500) font-medium text-sm dark:text-(--neutral-300)">
                        {option.description}
                      </p>
                    </div>
                    <ScaleButton className="w-[46px] h-[46px] rounded-xl bg-(--orange-5) dark:bg-(--orange-1) flex items-center justify-center mt-auto">
                      <FaArrowRight className="text-(--orange-1) dark:text-white" />
                    </ScaleButton>
                  </div>
                </div>
              </FadeIn>
            ))}
          </MotionContainer>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Welcome;
