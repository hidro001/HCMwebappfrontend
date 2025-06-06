

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineRefresh,
  HiOutlineDotsHorizontal,
  // HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineEye
} from "react-icons/hi";
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

import { getAttendanceData } from "../../../service/dashboardService";

/**
 * Returns today's date as a string in YYYY-MM-DD format.
 */
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AttendanceSummary() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Use today's date by default
  const today = getTodayString();

  const fetchAttendanceData = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await getAttendanceData(today);
      if (res.success) {
        const { whoIsIn, lateArrival, onTime } = res.data || {};

        const sectionsData = [
          {
            title: "Who is in?",
            users: whoIsIn?.users?.map(mapUserToSection) || [],
            more: whoIsIn?.more || 0,
            icon: HiOutlineEye,
            color: "emerald",
            bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
            textColor: "text-emerald-600 dark:text-emerald-400",
            borderColor: "border-emerald-200 dark:border-emerald-700"
          },
          {
            title: "Late Arrival",
            users: lateArrival?.users?.map(mapUserToSection) || [],
            more: lateArrival?.more || 0,
            icon: HiOutlineExclamationTriangle,
            color: "amber",
            bgColor: "bg-amber-100 dark:bg-amber-900/30",
            textColor: "text-amber-600 dark:text-amber-400",
            borderColor: "border-amber-200 dark:border-amber-700"
          },
          {
            title: "On Time",
            users: onTime?.users?.map(mapUserToSection) || [],
            more: onTime?.more || 0,
            icon: HiOutlineCheckCircle,
            color: "green",
            bgColor: "bg-green-100 dark:bg-green-900/30",
            textColor: "text-green-600 dark:text-green-400",
            borderColor: "border-green-200 dark:border-green-700"
          },
        ];

        setSections(sectionsData);
      } else {
        setErrorMsg(res.message || "Failed to fetch attendance");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [today]);

  // Handle refresh with animation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAttendanceData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  /**
   * Converts a single attendance document into an object
   * that matches the structure your UI code expects.
   */
  const mapUserToSection = (attendanceDoc) => {
    const avatar = attendanceDoc?.userData?.avatar || "";
    const fullName = attendanceDoc?.userData?.name || "Unknown User";

    if (avatar) {
      return { img: avatar, name: fullName };
    }

    const initials = fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return {
      initials,
      name: fullName,
      type: "blue", // Updated to use a consistent color
    };
  };

  // Check if ALL sections are empty (no user data)
  const hasNoData = sections.every((section) => section.users.length === 0);
  const totalAttendees = sections.reduce((sum, section) => 
    sum + section.users.length + section.more, 0
  );

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -2,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const refreshVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: isRefreshing ? Infinity : 0
      }
    }
  };

  // Format today's date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="w-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="
        flex flex-col
        rounded-xl lg:rounded-2xl
        bg-white dark:bg-gray-800
        shadow-lg hover:shadow-xl
        border border-gray-200 dark:border-gray-700
        p-4 sm:p-5 lg:p-6
        text-gray-800 dark:text-gray-100
        transition-all duration-200
        h-full
        min-h-[300px]
      ">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineClock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <div>
              <h2 className="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base lg:text-lg">
                Today's Attendance
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {formatDate(today)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Total count badge */}
            <motion.div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <HiOutlineUserGroup className="h-3 w-3" />
              {totalAttendees}
            </motion.div>
            
            {/* Refresh button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
            >
              <motion.div
                variants={refreshVariants}
                animate={isRefreshing ? "spin" : ""}
              >
                <HiOutlineRefresh className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </motion.button>
            
            {/* Menu button */}
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HiOutlineDotsHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />

        {/* Content */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="flex items-center justify-center h-full min-h-[200px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <HiOutlineRefresh className="h-6 w-6 text-purple-600" />
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Loading attendance data...
                  </span>
                </div>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                key="error"
                className="flex items-center justify-center h-full min-h-[200px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="text-center">
                  <HiOutlineExclamationTriangle className="h-12 w-12 mx-auto mb-3 text-red-400" />
                  <p className="text-red-500 font-medium">Error</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {errorMsg}
                  </p>
                </div>
              </motion.div>
            )}

            {hasNoData && !loading && !errorMsg && (
              <motion.div
                key="nodata"
                className="flex items-center justify-center h-full min-h-[200px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="text-center">
                  <HiOutlineCalendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
                    No Attendance Records
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    No attendance data available for today
                  </p>
                </div>
              </motion.div>
            )}

            {!loading && !errorMsg && !hasNoData && (
              <motion.div
                key="content"
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {sections.map((section, sectionIndex) => {
                  const IconComponent = section.icon;
                  return (
                    <motion.div
                      key={sectionIndex}
                      className="space-y-3"
                      custom={sectionIndex}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${section.bgColor}`}>
                          <IconComponent className={`h-4 w-4 ${section.textColor}`} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {section.title}
                        </h3>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {section.users.length + section.more}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {section.users.map((user, userIndex) => (
                          <motion.div
                            key={userIndex}
                            custom={userIndex}
                            variants={avatarVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="relative group"
                          >
                            {user.img ? (
                              <img
                                loading="lazy"
                                src={user.img}
                                alt={user.name}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                              />
                            ) : (
                              <div className={`
                                flex items-center justify-center
                                w-8 h-8 sm:w-9 sm:h-9
                                rounded-full
                                text-xs sm:text-sm font-medium
                                bg-gradient-to-br from-blue-400 to-blue-600
                                text-white
                                border-2 border-white dark:border-gray-600
                                shadow-sm
                              `}>
                                {user.initials}
                              </div>
                            )}
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              {user.name}
                            </div>
                          </motion.div>
                        ))}

                        {section.more > 0 && (
                          <motion.div
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="text-gray-600 dark:text-gray-300">
                              +{section.more} more
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading overlay */}
          {isRefreshing && (
            <motion.div
              className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-700 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <HiOutlineRefresh className="h-4 w-4 text-purple-600" />
                </motion.div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Refreshing...</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AttendanceSummary;