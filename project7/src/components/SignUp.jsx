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
      const res = await axios.post("/api/auth/register", { name, email, password });
      login(res.data);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4 pt-[120px]">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Join CareerHub and start your journey
        </p>

        {/* Error message */}
        {err && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {err}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white shadow-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 transition-all text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:scale-[.98]"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="px-3 text-sm text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Google Signup */}
        <button className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm flex items-center justify-center gap-3">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-slate-700 font-medium">Sign up with Google</span>
        </button>

        {/* Already have account */}
        <p className="text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <Link className="text-sky-600 hover:text-sky-700 font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
