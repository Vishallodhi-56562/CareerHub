import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  Trash2,
  LayoutDashboard,
  LogOut,
  UserCog,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const AdminDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [jobs, setJobs] = useState([]);
const [analytics, setAnalytics] = useState(null);


  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setUsersList);

    fetch("/api/admin/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setJobs);
  }, []);

  const handleDeleteJob = async (id) => {
    await fetch(`/api/admin/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setJobs((prev) => prev.filter((job) => job._id !== id));

    fetch("/api/analytics", {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((r) => r.json())
  .then(setAnalytics);


  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-[100px]">

      {/* ------------ SIDEBAR ------------ */}
      <aside className="w-64 bg-white shadow-xl fixed left-0 top-[80px] h-[calc(100vh-80px)] p-6">
        <h2 className="text-2xl font-bold text-sky-600 mb-8 flex items-center gap-2">
          <LayoutDashboard size={28} /> Admin Panel
        </h2>

        <nav className="flex flex-col space-y-5 text-gray-700">
          <button
            className="flex items-center gap-3 text-lg hover:text-sky-600"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Users size={20} /> Users
          </button>

          <button
            className="flex items-center gap-3 text-lg hover:text-sky-600"
            onClick={() => window.scrollTo(0, 600)}
          >
            <Briefcase size={20} /> Jobs
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-3 text-lg text-red-600 hover:text-red-700 mt-12"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* ------------ MAIN CONTENT ------------ */}
      <main className="flex-1 ml-64 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h1>
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-xl shadow">
            <UserCog size={22} className="text-sky-600" />
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-sky-600 mt-3">{usersList.length}</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Jobs</h3>
            <p className="text-3xl font-bold text-sky-600 mt-3">{jobs.length}</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-600">Live Admin</h3>
            <p className="text-3xl font-bold text-sky-600 mt-3">1</p>
          </div>
        </div>
         
          {/* ANALYTICS CHARTS */}
<section className="mt-16">
  <h2 className="text-2xl font-semibold text-gray-700 mb-6">Analytics Overview</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    
    {/* BAR CHART — Jobs per Month */}
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Job Posts Per Month
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={
  analytics?.monthlyJobs?.map(item => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][item._id - 1],
    jobs: item.total
  })) || []
}
 >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jobs" fill="#0ea5e9" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* PIE CHART — User Role Distribution */}
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        User Role Distribution
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={[
  { name: "Admins", value: analytics?.adminCount || 0 },
  { name: "Users", value: analytics?.userCount || 0 }
]}

            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#0ea5e9"
            label
          >
            <Cell fill="#0ea5e9" />
            <Cell fill="#6366f1" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* LINE CHART — Applications over time */}
  <div className="mt-10 bg-white p-6 shadow-lg rounded-xl">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      Applications Trend
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[
        { month: "Jan", apps: 20 },
        { month: "Feb", apps: 32 },
        { month: "Mar", apps: 15 },
        { month: "Apr", apps: 40 },
        { month: "May", apps: 27 },
        { month: "Jun", apps: 36 }
      ]}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="apps" stroke="#0ea5e9" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</section>


        {/* USERS TABLE */}
        <section id="users">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {usersList.map((u) => (
                  <tr key={u._id} className="border-b py-3">
                    <td className="py-2">{u.name}</td>
                    <td>{u.email}</td>
                    <td className="text-sky-600 font-semibold">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* JOBS TABLE */}
        <section className="mt-14" id="jobs">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Jobs</h2>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3">Title</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b">
                    <td className="py-3">{job.title}</td>
                    <td>{job.company}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-500 flex items-center gap-2"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
