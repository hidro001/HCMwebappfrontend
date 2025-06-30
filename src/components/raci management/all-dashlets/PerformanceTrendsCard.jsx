import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
// If you have a dedicated loading spinner or skeleton, import it:
// import Spinner from '../../components/Spinner';

import usePerformanceTrendsStore from "../../../store/analytics dashboards cards/usePerformanceTrendsStore";

const PerformanceTrendsCard = () => {
  // 1) Extract store states & actions from your Zustand/Redux store (or whichever state management you're using).
  const {
    data,
    loading,
    error,
    timeframe,
    year,
    setTimeframe,
    setYear,
    fetchPerformanceTrends,
  } = usePerformanceTrendsStore();

  // 2) Fetch data whenever timeframe or year changes.
  useEffect(() => {
    fetchPerformanceTrends();
  }, [timeframe, year, fetchPerformanceTrends]);

  // 3) Handle loading/error states in a more user-friendly manner.
  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-gray-100">
        {/* <Spinner /> or other loading indicator */}
        <div className="flex items-center justify-center h-32">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-10 w-10" />
          <span className="ml-2">Loading Performance Trends...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">
          Performance Trends Over Time
        </h2>
        <div className="mb-2 text-red-500">
          <p>Oops! We encountered an error while fetching data:</p>
          <p className="italic">{error}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={fetchPerformanceTrends}
          aria-label="Retry fetching performance trends"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">
          Performance Trends Over Time
        </h2>
        <p>No data is available for the selected timeframe.</p>
      </div>
    );
  }

  // 4) Process data to build chart labels & scores.
  // The shape of your data changes depending on monthly vs. yearly timeframe.
  let labels;
  let scores;

  if (timeframe === "monthly") {
    // For monthly => data like: [ { month:1, year:2025, averageScore:4.0 }, ... ]
    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    labels = data.map((d) => monthLabels[d.month - 1]);
    scores = data.map((d) => d.averageScore);
  } else {
    // For yearly => data like: [ { year:2023, averageScore:3.5 }, ... ]
    labels = data.map((d) => d.year.toString());
    scores = data.map((d) => d.averageScore);
  }

  // 5) Build chart dataset.
  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Rating",
        data: scores,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // 6) Configure chart options with improved accessibility and tooltips.
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        title: {
          display: true,
          text: "Average Rating (1-5)",
        },
      },
      x: {
        title: {
          display: true,
          text: timeframe === "monthly" ? "Months" : "Years",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        footerColor: "#F9FAFB",
        callbacks: {
          // Example: customize tooltip label
          label: function (context) {
            return `Score: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  // 7) Render the Performance Trends card with toggles and chart.
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        Performance Trends Over Time
      </h2>

      {/* Controls: Toggle monthly/yearly, select year */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setTimeframe("monthly")}
          className={`px-3 py-1 rounded ${
            timeframe === "monthly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-slate-700"
          }`}
          aria-label="View monthly performance"
        >
          Monthly
        </button>

        <button
          onClick={() => setTimeframe("yearly")}
          className={`px-3 py-1 rounded ${
            timeframe === "yearly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-slate-700"
          }`}
          aria-label="View yearly performance"
        >
          Yearly
        </button>

        {timeframe === "monthly" && (
          <label className="flex items-center gap-2">
            <span className="text-sm">Select Year:</span>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-700"
              aria-label="Select year for monthly data"
            >
              {/* Dynamically render your available years, or hardcode as needed */}
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {/* Chart Container */}
      <div style={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceTrendsCard;
