import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      alert("Access denied");
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setUsers)
      .catch(console.error);

    fetch("http://localhost:5000/api/admin/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  const handleDeleteJob = async (id) => {
    await fetch(`http://localhost:5000/api/admin/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">
        Admin Dashboard
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <ul className="bg-white p-4 rounded-lg shadow">
          {users.map((u) => (
            <li key={u._id} className="border-b py-2">
              {u.name} — {u.email} ({u.role})
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Jobs</h2>
        <ul className="bg-white p-4 rounded-lg shadow">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {job.title} — {job.company}
              </span>
              <button
                onClick={() => handleDeleteJob(job._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
