import React, { useState } from 'react'

const App = () => {
  
const [num, setNum] = useState(0)

function increaseNum(){
  setNum(num+1)
}
function decreaseNum(){
  setNum(num-1)
}


  return (
    <div>
      <h1>{num}</h1>
      <button onClick={increaseNum}>Increase</button>
       <button onClick={decreaseNum}>Decrease</button>
    </div>
  )
}

export default App