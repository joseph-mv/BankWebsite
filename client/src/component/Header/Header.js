import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(""); 
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={() => navigate("/")}>
          <img height="50px" src="../../logo.png" alt="XYZ Bank Logo" />
          <h1>XYZ Bank</h1>
        </div>

        <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>

          {token && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
