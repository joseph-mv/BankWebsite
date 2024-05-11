import React, {  useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(""); 
    navigate("/login");
  };
  

  return (
    <header className="header">
      <div className="container">
        <div onClick={()=>{navigate("/")}} className="logo">
          <img height="100px" src="../../logo.png" alt="" />
          <h1>XYZ Bank</h1>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
          

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
