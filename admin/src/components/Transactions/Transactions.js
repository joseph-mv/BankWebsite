

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import './Transactions.css'
const Transactions = () => {
  const token = localStorage.getItem('adminToken');
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/transactions`, {
          headers: {
            Authorization: token,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [baseUrl, token]);
// console.log(transactions)
  const columns = useMemo(
    () => [
      {
        header: 'No.',
        accessorFn: (row, index) => index + 1, // Add index column
        size: 50,
      },
      {
        accessorKey: 'userDetails.name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'userDetails.AcNO',
        header: 'Account NO:',
        size: 150,
      },
      {
        accessorKey: 'transactionDetails.date',
        header: 'Date',
        size: 200,
      },
      {
        accessorKey: 'transactionDetails.time',
        header: 'Time',
        size: 150,
      },
      {
        accessorKey: 'transactionDetails.amount',
        header: 'Amount',
        size: 150,
      },
      {
        accessorKey: 'transactionDetails.type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'transactionDetails.description',
        header: 'Description',
        size: 200,
      },
    ],
    []
  );

  return (

    <div className='transaction'>
      <h1>Transactions</h1>
      {transactions.length > 0 ? (
        <div className='table'>
        <MaterialReactTable
          columns={columns}
          data={transactions}
          enableColumnResizing
          enableGrouping
          initialState={{
            columnVisibility: {
              // You can control the initial visibility of columns here
            },
          }}
        /></div>
      ) : (
        <p>Loading transactions...</p>
      )}
    </div>
  );
};

export default Transactions;
