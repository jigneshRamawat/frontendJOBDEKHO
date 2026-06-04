import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have a standard Button component in this path
import Button from "../../../../Reuse/Button"; 
// 1. Change import to AppContext
import { AppContext } from "../../../Context/AppContect"; 

// --- CUSTOM DROPDOWN COMPONENT ---
const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Select Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full border rounded-2xl px-5 py-4 cursor-pointer flex justify-between items-center transition-all duration-300 bg-white ${
          isOpen
            ? "border-[#EA590D] ring-2 ring-orange-50 shadow-md"
            : "border-gray-200 hover:border-orange-200"
        }`}
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
          {value || placeholder}
        </span>

        {/* Arrow */}
        <svg
          className={`w-5 h-5 transition-all duration-500 ease-in-out ${
            isOpen ? "rotate-180 text-[#EA590D]" : "rotate-0 text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      <div
        className={` overflow-y-scroll scrollbar-none h-40 absolute z-50 top-[110%] left-0 w-full bg-white border border-orange-100 rounded-2xl shadow-2xl py-2 origin-top transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        {/* Placeholder */}
        <div
          onClick={() => {
            onChange("");
            setIsOpen(false);
          }}
          className={`px-5 py-3 cursor-pointer transition-all duration-200 ${
            value === ""
              ? "bg-[#EA590D] text-white font-medium"
              : "text-gray-500 hover:bg-orange-50 hover:text-[#EA590D]"
          }`}
        >
          {`Scroll Down`}
        </div>

        {/* Options */}
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => {
              onChange(opt);
              setIsOpen(false);
            }}
            className={`px-5 py-3 cursor-pointer transition-all duration-200 ${
              value === opt
                ? "bg-[#EA590D] text-white font-medium"
                : "text-gray-700 hover:bg-orange-50 hover:text-[#EA590D]"
            }`}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN SEARCH BAR COMPONENT ---
const SearchBar = () => {
  const navigate = useNavigate();

  // 2. Change hook to pull from AppContext
  const {
    setSearch,
    setDraftLocation,
    setAppliedLocation,
    setDraftExperience,
    setAppliedExperience,
  } = useContext(AppContext);

  // Local States
  const [localSearch, setLocalSearch] = useState("");
  const [localExperience, setLocalExperience] = useState("");
  const [localLocation, setLocalLocation] = useState("");

  // Options arrays for our custom dropdowns
  const experienceOptions = ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"];
  const locationOptions = ["Bangalore", "Mumbai", "Pune", "Delhi", "Remote"];

  // Search Handler
  const handleSearch = (e) => {
    e.preventDefault();

    // 1. Update Context with Search keyword
    setSearch(localSearch);

    // 2. Update Context with Experience
    setDraftExperience(localExperience);
    setAppliedExperience(localExperience);

    // 3. Update Context with Location
    setDraftLocation(localLocation);
    setAppliedLocation(localLocation);

    // 4. Navigate to the correct route!
    navigate("/jobs");
  };

  return (
    <section className="px-4 md:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl border border-orange-100 p-4 md:p-5">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch"
          >
            {/* Search Input */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Title : React, MERN, Designer..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full h-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#EA590D] focus:ring-2 focus:ring-orange-50 transition"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <CustomSelect
                value={localExperience}
                onChange={setLocalExperience}
                options={experienceOptions}
                placeholder="Select Experience"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <CustomSelect
                value={localLocation}
                onChange={setLocalLocation}
                options={locationOptions}
                placeholder="Select Location"
              />
            </div>

            {/* Button */}
            <div className="pt-2">
              <Button
                text="Search Jobs"
                onClick={handleSearch}
                className="w-full h-full min-h-[58px]"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;