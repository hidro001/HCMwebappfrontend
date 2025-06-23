// import React, { useState, useEffect } from "react";
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

// // Import service functions
// import {
//   fetchOverview,
//   fetchHiringSources,
//   fetchVacancies,
//   fetchDepartments,
// } from "../../service/recruitService";

// // Register ChartJS modules
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

// /* ---------------- STYLES FOR DEPARTMENTS ---------------- */
// const departmentStyles = {
//   IT: {
//     bg: "bg-indigo-50 dark:bg-indigo-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-indigo-500 dark:bg-indigo-500",
//     pillText: "text-white",
//   },
//   Sales: {
//     bg: "bg-orange-50 dark:bg-orange-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-green-500 dark:bg-green-500",
//     pillText: "text-white",
//   },
//   Hr: {
//     bg: "bg-cyan-50 dark:bg-cyan-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-cyan-500 dark:bg-cyan-500",
//     pillText: "text-white",
//   },
//   // Optional: retain the other mappings if needed
//   Development: {
//     bg: "bg-purple-50 dark:bg-purple-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-purple-500 dark:bg-purple-500",
//     pillText: "text-white",
//   },
//   "Sales & Marketing": {
//     bg: "bg-orange-50 dark:bg-orange-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-green-500 dark:bg-green-500",
//     pillText: "text-white",
//   },
//   "Project Management": {
//     bg: "bg-green-50 dark:bg-green-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-blue-500 dark:bg-blue-500",
//     pillText: "text-white",
//   },
//   "Analytics & Data": {
//     bg: "bg-blue-50 dark:bg-blue-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-gray-400 dark:bg-gray-400",
//     pillText: "text-white",
//   },
//   Finance: {
//     bg: "bg-pink-50 dark:bg-pink-900",
//     text: "text-gray-800 dark:text-gray-100",
//     circle: "bg-gray-200 dark:bg-gray-700",
//     pillBg: "bg-pink-500 dark:bg-pink-500",
//     pillText: "text-white",
//   },
// };

// /* ---------------- MINISPARKLINE COMPONENT ---------------- */
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
//     scales: {
//       x: { display: false },
//       y: { display: false },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//   };

//   return (
//     <div className="w-20 h-8">
//       <Line data={sparkData} options={sparkOptions} />
//     </div>
//   );
// }

// /* ---------------- MAIN COMPONENT ---------------- */
// export default function RecruitDashboard() {
//   const [openPositions, setOpenPositions] = useState(0);
//   const [applicants, setApplicants] = useState(0);
//   const [outstandingOffers, setOutstandingOffers] = useState(0);
//   const [onboarding, setOnboarding] = useState(0);

//   const [topHiringData, setTopHiringData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   const [vacancies, setVacancies] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   async function loadAllData() {
//     setLoading(true);
//     setError("");

//     try {
//       // 1) Overview
//       const overviewRes = await fetchOverview();
//       if (overviewRes?.data) {
//         const { openPositions, applicants, pendingPositions, onboarding } =
//           overviewRes.data;
//         setOpenPositions(openPositions || 0);
//         setApplicants(applicants || 0);
//         setOutstandingOffers(pendingPositions || 0);
//         setOnboarding(onboarding || 0);
//       }

//       // 2) Hiring Sources
//       const hiringRes = await fetchHiringSources();
//       if (hiringRes?.data) {
//         setTopHiringData(hiringRes.data);
//       }

//       // 3) Vacancies
//       const vacRes = await fetchVacancies();
//       if (vacRes?.data) {
//         setVacancies(vacRes.data);
//       }

//       // 4) Departments
//       const deptRes = await fetchDepartments();
//       if (deptRes?.data) {
//         setDepartments(deptRes.data);
//       }
//     } catch (err) {
//       console.error("Error loading Recruit Dashboard data:", err);
//       setError(err.response?.data?.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // // For the "Top Hiring Sources" bar chart
//   // const topHiringOptions = {
//   //   responsive: true,
//   //   maintainAspectRatio: false,
//   //   scales: {
//   //     x: { grid: { display: false } },
//   //     y: { beginAtZero: true, max: 100 },
//   //   },
//   //   plugins: { legend: { position: "bottom" } },
//   // };

