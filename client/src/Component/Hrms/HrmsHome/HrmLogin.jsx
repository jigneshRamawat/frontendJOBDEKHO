import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, User } from "lucide-react"; // Added User icon
import { AppContext } from "../../Context/AppContect";
import Button from "../../../Reuse/Button";
import FooterBanner from "../../../Pages/Allhomepage/FooterBanner";
import NavbarHrm from "./NavbarHrm";

function HrmLogin() {
  const { loginCompany, companyAuthLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await loginCompany(formData);

      if (response?.success) {
        toast.success(response.message || "HRMS Login successful!");
        setFormData({ email: "", password: "" });

        const role = response?.role;
        if (role === "company") {
          navigate("/componydashbord", { replace: true });
        } else if (role === "hr") {
          navigate("/hrdashboard", { replace: true });
        } else if (role === "employee") {
          navigate("/employeedashboard", { replace: true });
        } else {
          navigate("/hrms", { replace: true });
        }
      } else {
        // Show specific error for Job Portal users
        if (response?.message?.includes("Job Portal") || response?.message?.includes("user")) {
          toast.error(
            <div>
              <p className="font-bold">Job Seeker Account</p>
              <p className="text-sm">Please use the Job Portal instead</p>
            </div>
          );
        } else {
          toast.error(response?.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavbarHrm />
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6] pt-24">
        <div className="flex min-h-[85vh]">
          <div className="w-full flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">HRMS Login</h2>
                <p className="text-gray-500 mt-2 mb-6">Company & Employee Access Only.</p>
              </div>

              {/* Job Portal Redirect Banner */}
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <User className="text-green-600" size={20} />
                <div className="text-sm text-green-800">
                  <span className="font-semibold">Job Seeker?</span>
                  <Link to="/login" className="ml-2 text-green-600 font-bold hover:underline">
                    Go to Job Portal →
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your company email"
                    className={`w-full mt-2 p-3 rounded-xl border outline-none transition ${
                      errors.email ? "border-red-500" : "border-gray-300 focus:border-orange-500"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className={`w-full p-3 rounded-xl border outline-none transition ${
                        errors.password ? "border-red-500" : "border-gray-300 focus:border-orange-500"
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
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="flex justify-end text-sm">
                  <button type="button" className="text-orange-500 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={companyAuthLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {companyAuthLoading ? "Logging in..." : "Log In to HRMS"}
                </button>
              </form>

              <p className="text-center text-gray-500 mt-6">
                New company?{" "}
                <Link to="/company-register" className="text-orange-500 font-semibold hover:underline">
                  Register Company
                </Link>
              </p>
            </div>
          </div>
        </div>
        <FooterBanner />
      </div>
    </>
  );
}

export default HrmLogin;