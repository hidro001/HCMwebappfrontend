

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

// Simplified animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

function EmployeeDashboardLayout() {
  useEffect(() => {
    registerFcmToken();
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Stats Overview - Left Side */}
            <motion.section 
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 transition-transform duration-200 hover:scale-[1.01]">
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
            
            {/* Tasks Section */}
            <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.005]">
              <div className="p-6">
                <AssignedTaskListCard />
              </div>
            </section>

            {/* Bottom Row - Performance & Holidays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Performance Card */}
              <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
              </section>

              {/* Holidays Card */}
              <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
              </section>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Attendance Card */}
            <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
            </section>

            {/* Announcements Card */}
            <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
            </section>

            {/* Top Performer Card */}
            <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
            </section>
          </div>
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </motion.div>
  );
}

export default EmployeeDashboardLayout;