import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaMedal, FaChartLine, FaMeh } from "react-icons/fa";

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceManagementDashboard() {
  const BASE_URL = "http://localhost:6060/api/v1/kpi";
  const token = localStorage.getItem("accessToken") || "";

  const [selectedRange, setSelectedRange] = useState("Monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Stats
  const [topPerformerCount, setTopPerformerCount] = useState(0);
  const [avgPerformerCount, setAvgPerformerCount] = useState(0);
  const [belowAvgPerformerCount, setBelowAvgPerformerCount] = useState(0);

  // Chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Donut
  const [donutData, setDonutData] = useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["rgb(59,130,246)", "rgb(245,158,11)"],
        hoverOffset: 4,
      },
    ],
  });

  // Table
  const [topPerformerList, setTopPerformerList] = useState([]);

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line
  }, [selectedRange]);

  function loadAllData() {
    setLoading(true);
    setError("");

    fetchStats()
      .then(() => fetchChart())
      .then(() => fetchDonut())
      .then(() => fetchTopPerformerList())
      .catch((err) => {
        console.error("Error loading data:", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }

  // 1) STATS
  function fetchStats() {
    return axios
      .get(`${BASE_URL}/dashboard/stats?range=${selectedRange}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          setTopPerformerCount(res.data.data.top || 0);
          setAvgPerformerCount(res.data.data.average || 0);
          setBelowAvgPerformerCount(res.data.data.below || 0);
        }
      });
  }

  // 2) CHART
  function fetchChart() {
    return axios
      .get(`${BASE_URL}/dashboard/chart?range=${selectedRange}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          const { labels, revenueData, performanceData } = res.data.data;
          setChartData({
            labels,
            datasets: [
              {
                type: "bar",
                label: "Revenue",
                data: revenueData,
                backgroundColor: "rgba(156,163,175,0.3)",
                borderWidth: 0,
                yAxisID: "y",
              },
              {
                type: "line",
                label: "Performance",
                data: performanceData,
                borderColor: "rgba(59,130,246,1)",
                backgroundColor: "rgba(59,130,246,0.2)",
                tension: 0.4,
                yAxisID: "y2",
              },
            ],
          });
        }
      });
  }

  // 3) DONUT
  function fetchDonut() {
    return axios
      .get(`${BASE_URL}/dashboard/donut?range=${selectedRange}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          const { maleCount, femaleCount } = res.data.data;
          setDonutData({
            labels: ["Male", "Female"],
            datasets: [
              {
                data: [maleCount, femaleCount],
                backgroundColor: ["rgb(59,130,246)", "rgb(245,158,11)"],
                hoverOffset: 4,
              },
            ],
          });
        }
      });
  }

  // 4) TABLE (Top Performer List)
  function fetchTopPerformerList() {
    // We'll call your existing /ratings/top-rated?month=...&year=...&limit=4
    // or you can do your own approach
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const limit = 4;

    return axios
      .get(
        `${BASE_URL}/ratings/top-rated?month=${month}&year=${year}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (!res.data?.data) return;
        const mapped = res.data.data.map((emp, idx) => ({
          empId: emp.employeeId || `EMP${idx + 1}`,
          name: `${emp.firstName || ""} ${emp.lastName || ""}`.trim(),
          department: emp.department || "N/A",
          date: `${month}-${year}`,
          designation: emp.designation || "N/A",
        }));
        setTopPerformerList(mapped);
      });
  }

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { intersect: false },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(107,114,128,0.1)" },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "#3B82F6" },
      },
      x: {
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(107,114,128,0.05)" },
      },
    },
  };

  const donutOptions = {
    cutout: "60%",
    plugins: {
      legend: { display: false },
    },
  };

  // For Framer Motion (optional)
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="space-y-6">
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && (
        <p className="text-red-500">
          <strong>Error:</strong> {error}
        </p>
      )}

      {/* --- Stats Cards (top row) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Top Performer */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col rounded-lg p-4 shadow bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
        >
          <div className="flex items-center gap-2">
            <FaMedal className="text-blue-600 dark:text-blue-200" size={24} />
            <h2 className="text-md font-semibold">Top Performer</h2>
          </div>
          <p className="text-2xl font-bold my-3">{topPerformerCount}</p>
          <p className="text-sm font-medium text-green-600 dark:text-green-300">
            Increase by 200 this Month
          </p>
        </motion.div>

        {/* Average Performer */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col rounded-lg p-4 shadow bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100"
        >
          <div className="flex items-center gap-2">
            <FaChartLine className="text-purple-600 dark:text-purple-200" size={24} />
            <h2 className="text-md font-semibold">Average Performer</h2>
          </div>
          <p className="text-2xl font-bold my-3">{avgPerformerCount}</p>
          <p className="text-sm font-medium text-red-600 dark:text-red-300">
            Decrease by 200 this Month
          </p>
        </motion.div>

        {/* Below Average Performer */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col rounded-lg p-4 shadow bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
        >
          <div className="flex items-center gap-2">
            <FaMeh className="text-red-600 dark:text-red-200" size={24} />
            <h2 className="text-md font-semibold">Below Average Performer</h2>
          </div>
          <p className="text-2xl font-bold my-3">{belowAvgPerformerCount}</p>
          <p className="text-sm font-medium text-green-600 dark:text-green-300">
            Increase by 200 this Month
          </p>
        </motion.div>
      </div>

      {/* --- Chart Section (middle) --- */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Top Performer</h3>

          {/* Range Selector */}
          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-gray-100
                rounded-md px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                appearance-none
              "
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              ▼
            </div>
          </div>
        </div>

        <div className="w-full h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* --- Bottom row: Table (2/3) + Donut (1/3) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Performer Table */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <h3 className="font-semibold text-lg mb-4">Top Performer List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">EMP ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Designation</th>
                </tr>
              </thead>
              <tbody>
                {topPerformerList.map((row) => (
                  <tr
                    key={row.empId}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3">{row.empId}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.department}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Donut Chart (Male vs Female) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Performance</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedRange}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 mb-2">
              <Doughnut data={donutData} />
            </div>

            {/* placeholders for % changes */}
            <div className="flex space-x-4 mt-2 text-sm font-medium">
              <div className="flex flex-col items-center">
                <span className="text-blue-500 dark:text-blue-400">+15%</span>
                <span className="text-gray-600 dark:text-gray-200">
                  Male: {donutData.datasets[0].data[0]}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-orange-500 dark:text-orange-300">
                  +20%
                </span>
                <span className="text-gray-600 dark:text-gray-200">
                  Female: {donutData.datasets[0].data[1]}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
