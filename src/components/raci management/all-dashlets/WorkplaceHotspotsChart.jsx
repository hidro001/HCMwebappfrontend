// import React from "react";
// import { Bar } from "react-chartjs-2";
// import 'chart.js/auto'; 
// import { FiChevronDown } from "react-icons/fi";

// const WorkplaceHotspotsChart = () => {
//   // Labels for departments along X-axis
//   const labels = ["IT", "Sales", "Marketing", "Finance"];

//   // Example data for each dataset
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Cleared",
//         data: [70, 50, 30, 100],  // Example counts
//         backgroundColor: "#3B82F6", // Blue
//         borderRadius: 4,
//         borderSkipped: false,
//       },
//       {
//         label: "Pending",
//         data: [50, 40, 60, 70],   // Example counts
//         backgroundColor: "#F59E0B", // Orange
//         borderRadius: 4,
//         borderSkipped: false,
//       },
//     ],
//   };

//   // Chart.js configuration options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // We'll create a custom legend
//       },
//       tooltip: {
//         bodyColor: "#fff",
//         backgroundColor: "#111827",
//         titleColor: "#F9FAFB",
//         displayColors: false,
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Department",
//           color: "#6B7280", // gray-500
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" },
//         grid: { display: false },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Frequency (count) of issues",
//           color: "#6B7280",
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" },
//         grid: { color: "#E5E7EB", drawBorder: false },
//         suggestedMax: 120, // Adjust as you like
//       },
//     },
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 
//                     rounded-md shadow-sm text-gray-900 dark:text-gray-100">
//       {/* Title & Dropdown Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h2 className="text-lg font-semibold">
//           Workplace Hotspots for HR Intervention
//         </h2>
//         <div className="relative mt-2 sm:mt-0">
//           <button
//             className="inline-flex items-center px-2 py-1 text-sm font-medium
//                        bg-gray-100 dark:bg-slate-700 rounded-md
//                        hover:bg-gray-200 dark:hover:bg-slate-600
//                        transition-colors"
//           >
//             Monthly
//             <FiChevronDown className="ml-1" />
//           </button>
//           {/* If you need a real dropdown menu, you’d render it here */}
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
//         {/* Disciplinary Actions */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#3B82F6" }}
//           />
//           <span>Cleared</span>
//         </div>
//         {/* Grievances */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#F59E0B" }}
//           />
//           <span>Pending</span>
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div className="w-full h-auto">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default WorkplaceHotspotsChart;


import React, { useEffect,useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; 
import { FiChevronDown } from "react-icons/fi";
import useDepartmentIssueStatsStore from "../../../store/analytics dashboards cards/useDepartmentIssueStatsStore";



const WorkplaceHotspotsChart = () => {
    // 1) Local state for month
    const [selectedMonth, setSelectedMonth] = useState(null); // numeric month or null
    const [showDropdown, setShowDropdown] = useState(false);
  
    // 2) Zustand store for aggregator data
    const { data, loading, error, fetchDepartmentStats } = useDepartmentIssueStatsStore();
  
    // 3) On mount or whenever selectedMonth changes, fetch data
    useEffect(() => {
      fetchDepartmentStats(selectedMonth);
    }, [selectedMonth, fetchDepartmentStats]);
  
    if (loading) return <div>Loading department stats...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data yet</div>;
  
    // data => [ { department, pendingCount, inProgressCount, resolvedCount }, ...]
    const departments = data.map(d => d.department || "Unknown");
    const pendingValues = data.map(d => d.pendingCount);
    const inProgValues = data.map(d => d.inProgressCount);
    const resolvedValues = data.map(d => d.resolvedCount);
  
    // 4) Build chart data
    const chartData = {
      labels: departments,
      datasets: [
        {
          label: "Pending",
          data: pendingValues,
          backgroundColor: "#F59E0B", // orange
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "In Progress",
          data: inProgValues,
          backgroundColor: "#EAB308", // different shade
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "Resolved",
          data: resolvedValues,
          backgroundColor: "#3B82F6", // blue
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    };
  
    // 5) Chart options
    const options = {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: {
          bodyColor: "#fff",
          backgroundColor: "#111827",
          titleColor: "#F9FAFB",
          displayColors: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Department",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Tickets",
          },
        },
      },
    };
  
    // 6) Month dropdown logic
    const handleDropdownToggle = () => setShowDropdown(!showDropdown);
    const handleMonthChange = (month) => {
      setSelectedMonth(month); // e.g. 1..12 or null
      setShowDropdown(false);
    };
  
    // For display
    const displayMonth = selectedMonth ? monthToString(selectedMonth) : "All";
  
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 
        rounded-md shadow-sm text-gray-900 dark:text-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-semibold">Workplace Hotspots for HR Intervention</h2>
          <div className="relative mt-2 sm:mt-0">
            <button
              onClick={handleDropdownToggle}
              className="inline-flex items-center px-2 py-1 text-sm font-medium
                bg-gray-100 dark:bg-slate-700 rounded-md
                hover:bg-gray-200 dark:hover:bg-slate-600
                transition-colors"
            >
              {displayMonth}
              <FiChevronDown className="ml-1" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-slate-700 shadow rounded z-20">
                <button
                  onClick={() => handleMonthChange(null)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  All
                </button>
                <button
                  onClick={() => handleMonthChange(1)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  Jan
                </button>
                <button
                  onClick={() => handleMonthChange(2)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  Feb
                </button>
                <button
                  onClick={() => handleMonthChange(3)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  March
                </button>
                <button
                  onClick={() => handleMonthChange(4)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  April
                </button>
                <button
                  onClick={() => handleMonthChange(5)}
                  className="block text-left px-3 py-1 w-full hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                May
                </button>
                {/* ... add more months ... */}
              </div>
            )}
          </div>
        </div>
  
        <div className="mb-2 flex flex-wrap gap-4">
          {/* If you want a custom legend or just rely on Chart.js legend */}
        </div>
  
        <div className="w-full h-auto">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    );
  };
  
  function monthToString(m) {
    const arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return arr[m - 1] || "???";
  }
  
  export default WorkplaceHotspotsChart;