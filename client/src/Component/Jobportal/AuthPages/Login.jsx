import {
  useContext,
  useState,
} from "react";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  AppContext,
} from "../../Context/AppContect";

import Button from "../../../Reuse/Button";

function Login() {
  const {
    loginUser,
    authLoading,
  } = useContext(
    AppContext
  );

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({
    email: "",
    password: "",
  });

  const [
    errors,
    setErrors,
  ] = useState({});

  // ==========================
  // VALIDATION
  // ==========================
  function validate() {
    let newErrors =
      {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (
      !formData.password.trim()
    ) {
      newErrors.password =
        "Password is required";
    }

    setErrors(
      newErrors
    );

    return (
      Object.keys(
        newErrors
      ).length === 0
    );
  }

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  function handleChange(
    e
  ) {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]:
          value,
      })
    );

    setErrors(
      (prev) => ({
        ...prev,
        [name]: "",
      })
    );
  }

  // ==========================
  // HANDLE LOGIN
  // ==========================
  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    const isValid =
      validate();

    if (!isValid)
      return;

    try {
      const response =
        await loginUser(
          formData
        );

      if (
        response?.success
      ) {
        toast.success(
          response.message ||
            "Login successful!"
        );

        // Clear form
        setFormData({
          email: "",
          password:
            "",
        });

        // Redirect path
        const redirectPath =
          location
            .state
            ?.from ||
          "/JobHome";

        // Navigate instantly
        navigate(
          redirectPath,
          {
            replace:
              true,
          }
        );
      } else {
        toast.error(
          response?.message ||
            "Login failed"
        );
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

      <div className="min-h-screen flex bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6]">

        {/* LEFT SIDE */}
        <div className="absolute pl-23 pt-6">
          <h1 className="text-3xl font-extrabold text-black relative">
            JobDekhoo

            <span className="absolute left-0 -bottom-1 h-1 w-13 rounded-full bg-[#EA590D]" />
          </h1>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-white via-orange-300 to-[#EA590D] text-white p-14 flex-col justify-center">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Find Your
              Dream Job
            </h1>

            <p className="mt-4 text-lg text-orange-100 max-w-md">
              Your partner
              in finding a
              dream job that
              fuels your
              ambitions.
            </p>

            <div className="mt-8 backdrop-blur-md px-5 py-4 rounded-2xl inline-flex bg-white/10">
              1.5M+ job
              seekers trust
              us
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome
                Back
              </h2>

              <Button
                text="Home"
                to="/JobHome"
                variant="outline"
              />
            </div>

            <p className="text-gray-500 mt-2 mb-6">
              Login to continue
              your journey.
            </p>

            {/* Form */}
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  className={`w-full mt-2 p-3 rounded-xl border outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.email
                    }
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter password"
                    className={`w-full p-3 rounded-xl border outline-none transition ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 focus:border-orange-500"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={
                          20
                        }
                      />
                    ) : (
                      <Eye
                        size={
                          20
                        }
                      />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.password
                    }
                  </p>
                )}
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between text-sm">
    

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
                disabled={
                  authLoading
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {authLoading
                  ? "Logging in..."
                  : "Log In"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Don't have an
              account?{" "}
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
    </>
  );
}

export default Login;