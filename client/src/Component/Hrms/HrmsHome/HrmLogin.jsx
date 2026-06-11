import { useContext, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import { AppContext } from "../../Context/AppContect";

import Button from "../../../Reuse/Button";
import FooterBanner from "../../../Pages/Allhomepage/FooterBanner";
import NavbarHrm from "./NavbarHrm";

function HrmLogin() {
  const { loginUser, authLoading } = useContext(AppContext);

  const navigate = useNavigate();

  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

async function handleSubmit(e) {
  e.preventDefault();

  const isValid = validate();

  if (!isValid) return;

  try {
    const response = await loginUser(formData);

    if (response?.success) {
      toast.success(
        response.message || "Login successful!"
      );

      setFormData({
        email: "",
        password: "",
      });

      const role = response?.role;

      // Role based redirect
      if (role === "company") {
        navigate("/componydashbord", {
          replace: true,
        });
      } else if (role === "hr") {
        navigate("/hrdashboard", {
          replace: true,
        });
      } else if (role === "employee") {
        navigate("/employeedashboard", {
          replace: true,
        });
      } else {
        navigate("/hrms", {
          replace: true,
        });
      }
    } else {
      toast.error(
        response?.message || "Login failed"
      );
    }
  } catch (error) {
    console.error("Login Error:", error);

    toast.error("Something went wrong");
  }
}

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Navbar */}
      <NavbarHrm />

      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6] pt-24">
        <div className="flex min-h-[85vh]">

          <div className="w-full  flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Welcome Back
                </h2>

                <p className="text-gray-500 mt-2 mb-6">
                  Login to continue your journey.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full mt-2 p-3 rounded-xl border outline-none transition ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-orange-500"
                    }`}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className={`w-full p-3 rounded-xl border outline-none transition ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end text-sm">
                  <button
                    type="button"
                    className="text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {authLoading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {/* Register Link */}
              <p className="text-center text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterBanner />
      </div>
    </>
  );
}

export default HrmLogin;
