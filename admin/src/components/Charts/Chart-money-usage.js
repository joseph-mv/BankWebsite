import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for newer versions of ChartTraAmount.js
import './Charts.css'
import { MyContext } from '../../store/context';

const data = {
  labels: ['Debit', 'Recharge', 'Bills', 'Shopping', 'Entertainment', 'Others'],
  datasets: [
    {
      label: 'Money Usage',
      data: [300, 150, 100, 200, 80, 50], // Example values
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',  // Debit
        'rgba(255, 206, 86, 0.6)',  // Recharge
        'rgba(75, 192, 192, 0.6)',  // Bills
        'rgba(153, 102, 255, 0.6)', // Shopping
        'rgba(255, 159, 64, 0.6)',  // Entertainment
        'rgba(255, 99, 132, 0.6)',  // Others
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const MoneyUsageChart = () => {
    var {moneyUsage}=useContext(MyContext) 
    const data = {
        labels: moneyUsage.map(item=>item._id),
        datasets: [
          {
            label: 'Money Usage',
            data: moneyUsage.map(item=>Math.abs(item.totalAmount)), // Example values
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',  
              'rgba(255, 206, 86, 0.6)',  
              'rgba(75, 192, 192, 0.6)',  
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',  
              'rgba(255, 99, 132, 0.6)',  
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
 
  return (
    <div className='chartContainer'>
      {/* <h2>Money Usage Distribution</h2> */}
      <Pie data={data} />
    </div>
  );
};

export default MoneyUsageChart;
