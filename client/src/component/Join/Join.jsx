import React, { useState } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';

let user;
const Join = () => {
  const [inp,setInp]=useState('');
  const sendUser = () => {
    user=document.getElementById('JoinInput').value;
    document.getElementById('JoinInput').value = '';
  }
  return (
    <div className='JoinPage'>
      <div className="JoinContainer">
        <img src="./logo.png" alt="logo" />
        <h3>Room Chat Join Page</h3>
        <input type="text" id='JoinInput' onChange={(e)=>setInp(e.target.value)} placeholder='Enter your name' />
        <Link to={"/chat"} onClick={(e)=>!inp?e.preventDefault:null}><button className='JoinBtn' onClick={sendUser}>Log In</button></Link>
      </div>
    </div>
  );
};

export default Join;
export { user };