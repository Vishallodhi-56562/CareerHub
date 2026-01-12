import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FiExternalLink, FiMapPin, FiDollarSign, FiClock, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";

const JobCard = ({ selectedCategory }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const navigate = useNavigate();

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      try {
        setSavedJobs(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading saved jobs:', e);
      }
    }
  }, []);

  // Save to localStorage when savedJobs changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify([...savedJobs]));
  }, [savedJobs]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch("http://localhost:5000/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setJobs(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getSalaryDisplay = (salary) => {
    if (!salary) return "Negotiable";
    if (typeof salary === 'object') {
      return `₹${Number(salary.min).toLocaleString()} - ₹${Number(salary.max).toLocaleString()}`;
    }
    return `₹${Number(salary).toLocaleString()}`;
  };

  const getExperienceLevel = (level) => {
    switch(level) {
      case 'entry': return 'Entry Level';
      case 'mid': return 'Mid Level';
      case 'senior': return 'Senior Level';
      default: return level || 'Not specified';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!filteredJobs || filteredJobs.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20">
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any jobs in {selectedCategory || "the selected category"}. 
            Try adjusting your filters or check back later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Refresh Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedCategory ? `${selectedCategory} Opportunities` : "Featured Job Openings"}
        </h2>
        <p className="text-gray-600">
          {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-gray-200"
          >
            {/* Gradient Header */}
            <div className="h-2 bg-gradient-to-r from-orange-500 to-blue-600"></div>
            
            {/* Card Content */}
            <div className="p-6">
              {/* Company Info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {job.company || "Company Name"}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <FiClock className="text-gray-400" />
                    <span>Posted {job.posted || "recently"}</span>
                  </div>
                </div>
                
                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveJob(job._id);
                  }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    savedJobs.has(job._id)
                      ? 'text-red-500 bg-red-50 hover:bg-red-100'
                      : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                  }`}
                  aria-label={savedJobs.has(job._id) ? "Remove from saved" : "Save job"}
                >
                  {savedJobs.has(job._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              {/* Job Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors cursor-pointer"
                  onClick={() => navigate(`/apply/${job._id}`)}>
                {job.title || "Job Title"}
              </h2>

              {/* Job Details */}
              <div className="space-y-3 mb-6">
                {/* Category & Experience */}
                <div className="flex flex-wrap gap-2">
                  {job.category && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {job.category}
                    </span>
                  )}
                  {job.experienceLevel && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      {getExperienceLevel(job.experienceLevel)}
                    </span>
                  )}
                  {job.employmentType && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                      {job.employmentType}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMapPin className="text-gray-400" />
                  <span>{job.location || "Remote"}</span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2 text-gray-600">
                  <FiDollarSign className="text-gray-400" />
                  <span className="font-medium">{getSalaryDisplay(job.salary)}</span>
                </div>

                {/* Benefits (if available) */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Benefits</p>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                          {benefit}
                        </span>
                      ))}
                      {job.benefits.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                          +{job.benefits.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <button
                onClick={() => navigate(`/apply/${job._id}`)}
                className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/button"
              >
                <span>Apply Now</span>
                <FiArrowRight className="group-hover/button:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Quick View (on hover for desktop) */}
              <div className="mt-4 pt-4 border-t border-gray-100 hidden group-hover:block">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Quick Apply:</strong> {job.quickApply ? 'Yes' : 'No'}
                </p>
                {job.deadline && (
                  <p className="text-sm text-gray-600">
                    <strong>Deadline:</strong> {job.deadline}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth transitions */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Button hover effect */
        .group/button:hover {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default JobCard;