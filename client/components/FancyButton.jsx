import React from "react";

const FancyButton = ({ 
  label, 
  color = "#6366F1", 
  text = "white", 
  backgroundColor = "black",
  // forward any other props (onClick, type, disabled, className overrides, etc.)
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={"\n        relative overflow-hidden group\n        rounded-full\n        font-bold uppercase\n        px-10 py-3 tracking-wide\n        transition-transform duration-300 ease-in-out\n        hover:scale-110\n      "}
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
        className={"\n          absolute top-1/2 left-1/2 \n          h-0 w-0 \n          -translate-x-1/2 -translate-y-1/2 \n          rounded-full \n          transition-all duration-300 ease-in-out \n          group-hover:h-[500px] group-hover:w-[500px]\n        "}
        style={{ backgroundColor: color }}
      ></span>
    </button>
  );
};

export default FancyButton;
