


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Add this import
// import { 
//   FaUsers, 
//   FaUserCheck, 
//   FaUserTimes,
//   FaEye,
//   FaChevronRight,
//   FaArrowUp,
//   FaArrowDown
// } from "react-icons/fa";
// import { 
//   HiOutlineSparkles, 
//   HiArrowTrendingUp, 
//   HiArrowTrendingDown 
// } from "react-icons/hi2";
// import { getDashboardStats } from "../../../service/dashboardService";

// function DashboardStatCards() {
//   // Add navigate hook
//   const navigate = useNavigate();
  
//   // Local state for the three stats
//   const [totalLoggedIn, setTotalLoggedIn] = useState(0);
//   const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
//   const [totalTaskPending, setTotalTaskPending] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   // Function to fetch stats from the service
//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await getDashboardStats(); 
      
//       if (res.success) {
//         const { totalLoggedIn, totalLeavesTaken, totalTaskPending } = res.data;
//         setTotalLoggedIn(totalLoggedIn || 0);
//         setTotalLeavesTaken(totalLeavesTaken || 0);
//         setTotalTaskPending(totalTaskPending || 0);
//       } else {
//         setError("Failed to fetch dashboard statistics");
//         console.error("Failed to fetch stats: success=false", res.message);
//       }
//     } catch (error) {
//       setError("Error loading dashboard data");
//       console.error("Error in fetchStats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate percentages and trends
//   const totalEmployees = totalLoggedIn + totalLeavesTaken + totalTaskPending;
//   const attendanceRate = totalEmployees > 0 ? ((totalLoggedIn / totalEmployees) * 100).toFixed(1) : 0;
//   const leaveRate = totalEmployees > 0 ? ((totalLeavesTaken / totalEmployees) * 100).toFixed(1) : 0;
//   const taskRate = totalEmployees > 0 ? ((totalTaskPending / totalEmployees) * 100).toFixed(1) : 0;

//   // Prepare stat card data
//   const statCardsData = [
//     {
//       id: 'logged-in',
//       icon: FaUsers,
//       count: totalLoggedIn,
//       label: "Total Logged In",
//       subLabel: `${attendanceRate}% of workforce present`,
//       gradient: "from-blue-500 via-blue-600 to-blue-700",
//       glowColor: "blue",
//       trend: { value: "+5.2%", isPositive: true },
//       percentage: `${attendanceRate}%`,
//       viewAllLink: "/dashboard/view-attendance",
//       interactive: true,
//     },
//     {
//       id: 'leaves-taken',
//       icon: FaUserCheck,
//       count: totalLeavesTaken,
//       label: "Total Leaves Taken",
//       subLabel: `${leaveRate}% on leave today`,
//       gradient: "from-green-500 via-green-600 to-green-700",
//       glowColor: "green",
//       trend: { value: "+2.8%", isPositive: true },
//       percentage: `${leaveRate}%`,
//       viewAllLink: "/dashboard/leave-history",
//       interactive: true,
//     },
//     {
//       id: 'task-pending',
//       icon: FaUserTimes,
//       count: totalTaskPending,
//       label: "Total Task Pending",
//       subLabel: `${taskRate}% pending completion`,
//       gradient: "from-red-500 via-red-600 to-red-700",
//       glowColor: "red",
//       trend: { value: "-1.2%", isPositive: false },
//       percentage: `${taskRate}%`,
//       viewAllLink: "/dashboard/assigned-task/employee",
//       interactive: true,
//     },
//   ];

//   // Fixed handleCardClick function
//   const handleCardClick = (link) => {
//     if (link) {
//       navigate(link); // Use React Router's navigate function
//     }
//   };

//   if (error) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6 ">
//         <div className="col-span-full flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
//           <div className="text-center">
//             <div className="text-red-500 mb-2">
//               <FaUserTimes size={48} />
//             </div>
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Error Loading Data
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
//             <button 
//               onClick={fetchStats}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
//       {statCardsData.map((item, index) => (
//         <StatCard 
//           key={item.id} 
//           {...item} 
//           index={index}
//           isHovered={hoveredCard === item.id}
//           onHover={() => setHoveredCard(item.id)}
//           onLeave={() => setHoveredCard(null)}
//           onCardClick={() => handleCardClick(item.viewAllLink)}
//           loading={loading}
//         />
//       ))}
//     </div>
//   );
// }

// // Rest of the StatCard component remains the same...
// function StatCard({ 
//   icon: Icon, 
//   count, 
//   label, 
//   subLabel,
//   gradient, 
//   glowColor,
//   trend,
//   percentage,
//   viewAllLink,
//   interactive,
//   index,
//   isHovered,
//   onHover,
//   onLeave,
//   onCardClick,
//   loading
// }) {
//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 50,
//       scale: 0.9
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         delay: index * 0.1,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     }
//   };

//   const glowVariants = {
//     initial: { opacity: 0 },
//     hover: { 
//       opacity: 1,
//       transition: { duration: 0.3 }
//     }
//   };

//   const countVariants = {
//     hidden: { opacity: 0, scale: 0.5 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: {
//         delay: index * 0.2 + 0.3,
//         duration: 0.5,
//         ease: "backOut"
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] ">
//         <div className="animate-pulse">
//           <div className="flex items-start justify-between mb-4">
//             <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
//             <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//           </div>
//           <div className="space-y-3">
//             <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
//             <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//             <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className={`relative group w-full ${interactive ? 'cursor-pointer' : 'cursor-default'} `}
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       onHoverStart={onHover}
//       onHoverEnd={onLeave}
//       onClick={interactive ? onCardClick : undefined}
//     >
//       {/* Glow Effect */}
//       <motion.div
//         className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
//         variants={glowVariants}
//         initial="initial"
//         animate={isHovered ? "hover" : "initial"}
//       />
      
//       {/* Main Card */}
//       <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden  min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between transition-all duration-300">
        
//         {/* Background Pattern */}
//         <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
//           <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8" />
//         </div>

//         {/* Animated Background Waves */}
//         <div className="absolute inset-0 opacity-10">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <motion.path
//               d="M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
//               fill="currentColor"
//               animate={{
//                 d: [
//                   "M0 20 Q25 10 50 20 T100 20 V100 H0 Z",
//                   "M0 30 Q25 20 50 30 T100 30 V100 H0 Z",
//                   "M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
//                 ]
//               }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </svg>
//         </div>

//         {/* Header Section */}
//         <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
//           <motion.div 
//             className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Icon className="text-lg sm:text-2xl text-white" />
            
//             {/* Icon Glow */}
//             <motion.div
//               className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-md opacity-0 group-hover:opacity-50`}
//               animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>

//           {/* Trend Indicator */}
//           <motion.div 
//             className="flex items-center gap-1"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 + 0.4 }}
//           >
//             {trend.isPositive ? (
//               <HiArrowTrendingUp className="text-green-500 text-xs sm:text-sm" />
//             ) : (
//               <HiArrowTrendingDown className="text-red-500 text-xs sm:text-sm" />
//             )}
//             <span className={`text-xs font-medium ${
//               trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
//             }`}>
//               {trend.value}
//             </span>
//           </motion.div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-2 sm:space-y-3 flex-grow relative z-10">
//           {/* Count Display */}
//           <div className="flex items-end gap-2">
//             <motion.h3 
//               className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white"
//               variants={countVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//             >
//               {count ?? 0}
//             </motion.h3>
//             <motion.div 
//               className="flex items-center gap-1 mb-1"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 + 0.6 }}
//             >
//               <HiOutlineSparkles className={`text-${glowColor}-500 text-xs sm:text-sm`} />
//               <span className={`text-xs sm:text-sm font-semibold text-${glowColor}-600 dark:text-${glowColor}-400`}>
//                 {percentage}
//               </span>
//             </motion.div>
//           </div>

//           {/* Labels */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 + 0.5 }}
//           >
//             <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
//               {label}
//             </h4>
//             <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
//               {subLabel}
//             </p>
//           </motion.div>
//         </div>



//         {/* Click Indicator for Interactive Cards */}
//         {interactive && (
//           <motion.div 
//             className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//             animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
//             transition={{ duration: 1, repeat: Infinity }}
//           >
//             <div className={`w-2 h-2 bg-${glowColor}-500 rounded-full`}></div>
//           </motion.div>
//         )}

