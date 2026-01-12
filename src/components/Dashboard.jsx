import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import JobList from "./JobList";
import {
  FiBriefcase,
  FiBookmark,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiUser,
  FiSearch,
  FiFilter,
  FiMenu,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

export default function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // === FETCH JOBS ===
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:5000/api/jobs").then((res) => res.json()),
      fetch(`http://localhost:5000/api/users/${userId}`).then((res) => res.json()),
    ])
      .then(([jobsData, userData]) => {
        setJobs(jobsData);
        setSavedJobs(userData.savedJobs || []);
        setApplications(userData.appliedJobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, [userId]);

  // Close sidebar when tab changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  // === FILTER JOBS ===
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  // Search filter
  const searchedJobs = filteredJobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  // === SAVE JOB (API CALL) ===
  const handleSaveJob = async (job) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/save/${job._id}`,
        { method: "POST" }
      );
      const data = await res.json();
      console.log(data.message);
      setSavedJobs((prev) => [...prev, job]);
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  // === APPLY JOB (API CALL) ===
  const handleApplyJob = async (job) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/apply/${job._id}`,
        { method: "POST" }
      );
      const data = await res.json();
      console.log(data.message);
      setApplications((prev) => [...prev, job]);
    } catch (err) {
      console.error("Error applying for job:", err);
    }
  };

  let displayJobs = [];
  if (activeTab === "saved") displayJobs = savedJobs;
  else if (activeTab === "applications") displayJobs = applications;
  else displayJobs = searchedJobs;

  const menuItems = [
    { id: "all", label: "All Jobs", icon: <FiBriefcase />, count: jobs.length },
    { id: "saved", label: "Saved Jobs", icon: <FiBookmark />, count: savedJobs.length },
    { id: "applications", label: "Applications", icon: <FiFileText />, count: applications.length },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: <FiBriefcase />, color: "text-sky-400", bgColor: "bg-sky-500/10" },
    { label: "Saved Jobs", value: savedJobs.length, icon: <FiBookmark />, color: "text-purple-400", bgColor: "bg-purple-500/10" },
    { label: "Applied", value: applications.length, icon: <FiCheckCircle />, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidde">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <FiUser className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{userName}</h3>
              <p className="text-slate-400 text-xs">Job Seeker</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col z-50
        fixed lg:fixed h-full
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User Profile Section (Desktop only) */}
        <div className="hidden lg:block p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{userName}</h3>
              <p className="text-slate-400 text-xs">Job Seeker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-20 lg:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === item.id ? "text-sky-400" : ""}>
                  {React.cloneElement(item.icon, { size: 20 })}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  activeTab === item.id 
                    ? "bg-sky-500/20 text-sky-300" 
                    : "bg-white/5 text-slate-400"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <FiLogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 relative z-10 mt-20 lg:mt-0">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2">
            {activeTab === "saved"
              ? "Saved Jobs"
              : activeTab === "applications"
              ? "Your Applications"
              : activeTab === "settings"
              ? "Account Settings"
              : "Discover Jobs"}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            {activeTab === "saved"
              ? "Jobs you've bookmarked for later"
              : activeTab === "applications"
              ? "Track your application status"
              : activeTab === "settings"
              ? "Manage your account preferences"
              : "Find your next career opportunity"}
          </p>
        </div>

        {/* Stats Cards (only on "all" tab) */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(stat.icon, { size: window.innerWidth < 640 ? 20 : 24 })}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filter Bar (only on "all" tab) */}
        {activeTab === "all" && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
              >
                <FiFilter size={18} />
                <span className="text-sm sm:text-base">Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Category Carousel (only on "all" tab) */}
        {activeTab === "all" && (
          <div className="mb-6 lg:mb-8 overflow-x-hidden">
            <Category onCategorySelect={setSelectedCategory} />
          </div>
        )}

        {/* Job List */}
        {loading ? (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h2M4 10a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8z" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium text-sm sm:text-base">Loading opportunities...</p>
          </div>
        ) : activeTab === "settings" ? (
          // Settings Content
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Profile Settings</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={userName}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Resume</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 sm:p-8 text-center hover:border-sky-400/50 transition-all cursor-pointer bg-white/5">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-300 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">PDF, DOC (max 5MB)</p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg hover:-translate-y-0.5 text-sm sm:text-base">
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <JobList
            jobs={displayJobs}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
          />
        )}
      </main>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        /* Prevent body scroll when sidebar is open on mobile */
        ${sidebarOpen ? 'body { overflow: hidden; }' : ''}
      `}</style>
    </div>
  );
}