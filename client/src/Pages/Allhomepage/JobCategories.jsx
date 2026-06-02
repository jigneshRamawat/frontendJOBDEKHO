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

function JobCategories() {
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

  const Card = ({ item }) => (
    <div className="min-w-[260px] md:min-w-[300px] bg-[#EA580C]/10 backdrop-blur-md border border-white rounded-[28px] p-6 hover:bg-[#EA580C] transition-all duration-500 group cursor-pointer hover:rotate-6">
      <div className="bg-[#EA580C]/20 text-[#EA580C] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition">
        {item.icon}
      </div>

      <h3 className="text-xl font-bold text-[#EA580C] group-hover:text-white  mt-5">{item.title}</h3>

      <p className="text-gray-500 group-hover:text-white mt-2">{item.jobs}</p>

      <button className="mt-5 text-[#EA580C] font-semibold group-hover:text-white transition">
        Explore →
      </button>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">


          <h2 className="text-3xl md:text-5xl font-bold text-black mt-4">
           Job <span className="text-[#EA580C]">Categories</span>
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore trending job categories and discover opportunities that
            match your skills.
          </p>
        </div>

        {/* TOP SCROLL */}
        <div className="relative overflow-hidden mb-6 group">
          <div className="flex gap-5 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...topCategories, ...topCategories].map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>

        {/* BOTTOM SCROLL */}
        <div className="relative overflow-hidden group">
          <div className="flex gap-5 w-max animate-scroll-right group-hover:[animation-play-state:paused]">
            {[...bottomCategories, ...bottomCategories].map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM CSS */}
      <style>
        {`
            @keyframes scrollLeft {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
  
            @keyframes scrollRight {
              from {
                transform: translateX(-50%);
              }
              to {
                transform: translateX(0);
              }
            }
  
            .animate-scroll-left {
              animation: scrollLeft 18s linear infinite;
            }
  
            .animate-scroll-right {
              animation: scrollRight 18s linear infinite;
            }
          `}
      </style>
    </section>
  );
}

export default JobCategories;
