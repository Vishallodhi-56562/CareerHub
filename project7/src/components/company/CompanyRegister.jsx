import React, { useState } from "react";
import axios from "axios";

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/company/auth/register", {
        companyName, email, location, about, website, password
      });
      setMsg("Company registered successfully!");
    } catch (error) {
      setMsg("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen p-10 pt-[120px] bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-xl">

        <h1 className="text-3xl font-bold text-sky-600 mb-5">Register Company</h1>
        {msg && <p className="text-green-600">{msg}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input className="w-full p-3 border rounded" placeholder="Company Name"
            value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

          <input className="w-full p-3 border rounded" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input className="w-full p-3 border rounded" placeholder="Location"
            value={location} onChange={(e) => setLocation(e.target.value)} required />

          <textarea className="w-full p-3 border rounded" placeholder="About Company"
            value={about} onChange={(e) => setAbout(e.target.value)} required />

          <input className="w-full p-3 border rounded" placeholder="Website (optional)"
            value={website} onChange={(e) => setWebsite(e.target.value)} />

          <input className="w-full p-3 border rounded" placeholder="Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="w-full bg-sky-600 text-white p-3 rounded">
            Register Company
          </button>
        </form>

      </div>
    </div>
  );
};

export default CompanyRegister;
