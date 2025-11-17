import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("q");

  useEffect(() => {
    axios
      .get(`/api/jobs/search?q=${query}`)
      .then((res) => setJobs(res.data));
  }, [query]);

  return (
    <div className="pt-[120px] px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-sky-700">
        Search Results for: "{query}"
      </h1>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            
            <h2 className="text-xl font-bold">{job.jobTitle}</h2>
            <p className="text-gray-600">{job.jobDescription}</p>

            <div className="mt-4 flex justify-between">
              <span>{job.jobType}</span>
              <span>{job.location}</span>
              <span className="font-semibold text-sky-600">₹{job.salary}</span>
            </div>

          </div>
        ))}

        {jobs.length === 0 && (
          <p className="text-gray-600 text-xl">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