//   // ---------------
//   // NO DATA CHECKS
//   // ---------------
//   const hasOverviewData =
//     openPositions || applicants || outstandingOffers || onboarding;
//   const hasHiringData = topHiringData.labels && topHiringData.labels.length > 0;
//   const hasVacanciesData = vacancies.length > 0;
//   const hasDepartmentsData = departments.length > 0;

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6 transition-colors">
//       <div className="max-w-screen-2xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
//         </div>

//         {loading && <p className="text-blue-500">Loading...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}

//         {/* ------------- TOP ROW: 4 big squares + Bar Chart ------------- */}
//         <div className="  mb-6 ">
//           {/* Left: 4 squares */}
//           {!hasOverviewData && !loading && !error ? (
//             <p className="col-span-2 text-gray-500">
//               No overview data available.
//             </p>
//           ) : (
//             <div className="grid grid-cols-2 grid-rows-2 gap-6 ">
//               {/* 1) Open Positions */}
//               <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900 shadow flex flex-col justify-center">
//                 <div className="text-3xl font-bold mb-1">{openPositions}</div>
//                 <div className="text-gray-600 dark:text-gray-300">
//                   Open Positions
//                 </div>
//               </div>

//               {/* 2) Applicants */}
//               <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900 shadow flex flex-col justify-center">
//                 <div className="text-3xl font-bold mb-1">{applicants}</div>
//                 <div className="text-gray-600 dark:text-gray-300">
//                   Applicants
//                 </div>
//               </div>

//               {/* 3) Outstanding Offers */}
//               <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900 shadow flex flex-col justify-center">
//                 <div className="text-3xl font-bold mb-1">
//                   {outstandingOffers}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-300">
//                   Pending Position
//                 </div>
//               </div>

//               {/* 4) Onboarding */}
//               <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900 shadow flex flex-col justify-center">
//                 <div className="text-3xl font-bold mb-1">{onboarding}</div>
//                 <div className="text-gray-600 dark:text-gray-300">
//                   Onboarding
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Right: Top Hiring Sources (Bar Chart) */}
//         </div>

//         {/* ------------- BOTTOM ROW: Vacancies Table + Departments ------------- */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Recent Vacancies Table */}
//           <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                 Recent Vacancies
//               </h2>
//               {/* <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
//                 All Vacancies
//               </button> */}
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-gray-700 dark:text-gray-200">
//                 <thead>
//                   <tr className="text-left border-b border-gray-200 dark:border-gray-700">
//                     <th className="py-2 font-semibold">Job Title</th>
//                     <th className="py-2 font-semibold">Location</th>
//                     <th className="py-2 font-semibold">Applicants</th>
//                     <th className="py-2 font-semibold">Trend</th>
//                     <th className="py-2 w-10" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {hasVacanciesData ? (
//                     vacancies.map((vac, idx) => (
//                       <tr
//                         key={idx}
//                         className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
//                       >
//                         <td className="py-3 font-medium">{vac.title}</td>
//                         <td className="py-3">{vac.location}</td>
//                         <td className="py-3">
//                           <span className="font-medium">{vac.applicants}</span>
//                           {vac.newApplicants > 0 && (
//                             <span className="ml-1 text-xs text-green-500 dark:text-green-300">
//                               ({vac.newApplicants} new)
//                             </span>
//                           )}
//                         </td>
//                         <td className="py-3">
//                           <MiniSparkline data={vac.sparkData || []} />
//                         </td>
//                         <td className="py-3 text-right">
//                           {/* <button
//                             className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
//                             title="More actions"
//                           >
//                             <BsThreeDotsVertical />
//                           </button> */}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5} className="text-center py-3">
//                         No vacancies found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Departments List */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="font-semibold text-gray-800 dark:text-gray-100">
//                 Departments
//               </h2>
//               {/* <span className="text-sm text-gray-500 dark:text-gray-400">
//       Sep. 01 – 07
//     </span> */}
//             </div>
//             {hasDepartmentsData ? (
//               <div className="space-y-3">
//                 {departments.map((dept, i) => {
//                   const styles = departmentStyles[dept.department] || {
//                     bg: "bg-gray-100 dark:bg-gray-800",
//                     text: "text-gray-800 dark:text-gray-100",
//                     circle: "bg-gray-200 dark:bg-gray-600",
//                     pillBg: "bg-gray-300 dark:bg-gray-700",
//                     pillText: "text-gray-700 dark:text-gray-100",
//                   };
//                   return (
//                     <div
//                       key={i}
//                       className={`flex items-center justify-between p-4 rounded-xl ${styles.bg}`}
//                     >
//                       <span className={`font-medium ${styles.text}`}>
//                         {dept.department}
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         <div className="relative w-10 h-7">
//                           <div
//                             className={`absolute w-7 h-7 rounded-full top-0 left-0 ${styles.circle}`}
//                           />
//                           <div
//                             className={`absolute w-7 h-7 rounded-full top-0 left-3 ${styles.circle}`}
//                           />
//                         </div>
//                         {dept.count > 0 && (
//                           <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${styles.pillBg} ${styles.pillText}`}
//                           >
//                             +{dept.count} new
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-gray-500">No departments data found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaUserPlus,
  FaClipboardList,
  FaUserCheck,
  FaBuilding,
  FaMapMarkerAlt,
  
  
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaChartLine,
  FaBriefcase,
  FaUserTie,
  FaGraduationCap,
  FaCog
} from "react-icons/fa";
import { MdTrendingDown ,MdTrendingUp } from 'react-icons/md'; // ✅ Valid

import {
  HiUsers,
  HiUserAdd,
  HiClipboardList,
  
  HiOfficeBuilding,
  HiLocationMarker,
  HiTrendingUp,
  HiChartBar,
  HiEye
} from "react-icons/hi";
import { FiUserCheck } from 'react-icons/fi'; // ✅ Valid


// Import service functions
import {
  fetchOverview,
  fetchHiringSources,
  fetchVacancies,
  fetchDepartments,
} from "../../service/recruitService";

// Register ChartJS modules
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

/* ---------------- ENHANCED DEPARTMENT STYLES ---------------- */
const departmentStyles = {
  IT: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-500",
    avatarBg: "bg-blue-100 dark:bg-blue-800",
  },
  Sales: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-green-600 dark:text-green-400",
    badge: "bg-green-500",
    avatarBg: "bg-green-100 dark:bg-green-800",
  },
  Hr: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-500",
    avatarBg: "bg-purple-100 dark:bg-purple-800",
  },
  Development: {
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-500",
    avatarBg: "bg-indigo-100 dark:bg-indigo-800",
  },
  "Sales & Marketing": {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-500",
    avatarBg: "bg-orange-100 dark:bg-orange-800",
  },
  "Project Management": {
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-500",
    avatarBg: "bg-cyan-100 dark:bg-cyan-800",
  },
  "Analytics & Data": {
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-500",
    avatarBg: "bg-teal-100 dark:bg-teal-800",
  },
  Finance: {
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-800",
    text: "text-gray-800 dark:text-gray-100",
    icon: "text-pink-600 dark:text-pink-400",
    badge: "bg-pink-500",
    avatarBg: "bg-pink-100 dark:bg-pink-800",
  },
};

/* ---------------- ENHANCED MINI SPARKLINE COMPONENT ---------------- */
function MiniSparkline({ data, color = "#3B82F6" }) {
  const sparkData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        backgroundColor: `${color}20`,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const sparkOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      point: { radius: 0 },
    },
  };

  return (
    <div className="w-20 h-8">
      <Line data={sparkData} options={sparkOptions} />
    </div>
  );
}

