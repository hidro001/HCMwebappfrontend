// src/RaciDashboard.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Import service functions from the API file
import {
  fetchOperationsScore,
  fetchBusinessScore,
  fetchOperationsTable,
  fetchBusinessTable,
} from "../../service/reciService";

export default function RaciDashboard() {

  // Date states for the two dashboards.
  const [operationsDate, setOperationsDate] = useState("");
  const [businessDate, setBusinessDate] = useState("");

  // Chart data states for Operations.
  const [operationsChartData, setOperationsChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Operations Score",
        data: [],
        borderColor: "#6366F1",
        tension: 0.4,
      },
    ],
  });
  const [operationsOverall, setOperationsOverall] = useState(0);

  // Chart data states for Business.
  const [businessChartData, setBusinessChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Business Score",
        data: [],
        borderColor: "#6366F1",
        tension: 0.4,
      },
    ],
  });
  const [businessOverall, setBusinessOverall] = useState(0);

  // Table data states.
  const [operationsTable, setOperationsTable] = useState([]);
  const [businessTable, setBusinessTable] = useState([]);

  // On mount, load both tables.
  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const opTableData = await fetchOperationsTable();
      setOperationsTable(opTableData);
    } catch (err) {
      console.error("Error fetching operations table:", err);
      toast.error("Failed to fetch operations table");
    }

    try {
      const busTableData = await fetchBusinessTable();
      setBusinessTable(busTableData);
    } catch (err) {
      console.error("Error fetching business table:", err);
      toast.error("Failed to fetch business table");
    }
  };

  // Handler: When user selects a date for Operations (RACI1).
  const handleOperationsDateChange = async (e) => {
    const newDate = e.target.value;
    setOperationsDate(newDate);

    if (!newDate) {
      // Clear chart if no date is selected.
      setOperationsChartData({
        labels: [],
        datasets: [{ label: "Operations Score", data: [] }],
      });
      setOperationsOverall(0);
      return;
    }
    try {
      const doc = await fetchOperationsScore(newDate);
      if (doc) {
        // Assume doc.metrics is an array like [{ name, score }, ...]
        // and doc.overallScore is the overall score (e.g., 80).
        const labels = doc.metrics.map((m) => m.name);
        const scores = doc.metrics.map((m) => m.score);

        setOperationsChartData({
          labels,
          datasets: [
            {
              label: "Operations Score",
              data: scores,
              borderColor: "#6366F1",
              tension: 0.4,
            },
          ],
        });
        setOperationsOverall(doc.overallScore || 0);
      }
    } catch (err) {
      console.error("Error fetching Operations data:", err);
      toast.error(
        err.response?.data?.message || "No operations data found for that date"
      );
      setOperationsChartData({
        labels: [],
        datasets: [{ label: "Operations Score", data: [] }],
      });
      setOperationsOverall(0);
    }
  };

  // Handler: When user selects a date for Business (RACI2).
  const handleBusinessDateChange = async (e) => {
    const newDate = e.target.value;
    setBusinessDate(newDate);

    if (!newDate) {
      // Clear chart if no date is selected.
      setBusinessChartData({
        labels: [],
        datasets: [{ label: "Business Score", data: [] }],
      });
      setBusinessOverall(0);
      return;
    }
    try {
      const doc = await fetchBusinessScore(newDate);
      if (doc) {
        const labels = doc.metrics.map((m) => m.name);
        const scores = doc.metrics.map((m) => m.score);

        setBusinessChartData({
          labels,
          datasets: [
            {
              label: "Business Score",
              data: scores,
              borderColor: "#6366F1",
              tension: 0.4,
            },
          ],
        });
        setBusinessOverall(doc.overallScore || 0);
      }
    } catch (err) {
      console.error("Error fetching Business data:", err);
      toast.error(
        err.response?.data?.message || "No business data found for that date"
      );
      setBusinessChartData({
        labels: [],
        datasets: [{ label: "Business Score", data: [] }],
      });
      setBusinessOverall(0);
    }
  };

  // Chart configuration options.
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-2 rounded-lg">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        RACI Dashboard
      </motion.h1>

      {/* Top row: two charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Operations Chart (RACI1) */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">RACI Operations</h2>
            <div>
              <label className="mr-2 text-sm">Select Date:</label>
              <input
                type="date"
                value={operationsDate}
                onChange={handleOperationsDateChange}
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          {/* Overall Score */}
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              Overall Score: {operationsOverall}%
            </span>
          </div>
          <div className="w-full h-60">
            <Line data={operationsChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Business Chart (RACI2) */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">RACI Business</h2>
            <div>
              <label className="mr-2 text-sm">Select Date:</label>
              <input
                type="date"
                value={businessDate}
                onChange={handleBusinessDateChange}
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          {/* Overall Score */}
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              Overall Score: {businessOverall}%
            </span>
          </div>
          <div className="w-full h-60">
            <Line data={businessChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Bottom row: two tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operations Table */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">RACI Operations</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    SNO.
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Date
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Overall Score
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {operationsTable.map((row, idx) => (
                  <tr
                    key={row._id}
                    className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      {idx + 1}
                    </td>
                    <td>
                      {new Date(row.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      {row.overallScore}%
                    </td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {operationsTable.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-3 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-right">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              See All
            </button>
          </div>
        </motion.div>

        {/* Business Table */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">RACI Business</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-700 border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    SNO.
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Date
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Overall Score
                  </th>
                  <th className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {businessTable.map((row, idx) => (
                  <tr
                    key={row._id}
                    className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      {idx + 1}
                    </td>
                    <td>
                      {new Date(row.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      {row.overallScore}%
                    </td>
                    <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {businessTable.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-3 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-right">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              See All
            </button>
          </div>
        </motion.div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
