import React, { useState } from 'react'

const App = () => {

 const [title, setTitle] = useState('')
const [details, setDetails] = useState('')

const [task, setTask] = useState([])

  const submitHandler = (e)=>{
    e.preventDefault()
    
    const copyTask =[...task]
    copyTask.push({title,details})
    
    setTask(copyTask)

    setTitle('')
    setDetails('')
   
  }
   const deleteNote = (idx) => {
      const copyTask = [...task]
      console.log(idx)
      copyTask.Splice(idx,1)

      setTask({copyTask})
    }

  return (
    <div className=' h-screen bg-red-100  text-black'>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}
       className='flex lg:w-1/2 items-start flex-col gap-4 p-10'>
        <input 
        type='text'
         placeholder='Enter Note here'
          className='px-5 w-1/2 py-2 border-2 outline-none rounded'
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
          ></input>

        <textarea type='text'
         placeholder='Write Details'
          className='px-5 items-start w-1/2 h-20 py-2 border-2 rounded'
          value={details}
          onChange={(e)=>{
            setDetails(e.target.value)
          }}
          ></textarea> 
        <button className='bg-white text-black px-5 py-2  rounded w-1/2 items-start'>Add Note</button>
      </form>
      <div className='lg:w-1/2 lg:border-1-2 p-10'>
        <h1 className='text-4xl font-bold'>Your Notes</h1>
        <div className='flex flex-wrap gap-5 mt-6 h-full overflow-auto'>
          {task.map(function(elem,idx){
            return <div key={idx} className='flex justify-between flex-col items-start relative rounded-2xl text-black h-50  w-40 bg-amber-200'>
              <div>
                <h3 className='leading-tight text-2xl font-bold pl-5 mt-4 '>{elem.title}</h3>
                <p className='mt-3 pl-5  leading-tight font-medium text-gray-500'>{elem.details}</p>
              </div>
              <button onClick={() => {
                deleteNote(idx)
              } } className='w-full active:scale-95 cursor-pointer bg-red-500 py-1 text-xl rounded font-bold '>Delete</button>
            </div>

            
          })}
         
        </div>
      </div>
    </div>
  )
}

export default App