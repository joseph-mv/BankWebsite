import React from 'react'
import Header from '../components/Header/Header'
import BankStats from '../components/BankStats/BankStats'
import Charts from '../components/Charts/Charts'

function Dashboard() {
  return (
    <div>
        <Header/>
      <BankStats/>
        {/* <Charts/> */}
    </div>
  )
}

export default Dashboard
