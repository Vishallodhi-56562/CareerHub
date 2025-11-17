import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import logo from "../assets/logo.png";

const Navbar = ({ scrollToResources, scrollToJobCard }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-100 shadow-md">
      <div className="flex items-center justify-between px-6 py-3 text-slate-800">

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Navigation Links */}
        <div className="hidden md:flex items-center  space-x-8">
          <Link className="nav-btn bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" to="/">Home</Link>

          <button className="nav-btn bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" onClick={scrollToJobCard}>
            Find Jobs
          </button>

          <Link className="nav-btn bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" to="/Company">
            Companies
          </Link>

          <Link className="btn-green bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" to="/company/login">
            Company Login
          </Link>

          <Link className="btn-green-light bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" to="/company/register">
            Register Company
          </Link>

          <button className="nav-btn bg-slate-200 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" onClick={scrollToResources}>
            Resources
          </button>

          {user && <Link className="hover:text-blue-500" to="/dashboard">Dashboard</Link>}
        </div>

        {/* Search + Login/Logout */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-white rounded-xl px-4 py-1 shadow-lg outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            className="bg-sky-600 text-white px-4 py-1 rounded-xl shadow-md"
          >
            Search
          </button>

          {!user ? (
            <Link className="nav-btn bg-slate-400 rounded-2xl px-2 active:bg-slate-700 shadow-lg active:text-white" to="/login">
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-xl shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
