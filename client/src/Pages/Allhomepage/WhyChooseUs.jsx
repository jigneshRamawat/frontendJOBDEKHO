// Component/Jobportal/Home/WhyChooseUs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Rocket,
  BriefcaseBusiness,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";

export const whyChooseUsData = [
  {
    id: "verified",
    label: "Verified",
    icon: <ShieldCheck size={16} />,
    title: "Verified Jobs",
    desc: "Trusted job opportunities from verified companies.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    color: "bg-gray-50",
    detailsSubtitle: "Curated job markets verified with strict anti-fraud checks.",
    amenities: [
      { title: "Manual Screening", desc: "Every recruiter profile is individually screened by our internal team before activation." },
      { title: "Secure Data Walls", desc: "Your personal applications data and resumes are completely encrypted and protected." },
      { title: "Direct Contact Desk", desc: "Skip third-party agencies; communicate directly with verified headhunters." }
    ]
  },
  {
    id: "fastApply",
    label: "Fast Apply",
    icon: <Rocket size={16} />,
    title: "Fast Apply",
    desc: "Apply instantly without lengthy forms.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
    color: "bg-rose-100",
    detailsSubtitle: "One-tap submissions engineered for high-growth modern professions.",
    amenities: [
      { title: "Single-Click Submit", desc: "Attach your saved core master profile onto job listings with a simple tap." },
      { title: "Automated Autofill", desc: "Our layout reads parsing rules to match client applications fields perfectly." },
      { title: "Instant Receipt Status", desc: "Get confirmation updates the millisecond managers open your folder." }
    ]
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: <BriefcaseBusiness size={16} />,
    title: "Workflow Manage",
    desc: "Track hiring and applications professionally.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    color: "bg-red-100",
    detailsSubtitle: "Visual pipeline trackers mapped out step-by-step for candidates.",
    amenities: [
      { title: "Visual Board Sync", desc: "A neat layout tracking your application status through review, test, and offer." },
      { title: "Dynamic Task Alerts", desc: "Never miss an technical evaluation deadline with system calendar pushes." },
      { title: "Archived Application Logs", desc: "Look over historic communication logs and old review packages cleanly." }
    ]
  },
  {
    id: "growth",
    label: "Growth",
    icon: <TrendingUp size={16} />,
    title: "Career Growth",
    desc: "Unlock better opportunities and career success.",
    image: "https://imgs.search.brave.com/8nwWTMtSjBrGt7J07x4zCsQPUly9VNWsFoV-PBoiEuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/NTA3NzUzMy9waG90/by9idXNpbmVzc21h/bi13YWxraW5nLXVw/LXRoZS1hYnN0cmFj/dC1zdGFpcnMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWVS/UVpRM0oxWHdFbkZq/NGdsMWF1enREbGJO/Q2Y3MkpRd25iU2E1/MXltUjg9",
    color: "bg-rose-200",
    detailsSubtitle: "Accelerate your professional trajectory with structured career roadmaps.",
    amenities: [
      { title: "Skill Gap Audits", desc: "Get personalized upskilling suggestions based on current market demands." },
      { title: "Salary Benchmarking", desc: "Compare local wage trends to secure maximum leverage during negotiations." },
      { title: "Mentorship Networks", desc: "Connect with industry veterans for direct 1-on-1 strategic guidance." }
    ]
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    title: "Smart Dashboard",
    desc: "Manage analytics and applicants in one place.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    color: "bg-rose-200",
    detailsSubtitle: "A unified cockpit tracking every single active job metric simultaneously.",
    amenities: [
      { title: "Centralized Inbox", desc: "Review recruiter direct messages, offer letters, and scheduling links in one stream." },
      { title: "Success Analytics", desc: "Monitor profile view tracking statistics and interview conversion rates." },
      { title: "Granular UI Filters", desc: "Sort high-paying operations cleanly by stack components or flexible filters." }
    ]
  }
];

export default function WhyChooseUs() {
  const navigate = useNavigate();

  return (
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

        {/* STICKY CARDS LOOP */}
        <div className="relative flex flex-col gap-6 md:gap-12 pb-32">
          {whyChooseUsData.map((card, index) => (
            <div
              key={card.id}
              className={`sticky w-full rounded-[32px] shadow-2xl overflow-hidden transition-all duration-300 ${card.color}`}
              style={{
                top: `calc(6rem + ${index * 2.5}rem)`, 
                zIndex: index + 1,
              }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16 bg-white/60 backdrop-blur-sm">
                
                {/* Text Content */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
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
                  
                  {/* FIXED CLICK NAVIGATION LINK */}
                  <button
                    onClick={() => navigate(`/mainwhydetails/${card.id}`)}
                    className="mt-8 px-6 py-3 bg-[#EA580C] text-white font-medium rounded-xl shadow-md hover:bg-[#d44f0a] transition-colors"
                  >
                    Learn More →
                  </button>
                </div>

                {/* Cover Image Frame */}
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