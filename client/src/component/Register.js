import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      alert('Passwords do not match. Please try again.');
      return; // Prevent form submission
    }
    try {
      const response = await axios.post('http://localhost:9000/register', {
        name,
        address,
        mobileNumber,
        email,
        password,
      })
      
      console.log(response.data);
      if(response.data.status){
        
        navigate('/login');

      }
      else{
        alert("'Oops, that email is already registered.'")
      }
      // Handle successful registration, e.g., redirect to login page
    } catch (error) {
      console.error(error);
      // Handle registration error
    }
  };

  return (
    <div className='registerPage'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Mobile Number:
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
