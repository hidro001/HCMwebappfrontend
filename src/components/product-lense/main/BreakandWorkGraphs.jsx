import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../../service/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = {
  work: "rgba(34,197,94,0.8)", // tailwind green-500
  break: "rgba(239,68,68,0.8)", // tailwind red-500
};

const getChartOptions = (darkMode) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: 8 },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 45,
        color: darkMode ? "#9ca3af" : "#6b7280",
        maxTicksLimit: 10,
        font: {
          family: "'Inter', sans-serif",
          size: 11,
        },
      },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: darkMode ? "#9ca3af" : "#6b7280",
        precision: 0,
        font: {
          family: "'Inter', sans-serif",
          size: 11,
        },
      },
      grid: {
        color: darkMode ? "rgba(55,65,81,0.4)" : "rgba(203,213,225,0.3)",
        drawBorder: false,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: darkMode
        ? "rgba(31,41,55,0.95)"
        : "rgba(255,255,255,0.95)",
      titleColor: darkMode ? "#f9fafb" : "#1f2937",
      bodyColor: darkMode ? "#d1d5db" : "#4b5563",
      borderColor: darkMode ? "rgba(55,65,81,0.5)" : "rgba(209,213,219,0.8)",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      boxPadding: 6,
      displayColors: false,
      usePointStyle: true,
      callbacks: {
        label: (ctx) => {
          const value = ctx.parsed.y.toFixed(2);
          const unit = ctx.dataset.label === "Hours" ? "hrs" : "mins";
          return ` ${value} ${unit}`;
        },
        title: (tooltipItems) => {
          return tooltipItems[0].label;
        },
      },
    },
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
});

const BreakAndWorkGraphs = () => {
  const [deptRaw, setDeptRaw] = useState({ working: [], breaks: [] });
  const [desigRaw, setDesigRaw] = useState({ working: [], breaks: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          "/usage-stats/full-aggregated-stats"
        );
        if (!res.data.success) return console.warn(res.data.message);

        const { department = [], designation = [] } = res.data.data || {};

        setDeptRaw({
          working: department.map((d) => ({
            label: d._id || "Unknown",
            v: d.avgWorkingMinutes || 0,
          })),
          breaks: department.map((d) => ({
            label: d._id || "Unknown",
            v: d.avgBreakMinutes || 0,
          })),
        });

        setDesigRaw({
          working: designation.map((d) => ({
            label: d._id || "Unknown",
            v: d.avgWorkingMinutes || 0,
          })),
          breaks: designation.map((d) => ({
            label: d._id || "Unknown",
            v: d.avgBreakMinutes || 0,
          })),
        });
      } catch (err) {
        console.error("Failed to fetch aggregated stats:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const makeData = (arr, divisor, color, label) => ({
    labels: arr.map((d) => d.label),
    datasets: [
      {
        label,
        data: arr.map((d) => Number((d.v / divisor).toFixed(2))),
        backgroundColor: color,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 42,
        hoverBackgroundColor: color.replace("0.8", "1"),
        hoverBorderColor: "rgba(255,255,255,0.3)",
        hoverBorderWidth: 1,
      },
    ],
  });

  const deptWorkData = makeData(deptRaw.working, 60, COLORS.work, "Hours");
  const deptBreakData = makeData(deptRaw.breaks, 1, COLORS.break, "Minutes");
  const desigWorkData = makeData(desigRaw.working, 60, COLORS.work, "Hours");
  const desigBreakData = makeData(desigRaw.breaks, 1, COLORS.break, "Minutes");

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800/50">
        <div className="animate-pulse space-y-12">
          <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-xl w-1/3"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4"></div>
                <div className="h-80 bg-gray-100 dark:bg-gray-800/50 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            Work & Break Analytics
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
            Visual comparison of average working hours and break durations
            across departments and roles
          </p>
        </div>

        <div className="flex space-x-5 mt-4 md:mt-0">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Work Hours
            </span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Break Time
            </span>
          </div>
        </div>
      </div>

      {/* Department Section */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent flex-1"></div>
          <h3 className="mx-4 text-lg font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Department Insights
            </span>
          </h3>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent flex-1"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-2 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded mr-3"></div>
              <h3 className="font-bold text-gray-700 dark:text-gray-200">
                Working Hours
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (hrs)
                </span>
              </h3>
            </div>
            <div className="w-full h-80">
              <Bar
                data={deptWorkData}
                options={getChartOptions(false)}
                key="dept-work"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-2 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded mr-3"></div>
              <h3 className="font-bold text-gray-700 dark:text-gray-200">
                Break Duration
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (mins)
                </span>
              </h3>
            </div>
            <div className="w-full h-80">
              <Bar
                data={deptBreakData}
                options={getChartOptions(false)}
                key="dept-break"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Designation Section */}
      <div>
        <div className="flex items-center mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent flex-1"></div>
          <h3 className="mx-4 text-lg font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Role Insights
            </span>
          </h3>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent flex-1"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-2 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded mr-3"></div>
              <h3 className="font-bold text-gray-700 dark:text-gray-200">
                Working Hours
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (hrs)
                </span>
              </h3>
            </div>
            <div className="w-full h-80">
              <Bar
                data={desigWorkData}
                options={getChartOptions(false)}
                key="desig-work"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-2 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded mr-3"></div>
              <h3 className="font-bold text-gray-700 dark:text-gray-200">
                Break Duration
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (mins)
                </span>
              </h3>
            </div>
            <div className="w-full h-80">
              <Bar
                data={desigBreakData}
                options={getChartOptions(false)}
                key="desig-break"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakAndWorkGraphs;
