import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiPlus,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiLogOut,
  FiSettings,
  FiEye,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingReview: 0,
  });

  // Mock data - replace with real API call
  useEffect(() => {
    // Simulate fetching company stats
    setTimeout(() => {
      setStats({
        totalJobs: 12,
        activeJobs: 8,
        totalApplications: 0,
        pendingReview: "no pending review",
      });
    }, 500);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    navigate("/company/login");
  };

  const dashboardCards = [
    {
      title: "Post New Job",
      description: "Create a new job posting and reach talented candidates",
      icon: <FiPlus className="text-3xl" />,
      link: "/company/post-job",
      color: "from-sky-500 to-cyan-400",
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-400",
    },
    {
      title: "My Job Postings",
      description: "View and manage all your active job listings",
      icon: <FiBriefcase className="text-3xl" />,
      link: "/company/my-jobs",
      color: "from-purple-500 to-pink-400",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Applications",
      description: "Review and manage candidate applications",
      icon: <FiFileText className="text-3xl" />,
      link: "/company/applications",
      color: "from-emerald-500 to-teal-400",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Analytics",
      description: "Track performance metrics and hiring insights",
      icon: <FiTrendingUp className="text-3xl" />,
      link: "/company/analytics",
      color: "from-orange-500 to-amber-400",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
  ];

  const statsCards = [
    {
      label: "Total Jobs Posted",
      value: stats.totalJobs,
      icon: <FiBriefcase />,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Active Postings",
      value: stats.activeJobs,
      icon: <FiCheckCircle />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: <FiUsers />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Pending Review",
      value: stats.pendingReview,
      icon: <FiClock />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-12 px-4  relative overflow-hidden ">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <FiBriefcase className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-white">
                    Company Dashboard
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Manage your job postings and applications
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/company/settings"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <FiSettings size={18} />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
              >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center ${card.iconColor} mb-6 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Action indicator */}
                <div className="flex items-center text-sm text-slate-400 group-hover:text-sky-400 transition-colors">
                  <span>Go to {card.title.toLowerCase()}</span>
                  <svg 
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity -z-10`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
            <Link
              to="/company/activity"
              className="text-sm text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4">
            {[
              { action: "New application received", job: "Senior Frontend Developer", time: "2 hours ago", icon: <FiUsers />, color: "text-emerald-400" },
              { action: "Job posting published", job: "UX/UI Designer", time: "5 hours ago", icon: <FiCheckCircle />, color: "text-sky-400" },
              { action: "Application reviewed", job: "Backend Engineer", time: "1 day ago", icon: <FiEye />, color: "text-purple-400" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  {React.cloneElement(activity.icon, { size: 18 })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">{activity.action}</p>
                  <p className="text-slate-400 text-sm truncate">{activity.job}</p>
                </div>
                <div className="text-slate-500 text-xs flex-shrink-0">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if no activity */}
          {/* <div className="text-center py-12">
            <FiClock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 mb-1">No recent activity</p>
            <p className="text-slate-500 text-sm">Your activity will appear here</p>
          </div> */}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyDashboard;