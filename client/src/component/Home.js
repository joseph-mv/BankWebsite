import React from 'react'
import './Home.css'
function Home() {
  return (
    <div>
       <div className="xyz-bank">
      <header className="header">
        <img src="../public/logo.png" alt="" />
        
        <h1>XYZ Bank</h1>
      </header>
      <main className="main">
        <section className="hero">
          <h2>Your Financial Partner for a Brighter Future</h2>
          <p>Experience secure and convenient banking with XYZ Bank.</p>
          <div className="buttons">
            <a href="/login" className="button login">Login</a>
            <a href="/register" className="button register">Register</a>
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

