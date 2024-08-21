// components/UserDashboard.js
import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import {isTokenExpired}  from '../../utils/isTokenExpired'
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const baseUrl = process.env.REACT_APP_BASE_URL 
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);

  const handlePopupOpen = (popupType) => {
    setActivePopup(popupType);
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [click, setClick] = useState(false);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_Id");
  const [sendMoneyForm, setSendMoneyForm] = useState({
    account: "",
    amount: "",
  });

  const [payBillForm, setPayBillForm] = useState({
    payee: "",
    amount: "",
  });

  const [rechargeForm, setRechargeForm] = useState({
    mobile: "",
    amount: "",
  });

  const [investForm, setInvestForm] = useState({
    plan: "",
    amount: "",
  });
  useEffect(() => {
    if (isTokenExpired(token) || !token) {
      localStorage.removeItem("token");
     
      navigate("/login");
    }
  }, [token]);
  useEffect(() => {

    axios
      .get(baseUrl+"/account", {
        headers: {
          Authorization: token,
          User: user_id,
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.userDetails);
        // console.log(response.data.transactionsDetails);

        setUser(response.data.userDetails);
        setBalance(response.data.userDetails.balance);
        setTransactions(response.data.transactionsDetails);
        setDepositAmount(0);

        setWithdrawalAmount(0);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Unauthorized access. Please log in again.");
        } else {
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      });

    return () => {};
  }, [click]);
  // console.log(user)
 

  const handleSendMoneyChange = (e) => {
    const { name, value } = e.target;
    setSendMoneyForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePayBillChange = (e) => {
    const { name, value } = e.target;
    setPayBillForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRechargeChange = (e) => {
    const { name, value } = e.target;
    setRechargeForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleInvestChange = (e) => {
    const { name, value } = e.target;
    setInvestForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleDeposit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setClick(!click);
    if (depositAmount <= 0) {
      setErrorMessage("Please enter a valid deposit amount.");
      return;
    }

    try {
      setErrorMessage(null);
      const response = await axios.post(
        baseUrl+"/deposit",
        {
          amount: depositAmount,
          userId: user_id,
          description: "Deposit",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      // console.error(error);
      setErrorMessage("Deposit failed. Please try again later.");
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setClick(!click);
    if (withdrawalAmount <= 0 || withdrawalAmount > balance) {
      setErrorMessage("Please enter a valid withdrawal amount.");
      return;
    }
    try {
      setErrorMessage(null);
      const response = await axios.post(
        baseUrl+"/withdraw",
        {
          amount: withdrawalAmount,
          userId: user_id,
          description: "Withdraw",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      // console.error(error);
      setErrorMessage("Withdrawal failed. Please try again later.");
    }
  };
  // Submission handlers for each form
  const handleSendMoneySubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setClick(!click); // Toggle click state
   
    try {
      setErrorMessage('')
      if ( sendMoneyForm.amount > balance) {
        setErrorMessage("Insufficient balance");
        return;
      }
      if(user.AcNO==sendMoneyForm.account){
        return
      }
      const response = await axios.post(
        baseUrl+"/sendMoney",
        {
          account: sendMoneyForm.account,
          amount: sendMoneyForm.amount,
          userId: user_id,
          description: "Send Money",
          remitter:user.AcNO,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    
    setErrorMessage(response.data)
    } catch (error) {
      // Handle errors
      console.error(error);
      console.error(error.response?.data);  // Log the server's response if available
    }
    
     finally {
      setSendMoneyForm({ account: "", amount: "" });
      handlePopupClose();
    }
  };
  
  const handlePayBillSubmit = async (e) => {
    e.preventDefault();
    setClick(!click);
  
    
  
    try {
      setErrorMessage(null);
      if ( payBillForm.amount > balance) {
        setErrorMessage("Insufficient balance");
        return;
      }
      const response = await axios.post(
        baseUrl+"/payBill",
        {
          payee: payBillForm.payee,
          userId: user_id,
          amount: payBillForm.amount,
          description: "Pay Bill",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // handle success
    } catch (error) {
      setErrorMessage("Bill payment failed. Please try again later.");
    } finally {
      setPayBillForm({ payee: "", amount: "" });
      handlePopupClose();
    }
  };
  
  const handleRechargeSubmit = async (e) => {
    e.preventDefault();
    setClick(!click);
  
   
  
    try {
      setErrorMessage(null);
      if ( rechargeForm.amount > balance) {
        setErrorMessage("Insuffient balance");
        return;
      }
      const response = await axios.post(
        baseUrl+"/recharge",
        {
          mobile: rechargeForm.mobile,
          userId: user_id,
          amount: rechargeForm.amount,
          description: "Recharge",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // handle success
    } catch (error) {
      setErrorMessage("Recharge failed. Please try again later.");
    } finally {
      setRechargeForm({ mobile: "", amount: "" });
      handlePopupClose();
    }
  };
  
  const handleInvestSubmit = async (e) => {
    e.preventDefault();
    setClick(!click);
  
    
    try {
      setErrorMessage(null);
      if ( investForm.amount > balance) {
        setErrorMessage("Insuffient balance");
        return;
      }
    
      const response = await axios.post(
        baseUrl+"/invest",
        {
          userId: user_id,
          plan: investForm.plan,
          amount: investForm.amount,
          description: "Invest",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // handle success
    } catch (error) {
      setErrorMessage("Investment failed. Please try again later.");
    } finally {
      setInvestForm({ plan: "", amount: "" });
      handlePopupClose();
    }
  };
  
console.log((user?.status))


  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
     
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="user-dashboard">
        <div className="account-section">
          <div className="account-details-section">
            <h2>Account Details</h2>

            <p>Name: {user?.name}</p>
            <p>Ac NO: {user?.AcNO}</p>
            <p className="balance">Balance: {balance}</p>
          </div>

          <div className="transaction-history-section">
            <h2>Transaction History</h2>
          
            <ul className="transaction-history-list">
              {transactions?.map((transaction) => (
                <li key={transaction._id} className="transaction-item">
                  <span className="transaction-description">
                    {transaction.transactionDetails.description}
                  </span>
                  <span
                    className={`transaction-amount ${
                      transaction.transactionDetails.type==='Deposit'? "credit" : "debit"
                    }`}
                  >
                    {transaction.transactionDetails.amount}
                  </span>
                  <div className="dateAndtime">
                    <span className="transaction-date">{transaction.transactionDetails.date}</span>
                    <span className="transaction-time">{transaction.transactionDetails.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {user?.status==='InActive'?
       <div className="inActive">
       <h2>Your Account is Inactive</h2>
       <p>Please contact the bank to activate your account.</p>
       <p>Contact Number: 123-456-7890</p>
       <p>Email: support@xyzbank.com</p>
       <p>Address: 123 Main St, City, State, Zip</p>
     </div>:
     <div className="actions-section">
       
     <div className="row">
       <div
         className="action-box"
         onClick={() => handlePopupOpen("sendMoney")}
       >
         <h3>
           <i className="fas fa-paper-plane"></i> Send Money
         </h3>
       </div>
       <div
         className="action-box"
         onClick={() => handlePopupOpen("payBills")}
       >
         <h3>
           <i className="fas fa-file-invoice-dollar"></i> Pay Bills
         </h3>
       </div>
     </div>
     <div className="row">
       <div
         className="action-box"
         onClick={() => handlePopupOpen("recharge")}
       >
         <h3>
           <i className="fas fa-mobile-alt"></i> Recharge
         </h3>
       </div>
       <div
         className="action-box"
         onClick={() => handlePopupOpen("invest")}
       >
         <h3>
           <i className="fas fa-chart-line"></i> Invest
         </h3>
       </div>
     </div>
     <div className="row">
       <div
         className="action-box"
         onClick={() => handlePopupOpen("loans")}
       >
         <h3>
           <i className="fas fa-hand-holding-usd"></i> Loans
         </h3>
       </div>
       <div
         className="action-box"
         onClick={() => handlePopupOpen("creditCard")}
       >
         <h3>
           <i className="fas fa-credit-card"></i> Credit Card
         </h3>
       </div>
     </div>
     <div className="row">
       <div className="action-box">
         <h3>
           <i className="fas fa-piggy-bank"></i> Deposit
         </h3>
         <form className="deposit-form">
           <input
             type="number"
             placeholder="Amount"
             className="form-input"
             value={depositAmount}
             onChange={(e) => setDepositAmount(e.target.value)}
           />
           <button
             onClick={handleDeposit}
             type="submit"
             className="submit-btn"
           >
             <i className="fas fa-arrow-down"></i> Deposit Funds
           </button>
         </form>
       </div>
       <div className="action-box">
         <h3>
           <i className="fas fa-money-bill-wave"></i> Withdraw
         </h3>
         <form className="withdraw-form">
           <input
             type="number"
             placeholder="Amount"
             className="form-input"
             value={withdrawalAmount}
             onChange={(e) => setWithdrawalAmount(e.target.value)}
           />
           <button
             onClick={handleWithdrawal}
             type="submit"
             className="submit-btn"
           >
             <i className="fas fa-arrow-up"></i> Withdraw Funds
           </button>
         </form>
       </div>
     </div>

     {/* Send Money Popup */}
     {activePopup === "sendMoney" && (
       <div className="popup">
         <div className="popup-content">
           <h2>
             <i className="fas fa-paper-plane"></i> Send Money
           </h2>
           <form
             className="fund-transfer-form"
             onSubmit={handleSendMoneySubmit}
           >
             <input
               type="number"
               name="account"
               placeholder="Account Number"
               value={sendMoneyForm.account}
               onChange={handleSendMoneyChange}
               className="form-input"
               required
             />
             <input
               type="number"
               name="amount"
               placeholder="Amount"
               value={sendMoneyForm.amount}
               onChange={handleSendMoneyChange}
               className="form-input"
               required
               min="1"
             />
             <button type="submit" className="submit-btn">
               <i className="fas fa-exchange-alt"></i> Transfer Funds
             </button>
           </form>
           <button className="close-btn" onClick={handlePopupClose}>
             <i className="fas fa-times"></i> Close
           </button>
         </div>
       </div>
     )}

     {/* Pay Bills Popup */}
     {activePopup === "payBills" && (
       <div className="popup">
         <div className="popup-content">
           <h2>
             <i className="fas fa-file-invoice-dollar"></i> Pay Bills
           </h2>
           <form
             className="bill-payment-form"
             onSubmit={handlePayBillSubmit}
           >
             <input
               type="text"
               name="payee"
               placeholder="Bill Payee"
               value={payBillForm.payee}
               onChange={handlePayBillChange}
               className="form-input"
               required
             />
             <input
               type="number"
               name="amount"
               placeholder="Amount"
               value={payBillForm.amount}
               onChange={handlePayBillChange}
               className="form-input"
               required
               min="1"
             />
             <button type="submit" className="submit-btn">
               <i className="fas fa-money-check-alt"></i> Pay Bill
             </button>
           </form>
           <button className="close-btn" onClick={handlePopupClose}>
             <i className="fas fa-times"></i> Close
           </button>
         </div>
       </div>
     )}

     {/* Recharge Popup */}
     {activePopup === "recharge" && (
       <div className="popup">
         <div className="popup-content">
           <h2>
             <i className="fas fa-mobile-alt"></i> Recharge
           </h2>
           <form className="recharge-form" onSubmit={handleRechargeSubmit}>
             <input
               type="number"
               name="mobile"
               placeholder="Mobile Number"
               value={rechargeForm.mobile}
               onChange={handleRechargeChange}
               className="form-input"
               required
             />
             <input
               type="number"
               name="amount"
               placeholder="Amount"
               value={rechargeForm.amount}
               onChange={handleRechargeChange}
               className="form-input"
               required
               min="1"
             />
             <button type="submit" className="submit-btn">
               <i className="fas fa-paper-plane"></i> Recharge Now
             </button>
           </form>
           <button className="close-btn" onClick={handlePopupClose}>
             <i className="fas fa-times"></i> Close
           </button>
         </div>
       </div>
     )}

     {/* Invest Popup */}
     {activePopup === "invest" && (
       <div className="popup">
         <div className="popup-content">
           <h2>
             <i className="fas fa-chart-line"></i> Invest
           </h2>
           <form className="invest-form" onSubmit={handleInvestSubmit}>
             <input
               type="text"
               name="plan"
               placeholder="Investment Plan"
               value={investForm.plan}
               onChange={handleInvestChange}
               className="form-input"
               required
             />
             <input
               type="number"
               name="amount"
               placeholder="Amount"
               value={investForm.amount}
               onChange={handleInvestChange}
               className="form-input"
               required
               min="1"
             />
             <button type="submit" className="submit-btn">
               <i className="fas fa-paper-plane"></i> Invest Now
             </button>
           </form>
           <button className="close-btn" onClick={handlePopupClose}>
             <i className="fas fa-times"></i> Close
           </button>
         </div>
       </div>
     )}
   </div>
     }
        
      </div>
    </div>
  );
}

export default UserDashboard;
