import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";

export default function Owerservices() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("job");

  const servicesData = {
    job: {
      id: "job",
      tabLabel: "Job Portal",
      icon: <Briefcase size={18} />,
      badge: "Smart Job Search",
      title: "Advanced Job Portal",
      Link:"/JobHome",
      description:
        "Find your dream job or hire top talent instantly. Manage applications, track statuses, and connect with verified companies effortlessly in one place.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
      route: "/job-portal",
    },
    hrms: {
      id: "hrms",
      tabLabel: "HRMS Portal",
      icon: <Users size={18} />,
      badge: "Smart Dashboard",
      title: "Smart HRMS Dashboard",
      Link:"/HrmsHome",
      description:
        "Manage analytics, payroll, attendance, and your entire workforce in one unified place. Automate your HR workflows with intelligent tracking.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      route: "/hrms-portal",
    },
  };

  const currentService = servicesData[activeTab];

  return (
    <section className="bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] py-20 px-4 min-h-screen flex items-center justify-center font-sans">
      <div className="max-w-6xl mx-auto w-full">
        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-[#EA580C] text-sm font-bold uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            Services Provide By <span className="text-[#EA580C]">JobDekho</span>
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            One Place For All Your Needs
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.values(servicesData).map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`
                flex items-center gap-2 px-6 py-2.5 cursor-pointer rounded-full text-sm md:text-base font-semibold
                transition-all duration-300 shadow-sm
                ${
                  activeTab === service.id
                    ? "text-white bg-[#EA580C] shadow-md ring-1 ring-orange-100"
                    : "text-[#EA580C] bg-white hover:bg-white hover:shadow-md"
                }
              `}
            >
              {service.icon}
              {service.tabLabel}
            </button>
          ))}
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-12 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* TEXT */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <span className="inline-block bg-white text-[#EA580C] px-5 py-2 rounded-full text-sm font-semibold shadow-sm mb-6">
                {currentService.badge}
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {currentService.title}
              </h3>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                {currentService.description}
              </p>

              <Link to={currentService.Link}>
                
                <button className="bg-[#EA580C] cursor-pointer hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
                  Forward to dashboard
                </button>
              </Link>
            </div>

            {/* IMAGE */}
            <div className="order-1 lg:order-2 relative group w-full">
              <div className="absolute inset-0 bg-[#EA580C] blur-[60px] opacity-20 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>
              <img
                key={currentService.id}
                src={currentService.image}
                alt={currentService.title}
                className="relative z-10 w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white/80 animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
