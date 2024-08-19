import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUsers, faFileInvoice, faCog, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your CSS file

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (!isMenuOpen) {
      document.body.classList.add('fixed-body');
  } else {
      document.body.classList.remove('fixed-body');
  }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <header className="admin-header">
      
        <div className="header-content">
          <div className="logo-container">
            <a href="/" className="logo">
              <img src="/logo.png" alt="XYZ Bank Logo" />
            </a>
            <h1>XYZ Bank Admin Panel</h1>
          </div>
          <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li>
                <Link to="/dash-board">
                  <FontAwesomeIcon icon={faChartBar} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/users">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <span>Transactions</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <FontAwesomeIcon icon={faCog} />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/reports">
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>
        
      </div>
    </header>
  );
};

export default Header;
