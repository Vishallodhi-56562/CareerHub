import React from "react";

const JobList = ({ jobs = [], onSaveJob, onApplyJob }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No jobs posted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-gray-600 font-medium">
                Category: {job.category}
              </p>
              <p className="text-green-600 font-semibold mt-2">
                Salary: {job.salary}
              </p>
              <button
              onClick={() => onSaveJob(job)}
              className="flex-1 bg-teal-600 text-white rounded-md py-1 hover:bg-teal-500"
            >
              Save
            </button>


              <button
              onClick={() =>onApplyJob}
              className="mt-4 w-full bg-slate-700 text-white rounded-lg py-2 hover:bg-slate-800 transition">
                
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
