

import React, { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaChartBar } from "react-icons/fa";
import { ThemeContext } from "../../../hooks/ThemeContext"; // Theme context to access the current theme

const CTCChartCard = () => {
  // Pull in your current theme from context
  const { theme } = useContext(ThemeContext);
  
  // Determine if we're in dark mode
  const isDarkMode = theme === "dark";

  

  // Chart data (dummy)
  const seriesData = [
    {
      name: "Base Salary",
      data: [9, 12, 13, 18, 15, 15, 15, 15, 15],
    },
    {
      name: "Allowances",
      data: [2, 3, 3, 4, 3, 2, 2, 2, 2],
    },
    {
      name: "Variable Pay",
      data: [2, 2, 3, 2, 3, 2, 2, 2, 2],
    },
    {
      name: "Other Benefits",
      data: [1, 1, 2, 4, 2, 1, 1, 1, 1],
    },
  ];

  // ApexCharts configuration, referencing isDarkMode for color changes
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      background: "transparent",
    },
    theme: {
      mode: isDarkMode ? "dark" : "light",
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      y: { formatter: (val) => val + "k" },
    },
    colors: ["#f59e0b", "#3b82f6", "#6366f1", "#ec4899"],
    xaxis: {
      categories: ["Sales", "Marketing", "IT", "Engineering", "HR", "HR", "HR", "HR", "HR"],
      labels: {
        style: {
          colors: isDarkMode ? "#e2e8f0" : "#1f2937",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? "#e2e8f0" : "#1f2937",
        },
        formatter: (val) => `${val}k`,
      },
      title: {
        text: "Value",
        style: {
          color: isDarkMode ? "#e2e8f0" : "#1f2937",
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        colors: isDarkMode ? "#e2e8f0" : "#1f2937",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    fill: { opacity: 1 },
    grid: {
      borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Light mode: white background; Dark mode: dark gray
      className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md"
    >
      <div className="flex items-center mb-4">
        <FaChartBar className="text-blue-500 dark:text-blue-300 mr-2" size={24} />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Cost-to-Company (CTC)
        </h2>
      </div>
      <Chart options={chartOptions} series={seriesData} type="bar" height={350} />
    </motion.div>
  );
};

export default CTCChartCard;
