import React, { use, useState } from 'react'
import './Login.css'

import email_icon from '../Assests/email.png'
import password_icon from '../Assests/password.png'
import profile_icon from '../Assests/profile.png'

export const Login = () => {

    const[action,setAction] = useState("Login");

  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={profile_icon} alt=""/>
                    <input type="text" placeholder="username"/>
                </div>
                <div className='input'>
                    <img src={email_icon} alt=""/>
                    <input type="email" placeholder="email"/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=""/>
                    <input type="password" placeholder="password"/>
                </div>
            </div>
            <div className="forgot-password">Lost Password?<span>Click Here!</span></div>
            <div className="submit-container">
                <div className={action==="Login" ? "submit gray":"submit"} onClick={() => setAction("Signup")}>Signup</div>
                <div className={action==="Signup"?"submit gray":"submit"} onclick={()=>{setAction("Login")}}>Login</div>
            </div>
    </div>
  )
}

export default Login;