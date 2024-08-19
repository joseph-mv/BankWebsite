import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for newer versions of Chart.js

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','se' ],
  datasets: [
    {
      label: 'Sa',
      data: [65, 59, 180, 81, 56, 55, 40,12,25],
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

const chart = () => {
  return <Bar data={data} options={options} />;
};

export default chart;
