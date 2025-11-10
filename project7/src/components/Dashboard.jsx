import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import JobList from "./JobList";

export default function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // saved from login

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // === FETCH JOBS ===
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch jobs:", err));

    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSavedJobs(data.savedJobs || []);
        setApplications(data.appliedJobs || []);
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [userId]);

  // === FILTER JOBS ===
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
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
  else displayJobs = filteredJobs;

  return (
    <div className="flex min-h-screen bg-gray-100 pt-20">
      <aside className="w-64 bg-teal-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`block w-full text-left ${
                activeTab === "all" ? "text-orange-400" : ""
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`block w-full text-left ${
                activeTab === "saved" ? "text-orange-400" : ""
              }`}
            >
              Saved Jobs
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`block w-full text-left ${
                activeTab === "applications" ? "text-orange-400" : ""
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`block w-full text-left ${
                activeTab === "settings" ? "text-orange-400" : ""
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-orange-600 py-2 rounded-lg mt-8 hover:bg-orange-500"
        >
          Log Out
        </button>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">
          {activeTab === "saved"
            ? "Saved Jobs"
            : activeTab === "applications"
            ? "Your Applications"
            : "Available Jobs"}
        </h1>

        {activeTab === "all" && (
          <Category onCategorySelect={setSelectedCategory} />
        )}

        <JobList
          jobs={displayJobs}
          onSaveJob={handleSaveJob}
          onApplyJob={handleApplyJob}
        />
      </main>
    </div>
  );
}
