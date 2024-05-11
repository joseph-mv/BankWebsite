import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const token=localStorage.getItem("token")
  const navigate = useNavigate();
  return (
    <div>
       <div className="xyz-bank">
      
      <main className="main">
        <section className="hero">
          <h2>Your Financial Partner for a Brighter Future</h2>
          <p>Experience secure and convenient banking with XYZ Bank.</p>
          <div className="buttons">
            {token?<button onClick={()=>{navigate("/dash-board")}} className="button login">DashaBoard</button>:<button onClick={()=>{navigate("/login")}} className="button login">Login</button>}
            <button onClick={()=>{navigate("/register")}} className="button register">Register</button>
          </div>
         
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 XYZ Bank. All Rights Reserved.</p>
      </footer>
    </div>
    </div>
  )
}

export default Home

