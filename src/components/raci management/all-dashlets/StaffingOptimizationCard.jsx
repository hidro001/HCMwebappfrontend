// import React, { useEffect } from "react";
// import Chart from "react-apexcharts";
// import { motion } from "framer-motion";
// import { FaChartBar } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// const StaffingOptimizationCard = () => {
//   // Optional: show a toast when the card mounts
//   useEffect(() => {
//     toast.success("Dummy data loaded!");
//   }, []);

//   // Dummy data for the stacked bar
//   const seriesData = [
//     {
//       name: "Morning",
//       data: [12000, 15000, 18000, 25000, 14000, 20000], // Mon–Sat
//     },
//     {
//       name: "Afternoon",
//       data: [8000, 9000, 12000, 10000, 7000, 11000],
//     },
//     {
//       name: "Night",
//       data: [6000, 4000, 7000, 5000, 3000, 7000],
//     },
//   ];

//   // ApexCharts config
//   const chartOptions = {
//     chart: {
//       type: "bar",
//       stacked: true,
//       toolbar: { show: false },
//       background: "transparent",
//     },
//     xaxis: {
//       categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//       title: {
//         text: "week Days",
//       },
//     },
//     yaxis: {
//       labels: {
//         formatter: (val) => `${(val / 1000).toFixed(0)}k`,
//       },
//       title: {
//         text: "Employees",
//       },
//       min: 0,
//       max: 40000,
//       tickAmount: 4, // customize as needed
//     },
//     legend: {
//       position: "right",
//       offsetY: 50, // adjust if you want it higher or lower
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 4,
//         horizontal: false,
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     colors: ["#f59e0b", "#6366f1", "#3b82f6"], // Morning, Afternoon, Night
//     tooltip: {
//       y: {
//         formatter: (val) => `${(val / 1000).toFixed(0)}k`,
//       },
//     },
//     grid: {
//       borderColor: "#e2e8f0",
//     },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
//     >
//       <div className="flex items-center mb-4">
//         <FaChartBar className="text-blue-500 mr-2" size={24} />
//         <h2 className="text-xl font-semibold text-gray-800">
//           Staffing and Scheduling Optimization
//         </h2>
//       </div>

//       <Chart
//         options={chartOptions}
//         series={seriesData}
//         type="bar"
//         height={350}
//       />
//     </motion.div>
//   );
// };

// export default StaffingOptimizationCard;


import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaChartBar } from "react-icons/fa";

const StaffingOptimizationCard = () => {
  // We'll detect Tailwind dark mode by checking if .dark is on <html>
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, watch for dark-mode changes
  useEffect(() => {
    toast.success("Dummy data loaded!");

    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode(); // run once

    // If your app toggles dark mode dynamically, observe class changes:
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Our dummy stacked data for each day
  const seriesData = [
    {
      name: "Morning",
      data: [12000, 15000, 18000, 25000, 14000, 20000], // Mon–Sat
    },
    {
      name: "Afternoon",
      data: [8000, 9000, 12000, 10000, 7000, 11000],
    },
    {
      name: "Night",
      data: [6000, 4000, 7000, 5000, 3000, 7000],
    },
  ];

  // Configure ApexCharts, referencing isDarkMode for theme + label colors
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
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569", // lighten/darken as preferred
        },
      },
      title: {
        text: "week Days",
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
        formatter: (val) => `${(val / 1000).toFixed(0)}k`,
      },
      title: {
        text: "Employees",
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
      },
      min: 0,
      max: 40000,
      tickAmount: 4,
    },
    legend: {
      position: "right",
      offsetY: 50,
      labels: {
        colors: isDarkMode ? "#e2e8f0" : "#475569",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    fill: { opacity: 1 },
    colors: ["#f59e0b", "#6366f1", "#3b82f6"], // morning, afternoon, night
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      y: {
        formatter: (val) => `${(val / 1000).toFixed(0)}k`,
      },
    },
    grid: {
      borderColor: isDarkMode ? "#4b5563" : "#e2e8f0",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Tailwind light/dark classes for the card
      className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-md"
    >
      {/* Heading with an icon */}
      <div className="flex items-center mb-4">
        <FaChartBar className="text-blue-500 dark:text-blue-300 mr-2" size={24} />
        <h2 className="text-xl font-semibold">
          Staffing and Scheduling Optimization
        </h2>
      </div>

      {/* Render the stacked bar chart */}
      <Chart options={chartOptions} series={seriesData} type="bar" height={350} />
    </motion.div>
  );
};

export default StaffingOptimizationCard;
