import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for newer versions of Chart.js
import './Charts.css'
import { MyContext } from '../../store/context';


const ChartUser = () => {
    const {usersPerDay}=useContext(MyContext)
    var user=[]
    if(usersPerDay.length){
         user=usersPerDay.reverse().slice(-10)
    
    }
    const data = {
        labels: user.map(item=>{
            const { year, month, day } = item._id;
            return `${year}-${month}-${day}`;
        }),
          datasets: [
          {
            label: 'New Users',
            data: user.map(item=>item.count),
            fill: false, // No fill under the line
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
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

export default ChartUser;
