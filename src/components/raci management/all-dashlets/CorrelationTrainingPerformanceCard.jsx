import React, { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const CorrelationTrainingPerformanceCard = () => {
  // For the dropdown
  const [timeRange, setTimeRange] = useState('Yearly');
  const [showDropdown, setShowDropdown] = useState(false);

  // Dummy data for the bar chart
  const data = {
    labels: ['<10 HRS', '10-15 HRS', '15-30 HRS', '>40 HRS'],
    datasets: [
      {
        label: 'Avg. Performance Score',
        data: [20000, 10000, 15000, 30000],
        backgroundColor: '#3B82F6', // Tailwind Blue-500
      },
      {
        label: 'Avg. Compensation Increment Score',
        data: [15000, 8000, 10000, 20000],
        backgroundColor: '#F97316', // Tailwind Orange-500
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: 'Value' },
      },
      x: {
        title: { display: true, text: 'Training Categories' },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        backgroundColor: '#111827', // Dark BG
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
      },
      title: { display: false },
    },
  };

  // Toggle dropdown
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Change time range
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
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
          Correlation Between Training, Performance, and Compensation
        </h2>
        {/* Time-Range Dropdown */}
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

      {/* Custom Legend row (optional) */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm"></span>
          <span className="text-sm">Avg. Performance Score</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm"></span>
          <span className="text-sm">Avg. Compensation Increment Score</span>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CorrelationTrainingPerformanceCard;
