import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const MyJobs = () => {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/company/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-[120px] px-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">My Posted Jobs</h1>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800">{job.jobTitle}</h2>
            <p className="text-gray-600">{job.jobDescription}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {job.jobType.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">{job.location}</span>
              <span className="text-sm font-semibold text-sky-600">
                ₹{job.salary}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
