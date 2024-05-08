import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', { email, password });
      // Handle successful login
      console.log(response.data);
      if(response.data.status){
        localStorage.setItem('token', response.data.token);
        navigate('/dash-board');
      }
      else{
        alert(response.data.loggedError)
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div>
       <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
    </div>
  );
}

export default Login;
