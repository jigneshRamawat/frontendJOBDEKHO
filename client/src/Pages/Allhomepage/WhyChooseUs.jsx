import { useState } from "react";
import {
  ShieldCheck,
  Rocket,
  BriefcaseBusiness,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";

function WhyChooseUs() {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const tabContent = {
    verified: {
      title: "Verified Jobs",
      desc:
        "Trusted job opportunities from verified companies.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    },

    fastApply: {
      title: "Fast Apply",
      desc:
        "Apply instantly without lengthy forms.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
    },

    workflow: {
      title: "Workflow Manage",
      desc:
        "Track hiring and applications professionally.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    },

    growth: {
      title: "Career Growth",
      desc:
        "Unlock better opportunities and career success.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    },

    dashboard: {
      title: "Smart Dashboard",
      desc:
        "Manage analytics and applicants in one place.",
      image:
        "https://imgs.search.brave.com/i1ASIfx3lrxO7mHa8BOJdmgtkKMYEb5tHLgFZDYJ70Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU0LzYz/LzM1LzU0NjMzNWJm/MGRlYTBmN2Y5NjVl/Yzk2ZDJlM2YzZDc2/LmpwZw",
    },
  };

  const tabs = [
    {
      key: "verified",
      label: "Verified",
      icon: <ShieldCheck size={16} />,
    },
    {
      key: "fastApply",
      label: "Fast Apply",
      icon: <Rocket size={16} />,
    },
    {
      key: "workflow",
      label: "Workflow",
      icon: (
        <BriefcaseBusiness size={16} />
      ),
    },
    {
      key: "growth",
      label: "Growth",
      icon: <TrendingUp size={16} />,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: (
        <LayoutDashboard size={16} />
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="text-[#EA580C] text-sm font-semibold uppercase tracking-[2px]">
            Features
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-black mt-2">
            Why Choose{" "}
            <span className="text-[#EA580C]">
              JobDekho?
            </span>
          </h2>

          <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
            Explore smart tools that help you
            find jobs faster.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`
                flex items-center gap-2
                px-4 py-2 rounded-xl
                text-sm font-medium
                transition-all duration-300
                hover:scale-105
                ${
                  activeTab === tab.key
                    ? "bg-white text-[#EA580C] shadow-md"
                    : "bg-[#EA580C] text-white hover:bg-orange-600"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="rounded-[30px] bg-white/50 backdrop-blur-xl border border-orange-100 shadow-lg overflow-hidden">
          
          <div className="grid lg:grid-cols-2 gap-5 items-center p-5 md:p-6">
            
            {/* LEFT */}
            <div>
              <span className="inline-block bg-[#EA580C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                {
                  tabContent[activeTab]
                    .title
                }
              </span>

              <h3 className="text-2xl md:text-4xl font-bold text-black mt-4 leading-tight">
                {
                  tabContent[activeTab]
                    .title
                }
              </h3>

              <p className="text-gray-600 mt-3 text-sm md:text-base leading-7 max-w-md">
                {
                  tabContent[activeTab]
                    .desc
                }
              </p>

              <button className="mt-5 bg-[#EA580C] hover:bg-orange-700 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:scale-105">
                Explore More
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#EA580C] blur-[60px] opacity-20 rounded-full"></div>

              <img
                key={activeTab}
                src={
                  tabContent[activeTab]
                    .image
                }
                alt="preview"
                className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover rounded-[24px] shadow-xl transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;