import React from 'react'
import Exp from './exp'
import Arrow from './arrow'

function LeftContent() {
  return (
    <div className='h-full  justify-between w-1/3 flex flex-col  '>
       <Exp/>  
       <Arrow/>
         
    </div>
  )
}

export default LeftContent