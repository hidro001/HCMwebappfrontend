

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRegCalendarTimes, 
  FaCalendarAlt, 
  FaSync, 
  FaExclamationTriangle,
  FaSpinner 
} from "react-icons/fa";
import { getHolidays } from "../../../service/holidayService";
import dayjs from "dayjs";

const UpcomingHolidaysCard = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const resData = await getHolidays(); 

      if (resData.success) {
        setHolidays(resData.data || []);
      } else {
        setErrorMsg(resData.message || "Failed to fetch holidays");
      }
    } catch (error) {
      setErrorMsg(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchHolidayData();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1 
      }}
      className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 
                 h-fit min-h-[280px] sm:min-h-[320px]
                 p-4 sm:p-5 lg:p-6
                 rounded-xl sm:rounded-2xl
                 shadow-sm hover:shadow-lg
                 border border-gray-100 dark:border-gray-700/50
                 bg-gradient-to-br from-white via-gray-50/50 to-white
                 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900
                 backdrop-blur-sm
                 transition-all duration-300 ease-out
                 hover:scale-[1.02] hover:border-blue-200 dark:hover:border-blue-700/50
                 group overflow-hidden"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-4 sm:mb-6"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                         text-blue-600 dark:text-blue-400 
                         group-hover:scale-110 transition-transform duration-200">
            <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold 
                        bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                        dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 
                        bg-clip-text text-transparent">
            Upcoming Holidays
          </h2>
        </div>
        
        {!loading && !errorMsg && holidays.length > 0 && (
          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRetry}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 
                      dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20
                      transition-all duration-200"
            aria-label="Refresh holidays"
          >
            <FaSync className="w-4 h-4" />
          </motion.button>
        )}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-32 sm:h-40 lg:h-48"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <FaSpinner className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            </motion.div>
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium"
            >
              Loading holidays...
            </motion.p>
          </motion.div>
        ) : errorMsg ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center text-center py-6 sm:py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="p-3 sm:p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4"
            >
              <FaExclamationTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 dark:text-red-400" />
            </motion.div>
            <p className="text-sm sm:text-base text-red-600 dark:text-red-400 font-medium mb-4">
              {errorMsg}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 
                        hover:bg-red-600 rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : holidays.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center text-center py-6 sm:py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-gray-700/50 mb-4"
            >
              <FaRegCalendarTimes className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" />
            </motion.div>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
              No upcoming holidays found
            </p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">
              Check back later for updates
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="holidays"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto overflow-x-hidden
                      scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
                      scrollbar-track-transparent pr-3
                         [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
                      "
          >
            {holidays.map((holiday, index) => (
              <motion.div
                key={holiday.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group/item p-3 sm:p-4 
                          rounded-lg sm:rounded-xl
                          border border-gray-200/60 dark:border-gray-600/40
                          bg-gradient-to-r from-white via-gray-50/30 to-white
                          dark:from-gray-700/30 dark:via-gray-800/20 dark:to-gray-700/30
                          hover:border-blue-200 dark:hover:border-blue-600/50
                          hover:shadow-md hover:bg-blue-50/30 dark:hover:bg-blue-900/10
                          transition-all duration-300 ease-out
                          backdrop-blur-sm overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold 
                                  text-gray-900 dark:text-gray-100 
                                  truncate pr-2 break-words
                                  group-hover/item:text-blue-700 dark:group-hover/item:text-blue-300
                                  transition-colors duration-200">
                      {holiday.name || "Untitled Holiday"}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 shrink-0">
                        {holiday.date
                          ? dayjs(holiday.date).format("MMM DD, YYYY")
                          : "No Date"}
                      </p>
                      <div className="flex items-center shrink-0">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                          ${holiday.recurring 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                          {holiday.recurring ? "Recurring" : "One-Time"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UpcomingHolidaysCard;