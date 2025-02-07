import React from "react";
import { motion } from "framer-motion"; // <-- 1) Import from framer-motion

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

function SuperAdminDashboard() {
  return (
    // 2) Replace your outer container with motion.div to animate the entire page
    <motion.div
      className="min-h-screen w-full bg-gray-50 dark:bg-[#12121200] pt-2"
      initial={{ opacity: 0 }}       // Starts transparent
      animate={{ opacity: 1 }}       // Fades in
      transition={{ duration: 0.5 }} // Duration of half a second
    >
      {/* 1) Top Banner */}

      {/* 2) Main Dashboard Content */}
      <main className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mb-7">
          <Heading />
        </div>

        <div className="flex flex-col md:flex-row justify-around">
          {/* Left Column with slide-in from the left */}
          <motion.div
            className="flex flex-col w-full md:w-2/3 gap-7"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Row: Stat Cards */}
            <DashboardStatCards />

            {/* Row: Employee Status + Department */}
            <div className="flex flex-col md:flex-row gap-7">
              <EmployeeStatusChart />
              <DepartmentChart />
            </div>

            {/* Row: WhoIsInCard + Performance */}
            <div className="flex flex-col md:flex-row gap-7">
              <WhoIsInCard />
              <PerformanceChart />
            </div>

            {/* Monthly Hiring Chart */}
            <MonthlyHiringChart />

            {/* RACI Operations Chart */}
            <RaciOperationsChart />
          </motion.div>

          {/* Right Column (Sidebar) with slide-in from the right */}
          <motion.aside
            className="flex flex-col w-full md:w-1/4 items-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <DemographicCard />
            <AttendanceCard />
            <AnnouncementCard />
          </motion.aside>
        </div>
      </main>

      {/* Bottom padding, or a footer if desired */}
      <div className="h-10" />
    </motion.div>
  );
}

export default SuperAdminDashboard;

