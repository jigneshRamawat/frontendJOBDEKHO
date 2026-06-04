import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../../../Reuse/Loader";

import {
  FaCode,
  FaBullhorn,
  FaChartLine,
  FaUserTie,
  FaPaintBrush,
  FaBriefcase,
  FaLaptopCode,
  FaHospital,
  FaBuilding,
  FaShoppingBag,
  FaDatabase,
  FaUsers,
} from "react-icons/fa";

const categories = [
  { title: "IT & Software", jobs: "120+ Jobs Available", icon: <FaCode /> },
  { title: "Marketing", jobs: "85+ Jobs Available", icon: <FaBullhorn /> },
  { title: "Finance", jobs: "60+ Jobs Available", icon: <FaChartLine /> },
  { title: "Human Resource", jobs: "40+ Jobs Available", icon: <FaUserTie /> },
  { title: "UI/UX Design", jobs: "70+ Jobs Available", icon: <FaPaintBrush /> },
  { title: "Business Development", jobs: "95+ Jobs Available", icon: <FaBriefcase /> },
  { title: "Web Developer", jobs: "150+ Jobs Available", icon: <FaLaptopCode /> },
  { title: "Healthcare", jobs: "65+ Jobs Available", icon: <FaHospital /> },
  { title: "Real Estate", jobs: "30+ Jobs Available", icon: <FaBuilding /> },
  { title: "E-Commerce", jobs: "80+ Jobs Available", icon: <FaShoppingBag /> },
  { title: "Database", jobs: "55+ Jobs Available", icon: <FaDatabase /> },
  { title: "Management", jobs: "110+ Jobs Available", icon: <FaUsers /> },
];

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

const JobCategory = () => {
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(false);

  const visibleCategories = categories.slice(0, visibleCount);
  const hasMore = visibleCount < categories.length;

  const handleLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_COUNT);
      setLoading(false);
    }, 1200);
  };

  // REMOVED the ': string' type annotation here
  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6] py-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-5xl font-bold mb-4">
          Find Jobs By Category
        </h2>

        <p className="text-center text-gray-500 mb-14 text-lg">
          Explore jobs from different industries and categories
        </p>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.title)}
              className="cursor-pointer bg-white rounded-[22px] p-12 flex items-center gap-5 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-orange-100 hover:border-[#EA590D] group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#EA590D] text-2xl group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.jobs}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="min-w-[180px] h-[54px] bg-[#EA590D] hover:bg-orange-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center"
            >
              {loading ? <Loader /> : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobCategory;