import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../Reuse/Button";
import Logo from "../assest/img/pngLogo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<header className="w-full bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] fixed top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="flex justify-between items-center h-20">
          
          <div className="cursor-pointer flex items-center h-full">
            <img className="h-60 w-auto object-contain" src={Logo} alt="JobDekhoo Logo" />
          </div>
          
          <div className="hidden lg:block">
            <Button >Get Started</Button>
          </div>

          <button 
            className="cursor-pointer lg:hidden text-gray-700 hover:text-[#FA7B3D] transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-5 px-6 absolute w-full shadow-lg left-0">
          <div className="flex flex-col gap-5">
            <Button className="cursor-pointer w-full">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
