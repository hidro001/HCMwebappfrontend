import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import useDisciplinaryAnalysisStore from "../../../store/analytics dashboards cards/useDisciplinaryAnalysisStore"; // ADJUST PATH

const DisciplinaryAnalysisCard = () => {
  // 1) Local state to hold the selected year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  // 2) Zustand store
  const {
    data, // { year, categories, series }
    loading,
    error,
    fetchDisciplinaryAnalysis,
  } = useDisciplinaryAnalysisStore();

  // 3) On component mount (and whenever 'year' changes), fetch data
  useEffect(() => {
    fetchDisciplinaryAnalysis(year);
  }, [year, fetchDisciplinaryAnalysis]);

  // 4) Handle loading / error states
  if (loading) {
    return (
      <div className="mx-auto p-4 mb-6 rounded-md bg-white dark:bg-gray-800 shadow-md">
        Loading Disciplinary Analysis...
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-auto p-4 mb-6 rounded-md bg-white dark:bg-gray-800 shadow-md text-red-500">
        Error: {error}
      </div>
    );
  }

  // If no data yet (e.g., first load?), show something minimal
  if (!data) {
    return null;
  }

  // 5) Extract from the API response
  const { categories, series: chartSeries } = data;

  // 6) Build chart options
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    colors: ["#FBBF24", "#4F46E5", "#3B82F6"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#9CA3AF",
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
      borderColor: "#374151",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "dark",
    },
  };

  // 7) Render the card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-4 mb-6 rounded-md bg-white dark:bg-gray-800 shadow-md"
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaChartBar className="text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Pattern Analysis for Repeated Misconduct
          </h2>
        </div>

        {/* Year Selector */}
        <select
          className="text-sm bg-gray-100 dark:bg-gray-700 rounded p-1 outline-none"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {/* Example: Show a few years around currentYear */}
          {[
            currentYear - 2,
            currentYear - 1,
            currentYear,
            currentYear + 1,
            currentYear + 2,
          ].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* ApexChart */}
      <div>
        <Chart
          options={chartOptions}
          series={chartSeries} // from API
          type="bar"
          height={350}
        />
      </div>
    </motion.div>
  );
};

export default DisciplinaryAnalysisCard;
