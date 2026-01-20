import React, { useState } from 'react'
import { useEffect } from 'react';
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