//         {/* Floating Particles Effect */}
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div className="absolute inset-0 pointer-events-none">
//               {[...Array(6)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full`}
//                   initial={{ 
//                     opacity: 0, 
//                     scale: 0,
//                     x: Math.random() * 100 + "%",
//                     y: "100%"
//                   }}
//                   animate={{ 
//                     opacity: [0, 1, 0], 
//                     scale: [0, 1, 0],
//                     y: "-20%",
//                     x: [
//                       Math.random() * 100 + "%",
//                       Math.random() * 100 + "%"
//                     ]
//                   }}
//                   transition={{ 
//                     duration: 3,
//                     delay: i * 0.2,
//                     ease: "easeOut"
//                   }}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Ripple Effect on Click */}
//         <motion.div
//           className="absolute inset-0 rounded-2xl pointer-events-none"
//           whileTap={{
//             background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
//           }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// export default DashboardStatCards;


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Add this import
// import { 
//   FaUsers, 
//   FaUserCheck, 
//   FaUserTimes,
//   FaEye,
//   FaChevronRight,
//   FaArrowUp,
//   FaArrowDown
// } from "react-icons/fa";
// import { 
//   HiOutlineSparkles, 
//   HiArrowTrendingUp, 
//   HiArrowTrendingDown 
// } from "react-icons/hi2";
// import { getDashboardStats } from "../../../service/dashboardService";

// function DashboardStatCards() {
//   // Add navigate hook
//   const navigate = useNavigate();
  
//   // Local state for the three stats
//   const [totalLoggedIn, setTotalLoggedIn] = useState(0);
//   const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
//   const [totalTaskPending, setTotalTaskPending] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   // Function to fetch stats from the service
//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await getDashboardStats(); 
      
//       if (res.success) {
//         const { totalLoggedIn, totalLeavesTaken, totalTaskPending } = res.data;
//         setTotalLoggedIn(totalLoggedIn || 0);
//         setTotalLeavesTaken(totalLeavesTaken || 0);
//         setTotalTaskPending(totalTaskPending || 0);
//       } else {
//         setError("Failed to fetch dashboard statistics");
//         console.error("Failed to fetch stats: success=false", res.message);
//       }
//     } catch (error) {
//       setError("Error loading dashboard data");
//       console.error("Error in fetchStats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate percentages and trends
//   const totalEmployees = totalLoggedIn + totalLeavesTaken + totalTaskPending;
//   const attendanceRate = totalEmployees > 0 ? ((totalLoggedIn / totalEmployees) * 100).toFixed(1) : 0;
//   const leaveRate = totalEmployees > 0 ? ((totalLeavesTaken / totalEmployees) * 100).toFixed(1) : 0;
//   const taskRate = totalEmployees > 0 ? ((totalTaskPending / totalEmployees) * 100).toFixed(1) : 0;

//   // Prepare stat card data
//   const statCardsData = [
//     {
//       id: 'logged-in',
//       icon: FaUsers,
//       count: totalLoggedIn,
//       label: "Total Logged In",
//       subLabel: `${attendanceRate}% of workforce present`,
//       gradient: "from-blue-500 via-blue-600 to-blue-700",
//       glowColor: "blue",
//       trend: { value: "+5.2%", isPositive: true },
//       percentage: `${attendanceRate}%`,
//       viewAllLink: "/dashboard/view-attendance",
//       interactive: true,
//     },
//     {
//       id: 'leaves-taken',
//       icon: FaUserCheck,
//       count: totalLeavesTaken,
//       label: "Total Leaves Taken",
//       subLabel: `${leaveRate}% on leave today`,
//       gradient: "from-green-500 via-green-600 to-green-700",
//       glowColor: "green",
//       trend: { value: "+2.8%", isPositive: true },
//       percentage: `${leaveRate}%`,
//       viewAllLink: "/dashboard/leave-history",
//       interactive: true,
//     },
//     {
//       id: 'task-pending',
//       icon: FaUserTimes,
//       count: totalTaskPending,
//       label: "Total Task Pending",
//       subLabel: `${taskRate}% pending completion`,
//       gradient: "from-red-500 via-red-600 to-red-700",
//       glowColor: "red",
//       trend: { value: "-1.2%", isPositive: false },
//       percentage: `${taskRate}%`,
//       viewAllLink: "/dashboard/assigned-task/employee",
//       interactive: true,
//     },
//   ];

