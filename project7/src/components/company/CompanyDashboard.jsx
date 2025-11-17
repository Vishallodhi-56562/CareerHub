import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen pt-[120px] p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-sky-700 mb-10">Company Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">

        <Link
          to="/company/post-job"
          className="bg-white p-8 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold text-gray-800">Post a Job</h2>
          <p className="text-gray-600 mt-2">Add a new job opening for users</p>
        </Link>

        <Link
          to="/company/my-jobs"
          className="bg-white p-8 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold text-gray-800">My Jobs</h2>
          <p className="text-gray-600 mt-2">View all jobs your company posted</p>
        </Link>

      </div>
    </div>
  );
};

export default CompanyDashboard;
