import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import PopSign from "/images/popsign.png"
import Location from "/images/Map-pin.png"
import Time from "/images/time-img.png"
import Gram from "/images/Gram.png"
import Bulb from "/images/bulb-img.png"
import Book from "/images/menubook.png"
import { HiArrowSmRight } from "react-icons/hi";
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import Header from "./layout/Header";

import Loader from "./Loader";

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
       <Header description="Browse Our Food Menu"/>
       <div className="">

       </div>
      </div>
    </div>
  );
};

export default Welcome;
