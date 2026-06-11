import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Briefcase,
  Phone,
  Tag,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateHrCompony() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    personalEmail: "",
    category: "technical",
    designation: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.personalEmail ||
      !formData.designation ||
      !formData.phone
    ) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading(
      "Creating HR Profile..."
    );

    try {
      const response = await fetch(
        "https://jobdekho-3vnx.onrender.com/api/v1/company/hr",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        toast.success(
          "HR Executive created successfully!",
          { id: toastId }
        );

        setFormData({
          name: "",
          personalEmail: "",
          category: "technical",
          designation: "",
          phone: "",
        });
      } else {
        toast.error(
          data?.message ||
            "Failed to create HR profile",
          {
            id: toastId,
          }
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Network error. Please try again",
        {
          id: toastId,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-[#FBE8DD] py-12 px-4">

      {/* Back Button */}
      <div className="max-w-2xl mx-auto mb-4">
        <button
         onClick={() => navigate("/componydashbord")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#EA580C] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-[28px] shadow-xl border border-orange-100 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#EA580C] to-[#F97316] px-8 py-8 text-white">
          <h2 className="text-3xl font-bold">
            Create HR Executive
          </h2>

          <p className="text-orange-100 mt-2">
            Add a new HR member to your
            organization
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <InputField
              label="Full Name"
              icon={<User size={18} />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Harsh Jain"
            />

            {/* Email */}
            <InputField
              label="Personal Email"
              icon={<Mail size={18} />}
              name="personalEmail"
              type="email"
              value={
                formData.personalEmail
              }
              onChange={handleChange}
              placeholder="harsh@gmail.com"
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              icon={<Phone size={18} />}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+919876543211"
            />

            <div className="grid md:grid-cols-2 gap-5">

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Category
                </label>

                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                    <Tag size={18} />
                  </span>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#EA580C] outline-none"
                  >
                    <option value="technical">
                      Technical
                    </option>
                    <option value="non-technical">
                      Non Technical
                    </option>
                    <option value="management">
                      Management
                    </option>
                    <option value="operations">
                      Operations
                    </option>
                  </select>
                </div>
              </div>

              {/* Designation */}
              <InputField
                label="Designation"
                icon={
                  <Briefcase size={18} />
                }
                name="designation"
                value={
                  formData.designation
                }
                onChange={
                  handleChange
                }
                placeholder="HR Manager"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#EA580C] hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin w-5 h-5" />
                  Creating HR...
                </span>
              ) : (
                "Create HR Executive"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon,
  ...props
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label}
      </label>

      <div className="relative">
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          {...props}
          required
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#EA580C] outline-none transition-all"
        />
      </div>
    </div>
  );
}

export default CreateHrCompony;