//   // Fixed handleCardClick function
//   const handleCardClick = (link) => {
//     if (link) {
//       navigate(link); // Use React Router's navigate function
//     }
//   };

//   if (error) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6 ">
//         <div className="col-span-full flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
//           <div className="text-center">
//             <div className="text-red-500 mb-2">
//               <FaUserTimes size={48} />
//             </div>
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Error Loading Data
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
//             <button 
//               onClick={fetchStats}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
//       {statCardsData.map((item, index) => (
//         <StatCard 
//           key={item.id} 
//           {...item} 
//           index={index}
//           isHovered={hoveredCard === item.id}
//           onHover={() => setHoveredCard(item.id)}
//           onLeave={() => setHoveredCard(null)}
//           onCardClick={() => handleCardClick(item.viewAllLink)}
//           loading={loading}
//         />
//       ))}
//     </div>
//   );
// }

// // Rest of the StatCard component remains the same...
// function StatCard({ 
//   icon: Icon, 
//   count, 
//   label, 
//   subLabel,
//   gradient, 
//   glowColor,
//   trend,
//   percentage,
//   viewAllLink,
//   interactive,
//   index,
//   isHovered,
//   onHover,
//   onLeave,
//   onCardClick,
//   loading
// }) {
//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 50,
//       scale: 0.9
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         delay: index * 0.1,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       y: -4, // Reduced from -8 to -4 for subtle lift
//       scale: 1.01, // Reduced from 1.02 to 1.01 for subtle scale
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     }
//   };

//   const glowVariants = {
//     initial: { opacity: 0 },
//     hover: { 
//       opacity: 1,
//       transition: { duration: 0.3 }
//     }
//   };

//   const countVariants = {
//     hidden: { opacity: 0, scale: 0.5 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: {
//         delay: index * 0.2 + 0.3,
//         duration: 0.5,
//         ease: "backOut"
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 h-[240px]">
//         <div className="animate-pulse h-full flex flex-col justify-between">
//           <div className="flex items-start justify-between mb-4">
//             <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
//             <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//           </div>
//           <div className="space-y-3 flex-grow">
//             <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
//             <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//             <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className={`relative group w-full ${interactive ? 'cursor-pointer' : 'cursor-default'} `}
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       onHoverStart={onHover}
//       onHoverEnd={onLeave}
//       onClick={interactive ? onCardClick : undefined}
//     >
//       {/* Reduced Glow Effect */}
//       <motion.div
//         className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
//         variants={glowVariants}
//         initial="initial"
//         animate={isHovered ? "hover" : "initial"}
//       />
      
//       {/* Main Card */}
//       <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden h-[240px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
        
//         {/* Background Pattern */}
//         <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
//           <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8" />
//         </div>

//         {/* Animated Background Waves */}
//         <div className="absolute inset-0 opacity-10">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <motion.path
//               d="M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
//               fill="currentColor"
//               animate={{
//                 d: [
//                   "M0 20 Q25 10 50 20 T100 20 V100 H0 Z",
//                   "M0 30 Q25 20 50 30 T100 30 V100 H0 Z",
//                   "M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
//                 ]
//               }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </svg>
//         </div>

//         {/* Header Section */}
//         <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
//           <motion.div 
//             className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-md`}
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Icon className="text-lg sm:text-2xl text-white" />
            
//             {/* Reduced Icon Glow */}
//             <motion.div
//               className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-0 group-hover:opacity-30`}
//               animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>

//           {/* Trend Indicator */}
//           <motion.div 
//             className="flex items-center gap-1"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 + 0.4 }}
//           >
//             {trend.isPositive ? (
//               <HiArrowTrendingUp className="text-green-500 text-xs sm:text-sm" />
//             ) : (
//               <HiArrowTrendingDown className="text-red-500 text-xs sm:text-sm" />
//             )}
//             <span className={`text-xs font-medium ${
//               trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
//             }`}>
//               {trend.value}
//             </span>
//           </motion.div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-2 sm:space-y-3 flex-grow relative z-10">
//           {/* Count Display */}
//           <div className="flex items-end gap-2">
//             <motion.h3 
//               className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white"
//               variants={countVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//             >
//               {count ?? 0}
//             </motion.h3>
//             <motion.div 
//               className="flex items-center gap-1 mb-1"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 + 0.6 }}
//             >
//               <HiOutlineSparkles className={`text-${glowColor}-500 text-xs sm:text-sm`} />
//               <span className={`text-xs sm:text-sm font-semibold text-${glowColor}-600 dark:text-${glowColor}-400`}>
//                 {percentage}
//               </span>
//             </motion.div>
//           </div>

