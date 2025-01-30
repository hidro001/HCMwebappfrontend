

// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Line } from "react-chartjs-2";
// import { BsThreeDotsVertical } from "react-icons/bs";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Tiny sparkline for "Recent Vacancies"
// function MiniSparkline({ data }) {
//   const sparkData = {
//     labels: data.map((_, i) => i),
//     datasets: [
//       {
//         data,
//         borderColor: "#3B82F6",
//         borderWidth: 2,
//         tension: 0.3,
//         backgroundColor: "transparent",
//         pointRadius: 0,
//       },
//     ],
//   };

//   const sparkOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: { x: { display: false }, y: { display: false } },
//     plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line data={sparkData} options={sparkOptions} />
//     </div>
//   );
// }

// // Pastel color styles for each department
// const departmentStyles = {
//   Development: {
//     bg: "bg-purple-50",
//     text: "text-gray-800",
//     circle: "bg-gray-200",
//     pillBg: "bg-purple-500",
//     pillText: "text-white",
//   },
//   "Sales & Marketing": {
//     bg: "bg-orange-50",
//     text: "text-gray-800",
//     circle: "bg-gray-200",
//     pillBg: "bg-green-500",
//     pillText: "text-white",
//   },
//   "Project Management": {
//     bg: "bg-green-50",
//     text: "text-gray-800",
//     circle: "bg-gray-200",
//     pillBg: "bg-blue-500",
//     pillText: "text-white",
//   },
//   "Analytics & Data": {
//     bg: "bg-blue-50",
//     text: "text-gray-800",
//     circle: "bg-gray-200",
//     pillBg: "bg-gray-400",
//     pillText: "text-white",
//   },
//   Finance: {
//     bg: "bg-pink-50",
//     text: "text-gray-800",
//     circle: "bg-gray-200",
//     pillBg: "bg-pink-500",
//     pillText: "text-white",
//   },
// };

// export default function RecruitDashboard() {
//   // Top Hiring Sources data & options
//   const topHiringData = {
//     labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
//     datasets: [
//       { label: "Referral", data: [25, 60, 15, 40, 30, 55, 10], backgroundColor: "#8B5CF6" },
//       { label: "Indeed", data: [10, 20, 50, 25, 45, 20, 15], backgroundColor: "#22C55E" },
//       { label: "LinkedIn", data: [40, 30, 35, 55, 70, 65, 35], backgroundColor: "#F59E0B" },
//     ],
//   };
//   const topHiringOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: { grid: { display: false } },
//       y: { beginAtZero: true, max: 100 },
//     },
//     plugins: { legend: { position: "bottom" } },
//   };

//   // Table data for "Recent Vacancies"
//   const vacancies = [
//     {
//       title: "UX Designer",
//       location: "Dayton",
//       applicants: 122,
//       newApplicants: 33,
//       sparkData: [2, 6, 4, 10, 8],
//     },
//     {
//       title: "iOS App Developer",
//       location: "Remote",
//       applicants: 34,
//       newApplicants: 5,
//       sparkData: [1, 3, 7, 6, 9],
//     },
//     {
//       title: "Network Administrator",
//       location: "Phoenix",
//       applicants: 45,
//       newApplicants: 13,
//       sparkData: [5, 9, 4, 10, 5],
//     },
//     {
//       title: "JavaScript Developer",
//       location: "Remote",
//       applicants: 57,
//       newApplicants: 5,
//       sparkData: [2, 2, 5, 7, 3],
//     },
//     {
//       title: "Graphic Designer",
//       location: "Gothenburg",
//       applicants: 74,
//       newApplicants: 22,
//       sparkData: [3, 4, 10, 6, 8],
//     },
//     {
//       title: "Python Django Developer",
//       location: "Remote",
//       applicants: 44,
//       newApplicants: 12,
//       sparkData: [2, 7, 8, 4, 5],
//     },
//   ];

