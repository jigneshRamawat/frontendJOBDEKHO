import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '../../../assest/img/pngLogo.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Briefcase } from "lucide-react"; // Added Briefcase icon
import { AppContext } from "../../Context/AppContect";
import Button from "../../../Reuse/Button";

function Login() {
  const { loginUser, userAuthLoading } = useContext(AppContext);
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
      const response = await loginUser(formData);

      if (response?.success) {
        toast.success(response.message || "Login successful!");
        setFormData({ email: "", password: "" });
        const redirectPath = location.state?.from || "/JobHome";
        navigate(redirectPath, { replace: true });
      } else {
        // Show specific error for HRMS users
        if (response?.message?.includes("HRMS") || response?.message?.includes("company")) {
          toast.error(
            <div>
              <p className="font-bold">Company Account Detected</p>
              <p className="text-sm">Please use the HRMS portal instead</p>
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
      <div className="min-h-screen flex bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6]">
        <div className="absolute -top-10 left-15 cursor-pointer h-full">
          <Link to="/">
            <img className="h-60 w-auto object-contain" src={Logo} alt="JobDekhoo Logo" />
          </Link>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-white via-orange-300 to-[#EA590D] text-white p-14 flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">Find Your Dream Job</h1>
            <p className="mt-4 text-lg text-orange-100 max-w-md">
              Your partner in finding a dream job that fuels your ambitions.
            </p>
            <div className="mt-8 backdrop-blur-md px-5 py-4 rounded-2xl inline-flex bg-white/10">
              1.5M+ job seekers trust us
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <Button text="Home" to="/JobHome" variant="outline" />
            </div>
            <p className="text-gray-500 mt-2 mb-6">Login to continue your journey.</p>

            {/* HRMS Redirect Banner */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
              <Briefcase className="text-blue-600" size={20} />
              <div className="text-sm text-blue-800">
                <span className="font-semibold">Company Employee?</span>
                <Link to="/hrm-login" className="ml-2 text-blue-600 font-bold hover:underline">
                  Login to HRMS →
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
                  placeholder="Enter your email"
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

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-orange-500 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={userAuthLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {userAuthLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;