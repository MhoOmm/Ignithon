import React from "react";

const FancyButton = ({ 
  label, 
  color = "#6366F1", 
  text = "white", 
  backgroundColor = "black" 
}) => {
  return (
    <button
      className="
        relative overflow-hidden group
        rounded-full
        font-bold uppercase
        px-10 py-3 tracking-wide
        transition-transform duration-300 ease-in-out
        hover:scale-110
      "
      style={{ 
        backgroundColor: backgroundColor, 
        border: `1px solid ${color}`, 
        color: text 
      }}
    >
      {/* Label */}
      <span className="relative z-10">{label}</span>

      {/* Expanding background */}
      <span
        className="
          absolute top-1/2 left-1/2 
          h-0 w-0 
          -translate-x-1/2 -translate-y-1/2 
          rounded-full 
          transition-all duration-300 ease-in-out 
          group-hover:h-[500px] group-hover:w-[500px]
        "
        style={{ backgroundColor: color }}
      ></span>
    </button>
  );
};

export default FancyButton;
