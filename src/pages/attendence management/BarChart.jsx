import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const AttendanceChart = () => {
  const data = {
    labels: ['IT', 'HR', 'React', 'On Time', 'BPO'],
    datasets: [
      {
        label: 'TOTAL EMPLOYEES',
        data: [100, 100, 100, 100, 100],
        backgroundColor: '#00C49F'
      },
      {
        label: 'LATE IN',
        data: [49, 49, 49, 49, 49],
        backgroundColor: '#FFA500'
      },
      {
        label: 'ON LEAVE',
        data: [28, 28, 28, 28, 28],
        backgroundColor: '#CD5C5C'
      },
      {
        label: 'CHECKED IN',
        data: [100, 100, 100, 100, 100],
        backgroundColor: '#6495ED'
      },
      {
        label: 'ABSENT',
        data: [20, 20, 20, 20, 20],
        backgroundColor: '#696969'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="w-full md:w-4/5 mx-auto p-4 bg-white rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
