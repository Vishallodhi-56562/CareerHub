import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCheckCircle,
  FiBriefcase,
} from "react-icons/fi";

const CompanyLogin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email.trim() || !password.trim()) {
      setMsg("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/company/auth/login",
        { email, password }
      );
      login(res.data);
      navigate("/company/dashboard");
    } catch (error) {
      const apiMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid credentials. Please try again.";
      setMsg(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 shadow-lg mb-4">
            <FiBriefcase className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Company Portal
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Sign in to manage your job postings and review applications.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              Company Login
            </h2>
            <p className="text-sm text-slate-300">
              Use your company account credentials to continue.
            </p>
          </div>

          {/* Error Message */}
          {msg && (
            <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-400/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              <span>{msg}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={submit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
            </div>

            {/* Remember / Forgot row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-500 bg-transparent text-sky-500 focus:ring-sky-500"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                className="hover:text-sky-300 transition-colors"
                onClick={() => navigate("/company/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all
                ${
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
                  Signing in...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <FiCheckCircle className="text-white" />
                </>
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-xs text-center text-slate-400">
            Don&apos;t have a company account?{" "}
            <button
              type="button"
              onClick={() => navigate("/company/register")}
              className="text-sky-300 hover:text-sky-200 font-medium underline-offset-2 hover:underline"
            >
              Register your company
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;