/* ---------------- STAT CARD COMPONENT ---------------- */
function StatCard({ icon: Icon, title, value, change, color, delay = 0 }) {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/20`}>
            <Icon className={`text-2xl text-${color}-600 dark:text-${color}-400`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {value.toLocaleString()}
            </p>
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? <MdTrendingUp  /> : <MdTrendingDown />}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function RecruitDashboard() {
  const [openPositions, setOpenPositions] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [outstandingOffers, setOutstandingOffers] = useState(0);
  const [onboarding, setOnboarding] = useState(0);

  const [topHiringData, setTopHiringData] = useState({
    labels: [],
    datasets: [],
  });

  const [vacancies, setVacancies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    setError("");

    try {
      // 1) Overview
      const overviewRes = await fetchOverview();
      if (overviewRes?.data) {
        const { openPositions, applicants, pendingPositions, onboarding } =
          overviewRes.data;
        setOpenPositions(openPositions || 0);
        setApplicants(applicants || 0);
        setOutstandingOffers(pendingPositions || 0);
        setOnboarding(onboarding || 0);
      }

      // 2) Hiring Sources
      const hiringRes = await fetchHiringSources();
      if (hiringRes?.data) {
        setTopHiringData(hiringRes.data);
      }

      // 3) Vacancies
      const vacRes = await fetchVacancies();
      if (vacRes?.data) {
        setVacancies(vacRes.data);
      }

      // 4) Departments
      const deptRes = await fetchDepartments();
      if (deptRes?.data) {
        setDepartments(deptRes.data);
      }
    } catch (err) {
      console.error("Error loading Recruit Dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  // Data checks
  const hasOverviewData = openPositions || applicants || outstandingOffers || onboarding;
  const hasVacanciesData = vacancies.length > 0;
  const hasDepartmentsData = departments.length > 0;

  // Filter vacancies based on search
  const filteredVacancies = vacancies.filter(vac =>
    vac.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vac.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiUsers className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Recruitment Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Monitor your hiring pipeline and recruitment metrics
          </p>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Loading dashboard data...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
          </motion.div>
        )}

        {/* Stats Cards */}
        {!loading && hasOverviewData && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              icon={HiClipboardList}
              title="Open Positions"
              value={openPositions}
              change={5.2}
              color="green"
              delay={0}
            />
            <StatCard
              icon={HiUsers}
              title="Total Applicants"
              value={applicants}
              change={12.5}
              color="blue"
              delay={0.1}
            />
            <StatCard
              icon={HiUserAdd}
              title="Pending Positions"
              value={outstandingOffers}
              change={-2.1}
              color="orange"
              delay={0.2}
            />
            <StatCard
              icon={FiUserCheck}
              title="Onboarding"
              value={onboarding}
              change={8.3}
              color="purple"
              delay={0.3}
            />
          </motion.div>
        )}

        {!hasOverviewData && !loading && !error && (
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center"
          >
            <HiChartBar className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Overview Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Start by adding some recruitment data to see your dashboard metrics
            </p>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Vacancies Table */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <HiOfficeBuilding className="text-gray-600 dark:text-gray-400 text-xl" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Vacancies
                  </h2>
                </div>
                
                {/* Search */}
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search vacancies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {hasVacanciesData ? (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Applicants
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {filteredVacancies.map((vac, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {vac.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <HiLocationMarker className="text-gray-400 text-sm" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {vac.location}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {vac.applicants}
                              </span>
                              {vac.newApplicants > 0 && (
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  +{vac.newApplicants} new
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <MiniSparkline 
                              data={vac.sparkData || []} 
                              color="#3B82F6"
                            />
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <FaBriefcase className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Vacancies Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first job posting to get started"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Departments List */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <HiOfficeBuilding className="text-gray-600 dark:text-gray-400 text-xl" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Departments
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Active hiring by department
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {hasDepartmentsData ? (
                <div className="space-y-4">
                  <AnimatePresence>
                    {departments.map((dept, i) => {
                      const styles = departmentStyles[dept.department] || {
                        bg: "bg-gray-50 dark:bg-gray-700/50",
                        border: "border-gray-200 dark:border-gray-600",
                        text: "text-gray-800 dark:text-gray-100",
                        icon: "text-gray-600 dark:text-gray-400",
                        badge: "bg-gray-500",
                        avatarBg: "bg-gray-100 dark:bg-gray-700",
                      };
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center justify-between p-4 rounded-xl border ${styles.bg} ${styles.border} hover:shadow-md transition-all duration-200`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${styles.avatarBg}`}>
                              <HiOfficeBuilding className={`${styles.icon} text-lg`} />
                            </div>
                            <div>
                              <span className={`font-medium ${styles.text}`}>
                                {dept.department}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Active positions
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {/* Avatar Stack */}
                            <div className="flex -space-x-2">
                              <div className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 ${styles.avatarBg} flex items-center justify-center`}>
                                <FaUserTie className={`${styles.icon} text-xs`} />
                              </div>
                              <div className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 ${styles.avatarBg} flex items-center justify-center`}>
                                <FaGraduationCap className={`${styles.icon} text-xs`} />
                              </div>
                            </div>
                            
                            {/* Badge */}
                            {dept.count > 0 && (
                              <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${styles.badge}`}>
                                +{dept.count} new
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-8">
                  <HiOfficeBuilding className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Departments Data
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    Department information will appear here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}