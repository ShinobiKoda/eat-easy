import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
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
    link: "/recommended"
  },
  {
    icon: "/images/menu-icon.svg",
    title: "Go to the menu",
    description: "If you already know what to order, this is the best choice",
    link: "/FullMenu"
  },
];

const Welcome: React.FC = () => {
  return (
    <div className="w-full min-h-screen mb-10">
      <MotionContainer className={`transition-all duration-300`}>
        <Header description="Browse Our Food Menu" navbarTitle="Gbam Gbistro" />
        <div className="w-full pt-[60px] lg:pt-[120px] px-6 lg:px-[42px]">
          <PopIn className="heading-font text-(--neutral-800) font-medium text-[22px] text-center dark:text-white lg:hidden">
            Let's find the perfect dish for you
          </PopIn>

          <div
            className="w-full hidden md:flex md:items-stretch md:justify-between bg-(--neutral-900) dark:bg-(--neutral-150) rounded-[28.67px] px-[50px] "
          >
            {/* Text */}
            <FadeIn className="space-y-6 py-[50px]">
              <h1 className="text-[32px]">
                <span className="heading-font text-white dark:text-(--neutral-800) font-normal">
                  Welcome to
                </span>
                <br />
                <span className="font-bold heading-font text-white dark:text-(--neutral-800)">
                  Gram Bistro Restaurant 📍
                </span>
              </h1>

              <div className="flex flex-col xl:flex-row gap-2 xl:gap-6">
                <p className="flex items-center gap-2">
                  <CiLocationOn size={24} className="text-(--yellow-1)" />
                  <span className="whitespace-nowrap text-(--neutral-400)  dark:text-(--neutral-600) font-medium text-base">
                    790 8th Ave, New York
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <IoTimeOutline size={24} className="text-(--yellow-1)" />
                  <span className="whitespace-nowrap text-(--neutral-400)  dark:text-(--neutral-600) font-medium text-base">
                    Mon - Sun: 12AM - 10PM
                  </span>
                </p>
              </div>
            </FadeIn>

            {/* Image */}
            <PopIn className="max-w-[443px] -mr-10 lg:mb-0">
              <img
                src="/images/welcome-page-illustration.svg"
                alt="Welcome Page Illustration"
                className="w-full h-full"
              />
            </PopIn>
          </div>

          <div className="w-full lg:grid lg:grid-cols-2 lg:items-center lg:justify-between lg:mt-8">
            <div className="space-y-2 hidden lg:block max-w-[370px] xl:max-w-[514px]">
              <h2 className="font-bold text-3xl text-(--neutral-800) heading-font">
                Find Your Flavor: <br /> Two Options to Browse Our Menu
              </h2>
              <p className="text-(--neutral-600) font-bold text-base">
                We've got you covered! Whether you're feeling adventurous or
                know exactly what you want, we offer two ways to browse our menu
                that cater to your mood.
              </p>
            </div>
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
                    <Link to={option.link}>
                      <ScaleButton className="w-[46px] h-[46px] rounded-xl bg-(--orange-5) dark:bg-(--orange-1) flex items-center justify-center mt-auto">
                        <FaArrowRight className="text-(--orange-1) dark:text-white" />
                      </ScaleButton>
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </MotionContainer>
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default Welcome;
