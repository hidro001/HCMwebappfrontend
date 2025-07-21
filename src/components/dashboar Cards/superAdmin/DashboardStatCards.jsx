import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { useDashboardStore } from "../../../store/useDashboardStore";
import AttendanceModal from "./AttendanceModel";

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    attendanceDetails = [],
    attendanceDetailsLoading,
    employeesOnLeaveList,
    fetchLeaveDetails,
  } = useDashboardStore();

  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const loggedInUsers = attendanceDetails.filter((user) => user.isPresent);
  const notLoggedInUsers = attendanceDetails.filter((user) => !user.isPresent);

  const handleAttendanceClick = async () => {
    await fetchAttendanceDetails();
    setIsAttendanceModalVisible(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalVisible(false);
  };

  const handleLeaveClick = async () => {
    await fetchLeaveDetails();
  };

  // Calculate percentages and trends
  const attendanceRate =
    totalUsers > 0 ? ((usersLoggedInToday / totalUsers) * 100).toFixed(1) : 0;
  const leaveRate =
    totalUsers > 0
      ? ((employeesOnLeaveToday / totalUsers) * 100).toFixed(1)
      : 0;

  const statCardsData = [
    {
      id: "total",
      icon: FaUsers,
      count: totalUsers,
      label: "Total Employees",
      subLabel: "Active workforce",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      glowColor: "blue",
      trend: { value: "+2.5%", isPositive: true },
      percentage: "100%",
      onClickDetail: null,
      interactive: false,
    },
    {
      id: "present",
      icon: FaUserCheck,
      count: usersLoggedInToday,
      label: "Present Today",
      subLabel: `${attendanceRate}% attendance rate`,
      gradient: "from-green-500 via-green-600 to-green-700",
      glowColor: "green",
      trend: { value: "+5.2%", isPositive: true },
      percentage: `${attendanceRate}%`,
      onClickDetail: handleAttendanceClick,
      interactive: true,
    },
    {
      id: "leave",
      icon: FaUserTimes,
      count: employeesOnLeaveToday,
      label: "On Leave Today",
      subLabel: `${leaveRate}% leave rate`,
      gradient: "from-red-500 via-red-600 to-red-700",
      glowColor: "red",
      trend: { value: "-1.2%", isPositive: false },
      percentage: `${leaveRate}%`,
      onClickDetail: handleLeaveClick,
      interactive: true,
    },
  ];

  return (
    <>
      {/* Enhanced Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
        {statCardsData.map((item, index) => (
          <StatCard
            key={item.id}
            {...item}
            index={index}
            isHovered={hoveredCard === item.id}
            onHover={() => setHoveredCard(item.id)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalVisible}
        onRequestClose={closeAttendanceModal}
        attendanceDetailsLoading={attendanceDetailsLoading}
        loggedInUsers={loggedInUsers}
        notLoggedInUsers={notLoggedInUsers}
      />
    </>
  );
}

// Enhanced StatCard Component with Better Design Alignment
function StatCard({
  icon: Icon,
  count,
  label,
  subLabel,
  gradient,
  glowColor,
  trend,
  percentage,
  onClickDetail,
  interactive,
  index,
  isHovered,
  onHover,
  onLeave,
}) {
  const handleCardClick = () => {
    if (typeof onClickDetail === "function") {
      onClickDetail();
    }
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
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -6,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 0.2,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className={`relative group w-full ${
        interactive ? "cursor-pointer" : "cursor-default"
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={handleCardClick}
    >
      {/* Enhanced Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-lg opacity-0`}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Main Card with Enhanced Design */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden h-[280px] flex flex-col transition-all duration-300">
        {/* Enhanced Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 rounded-full transform translate-x-8 -translate-y-8" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.02]">
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-sm`}
          />
        </div>

        {/* Header Section - Better Alignment */}
        <div className="flex items-start justify-between mb-8">
          <div
            className={`relative p-4 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg transform transition-transform duration-300 group-hover:scale-105`}
          >
            <Icon className="text-2xl text-white drop-shadow-sm" />

            {/* Icon Glow Enhancement */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-md opacity-0`}
              animate={isHovered ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Decorative Status Indicator */}
          <div className="flex flex-col items-end space-y-2">
            {/* Decorative dots */}
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 bg-${glowColor}-500 rounded-full animate-pulse`}
              ></div>
              <div
                className={`w-1.5 h-1.5 bg-${glowColor}-400 rounded-full animate-pulse`}
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className={`w-1 h-1 bg-${glowColor}-300 rounded-full animate-pulse`}
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>

            {/* Decorative status bar */}
            <div className="w-12 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
              />
            </div>
          </div>
        </div>

        {/* Main Content with Better Spacing */}
        <div className="flex-grow flex flex-col justify-center space-y-6">
          {/* Enhanced Count Display */}
          <div className="text-center">
            <motion.h3
              className="text-5xl font-black text-gray-900 dark:text-white mb-3 leading-none"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {count ?? 0}
            </motion.h3>

            {/* Enhanced Labels */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                {label}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-2">
                {subLabel}
              </p>
            </div>
          </div>

          {/* Decorative Progress Ring */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <svg
                className="w-16 h-16 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100, 100"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="0, 100"
                  className={`text-${glowColor}-500`}
                  animate={{
                    strokeDasharray: isHovered
                      ? ["0, 100", "60, 100"]
                      : "0, 100",
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>

              {/* Center decorative dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`w-2 h-2 bg-${glowColor}-500 rounded-full`}
                  animate={isHovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Elements */}
        {interactive && (
          <>
            {/* Click Indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                  Click to view
                </span>
                <motion.div
                  className={`w-3 h-3 bg-${glowColor}-500 rounded-full`}
                  animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Hover Border Effect */}
            <motion.div
              className={`absolute inset-0 rounded-3xl border-2 border-${glowColor}-500 opacity-0`}
              animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* Enhanced Floating Particles */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1.5 h-1.5 bg-${glowColor}-400 rounded-full`}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * 300,
                    y: "100%",
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0.5],
                    y: "-20%",
                    x: Math.random() * 300,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Bottom Gradient */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`}
        />
      </div>
    </motion.div>
  );
}

export default DashboardStatCards;
