import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Password strength checker
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      login(res.data);

      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Navigate based on role
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth handler
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Redirect to backend Google OAuth endpoint
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4 pt-[120px] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40 relative z-10 transform transition-all hover:scale-[1.01] duration-300">
        {/* Header with Shield Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4 shadow-inner">
            <Shield className="w-8 h-8 text-sky-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-500">Login to your CareerHub account</p>
        </div>

        {/* Error/Success Messages */}
        {err && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{err}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span>Email</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white shadow-sm transition-all duration-200 hover:border-sky-300"
                placeholder="you@example.com"
              />
              {email && (
                <div className="absolute right-3 top-3.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span>Password</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white shadow-sm transition-all duration-200 hover:border-sky-300 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-sky-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-2 mt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-red-500"
                            : passwordStrength <= 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {passwordStrength === 0 && "Enter password"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Fair"}
                  {passwordStrength === 3 && "Good"}
                  {passwordStrength === 4 && "Strong"}
                  {passwordStrength === 5 && "Very Strong"}
                </p>
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-slate-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-all text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:scale-[.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        {/* Divider with Or */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <span className="px-3 text-sm text-slate-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
          ) : (
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
          )}
          <span className="text-slate-700 font-medium">
            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </span>
        </button>

        {/* Sign up Link */}
        <p className="text-center text-slate-500 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            className="text-sky-600 hover:text-sky-700 font-semibold transition-colors hover:underline"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-4 p-3 bg-sky-50/50 rounded-lg border border-sky-100">
          <p className="text-xs text-slate-500 font-medium mb-1">Demo:</p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-white rounded border border-sky-200">
              admin@demo.com
            </span>
            <span className="px-2 py-1 bg-white rounded border border-sky-200">
              pass: demo123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
