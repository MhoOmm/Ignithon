// Home.jsx
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import Sdg3 from "../src/assets/sdg3.png";
import FancyButton from "./FancyButton";
import { NavLink } from "react-router";

const Home = () => {
  const typedEl = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Initialize Typed.js
    typedInstance.current = new Typed(typedEl.current, {
      strings: ["Detect Early.", "Act Wisely.", "Live Healthy."],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: false,
    });

    return () => typedInstance.current.destroy();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start px-6 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-6xl w-full">
        
        {/* Left: Image */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={Sdg3}
            alt="SDG3 Illustration"
            className="w-72 sm:w-80 md:w-[28rem] lg:w-[38rem] drop-shadow-2xl animate-fadeIn"
          />
        </div>

        {/* Right: Text & Buttons */}
        <div className="flex-1 text-center md:text-left space-y-8 sm:space-y-10 w-full md:w-1/2">
          
          {/* Heading with Typed.js */}
          <div className="relative inline-block w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#6366F1] opacity-0 select-none">
              Live Healthy.
            </h1>

            <h1
              ref={typedEl}
              className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#6366F1] leading-tight"
            ></h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-lg font-medium mx-auto md:mx-0">
            A smart health companion that predicts risks, suggests preventive
            actions, and supports well-being — combining AI insights with data
            privacy through federated learning.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <NavLink to="">
              <FancyButton label="Talk to Bot" color="#6366F1" />
            </NavLink>
            <NavLink to="/riskform">
              <FancyButton
                label="Risk Checkup"
                color="#6366F1"
                text="black"
                backgroundColor="white"
              />
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