//           {/* Labels */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 + 0.5 }}
//           >
//             <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
//               {label}
//             </h4>
//             <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
//               {subLabel}
//             </p>
//           </motion.div>
//         </div>



//         {/* Click Indicator for Interactive Cards */}
//         {interactive && (
//           <motion.div 
//             className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//             animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
//             transition={{ duration: 1, repeat: Infinity }}
//           >
//             <div className={`w-2 h-2 bg-${glowColor}-500 rounded-full`}></div>
//           </motion.div>
//         )}

//         {/* Floating Particles Effect */}
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div className="absolute inset-0 pointer-events-none">
//               {[...Array(6)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full`}
//                   initial={{ 
//                     opacity: 0, 
//                     scale: 0,
//                     x: Math.random() * 100 + "%",
//                     y: "100%"
//                   }}
//                   animate={{ 
//                     opacity: [0, 1, 0], 
//                     scale: [0, 1, 0],
//                     y: "-20%",
//                     x: [
//                       Math.random() * 100 + "%",
//                       Math.random() * 100 + "%"
//                     ]
//                   }}
//                   transition={{ 
//                     duration: 3,
//                     delay: i * 0.2,
//                     ease: "easeOut"
//                   }}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Ripple Effect on Click */}
//         <motion.div
//           className="absolute inset-0 rounded-2xl pointer-events-none"
//           whileTap={{
//             background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
//           }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// export default DashboardStatCards;


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this import
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserTimes,
  FaEye,
  FaChevronRight,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { 
  HiOutlineSparkles, 
  HiArrowTrendingUp, 
  HiArrowTrendingDown 
} from "react-icons/hi2";
import { getDashboardStats } from "../../../service/dashboardService";

function DashboardStatCards() {
  // Add navigate hook
  const navigate = useNavigate();
  
  // Local state for the three stats
  const [totalLoggedIn, setTotalLoggedIn] = useState(0);
  const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
  const [totalTaskPending, setTotalTaskPending] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  // Function to fetch stats from the service
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getDashboardStats(); 
      
      if (res.success) {
        const { totalLoggedIn, totalLeavesTaken, totalTaskPending } = res.data;
        setTotalLoggedIn(totalLoggedIn || 0);
        setTotalLeavesTaken(totalLeavesTaken || 0);
        setTotalTaskPending(totalTaskPending || 0);
      } else {
        setError("Failed to fetch dashboard statistics");
        console.error("Failed to fetch stats: success=false", res.message);
      }
    } catch (error) {
      setError("Error loading dashboard data");
      console.error("Error in fetchStats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate percentages and trends
  const totalEmployees = totalLoggedIn + totalLeavesTaken + totalTaskPending;
  const attendanceRate = totalEmployees > 0 ? ((totalLoggedIn / totalEmployees) * 100).toFixed(1) : 0;
  const leaveRate = totalEmployees > 0 ? ((totalLeavesTaken / totalEmployees) * 100).toFixed(1) : 0;
  const taskRate = totalEmployees > 0 ? ((totalTaskPending / totalEmployees) * 100).toFixed(1) : 0;

  // Prepare stat card data
  const statCardsData = [
    {
      id: 'logged-in',
      icon: FaUsers,
      count: totalLoggedIn,
      label: "Total Logged In",
      subLabel: `${attendanceRate}% of workforce present`,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      glowColor: "blue",
      trend: { value: "+5.2%", isPositive: true },
      percentage: `${attendanceRate}%`,
      viewAllLink: "/dashboard/view-attendance",
      interactive: true,
    },
    {
      id: 'leaves-taken',
      icon: FaUserCheck,
      count: totalLeavesTaken,
      label: "Total Leaves Taken",
      subLabel: `${leaveRate}% on leave today`,
      gradient: "from-green-500 via-green-600 to-green-700",
      glowColor: "green",
      trend: { value: "+2.8%", isPositive: true },
      percentage: `${leaveRate}%`,
      viewAllLink: "/dashboard/leave-history",
      interactive: true,
    },
    {
      id: 'task-pending',
      icon: FaUserTimes,
      count: totalTaskPending,
      label: "Total Task Pending",
      subLabel: `${taskRate}% pending completion`,
      gradient: "from-red-500 via-red-600 to-red-700",
      glowColor: "red",
      trend: { value: "-1.2%", isPositive: false },
      percentage: `${taskRate}%`,
      viewAllLink: "/dashboard/assigned-task/employee",
      interactive: true,
    },
  ];

  // Fixed handleCardClick function
  const handleCardClick = (link) => {
    if (link) {
      navigate(link); // Use React Router's navigate function
    }
  };

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6 ">
        <div className="col-span-full flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
          <div className="text-center">
            <div className="text-red-500 mb-2">
              <FaUserTimes size={48} />
            </div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button 
              onClick={fetchStats}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
      {statCardsData.map((item, index) => (
        <StatCard 
          key={item.id} 
          {...item} 
          index={index}
          isHovered={hoveredCard === item.id}
          onHover={() => setHoveredCard(item.id)}
          onLeave={() => setHoveredCard(null)}
          onCardClick={() => handleCardClick(item.viewAllLink)}
          loading={loading}
        />
      ))}
    </div>
  );
}

