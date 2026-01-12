import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiMail,
  FiMapPin,
  FiFileText,
  FiGlobe,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    location: "",
    about: "",
    website: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.about.trim()) {
      newErrors.about = "Company description is required";
    } else if (formData.about.trim().length < 50) {
      newErrors.about = "Description should be at least 50 characters";
    }
    
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "Enter a valid website URL";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/company/auth/register", {
        companyName: formData.companyName,
        email: formData.email,
        location: formData.location,
        about: formData.about,
        website: formData.website,
        password: formData.password,
      });
      setMsg({ 
        type: "success", 
        text: "Company registered successfully! Redirecting to login..." 
      });
      setTimeout(() => navigate("/company/login"), 2000);
    } catch (error) {
      const apiMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";
      setMsg({ type: "error", text: apiMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back button */}
        <button
          onClick={() => navigate("/company/login")}
          className="mb-6 inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to login
        </button>

        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 shadow-lg mb-4">
            <FiBriefcase className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Register Your Company
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto">
            Create an account to post jobs and connect with talented professionals.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Success/Error Message */}
          {msg.text && (
            <div
              className={`mb-6 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
                msg.type === "success"
                  ? "border border-green-400/40 bg-green-500/10 text-green-200"
                  : "border border-red-400/40 bg-red-500/10 text-red-200"
              }`}
            >
              {msg.type === "success" ? (
                <FiCheckCircle className="mt-0.5 flex-shrink-0" />
              ) : (
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              )}
              <span>{msg.text}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Company Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.companyName
                      ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                      : "border-white/20 focus:ring-sky-400"
                  }`}
                />
              </div>
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.companyName}
                </p>
              )}
            </div>

            {/* Email & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Work Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@acme.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.email
                        ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                        : "border-white/20 focus:ring-sky-400"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <FiAlertCircle className="flex-shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Location <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="San Francisco, CA"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.location
                        ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                        : "border-white/20 focus:ring-sky-400"
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <FiAlertCircle className="flex-shrink-0" /> {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* About Company */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                About Company <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-slate-400" />
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Describe your company, culture, and what makes you unique..."
                  rows={4}
                  className={`w-full pl-10 pr-4 pt-3 pb-8 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all ${
                    errors.about
                      ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                      : "border-white/20 focus:ring-sky-400"
                  }`}
                />
                <div className="absolute bottom-2 right-3 text-[11px] text-slate-400">
                  {formData.about.length} chars
                </div>
              </div>
              {errors.about && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.about}
                </p>
              )}
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Company Website <span className="text-slate-400 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.acme.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.website
                      ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                      : "border-white/20 focus:ring-sky-400"
                  }`}
                />
              </div>
              {errors.website && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.website}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.password
                      ? "border-red-400/40 bg-red-500/5 focus:ring-red-400/50"
                      : "border-white/20 focus:ring-sky-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.password}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                Minimum 6 characters required
              </p>
            </div>

            {/* Terms */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-slate-500 bg-transparent text-sky-500 focus:ring-sky-500"
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/terms")}
                    className="text-sky-300 hover:text-sky-200 underline-offset-2 hover:underline"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/privacy")}
                    className="text-sky-300 hover:text-sky-200 underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                loading
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 hover:-translate-y-[1px]"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v6h2M4 10a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  Register Company
                  <FiCheckCircle className="text-white" />
                </>
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-xs text-center text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/company/login")}
              className="text-sky-300 hover:text-sky-200 font-medium underline-offset-2 hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyRegister;