// import React, { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { FaEye } from "react-icons/fa";
// import { motion } from "framer-motion";

// // Service functions
// import {
//   fetchOperationsTable,
//   fetchBusinessTable,
// } from "../../service/reciService";

// // Modals
// import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
// import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

// export default function RaciDashboard() {
//   const [operationsTable, setOperationsTable] = useState([]);
//   const [businessTable, setBusinessTable] = useState([]);

//   const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
//   const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

//   useEffect(() => {
//     loadTables();
//   }, []);

//   const loadTables = async () => {
//     // Fetch operations
//     try {
//       const opTableData = await fetchOperationsTable();
//       setOperationsTable(opTableData);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch operations table");
//     }
//     // Fetch business
//     try {
//       const busTableData = await fetchBusinessTable();
//       setBusinessTable(busTableData);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch business table");
//     }
//   };

//   // Color-code the score text based on value (optional)
//   const scoreColor = (score) => {
//     if (score < 30) return "text-red-500 dark:text-red-400";
//     if (score < 70) return "text-yellow-500 dark:text-yellow-400";
//     return "text-green-600 dark:text-green-400";
//   };

//   return (
//     <>
//       {/**
//        * 1) Main Container:
//        *    Light mode => white background, gray text
//        *    Dark mode  => gradient background, light text
//        */}
//       <div
//         className="
//           min-h-screen
//           bg-white text-gray-800
//           dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
//           dark:text-gray-200
//           p-6 md:p-10
//         "
//       >
//         {/* Outer container to limit width and center content */}
//         <div className="max-w-7xl mx-auto">
//           {/**
//            * 2) Heading:
//            *    Light mode => gradient text from blue to purple
//            *    Dark mode  => gradient text from cyan to fuchsia
//            */}
//           <motion.h1
//             className="
//               text-center text-3xl sm:text-4xl font-extrabold mb-8
//               bg-clip-text text-transparent
//               bg-gradient-to-r from-blue-500 to-purple-500
//               dark:from-cyan-400 dark:to-fuchsia-400
//             "
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             RACI Dashboard
//           </motion.h1>

//           {/* 3) Two Columns for Operations & Business (stack on small screens) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/**
//              * === RACI OPERATIONS CARD ===
//              * Light: white card, gray text, subtle border
//              * Dark: nearly black card, white text, darker border
//              */}
//             <motion.div
//               className="
//                 rounded-xl
//                 bg-gray-100 text-gray-900 border border-gray-200
//                 shadow-xl p-5
//                 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
//               "
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
//                 <span className="text-cyan-600 dark:text-cyan-400">
//                   RACI Operations
//                 </span>
//               </h2>

