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

const AbsenteeismPatternsCard = () => {
  // Dropdown state
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [showDropdown, setShowDropdown] = useState(false);

  // Example bar chart data
  const data = {
    labels: ['Sales', 'IT', 'HR', 'Finance'],
    datasets: [
      {
        label: 'Average Leave Days per Month',
        data: [6, 4, 2, 8], // Example data
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
        min: 0,
        max: 12,
        title: {
          display: true,
          text: 'Average Leave',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Departments',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#111827', // dark background
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderWidth: 0,
      },
      title: {
        display: false,
      },
    },
  };

  // Toggle dropdown
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Select a different month (dummy logic here)
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setShowDropdown(false);
    // Insert any data-fetch or logic for that month, if needed
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
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          Absenteeism Patterns by Department
        </h2>
        {/* Month dropdown */}
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
            <span className="mr-1 text-sm">{selectedMonth}</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="
                  absolute
                  right-0
                  mt-2
                  w-20
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
                {['Jan', 'Feb', 'Mar', 'Apr'].map((month) => (
                  <button
                    key={month}
                    onClick={() => handleMonthChange(month)}
                    className="
                      w-full
                      text-left
                      px-3 py-2
                      hover:bg-gray-100 
                      dark:hover:bg-slate-600
                      transition
                      text-sm
                    "
                  >
                    {month}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AbsenteeismPatternsCard;
