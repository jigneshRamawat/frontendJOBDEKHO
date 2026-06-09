import { useState, useContext } from "react";
import { Building2, Globe } from "lucide-react";

import NavbarHrm from "./NavbarHrm";
import FooterBanner from "../../../Pages/Allhomepage/FooterBanner";
import { AppContext } from "../../Context/AppContect";

const CompanyRegister = () => {
  const { registerCompany, companyLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    linkedin: "",
    tanId: "",
    gstId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      website: formData.website,
      location: {
        country: formData.country,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        pincode: formData.pincode,
      },
      socialLinks: {
        linkedin: formData.linkedin,
      },
      tanId: formData.tanId,
      gstId: formData.gstId,
    };

    await registerCompany(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-[#e9d3c6]">
      <NavbarHrm />

      <div className="mt-25" />

      <form
        onSubmit={handleSubmit}
        className="p-5 grid lg:grid-cols-2 gap-5"
      >
        <div className="space-y-4">
          <InputField
            icon={<Building2 size={16} />}
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            icon={<Globe size={16} />}
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            placeholder="Description"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <InputField
            icon={<Building2 size={16} />}
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <InputField
            icon={<Building2 size={16} />}
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <InputField
            icon={<Building2 size={16} />}
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <InputField
            icon={<Building2 size={16} />}
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            placeholder="Address"
          />

          <button
            disabled={companyLoading}
            className="bg-orange-500 text-white p-3 rounded-xl w-full"
          >
            {companyLoading ? "Registering..." : "Register Company"}
          </button>
        </div>
      </form>

      <FooterBanner />
    </div>
  );
};

export default CompanyRegister;

const InputField = ({ icon, label, name, value, onChange }) => {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="flex items-center border rounded-xl px-3 mt-1 focus-within:border-orange-500">
        <span className="text-orange-500">{icon}</span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 outline-none bg-transparent"
          placeholder={`Enter ${label}`}
        />
      </div>
    </div>
  );
};