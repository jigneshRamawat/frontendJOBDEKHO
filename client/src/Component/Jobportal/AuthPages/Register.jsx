import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast"; // <-- Toast Import Kiya
import Button from "../../../Reuse/Button";
import { AppContext } from "../../Context/AppContect";

function Register() {
  const { registerUser, authLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------------
  // Validation
  // ------------------------
  function validate() {
    let newErrors = {};

    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    const phoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be like +919876543210";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Must contain uppercase, lowercase, number & special character";
    }

    setErrors(newErrors);

    // FIX: Agar local validation fail hoti hai, toh error toast dikhao
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the validation errors in the form.");
    }

    return Object.keys(newErrors).length === 0;
  }

  // ------------------------
  // Handle Input Change
  // ------------------------
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // ------------------------
  // Handle Submit
  // ------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: "hr",
    };

    try {
      const response = await registerUser(payload);

      if (response?.success) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });

        // Navigate directly to home/dashboard
        navigate("/JobHome", { replace: true });
      } else {
        console.log("Registration API response failed:", response?.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6]">
      <div className="absolute left-23 top-6">
        <h1 className="text-3xl font-extrabold text-black relative">
          JobDekhoo
          <span className="absolute left-0 -bottom-1 h-1 w-13 rounded-full bg-[#EA590D]" />
        </h1>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-white via-orange-300 to-[#EA590D] text-white p-12 flex-col justify-center">
        <h1 className="text-5xl font-bold">Find Your Dream Job</h1>
        <p className="mt-4 text-lg">
          Your partner in finding a dream job that fuels your ambitions.
        </p>
        <div className="mt-6 p-4 rounded-xl inline-block bg-white/10">
          1.5M+ job seekers trust us
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <Button text="Home" to="/JobHome" variant="outline" />
          </div>

          <p className="text-gray-500 mb-6">Register and start your journey.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full mt-1 p-3 rounded-xl border outline-none transition ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full mt-1 p-3 rounded-xl border outline-none transition ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+919876543210"
                className={`w-full mt-1 p-3 rounded-xl border outline-none transition ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
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
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className={`w-full mt-4 py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 ${
                authLoading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {authLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;