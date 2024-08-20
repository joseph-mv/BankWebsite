import React, { useEffect, useState ,useContext} from 'react';
import './BankStats.css'
import axios from 'axios';
import { MyContext } from '../../store/context';
const BankStats = () => {

    const baseUrl = process.env.REACT_APP_BASE_URL
    const {setTransactionsPerDay,setUsersPerDay,setMoneyUsage}=useContext(MyContext) 
    const [stats, setStats] = useState({
        users: 0,
        totalAmount: 0,
        transactions: 0,
        loansIssued: 0,
        activeLoans: 0,
        interestEarned: 0,
        newAccounts: 0,
        totalDeposits: 0,
    });
    const token = localStorage.getItem("adminToken");
    const id=localStorage.getItem("id");

    useEffect(() => {
        // Fetch stats from the backend API using axios
        const fetchStats = async () => {
            try {
                
                const response = await axios.get(`${baseUrl}/admin/stats`,{
                    headers: {
                      Authorization: token,
                      Id: id,
                    },
                  });
                setStats(response.data);
                // console.log((response.data))
                setTransactionsPerDay(response.data.transactionsPerDay)
                setUsersPerDay(response.data.newUsersPerDay)
                setMoneyUsage(response.data.moneyUsage)
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="bank-stats">
            <div className="stat-item">
                <h3>Total Users</h3>
                <p>{stats.users}</p>
            </div>
            <div className="stat-item">
                <h3>Total Amount </h3>
                <p>{stats.totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="stat-item">
                <h3>Total Transactions</h3>
                <p>{stats.transactions}</p>
            </div>
            <div className="stat-item">
                <h3>Loans Issued</h3>
                <p>{stats.loansIssued}</p>
            </div>
            <div className="stat-item">
                <h3>Active Loans</h3>
                <p>{stats.activeLoans}</p>
            </div>
            <div className="stat-item">
                <h3>Interest Earned</h3>
                <p>{stats.interestEarned.toLocaleString('en-IN')}</p>
            </div>
            <div className="stat-item">
                <h3>New Accounts This Month</h3>
                <p>{stats.newAccounts}</p>
            </div>
            <div className="stat-item">
                <h3>Total Deposits</h3>
                <p>{stats.totalDeposits.toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default BankStats;
