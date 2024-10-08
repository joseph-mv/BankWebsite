

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import React from 'react';
import ScrollToTop from '../src/component/ScrollToTop/ScrollToTop'

import './App.css'
function App() {
  
  return (
    <div>
       <Router>
      <ScrollToTop/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash-board" element={<DashBoard />}  />
        
      </Routes>
    </Router>
    </div>
       
  );
}

export default App;
