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
import MonthlyHiringChart from "./MonthlyHiringChart";
import DemographicCard from "./DemographicCard";
import AttendanceCard from "./AttendanceCard";
import AnnouncementCard from "./AnnouncementCard";
import ProductLense from "./ProductLense";
import { registerFcmToken } from "../../../utils/registerFcmToken";
import { useEffect } from "react";

// Simplified animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

function SuperAdminDashboard() {
  useEffect(() => {
    registerFcmToken();
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full pt-2"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Dashboard Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-10 rounded-2xl">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content Area - 3 columns on XL screens */}
            <div className="xl:col-span-3 space-y-8">
              {/* Stats Cards Section */}
              <motion.section
                variants={slideUpVariants}
                initial="hidden"
                animate="visible"
                className="relative rounded-2xl p-6 bg-bg-primary border border-white/20 dark:border-gray-700/50 "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <FiBarChart2 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Key Metrics Overview
                  </h2>
                  <HiOutlineSparkles className="h-6 w-6 text-yellow-500" />
                </div>
                <DashboardStatCards />
              </motion.section>

              {/* Product Lens Section */}
              <section className="hidden lg:block">
                <ProductLense />
              </section>

              {/* Charts Grid Section */}
              <section className=" rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <FiTrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    Analytics & Deep Insights
                  </h2>
                </div>

                {/* Responsive Grid for Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <EmployeeStatusChart />
                  </div>
                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <DepartmentChart />
                  </div>
                </div>

                {/* Who's In Section */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div className="transition-transform duration-200 hover:scale-[1.005]">
                    <WhoIsInCard />
                  </div>
                </div>

                {/* Monthly Hiring Chart */}
                <div className="transition-transform duration-200 hover:scale-[1.005]">
                  <MonthlyHiringChart />
                </div>
              </section>
            </div>

            {/* Sidebar - 1 column on XL screens */}
            <aside className="xl:col-span-1 space-y-6">
              {/* Sidebar Cards */}
              <div className="space-y-6">
                <div className="transition-transform duration-200 hover:scale-[1.01]">
                  <DemographicCard />
                </div>

                <div className="transition-transform duration-200 hover:scale-[1.01]">
                  <AttendanceCard />
                </div>

                {/* <div className="transition-transform duration-200 hover:scale-[1.01]">
                  <AnnouncementCard />
                </div> */}
              </div>

              {/* Quick Actions Panel */}
              {/* <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg shadow-md">
                    <FiCalendar className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold bg-gradient-to-r from-slate-700 to-blue-700 dark:from-slate-300 dark:to-blue-300 bg-clip-text text-transparent">
                    Power Actions Hub
                  </h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 rounded-lg transition-colors duration-200 border border-blue-200/30 dark:border-blue-700/30">
                    📊 Generate Analytics Report
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/40 dark:hover:to-pink-800/40 rounded-lg transition-colors duration-200 border border-purple-200/30 dark:border-purple-700/30">
                    👥 Team Management Center
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 rounded-lg transition-colors duration-200 border border-green-200/30 dark:border-green-700/30">
                    🎯 Strategic Goal Setting
                  </button>
                </div>
              </div> */}
            </aside>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default SuperAdminDashboard;
