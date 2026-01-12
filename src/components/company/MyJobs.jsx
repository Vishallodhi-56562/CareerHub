import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const MyJobs = () => {
  const { token, user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/company/jobs/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 lg:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-2">
              Company • Job Dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-50">
              My Posted Jobs
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Review and manage all the roles you&apos;ve published. Track open positions,
              refine descriptions, and keep your job board always up to date.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs text-slate-400">Logged in as</span>
              <span className="text-sm font-medium text-slate-100">
                {user?.companyName || user?.email || "Company Account"}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active Employer
              </span>
            </div>

            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-sky-500/40">
              HR
            </div>
          </div>
        </div>

        {/* Card Wrapper */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)] p-4 sm:p-6 lg:p-8">
          {/* Top Bar / Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-slate-800 flex items-center justify-center text-[11px] font-semibold text-slate-200">
                {jobs.length || 0}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-100">
                  {jobs.length > 0 ? "Active Job Posts" : "No Jobs Posted Yet"}
                </p>
                <p className="text-xs text-slate-500">
                  {jobs.length > 0
                    ? "Your current openings are listed below."
                    : "Once you post a job, it will appear here."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Live positions only
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-1">
                ₹ Salary in local currency
              </span>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-2 w-2 animate-ping rounded-full bg-sky-400" />
                <span>Loading your job posts…</span>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
                +
              </div>
              <h2 className="text-sm font-medium text-slate-100 mb-1">
                No jobs posted yet
              </h2>
              <p className="text-xs text-slate-500 max-w-xs">
                Start by creating your first job posting from the &quot;Post a New Job&quot;
                section. Once created, it will appear here with all its details.
              </p>
            </div>
          )}

          {/* Jobs Grid / List */}
          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 flex flex-col h-full transition hover:border-sky-500/60 hover:bg-slate-900 hover:shadow-[0_18px_60px_rgba(8,47,73,0.75)]"
                >
                  {/* Accent gradient bar */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 opacity-60" />

                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-50 line-clamp-2">
                      {job.jobTitle}
                    </h2>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
                      {job.jobType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-4">
                    {job.jobDescription}
                  </p>

                  <div className="mt-auto space-y-3">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        {job.location || "Location not specified"}
                      </span>
                      <span className="font-semibold text-sky-300">
                        ₹{job.salary || "—"}
                      </span>
                    </div>

                    {/* Footer actions (placeholder for edit/view) */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        className="text-[11px] font-medium text-sky-300 hover:text-sky-200 transition"
                      >
                        View details
                      </button>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%)]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;