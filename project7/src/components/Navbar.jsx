import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import LoginForm from './LoginForm'
import PostAJob from './PostAJob'




const Navbar = ({scrollToResources, scrollToJobCard, isLoggedIn, setIsLoggedIn}) => {

const navigate = useNavigate()

const handleLogout = () =>{
  setIsLoggedIn(false)
  localStorage.removeItem('isLoggedIn')
  navigate('/')
}

  return (
    <nav className='  fixed top-0 left-0 z-50 text-slate-800 flex items-center bg-slate-100 w-screen justify-between py-3 px-6 shadow-md ' >
       <h1
        onClick={() => navigate("/")}
        className="text-3xl font-[600] cursor-pointer font-sans "
      >
        CareerHub
      </h1>

        <div className=' flex items-center  space-x-20 p-4'>
          <Link to="/" className="hover:text-slate-200 bg-slate-300 rounded-xl px-2 shadow-2xl">Home</Link>
        <button className='w-20 shadow-xl hover:text-slate-200  bg-slate-300 rounded-xl px-2 cursor-pointer' onClick={scrollToJobCard}>find jobs</button>
        <Link className='shadow-xl hover:text-slate-200 bg-slate-300 rounded-xl px-2 cursor-pointer' to='/Company'>Companies</Link>
        <button className='shadow-xl hover:text-slate-200 bg-slate-300 rounded-xl px-2 cursor-pointer' onClick={scrollToResources} >Resources</button>
        <Link className='w-23 shadow-xl hover:text-slate-200  bg-slate-300 rounded-xl px-2 cursor-pointer' to='/PostAJob'>post a Job</Link>
         {isLoggedIn && (
          <Link to="/dashboard" className="hover:text-slate-200">Dashboard</Link>
        )}


        </div>
         <div className='space-x-7'>
            <input className='bg-white rounded-4xl p-1 px-5 shadow-2xl outline-none active:border-slate-100 border-1' type='text' placeholder='Search jobs...'></input>
            {!isLoggedIn ?(
            <Link className='shadow-xl  bg-slate-300 rounded-xl px-2 ' to='/LoginForm'>Login</Link>
            ):(
            <button
            onClick={handleLogout}
            className="shadow-md bg-red-500 text-white rounded-xl px-3 py-1"
          >
            Logout
          </button>
  
)}

         </div>
    </nav>
       
  )
}

export default Navbar