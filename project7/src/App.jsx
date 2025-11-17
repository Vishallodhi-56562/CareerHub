import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "./context/AuthProvider.jsx";
import "./index.css"
import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp";
import Category from "./components/Category";
import AuthoContainer from "./components/AuthoContainer";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PostAJob from "./components/PostAJob";
import Resources from "./components/Resources";
import Company from "./components/Company";
import JobList from "./components/JobList";
import ApplyForm from "./components/ApplyForm";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MyJobs from "./components/company/MyJobs";
import CompanyRegister from "./components/company/CompanyRegister";
import CompanyLogin from "./components/company/CompanyLogin";
import CompanyDashboard from "./components/company/CompanyDashboard";
import CompanyPostJob from "./components/company/CompanyPostJob";
import SearchResults from "./components/SearchResults";

const App = () => {
  const { user } = useContext(AuthContext);

  const RouteInspector = () => {
  const location = useLocation();
  console.log("ROUTE INSPECTOR -> current pathname:", location.pathname);
  return (
    <div style={{position: "fixed", right: 10, bottom: 10, background: "white", padding: 6, border: "1px solid #ccc", zIndex: 9999}}>
       {location.pathname}
    </div>
  );
};


  return (
    <Router>
      <Navbar />
         <RouteInspector />
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />}
            </PrivateRoute>
          }
        />

        <Route
          path="/PostAJob"
          element={
            <PrivateRoute>
              <PostAJob />
            </PrivateRoute>
          }
        />

        <Route path="/Company" element={<Company />} />
        <Route path="/apply/:jobId" element={<ApplyForm />} />
        <Route path="/JobCard" element={<JobCard />} />
       

<Route path="/company/register" element={<CompanyRegister />} />
<Route path="/company/login" element={<CompanyLogin />} />
<Route path="/company/dashboard" element={<CompanyDashboard />} />
<Route path="/company/post-job" element={<CompanyPostJob />} />
<Route path="/company/my-jobs" element={<MyJobs />} />
<Route path="/search" element={<SearchResults />} />

      </Routes>
    </Router>
  );
};

export default App;
