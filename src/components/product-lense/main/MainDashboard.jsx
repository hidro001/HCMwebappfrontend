import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
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
import MostFrequentBreakTimes from "./MostFrequentBreakTimes";
import {
  fetchTopSubordinates,
  fetchLessSubordinates,
} from "../../../service/productLenseService";
import OrgUsageSection from "./OrgUsageSection";
import TopLeastProductivitySection from "./TopLeastProductivitySection";
import BreakAndWorkGraphs from "./BreakandWorkGraphs";
import {
  FiActivity,
  FiBarChart2,
  FiUsers,
  FiPieChart,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

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
  const [intervalSelect, setIntervalSelect] = useState("monthly");
  const [topSubs, setTopSubs] = useState([]);
  const [lessSubs, setLessSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subordinates data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const topData = await fetchTopSubordinates(intervalSelect);
        const lessData = await fetchLessSubordinates(intervalSelect);

        setTopSubs(topData || []);
        setLessSubs(lessData || []);
      } catch (err) {
        console.error("Error fetching subordinates data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [intervalSelect]);

  // Prepare Donut Chart
  const topCount = topSubs.length;
  const lessCount = lessSubs.length;

  const donutData = {
    labels: ["Top Productive", "Less Productive"],
    datasets: [
      {
        data: [topCount, lessCount],
        backgroundColor: ["#3b82f6", "#f97316"],
        hoverBackgroundColor: ["#2563eb", "#ea580c"],
        borderWidth: 0,
      },
    ],
  };

  const donutOptions = {
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  // Prepare Bar Chart
  const departmentSet = new Set();
  const topCountByDept = {};
  const lessCountByDept = {};

  topSubs.forEach((sub) => {
    const dept = sub.department || "Unknown";
    departmentSet.add(dept);
    topCountByDept[dept] = (topCountByDept[dept] || 0) + 1;
  });

  lessSubs.forEach((sub) => {
    const dept = sub.department || "Unknown";
    departmentSet.add(dept);
    lessCountByDept[dept] = (lessCountByDept[dept] || 0) + 1;
  });

  const allDepartments = Array.from(departmentSet);
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
        borderRadius: 6,
      },
      {
        label: "Less Productive",
        data: lessDeptData,
        backgroundColor: "#f97316",
        hoverBackgroundColor: "#ea580c",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
          precision: 0,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#6b7280",
          usePointStyle: true,
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FiActivity className="text-indigo-500" />
            Productivity Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Insights into team performance and organizational trends
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="relative inline-block">
            <select
              className="appearance-none pr-8 pl-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              value={intervalSelect}
              onChange={(e) => setIntervalSelect(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <FaChevronDown className="absolute right-3 top-3 text-gray-400 dark:text-gray-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart Card */}
        <div className="bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <FiPieChart className="text-indigo-500" />
              Team Productivity Distribution
            </h2>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FiFilter className="mr-1" /> {intervalSelect}
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse h-[300px] flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          ) : (
            <div className="relative w-full h-[300px]">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          )}
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <FiBarChart2 className="text-indigo-500" />
              Department Performance
            </h2>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FiFilter className="mr-1" /> {intervalSelect}
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          ) : (
            <div className="relative w-full h-[300px]">
              <Bar data={barData} options={barOptions} />
            </div>
          )}
        </div>
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OrgUsageSection />
        <TopLeastProductivitySection />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <BreakAndWorkGraphs />
        <MostFrequentBreakTimes />
      </div>

      {/* Dashboard Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Data updated just now • Showing {topSubs.length + lessSubs.length}{" "}
          employees
        </p>
      </div>
    </div>
  );
};

export default MainDashboard;
