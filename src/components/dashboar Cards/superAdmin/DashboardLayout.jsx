// import React from "react";
// import { motion } from "framer-motion"; // <-- 1) Import from framer-motion

// // Import all your individual components
// import Heading from "./Heading";
// import DashboardStatCards from "./DashboardStatCards";
// import EmployeeStatusChart from "./EmployeeStatusChart";
// import DepartmentChart from "./DepartmentChart";
// import WhoIsInCard from "./WhoIsInCard";
// import PerformanceChart from "./PerformanceChart";
// import MonthlyHiringChart from "./MonthlyHiringChart";
// import RaciOperationsChart from "./RaciOperationsChart";
// import DemographicCard from "./DemographicCard";
// import AttendanceCard from "./AttendanceCard";
// import AnnouncementCard from "./AnnouncementCard";
// import ProductLense from "./ProductLense";
// import { registerFcmToken } from "../../../utils/registerFcmToken";
// import { useEffect } from "react";

// function SuperAdminDashboard() {
//   useEffect(() => {
//     registerFcmToken();
//   }, []);
//   return (
//     // 2) Replace your outer container with motion.div to animate the entire page
//     <motion.div
//       className="min-h-screen w-full bg-gray-50 dark:bg-[#12121200] pt-2"
//       initial={{ opacity: 0 }} // Starts transparent
//       animate={{ opacity: 1 }} // Fades in
//       transition={{ duration: 0.5 }} // Duration of half a second
//     >
//       {/* 1) Top Banner */}

//       {/* 2) Main Dashboard Content */}
//       <main className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
//         <div className="mb-7">
//           <Heading />
//         </div>

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
//             <ProductLense />

//             {/* Row: Employee Status + Department */}
//             <div className="flex flex-col md:flex-row gap-7">
//               <EmployeeStatusChart />
//               <DepartmentChart />
//             </div>

//             {/* Row: WhoIsInCard + Performance */}
//             <div className="flex flex-col md:flex-row gap-7">
//               <WhoIsInCard />
//               {/* <PerformanceChart /> */}
//             </div>

//             {/* Monthly Hiring Chart */}
//             <MonthlyHiringChart />

//             {/* RACI Operations Chart */}
//             {/* <RaciOperationsChart /> */}
//           </motion.div>

//           {/* Right Column (Sidebar) with slide-in from the right */}
//           <motion.aside
//             className="flex flex-col w-full md:w-1/4 items-center"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <DemographicCard />
//             <AttendanceCard />
//             <AnnouncementCard />
//           </motion.aside>
//         </div>
//       </main>

//       {/* Bottom padding, or a footer if desired */}
//       <div className="h-10" />
//     </motion.div>
//   );
// }

// export default SuperAdminDashboard;

import React from "react";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiTrendingUp,
  FiUsers,
  FiBarChart2,
  FiCalendar,
  FiBell,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

// Import all your individual components
import Heading from "./Heading";
import DashboardStatCards from "./DashboardStatCards";
import EmployeeStatusChart from "./EmployeeStatusChart";
import DepartmentChart from "./DepartmentChart";
import WhoIsInCard from "./WhoIsInCard";
import PerformanceChart from "./PerformanceChart";
import MonthlyHiringChart from "./MonthlyHiringChart";
import RaciOperationsChart from "./RaciOperationsChart";
import DemographicCard from "./DemographicCard";
import AttendanceCard from "./AttendanceCard";
import AnnouncementCard from "./AnnouncementCard";
import ProductLense from "./ProductLense";
import { registerFcmToken } from "../../../utils/registerFcmToken";
import { useEffect } from "react";

// Animation variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const sidebarVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

function SuperAdminDashboard() {
  useEffect(() => {
    registerFcmToken();
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full bg-white dark:bg-black pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Dashboard Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content Area - 3 columns on XL screens */}
            <motion.div
              className="xl:col-span-3 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Stats Cards Section */}
              <motion.section variants={cardVariants} className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiBarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Key Metrics
                  </h2>
                  <HiOutlineSparkles className="h-5 w-5 text-yellow-500" />
                </div>
                <DashboardStatCards />
              </motion.section>

              {/* Product Lens Section */}
              <motion.section
                variants={cardVariants}
                className="hidden lg:block"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FiGrid className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Product Overview
                  </h2>
                </div>
                <ProductLense />
              </motion.section>

              {/* Charts Grid Section */}
              <motion.section variants={cardVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FiTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Analytics & Insights
                  </h2>
                </div>

                {/* Responsive Grid for Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                    whileHover={{ y: -5 }}
                  >
                    <EmployeeStatusChart />
                  </motion.div>
                  <motion.div
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                    whileHover={{ y: -5 }}
                  >
                    <DepartmentChart />
                  </motion.div>
                </div>

                {/* Who's In Section */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <motion.div
                    className="transform transition-all duration-300 hover:scale-[1.01]"
                    whileHover={{ y: -3 }}
                  >
                    <WhoIsInCard />
                  </motion.div>
                </div>

                {/* Monthly Hiring Chart */}
                <motion.div
                  className="transform transition-all duration-300 hover:scale-[1.01]"
                  whileHover={{ y: -3 }}
                >
                  <MonthlyHiringChart />
                </motion.div>
              </motion.section>
            </motion.div>

            {/* Sidebar - 1 column on XL screens */}
            <motion.aside
              className="xl:col-span-1 space-y-6"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Sidebar Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FiUsers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Overview
                </h2>
              </div>

              {/* Sidebar Cards with stagger animation */}
              <motion.div className="space-y-6">
                <motion.div
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <DemographicCard />
                </motion.div>

                <motion.div
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <AttendanceCard />
                </motion.div>

                <motion.div
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FiBell className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Latest Updates
                    </span>
                  </div>
                  <AnnouncementCard />
                </motion.div>
              </motion.div>

              {/* Quick Actions Panel */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FiCalendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    📊 Generate Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    👥 Manage Teams
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    🎯 Set Goals
                  </button>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default SuperAdminDashboard;
