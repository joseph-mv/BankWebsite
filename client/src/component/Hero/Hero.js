import React from 'react'
import './Hero.css'
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
            {token?<button onClick={()=>{navigate("/dash-board")}} className="button login">DashBoard</button>:
            <button onClick={()=>{navigate("/login")}} className="button login">Login</button>}
            <button onClick={()=>{navigate("/register")}} className="button register">Register</button>
          </div>
         
        </section>
      </main>
     
    </div>
    </div>
  )
}

export default Home

