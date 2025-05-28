// import { useEffect } from "react";
// import { useDashboardStore } from "../../../store/useDashboardStore"; // adjust import path as needed

// function DemographicCard() {
//   const {
//     totalUsers,
//     maleCount,
//     femaleCount,
//     ageDistribution,
//     fetchDashboardStats,
//   } = useDashboardStore();

//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // Compute “other” for gender
//   const otherCount = totalUsers - maleCount - femaleCount;
//   const genderSegments = [
//     { label: "Male", count: maleCount },
//     { label: "Female", count: femaleCount },
//     // { label: 'Other', count: otherCount },
//   ];

//   // Convert genderSegments -> { label, count, percentage }
//   const genderData = genderSegments.map((seg) => {
//     const pct = totalUsers ? ((seg.count / totalUsers) * 100).toFixed(1) : 0;
//     return { ...seg, percentage: pct };
//   });

//   // Updated color map to match the new ranges from the API response
//   const colorMap = {
//     "Below 18 ": "red-500",
//     "18 - 30 ": "pink-500",
//     "31 - 40 ": "emerald-400",
//     "41 - 50 ": "sky-500",
//     "51 - 60 ": "violet-600",
//     "61 - 90 ": "gray-500",
//   };

//   // Convert each item in ageDistribution -> the format needed by the UI
//   // item => { range, count, percentage: "xx.x%" }
//   const ageData = (ageDistribution || []).map((item) => {
//     const color = colorMap[item.range] || "gray-400"; // fallback color
//     return {
//       label: item.range,
//       color,
//       count: `${item.count}`,
//       percentage: item.percentage,
//     };
//   });

//   return (
//     <div
//       className="
//         flex flex-col w-full max-w-sm
//         rounded-xl bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         {/* Left side: Icon + Title */}
//         <div className="flex items-center gap-2">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
//             alt="Demographic Icon"
//             className="h-8 w-8 object-contain"
//           />
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             Employee Demographic
//           </h2>
//         </div>
//         {/* Right side: View Report Button */}
//         {/* <button
//           className="
//             bg-blue-50 dark:bg-blue-900
//             text-blue-600 dark:text-blue-300
//             rounded-md
//             px-3 py-1.5
//             text-sm font-medium
//           "
//         >
//           View Report
//         </button> */}
//       </div>

//       {/* Donut Chart (placeholder image + center text) */}
//       <div className="flex flex-col items-center">
//         <div className="relative mb-4 h-36 w-36">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215"
//             alt="Demographic Pie Chart"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
//               {totalUsers}
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-300">
//               Employees
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Gender Distribution */}
//       <div className="mt-2 flex flex-wrap gap-2 justify-center">
//         {genderData.map((item, index) => {
//           const colorMapping = {
//             Male: "sky-500",
//             Female: "sky-400",
//             Other: "sky-200",
//           };
//           const colorClass = colorMapping[item.label] || "sky-200";
//           return (
//             <div
//               key={index}
//               className="
//                 flex items-center gap-2
//                 rounded-full px-2 py-1
//                 bg-gray-50 border border-gray-200
//                 dark:bg-gray-700 dark:border-gray-600
//                 text-sm
//               "
//             >
//               <span
//                 className={`w-3 h-3 inline-block rounded-full bg-${colorClass}`}
//               />
//               <span className="text-gray-700 dark:text-gray-200">
//                 {item.label} ({item.percentage}%)
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {/* Separator */}
//       <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

//       {/* Age Distribution */}
//       <div>
//         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//           Employee Age Distribution
//         </h3>

//         {/* Distribution Bar */}
//         <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
//           {ageData.map((item, index) => {
//             // parse the percentage string -> number
//             // e.g. "25.0%" -> 25.0
//             const numeric = parseFloat(item.percentage);
//             const barWidth = `${numeric}%`;
//             return (
//               <div
//                 key={index}
//                 className={`bg-${item.color}`}
//                 style={{ width: barWidth }}
//               />
//             );
//           })}
//         </div>

//         {/* Age Distribution Legend & Counts */}
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           {/* Legend */}
//           <div>
//             {ageData.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 mb-3 last:mb-0"
//               >
//                 <span className={`w-3 h-3 rounded-full bg-${item.color}`} />
//                 <span className="text-gray-700 dark:text-gray-200 text-sm">
//                   {item.label}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Counts & Percents */}
//           <div className="flex gap-6">
//             {/* Column of counts */}
//             <div className="flex flex-col gap-3">
//               {ageData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
//                 >
//                   {item.count}
//                 </div>
//               ))}
//             </div>
//             {/* Column of percentages */}
//             <div className="flex flex-col gap-3">
//               {ageData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="
//                     text-blue-600 dark:text-blue-300
//                     bg-blue-50 dark:bg-blue-800
//                     rounded-full w-10 flex items-center justify-center
//                     text-sm font-semibold
//                   "
//                 >
//                   {item.percentage}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DemographicCard;


import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiEye } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiMenLine, RiWomenLine } from "react-icons/ri";
import { useDashboardStore } from "../../../store/useDashboardStore";

