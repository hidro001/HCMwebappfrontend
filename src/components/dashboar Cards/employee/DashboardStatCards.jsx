// import React, { useEffect, useState } from "react";
// import StatCard from "./StatCard";
// // React Icons
// import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
// // Import the service function
// import { getDashboardStats } from "../../../service/dashboardService";

// function DashboardStatCards() {
//   // Local state for the three stats
//   const [totalLoggedIn, setTotalLoggedIn] = useState(0);
//   const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
//   const [totalTaskPending, setTotalTaskPending] = useState(0);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   // Function to fetch stats from the service
//   const fetchStats = async () => {
//     try {
//       const res = await getDashboardStats(); 
//       // { success: boolean, data: { totalLoggedIn, totalLeavesTaken, totalTaskPending } }
//       if (res.success) {
//         const { totalLoggedIn, totalLeavesTaken, totalTaskPending } = res.data;
//         setTotalLoggedIn(totalLoggedIn);
//         setTotalLeavesTaken(totalLeavesTaken);
//         setTotalTaskPending(totalTaskPending);
//       } else {
//         console.error("Failed to fetch stats: success=false", res.message);
//       }
//     } catch (error) {
//       console.error("Error in fetchStats:", error);
//     }
//   };

//   // Wave images
//   const waveLightGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c";
//   const waveDarkGreen = "https://iili.io/2D0pyIn.png";

//   const waveLightYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c";
//   const waveDarkYellow = "https://iili.io/2D0mtDu.png";

//   const waveLightRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f";
//   const waveDarkRed = "https://iili.io/2D0bZCv.png";

//   // Prepare stat card data
//   const statCardsData = [
//     {
//       icon: <FaUsers className="text-blue-600" />,
//       count: totalLoggedIn,
//       label: "Total Logged In",
//       chartLight: waveLightGreen,
//       chartDark: waveDarkGreen,
//       viewAllLink: "/dashboard/view-attendance", // <-- Add this link
//     },
//     {
//       icon: <FaUserCheck className="text-green-600" />,
//       count: totalLeavesTaken,
//       label: "Total Leaves Taken",
//       chartLight: waveLightYellow,
//       chartDark: waveDarkYellow,
//       viewAllLink: "/dashboard/leave-history", // <-- Add this link
//     },
//     {
//       icon: <FaUserTimes className="text-red-600" />,
//       count: totalTaskPending,
//       label: "Total Task Pending",
//       chartLight: waveLightRed,
//       chartDark: waveDarkRed,
//       viewAllLink: "/dashboard/assigned-task/employee", // <-- Add this link
//     },
//   ];
  

//   return (
//     <div className="flex flex-col gap-5 md:flex-row bg-blend-darken">
//       {statCardsData.map((item, index) => (
//         <StatCard key={index} {...item} />
//       ))}
//     </div>
//   );
// }

// export default DashboardStatCards;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Calculate percentages and trends (you can modify these calculations based on your needs)
  const totalEmployees = totalLoggedIn + totalLeavesTaken + totalTaskPending; // Adjust this calculation as needed
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

  const handleCardClick = (link) => {
    if (link) {
      // You can use your routing logic here
      // Example: navigate(link) or window.location.href = link
      console.log("Navigate to:", link);
    }
  };

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 lg:p-6">
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

// Enhanced StatCard Component
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
      y: -8,
      scale: 1.02,
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
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]">
        <div className="animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="space-y-3">
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
      className={`relative group cursor-pointer w-full ${interactive ? 'hover:cursor-pointer' : 'cursor-default'}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onCardClick}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between transition-all duration-300">
        
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
            className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="text-lg sm:text-2xl text-white" />
            
            {/* Icon Glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-md opacity-0 group-hover:opacity-50`}
              animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
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

        {/* View Details Button */}
        <AnimatePresence>
          {interactive && isHovered && (
            <motion.div 
              className="mt-4 sm:mt-6 relative z-10"
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick();
                }}
              >
                <div className="flex items-center gap-2">
                  <FaEye className="text-xs sm:text-sm" />
                  <span>View Details</span>
                </div>
                <motion.div
                  animate={isHovered ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronRight className="text-xs sm:text-sm" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

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