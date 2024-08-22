import React, { useState, useEffect } from "react";
import axios from "axios";
import './Users.css';
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");
  const id = localStorage.getItem("id");
const navigate=useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/users`, {
          headers: {
            Authorization: token,
            Id: id,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token, id]);

  const handleRowClick = (user) => {
    // console.log("Row clicked! User ID:", user);
    // Example of navigation or other actions:
    navigate(`user/${user._id}`,{ state: { user }});
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      {users.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Ac.NO</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} onClick={() => handleRowClick(user)}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.AcNO}</td>
                <td>{user.balance}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Users;
