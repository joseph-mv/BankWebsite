import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashaBoard.css'


const UserDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
const token=localStorage.getItem("token")
console.log(token)
  useEffect(() => {
    axios.get('http://localhost:9000/account',{
      headers:{
        Authorization:token
      }
    })
  
    return () => {
      
    }
  }, [])
  
  

  const handleDeposit = async () => {
    if (depositAmount <= 0) {
      setErrorMessage('Please enter a valid deposit amount.');
      return;
    }
    try {
      const response = await axios.post('/deposit', { amount: depositAmount });
      setBalance(response.data.balance);
      setDepositAmount(0); 
      setErrorMessage(null); 
    } catch (error) {
      console.error(error);
      setErrorMessage('Deposit failed. Please try again later.');
    }
  };

  const handleWithdrawal = async () => {
    if (withdrawalAmount <= 0 || withdrawalAmount > balance) {
      setErrorMessage('Please enter a valid withdrawal amount.');
      return;
    }
    try {
      const response = await axios.post('/withdraw', { amount: withdrawalAmount });
      setBalance(response.data.balance);
      setWithdrawalAmount(0); 
      setErrorMessage(null); 
    } catch (error) {
      console.error(error);
      setErrorMessage('Withdrawal failed. Please try again later.');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <p>Account Balance: {balance}</p>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type === 'deposit' ? 'Deposit:' : 'Withdrawal:'} {transaction.amount}
          </li>
        ))}
      </ul>
      <h3>Deposit</h3>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Enter amount to deposit"
      />
      <button onClick={handleDeposit}>Deposit</button>
      <h3>Withdrawal</h3>
      <input
        type="number"
        value={withdrawalAmount}
        onChange={(e) => setWithdrawalAmount(e.target.value)}
        placeholder="Enter amount to withdraw"
      />
      <button onClick={handleWithdrawal}>Withdraw</button>
    </div>
  );
};

export default UserDashboard;