// Rest of the StatCard component remains the same...
function StatCard({ 
  icon: Icon, 
  count, 
  label, 
  subLabel,
  gradient, 
  glowColor,
  trend,
  percentage,
  viewAllLink,
  interactive,
  index,
  isHovered,
  onHover,
  onLeave,
  onCardClick,
  loading
}) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -4, // Reduced from -8 to -4 for subtle lift
      scale: 1.01, // Reduced from 1.02 to 1.01 for subtle scale
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const countVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: index * 0.2 + 0.3,
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 h-[240px]">
        <div className="animate-pulse h-full flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="space-y-3 flex-grow">
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative group w-full ${interactive ? 'cursor-pointer' : 'cursor-default'} `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={interactive ? onCardClick : undefined}
    >
      {/* Reduced Glow Effect */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl  opacity-0 group-hover:opacity-8 transition-opacity duration-300`}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden h-[240px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8" />
        </div>

        {/* Animated Background Waves */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
              fill="currentColor"
              animate={{
                d: [
                  "M0 20 Q25 10 50 20 T100 20 V100 H0 Z",
                  "M0 30 Q25 20 50 30 T100 30 V100 H0 Z",
                  "M0 20 Q25 10 50 20 T100 20 V100 H0 Z"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
          <motion.div 
            className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-md`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="text-lg sm:text-2xl text-white" />
            
            {/* Reduced Icon Glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-0 group-hover:opacity-20`}
              animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Trend Indicator */}
          <motion.div 
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {trend.isPositive ? (
              <HiArrowTrendingUp className="text-green-500 text-xs sm:text-sm" />
            ) : (
              <HiArrowTrendingDown className="text-red-500 text-xs sm:text-sm" />
            )}
            <span className={`text-xs font-medium ${
              trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.value}
            </span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-2 sm:space-y-3 flex-grow relative z-10">
          {/* Count Display */}
          <div className="flex items-end gap-2">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white"
              variants={countVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {count ?? 0}
            </motion.h3>
            <motion.div 
              className="flex items-center gap-1 mb-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <HiOutlineSparkles className={`text-${glowColor}-500 text-xs sm:text-sm`} />
              <span className={`text-xs sm:text-sm font-semibold text-${glowColor}-600 dark:text-${glowColor}-400`}>
                {percentage}
              </span>
            </motion.div>
          </div>

          {/* Labels */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {label}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {subLabel}
            </p>
          </motion.div>
        </div>



        {/* Click Indicator for Interactive Cards */}
        {interactive && (
          <motion.div 
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className={`w-2 h-2 bg-${glowColor}-500 rounded-full`}></div>
          </motion.div>
        )}

        {/* Floating Particles Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full`}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 100 + "%",
                    y: "100%"
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: "-20%",
                    x: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple Effect on Click */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          whileTap={{
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default DashboardStatCards;