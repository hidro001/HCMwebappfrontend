import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaChartBar } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const InternalMobilityTrendsCard = () => {


  // Dummy data for the bar chart
  const data = {
    labels: [
      'Jr. Associate to Associate',
      'Associate to Manager',
      'Transfer laterally',
    ],
    datasets: [
      {
        label: 'Jr. Associate to Associate',
        data: [25000, 0, 0], // only the first category has data here
        backgroundColor: '#F97316', // Tailwind orange-500
      },
      {
        label: 'Associate to Manager',
        data: [0, 15000, 0], // only the second category has data
        backgroundColor: '#10B981', // Tailwind green-500
      },
      {
        label: 'Transfer laterally',
        data: [0, 0, 40000], // only the third category has data
        backgroundColor: '#3B82F6', // Tailwind blue-500
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'No. Of Employees',
        },
        // You can set min/max or other tick properties as needed
      },
      x: {
        title: {
          display: true,
          text: 'Employees Transitioning',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827', // dark background
        titleColor: '#F9FAFB',       // light text
        bodyColor: '#F9FAFB',
        borderWidth: 0,
      },
    },
  };

  return (
    <motion.div
      // Simple fade-in/slide-up animation via framer-motion
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        w-full 
        bg-white 
        dark:bg-slate-800
        rounded-lg
        p-4
        shadow
        text-gray-800
        dark:text-gray-200
        
      "
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <FaChartBar className="text-gray-500 dark:text-gray-300 mr-2" />
        <h2 className="text-lg font-semibold">Internal Mobility Trends</h2>
      </div>

      {/* Chart Container */}
      <div className="w-full h-64">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default InternalMobilityTrendsCard;
