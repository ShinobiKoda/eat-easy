import Choice from '/images/choiceimg.svg';
import { useState, useEffect } from 'react';
import { motion, easeInOut } from 'framer-motion'

const Product = [
  { id: 1, name: "Avocado Chicken Salad", price: "$10.00", image: Choice, description: "Product of the day" },
  { id: 2, name: "Grilled Salmon Bowl", price: "$12.50", image: Choice, description: "Chef's special" },
  { id: 3, name: "Vegan Buddha Bowl", price: "$9.80", image: Choice, description: "Healthy pick" },
  { id: 4, name: "Quinoa Power Salad", price: "$11.20", image: Choice, description: "Energizer" },
];

const ProductCarousel = () => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % Product.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [Product.length]);

    const getPosition = (itemIndex: number) => {
        if (itemIndex === index) return "center";

        // for the leaving card
        const prevIndex = index === 0 ? Product.length - 1 : index - 1;

        if (itemIndex === prevIndex) return "left";

        // for the entering card
        const nextIndex = index === Product.length - 1 ? 0 : index + 1;

        if (itemIndex === nextIndex) return "right";

        return "hidden"
    }


  const variants = {
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: easeInOut }
    },
    left: {
      x: "-97%",
      scale: 0.85,
      opacity: 0.4,
      transition: { duration: 0.8, ease: easeInOut }
    },
    right: {
      x: "97%",
      scale: 0.85,
      opacity: 0.4,
      transition: { duration: 0.8, ease: easeInOut }
    },
    hidden: {
      x: "0%",
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: easeInOut }
    }
  };

  return (
    <div className="py-4 flex items-center justify-center overflow-hidden w-full relative h-[145px] md:h-[250px] ">
            {/* products */}
            {Product.map(({ id, name, price, image, description }, i) =>{
                const pos = getPosition(i);
                let zIndex = 0;
                if (pos === "center") zIndex = 10;
                else if (pos === "left" || pos === "right") zIndex = 5;
                else zIndex = 0;
                return (
                    <motion.div 
                        initial="hidden"
                        animate={pos}
                        variants={variants}
                        key={id} 
                        style={{ zIndex }}
                        className="overflow-clip rounded-2xl dark:bg-white bg-[#4A4A6A] flex items-center justify-between gap-2 h-full absolute w-[85%] sm:w-[78%]"
                    >

                        <div className="flex-1 space-y-2 sm:space-y-3 relative left-4 w-full py-3">
                            <p className="text-sm text-gray-400 tracking-wide">{description}</p>

                            <h2 className=" text-white dark:text-[#4A4A6A] font-semibold leading-tight text-[clamp(1rem,3vw,2rem)]">{name}</h2>

                            <p className=" text-(--yellow-1) font-bold text-[clamp(1.25rem,3vw,2.25rem)]">{price}</p>
                        </div>

                        <div className="h-full w-full max-w-[190px] sm:max-w-[285px] lg:max-w-[416px] flex items-center justify-center relative -right-10 sm:right-0">
                            <img
                                src={image}
                                alt="Avocado Chicken Salad"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </motion.div>
                )
            })}

        </div>
  )
}

export default ProductCarousel