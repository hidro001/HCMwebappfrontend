// import React from "react";
// import { Bar } from "react-chartjs-2";
// import 'chart.js/auto'; // makes sure Chart.js registers necessary components

// const GrievanceResolutionChart = () => {
//   // Each month is assigned a color based on: 
//   //  - Orange for “Average Resolution Time”,
//   //  - Red for “Longer Resolution Times”,
//   //  - Green for “Less Resolution Times”.
//   // This matches the screenshot’s pattern.
//   const labels = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // Dummy data for each month (days to resolve):
//   const dataValues = [20, 15, 22, 35, 12, 10, 18, 38, 12, 14, 22, 40];

//   // Matching colors for each bar. Adjust as you see fit:
//   const barColors = [
//     "#F59E0B", // Jan - Average (orange)
//     "#10B981", // Feb - Less (green)
//     "#F59E0B", // Mar - Average (orange)
//     "#B91C1C", // Apr - Longer (red)
//     "#10B981", // May - Less (green)
//     "#10B981", // Jun - Less (green)
//     "#F59E0B", // Jul - Average (orange)
//     "#B91C1C", // Aug - Longer (red)
//     "#10B981", // Sep - Less (green)
//     "#10B981", // Oct - Less (green)
//     "#F59E0B", // Nov - Average (orange)
//     "#B91C1C", // Dec - Longer (red)
//   ];

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Days to Resolve",
//         data: dataValues,
//         backgroundColor: barColors,
//         borderRadius: 4,    // round off bar corners
//         borderSkipped: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // We'll use a custom legend
//       },
//       tooltip: {
//         // Basic tooltip styling
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
//           text: "Months",
//           color: "#6B7280", // gray-500
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" },
//         grid: { display: false },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Hours taken to resolve grievances",
//           color: "#6B7280",
//           font: { weight: "bold" },
//         },
//         ticks: { color: "#374151" },
//         grid: { color: "#E5E7EB" },
//         suggestedMax: 45, // Adjust as needed
//       },
//     },
//   };

//   return (
//     <div
//       className="p-4 max-w-3xl mx-auto bg-white dark:bg-slate-800
//                  rounded-md shadow-sm text-gray-900 dark:text-gray-100"
//     >
//       {/* Header & Custom Legend Row */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         {/* Title */}
//         <h2 className="text-lg font-semibold mb-2 sm:mb-0">
//           Tracking Time to Resolve Grievances
//         </h2>
        
//         {/* Custom Legend */}
//         <div className="flex items-center space-x-4 text-sm">
//           {/* Average Resolution Time */}
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#F59E0B" }}
//             />
//             <span>Average Resolution Time</span>
//           </div>
//           {/* Longer Resolution Times */}
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#B91C1C" }}
//             />
//             <span>Longer Resolution Times</span>
//           </div>
//           {/* Less Resolution Times */}
//           <div className="flex items-center space-x-1">
//             <span
//               className="inline-block w-3 h-3 rounded-full"
//               style={{ backgroundColor: "#10B981" }}
//             />
//             <span>Less Resolution Times</span>
//           </div>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="w-full h-auto">
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };

// export default GrievanceResolutionChart;


// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import useGrievanceResolutionStore from '../../../store/analytics dashboards cards/useGrievanceResolutionStore';

// function GrievanceResolutionChart() {
//   // Extract store states & actions
//   const {
//     data,
//     loading,
//     error,
//     period,
//     year,
//     month,
//     setPeriod,
//     setYear,
//     setMonth,
//     fetchGrievanceData,
//   } = useGrievanceResolutionStore();

//   // On mount or whenever period/year/month changes, fetch data
//   useEffect(() => {
//     fetchGrievanceData();
//   }, [period, year, month, fetchGrievanceData]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data) return <div>No Data</div>;

//   // If period=monthly => data.monthlyAverages
//   // If period=weekly => data.results
//   let chartData;
//   if (period === 'monthly') {
//     const monthly = data.monthlyAverages || []; // [10,15,22,...]
//     chartData = {
//       labels: [
//         'Jan','Feb','Mar','Apr','May','Jun',
//         'Jul','Aug','Sep','Oct','Nov','Dec'
//       ],
//       datasets: [
//         {
//           label: 'Hours to Resolve',
//           data: monthly,
//           backgroundColor: monthly.map((val) => {
//             if (val > 30) return '#B91C1C';  // red
//             if (val < 15) return '#10B981';  // green
//             return '#F59E0B';               // orange
//           }),
//         },
//       ],
//     };
//   } else {
//     // period=weekly => data.results
//     const weeks = data.results || []; // fallback to empty array
//     const labels = [];
//     const values = [];

//     weeks.forEach((w) => {
//       labels.push(`Week ${w._id.week}`);
//       values.push(Math.round(w.avgResolutionHours));
//     });

