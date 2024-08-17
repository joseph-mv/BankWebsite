
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Users.css'



function Users() {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem("adminToken");
  const id=localStorage.getItem("id");
  // console.log(id)

  useEffect(() => {
    axios.get("http://localhost:9000/admin/users", {
      headers: {
        Authorization: token,
        Id: id,
      },
    }).then((response)=>{
      // console.log(response.data)
      setUsers(response.data)
      
    })
  }, [])
  
  return (
   <div>
    {users&&
      <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ac.NO</th>
          <th>Mobile</th>
          <th>Gmail</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}> {/* Use a unique identifier for each row */}
            <td>{user.name}</td>
            <td>{user.AcNO}</td>
            <td>{user.mobileNumber  }</td>
            <td>{user.email}</td>
            <td>{user.balance}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
    }
   </div>
  )

}

export default Users
