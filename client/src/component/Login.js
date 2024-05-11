import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('j@g');
  const [password, setPassword] = useState('1');
  const navigate = useNavigate();
 const token=localStorage.getItem("token")
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', { email, password });
      // Handle successful login
      console.log(response.data);
      if(response.data.status){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("user_Id",response.data.userId)
        navigate('/dash-board');
      }
      else{
        alert(response.data.loggedError)
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  }

  return (
    <div className="loginPage">
      <div className='loginform'>
        {token && <p className="logged-in">Already logged in!</p>}  {/* Display if token exists */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
