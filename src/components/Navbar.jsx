import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import {
  Menu,
  X,
  Search,
  LogOut,
  User,
  Briefcase,
  Building2,
  BookOpen,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = ({ scrollToResources, scrollToJobCard }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for user preference
 
  
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      label: "Find Jobs",
      onClick: scrollToJobCard,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Resources",
      onClick: scrollToResources,
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  // Dynamic classes based on dark mode and scroll state
  const bgColor = isDark
    ? isScrolled
      ? "bg-gray-900/95"
      : "bg-gray-900/80"
    : isScrolled
      ? "bg-white/95"
      : "bg-white/80";

  const borderColor = isDark ? "border-gray-700" : "border-slate-200";
  const textColor = isDark ? "text-gray-200" : "text-slate-700";
  const hoverTextColor = isDark ? "hover:text-white" : "hover:text-slate-900";
  const hoverBgColor = isDark ? "hover:bg-gray-800" : "hover:bg-slate-100";

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full ${bgColor} backdrop-blur-xl shadow-sm ${borderColor} transition-all duration-300 border-b `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-auto cursor-pointer transition-transform hover:scale-105 hover:drop-shadow-lg"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link, idx) =>
              link.path ? (
                <Link
                  key={idx}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${textColor} ${hoverTextColor} ${hoverBgColor} transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
                >
                  {link.icon && <span className="opacity-80">{link.icon}</span>}
                  <span className="font-semibold">{link.label}</span>
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${textColor} ${hoverTextColor} ${hoverBgColor} transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
                >
                  {link.icon && <span className="opacity-80">{link.icon}</span>}
                  <span className="font-semibold">{link.label}</span>
                </button>
              ),
            )}
          </div>

          {/* Search & Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
           
            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="relative group"
            >
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-64 pl-11 pr-4 py-2.5 ${isDark ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400" : "bg-white border-slate-200 text-slate-700 placeholder-slate-400"} border rounded-xl text-sm focus:outline-none focus:ring-2 ${isDark ? "focus:ring-blue-500/50" : "focus:ring-blue-500"} focus:border-transparent transition-all duration-300 shadow-sm`}
              />

              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-slate-400"}`}
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Search
              </button>
            </form>

            {/* Company Actions */}
            <div
              className={`flex items-center space-x-3 pl-4 ${borderColor} border-l`}
            >
              <Link
                to="/company/login"
                className={`px-4 py-2 text-sm font-medium ${textColor} ${hoverTextColor} ${hoverBgColor} rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
              >
                For Companies
              </Link>
              <Link
                to="/company/register"
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Post a Job</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* User Section */}
            <div className={`pl-4 ${borderColor} border-l`}>
              {!user ? (
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-5 py-2 text-sm font-medium ${textColor} ${hoverTextColor} ${hoverBgColor} rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
                >
                  <User
                    className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-slate-500"}`}
                  />
                  Sign In
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="group relative">
                    <Link
                      to="/dashboard"
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${textColor} ${hoverTextColor} ${hoverBgColor} rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="hidden sm:inline">Account</span>
                      <ChevronDown className="w-4 h-4 opacity-60" />
                    </Link>

                    {/* Dropdown menu (optional enhancement) */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 border border-gray-200 dark:border-gray-700 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/applications"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Applications
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${textColor} ${hoverBgColor} transition-colors`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden ${borderColor} border-t ${isDark ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="px-4 py-5 space-y-4">
            {/* Mobile Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className={`w-full pl-11 pr-4 py-3 ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-slate-50 border-slate-200 text-slate-700"} border rounded-xl text-sm focus:outline-none focus:ring-2 ${isDark ? "focus:ring-blue-500/50" : "focus:ring-blue-500"} focus:border-transparent transition-all`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-slate-400"}`}
              />
              {search && (
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  Search
                </button>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-2">
              {navLinks.map((link, idx) =>
                link.path ? (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl ${textColor} ${hoverBgColor} transition-all duration-200 font-medium`}
                  >
                    {link.icon && (
                      <span className="opacity-80">{link.icon}</span>
                    )}
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={idx}
                    onClick={() => {
                      link.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl ${textColor} ${hoverBgColor} transition-all duration-200 font-medium text-left`}
                  >
                    {link.icon && (
                      <span className="opacity-80">{link.icon}</span>
                    )}
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <div className="pt-2 pb-4 space-y-3">
              <Link
                to="/company/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-5 py-3.5 rounded-xl ${textColor} ${hoverBgColor} transition-colors font-medium`}
              >
                For Companies
              </Link>
              <Link
                to="/company/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-center shadow-md"
              >
                Post a Job
              </Link>
            </div>

            <div className="pt-2">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-xl ${textColor} ${hoverBgColor} transition-colors font-medium`}
                >
                  <User className="w-5 h-5" />
                  Sign In
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl ${textColor} ${hoverBgColor} transition-colors font-medium`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-red-500 ${theme? "hover:bg-red-900/20" : "hover:bg-red-50"} transition-colors font-medium text-left mt-2`}
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
