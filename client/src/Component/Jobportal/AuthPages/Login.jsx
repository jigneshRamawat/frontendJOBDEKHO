import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast"; // ✅ Use react-hot-toast
import { AppContext } from "../../Context/AppContect";
import Button from "../../../Reuse/Button";

function Login() {
  const { loginUser, userAuthLoading } = useContext(AppContext);
  const navigate = useNavigate();

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
        toast.success(response.message || "Login successful!", {
          position: "top-center",
          duration: 3000,
        });
        setFormData({ email: "", password: "" });
        navigate("/JobHome", { replace: true });
      } else {
        toast.error(response?.message || "Login failed", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6]">
      {/* ❌ REMOVED: ToastContainer from react-toastify */}
      
      {/* Your existing JSX */}
      <div className="absolute left-23 top-6">
        <h1 className="text-3xl font-extrabold text-black relative">
          JobDekhoo
          <span className="absolute left-0 -bottom-1 h-1 w-13 rounded-full bg-[#EA590D]" />
        </h1>
      </div>

      {/* Rest of your login form JSX... */}
      {/* Keep everything else the same, just remove ToastContainer */}
    </div>
  );
}

export default Login;