// CompensationBenchmarkingCard.jsx
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

// Our Zustand store
import useCompensationBenchmarkingStore from "../../../store/analytics dashboards cards/useCompensationBenchmarkingStore";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const CompensationBenchmarkingCard = () => {
  // 1) Get state & actions from the store
  const { data, loading, error, fetchCompensationData } =
    useCompensationBenchmarkingStore();

  // 2) Fetch on mount
  useEffect(() => {
    fetchCompensationData();
  }, [fetchCompensationData]);

  // 3) Handle loading / error states
  if (loading) return <div>Loading Compensation Data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  // 4) Extract from the store data
  // data = { labels, joiningSalary, currentSalary }
  const { labels, joiningSalary, currentSalary } = data;

  // Build chart data for Chart.js
  const chartData = {
    labels,
    datasets: [
      {
        label: "Joining Salary",
        data: joiningSalary,
        backgroundColor: "#3B82F6", // Tailwind blue-500
      },
      {
        label: "Current Salary",
        data: currentSalary,
        backgroundColor: "#F97316", // Tailwind orange-500
      },
    ],
  };

  // Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { title: { display: true, text: "Salary" } },
      x: { title: { display: true, text: "Employee Type" } },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderWidth: 0,
      },
    },
  };

  // 5) Render the component
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
        <h2 className="font-semibold text-lg">
          Compensation Benchmarking By Employee TYPE
        </h2>
        {/* You can keep your time range dropdown logic if needed */}
      </div>

      {/* Legend row (optional, you can let Chart.js handle it) */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
          <span className="text-sm">Joining Salary</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
          <span className="text-sm">Current Salary</span>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CompensationBenchmarkingCard;
