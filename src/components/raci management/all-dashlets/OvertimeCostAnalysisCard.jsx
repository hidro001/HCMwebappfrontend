import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OvertimeCostAnalysisCard = () => {
  // Dropdown states
  const [timeRange, setTimeRange] = useState('This Year');
  const [showDropdown, setShowDropdown] = useState(false);

  // Reference to the chart instance (so we can create gradients)
  const chartRef = useRef(null);

  // Example data sets
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const overtimeHoursData = [3, 5, 7, 9, 10, 9, 8, 8, 7, 8, 10, 12];
  const overtimeCostData   = [15000,25000,40000,55000,60000,58000,52000,50000,45000,48000,55000,70000];

  // We'll define empty backgrounds now, then fill them in `useEffect`
  const [blueGradient, setBlueGradient] = useState(null);
  const [orangeGradient, setOrangeGradient] = useState(null);

  // Data for react-chartjs-2
  const data = {
    labels: months,
    datasets: [
      // Overtime Hours (blue line)
      {
        label: 'Overtime Hours',
        data: overtimeHoursData,
        yAxisID: 'y1',
        borderColor: '#3B82F6', // Tailwind blue-500
        pointBackgroundColor: '#3B82F6',
        fill: true,
        backgroundColor: blueGradient || 'rgba(59,130,246,0.1)', // fallback if gradient not set
        tension: 0.4,
      },
      // Estimated Overtime Cost (orange line)
      {
        label: 'Estimated Overtime Cost',
        data: overtimeCostData,
        yAxisID: 'y2',
        borderColor: '#F97316', // Tailwind orange-500
        pointBackgroundColor: '#F97316',
        fill: true,
        backgroundColor: orangeGradient || 'rgba(249,115,22,0.1)',
        tension: 0.4,
      },
    ],
  };

  // Chart options for dual Y-axes
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y1: {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 12,
        grid: {
          drawOnChartArea: false, // prevent grid overlap
        },
        ticks: {
          callback: (value) => `${value} hrs`,
        },
      },
      y2: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 100000,
        title: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            if (value >= 1000) return `$${(value/1000)}k`;
            return `$${value}`;
          },
        },
      },
      x: {
        ticks: { color: '#6B7280' }, // optional styling
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
        // Dark tooltip
        backgroundColor: '#111827',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderWidth: 0,
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'Overtime Hours') {
              return `${context.dataset.label}: ${context.parsed.y} hrs`;
            } else {
              // Show as e.g. $55k
              return `${context.dataset.label}: $${(context.parsed.y/1000).toFixed(0)}k`;
            }
          },
        },
      },
    },
  };

  // On mount, create linear gradients for each dataset
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;

    // Blue gradient
    const gradientBlue = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradientBlue.addColorStop(0, 'rgba(59,130,246,0.2)');  // top
    gradientBlue.addColorStop(1, 'rgba(59,130,246,0)');    // bottom

    // Orange gradient
    const gradientOrange = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradientOrange.addColorStop(0, 'rgba(249,115,22,0.2)');
    gradientOrange.addColorStop(1, 'rgba(249,115,22,0)');

    setBlueGradient(gradientBlue);
    setOrangeGradient(gradientOrange);
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle changing time range
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setShowDropdown(false);
    // Additional logic to fetch data if needed
  };

  return (
    <div
      className="
        w-full max-w-4xl
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
        <h2 className="text-lg font-semibold">Overtime Cost Analysis</h2>
        {/* Time range dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="
              flex items-center
              px-2 py-1
              bg-gray-100 dark:bg-slate-700
              rounded
              hover:bg-gray-200 dark:hover:bg-slate-600
              transition
            "
          >
            <span className="mr-1 text-sm">{timeRange}</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="
                  absolute
                  right-0
                  mt-2
                  w-32
                  bg-white dark:bg-slate-700
                  shadow
                  rounded
                  z-20
                "
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {['This Year','Last Year','This Month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className="
                      block
                      w-full
                      text-left
                      px-3 py-2
                      hover:bg-gray-100 dark:hover:bg-slate-600
                      transition
                      text-sm
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

      {/* Chart container */}
      <div className="w-full h-64">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default OvertimeCostAnalysisCard;
