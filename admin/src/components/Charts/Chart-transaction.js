import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for newer versions of Chart.js
import './Charts.css'
import { MyContext } from '../../store/context';


const ChartTransaction = () => {
    
    var {transactionsPerDay}=useContext(MyContext)
    // console.log(transactionsPerDay)
    var transactions=[]
    if(transactionsPerDay.length){
         transactions=transactionsPerDay.slice(-10)
    
    }
    // console.log(transactions)
    const data = {
        labels: transactions.map(transaction=>{
            return transaction._id
        }),
          datasets: [
          {
            label: 'No Of Transactions',
            data: transactions.map(transaction=>transaction.totalTransactions),
            fill: false, // No fill under the line
            backgroundColor: 'red',
            borderColor: 'yellow',
            tension: 0.1, // Controls the curve of the line
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
   
  return (
    <div className='chartContainer'>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartTransaction;
