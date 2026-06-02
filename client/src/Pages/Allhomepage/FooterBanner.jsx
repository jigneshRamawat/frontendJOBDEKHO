import { FaLinkedinIn, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../../assest/img/pngLogo.png";

function FooterBanner() {
  return (
    <footer className="bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] text-white relative overflow-hidden">
      {/* Top CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#EA580C] to-orange-500 rounded-[35px] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ready To Find Your
              <br />
              Dream Job?
            </h2>

            <p className="mt-4 text-orange-100 text-lg max-w-xl">
              Join thousands of professionals and discover better opportunities
              with JobDekho.
            </p>
          </div>

          <button className="bg-white text-[#EA580C] px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-5">
            <div className="cursor-pointer flex items-center h-full">
            <img className="h-60 w-auto object-contain" src={Logo} alt="JobDekhoo Logo" />
          </div>
            </div>

            <p className="text-gray-400 leading-8">
            The ultimate platform to find your next career move, hire top talent, and manage your entire workforce seamlessly
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[FaLinkedinIn, FaGithub, FaInstagram, FaTwitter].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 hover:bg-[#EA580C] transition-all duration-300 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    <Icon />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-[#EA580C] font-bold mb-5">Quick Links</h3>

            <ul className="space-y-4 text-gray-500">
              {["Employee dashbord", "Find Jobs", "Companies", "About", "Contact","HR dashboard"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-[#EA580C] cursor-pointer transition"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold text-[#EA580C] mb-5">Categories</h3>

            <ul className="space-y-4 text-gray-500">
              {[
                "Frontend Jobs",
                "Backend Jobs",
                "MERN Stack",
                "Remote Jobs",
                "Marketing",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#EA580C] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl text-[#EA580C] font-bold mb-5">Contact Us</h3>

            <div className="space-y-4 text-gray-500">
              <p>  Rajasthan, India</p>
              <p> support@jobdekho.com</p>
              <p> +91 7340088133</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t-1 bg-[#EA580C] border-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white text-center md:text-left">
            © 2026 JobDekho. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-white">
            <span className="hover:text-[#EA580C] cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-[#EA580C] cursor-pointer transition">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterBanner;
