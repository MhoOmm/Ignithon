import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import Sdg3 from "../src/assets/sdg3.png";
import FancyButton from "./FancyButton";

const Home = () => {
  const typedEl = useRef(null); // Reference for typed text
  const typedInstance = useRef(null); // Keep instance for cleanup

  useEffect(() => {
    typedInstance.current = new Typed(typedEl.current, {
      strings: ["Detect Early.", "Act Wisely.", "Live Healthy."],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: false, // disable cursor
    });

    return () => {
      typedInstance.current.destroy(); // cleanup on unmount
    };
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6">
      {/* container */}
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl">
        {/* left */}
        <div className="flex justify-center">
          <img
            src={Sdg3}
            alt="SDG3 Illustration"
            className="w-72 md:w-[38rem] drop-shadow-2xl animate-fadeIn"
          />
        </div>

        {/* right */}
        <div className="flex-1 text-center md:text-left space-y-12">
          {/* heading with ghost text to prevent layout jump */}
          <div className="relative inline-block">
            {/* ghost text for stable sizing */}
            <h1 className="text-3xl md:text-5xl font-bold text-[#6366F1] opacity-0 select-none">
              Live Healthy.
            </h1>

            {/* actual typed text */}
            <h1
              ref={typedEl}
              className="absolute top-0 left-0 text-3xl md:text-5xl font-bold text-[#6366F1] leading-tight"
            ></h1>
          </div>

          <p className="text-lg md:text-xl text-gray-700 max-w-lg font-semibold">
            A smart health companion that predicts risks, suggests preventive
            actions, and supports well-being — combining AI insights with data
            privacy through federated learning.
          </p>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <FancyButton label="Talk to Bot" color="#6366F1" />
            <FancyButton
              label="Risk Checkup"
              color="#6366F1"
              text="black"
              backgroundColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
