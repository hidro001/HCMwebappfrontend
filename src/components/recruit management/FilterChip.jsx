// import React from 'react';

// function FilterChip({ label, selected, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 text-sm rounded-full border transition
//         ${
//           selected
//             ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
//             : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// }

// export default FilterChip;


import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

function FilterChip({ label, selected, onClick, color = 'blue' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 text-left
        ${selected 
          ? `bg-${color}-50 dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-800 text-${color}-800 dark:text-${color}-200 shadow-md` 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }
      `}
    >
      <span className={`font-medium text-sm ${selected ? 'pr-6' : ''}`}>
        {label}
      </span>
      
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute right-3 p-1 bg-${color}-600 rounded-full`}
        >
          <HiCheck className="text-white text-xs" />
        </motion.div>
      )}
      
      {/* Subtle hover indicator */}
      {!selected && (
        <div className="absolute right-3 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </motion.button>
  );
}

export default FilterChip;