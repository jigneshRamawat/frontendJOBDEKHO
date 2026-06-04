import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";
import Logo from "../../../../assest/img/pngLogo.png";
const Footer = () => {
  return (
    <footer className="bg-[#EA590D]/100  py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Logo Section */}
          {/* Logo Section */}
          <div className="text-center lg:text-left">
            <div className="inline-block">
              <div className="cursor-pointer flex items-center">
                <img
                  className="h-60 w-auto object-contain"
                  src={Logo}
                  alt="JobDekhoo Logo"
                />
              </div>
            </div>

            <p className="text-gray-200 mt-3 max-w-[280px] mx-auto lg:mx-0">
              Connecting talent with opportunity.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <a
              href="/terms"
              className="text-gray-200 hover:text-[#000000] transition duration-300"
            >
              Terms & Conditions
            </a>

            <a
              href="/privacy"
              className="text-gray-200 hover:text-[#000000] transition duration-300"
            >
              Privacy Policy
            </a>

            <a
              href="/cookies"
              className="text-gray-200 hover:text-[#000000] transition duration-300"
            >
              Cookie Policy
            </a>

            <a
              href="/about"
              className="text-gray-200 hover:text-[#000000] transition duration-300"
            >
              About
            </a>

            <a
              href="/contact"
              className="text-gray-200 hover:text-[#000000] transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* Social Section */}
          <div className="text-center lg:text-right">
            <span className="text-white font-semibold tracking-wide uppercase text-sm">
              Connect With Us
            </span>

            <div className="flex justify-center lg:justify-end gap-4 mt-4">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#000000] transition duration-300"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#000000] transition duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#000000] transition duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#000000] transition duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/30 mt-10 pt-6 text-center text-white text-sm">
          © {new Date().getFullYear()} JobDekhoo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
