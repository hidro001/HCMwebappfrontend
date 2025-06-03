

// import React from "react";
// import { motion } from "framer-motion";
// import { FiGrid, FiUsers, FiCalendar, FiBell, FiTrendingUp, FiAward } from "react-icons/fi";

// import DashboardStatCards from "./DashboardStatCards";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import AssignedTaskListCard from "./AssignedTaskListCard";
// import UpcomingHolidaysCard from "./UpcomingHolidaysCard";
// import PerformanceCard from "./PerformanceCard";
// import TopPerformerCard from "./TopPerformerCard";
// import { registerFcmToken } from "../../../utils/registerFcmToken"; 
// import { useEffect } from "react";

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   }
// };

// const slideInLeft = {
//   hidden: { x: -30, opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// };

// const slideInRight = {
//   hidden: { x: 30, opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// };

// function EmployeeDashboardLayout() {
//   useEffect(() => {
//     registerFcmToken();
//   }, []);

//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gwhite dark:bg-black pt-2"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >


//       {/* Main Dashboard Content */}
//       <main className="px-4 sm:px-6 lg:px-8 py-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Dashboard Grid Layout */}
//           <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
//             {/* Left Main Content Area - Takes 3 columns on XL screens */}
//             <motion.div 
//               className="xl:col-span-3 space-y-6"
//               variants={slideInLeft}
//             >
//               {/* Stats Cards Section */}
//               <motion.section 
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
//                 variants={itemVariants}
//                 whileHover={{ y: -2, transition: { duration: 0.2 } }}
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <FiGrid className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Overview
//                   </h2>
//                 </div>
//                 <DashboardStatCards />
//               </motion.section>

//               {/* Tasks Section */}
//               <motion.section 
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 variants={itemVariants}
//                 whileHover={{ y: -2, transition: { duration: 0.2 } }}
//               >
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                       <FiCalendar className="w-5 h-5 text-green-600 dark:text-green-400" />
//                     </div>
//                     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       My Tasks
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <AssignedTaskListCard />
//                 </div>
//               </motion.section>

//               {/* Bottom Row - Performance & Holidays */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Holidays Card */}
//                 <motion.section 
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                   variants={itemVariants}
//                   whileHover={{ y: -2, transition: { duration: 0.2 } }}
//                 >
//                   <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                         <FiCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                       </div>
//                       <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         Upcoming Holidays
//                       </h2>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <UpcomingHolidaysCard />
//                   </div>
//                 </motion.section>

//                 {/* Performance Card */}
//                 <motion.section 
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                   variants={itemVariants}
//                   whileHover={{ y: -2, transition: { duration: 0.2 } }}
//                 >
//                   <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                         <FiTrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                       </div>
//                       <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         Performance
//                       </h2>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <PerformanceCard />
//                   </div>
//                 </motion.section>
//               </div>
//             </motion.div>

//             {/* Right Sidebar - Takes 1 column on XL screens */}
//             <motion.aside 
//               className="xl:col-span-1 space-y-6"
//               variants={slideInRight}
//             >
//               {/* Attendance Card */}
//               <motion.section 
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 variants={itemVariants}
//                 whileHover={{ y: -2, transition: { duration: 0.2 } }}
//               >
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
//                       <FiUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                     </div>
//                     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Attendance
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <AttendanceCard />
//                 </div>
//               </motion.section>

//               {/* Announcements Card */}
//               <motion.section 
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 variants={itemVariants}
//                 whileHover={{ y: -2, transition: { duration: 0.2 } }}
//               >
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                       <FiBell className="w-5 h-5 text-red-600 dark:text-red-400" />
//                     </div>
//                     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Announcements
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <AnnouncementCard />
//                 </div>
//               </motion.section>

//               {/* Top Performer Card */}
//               <motion.section 
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
//                 variants={itemVariants}
//                 whileHover={{ y: -2, transition: { duration: 0.2 } }}
//               >
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
//                       <FiAward className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//                     </div>
//                     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Top Performers
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <TopPerformerCard />
//                 </div>
//               </motion.section>
//             </motion.aside>
//           </div>
//         </div>
//       </main>

//       {/* Bottom Spacing */}
//       <div className="h-8" />
//     </motion.div>
//   );
// }

// export default EmployeeDashboardLayout;


import React from "react";
import { motion } from "framer-motion";
import { 
  FiGrid, 
  FiUsers, 
  FiCalendar, 
  FiBell, 
  FiTrendingUp, 
  FiAward,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiTarget
} from "react-icons/fi";

import DashboardStatCards from "./DashboardStatCards";
import AttendanceCard from "./AttendanceCard";
import AnnouncementCard from "./AnnouncementCard";
import AssignedTaskListCard from "./AssignedTaskListCard";
import UpcomingHolidaysCard from "./UpcomingHolidaysCard";
import PerformanceCard from "./PerformanceCard";
import TopPerformerCard from "./TopPerformerCard";
import { registerFcmToken } from "../../../utils/registerFcmToken"; 
import { useEffect } from "react";

// Enhanced Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      ease: "easeInOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    scale: 0.95
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const hoverVariants = {
  hover: {
    y: -4,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

function EmployeeDashboardLayout() {
  useEffect(() => {
    registerFcmToken();
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
   

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview - Full Width */}
        <motion.section 
          className="mb-8"
          variants={cardVariants}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FiGrid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quick Overview
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your key metrics at a glance
                </p>
              </div>
            </div>
            <DashboardStatCards />
          </div>
        </motion.section>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tasks Section */}
            <motion.section 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <FiCheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        My Tasks
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stay on top of your assignments
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <FiTarget className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Active</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <AssignedTaskListCard />
              </div>
            </motion.section>

            {/* Bottom Row - Performance & Holidays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Performance Card */}
              <motion.section 
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
                {...hoverVariants}
              >
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                      <FiTrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Performance
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track your progress
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <PerformanceCard />
                </div>
              </motion.section>

              {/* Holidays Card */}
              <motion.section 
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
                {...hoverVariants}
              >
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Holidays
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Upcoming time off
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <UpcomingHolidaysCard />
                </div>
              </motion.section>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Attendance Card */}
            <motion.section 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-lg">
                    <FiClock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Attendance
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Time tracking
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <AttendanceCard />
              </div>
            </motion.section>

            {/* Announcements Card */}
            <motion.section 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                      <FiBell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Announcements
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Latest updates
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
                <AnnouncementCard />
              </div>
            </motion.section>

            {/* Top Performer Card */}
            <motion.section 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                    <FiStar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Top Performers
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Team leaders
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TopPerformerCard />
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </motion.div>
  );
}

export default EmployeeDashboardLayout;