import React, { useEffect, useState } from 'react'
import {user}  from "../Join/Join"
import socketIo from "socket.io-client"
import "./Chat.css"
import sendLogo from"../../Images/send.png" 
import Message from '../Messages/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../Images/cancel.png"

const ENDPOINT="http://localhost:4500"; 

let socket;
const Chat = () => {
    const[messages,setMessages]=useState([]);
    const[id,setId]=useState("")

    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id})
        document.getElementById('chatInput').value="";
    }
   
   useEffect(()=>{
     socket=socketIo(ENDPOINT,{transports:["websocket"]})
    socket.on('connect',()=>{
        alert("connected");
        setId(socket.id);
    })
    console.log(socket)


    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message );
    })

    socket.on('leave', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message)
    })




    return()=>{
        socket.emit('disconnect');
        socket.off();
    }
 
   },[])

   useEffect(()=>{
    socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message,data.id);
    })
    
    return()=>{
        socket.off(); 
        
    }

   },[messages])


  return (
    <div>
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>We Chat</h2>
                    <a href='/'><img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
                </ReactScrollToBottom>
                <div className='inputBox'>
                   <input onKeyPress={(event)=>event.key==='Enter'?send():null }  type="text" id="chatInput" />
                   <button  onClick={send} className="sendBtn"><img src={sendLogo} alt="Send"/></button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Chat

