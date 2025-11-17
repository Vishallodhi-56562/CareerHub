import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const CompanyLogin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/company/auth/login", {
        email, password
      });
      login(res.data);
      navigate("/company/dashboard");
    } catch {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen p-10 pt-[120px] bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-xl">

        <h1 className="text-3xl font-bold text-sky-600 mb-5">Company Login</h1>
        {msg && <p className="text-red-600">{msg}</p>}

        <form className="space-y-4" onSubmit={submit}>
          <input className="w-full p-3 border rounded" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <input className="w-full p-3 border rounded" placeholder="Password"
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="w-full bg-sky-600 text-white p-3 rounded">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default CompanyLogin;
