import React, { useEffect, useState } from "react";
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

// Import your API helpers
import {
  fetchTopSubordinates,
  fetchLessSubordinates,
} from "../../../service/productLenseService"; // <-- Adjust path accordingly
import OrgUsageSection from "./OrgUsageSection";
import TopLeastProductivitySection from "./TopLeastProductivitySection";

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
  // ---------------------------
  // State
  // ---------------------------
  const [intervalSelect, setIntervalSelect] = useState("monthly");
  const [topSubs, setTopSubs] = useState([]);
  const [lessSubs, setLessSubs] = useState([]);

  // ---------------------------
  // Fetch subordinates on load + whenever interval changes
  // ---------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // example: daily, weekly, monthly, yearly
        const topData = await fetchTopSubordinates(intervalSelect);
        const lessData = await fetchLessSubordinates(intervalSelect);

        setTopSubs(topData || []);
        setLessSubs(lessData || []);
      } catch (err) {
        console.error("Error fetching subordinates data:", err);
      }
    };

    fetchData();
  }, [intervalSelect]);

  // ---------------------------
  // Prepare Donut Chart
  // ---------------------------
  // Show how many are in top vs. less
  const topCount = topSubs.length;
  const lessCount = lessSubs.length;

  const donutData = {
    labels: ["Top Productive", "Less Productive"],
    datasets: [
      {
        data: [topCount, lessCount],
        backgroundColor: ["#3b82f6", "#f97316"], // Tailwind blue, orange
        hoverBackgroundColor: ["#2563eb", "#ea580c"],
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

  // ---------------------------
  // Prepare Bar Chart
  // ---------------------------
  // We'll group subordinates by department and display how many "top" vs. "less"
  // fall under each department. This is just an EXAMPLE approach.
  const departmentSet = new Set();
  const topCountByDept = {};
  const lessCountByDept = {};

  // Tally top subordinates by department
  topSubs.forEach((sub) => {
    const dept = sub.department || "Unknown";
    departmentSet.add(dept);
    topCountByDept[dept] = (topCountByDept[dept] || 0) + 1;
  });

  // Tally less subordinates by department
  lessSubs.forEach((sub) => {
    const dept = sub.department || "Unknown";
    departmentSet.add(dept);
    lessCountByDept[dept] = (lessCountByDept[dept] || 0) + 1;
  });

  const allDepartments = Array.from(departmentSet); // unique list of departments

  const topDeptData = allDepartments.map((dept) => topCountByDept[dept] || 0);
  const lessDeptData = allDepartments.map((dept) => lessCountByDept[dept] || 0);

  const barData = {
    labels: allDepartments,
    datasets: [
      {
        label: "Top Productive",
        data: topDeptData,
        backgroundColor: "#3b82f6",
        hoverBackgroundColor: "#2563eb",
      },
      {
        label: "Less Productive",
        data: lessDeptData,
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

  // ---------------------------
  // Render
  // ---------------------------
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
            {/* Dropdown for interval */}
            <div className="relative">
              <select
                className="appearance-none pr-6 pl-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
                value={intervalSelect}
                onChange={(e) => setIntervalSelect(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <FaChevronDown className="absolute right-2 top-2.5 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>
          </div>

          {/* Donut Chart */}
          {/* <div className="relative w-full h-[300px]">
            <Doughnut data={donutData} options={donutOptions} />
          </div> */}
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Team Productivity Graph
            </h2>
            {/* Dropdown (reuse same interval state for simplicity) */}
            <div className="relative">
              <select
                className="appearance-none pr-6 pl-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
                value={intervalSelect}
                onChange={(e) => setIntervalSelect(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
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
         <OrgUsageSection />
         <TopLeastProductivitySection />
      </div>
    </div>
  );
};

export default MainDashboard;
