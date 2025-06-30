import React, { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import useAbsenteeismStore from "../../../store/analytics dashboards cards/useAbsenteeismStore";
import DetailModal from "./BaseModal";
import { useDrilldown } from "./useDrillDown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const AbsenteeismPatternsCard = () => {
  // 1) local state for selectedMonth
  const [selectedMonth, setSelectedMonth] = useState(null); // store numeric month (1..12)
  const [showDropdown, setShowDropdown] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const drill = useDrilldown();

  // 2) Zustand store for fetching aggregator data
  const { data, loading, error, fetchAbsenteeism } = useAbsenteeismStore();

  // 3) On mount or whenever selectedMonth changes, fetch data
  useEffect(() => {
    fetchAbsenteeism(selectedMonth);
  }, [selectedMonth, fetchAbsenteeism]);

  // 4) handle loading/error
  if (loading) return <div>Loading Absenteeism Data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No Data</div>; // until we get a response

  // data => e.g. [ { department:'IT', totalLeaves:10 }, { department:'HR', totalLeaves:5 }, ... ]
  const departments = data.map((d) => d.department || "Unknown");
  const leaves = data.map((d) => d.totalLeaves);

  // 5) Create a color array for each bar
  // Example palette (feel free to customize)
  const COLORS = [
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#10B981", // Green
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#EC4899", // Pink
  ];

  // For each department, pick a color.
  // If you have more departments than COLORS, cycle through with modulo.
  const barColors = departments.map(
    (_, index) => COLORS[index % COLORS.length]
  );

  // Build chart data
  const chartData = {
    labels: departments,
    datasets: [
      {
        label: "Total Leave Days",
        data: leaves,
        backgroundColor: barColors, // <--- array of colors
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        title: { display: true, text: "Leave Days" },
      },
      x: {
        title: { display: true, text: "Departments" },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: { usePointStyle: true },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
      },
      title: {
        display: false,
      },
    },
  };

  // 6) month dropdown logic
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleMonthChange = (monthName, numericMonth) => {
    setSelectedMonth(numericMonth);
    setShowDropdown(false);
  };

  // We'll build a monthMap
  const monthMap = [
    { name: "Jan", value: 1 },
    { name: "Feb", value: 2 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 4 },
    { name: "May", value: 5 },
    { name: "Jun", value: 6 },
    { name: "Jul", value: 7 },
    { name: "Aug", value: 8 },
    { name: "Sep", value: 9 },
    { name: "Oct", value: 10 },
    { name: "Nov", value: 11 },
    { name: "Dec", value: 12 },
  ];

  // If selectedMonth is null => "All" or "Select"
  const displayMonth = selectedMonth
    ? monthMap.find((m) => m.value === selectedMonth)?.name
    : "All";

  const handleChartClick = () => {
    drill.fetch(
      "absenteeism", // back-end graph key
      selectedMonth ? { month: selectedMonth } : {}
    );
  };
  return (
    <div
      className="
        w-full
        max-w-3xl
        bg-white
        dark:bg-slate-800
        rounded-lg
        p-4
        shadow
        text-gray-800
        dark:text-gray-200
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          Absenteeism Patterns by Department
        </h2>
        {/* Month dropdown */}
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="
              flex items-center 
              px-2 py-1
              bg-gray-100 dark:bg-slate-700
              rounded
              hover:bg-gray-200 dark:hover:bg-slate-600
              transition
            "
          >
            <span className="mr-1 text-sm">{displayMonth}</span>
            <FaChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="
                  absolute
                  right-0
                  mt-2
                  w-20
                  bg-white
                  dark:bg-slate-700
                  shadow
                  rounded
                  z-20
                "
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <button
                  onClick={() => handleMonthChange("All", null)}
                  className="
                    w-full
                    text-left
                    px-3 py-2
                    hover:bg-gray-100 
                    dark:hover:bg-slate-600
                    transition
                    text-sm
                  "
                >
                  All
                </button>
                {monthMap.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMonthChange(m.name, m.value)}
                    className="
                      w-full
                      text-left
                      px-3 py-2
                      hover:bg-gray-100 
                      dark:hover:bg-slate-600
                      transition
                      text-sm
                    "
                  >
                    {m.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-64" onClick={handleChartClick}>
        <Bar data={chartData} options={options} />
      </div>
      <DetailModal
        open={drill.open}
        onClose={drill.close}
        loading={drill.loading}
        rows={drill.rows}
        title={
          selectedMonth
            ? `Absenteeism – ${displayMonth}`
            : "Absenteeism – All Months"
        }
      />
    </div>
  );
};

export default AbsenteeismPatternsCard;
