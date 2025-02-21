// import React from "react";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import { FiChevronDown } from "react-icons/fi";

// const StreamliningVerificationChart = () => {
//   // Departments along the X-axis
//   const labels = ["IT", "Sales", "Marketing", "Finance"];

//   // Dummy data sets for background and police verifications
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Background verifications",
//         data: [50, 60, 25, 80], // Example values
//         backgroundColor: "#3B82F6", // Blue
//         borderRadius: 4,
//         borderSkipped: false,
//       },
//       {
//         label: "Police verifications",
//         data: [40, 45, 30, 60], // Example values
//         backgroundColor: "#F59E0B", // Orange
//         borderRadius: 4,
//         borderSkipped: false,
//       },
//     ],
//   };

//   // Chart configuration
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // We'll make our own custom legend below
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
//           color: "#6B7280", // Tailwind gray-500
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" }, // Tailwind gray-700
//         grid: { display: false },     // Hide vertical grid lines
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Time Period",
//           color: "#6B7280",
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" },
//         grid: { color: "#E5E7EB" },    // Tailwind gray-200
//         suggestedMax: 120,            // Adjust if needed
//       },
//     },
//   };

//   return (
//     <div
//       className="max-w-4xl mx-auto p-4 
//                  bg-white dark:bg-slate-800 
//                  rounded-md shadow-sm 
//                  text-gray-900 dark:text-gray-100"
//     >
//       {/* Header Row */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h2 className="text-lg font-semibold">
//           Streamlining Verification Processes
//         </h2>
//         {/* Dropdown */}
//         <div className="relative mt-2 sm:mt-0">
//           <button
//             className="inline-flex items-center px-2 py-1 text-sm font-medium
//                        bg-gray-100 dark:bg-slate-700 
//                        rounded-md hover:bg-gray-200 dark:hover:bg-slate-600
//                        transition-colors"
//           >
//             Monthly
//             <FiChevronDown className="ml-1" />
//           </button>
//           {/* A real dropdown can go here if needed */}
//         </div>
//       </div>

//       {/* Custom Legend */}
//       <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
//         {/* Background verifications (Blue) */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#3B82F6" }}
//           />
//           <span>Background verifications</span>
//         </div>
//         {/* Police verifications (Orange) */}
//         <div className="flex items-center space-x-1">
//           <span
//             className="inline-block w-3 h-3 rounded-full"
//             style={{ backgroundColor: "#F59E0B" }}
//           />
//           <span>Police verifications</span>
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div className="w-full h-auto">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default StreamliningVerificationChart;


import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FiChevronDown } from "react-icons/fi";
import useVerificationStatsStore from "../../../store/analytics dashboards cards/useVerificationStatsStore";

const StreamliningVerificationChart = () => {
  // 1) Zustand store
  const { data, loading, error, fetchVerificationStats } = useVerificationStatsStore();

  useEffect(() => {
    fetchVerificationStats();
  }, [fetchVerificationStats]);

  if (loading) return <div>Loading verification data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data yet</div>;

  // data => [ { department, backgroundCleared, backgroundPending, policeCleared, policePending }, ... ]
  // For your chart, you have 2 datasets: background verifications, police verifications
  // Let’s show only “Cleared.” If you also want “Pending,” see below.
  
  const departments = data.map(d => d.department || "Unknown");
  const backgroundValues = data.map(d => d.backgroundCleared);
  const policeValues = data.map(d => d.policeCleared);
  const backgroundPendingValues = data.map(d => d.backgroundPending);
const policePendingValues = data.map(d => d.policePending);

  const chartData = {
    labels: departments, 
    datasets: [
        { label: "Background (Cleared)", data: backgroundValues, backgroundColor: "#3B82F6" },
        { label: "Background (Pending)", data: backgroundPendingValues, backgroundColor: "#60A5FA" },
        { label: "Police (Cleared)", data: policeValues, backgroundColor: "#F59E0B" },
        { label: "Police (Pending)", data: policePendingValues, backgroundColor: "#FBBF24" },
      ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // or display: true if you want
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
          color: "#6B7280", 
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Employees (Cleared)",
          color: "#6B7280",
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-slate-800 
      rounded-md shadow-sm text-gray-900 dark:text-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold">Streamlining Verification Processes</h2>
        {/* e.g. dropdown if needed */}
        <div className="relative mt-2 sm:mt-0">
       
          {/* a real dropdown can go here */}
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: "#3B82F6" }} />
          <span>Background verifications (Cleared)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
          <span>Police verifications (Cleared)</span>
        </div>
      </div>

      <div className="w-full h-auto">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StreamliningVerificationChart;
