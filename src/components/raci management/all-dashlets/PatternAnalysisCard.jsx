import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaChartBar } from "react-icons/fa";

const PatternAnalysisCard = () => {
  // Dummy data for the chart
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    colors: ["#FBBF24", "#4F46E5", "#3B82F6"], // Adjust to match your design
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", 
        "May", "Jun", "Jul", "Aug", 
        "Sep", "Oct", "Nov", "Dec",
      ],
      labels: {
        style: {
          colors: "#9CA3AF", // Gray-400 in Tailwind
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9CA3AF",
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        colors: "#9CA3AF",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#374151", // Gray-700 in Tailwind
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "dark", // respects a dark theme look
    },
    // If you want to override light/dark manually, you can do so by conditionally toggling:
    // theme: {
    //   mode: isDark ? "dark" : "light"
    // },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Verbal Warnings",
      data: [13000, 15000, 22000, 27000, 20000, 15000, 14000, 15000, 17000, 19000, 18000, 16000],
    },
    {
      name: "Written Warnings",
      data: [9000, 8000, 10000, 12000, 10000, 9000, 10000, 8000, 9000, 10000, 9500, 8000],
    },
    {
      name: "Suspensions",
      data: [3000, 2000, 4000, 7000, 5000, 3000, 4000, 5000, 4000, 6000, 5500, 4000],
    },
  ]);

  // Fire a toast (if desired) when component mounts


  return (
    <motion.div
      // Framer Motion to give the card a little “pop” on mount
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      
      // Tailwind card container
      className=" mx-auto p-4 mb-6 rounded-md bg-white dark:bg-gray-800 shadow-md"
    >
      {/* Card header */}
      <div className="flex items-center mb-4">
        <FaChartBar className="text-blue-500 dark:text-blue-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Pattern Analysis for Repeated Misconduct
        </h2>
      </div>

      {/* Chart itself */}
      <div>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </motion.div>
  );
};

export default PatternAnalysisCard;
