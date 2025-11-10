import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Category from './components/Category'
import Thus from './components/Thus'
import AuthoContainer from './components/AuthoContainer'
import JobCard from './components/JobCard'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import PostAJob from './components/PostAJob'
import Resources from './components/Resources'
import Company from './components/Company'
import JobList from './components/JobList';
import ApplyForm from './components/ApplyForm'
import AdminDashboard from './components/AdminDashboard'



const App = () => {
   
  const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [jobs, setJobs] = useState([]);


  useEffect(() =>{
        const savedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(savedLogin);

     const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(storedJobs)
  }, []);
 
 useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);


  const addJob = (job) => {
    setJobs((prevJobs) => {
      const updatedJobs = [...prevJobs, job]
    localStorage.setItem("jobs", JSON.stringify(updatedJobs)); // ← fixed
     return updatedJobs
  })
  }


  return (
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} jobs={jobs} />} />

        <Route path="/LoginForm" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path="/Dashboard" element ={isLoggedIn ?(
          <Dashboard/> 
          ):(
            <Navigate to='/login' replace/>
          )}/>
           <Route
          path="/admin-dashboard"
          element={
            isLoggedIn && localStorage.getItem("role") === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/PostAJob" element={<PostAJob addJob={addJob}/>} />
        <Route path='/Company' element={<Company/>}/>


      </Routes>

          </Router>
     </>
     
  )
}

export default App