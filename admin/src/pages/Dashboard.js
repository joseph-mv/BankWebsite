import React from 'react'
import Header from '../components/Header/Header'
import BankStats from '../components/BankStats/BankStats'
import ChartUser from '../components/Charts/Chart-user'
import ChartTraAmount from '../components/Charts/Chart-tra-amount'
import './DashBoard.css'
import ChartTransaction from '../components/Charts/Chart-transaction'
import ChartMoneyUsage from '../components/Charts/Chart-money-usage'
function Dashboard() {
  return (
    <div >
        <Header/>
        <div className='dash-container'>
         <BankStats/>
        <ChartUser/>
        <ChartTransaction/>
        <ChartTraAmount/>
       <ChartMoneyUsage/>
        </div>
    </div>
  )
}

export default Dashboard