//               {/* Table for Operations */}
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto text-sm">
//                   {/* Table Head */}
//                   <thead>
//                     <tr
//                       className="
//                         uppercase tracking-wider
//                         bg-gray-200 text-gray-700
//                         dark:bg-gray-700/50 dark:text-gray-300
//                       "
//                     >
//                       <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
//                       <th className="px-4 py-3 text-left">Date</th>
//                       <th className="px-4 py-3 text-left">Overall Score</th>
//                       <th className="px-4 py-3 text-left rounded-r-lg">
//                         Details
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {operationsTable.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan={4}
//                           className="
//                             text-center p-4
//                             text-gray-500 italic
//                             dark:text-gray-400
//                           "
//                         >
//                           No operations data found.
//                         </td>
//                       </tr>
//                     )}
//                     {operationsTable.map((item, idx) => {
//                       // If storing ops score as 0–1, multiply by 10:
//                       const numericScore = (item.overallScore * 10).toFixed(2);
//                       return (
//                         <tr
//                           key={item._id || idx}
//                           className="
//                             border-b border-gray-200
//                             hover:bg-gray-100 dark:hover:bg-gray-700/40
//                             dark:border-gray-700
//                             transition-colors
//                           "
//                         >
//                           <td className="px-4 py-3 font-medium">{idx + 1}</td>
//                           <td className="px-4 py-3">
//                             {new Date(item.date).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "2-digit",
//                               year: "numeric",
//                             })}
//                           </td>
//                           <td
//                             className={`px-4 py-3 font-semibold ${scoreColor(
//                               numericScore
//                             )}`}
//                           >
//                             {numericScore}%
//                           </td>
//                           <td className="px-4 py-3">
//                             <button
//                               className="
//                                 flex items-center gap-1
//                                 text-blue-600 hover:underline
//                                 dark:text-blue-400
//                               "
//                               onClick={() => setSelectedOperationsScore(item)}
//                             >
//                               <FaEye />
//                               View
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </motion.div>

//             {/**
//              * === RACI BUSINESS CARD ===
//              * Light: white card, gray text, subtle border
//              * Dark: nearly black card, white text, darker border
//              */}
//             <motion.div
//               className="
//                 rounded-xl
//                 bg-gray-100 text-gray-900 border border-gray-200
//                 shadow-xl p-5
//                 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
//               "
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <span className="inline-block w-2 h-2 rounded-full bg-pink-400" />
//                 <span className="text-pink-600 dark:text-pink-400">
//                   RACI Business
//                 </span>
//               </h2>

//               {/* Table for Business */}
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto text-sm">
//                   <thead>
//                     <tr
//                       className="
//                         uppercase tracking-wider
//                         bg-gray-200 text-gray-700
//                         dark:bg-gray-700/50 dark:text-gray-300
//                       "
//                     >
//                       <th className="px-4 py-3 text-left rounded-l-lg">S.NO</th>
//                       <th className="px-4 py-3 text-left">Date</th>
//                       <th className="px-4 py-3 text-left">Overall Score</th>
//                       <th className="px-4 py-3 text-left rounded-r-lg">
//                         Details
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {businessTable.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan={4}
//                           className="
//                             text-center p-4
//                             text-gray-500 italic
//                             dark:text-gray-400
//                           "
//                         >
//                           No business data found.
//                         </td>
//                       </tr>
//                     )}
//                     {businessTable.map((item, idx) => {
//                       // If business uses 0–100 scale as is:
//                       const numericScore = item.overallScore.toFixed(2);
//                       return (
//                         <tr
//                           key={item._id || idx}
//                           className="
//                             border-b border-gray-200
//                             hover:bg-gray-100 dark:hover:bg-gray-700/40
//                             dark:border-gray-700
//                             transition-colors
//                           "
//                         >
//                           <td className="px-4 py-3 font-medium">{idx + 1}</td>
//                           <td className="px-4 py-3">
//                             {new Date(item.date).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "2-digit",
//                               year: "numeric",
//                             })}
//                           </td>
//                           <td
//                             className={`px-4 py-3 font-semibold ${scoreColor(
//                               numericScore
//                             )}`}
//                           >
//                             {numericScore}%
//                           </td>
//                           <td className="px-4 py-3">
//                             <button
//                               className="
//                                 flex items-center gap-1
//                                 text-blue-600 hover:underline
//                                 dark:text-blue-400
//                               "
//                               onClick={() => setSelectedBusinessScore(item)}
//                             >
//                               <FaEye />
//                               View
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </motion.div>
//           </div>

//           {/* Modals for detailed score view */}
//           {selectedOperationsScore && (
//             <RaciOperationsModal
//               selectedScore={selectedOperationsScore}
//               onClose={() => setSelectedOperationsScore(null)}
//             />
//           )}
//           {selectedBusinessScore && (
//             <RaciBusinessModal
//               selectedScore={selectedBusinessScore}
//               onClose={() => setSelectedBusinessScore(null)}
//             />
//           )}
//         </div>
//       </div>

//       <Toaster position="bottom-right" />
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { 
  FaEye, 
  FaChartLine, 
  FaBuilding, 
  FaCogs, 
  FaCalendarAlt,
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaSpinner
} from "react-icons/fa";

// Service functions
import {
  fetchOperationsTable,
  fetchBusinessTable,
} from "../../service/reciService";

// Modals
import RaciOperationsModal from "./Racioperations/OperationsScoreDetailsModal";
import RaciBusinessModal from "./RaciBusiness/ScoreDetailModal";

export default function RaciDashboard() {
  const [operationsTable, setOperationsTable] = useState([]);
  const [businessTable, setBusinessTable] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOperationsScore, setSelectedOperationsScore] = useState(null);
  const [selectedBusinessScore, setSelectedBusinessScore] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    setLoading(true);
    // Fetch operations
    try {
      const opTableData = await fetchOperationsTable();
      setOperationsTable(opTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch operations table");
    }
    // Fetch business
    try {
      const busTableData = await fetchBusinessTable();
      setBusinessTable(busTableData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch business table");
    }
    setLoading(false);
  };

  // Color-code the score text based on value
  const getScoreColor = (score) => {
    if (score < 30) return "text-red-500 dark:text-red-400";
    if (score < 70) return "text-yellow-500 dark:text-yellow-400";
    return "text-green-500 dark:text-green-400";
  };

  // Get score background color for cards
  const getScoreBg = (score) => {
    if (score < 30) return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    if (score < 70) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
  };

  // Get trend icon based on score
  const getTrendIcon = (score) => {
    if (score < 30) return <FaArrowDown className="text-red-500" />;
    if (score < 70) return <FaMinus className="text-yellow-500" />;
    return <FaArrowUp className="text-green-500" />;
  };

  // Desktop Table Component
  const DesktopTable = ({ data, type, onViewDetails }) => (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-l-lg">
              S.NO
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Score
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-r-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <FaChartLine className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No {type} data available
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Data will appear here once available
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const numericScore = type === 'operations' 
                ? (item.overallScore * 10).toFixed(2)
                : item.overallScore.toFixed(2);
              
              return (
                <tr
                  key={item._id || idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-semibold">
                        {idx + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(numericScore)}
                      <span className={`text-lg font-bold ${getScoreColor(numericScore)}`}>
                        {numericScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onViewDetails(item)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      <FaEye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  // Mobile/Tablet Card Component
  const ResponsiveCards = ({ data, type, onViewDetails, icon: Icon, color }) => (
    <div className="lg:hidden space-y-4">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className={`p-6 rounded-full bg-gray-100 dark:bg-gray-800`}>
            <Icon className={`w-12 h-12 ${color}`} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No {type} data available
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Data will appear here once available
            </p>
          </div>
        </div>
      ) : (
        data.map((item, idx) => {
          const numericScore = type === 'operations' 
            ? (item.overallScore * 10).toFixed(2)
            : item.overallScore.toFixed(2);
          
          return (
            <div
              key={item._id || idx}
              className={`
                relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 
                hover:shadow-xl hover:scale-[1.02] animate-fade-in
                bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700
                ${getScoreBg(numericScore)}
              `}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Entry #{idx + 1}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Score Badge */}
                <div className="flex items-center space-x-2">
                  {getTrendIcon(numericScore)}
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Score
                    </p>
                    <p className={`text-2xl font-bold ${getScoreColor(numericScore)}`}>
                      {numericScore}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Performance
                  </span>
                  <span className={`text-xs font-semibold ${getScoreColor(numericScore)}`}>
                    {numericScore < 30 ? 'Needs Improvement' : 
                     numericScore < 70 ? 'Fair' : 'Excellent'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      numericScore < 30 ? 'bg-red-500' :
                      numericScore < 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min(numericScore, 100)}%`,
                      animationDelay: `${idx * 200}ms`
                    }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onViewDetails(item)}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <FaEye className="w-4 h-4 mr-2" />
                View Detailed Analysis
              </button>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 text-gray-800 dark:text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl">
              <FaTrophy className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300">
                RACI Dashboard
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Monitor and analyze your operations and business performance metrics in real-time
            </p>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3">
                <FaSpinner className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  Loading dashboard data...
                </span>
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          {!loading && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
              {/* RACI Operations Section */}
              <div className="group">
                <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                        <FaCogs className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Operations
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Operational performance metrics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-full">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                        {operationsTable.length} Records
                      </span>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <DesktopTable 
                    data={operationsTable}
                    type="operations"
                    onViewDetails={setSelectedOperationsScore}
                  />

                  {/* Mobile/Tablet Cards */}
                  <ResponsiveCards 
                    data={operationsTable}
                    type="operations"
                    onViewDetails={setSelectedOperationsScore}
                    icon={FaCogs}
                    color="text-cyan-600 dark:text-cyan-400"
                  />
                </div>
              </div>

              {/* RACI Business Section */}
              <div className="group">
                <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl shadow-lg">
                        <FaBuilding className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Business
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Business performance analytics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-pink-50 dark:bg-pink-900/20 rounded-full">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                        {businessTable.length} Records
                      </span>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <DesktopTable 
                    data={businessTable}
                    type="business"
                    onViewDetails={setSelectedBusinessScore}
                  />

                  {/* Mobile/Tablet Cards */}
                  <ResponsiveCards 
                    data={businessTable}
                    type="business"
                    onViewDetails={setSelectedBusinessScore}
                    icon={FaBuilding}
                    color="text-pink-600 dark:text-pink-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modals */}
          {selectedOperationsScore && (
            <RaciOperationsModal
              selectedScore={selectedOperationsScore}
              onClose={() => setSelectedOperationsScore(null)}
            />
          )}
          {selectedBusinessScore && (
            <RaciBusinessModal
              selectedScore={selectedBusinessScore}
              onClose={() => setSelectedBusinessScore(null)}
            />
          )}
        </div>
      </div>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
        }}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
}