import React from 'react'
import RightCard from './RightCard'
function RightContent(props) {
  return (
    <div className='h-full w-2/3 overflow-x-auto bg-blue-600 py-5 px-5 flex gap-6'>
        {props.users.map(function(elem){

          return <RightCard img={elem.img}/>
        }
        )}
    </div>
  )

}

export default RightContent