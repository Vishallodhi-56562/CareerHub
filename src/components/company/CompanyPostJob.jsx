import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const CompanyPostJob = () => {
  const { token, user } = useContext(AuthContext);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await axios.post(
        "/api/company/jobs/post",
        {
          jobTitle,
          jobDescription,
          jobType,
          salary,
          location,
          requirements,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus({ type: "success", message: "Job posted successfully!" });

      setJobTitle("");
      setJobDescription("");
      setJobType("full-time");
      setSalary("");
      setLocation("");
      setRequirements("");
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to post job. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-[0_25px_80px_rgba(15,23,42,0.9)] rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {/* Left / Branding Panel */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-500 text-white relative p-10 flex-col justify-between">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,transparent_55%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Hiring Dashboard
            </div>
            <h1 className="mt-6 text-3xl font-semibold leading-tight">
              Post roles that
              <span className="block text-slate-50">top talent notices.</span>
            </h1>
            <p className="mt-4 text-sm text-sky-50/80">
              Create modern, detailed job posts and share them with thousands of
              candidates. Track applications, manage listings, and grow your team
              faster.
            </p>
          </div>

          <div className="relative mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </div>
              <div>
                <p className="font-medium">Smart Job Posting</p>
                <p className="text-xs text-sky-50/80">
                  Clear structure and fields that attract the right applicants.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              </div>
              <div>
                <p className="font-medium">Instant Publishing</p>
                <p className="text-xs text-sky-50/80">
                  Your position goes live as soon as you hit “Post Job”.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 text-xs text-sky-50/70">
            Logged in as{" "}
            <span className="font-semibold">
              {user?.companyName || user?.email || "Company Account"}
            </span>
          </div>
        </div>

        {/* Right / Form Panel */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-10">
          {/* Header (visible on mobile too) */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-1">
                  Company • Job Posting
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                  Post a New Job
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  Fill out the details below to publish your job opening.
                </p>
              </div>
              <div className="md:hidden flex-shrink-0">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                  HR
                </div>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {status.message && (
            <div
              className={`mb-5 rounded-2xl border px-4 py-3 text-sm flex items-start gap-3 ${
                status.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-200"
              }`}
            >
              <span
                className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                  status.type === "success"
                    ? "bg-emerald-400"
                    : "bg-rose-400"
                }`}
              />
              <p className="leading-relaxed">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-100">
                  Job Title
                </span>
                <span className="text-[11px] text-slate-500">
                  e.g. Senior Software Engineer
                </span>
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                placeholder="Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-100">
                  Job Description
                </span>
                <span className="text-[11px] text-slate-500">
                  Role, responsibilities, impact
                </span>
              </label>
              <textarea
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                rows="4"
                placeholder="Describe the responsibilities, challenges, and what success looks like in this role."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Line of two columns on md+ : Job Type / Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-slate-100">
                  Job Type
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-100">
                    Salary
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Annual (in your currency)
                  </span>
                </label>
                <input
                  type="number"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                  placeholder="40000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-100">
                  Location
                </span>
                <span className="text-[11px] text-slate-500">
                  e.g. Mumbai, Bangalore, Remote
                </span>
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                placeholder="Mumbai, Bangalore, Remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-100">
                  Requirements
                </span>
                <span className="text-[11px] text-slate-500">
                  Skills, experience, qualifications
                </span>
              </label>
              <textarea
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition"
                rows="3"
                placeholder="Required skills, years of experience, tech stack, education, etc."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              ></textarea>
            </div>

            {/* Submit + Helper Text */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99] transition"
              >
                <span>Post Job</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                Your job post will become visible to candidates immediately after
                submission. You can edit or unpublish it anytime from your company
                dashboard.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyPostJob;