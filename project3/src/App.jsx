import React from 'react'
import Section1 from './components/section1/section1'
import Section2 from './components/section2/Section2'

const App = () => {

  const users = [
    {img:' #', intro:' ', tag:'Setisfied '},
    {img:'# ', intro:' ', tag:'underserved '},
    {img:' #', intro:' ', tag:'overskilled '}
  ]
  return (
    <div>
      <Section1 users={users}/>
      <Section2/>
    </div>
  )
}

export default App