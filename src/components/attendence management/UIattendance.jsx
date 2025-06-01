import React from 'react';
import AttendanceChart from '../../pages/attendence management/BarChart';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

// Speedometer.jsx
import { motion } from "framer-motion";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);


const Dashboard = () => {
  const stats = {
    totalEmployees: 200,
    checkedIn: 174,
    onLeave: 10,
    absent: 6,
    lateIn: 200,
  };

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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-4">Employee Attendance Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card title="Total Employees" value={stats.totalEmployees} color="bg-green-500" />
        <Card title="Checked In" value={stats.checkedIn} color="bg-blue-500" />
        <Card title="On Leave" value={stats.onLeave} color="bg-red-500" />
        <Card title="Absent" value={stats.absent} color="bg-gray-800 text-white" />
        <Card title="Late In" value={stats.lateIn} color="bg-orange-400" />
      </div>
    <div className='flex justify-between'>
      {/* Placeholder for Bar Chart */}
      <div className=" w-full bg-white mr-2 p-4 rounded shadow-md mb-6">
        <h2 className="font-semibold text-lg mb-2">Today Department Attendance</h2>
        <Bar data={data} options={options} />
      </div>

      <div >
           {/* Percentages */}
          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            {/* <Gauge title="Attendance Percentage" percentage={(stats.checkedIn / stats.totalEmployees) * 100} /> */}
            <Speedometer/>
            <Gauge title="Absent Percentage" percentage={(stats.absent / stats.totalEmployees) * 100} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SourceCard title="Device Check-in" count={200} />
            <SourceCard title="App Check-in" count={200} />
            <SourceCard title="Manual Check-in" count={200} />
          </div>
      </div>
      

    </div>
      {/* Attendance Sources */}
     
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-4 rounded shadow-md text-white ${color}`}>
    <h2 className="text-sm">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Gauge = ({ title, percentage }) => (
  <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
    <h2 className="font-semibold text-md mb-2">{title}</h2>
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-blue-500"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  </div>
);


const Speedometer = ({ speed = 75 }) => {
  const angle = (speed / 180) * 270; // 0-180 km/h to 0-270 degrees

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Background circle */}
      <div className="absolute w-full h-full rounded-full border-8 border-gray-800" />

      {/* Dynamic arc */}
      <svg className="absolute w-full h-full rotate-[135deg]">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="#333"
          strokeWidth="10%"
          fill="transparent"
          strokeDasharray="565"
          strokeDashoffset="0"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="#facc15"
          strokeWidth="10%"
          fill="transparent"
          strokeDasharray="565"
          strokeDashoffset={565 - (565 * angle) / 270}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 565 }}
          animate={{ strokeDashoffset: 565 - (565 * angle) / 270 }}
          transition={{ duration: 1 }}
        />
      </svg>

      {/* Speed Text */}
      <div className="z-10 text-white text-5xl font-bold">
        {speed}
        <div className="text-sm text-gray-400">km/h</div>
      </div>
    </div>
  );
};




const SourceCard = ({ title, count }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h3 className="text-md font-semibold mb-1">{title}</h3>
    <p className="text-xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
