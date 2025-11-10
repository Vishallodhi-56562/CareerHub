import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUp from './SignUp'
const AuthoContainer = () => {

    const [showLogin, setShowLogin] = useState(true)
  return (
    <div>
        {showLogin ? <LoginForm/>:<SignUp/>}

        <p>this is the end</p>

        <button onClick={()=>setShowLogin(!showLogin)}
            >
            {showLogin ? "sign up here": "Login here"}</button>
    </div>
  )
}

export default AuthoContainer