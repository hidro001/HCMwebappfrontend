

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FaUsers, 
//   FaUserCheck, 
//   FaUserTimes, 
//   FaChevronRight,
//   FaEye,
//   FaArrowUp,
//   FaArrowDown 
// } from "react-icons/fa";
// import { 
//   HiOutlineSparkles, 
//   HiArrowTrendingUp, 
//   HiArrowTrendingDown 
// } from "react-icons/hi2";
// import { useDashboardStore } from "../../../store/useDashboardStore";
// import AttendanceModal from "./AttendanceModel";

// function DashboardStatCards() {
//   const {
//     totalUsers,
//     usersLoggedInToday,
//     employeesOnLeaveToday,
//     fetchDashboardStats,
//     fetchAttendanceDetails,
//     attendanceDetails = [],
//     attendanceDetailsLoading,
//     employeesOnLeaveList,
//     fetchLeaveDetails,
//   } = useDashboardStore();

//   const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   // Separate arrays for logged in / not logged in
//   const loggedInUsers = attendanceDetails.filter((user) => user.isPresent);
//   const notLoggedInUsers = attendanceDetails.filter((user) => !user.isPresent);

//   const handleAttendanceClick = async () => {
//     await fetchAttendanceDetails();
//     setIsAttendanceModalVisible(true);
//   };

//   const closeAttendanceModal = () => {
//     setIsAttendanceModalVisible(false);
//   };

//   const handleLeaveClick = async () => {
//     await fetchLeaveDetails();
//   };

//   // Calculate percentages and trends (mock data - replace with real calculations)
//   const attendanceRate = totalUsers > 0 ? ((usersLoggedInToday / totalUsers) * 100).toFixed(1) : 0;
//   const leaveRate = totalUsers > 0 ? ((employeesOnLeaveToday / totalUsers) * 100).toFixed(1) : 0;

//   const statCardsData = [
//     {
//       id: 'total',
//       icon: FaUsers,
//       count: totalUsers,
//       label: "Total Employees",
//       subLabel: "Active workforce",
//       gradient: "from-blue-500 via-blue-600 to-blue-700",
//       glowColor: "blue",
//       trend: { value: "+2.5%", isPositive: true },
//       percentage: "100%",
//       onClickDetail: null,
//       interactive: false,
//     },
//     {
//       id: 'present',
//       icon: FaUserCheck,
//       count: usersLoggedInToday,
//       label: "Present Today",
//       subLabel: `${attendanceRate}% attendance rate`,
//       gradient: "from-green-500 via-green-600 to-green-700",
//       glowColor: "green",
//       trend: { value: "+5.2%", isPositive: true },
//       percentage: `${attendanceRate}%`,
//       onClickDetail: handleAttendanceClick,
//       interactive: true,
//     },
//     {
//       id: 'leave',
//       icon: FaUserTimes,
//       count: employeesOnLeaveToday,
//       label: "On Leave Today",
//       subLabel: `${leaveRate}% leave rate`,
//       gradient: "from-red-500 via-red-600 to-red-700",
//       glowColor: "red",
//       trend: { value: "-1.2%", isPositive: false },
//       percentage: `${leaveRate}%`,
//       onClickDetail: handleLeaveClick,
//       interactive: true,
//     },
//   ];

//   return (
//     <>
//       {/* Responsive Grid Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
//         {statCardsData.map((item, index) => (
//           <StatCard 
//             key={item.id} 
//             {...item} 
//             index={index}
//             isHovered={hoveredCard === item.id}
//             onHover={() => setHoveredCard(item.id)}
//             onLeave={() => setHoveredCard(null)}
//           />
//         ))}
//       </div>

//       {/* Attendance Modal */}
//       <AttendanceModal
//         isOpen={isAttendanceModalVisible}
//         onRequestClose={closeAttendanceModal}
//         attendanceDetailsLoading={attendanceDetailsLoading}
//         loggedInUsers={loggedInUsers}
//         notLoggedInUsers={notLoggedInUsers}
//       />
//     </>
//   );
// }

// // ------------------------------------------------------------------------
// // Enhanced StatCard Component - Fully Responsive & Clickable
// // ------------------------------------------------------------------------
// function StatCard({ 
//   icon: Icon, 
//   count, 
//   label, 
//   subLabel,
//   gradient, 
//   glowColor,
//   trend,
//   percentage,
//   onClickDetail, 
//   interactive,
//   index,
//   isHovered,
//   onHover,
//   onLeave
// }) {
//   const handleCardClick = () => {
//     if (typeof onClickDetail === "function") {
//       onClickDetail();
//     }
//   };

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

