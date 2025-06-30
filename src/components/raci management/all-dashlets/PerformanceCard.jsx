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
import zoomPlugin from "chartjs-plugin-zoom";

// Register Chart.js components + plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  zoomPlugin
);

import useTenurePerformanceStore from "../../../store/analytics dashboards cards/useTenurePerformanceStore";

// Optional helper to map a tenure range to a color
function pickColorForRange(range) {
  switch (range) {
    case "0-1 year":
      return "rgba(54, 162, 235, 0.7)";
    case "1-2 years":
      return "rgba(255, 99, 132, 0.7)";
    case "2-3 years":
      return "rgba(255, 205, 86, 0.7)";
    case "3-5 years":
      return "rgba(75, 192, 192, 0.7)";
    case "5-10 years":
      return "rgba(153, 102, 255, 0.7)";
    case "10+ years":
      return "rgba(255, 159, 64, 0.7)";
    default:
      return "rgba(201, 203, 207, 0.7)";
  }
}

const PerformanceCard = () => {
  // Fetch data from Zustand (or any store)
  const { data, loading, error, fetchTenurePerformance } =
    useTenurePerformanceStore();

  // On mount, fetch aggregator data
  useEffect(() => {
    fetchTenurePerformance();
  }, [fetchTenurePerformance]);

  // Handle store states
  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-gray-700 dark:text-gray-300">
          Loading performance data...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded shadow text-center">
        <p className="text-gray-700 dark:text-gray-300">No data available.</p>
      </div>
    );
  }

  // data = [ { department, tenureRange, averageScore }, ... ]
  // Identify unique departments + tenure ranges
  const departments = [...new Set(data.map((d) => d.department))];
  const ranges = [...new Set(data.map((d) => d.tenureRange))];

  // Build a dataset for each tenure range
  const datasets = ranges.map((range) => {
    const scores = departments.map((dep) => {
      const found = data.find(
        (item) => item.department === dep && item.tenureRange === range
      );
      return found ? found.averageScore : 0;
    });
    return {
      label: range,
      data: scores,
      backgroundColor: pickColorForRange(range),
    };
  });

  // Prepare chart data
  const chartData = {
    labels: departments,
    datasets,
  };

  // Chart configuration (zoom, custom tooltips, etc.)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Dept Performance by Tenure Range",
        color: "#fff",
      },
      legend: {
        display: false, // We'll do our own custom legend below
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        callbacks: {
          label: function (context) {
            const rangeLabel = context.dataset.label;
            const deptLabel = context.label;
            const score = context.parsed.y.toFixed(2);
            return `Dept: ${deptLabel}, Tenure: ${rangeLabel}, Score: ${score}`;
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
        pan: { enabled: true, mode: "x" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#d1d5db" },
        title: {
          display: true,
          text: "Departments",
          color: "#d1d5db",
        },
      },
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { color: "#d1d5db" },
        title: {
          display: true,
          text: "Performance Score (1–5)",
          color: "#d1d5db",
        },
      },
    },
  };

  return (
    <div
      className="
        w-full
        max-w-4xl
        bg-white
        dark:bg-slate-800
        rounded-lg
        p-6
        shadow
        text-gray-800
        dark:text-gray-200
        text-center
        mx-auto
      "
    >
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">
        Department Performance by Tenure
      </h2>

      {/* Custom Legend Row (centered) */}
      <div className="flex items-center justify-center flex-wrap gap-4 mb-4">
        {ranges.map((range) => (
          <div className="flex items-center space-x-2" key={range}>
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: pickColorForRange(range) }}
            />
            <span className="text-sm">{range}</span>
          </div>
        ))}
      </div>

      {/* Chart container (centered by default, fills width) */}
      <div className="w-full h-64 mx-auto">
        <Bar data={chartData} options={options} />
      </div>

      {/* Optional note on zoom/pan */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
        Use mouse wheel or touch gestures to zoom/pan horizontally.
      </p>
    </div>
  );
};

export default PerformanceCard;
