// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaRegCalendarTimes } from "react-icons/fa";
// import { getHolidays } from "../../../service/holidayService";
// import dayjs from "dayjs";

// const UpcomingHolidaysCard = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     fetchHolidayData();
//   }, []);

//   const fetchHolidayData = async () => {
//     try {
//       setLoading(true);
//       setErrorMsg("");

//       const resData = await getHolidays(); 
//       // Example shape: { success: true, data: [{ id, name, date, recurring }] }

//       if (resData.success) {
//         setHolidays(resData.data || []);
//       } else {
//         setErrorMsg(resData.message || "Failed to fetch holidays");
//       }
//     } catch (error) {
//       setErrorMsg(error.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-sm w-full p-5 rounded-lg shadow-lg
//                  bg-white dark:bg-slate-800 
//                  text-gray-800 dark:text-gray-100"
//     >
//       <h2 className="text-xl font-semibold mb-6">Upcoming Holidays</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-32">
//           <span className="text-gray-500 dark:text-gray-400">Loading...</span>
//         </div>
//       ) : errorMsg ? (
//         <div className="flex flex-col items-center justify-center text-center my-6">
//           <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
//           <p className="text-red-500 dark:text-red-400">{errorMsg}</p>
//         </div>
//       ) : holidays.length === 0 ? (
//         <div className="flex flex-col items-center justify-center text-center my-6">
//           <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
//           <p className="text-gray-500 dark:text-gray-400">
//             Uh oh! No holidays to show.
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-4">
//           {holidays.map((holiday) => (
//             <li
//               key={holiday.id}
//               className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
//             >
//               <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
//                 {holiday.name || "Untitled Holiday"}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 {holiday.date
//                   ? dayjs(holiday.date).format("MMM DD, YYYY")
//                   : "No Date"}
//               </p>
//               <p className="text-xs text-gray-400 dark:text-gray-500">
//                 {holiday.recurring ? "Recurring" : "One-Time"}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </motion.div>
//   );
// };

// export default UpcomingHolidaysCard;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCalendarTimes,
  FaCalendarAlt,
  FaSync,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { getHolidays } from "../../../service/holidayService"; // Your actual API
import dayjs from "dayjs"; // For date formatting

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

  const handleRetry = () => fetchHolidayData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-xl p-4 rounded-xl border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FaCalendarAlt />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Upcoming Holidays
          </h2>
        </div>

        {!loading && !errorMsg && holidays.length > 0 && (
          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRetry}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Refresh holidays"
          >
            <FaSync />
          </motion.button>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" className="flex flex-col items-center justify-center h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <FaSpinner className="w-8 h-8 text-blue-500" />
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading holidays...</p>
          </motion.div>
        ) : errorMsg ? (
          <motion.div key="error" className="flex flex-col items-center text-center py-6">
            <FaExclamationTriangle className="w-10 h-10 text-red-500 mb-4" />
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{errorMsg}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
            >
              Try Again
            </button>
          </motion.div>
        ) : holidays.length === 0 ? (
          <motion.div key="empty" className="text-center py-6">
            <FaRegCalendarTimes className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No upcoming holidays found</p>
          </motion.div>
        ) : (
          <motion.div
            key="holidays"
            className="space-y-3 max-h-80 overflow-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
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
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 transition"
              >
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{holiday.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dayjs(holiday.date).format("MMM DD, YYYY")}
                </p>
                <p className={`text-xs font-medium mt-1 ${
                  holiday.recurring
                    ? "text-green-700 dark:text-green-300"
                    : "text-blue-700 dark:text-blue-300"
                }`}>
                  {holiday.recurring ? "Recurring" : "One-Time"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UpcomingHolidaysCard;
