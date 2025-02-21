import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const ImpactOnPerformanceCard = () => {
  // Dropdown state
  const [timeRange, setTimeRange] = useState('Yearly');
  const [showDropdown, setShowDropdown] = useState(false);

  // Dummy data for the bar chart
  const data = {
    labels: ['< 2 year', '2-5 Year', '5-10 Year', '10+ year'],
    datasets: [
      {
        label: 'Average Increment',
        data: [20000, 15000, 10000, 25000],
        backgroundColor: '#3B82F6', // Tailwind Blue-500
      },
      {
        label: 'Average Performance Score',
        data: [15000, 10000, 8000, 20000],
        backgroundColor: '#F97316', // Tailwind Orange-500
      },
    ],
  };

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: 'Value' },
      },
      x: {
        title: { display: true, text: 'Tenure Group' },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#111827', // dark tooltip BG
        titleColor: '#F9FAFB',       // light text
        bodyColor: '#F9FAFB',
      },
      legend: { display: true },
      title: { display: false },
    },
  };

  // Toggle dropdown
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle time range selection
  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setShowDropdown(false);
    // Insert any additional logic here if needed
  };

  return (
    <div
      className="
        w-full
        max-w-3xl
        bg-white 
        dark:bg-slate-800
        rounded-lg
        p-4
        shadow
        text-gray-800
        dark:text-gray-200
      "
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">
          Impact of Increments on Performance
        </h2>
        {/* Time range dropdown */}
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="
              flex items-center
              px-2 py-1
              bg-gray-100 dark:bg-slate-700
              rounded
              hover:bg-gray-200 dark:hover:bg-slate-600
              transition
            "
          >
            <span className="mr-1">{timeRange}</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="
                  absolute
                  right-0
                  mt-2
                  w-28
                  bg-white
                  dark:bg-slate-700
                  shadow
                  rounded
                  z-20
                "
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {['Yearly', 'Monthly', 'Weekly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className="
                      w-full
                      text-left
                      px-3 py-2
                      hover:bg-gray-100 
                      dark:hover:bg-slate-600
                      transition
                    "
                  >
                    {range}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend row (optional if you want a custom legend) */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-sm">Average Increment</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span className="text-sm">Average Performance Score</span>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ImpactOnPerformanceCard;
