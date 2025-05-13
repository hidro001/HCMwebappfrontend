import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

// Service functions
import {
  fetchOperationsTable,
  fetchBusinessTable,
} from "../../service/reciService";

// Modals
import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

export default function RaciDashboard() {
  const [operationsTable, setOperationsTable] = useState([]);
  const [businessTable, setBusinessTable] = useState([]);

  const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
  const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    // Fetch operations
    try {
      const opTableData = await fetchOperationsTable();
      setOperationsTable(opTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch operations table");
    }
    // Fetch business
    try {
      const busTableData = await fetchBusinessTable();
      setBusinessTable(busTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch business table");
    }
  };

  // Color-code the score text based on value (optional)
  const scoreColor = (score) => {
    if (score < 30) return "text-red-500 dark:text-red-400";
    if (score < 70) return "text-yellow-500 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <>
      {/**
       * 1) Main Container:
       *    Light mode => white background, gray text
       *    Dark mode  => gradient background, light text
       */}
      <div
        className="
          min-h-screen
          bg-white text-gray-800
          dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
          dark:text-gray-200
          p-6 md:p-10
        "
      >
        {/* Outer container to limit width and center content */}
        <div className="max-w-7xl mx-auto">
          {/**
           * 2) Heading:
           *    Light mode => gradient text from blue to purple
           *    Dark mode  => gradient text from cyan to fuchsia
           */}
          <motion.h1
            className="
              text-center text-3xl sm:text-4xl font-extrabold mb-8
              bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500
              dark:from-cyan-400 dark:to-fuchsia-400
            "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            RACI Dashboard
          </motion.h1>

          {/* 3) Two Columns for Operations & Business (stack on small screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/**
             * === RACI OPERATIONS CARD ===
             * Light: white card, gray text, subtle border
             * Dark: nearly black card, white text, darker border
             */}
            <motion.div
              className="
                rounded-xl
                bg-gray-100 text-gray-900 border border-gray-200
                shadow-xl p-5
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-cyan-600 dark:text-cyan-400">
                  RACI Operations
                </span>
              </h2>

              {/* Table for Operations */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  {/* Table Head */}
                  <thead>
                    <tr
                      className="
                        uppercase tracking-wider
                        bg-gray-200 text-gray-700
                        dark:bg-gray-700/50 dark:text-gray-300
                      "
                    >
                      <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Overall Score</th>
                      <th className="px-4 py-3 text-left rounded-r-lg">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {operationsTable.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="
                            text-center p-4
                            text-gray-500 italic
                            dark:text-gray-400
                          "
                        >
                          No operations data found.
                        </td>
                      </tr>
                    )}
                    {operationsTable.map((item, idx) => {
                      // If storing ops score as 0–1, multiply by 10:
                      const numericScore = (item.overallScore * 10).toFixed(2);
                      return (
                        <tr
                          key={item._id || idx}
                          className="
                            border-b border-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700/40
                            dark:border-gray-700
                            transition-colors
                          "
                        >
                          <td className="px-4 py-3 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3">
                            {new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 font-semibold ${scoreColor(
                              numericScore
                            )}`}
                          >
                            {numericScore}%
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="
                                flex items-center gap-1
                                text-blue-600 hover:underline
                                dark:text-blue-400
                              "
                              onClick={() => setSelectedOperationsScore(item)}
                            >
                              <FaEye />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/**
             * === RACI BUSINESS CARD ===
             * Light: white card, gray text, subtle border
             * Dark: nearly black card, white text, darker border
             */}
            <motion.div
              className="
                rounded-xl
                bg-gray-100 text-gray-900 border border-gray-200
                shadow-xl p-5
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400" />
                <span className="text-pink-600 dark:text-pink-400">
                  RACI Business
                </span>
              </h2>

              {/* Table for Business */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr
                      className="
                        uppercase tracking-wider
                        bg-gray-200 text-gray-700
                        dark:bg-gray-700/50 dark:text-gray-300
                      "
                    >
                      <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Overall Score</th>
                      <th className="px-4 py-3 text-left rounded-r-lg">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessTable.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="
                            text-center p-4
                            text-gray-500 italic
                            dark:text-gray-400
                          "
                        >
                          No business data found.
                        </td>
                      </tr>
                    )}
                    {businessTable.map((item, idx) => {
                      // If business uses 0–100 scale as is:
                      const numericScore = item.overallScore.toFixed(2);
                      return (
                        <tr
                          key={item._id || idx}
                          className="
                            border-b border-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700/40
                            dark:border-gray-700
                            transition-colors
                          "
                        >
                          <td className="px-4 py-3 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3">
                            {new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 font-semibold ${scoreColor(
                              numericScore
                            )}`}
                          >
                            {numericScore}%
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="
                                flex items-center gap-1
                                text-blue-600 hover:underline
                                dark:text-blue-400
                              "
                              onClick={() => setSelectedBusinessScore(item)}
                            >
                              <FaEye />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Modals for detailed score view */}
          {selectedOperationsScore && (
            <RaciOperationsModal
              selectedScore={selectedOperationsScore}
              onClose={() => setSelectedOperationsScore(null)}
            />
          )}
          {selectedBusinessScore && (
            <RaciBusinessModal
              selectedScore={selectedBusinessScore}
              onClose={() => setSelectedBusinessScore(null)}
            />
          )}
        </div>
      </div>

      <Toaster position="bottom-right" />
    </>
  );
}
