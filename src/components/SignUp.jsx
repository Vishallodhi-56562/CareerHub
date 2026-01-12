import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      login(res.data);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-12">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 text-lg">
            Join CareerHub and start your journey
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-600/2 focus:outline-none transition-all duration-200 shadow-sm"
              placeholder="John Doe"
              placeholderTextColor="text-gray-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-600/2 focus:outline-none transition-all duration-200 shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-600/2 focus:outline-none transition-all duration-200 shadow-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white font-semibold rounded-xl shadow-inset-lg hover:shadow-inset-lg hover:scale-105 active:scale-95"
          >
            Create Account
          </button>

          {/* Google Sign Up Section */}
          <div className="mb-4">
            <button
              type="button"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 border border-indigo-300 rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-8 h-8"
              />
              <span className="text-slate-100 font-medium">
                Sign up with Google
              </span>
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex justify-center">
          <div className="h-2 bg-slate-200"></div>
          <span className="text-slate-400 font-medium px-4 py-1">or</span>
        </div>

        {/* Existing Account Section */}
        <p className="text-center text-slate-500 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            className="text-sky-600 hover:text-sky-700 font-semibold transition-colors hover:underline"
            to="/login"
          >
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
