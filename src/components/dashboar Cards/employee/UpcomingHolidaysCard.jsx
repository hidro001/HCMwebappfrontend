import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCalendarTimes } from 'react-icons/fa';

const UpcomingHolidaysCard = () => {
  return (
    <motion.div
      // Fade/slide animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Card container with Tailwind classes
      className="max-w-sm w-full p-5 rounded-lg shadow-lg
                 bg-white dark:bg-slate-800 
                 text-gray-800 dark:text-gray-100"
    >
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6">
        Upcoming Holidays
      </h2>

      {/* Empty state illustration and message */}
      <div className="flex flex-col items-center justify-center text-center my-6">
        {/* Placeholder icon (replace with any illustration or image) */}
        <FaRegCalendarTimes className="text-gray-300 dark:text-gray-500 w-16 h-16 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          Uh oh! No holidays to show.
        </p>
      </div>
    </motion.div>
  );
};

export default UpcomingHolidaysCard;
