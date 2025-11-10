import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const JobCard = ({selectedCategory}) => {
    const [jobs, setJobs] = useState([]);
const navigate =useNavigate()


  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

   const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;



if (!filteredJobs || filteredJobs.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No jobs posted yet.{selectedCategory || "any category"}</div>;
  }




  return (
    <div className="w-screen flex flex-wrap justify-center gap-10 p-10 bg-gray-50">
      {filteredJobs.map((job) => (
        <div key={job._id} className="w-[320px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-200 overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-xl font-semibold text-gray-800">{job.company}</h3>
            <span className="text-sm text-gray-500">{job.posted}</span>
          </div>
          <div className="px-5 pb-4">
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.category}</p>
            <p className="text-gray-600 mt-1">{job.location}</p>
            <p className="text-gray-600 mt-1">Salary: ₹{job.salary}</p>
            <button 
            onClick={() => navigate(`/apply/${job._id}`)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition active:bg-slate-400">
              Apply Now
            </button>
          </div>
      
        </div>
        ))}
    </div>
  
  )
}

export default JobCard