import React, { useState } from 'react'
import "./Join.css"
import logo from"../../Images/chat_logo.png"
import {Link} from "react-router-dom"

let user;
const sendUser=()=>{
  user=document.getElementById('joinInput').value;
  document.getElementById('joinInput').value=""
}

function Join() {
  
  const[name,setName]=useState("");
  





  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt="logo" />
            <h1>WE CHAT</h1>
            <input onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' type="text" id="joinInput" />
            <Link to="/chat" onClick={(event)=>!name?event.preventDefault():null } > <button  onClick={sendUser} className='joinbtn'>Join</button></Link>
        </div>
    </div>
  )
}

export default Join
export { user }
