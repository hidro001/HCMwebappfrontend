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
import { useDashboardStore } from "../../../store/useDashboardStore";
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

  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    maleCount,
    femaleCount,
    ageDistribution,
    employeesPerDepartment = [],
    monthlyHiringTrend,
    employeesPerEmployeeType = [],
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    registerFcmToken();
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);


  return (
    <motion.div
      className="min-h-screen w-full pt-2"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-10 rounded-2xl">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
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
                <DashboardStatCards totalUsers={totalUsers} usersLoggedInToday={usersLoggedInToday} employeesOnLeaveToday={employeesOnLeaveToday} />
              </motion.section>
              <section className="hidden lg:block">
                <ProductLense />
              </section>
              <section className=" rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <FiTrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    Analytics & Deep Insights
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <EmployeeStatusChart totalUsers={totalUsers} employeesPerEmployeeType={employeesPerEmployeeType} />
                  </div>
                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <DepartmentChart totalUsers={totalUsers} employeesPerDepartment={employeesPerDepartment} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div className="transition-transform duration-200 hover:scale-[1.005]">
                    <WhoIsInCard />
                  </div>
                </div>
                <div className="transition-transform duration-200 hover:scale-[1.005]">
                  <MonthlyHiringChart monthlyHiringTrend={monthlyHiringTrend} />
                </div>
              </section>
            </div>
            <aside className="xl:col-span-1 space-y-6">
              <div className="space-y-6">
                <div className="transition-transform duration-200 hover:scale-[1.01]">
                  <DemographicCard totalUsers={totalUsers} maleCount={maleCount} femaleCount={femaleCount} ageDistribution={ageDistribution} />
                </div>

                <div className="transition-transform duration-200 hover:scale-[1.01]">
                  <AttendanceCard totalUsers={totalUsers} usersLoggedInToday={usersLoggedInToday} employeesOnLeaveToday={employeesOnLeaveToday} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default SuperAdminDashboard;
