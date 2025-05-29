// import React from "react";
// import { motion } from "framer-motion";

// import Heading from "./Heading";
// import DashboardStatCards from "./DashboardStatCards";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import AssignedTaskListCard from "./AssignedTaskListCard";
// import UpcomingHolidaysCard from "./UpcomingHolidaysCard";
// import PerformanceCard from "./PerformanceCard";
// import TopPerformerCard from "./TopPerformerCard";
// import { registerFcmToken } from "../../../utils/registerFcmToken"; 
// import { useEffect } from "react";

// function EmployeeDashboardLayout() {
//     useEffect(() => {
//     registerFcmToken();
//   }, []);
//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gray-50 dark:bg-[#12121200] pt-2"
//       initial={{ opacity: 0 }} // Starts transparent
//       animate={{ opacity: 1 }} // Fades in
//       transition={{ duration: 0.5 }} // Duration of half a second
//     >
//       {/* 1) Top Banner */}

//       {/* 2) Main Dashboard Content */}
//       <main className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

//         <div className="flex flex-col md:flex-row justify-around">
//           {/* Left Column with slide-in from the left */}
//           <motion.div
//             className="flex flex-col w-full md:w-2/3 gap-7"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Row: Stat Cards */}
//             <DashboardStatCards />

//             {/* Row: Employee Status + Department */}
//             <div className=" ">
//               <AssignedTaskListCard />
//             </div>

//             {/* Row: WhoIsInCard + Performance */}
//             <div className="flex flex-col md:flex-row gap-7">
//               {/* <WhoIsInCard /> */}
//               <UpcomingHolidaysCard />
//               {/* <PerformanceChart /> */}
//               <PerformanceCard />
//             </div>
//           </motion.div>

//           {/* Right Column (Sidebar) with slide-in from the right */}
//           <motion.aside
//             className="flex flex-col w-full md:w-1/4 items-center"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
         
//             <AttendanceCard />
//             <AnnouncementCard />
//             <TopPerformerCard />
//           </motion.aside>
//         </div>
//       </main>

//       <div className="h-10" />
//     </motion.div>
//   );
// }

// export default EmployeeDashboardLayout;



import React from "react";
import { motion } from "framer-motion";
import { FiGrid, FiUsers, FiCalendar, FiBell, FiTrendingUp, FiAward } from "react-icons/fi";

import Heading from "./Heading";
import DashboardStatCards from "./DashboardStatCards";
import AttendanceCard from "./AttendanceCard";
import AnnouncementCard from "./AnnouncementCard";
import AssignedTaskListCard from "./AssignedTaskListCard";
import UpcomingHolidaysCard from "./UpcomingHolidaysCard";
import PerformanceCard from "./PerformanceCard";
import TopPerformerCard from "./TopPerformerCard";
import { registerFcmToken } from "../../../utils/registerFcmToken"; 
import { useEffect } from "react";

// Animation variants
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const slideInLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInRight = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
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
      className="min-h-screen w-full bg-gwhite dark:bg-black pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >


      {/* Main Dashboard Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Left Main Content Area - Takes 3 columns on XL screens */}
            <motion.div 
              className="xl:col-span-3 space-y-6"
              variants={slideInLeft}
            >
              {/* Stats Cards Section */}
              <motion.section 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiGrid className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Overview
                  </h2>
                </div>
                <DashboardStatCards />
              </motion.section>

              {/* Tasks Section */}
              <motion.section 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      My Tasks
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <AssignedTaskListCard />
                </div>
              </motion.section>

              {/* Bottom Row - Performance & Holidays */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Holidays Card */}
                <motion.section 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <FiCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Upcoming Holidays
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <UpcomingHolidaysCard />
                  </div>
                </motion.section>

                {/* Performance Card */}
                <motion.section 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <FiTrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Performance
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <PerformanceCard />
                  </div>
                </motion.section>
              </div>
            </motion.div>

            {/* Right Sidebar - Takes 1 column on XL screens */}
            <motion.aside 
              className="xl:col-span-1 space-y-6"
              variants={slideInRight}
            >
              {/* Attendance Card */}
              <motion.section 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <FiUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Attendance
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <AttendanceCard />
                </div>
              </motion.section>

              {/* Announcements Card */}
              <motion.section 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <FiBell className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Announcements
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <AnnouncementCard />
                </div>
              </motion.section>

              {/* Top Performer Card */}
              <motion.section 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <FiAward className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Top Performers
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <TopPerformerCard />
                </div>
              </motion.section>
            </motion.aside>
          </div>
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </motion.div>
  );
}

export default EmployeeDashboardLayout;