import React, { useState } from "react";
import {
  Code2,
  Database,
  Briefcase,
  Palette,
  Megaphone,
  Laptop,
  TrendingUp,
  MonitorSmartphone,
} from "lucide-react";

const Card = ({ item, setPaused }) => (
  <div
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    className="min-w-[260px] md:min-w-[300px]
      bg-[#EA580C]/10
      backdrop-blur-md
      border border-white
      rounded-[28px]
      p-6
      hover:rotate-2
      cursor-pointer
      transition-all duration-500
      hover:bg-[#EA580C]
     
      group"
  >
    <div
      className="
        bg-[#EA580C]/20
        text-[#EA580C]
        w-16 h-16
        rounded-2xl
        flex items-center justify-center
        transition-all duration-300
        group-hover:bg-white
        group-hover:text-black
      "
    >
      {item.icon}
    </div>

    <h3
      className="
        text-xl font-bold
        text-[#EA580C]
        mt-5
        transition-colors duration-300
        group-hover:text-white
      "
    >
      {item.title}
    </h3>

    <p
      className="
        text-gray-500
        mt-2
        transition-colors duration-300
        group-hover:text-white/90
      "
    >
      {item.jobs}
    </p>

    <button
      className="
        mt-5
        text-[#EA580C]
        font-semibold
        transition-colors duration-300
        group-hover:text-white
      "
    >
      Explore →
    </button>
  </div>
);

function JobCategories() {
  const [paused, setPaused] = useState(false);

  const topCategories = [
    {
      title: "Frontend Developer",
      jobs: "120+ Jobs",
      icon: <Code2 size={30} />,
    },
    {
      title: "Backend Developer",
      jobs: "95+ Jobs",
      icon: <Database size={30} />,
    },
    {
      title: "MERN Stack",
      jobs: "180+ Jobs",
      icon: <Laptop size={30} />,
    },
    {
      title: "UI/UX Designer",
      jobs: "60+ Jobs",
      icon: <Palette size={30} />,
    },
  ];

  const bottomCategories = [
    {
      title: "Marketing",
      jobs: "80+ Jobs",
      icon: <Megaphone size={30} />,
    },
    {
      title: "Remote Jobs",
      jobs: "140+ Jobs",
      icon: <MonitorSmartphone size={30} />,
    },
    {
      title: "HR Manager",
      jobs: "70+ Jobs",
      icon: <Briefcase size={30} />,
    },
    {
      title: "Finance",
      jobs: "90+ Jobs",
      icon: <TrendingUp size={30} />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-4">
            Job <span className="text-[#EA580C]">Categories</span>
          </h2>

          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Explore trending job categories and discover opportunities that
            match your skills.
          </p>
        </div>

        {/* Top Marquee */}
        <div className="relative flex overflow-hidden mb-8">
          <div
            className="flex w-max animate-marquee-left"
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {[...topCategories, ...topCategories].map((item, index) => (
              <div key={`top1-${index}`} className="px-3">
                <Card item={item} setPaused={setPaused} />
              </div>
            ))}
          </div>

          <div
            className="flex w-max animate-marquee-left"
            aria-hidden="true"
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {[...topCategories, ...topCategories].map((item, index) => (
              <div key={`top2-${index}`} className="px-3">
                <Card item={item} setPaused={setPaused} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="relative flex overflow-hidden">
          <div
            className="flex w-max animate-marquee-right"
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {[...bottomCategories, ...bottomCategories].map(
              (item, index) => (
                <div key={`bottom1-${index}`} className="px-3">
                  <Card item={item} setPaused={setPaused} />
                </div>
              )
            )}
          </div>

          <div
            className="flex w-max animate-marquee-right"
            aria-hidden="true"
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {[...bottomCategories, ...bottomCategories].map(
              (item, index) => (
                <div key={`bottom2-${index}`} className="px-3">
                  <Card item={item} setPaused={setPaused} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marqueeLeft {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }

          @keyframes marqueeRight {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .animate-marquee-left {
            animation: marqueeLeft 20s linear infinite;
          }

          .animate-marquee-right {
            animation: marqueeRight 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
}

export default JobCategories;