//   // Departments list
//   const departments = [
//     { name: "Development", newCount: 2, active: true },
//     { name: "Sales & Marketing", newCount: 2, active: true },
//     { name: "Project Management", newCount: 2, active: true },
//     { name: "Analytics & Data", newCount: 0, active: false },
//     { name: "Finance", newCount: 0, active: false },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
//       <div className="max-w-screen-2xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
//         </div>

//         {/* 2×2 stats + Bar Chart */}
//         <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6 mb-6">
//           <div className="grid grid-cols-2 grid-rows-2 gap-6">
//             {/* Card 1 */}
//             <div className="rounded-lg p-4 bg-green-50 shadow flex flex-col justify-center">
//               <div className="text-3xl font-bold mb-1">79</div>
//               <div className="text-gray-600">Open Positions</div>
//             </div>
//             {/* Card 2 */}
//             <div className="rounded-lg p-4 bg-orange-50 shadow flex flex-col justify-center">
//               <div className="text-3xl font-bold mb-1">160</div>
//               <div className="text-gray-600">Applicants</div>
//             </div>
//             {/* Card 3 */}
//             <div className="rounded-lg p-4 bg-blue-50 shadow flex flex-col justify-center">
//               <div className="text-3xl font-bold mb-1">7</div>
//               <div className="text-gray-600">Outstanding Offers</div>
//             </div>
//             {/* Card 4 */}
//             <div className="rounded-lg p-4 bg-purple-50 shadow flex flex-col justify-center">
//               <div className="text-3xl font-bold mb-1">18</div>
//               <div className="text-gray-600">Onboarding</div>
//             </div>
//           </div>

//           {/* Bar Chart */}
//           <div className="bg-white rounded-lg shadow p-4 flex flex-col">
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="font-semibold text-gray-800">Top Hiring Sources</h2>
//               <span className="text-sm text-gray-500">Nov. 01 – 07</span>
//             </div>
//             <div className="flex-grow relative h-56">
//               <Bar data={topHiringData} options={topHiringOptions} />
//             </div>
//           </div>
//         </div>

//         {/* Recent Vacancies + Departments */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Recent Vacancies */}
//           <div className="col-span-2 bg-white rounded-lg shadow p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Vacancies</h2>
//               <button className="text-sm font-medium text-blue-600 hover:underline">
//                 All Vacancies
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-gray-700">
//                 <thead>
//                   <tr className="text-left border-b border-gray-200">
//                     <th className="py-2 font-semibold">Job Title</th>
//                     <th className="py-2 font-semibold">Location</th>
//                     <th className="py-2 font-semibold">Applicants</th>
//                     <th className="py-2 font-semibold">Applicants</th>
//                     <th className="py-2 w-10" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {vacancies.map((vac, idx) => (
//                     <tr
//                       key={idx}
//                       className="border-b border-gray-200 last:border-0 hover:bg-gray-50"
//                     >
//                       <td className="py-3 font-medium">{vac.title}</td>
//                       <td className="py-3">{vac.location}</td>
//                       <td className="py-3">
//                         <span className="font-medium">{vac.applicants}</span>
//                         {vac.newApplicants > 0 && (
//                           <span className="ml-1 text-xs text-green-500">
//                             ({vac.newApplicants} new)
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3">
//                         <MiniSparkline data={vac.sparkData} />
//                       </td>
//                       <td className="py-3 text-right">
//                         <button
//                           className="text-gray-400 hover:text-gray-600 p-1"
//                           title="More actions"
//                         >
//                           <BsThreeDotsVertical />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Departments card more like the reference image */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="font-semibold text-gray-800">Departments</h2>
//               <span className="text-sm text-gray-500">Sep. 01 – 07</span>
//             </div>
//             <div className="space-y-3">
//               {departments.map((dept, i) => {
//                 const styles = departmentStyles[dept.name] || {
//                   bg: "bg-gray-100",
//                   text: "text-gray-800",
//                   circle: "bg-gray-200",
//                   pillBg: "bg-gray-300",
//                   pillText: "text-gray-700",
//                 };

