import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const PostAJob = ({addJob}) => {

const [title, setTitle] = useState('')
const [company, setCompany] = useState('')
const [location, setLocation] = useState('')
const [salary, setSalary ] = useState('')
const [category, setCategory] = useState('')
  const navigate = useNavigate()

const handleSubmite =async (e) =>{
    e.preventDefault()

 if (!title || !company || !location || !salary || !category) {
      alert("Please fill all fields");
      return;
    }

    const newJob = {  title, company, location, salary, category};

try {
  const res =   await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
    });

     if (!res.ok) throw new Error("Failed to save job");

    const data = await res.json();
    console.log("Saved:", data);


        navigate('/')


  } catch (err) {
    console.error("Failed to save job", err);
    alert("Error posting job");
  }



    addJob(newJob);

    setTitle('')
    setCompany('')
    setLocation('')
    setSalary('')
    setCategory('')
}


return (
    <div className='bg-gray-400 items-center justify-center flex flex-col h-screen w-screen p-4'>

        <form onSubmit={handleSubmite} className='flex flex-col space-x-5 gap-10'>
            <h2 className='text-3xl'>Post a job</h2>
            
            <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='bg-gray-100 rounded-3xl border-gray-300 outline-none p-2 px-3 border-2 focus:ring-2 focus:ring-slate-500' >
          <option value='' disabled>
            Select Job Category
          </option>
          <option>Healthcare and Medicine</option>
          <option>Technology and IT</option>
          <option>Finance and Accounting</option>
          <option>Arts and Design</option>
          <option>Education and Training</option>
          <option>Sales and Marketing</option>
          <option>Management and Leadership</option>
          <option>Skilled Trades and Labour</option>
          <option>Science and Research</option>
          <option>Service Industry</option>
        </select>


            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
             className='bg-white rounded-2xl border-gray-300 w-70 outline-none flex p-1 px-3 border-2 focus:ring-2 focus:ring-slate-500' type='text' placeholder='Job Title'></input>
           
            <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}  className='bg-white border-gray-300 rounded-2xl w-70 outline-none flex p-1 px-3 border-2 focus:ring-2 focus:ring-slate-500 ' type='text' placeholder='Compony Name'></input>
            
            <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}  className='bg-white border-gray-300 rounded-2xl w-70 outline-none flex p-1 px-3 border-2 focus:ring-2 focus:ring-slate-500 ' type='text' placeholder='Location'></input>
            <input 
            value={salary}
            onChange={(e) => setSalary(e.target.value)} className='bg-white border-gray-300 rounded-2xl w-70 outline-none flex p-1 px-3 border-2 focus:ring-2 focus:ring-slate-500' type='text' placeholder='Salary'></input>

 



           
            <button className="bg-slate-600 text-white w-70 font-semibold py-2 rounded-3xl hover:bg-slate-700 active:scale-95 transition" type='submit '> Post</button>
        </form>
    </div>
  )
}

export default PostAJob