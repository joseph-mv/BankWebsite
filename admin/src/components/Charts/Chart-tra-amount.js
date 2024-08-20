import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for newer versions of ChartTraAmount.js
import './Charts.css'
import { MyContext } from '../../store/context';


const ChartTraAmount = () => {
 var {transactionsPerDay}=useContext(MyContext)
  // console.log(transactionsPerDay)
  var transactions=[]
  if(transactionsPerDay.length){
       transactions=transactionsPerDay.reverse().slice(-10)
  
  } 
  const data = {
    labels: transactions.map(transaction=>{
      return transaction._id
  }),
    datasets: [
      {
        label: 'Transaction Amount',
        data: transactions.map(transaction=>transaction.totalAmount),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

 
  return <div className='chartContainer'>
    <Bar data={data} options={options} /></div>;
};

export default ChartTraAmount;