function DemographicCard() {
  const {
    totalUsers,
    maleCount,
    femaleCount,
    ageDistribution,
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const otherCount = totalUsers - maleCount - femaleCount;
  const genderSegments = [
    { label: "Male", count: maleCount, icon: RiMenLine },
    { label: "Female", count: femaleCount, icon: RiWomenLine },
  ];

  const genderData = genderSegments.map((seg) => {
    const pct = totalUsers ? ((seg.count / totalUsers) * 100).toFixed(1) : 0;
    return { ...seg, percentage: pct };
  });

  const colorMap = {
    "Below 18 ": { 
      bg: "from-red-500 to-pink-500", 
      text: "text-red-400",
      glow: "shadow-red-500/20"
    },
    "18 - 30 ": { 
      bg: "from-purple-500 to-pink-500", 
      text: "text-purple-400",
      glow: "shadow-purple-500/20"
    },
    "31 - 40 ": { 
      bg: "from-emerald-500 to-teal-500", 
      text: "text-emerald-400",
      glow: "shadow-emerald-500/20"
    },
    "41 - 50 ": { 
      bg: "from-blue-500 to-cyan-500", 
      text: "text-blue-400",
      glow: "shadow-blue-500/20"
    },
    "51 - 60 ": { 
      bg: "from-violet-500 to-purple-500", 
      text: "text-violet-400",
      glow: "shadow-violet-500/20"
    },
    "61 - 90 ": { 
      bg: "from-gray-500 to-slate-500", 
      text: "text-gray-400",
      glow: "shadow-gray-500/20"
    },
  };

  const ageData = (ageDistribution || []).map((item) => {
    const colorConfig = colorMap[item.range] || { 
      bg: "from-gray-400 to-gray-500", 
      text: "text-gray-400",
      glow: "shadow-gray-500/20"
    };
    return {
      label: item.range,
      ...colorConfig,
      count: `${item.count}`,
      percentage: item.percentage,
    };
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative overflow-hidden
        w-full max-w-md
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        border border-white/20 dark:border-gray-700/50
        rounded-3xl
        shadow-2xl shadow-black/10 dark:shadow-black/40
        p-6
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-blue-500/5 before:to-purple-500/5
        before:rounded-3xl before:pointer-events-none
      "
    >
      {/* Animated Background Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="
              p-3 rounded-2xl
              bg-gradient-to-br from-blue-500 to-purple-600
              shadow-lg shadow-blue-500/25
            "
          >
            <HiOutlineUserGroup className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Employee Demographics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time insights</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            p-2 rounded-xl
            bg-gray-100/80 dark:bg-gray-800/80
            hover:bg-gray-200/80 dark:hover:bg-gray-700/80
            border border-gray-200/50 dark:border-gray-600/50
            transition-colors duration-200
          "
        >
          <FiEye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </motion.div>

      {/* Total Count Display */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center mb-8 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            relative p-8 rounded-3xl
            bg-gradient-to-br from-slate-50 to-slate-100
            dark:from-gray-800/50 dark:to-gray-900/50
            border border-slate-200/50 dark:border-gray-700/50
            shadow-xl shadow-slate-900/5 dark:shadow-black/20
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl" />
          <div className="relative flex flex-col items-center">
            <motion.span 
              className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {totalUsers}
            </motion.span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Employees
            </span>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Gender Distribution */}
      <motion.div variants={itemVariants} className="mb-8 relative z-10">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FiUsers className="h-5 w-5 text-blue-500" />
          Gender Distribution
        </h3>
        
        <div className="flex gap-3">
          {genderData.map((item, index) => {
            const Icon = item.icon;
            const gradients = {
              Male: "from-blue-500 to-cyan-500",
              Female: "from-pink-500 to-rose-500"
            };
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="
                  flex-1 p-4 rounded-2xl
                  bg-white/50 dark:bg-gray-800/50
                  border border-gray-200/50 dark:border-gray-700/50
                  backdrop-blur-sm
                  hover:shadow-lg transition-all duration-300
                "
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${gradients[item.label]} shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Age Distribution */}
      <motion.div variants={itemVariants} className="relative z-10">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FiTrendingUp className="h-5 w-5 text-emerald-500" />
          Age Distribution
        </h3>

        {/* Modern Progress Bar */}
        <div className="mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
          <div className="flex h-4 rounded-xl overflow-hidden">
            {ageData.map((item, index) => {
              const numeric = parseFloat(item.percentage);
              const barWidth = `${numeric}%`;
              return (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${item.bg} ${item.glow} shadow-lg`}
                  style={{ width: barWidth }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              );
            })}
          </div>
        </div>

        {/* Age Groups */}
        <div className="space-y-3">
          {ageData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="
                flex items-center justify-between
                p-3 rounded-xl
                bg-gray-50/80 dark:bg-gray-800/50
                border border-gray-200/50 dark:border-gray-700/30
                hover:bg-gray-100/80 dark:hover:bg-gray-700/50
                transition-all duration-200
              "
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.bg} ${item.glow} shadow-sm`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label.trim()}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {item.count}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    bg-gradient-to-r ${item.bg}
                    text-white shadow-sm
                  `}
                >
                  {item.percentage}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DemographicCard;