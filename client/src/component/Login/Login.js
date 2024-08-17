import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl+'/login', { email, password });
      console.log(response.data);
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("user_Id", response.data.userId);
        navigate('/dash-board');
      } else {
        alert(response.data.loggedError);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginContainer">
      <div className="interactiveSection">
        <h2>Welcome Back!</h2>
        <p>Log in to manage your account and explore our services.</p>
        <div className="carousel">
          <div className="carousel-content">
            <p>"Secure and reliable."</p>
            <p>"Access your account anytime."</p>
            <p>"Your banking made easy."</p>
          </div>
        </div>
      </div>
      <div className="loginPage">
        <div className='loginform'>
          {token && <p className="logged-in">Already logged in!</p>}
          {!token && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