//   return (
//     <motion.div
//       className={`relative group cursor-pointer w-full ${interactive ? 'hover:cursor-pointer' : 'cursor-default'}`}
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       onHoverStart={onHover}
//       onHoverEnd={onLeave}
//       onClick={handleCardClick}
//     >
//       {/* Glow Effect */}
//       <motion.div
//         className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
//         variants={glowVariants}
//         initial="initial"
//         animate={isHovered ? "hover" : "initial"}
//       />
      
//       {/* Main Card - Fixed Height for Uniformity */}
//       <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between">
        
//         {/* Background Pattern */}
//         <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
//           <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8" />
//         </div>

//         {/* Header Section */}
//         <div className="flex items-start justify-between mb-3 sm:mb-4">
//           <div className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
//             <Icon className="text-lg sm:text-2xl text-white" />
            
//             {/* Icon Glow */}
//             <motion.div
//               className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-md opacity-0 group-hover:opacity-50`}
//               animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//           </div>

//           {/* Trend Indicator */}
//           <div className="flex items-center gap-1">
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
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-2 sm:space-y-3 flex-grow">
//           {/* Count Display */}
//           <div className="flex items-end gap-2">
//             <motion.h3 
//               className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
//               animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
//               transition={{ duration: 0.2 }}
//             >
//               {count ?? 0}
//             </motion.h3>
//             <div className="flex items-center gap-1 mb-1">
//               <HiOutlineSparkles className={`text-${glowColor}-500 text-xs sm:text-sm`} />
//               <span className={`text-xs sm:text-sm font-semibold text-${glowColor}-600 dark:text-${glowColor}-400`}>
//                 {percentage}
//               </span>
//             </div>
//           </div>

//           {/* Labels */}
//           <div>
//             <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
//               {label}
//             </h4>
//             <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
//               {subLabel}
//             </p>
//           </div>
//         </div>

//         {/* View Details Button - Commented Out */}
//         {/*
//         <AnimatePresence>
//           {interactive && (
//             <motion.div 
//               className="mt-4 sm:mt-6"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//             >
//               <motion.button
//                 className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium shadow-lg group-hover:shadow-xl transition-all duration-300 text-sm sm:text-base`}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleCardClick}
//               >
//                 <div className="flex items-center gap-2">
//                   <FaEye className="text-xs sm:text-sm" />
//                   <span>View Details</span>
//                 </div>
//                 <motion.div
//                   animate={isHovered ? { x: 4 } : { x: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <FaChevronRight className="text-xs sm:text-sm" />
//                 </motion.div>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         */}

//         {/* Click Indicator for Interactive Cards */}
//         {interactive && (
//           <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className={`w-2 h-2 bg-${glowColor}-500 rounded-full animate-pulse`}></div>
//           </div>
//         )}

//         {/* Floating Particles Effect */}
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div className="absolute inset-0 pointer-events-none">
//               {[...Array(4)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full`}
//                   initial={{ 
//                     opacity: 0, 
//                     scale: 0,
//                     x: Math.random() * 100 + "%",
//                     y: Math.random() * 100 + "%"
//                   }}
//                   animate={{ 
//                     opacity: [0, 1, 0], 
//                     scale: [0, 1, 0],
//                     y: "-100%"
//                   }}
//                   transition={{ 
//                     duration: 2,
//                     delay: i * 0.3,
//                     ease: "easeOut"
//                   }}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }

