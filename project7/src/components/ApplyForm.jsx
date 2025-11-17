import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null); // store job details
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  useEffect(() => {
    // fetch job details by ID
    fetch(`http://localhost:5000/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => {
              console.log("Fetched job:", data)
        setJob(data)})
      .catch(err => console.error(err));
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.coverLetter) {
      alert("Please fill all fields!");
      return;
    }

    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    applications.push({ jobId, ...formData, date: new Date().toLocaleString() });
    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application submitted successfully!");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-700">
          Apply for: {job ? job.title : "Loading..."}
        </h2>

        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border-2 border-gray-300 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border-2 border-gray-300 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border-2 border-gray-300 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Write your cover letter..."
          className="border-2 border-gray-300 rounded-xl p-2 h-28 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
