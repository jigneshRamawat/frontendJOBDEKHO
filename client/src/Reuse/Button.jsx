import React from "react";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-[#EA580C]
        hover:bg-orange-600
        text-white
        px-6
        py-3
        rounded-xl
        font-bold
        transition-all
        duration-300
        shadow-md
        hover:shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        border-3 
        border-white
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;