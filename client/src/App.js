

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import React from 'react';


function App() {
  return (
    <div>
       <Router>
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash-board" element={<DashBoard />} />
      </Routes>
    </Router>
    </div>
       
  );
}

export default App;
