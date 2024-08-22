import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL 
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('9048154979');
  const [password, setPassword] = useState('12345678');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent default form submission

    // Perform login validation and error handling here
    if (!adminId || !password) {
      setErrorMessage('Please enter your adminId and password.');
      return;
    } 
    try {
        
        const response = await axios.post(`${baseUrl}/admin`, {
          adminId,
          password,
        });
          console.log(response)
        if (response.data.adminLoggedIn) {
          localStorage.setItem("adminToken",response.data.token)
          localStorage.setItem("id",response.data.id)
          setErrorMessage("")
          navigate("/dash-board")

        } else {
          
          setErrorMessage('Invalid adminId or password.');
        }
      } catch (error) {
       
        setErrorMessage('An error occurred. Please try again later.');
      }
   
  };

  return (
    <div className="login-container">
    <div id="login" >
      <img src="../../logo.png" alt="XYZ Bank Logo" className="logo" width="100px" /> {/* Add logo image URL */}
      <h2>XYZ Bank Admin Login</h2>
      <form name="form-login" onSubmit={handleSubmit}>
        <span className="fontawesome-user"></span>
        <input
          type="text"
          id="user"
          placeholder="adminId"
          value={adminId}
          onChange={(event) => setAdminId(event.target.value)}
        />

        <span className="fontawesome-lock"></span>
        <input
          type="password"
          id="pass"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}

        <input type="submit" value="Login" />
      </form>
    </div>
    </div>
  );
};

export default Login;
