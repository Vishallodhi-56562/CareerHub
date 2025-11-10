import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Store authentication details
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      // ✅ Redirect by role
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-center bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200">
      <div className="flex bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-10">
        {/* Left panel */}
        <div className="flex flex-col justify-center items-center p-10 w-1/2 text-white bg-gradient-to-br from-slate-400 to-gray-100">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-lg text-orange-100 text-center">
            Login to continue your job search or manage job listings as admin.
          </p>
        </div>

        {/* Right panel */}
        <div className="w-1/2  bg-red/1 backdrop-blur-lg p-10 flex flex-col justify-center">
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <h3 className="text-3xl text-orange-500 font-semibold text-center mb-6">
              Login
            </h3>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-xl border-2 border-orange-500 outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              placeholder="Enter your email"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-xl border-2 border-orange-500 outline-none focus:ring-2 focus:ring-orange-400"
              type="password"
              placeholder="Enter your password"
              required
            />

            <button
              disabled={loading}
              type="submit"
              className={`py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center text-sm text-gray-200 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-400 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