//                 return (
//                   <div
//                     key={i}
//                     className={`flex items-center justify-between p-4 rounded-xl ${styles.bg}`}
//                   >
//                     {/* Department name */}
//                     <span className={`font-medium ${styles.text}`}>{dept.name}</span>

//                     {/* Overlapping circles & “+2 new” pill */}
//                     <div className="flex items-center space-x-2">
//                       {/* Overlapping circles */}
//                       <div className="relative w-10 h-7">
//                         <div
//                           className={`absolute w-7 h-7 rounded-full top-0 left-0 ${styles.circle}`}
//                         />
//                         <div
//                           className={`absolute w-7 h-7 rounded-full top-0 left-3 ${styles.circle}`}
//                         />
//                       </div>

//                       {/* If newCount > 0, show the pill */}
//                       {dept.newCount > 0 && (
//                         <span
//                           className={`px-2 py-1 text-xs font-medium rounded-full ${styles.pillBg} ${styles.pillText}`}
//                         >
//                           +{dept.newCount} new
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { BsThreeDotsVertical, BsMoonFill, BsSunFill } from "react-icons/bs";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Pastel color styles for each department, with dark-mode variants
const departmentStyles = {
  Development: {
    bg: "bg-purple-50 dark:bg-purple-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-purple-500 dark:bg-purple-500",
    pillText: "text-white",
  },
  "Sales & Marketing": {
    bg: "bg-orange-50 dark:bg-orange-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-green-500 dark:bg-green-500",
    pillText: "text-white",
  },
  "Project Management": {
    bg: "bg-green-50 dark:bg-green-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-blue-500 dark:bg-blue-500",
    pillText: "text-white",
  },
  "Analytics & Data": {
    bg: "bg-blue-50 dark:bg-blue-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-gray-400 dark:bg-gray-400",
    pillText: "text-white",
  },
  Finance: {
    bg: "bg-pink-50 dark:bg-pink-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-pink-500 dark:bg-pink-500",
    pillText: "text-white",
  },
};

// Minimal sparkline component
function MiniSparkline({ data }) {
  const sparkData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: "#3B82F6",
        borderWidth: 2,
        tension: 0.3,
        backgroundColor: "transparent",
        pointRadius: 0,
      },
    ],
  };

  const sparkOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="w-20 h-8">
      <Line data={sparkData} options={sparkOptions} />
    </div>
  );
}

