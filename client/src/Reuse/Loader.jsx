const Loader = ({ size = "small" }) => {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`
            border-4 border-orange-200
            border-t-[#EA590D]
            rounded-full animate-spin
            ${size === "small" ? "w-5 h-5" : "w-8 h-8"}
          `}
        />
      </div>
    );
  };
  
  export default Loader;