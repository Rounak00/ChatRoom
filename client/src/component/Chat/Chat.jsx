import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join'
import socketIo from 'socket.io-client'
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../assets/closeIcon.png'
import './Chat.css'

let socket;
const ENDPOINT = "http://localhost:3000/";
const Chat = () => { 
    const [id,setId]=useState("");
    const [messages,setMessages]=useState([]);
    const send=()=>{
       const message= document.getElementById('chatInput').value;
       if(message.length!==0){ 
        socket.emit("message",{message,id});
       }
        document.getElementById('chatInput').value='';
    }
    useEffect(()=>{
         socket=socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
            console.log("connected to socket server",socket.id);
            setId(socket.id);
        })
        socket.emit('joined',{user});
        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
        })
        socket.on("userJoined",(data)=>{
            setMessages([...messages,data]);
        })
       
        socket.on("leave",(data)=>{
            setMessages([...messages,data]);
        })
        return () => {
            // socket.emit('disconnect');
            socket.disconnect();
            socket.off();
        }
    },[]);
    useEffect(()=>{
        socket.on("sendMessage",(data)=>{
            setMessages([...messages,data]);
        })
        return () => {
            socket.off();
        }
    },[messages])
  return (
     <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>Chat Room</h2>
                <a href='/'> <img src={closeIcon} alt="logo" /></a>
            </div>
            <ReactScrollToBottom className="chatBox">
                {
                    messages.map((item,index)=>(
                        <Message message={item.message} user={item.id===id? "":item.user} key={index} classs={item.id===id? "right":"left"}/>
                    ))
                }
            </ReactScrollToBottom>
            <div className="inputBox">
               <input type="text"  id='chatInput'/>
                <button className='sendBtn' onClick={send}>send</button>
            </div>
        </div>
     </div>
  )
}

export default Chat