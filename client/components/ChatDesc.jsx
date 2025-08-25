// ChatDesc.jsx
import React, { useRef, useEffect, useState } from "react";
import DashboardChat from "./DashboardChat";
import { gsap } from "gsap";

const ChatDesc = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(circle, {
        x: x - circle.offsetWidth / 2,
        y: y - circle.offsetHeight / 2,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () =>
      container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    if (isHovering) {
      gsap.to(circle, {
        scale: 6,
        backgroundColor: "#6366F1",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(circle, {
        scale: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isHovering]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 relative">
      {/* Left Side: Chat */}
      <div className="w-full lg:w-1/2 h-[500px] overflow-y-auto rounded-3xl hover:drop-shadow-[0_6px_8px_#6366F1]">
        <DashboardChat />
      </div>

      {/* Right Side: Description */}
      <div
        ref={containerRef}
        className="w-full lg:w-1/2 text-white bg-black text-base sm:text-lg leading-relaxed relative overflow-hidden rounded-3xl p-4 sm:p-6 hover:drop-shadow-[0_4px_6px_#6366F1]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Circle follower */}
        <div
          ref={circleRef}
          className="absolute w-6 h-6 rounded-full pointer-events-none mix-blend-screen"
          style={{ top: 0, left: 0, backgroundColor: "rgba(255,255,255,0.1)" }}
        />

        <p className="font-semibold mb-4">
          I am your AI mental health assistant, here to provide empathetic
          guidance and support. Share your thoughts, concerns, or
          experiences, and I will offer helpful advice, coping strategies,
          and encouragement.
        </p>

        <p className="font-semibold mb-4">
          I am not a substitute for professional therapy or medical care. For
          serious concerns, consult a licensed mental health professional.
        </p>

        <p className="font-semibold">
          Feel free to begin the conversation — I am here to assist you.
        </p>
      </div>
    </div>
  );
};

export default ChatDesc;