//     chartData = {
//       labels,
//       datasets: [
//         {
//           label: 'Hours to Resolve (weekly)',
//           data: values,
//           backgroundColor: values.map((val) => {
//             if (val > 30) return '#B91C1C';
//             if (val < 15) return '#10B981';
//             return '#F59E0B';
//           }),
//         },
//       ],
//     };
//   }

//   const options = { responsive: true };

//   return (
//     <div>
//       {/* Period Buttons */}
//       <button onClick={() => setPeriod('monthly')}>
//         Monthly
//       </button>
//       <button onClick={() => setPeriod('weekly')}>
//         Weekly
//       </button>

//       {/* Year Selector */}
//       <select
//         value={year}
//         onChange={(e) => setYear(parseInt(e.target.value, 10))}
//       >
//         <option value={2024}>2024</option>
//         <option value={2025}>2025</option>
//       </select>

//       {/* Month selector if weekly */}
//       {period === 'weekly' && (
//         <select
//           value={month || ''}
//           onChange={(e) => setMonth(parseInt(e.target.value, 10))}
//         >
//           <option value="">--Select--</option>
//           <option value={1}>Jan</option>
//           <option value={2}>Feb</option>
//           <option value={3}>Mar</option>
//           <option value={4}>Apr</option>
//           <option value={5}>May</option>
//           <option value={6}>Jun</option>
//           <option value={7}>Jul</option>
//           <option value={8}>Aug</option>
//           <option value={9}>Sep</option>
//           <option value={10}>Oct</option>
//           <option value={11}>Nov</option>
//           <option value={12}>Dec</option>
//         </select>
//       )}

//       {/* Chart */}
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// }

// export default GrievanceResolutionChart;



import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import useGrievanceResolutionStore from '../../../store/analytics dashboards cards/useGrievanceResolutionStore';

function GrievanceResolutionChart() {
  // Extract store states & actions
  const {
    data,
    loading,
    error,
    period,
    year,
    month,
    setPeriod,
    setYear,
    setMonth,
    fetchGrievanceData,
  } = useGrievanceResolutionStore();

  // On mount or whenever period/year/month changes, fetch data
  useEffect(() => {
    fetchGrievanceData();
  }, [period, year, month, fetchGrievanceData]);

  if (loading) {
    return (
      <div className="text-center p-4 text-gray-700 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-4 text-gray-700 dark:text-gray-200">
        No Data
      </div>
    );
  }

  // If period=monthly => data.monthlyAverages
  // If period=weekly => data.results
  let chartData;
  if (period === 'monthly') {
    const monthly = data.monthlyAverages || []; // [10,15,22,...]
    chartData = {
      labels: [
        'Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'
      ],
      datasets: [
        {
          label: 'Hours to Resolve',
          data: monthly,
          backgroundColor: monthly.map((val) => {
            if (val > 30) return '#B91C1C';  // red
            if (val < 15) return '#10B981';  // green
            return '#F59E0B';               // orange
          }),
        },
      ],
    };
  } else {
    // period=weekly => data.results
    const weeks = data.results || []; // fallback to empty array
    const labels = [];
    const values = [];

    weeks.forEach((w) => {
      labels.push(`Week ${w._id.week}`);
      values.push(Math.round(w.avgResolutionHours));
    });

    chartData = {
      labels,
      datasets: [
        {
          label: 'Hours to Resolve (weekly)',
          data: values,
          backgroundColor: values.map((val) => {
            if (val > 30) return '#B91C1C';
            if (val < 15) return '#10B981';
            return '#F59E0B';
          }),
        },
      ],
    };
  }

  const options = { responsive: true };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Grievance Resolution Time
      </h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Period Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded transition-colors 
              ${period === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'} 
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-2 rounded transition-colors 
              ${period === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'} 
            `}
          >
            Weekly
          </button>
        </div>

        {/* Year Selector */}
        <div className="flex items-center">
          <label htmlFor="yearSelect" className="mr-2 text-gray-700 dark:text-gray-200">
            Year:
          </label>
          <select
            id="yearSelect"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="rounded border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 px-2 py-1"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
        </div>

        {/* Month selector if weekly */}
        {period === 'weekly' && (
          <div className="flex items-center">
            <label htmlFor="monthSelect" className="mr-2 text-gray-700 dark:text-gray-200">
              Month:
            </label>
            <select
              id="monthSelect"
              value={month || ''}
              onChange={(e) => setMonth(parseInt(e.target.value, 10))}
              className="rounded border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 px-2 py-1"
            >
              <option value="">--Select--</option>
              <option value={1}>Jan</option>
              <option value={2}>Feb</option>
              <option value={3}>Mar</option>
              <option value={4}>Apr</option>
              <option value={5}>May</option>
              <option value={6}>Jun</option>
              <option value={7}>Jul</option>
              <option value={8}>Aug</option>
              <option value={9}>Sep</option>
              <option value={10}>Oct</option>
              <option value={11}>Nov</option>
              <option value={12}>Dec</option>
            </select>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default GrievanceResolutionChart;