// export default DashboardStatCards;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserTimes, 
  FaChevronRight,
  FaEye,
  FaArrowUp,
  FaArrowDown 
} from "react-icons/fa";
import { 
  HiOutlineSparkles, 
  HiArrowTrendingUp, 
  HiArrowTrendingDown 
} from "react-icons/hi2";
import { useDashboardStore } from "../../../store/useDashboardStore";
import AttendanceModal from "./AttendanceModel";

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    attendanceDetails = [],
    attendanceDetailsLoading,
    employeesOnLeaveList,
    fetchLeaveDetails,
  } = useDashboardStore();

  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Separate arrays for logged in / not logged in
  const loggedInUsers = attendanceDetails.filter((user) => user.isPresent);
  const notLoggedInUsers = attendanceDetails.filter((user) => !user.isPresent);

  const handleAttendanceClick = async () => {
    await fetchAttendanceDetails();
    setIsAttendanceModalVisible(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalVisible(false);
  };

  const handleLeaveClick = async () => {
    await fetchLeaveDetails();
  };

  // Calculate percentages and trends (mock data - replace with real calculations)
  const attendanceRate = totalUsers > 0 ? ((usersLoggedInToday / totalUsers) * 100).toFixed(1) : 0;
  const leaveRate = totalUsers > 0 ? ((employeesOnLeaveToday / totalUsers) * 100).toFixed(1) : 0;

  const statCardsData = [
    {
      id: 'total',
      icon: FaUsers,
      count: totalUsers,
      label: "Total Employees",
      subLabel: "Active workforce",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      glowColor: "blue",
      trend: { value: "+2.5%", isPositive: true },
      percentage: "100%",
      onClickDetail: null,
      interactive: false,
    },
    {
      id: 'present',
      icon: FaUserCheck,
      count: usersLoggedInToday,
      label: "Present Today",
      subLabel: `${attendanceRate}% attendance rate`,
      gradient: "from-green-500 via-green-600 to-green-700",
      glowColor: "green",
      trend: { value: "+5.2%", isPositive: true },
      percentage: `${attendanceRate}%`,
      onClickDetail: handleAttendanceClick,
      interactive: true,
    },
    {
      id: 'leave',
      icon: FaUserTimes,
      count: employeesOnLeaveToday,
      label: "On Leave Today",
      subLabel: `${leaveRate}% leave rate`,
      gradient: "from-red-500 via-red-600 to-red-700",
      glowColor: "red",
      trend: { value: "-1.2%", isPositive: false },
      percentage: `${leaveRate}%`,
      onClickDetail: handleLeaveClick,
      interactive: true,
    },
  ];

  return (
    <>
      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
        {statCardsData.map((item, index) => (
          <StatCard 
            key={item.id} 
            {...item} 
            index={index}
            isHovered={hoveredCard === item.id}
            onHover={() => setHoveredCard(item.id)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalVisible}
        onRequestClose={closeAttendanceModal}
        attendanceDetailsLoading={attendanceDetailsLoading}
        loggedInUsers={loggedInUsers}
        notLoggedInUsers={notLoggedInUsers}
      />
    </>
  );
}

// ------------------------------------------------------------------------
// Enhanced StatCard Component - Fixed Height & Reduced Hover Shadow
// ------------------------------------------------------------------------
function StatCard({ 
  icon: Icon, 
  count, 
  label, 
  subLabel,
  gradient, 
  glowColor,
  trend,
  percentage,
  onClickDetail, 
  interactive,
  index,
  isHovered,
  onHover,
  onLeave
}) {
  const handleCardClick = () => {
    if (typeof onClickDetail === "function") {
      onClickDetail();
    }
  };

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
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 0.15,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`relative group cursor-pointer w-full ${interactive ? 'hover:cursor-pointer' : 'cursor-default'}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={handleCardClick}
    >
      {/* Reduced Glow Effect */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      {/* Main Card - Fixed Height */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden h-[240px] flex flex-col transition-shadow duration-300">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8" />
        </div>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-md`}>
            <Icon className="text-lg sm:text-2xl text-white" />
            
            {/* Reduced Icon Glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-0 group-hover:opacity-30`}
              animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center gap-1">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-2 sm:space-y-3 flex-grow">
          {/* Count Display */}
          <div className="flex items-end gap-2">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {count ?? 0}
            </motion.h3>
            <div className="flex items-center gap-1 mb-1">
              <HiOutlineSparkles className={`text-${glowColor}-500 text-xs sm:text-sm`} />
              <span className={`text-xs sm:text-sm font-semibold text-${glowColor}-600 dark:text-${glowColor}-400`}>
                {percentage}
              </span>
            </div>
          </div>

          {/* Labels */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {label}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {subLabel}
            </p>
          </div>
        </div>

        {/* Click Indicator for Interactive Cards */}
        {interactive && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-2 h-2 bg-${glowColor}-500 rounded-full animate-pulse`}></div>
          </div>
        )}

        {/* Reduced Floating Particles Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full opacity-60`}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%"
                  }}
                  animate={{ 
                    opacity: [0, 0.6, 0], 
                    scale: [0, 1, 0],
                    y: "-100%"
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default DashboardStatCards;