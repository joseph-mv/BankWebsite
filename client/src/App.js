

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';
import DashBoard from './component/DashBoard';
import React from 'react';

function App() {
  return (
   
          <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash-board" element={<DashBoard />} />
      </Routes>
    </Router>
       
  );
}

export default App;
