import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashaBoard.css";

const UserDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user,setUser]=useState(null)
  const [click,setClick]=useState(false)
  const token = localStorage.getItem("token");
  const user_id=localStorage.getItem("user_Id");


  useEffect(() => {
    axios.get("http://localhost:9000/account", {
      headers: {
        Authorization: token,
        User:user_id,
      },
    }).then((response)=>{
      
      console.log(response.data.userDetails)
      console.log(response.data.transactionsDetails)
      
      setUser(response.data.userDetails)
      setBalance(response.data.userDetails.balance)
      setTransactions(response.data.transactionsDetails)
    })

    return () => {};
  },[click]);
  
  const handleDeposit = async () => {
    setClick(!click)
    if (depositAmount <= 0) {
      setErrorMessage("Please enter a valid deposit amount.");
      return;
    }
    try {
     
      const response = await axios.post('http://localhost:9000/deposit', {
  amount: depositAmount, userId: user_id
}, {
  headers: {
    Authorization: token,
   
  }
});
      setBalance(response.data.balance);
      setDepositAmount(0);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Deposit failed. Please try again later.");
    }
  };

  const handleWithdrawal = async () => {
    setClick(!click)
    if (withdrawalAmount <= 0 || withdrawalAmount > balance) {
      setErrorMessage("Please enter a valid withdrawal amount.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:9000/withdraw', {
        amount: withdrawalAmount, userId: user_id
      }, {
        headers: {
          Authorization: token,
         
        }
      });
      setBalance(response.data.balance);
      setWithdrawalAmount(0);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Withdrawal failed. Please try again later.");
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Dashboard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {user&&<div><p>Account Holder:{user.name}</p>
      <p>AC.NO:{user.AcNO}</p>
      
      </div> 
           
     }
      
      <p>Account Balance: {balance}</p>
      
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
      <h3>Transaction History</h3>
      <table>
  <thead>
    <tr>
      <th>Transaction ID</th>
      <th>Date</th>
      <th>Time</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map((transaction) => (
      <tr key={transaction.id}>
        <td>{transaction.id}</td>
        <td>{transaction.date}</td>
        <td>{transaction.time}</td>
        <td>{transaction.type}</td>
        <td class="amount">{transaction.amount}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default UserDashboard;
