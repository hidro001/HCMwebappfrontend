import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define unique colors for each category
const categoryColors = {
  INDUSTRY: "#4682B4", 
  "BUSINESS PERFORMANCE": "#FF4500", 
  "BUSINESS GROWTH": "#32CD32", 
  "BUSINESS RISK": "#9400D3", 
  COMPETITION: "#800080", 
  "MANAGEMENT INFORMATION SYSTEMS": "#FFA500", 
  OWNERS: "#FFD700", 
  "CUSTOMERS AND MARKET DEMAND": "#20B2AA",
  STAFF: "#FF6347", 
  "SUCCESSION AND ESTATE PLANNING": "#ADFF2F"
};

const PerformanceBarChart = ({ performanceData }) => {
  const labels = performanceData.map((entry) => entry.category);
  const dataValues = performanceData.map((entry) => entry.percentage);
  const backgroundColors = performanceData.map(
    (entry) => categoryColors[entry.category] || "#8884d8"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Performance (%)",
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: { min: 0, max: 120 }, 
      y: {
        ticks: { autoSkip: false },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance Overview",
      },
    },
  };

  // Calculate Overall Score for display
  const calculateOverallPerformance = () => {
    if (!performanceData.length) return 0;
    const totalScore = performanceData.reduce(
      (sum, entry) => sum + entry.percentage,
      0
    );
    return (totalScore / performanceData.length).toFixed(2);
  };

  return (
    <div className="p-4 border rounded shadow mt-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
      <h3 className="mt-3 font-medium">
        Overall Performance Score: {calculateOverallPerformance()}%
      </h3>
    </div>
  );
};

export default PerformanceBarChart;
