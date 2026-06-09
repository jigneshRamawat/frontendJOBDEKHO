import React from "react";
import {
  ShieldCheck,
  Rocket,
  BriefcaseBusiness,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";
import Button from "../../Reuse/Button";

export default function WhyChooseUs() {
  const cards = [
    {
      key: "verified",
      label: "Verified",
      icon: <ShieldCheck size={16} />,
      title: "Verified Jobs",
      desc: "Trusted job opportunities from verified companies.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
      // Very light, almost white-orange
      color: "bg-gray-50", 
    },
    {
      key: "fastApply",
      label: "Fast Apply",
      icon: <Rocket size={16} />,
      title: "Fast Apply",
      desc: "Apply instantly without lengthy forms.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
      // Slightly deeper
      color: "bg-rose-100", 
    },
    {
      key: "workflow",
      label: "Workflow",
      icon: <BriefcaseBusiness size={16} />,
      title: "Workflow Manage",
      desc: "Track hiring and applications professionally.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      // Soft peach/orange
      color: "bg-red-100", 
    },
    {
      key: "growth",
      label: "Growth",
      icon: <TrendingUp size={16} />,
      title: "Career Growth",
      desc: "Unlock better opportunities and career success.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      // Mid-light orange
      color: "bg-rose-200", 
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      title: "Smart Dashboard",
      desc: "Manage analytics and applicants in one place.",
      image: "https://imgs.search.brave.com/i1ASIfx3lrxO7mHa8BOJdmgtkKMYEb5tHLgFZDYJ70Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU0LzYz/LzM1LzU0NjMzNWJm/MGRlYTBmN2Y5NjVl/Yzk2ZDJlM2YzZDc2/LmpwZw",
      // Noticeable orange (but light enough for dark text)
      color: "bg-rose-200", 
    },
  ];
  return (
    // NOTE: Removed `overflow-hidden` from the parent section. 
    // `overflow-hidden` breaks CSS `position: sticky`.
    <section className="bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-[#EA580C] text-sm font-semibold uppercase tracking-[2px]">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            Why Choose <span className="text-[#EA580C]">JobDekho?</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Explore smart tools that help you find jobs faster and manage your workflow efficiently.
          </p>
        </div>
        <div className="relative flex flex-col gap-6 md:gap-12 pb-32">
          {cards.map((card, index) => (
            <div
              key={card.key}
              className={`sticky w-full rounded-4xl shadow-2xl overflow-hidden transition-all duration-300 ${card.color}`}
              style={{
                top: `calc(6rem + ${index * 2.5}rem)`, 
                zIndex: index + 1, // Ensures the next card always overlaps the previous one
              }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16 bg-white/60 backdrop-blur-sm">
                
                {/* LEFT SIDE (Text) */}
                <div>
                  <div className="flex items-center gap-2 mb-6 ">
                    <span className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm text-[#EA580C]">
                      {card.icon}
                    </span>
                    <span className="font-semibold text-gray-900 border border-gray-200 bg-white px-3 py-1 rounded-full text-sm">
                      {card.label}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-tight">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed max-w-md">
                    {card.desc}
                  </p>
                  
                  <Button text="Learn More →" className="mt-15">
                    
                  </Button>
                </div>

                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
                  <div className="absolute inset-0 bg-[#EA580C] blur-[80px] opacity-10 rounded-full"></div>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg border border-white/50"
                  />
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}