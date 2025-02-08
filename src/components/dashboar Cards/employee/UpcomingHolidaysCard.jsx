
// import { motion } from 'framer-motion';
// import { FaRegCalendarTimes } from 'react-icons/fa';

// const UpcomingHolidaysCard = () => {
//   return (
//     <motion.div
//       // Fade/slide animation
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       // Card container with Tailwind classes
//       className="max-w-sm w-full p-5 rounded-lg shadow-lg
//                  bg-white dark:bg-slate-800 
//                  text-gray-800 dark:text-gray-100"
//     >
//       {/* Header */}
//       <h2 className="text-xl font-semibold mb-6">
//         Upcoming Holidays
//       </h2>

//       {/* Empty state illustration and message */}
//       <div className="flex flex-col items-center justify-center text-center my-6">
//         {/* Placeholder icon (replace with any illustration or image) */}
//         <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
//         <p className="text-gray-500 dark:text-gray-400">
//           Uh oh! No holidays to show.
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default UpcomingHolidaysCard;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegCalendarTimes } from "react-icons/fa";
import { getHolidays } from "../../../service/holidayService";
import dayjs from "dayjs"; // optional: for better date formatting

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
      // Example shape: { success: true, data: [{ id, name, date, recurring }] }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm w-full p-5 rounded-lg shadow-lg
                 bg-white dark:bg-slate-800 
                 text-gray-800 dark:text-gray-100"
    >
      <h2 className="text-xl font-semibold mb-6">Upcoming Holidays</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="text-gray-500 dark:text-gray-400">Loading...</span>
        </div>
      ) : errorMsg ? (
        <div className="flex flex-col items-center justify-center text-center my-6">
          <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
          <p className="text-red-500 dark:text-red-400">{errorMsg}</p>
        </div>
      ) : holidays.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center my-6">
          <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Uh oh! No holidays to show.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {holidays.map((holiday) => (
            <li
              key={holiday.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
            >
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                {holiday.name || "Untitled Holiday"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {holiday.date
                  ? dayjs(holiday.date).format("MMM DD, YYYY")
                  : "No Date"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {holiday.recurring ? "Recurring" : "One-Time"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default UpcomingHolidaysCard;