export default function RecruitDashboard() {
  // (Optional) local state to toggle dark mode manually
  const [darkMode, setDarkMode] = useState(false);

  // Data for the bar chart
  const topHiringData = {
    labels: ["01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09"],
    datasets: [
      { label: "Referral", data: [25, 60, 15, 40, 30, 55, 10], backgroundColor: "#8B5CF6" },
      { label: "Indeed", data: [10, 20, 50, 25, 45, 20, 15], backgroundColor: "#22C55E" },
      { label: "LinkedIn", data: [40, 30, 35, 55, 70, 65, 35], backgroundColor: "#F59E0B" },
    ],
  };
  const topHiringOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 100 },
    },
    plugins: { legend: { position: "bottom" } },
  };

  // Recent Vacancies data
  const vacancies = [
    {
      title: "UX Designer",
      location: "Dayton",
      applicants: 122,
      newApplicants: 33,
      sparkData: [2, 6, 4, 10, 8],
    },
    {
      title: "iOS App Developer",
      location: "Remote",
      applicants: 34,
      newApplicants: 5,
      sparkData: [1, 3, 7, 6, 9],
    },
    {
      title: "Network Administrator",
      location: "Phoenix",
      applicants: 45,
      newApplicants: 13,
      sparkData: [5, 9, 4, 10, 5],
    },
    {
      title: "JavaScript Developer",
      location: "Remote",
      applicants: 57,
      newApplicants: 5,
      sparkData: [2, 2, 5, 7, 3],
    },
    {
      title: "Graphic Designer",
      location: "Gothenburg",
      applicants: 74,
      newApplicants: 22,
      sparkData: [3, 4, 10, 6, 8],
    },
    {
      title: "Python Django Developer",
      location: "Remote",
      applicants: 44,
      newApplicants: 12,
      sparkData: [2, 7, 8, 4, 5],
    },
  ];

  // Departments data
  const departments = [
    { name: "Development", newCount: 2, active: true },
    { name: "Sales & Marketing", newCount: 2, active: true },
    { name: "Project Management", newCount: 2, active: true },
    { name: "Analytics & Data", newCount: 0, active: false },
    { name: "Finance", newCount: 0, active: false },
  ];

  return (
    // Toggle dark mode with a parent .dark class
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6 transition-colors">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header with a dark-mode toggle button (optional) */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>

            {/* Dark-mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="border border-gray-300 dark:border-gray-700 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <BsSunFill /> : <BsMoonFill />}
            </button>
          </div>

          {/* 2×2 stats + Bar Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6 mb-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              {/* Card 1 */}
              <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">79</div>
                <div className="text-gray-600 dark:text-gray-300">Open Positions</div>
              </div>

              {/* Card 2 */}
              <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">160</div>
                <div className="text-gray-600 dark:text-gray-300">Applicants</div>
              </div>

              {/* Card 3 */}
              <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">7</div>
                <div className="text-gray-600 dark:text-gray-300">Outstanding Offers</div>
              </div>

              {/* Card 4 */}
              <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">18</div>
                <div className="text-gray-600 dark:text-gray-300">Onboarding</div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Top Hiring Sources
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Nov. 01 – 07</span>
              </div>
              <div className="flex-grow relative h-56">
                <Bar data={topHiringData} options={topHiringOptions} />
              </div>
            </div>
          </div>

          {/* Recent Vacancies + Departments */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Vacancies */}
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Recent Vacancies
                </h2>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  All Vacancies
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700 dark:text-gray-200">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 font-semibold">Job Title</th>
                      <th className="py-2 font-semibold">Location</th>
                      <th className="py-2 font-semibold">Applicants</th>
                      <th className="py-2 font-semibold">Applicants</th>
                      <th className="py-2 w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {vacancies.map((vac, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 font-medium">{vac.title}</td>
                        <td className="py-3">{vac.location}</td>
                        <td className="py-3">
                          <span className="font-medium">{vac.applicants}</span>
                          {vac.newApplicants > 0 && (
                            <span className="ml-1 text-xs text-green-500 dark:text-green-300">
                              ({vac.newApplicants} new)
                            </span>
                          )}
                        </td>
                        <td className="py-3">
                          <MiniSparkline data={vac.sparkData} />
                        </td>
                        <td className="py-3 text-right">
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                            title="More actions"
                          >
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Departments card, with pastel + dark mode */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Departments</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Sep. 01 – 07</span>
              </div>
              <div className="space-y-3">
                {departments.map((dept, i) => {
                  const styles = departmentStyles[dept.name] || {
                    bg: "bg-gray-100 dark:bg-gray-800",
                    text: "text-gray-800 dark:text-gray-100",
                    circle: "bg-gray-200 dark:bg-gray-600",
                    pillBg: "bg-gray-300 dark:bg-gray-700",
                    pillText: "text-gray-700 dark:text-gray-100",
                  };

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl ${styles.bg}`}
                    >
                      {/* Department name */}
                      <span className={`font-medium ${styles.text}`}>{dept.name}</span>

                      {/* Overlapping circles & “+2 new” pill */}
                      <div className="flex items-center space-x-2">
                        {/* Overlapping circles */}
                        <div className="relative w-10 h-7">
                          <div
                            className={`absolute w-7 h-7 rounded-full top-0 left-0 ${styles.circle}`}
                          />
                          <div
                            className={`absolute w-7 h-7 rounded-full top-0 left-3 ${styles.circle}`}
                          />
                        </div>

                        {/* If newCount > 0, show the pill */}
                        {dept.newCount > 0 && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${styles.pillBg} ${styles.pillText}`}
                          >
                            +{dept.newCount} new
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
