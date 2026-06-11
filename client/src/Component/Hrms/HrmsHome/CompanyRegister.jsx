import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Building2, FileSpreadsheet, FileText, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { AppContext } from "../../Context/AppContect"; 

export default function CompanyRegister() {
  const navigate = useNavigate();
  
  const { registerCompany, companyLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tanId: "",
    gstId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.tanId || !formData.gstId) {
      toast.error("Please fill out all enterprise identity fields.");
      return;
    }

    // Fire API trigger through context handler mapping
    const result = await registerCompany({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      tanId: formData.tanId,
      gstId: formData.gstId,
    });

    if (result?.success) {
      // Clear fields upon successful registration resolution
      setFormData({ name: "", email: "", password: "", tanId: "", gstId: "" });
      
      // Move to your designated workspace router portal dashboard space after short delay
      setTimeout(() => {
        navigate("/hrm-login");
      }, 1500);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-md rounded-[32px] border border-white p-8 md:p-12 shadow-2xl shadow-orange-900/5">
        
        {/* Component Header Block */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Register <span className="text-[#EA580C]">Company Hub</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Configure your enterprise workspace console to track professional talent pipelines.
          </p>
        </div>

        {/* Submission Handler Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Organization Display Identity Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 pl-1">
              Company Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Building2 size={18} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. TCS"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/10 transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Corporate Email Access Node */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 pl-1">
              Corporate Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tcs@company.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/10 transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Secure Workspace Account Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 pl-1">
              Secure Account Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/10 transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Multi-Column Segment for TAN & GST Keys */}
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* TAN Register Parameter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 pl-1">
                TAN Identification
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FileText size={18} />
                </span>
                <input
                  type="text"
                  name="tanId"
                  value={formData.tanId}
                  onChange={handleChange}
                  placeholder="TCSG12345Z"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/10 transition-all text-gray-900 font-medium uppercase"
                />
              </div>
            </div>

            {/* GST Register Parameter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 pl-1">
                GST Registration
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FileSpreadsheet size={18} />
                </span>
                <input
                  type="text"
                  name="gstId"
                  value={formData.gstId}
                  onChange={handleChange}
                  placeholder="22TCSGG1234A1Z5"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/10 transition-all text-gray-900 font-medium uppercase"
                />
              </div>
            </div>

          </div>

          {/* Action Submission Button Frame using Context State Indicator */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={companyLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#d44f0a] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-orange-600/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
            >
              {companyLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Corporate Console...
                </>
              ) : (
                <>
                  Register Corporate Portal <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          Already registered your workplace?{" "}
          <Link to="/hrm-login" className="text-[#EA580C] font-semibold hover:underline">
            Login to Admin Console
          </Link>
        </div>

      </div>
    </section>
  );
}