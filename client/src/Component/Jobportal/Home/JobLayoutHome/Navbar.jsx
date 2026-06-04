import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  User,
} from "lucide-react";

import Logo from "../../../../assest/img/pngLogo.png";

import Button from "../../../../Reuse/Button";

import {
  AppContext,
} from "../../../Context/AppContect";


const Navbar = () => {
  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    user,
    logoutUser,
  } = useContext(
    AppContext
  );

  const navigate =
    useNavigate();

  // -------------------
  // Close Menu
  // -------------------
  const closeMenu =
    () =>
      setIsOpen(
        false
      );

  // -------------------
  // Toggle Menu
  // -------------------
  const toggleMenu =
    () =>
      setIsOpen(
        !isOpen
      );

  // -------------------
  // Logout
  // -------------------
  async function handleLogout() {
    await logoutUser();

    closeMenu();

    navigate(
      "/JobHome",
      {
        replace:
          true,
      }
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white">

      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

            <div className="cursor-pointer flex items-center h-full">
             <Link to="/"> <img 
                className="h-60 w-auto object-contain"
                src={Logo}
                alt="JobDekhoo Logo"
              /></Link>
            </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">

            {/* If not logged in */}
            {!user?._id ? (
              <>
                <Button
                  text="Login"
                  variant="outline"
                  to="/login"
                />

                <Button
                  text="Register"
                  to="/register"
                />
              </>
            ) : (
              <div className="flex items-center gap-4">

                {/* Profile */}
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-full border border-orange-100">

                  <div className="w-8 h-8 bg-[#EA590D] rounded-full flex items-center justify-center text-white">
                    <User
                      size={
                        18
                      }
                    />
                  </div>

                  <span className="font-medium text-gray-700 pr-2 hidden lg:block">
                    {user?.name ||
                      "My Profile"}
                  </span>
                </div>

                {/* Logout */}
                <Button
                  text="Logout"
                  variant="outline"
                  onClick={
                    handleLogout
                  }
                />
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={
              toggleMenu
            }
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X
                size={30}
              />
            ) : (
              <Menu
                size={30}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 animate-in slide-in-from-top-2 duration-300">

            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 mt-2">

              {!user?._id ? (
                <>
                  <Button
                    text="Login"
                    variant="outline"
                    to="/login"
                    onClick={
                      closeMenu
                    }
                  />

                  <Button
                    text="Register"
                    to="/register"
                    onClick={
                      closeMenu
                    }
                  />
                </>
              ) : (
                <>
                  {/* Profile */}
                  <div className="flex items-center gap-3 px-2 py-2">

                    <div className="w-10 h-10 bg-[#EA590D] rounded-full flex items-center justify-center text-white">
                      <User
                        size={
                          20
                        }
                      />
                    </div>

                    <span className="font-medium text-gray-800 text-lg">
                      {user?.name ||
                        "My Profile"}
                    </span>
                  </div>

                  {/* Logout */}
                  <Button
                    text="Logout"
                    variant="outline"
                    onClick={
                      handleLogout
                    }
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;