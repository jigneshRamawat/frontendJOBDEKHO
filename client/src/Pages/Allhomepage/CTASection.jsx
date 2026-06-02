import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function CTASection() {
  const cards = [
    {
      id: 1,
      title: "Verified Jobs",
      desc: "Trusted opportunities from top companies.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000",
    },

    {
      id: 2,
      title: "Workflow Manage",
      desc: "Manage hiring and applications easily.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000",
    },

    {
      id: 3,
      title: "Career Growth",
      desc: "Grow professionally with better opportunities.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1000",
    },

    {
      id: 4,
      title: "Fast Apply",
      desc: "Apply instantly without long forms.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000",
    },
  ];

  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prev) =>
          (prev + 1) % cards.length
      );
    }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const getVisibleCards = () => {
    return Array.from(
      { length: 3 },
      (_, i) =>
        cards[
          (activeIndex + i) %
            cards.length
        ]
    );
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#fffaf5] to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-5">
          
          <div>
            <span className="bg-orange-100 text-[#EA580C] px-4 py-2 rounded-full text-sm font-medium">
              Your Career, Our Mission
            </span>

            <h2 className="text-2xl md:text-4xl font-bold mt-4 leading-tight text-gray-900">
              Empowering Growth
              <br />
              With{" "}
              <span className="text-[#EA580C]">
                Smart Solutions
              </span>
            </h2>
          </div>

          <button className="bg-[#EA580C] hover:bg-orange-700 transition text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 w-fit shadow-md text-sm">
            View Services
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-3 gap-5 items-start transition-all duration-700">
          
          {getVisibleCards().map(
            (card, index) => (
              <div
                key={card.id}
                className={`
                group transition-all duration-700
                ${
                  index === 1
                    ? "lg:translate-y-10"
                    : ""
                }
              `}
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[28px] shadow-lg">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[220px] md:h-[260px] object-cover rounded-[28px] group-hover:scale-105 transition duration-500"
                  />

                  {/* Arrow */}
                  <button className="absolute bottom-4 right-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md hover:bg-[#EA580C] hover:text-white transition">
                    <ArrowUpRight
                      size={20}
                    />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-gray-500 text-sm md:text-base leading-6">
                    {card.desc}
                  </p>

                  <div className="border-b border-gray-200 mt-4"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default CTASection;