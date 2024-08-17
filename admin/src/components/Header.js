import React from 'react';
import './Header.css'; // Import your CSS file
import { Link,useNavigate } from "react-router-dom";

const Header = () => {
    const navigate=useNavigate()
    function handleLogout(){
        localStorage.setItem("adminToken","")
        localStorage.setItem("id","")
        navigate("/")
    }
  return (
    <header className="admin-header">
      <div className="container">
        <div className="header-content">
            <div>
            <a href="#" className="logo">
            <img src="../../logo.png" alt="XYZ Bank Logo" />
          </a>
          <h1>XYZ Bank Admin Panel</h1>
            </div>
          
          <nav className="navigation">
            <ul>
              <li>
        
                <Link to={'/users'}>Users</Link>
                
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </ul>
            
          </nav>
          <button onClick={handleLogout}>Logout</button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
