import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useStaffingOptimizationStore from "../../../store/analytics dashboards cards/useStaffingOptimizationStore"; // adjust path
import DetailModal from "./BaseModal"; // ① add
import { useDrilldown } from "./useDrilldown"; // ① add

const StaffingOptimizationCard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const drill = useDrilldown();
  // 1) Zustand store states
  const { data, loading, error, fetchStaffingData } =
    useStaffingOptimizationStore();

  // 2) On mount, fetch the real data
  useEffect(() => {
    fetchStaffingData();

    // Also check dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();

    // eslint-disable-next-line
  }, []);

  // 3) Handle loading/error
  if (loading) {
    return <div className="p-4">Loading Staffing Data...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  // 4) If no data yet, show null or a skeleton
  if (!data) {
    return null;
  }

  // 5) Extract from API response: { categories, series }
  const { categories, series } = data;
  // e.g. categories = ["Mon","Tue","Wed","Thu","Fri","Sat"]
  //      series = [ { name: 'Morning', data: [...] }, ... ]

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      background: "transparent",
    },
    theme: {
      mode: isDarkMode ? "dark" : "light",
    },
    xaxis: {
      categories,
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
      },
      title: {
        text: "Week Days",
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
        // Remove /1000 if your numbers are already small
        formatter: (val) => `${val}`,
      },
      title: {
        text: "Employees",
        style: {
          color: isDarkMode ? "#e2e8f0" : "#475569",
        },
      },
      // Remove max so ApexCharts auto-scales
      // max: 40000,
      tickAmount: 4,
    },
    legend: {
      position: "right",
      offsetY: 50,
      labels: {
        colors: isDarkMode ? "#e2e8f0" : "#475569",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    fill: { opacity: 1 },
    colors: ["#f59e0b", "#6366f1", "#3b82f6"],
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      y: {
        // remove the /1000 or adapt it
        formatter: (val) => `${val}`,
      },
    },
    grid: {
      borderColor: isDarkMode ? "#4b5563" : "#e2e8f0",
    },
  };

  // 7) Render the card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-md"
    >
      <div className="flex items-center mb-4">
        <FaChartBar
          className="text-blue-500 dark:text-blue-300 mr-2"
          size={24}
        />
        <h2 className="text-xl font-semibold">
          Staffing and Scheduling Optimization
        </h2>
      </div>

      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={350}
        onClick={() => drill.fetch("staffing")}
      />
      <DetailModal
        open={drill.open}
        onClose={drill.close}
        loading={drill.loading}
        rows={drill.rows}
        title="Staffing – User List"
      />
    </motion.div>
  );
};

export default StaffingOptimizationCard;
