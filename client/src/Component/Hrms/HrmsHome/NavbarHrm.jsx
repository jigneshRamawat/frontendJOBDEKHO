import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../../../Reuse/Button";
import Logo from "../../../assest/img/pngLogo.png";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function NavbarHrm() {
  const [isOpen, setIsOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath =
    location.pathname;


  const isLoginPage =
    currentPath === "/hrm-login";

  const isDemoPage =
    currentPath ===
    "/company-register";

  // Navigate handlers
  const goHome = () => {
    navigate("/HrmsHome");
    setIsOpen(false);
  };

  const goLogin = () => {
    navigate("/hrm-login");
    setIsOpen(false);
  };

  const goDemo = () => {
    navigate("/company-register");
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="cursor-pointer flex items-center h-full">
            <Link to="/HrmsHome">
              <img
                className="h-60 w-auto object-contain"
                src={Logo}
                alt="JobDekhoo Logo"
              />
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-4">

            {/* LOGIN PAGE */}
            {isLoginPage ? (
              <>
                <Button
                  text="Home"
                  onClick={goHome}
                />

                <Button
                  text="Get-Demo"
                  onClick={goDemo}
                />
              </>
            ) : isDemoPage ? (
              /* DEMO PAGE */
              <>
                <Button
                  text="Login"
                  onClick={goLogin}
                />

                <Button
                  text="Home"
                  onClick={goHome}
                />
              </>
            ) : (
              /* HOME PAGE */
              <>
                <Button
                  text="Login"
                  onClick={goLogin}
                />

                <Button
                  text="Get-Demo"
                  onClick={goDemo}
                />
              </>
            )}
          </div>

         
          <button
            className="cursor-pointer lg:hidden text-gray-700 hover:text-[#FA7B3D] transition-colors"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-5 px-6 absolute w-full shadow-lg left-0">
          <div className="flex flex-col gap-4">

            {/* LOGIN PAGE */}
            {isLoginPage ? (
              <>
                <Button
                  text="Home"
                  onClick={goHome}
                  className="w-full"
                />

                <Button
                  text="Get-Demo"
                  onClick={goDemo}
                  className="w-full"
                />
              </>
            ) : isDemoPage ? (
              /* DEMO PAGE */
              <>
                <Button
                  text="Login"
                  onClick={goLogin}
                  className="w-full"
                />

                <Button
                  text="Home"
                  onClick={goHome}
                  className="w-full"
                />
              </>
            ) : (
              /* HOME PAGE */
              <>
                <Button
                  text="Login"
                  onClick={goLogin}
                  className="w-full"
                />

                <Button
                  text="Get-Demo"
                  onClick={goDemo}
                  className="w-full"
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default NavbarHrm;