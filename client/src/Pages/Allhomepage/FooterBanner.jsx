import { FaLinkedinIn, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../../assest/img/pngLogo.png";
import Button from "../../Reuse/Button";

function FooterBanner() {
  return (
    // Changed text-white to text-gray-900 to ensure visibility on the light gradient background
    <footer className="bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] text-gray-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-gradient-to-r from-[#EA580C] to-orange-500 rounded-[30px] p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left shadow-2xl">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Ready To Find Your
              <br className="hidden md:block" /> Dream Job?
            </h2>

            <p className="mt-4 text-orange-50 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Join thousands of professionals and discover better opportunities
              with JobDekho.
            </p>
          </div>

          <Button>
            Get Started
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-orange-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* 1. Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 p-1 ">
            <div className="flex items-center  mb-2  h-25 ">
              {/* Reduced h-60 to h-16 so the logo isn't massive */}
              <img 
                className="h-100 w-auto object-contain cursor-pointer" 
                src={Logo} 
                alt="JobDekho Logo" 
              />
            </div>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base pr-4">
              The ultimate platform to find your next career move, hire top talent, 
              and manage your entire workforce seamlessly.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[FaLinkedinIn, FaGithub, FaInstagram, FaTwitter].map((Icon, index) => (
                <div
                  key={index}
                  className="bg-white text-[#EA580C] shadow-sm hover:bg-[#EA580C] hover:text-white hover:-translate-y-1 transition-all duration-300 w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl text-[#EA580C] font-bold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium">
              {[
                "Employee Dashboard", 
                "Find Jobs", 
                "Companies", 
                "About Us", 
                "Contact",
                "HR Dashboard"
              ].map((item) => (
                <li key={item} className="hover:text-[#EA580C] hover:translate-x-1 cursor-pointer transition-all duration-200 flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Categories */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#EA580C] mb-6">
              Categories
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium">
              {[
                "Frontend Jobs",
                "Backend Jobs",
                "MERN Stack",
                "Remote Jobs",
                "Marketing",
              ].map((item) => (
                <li key={item} className="hover:text-[#EA580C] hover:translate-x-1 cursor-pointer transition-all duration-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-lg md:text-xl text-[#EA580C] font-bold mb-6">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm md:text-base text-gray-600 font-medium">
              <p className="flex items-start gap-2">
                <span className="text-[#EA580C] mt-1">📍</span> 
                Jaipur, Rajasthan, India
              </p>
              <p className="flex items-center gap-2 hover:text-[#EA580C] transition-colors cursor-pointer">
                <span className="text-[#EA580C]">✉️</span> 
                support@jobdekho.com
              </p>
              <p className="flex items-center gap-2 hover:text-[#EA580C] transition-colors cursor-pointer">
                <span className="text-[#EA580C]">📞</span> 
                +91 7340088133
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-[#EA580C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-white/90 text-sm md:text-base text-center md:text-left">
            © {new Date().getFullYear()} JobDekho. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm md:text-base text-white/90 font-medium">
            <span className="hover:text-white hover:underline cursor-pointer transition-all">
              Privacy Policy
            </span>
            <span className="hover:text-white hover:underline cursor-pointer transition-all">
              Terms & Conditions
            </span>
          </div>
          
        </div>
      </div>
      
    </footer>
  );
}

export default FooterBanner;