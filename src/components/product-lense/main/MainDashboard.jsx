import React from "react";
import { FaChevronDown } from "react-icons/fa";

// Chart.js and react-chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const MainDashboard = () => {
  // --------------------------
  // Donut Chart Data & Options
  // --------------------------
  const donutData = {
    labels: ["Top Productive", "Less Productive"],
    datasets: [
      {
        data: [25, 30],
        backgroundColor: ["#3b82f6", "#f97316"], // Tailwind blue, orange
        hoverBackgroundColor: ["#2563eb", "#ea580c"], // darker on hover
      },
    ],
  };

  const donutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#6b7280", // text-gray-500
        },
      },
    },
  };

  // --------------------------
  // Bar Chart Data & Options
  // --------------------------
  const barData = {
    labels: ["IT", "Sales", "Marketing", "Finance"],
    datasets: [
      {
        label: "Top Productive",
        data: [70, 50, 80, 60],
        backgroundColor: "#3b82f6",
        hoverBackgroundColor: "#2563eb",
      },
      {
        label: "Less Productive",
        data: [30, 50, 20, 40],
        backgroundColor: "#f97316",
        hoverBackgroundColor: "#ea580c",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // text-gray-500
        },
        grid: {
          color: "#e5e7eb", // border-gray-200
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Main Dashboard</h1>

      {/* Top Row: Donut Chart & Bar Chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Donut Chart Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Team Productivity
            </h2>
            {/* Dropdown */}
            <div className="relative">
              <select className="appearance-none pr-6 pl-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none">
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
              <FaChevronDown className="absolute right-2 top-2.5 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative w-full h-[300px]">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Team Productivity Graph
            </h2>
            {/* Dropdown */}
            <div className="relative">
              <select className="appearance-none pr-6 pl-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none">
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
              <FaChevronDown className="absolute right-2 top-2.5 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative w-full h-[300px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Row: 2 small tables */}
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Top Productive Employee Table */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              Top Productive Employee
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-3 py-2">SNO.</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Emp ID</th>
                <th className="px-3 py-2">Unproductive Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sno: "01", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
                { sno: "02", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
                { sno: "03", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
              ].map((row) => (
                <tr
                  key={row.sno}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-3 py-2">{row.sno}</td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.empID}</td>
                  <td className="px-3 py-2">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-2">
            <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">
              See All &gt;
            </button>
          </div>
        </div>

        {/* Less Productive Employee Table */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              Less Productive Employee
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-3 py-2">SNO.</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Emp ID</th>
                <th className="px-3 py-2">Unproductive Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sno: "01", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
                { sno: "02", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
                { sno: "03", name: "Riya Mishra", empID: "R10023", time: "15 Min" },
              ].map((row) => (
                <tr
                  key={row.sno}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-3 py-2">{row.sno}</td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.empID}</td>
                  <td className="px-3 py-2">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-2">
            <button className="text-blue-600 dark:text-blue-400 text-xs hover:underline">
              See All &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
