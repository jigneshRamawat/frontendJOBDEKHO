const Loader = ({ size = "small" }) => {
  const dimensions = size === "small" 
    ? { width: "w-20", height: "h-20", text: "text-sm" }
    : { width: "w-26", height: "h-26", text: "text-xl" };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${dimensions.width} ${dimensions.height}
          border-4 border-orange-200
          border-t-[#EA590D]
          border-r-[#EA590D]
          rounded-full animate-spin
          flex items-center justify-center
        `}
      >
        <span
          className={`
            ${dimensions.text}
            font-bold
            text-[#EA590D]
            animate-pulse
          `}
        >
          JD
        </span>
      </div>
    </div>
  );
};

export default Loader;