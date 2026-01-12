import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./context/AuthProvider.jsx";
import  './index.css'
import Layout from "./components/Layout";

import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PostAJob from "./components/PostAJob";
import Company from "./components/Company";
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

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES WITHOUT NAVBAR */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/apply/:jobId" element={<ApplyForm />} />
          <Route path="/search" element={<SearchResults />} />


        {/* ROUTES WITH NAVBAR */}
        <Route element={<Layout />}>
         
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
                {user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/post-a-job"
            element={
              <PrivateRoute>
                <PostAJob />
              </PrivateRoute>
            }
          />

          {/* COMPANY ROUTES */}
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/post-job" element={<CompanyPostJob />} />
          <Route path="/company/my-jobs" element={<MyJobs />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
