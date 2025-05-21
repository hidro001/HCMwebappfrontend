import React from "react";
import { motion } from "framer-motion";

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

function EmployeeDashboardLayout() {
    useEffect(() => {
    registerFcmToken();
  }, []);
  return (
    <motion.div
      className="min-h-screen w-full bg-gray-50 dark:bg-[#12121200] pt-2"
      initial={{ opacity: 0 }} // Starts transparent
      animate={{ opacity: 1 }} // Fades in
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
            <div className=" ">
              <AssignedTaskListCard />
            </div>

            {/* Row: WhoIsInCard + Performance */}
            <div className="flex flex-col md:flex-row gap-7">
              {/* <WhoIsInCard /> */}
              <UpcomingHolidaysCard />
              {/* <PerformanceChart /> */}
              <PerformanceCard />
            </div>
          </motion.div>

          {/* Right Column (Sidebar) with slide-in from the right */}
          <motion.aside
            className="flex flex-col w-full md:w-1/4 items-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
         
            <AttendanceCard />
            <AnnouncementCard />
            <TopPerformerCard />
          </motion.aside>
        </div>
      </main>

      <div className="h-10" />
    </motion.div>
  );
}

export default EmployeeDashboardLayout;
