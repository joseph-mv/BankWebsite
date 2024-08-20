import React, { useEffect, useState } from "react";
import "./User.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
const UserDetails = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const token = localStorage.getItem("adminToken");

  const location = useLocation();
  const user = location.state?.user;
  const [userDetails, setUserDetails] = useState(user);

  const [transactions, setTransactions] = useState([]);

  // State for editing userDetails details
  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle deactivation of account
  const handleDeactivate = () => {
    setUserDetails((prevState) => ({
      ...prevState,
      status: "InActive",
    }));
  };

  // Handle activation of account
  const handleActivate = () => {
    setUserDetails((prevState) => ({
      ...prevState,
      status: "Active",
    }));
  };

  // Handle edit and save
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
  
    setUserDetails({
      ...userDetails,
      name: form.name.value,
      address: form.address.value,
      mobileNumber: form.mobileNumber.value,
      email: form.email.value,
    });
    setIsEditing(false);
    
  };

  useEffect(() => {
    try{
      const response =  axios.post(
        baseUrl+"/admin/edit-user",
       userDetails,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    
    }catch(err){

    }
  }, [userDetails])

  useEffect( () => {
   const fetchTransaction= async()=>{ 
    try{
      const transactions = await axios.get(
        baseUrl+"/admin/user-transactions",
        {
          headers: {
            Authorization: token,
            User: userDetails._id,
            Account:userDetails.AcNO,
          },
        }
      );
      console.log(transactions.data.transactionsDetails);
      setTransactions(transactions.data.transactionsDetails)
    }catch(err){
      console.log(err)
    }}
fetchTransaction()

  }, [])
  

  return (
    <div className="user-details-page">
    <div className="user-details-container">
      {/* User Information */}
      <div className="user-info">
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Account Number:</strong> {userDetails.AcNO}
        </p>
        <p>
          <strong>Balance:</strong> {userDetails.balance}
        </p>
       
        <p>
          <strong>Address:</strong> {userDetails.address}
        </p>
        <p>
          <strong>Mobile Number:</strong> {userDetails.mobileNumber}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:{userDetails.email}">{userDetails.email}</a>
        </p>
        <p>
          <strong>Status:</strong> {userDetails.status}
        </p>
      </div>

  {/* Edit User Information */}
      <div className="edit-user">
        <h2>Edit User Information</h2>
        {isEditing ? (
          <form onSubmit={handleEdit}>
            <label>
            <span>Name:</span>  
              <input type="text" name="name" defaultValue={userDetails.name} />
            </label>
            <label>
            <span> Mobile Number:</span> 
            
              <input type="number" name="mobileNumber" defaultValue={userDetails.mobileNumber} required/>
            </label>
            <label>
            <span> Address:</span> 
             
              <input
                type="text"
                name="address"
                defaultValue={userDetails.address}
                required
              />
            </label>
            <label>
            <span>Email:</span> 
              
              <input
                type="email"
                name="email"
                defaultValue={userDetails.email}
                required
              />
            </label>
            <button type="submit" >Save</button>
            <button type="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </form>
        ) : (
          <button onClick={handleEditToggle}>Edit User Info</button>
        )}
      </div>

      {/* Activate/Deactivate Account */}
      <div className="account-actions">
        <h2>Account Actions</h2>
        {userDetails.status==='Active' ? (
          <button onClick={handleDeactivate}>Deactivate Account</button>
        ) : (
          <button onClick={handleActivate}>Activate Account</button>
        )}
      </div>
      {/* Transaction Details */}
     
      <div className="transaction-history-section">
            <h2>Transaction History</h2>
          
            <ul className="transaction-history-list">
              {transactions?.map((transaction) => (
                <li key={transaction._id} className="transaction-item">
                  <span className="transaction-description">
                    {transaction?.transactionDetails?.description}
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
    </div>
  );
};

export default UserDetails;
