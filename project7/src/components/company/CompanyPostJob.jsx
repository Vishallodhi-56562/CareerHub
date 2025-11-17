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
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      const res = await axios.post(
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

      setSuccess("Job posted successfully!");
      setJobTitle("");
      setJobDescription("");
      setJobType("full-time");
      setSalary("");
      setLocation("");
      setRequirements("");
    } catch (err) {
      setSuccess("Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[120px] flex justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10">

        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">
          Post a New Job
        </h1>

        {success && (
          <p className="text-center mb-4 text-green-600 font-semibold">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-semibold block mb-1">Job Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Job Description</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="4"
              placeholder="Describe the role, responsibilities, etc..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="font-semibold block mb-1">Job Type</label>
            <select
              className="w-full p-3 border rounded-lg"
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
            <label className="font-semibold block mb-1">Salary</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              placeholder="40000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Location</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Mumbai, Bangalore, Remote..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Requirements</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="3"
              placeholder="Skills, experience, qualifications..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-sky-700"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyPostJob;
