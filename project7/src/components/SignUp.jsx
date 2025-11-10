import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sign-up failed");
        setLoading(false);
        return;
      }

      alert("✅ Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-[url('https://i.pinimg.com/1200x/d1/da/63/d1da635864ae706e228343227a61a28e.jpg')]">
      <div className="flex bg-black/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-10">
        {/* Left panel */}
        <div className="flex flex-col justify-center items-center p-10 w-1/2 text-white bg-gradient-to-br from-orange-700 to-teal-700">
          <h1 className="text-4xl font-bold mb-4">Join Us 🚀</h1>
          <p className="text-lg text-orange-100 text-center">
            Create an account to explore thousands of jobs.
          </p>
        </div>

        {/* Right panel */}
        <div className="w-1/2 bg-white/10 backdrop-blur-md p-10 flex flex-col justify-center">
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <h3 className="text-3xl text-orange-500 font-semibold text-center mb-6">
              Sign Up
            </h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl border-2 border-orange-500 outline-none focus:ring-2 focus:ring-orange-400"
              type="text"
              placeholder="Full Name"
              required
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-xl border-2 border-orange-500 outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              placeholder="Email Address"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-xl border-2 border-orange-500 outline-none focus:ring-2 focus:ring-orange-400"
              type="password"
              placeholder="Password"
              required
            />

            <button
              disabled={loading}
              className={`py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
              }`}
              type="submit"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-200 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
