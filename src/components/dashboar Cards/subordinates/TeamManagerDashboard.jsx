import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import ManagerDashboardCards from "./ManagerDashboardCards";
import EmployeeStatusChart from "../superAdmin/EmployeeStatusChart";
import DepartmentChart from "../superAdmin/DepartmentChart";
import WhoIsInCard from "../superAdmin/WhoIsInCard";
import MonthlyHiringChart from "../superAdmin/MonthlyHiringChart";
import DemographicCard from "../superAdmin/DemographicCard";
import AttendanceCard from "../superAdmin/AttendanceCard";
import ProductLense from "../superAdmin/ProductLense";
import { registerFcmToken } from "../../../utils/registerFcmToken";
import useAttendanceStore from "../../../store/useAttendanceStore";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

function TeamManagerDashboard() {
  const {
    subordinateStats,
    fetchSubordinateStats,
    loading,
    error,
  } = useAttendanceStore();

  useEffect(() => {
    registerFcmToken();
    fetchSubordinateStats();
  }, [fetchSubordinateStats]);

  const stats = subordinateStats || {};

  return (
    <motion.div
      className="min-h-screen w-full pt-2"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-10 rounded-2xl">
        <div className="max-w-8xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          ) : (
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
                      Team Metrics Overview
                    </h2>
                    <HiOutlineSparkles className="h-6 w-6 text-yellow-500" />
                  </div>

                  <ManagerDashboardCards
                    totalUsers={stats.totalSubordinates}
                    usersLoggedInToday={stats.presentCount}
                    employeesOnLeaveToday={stats.onLeaveCount}
                  />
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
                      Team Analytics & Insights
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="transition-transform duration-200 hover:scale-[1.01]">
                      <EmployeeStatusChart
                        totalUsers={stats.totalSubordinates}
                        employeesPerEmployeeType={stats.employeesPerEmployeeType || []}
                      />
                    </div>
                    <div className="transition-transform duration-200 hover:scale-[1.01]">
                      <DepartmentChart
                        totalUsers={stats.totalSubordinates}
                        employeesPerDepartment={stats.employeesPerDepartment || []}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <div className="transition-transform duration-200 hover:scale-[1.005]">
                      <WhoIsInCard />
                    </div>
                  </div>

                  <div className="transition-transform duration-200 hover:scale-[1.005]">
                    <MonthlyHiringChart monthlyHiringTrend={stats.monthlyHiringTrend || []} />
                  </div>
                </section>
              </div>
              <aside className="xl:col-span-1 space-y-6">
                <div className="space-y-6">
                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <DemographicCard
                      totalUsers={stats.totalSubordinates}
                      maleCount={stats.maleCount}
                      femaleCount={stats.femaleCount}
                      ageDistribution={stats.ageDistribution || []}
                    />
                  </div>

                  <div className="transition-transform duration-200 hover:scale-[1.01]">
                    <AttendanceCard
                      totalUsers={stats.totalSubordinates}
                      usersLoggedInToday={stats.presentCount}
                      employeesOnLeaveToday={stats.onLeaveCount}
                    />
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
}

export default TeamManagerDashboard;
