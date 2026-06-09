import  { useEffect, useState } from "react";
import img from "../../assest/img/bg.png"; // Correct path and extension
import { Link } from "react-router-dom";

// 1. Create an array of partner objects with their respective website links
const partnerCompanies = [
  { name: "Tech Mahindra", url: "https://www.techmahindra.com" },
  { name: "Infosys", url: "https://www.infosys.com" },
  { name: "TCS", url: "https://www.tcs.com" },
  { name: "Wipro", url: "https://www.wipro.com" },
  { name: "HCL Tech", url: "https://www.hcltech.com" },
  { name: "Cognizant", url: "https://www.cognizant.com" },
];

const HeroSection = () => {


  const phrases = ["Find Jobs", "Hire Talent" ,"Manage Workforce"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000); 

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [phrases.length]);


  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] font-sans flex flex-col overflow-hidden pb-10">
      {/* 2. Custom Style for Infinite Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            /* Adjust '30s' to make it scroll faster or slower */
            animation: marquee 30s linear infinite; 
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col justify-center items-center  px-4 mt-5 md:mt-16 w-full max-w-6xl mx-auto relative z-10">
      <div className="flex items-center ">
      
      {/* Hero Title */}
      <h1 className="w-full text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 tracking-tight px-2 flex flex-wrap items-center justify-center gap-x-3">
        
        <span>JobDekho Let's You</span>
        
        <span className="text-[#EA580C] overflow-hidden h-[1.25em] relative inline-block min-w-[280px] md:min-w-[350px]">
          
          <div 
            className="transition-transform duration-500 ease-in-out flex flex-col"
            style={{ transform: `translateY(-${index * 1.25}em)` }} 
          >
            {phrases.map((phrase, i) => (
              <span key={i} className="h-[1.25em] block whitespace-nowrap">
                {phrase}.
              </span>
            ))}
          </div>

        </span>
        
      </h1>
      
    </div>


        {/* Partner Companies Section (Animated) */}
        <div className="mt-5 w-full max-w-4xl px-2 relative flex flex-col  justify-center items-center">
          <p className="text-sm font-semibold text-center text-[#FA7B3D] uppercase tracking-widest mb-6">
            In collaboration with our Partner Companies
          </p>

          {/* Scrolling Container */}
          <div className="relative overflow-hidden w-full">
            {/* Optional: Gradient masks for smooth fading edges */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#ffe4d6] via-[#fbede3] to-[#fff7f2] to-transparent z-10 pointer-events-none"></div>

            {/* We duplicate the array twice [...arr, ...arr] to create a seamless infinite loop */}
            <div className="animate-marquee gap-4 md:gap-6 py-2">
              {[...partnerCompanies, ...partnerCompanies].map(
                (partner, index) => (
                  <a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-5 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:text-[#FA7B3D] hover:border-[#FA7B3D] hover:bg-orange-50 transition-all cursor-pointer shadow-sm w-[150px] md:w-[180px] shrink-0 text-sm md:text-base decoration-none"
                  >
                    {partner.name}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Center Illustration with Responsive Floating Orbs */}
        <div className="mt-12  md:mt-10 h-100 w-full flex justify-center relative max-w-4xl px-4 md:px-0">
          {/* HRMS Software Floating Box */}
          <Link to = "/hrms"> <div className="cursor-pointer absolute top-10 md:top-20 -left-2 md:-left-10 lg:-left-20 w-24 h-24 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-br from-orange-400 to-[#EA580C] rounded-full flex justify-center text-center items-center text-white font-bold text-xs md:text-xl lg:text-3xl shadow-5xl border-2 md:border-4 border-white z-20 animate-[bounce_5s_infinite]">
            HRMS <br className="hidden md:block" /> Software
          </div></Link>

          {/* Main Image */}
          <img
            src={img}
            alt="User at desk illustration"
            className=" w-full max-w-sm md:max-w-2xl object-contain z-10 drop-shadow-2xl relative"
          />

          {/* Subtle background glow for the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-[80%] bg-orange-100/80 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>

          {/* Job Portal Floating Box */}
         <Link to="/jobs" ><div className="cursor-pointer absolute bottom-15 md:bottom-22 -right-2 md:-right-10 lg:-right-20 w-24 h-24 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-tl from-orange-400 to-[#EA580C] rounded-full flex justify-center text-center items-center text-white font-bold text-xs md:text-xl lg:text-3xl shadow-5xl border-2 md:border-4 border-white z-20 delay-200 transition animate-[bounce_4s_infinite]">
            Job <br className="hidden md:block" /> Portal
          </div></Link>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
