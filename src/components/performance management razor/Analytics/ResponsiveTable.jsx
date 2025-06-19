// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
// import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";

// const ResponsiveTable = ({
//   headers,      // array of { key: string, label: string }
//   rows,         // array of data objects
//   rowRenderer,  // function: row => [JSX cells…]
//   searchable = false,
//   sortable   = false,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode,  setViewMode]  = useState("table"); // "table" or "cards"
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   // 1) Filter by searchTerm
//   const filteredRows = useMemo(() => {
//     if (!searchTerm) return rows;
//     return rows.filter(row =>
//       rowRenderer(row).some(cell =>
//         String(cell).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [rows, searchTerm, rowRenderer]);

//   // 2) Sort if enabled
//   const sortedRows = useMemo(() => {
//     if (!sortable || !sortConfig.key) return filteredRows;
//     return [...filteredRows].sort((a, b) => {
//       const aVal = a[sortConfig.key];
//       const bVal = b[sortConfig.key];
//       if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredRows, sortConfig, sortable]);

//   return (
//     <div className="space-y-4">
//       {searchable && (
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="relative flex-1 max-w-md">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setViewMode("table")}
//               className={`p-2 rounded-lg ${
//                 viewMode === "table"
//                   ? "bg-indigo-100 text-indigo-600"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <HiOutlineViewList className="w-5 h-5" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setViewMode("cards")}
//               className={`p-2 rounded-lg ${
//                 viewMode === "cards"
//                   ? "bg-indigo-100 text-indigo-600"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <HiOutlineViewGrid className="w-5 h-5" />
//             </motion.button>
//           </div>
//         </div>
//       )}

//       {viewMode === "table" ? (
//         <div className="overflow-x-auto rounded-2xl border">
//           <table className="min-w-full divide-y">
//             <thead className="bg-gray-50">
//               <tr>
//                 {headers.map(({ key, label }, idx) => (
//                   <th
//                     key={idx}
//                     className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer"
//                     onClick={() => {
//                       if (!sortable) return;
//                       setSortConfig(curr => {
//                         if (curr.key === key) {
//                           return {
//                             key,
//                             direction: curr.direction === "asc" ? "desc" : "asc"
//                           };
//                         }
//                         return { key, direction: "asc" };
//                       });
//                     }}
//                   >
//                     <div className="inline-flex items-center space-x-1">
//                       <span>{label}</span>
//                       {sortable && sortConfig.key === key && (
//                         sortConfig.direction === "asc"
//                           ? <FiArrowUp className="w-3 h-3" />
//                           : <FiArrowDown className="w-3 h-3" />
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               <AnimatePresence>
//                 {sortedRows.map((row, rowIdx) => (
//                   <motion.tr
//                     key={rowIdx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ delay: rowIdx * 0.05 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     {rowRenderer(row).map((cell, cellIdx) => (
//                       <td
//                         key={cellIdx}
//                         className="px-6 py-4 whitespace-nowrap text-sm"
//                       >
//                         {cell}
//                       </td>
//                     ))}
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <AnimatePresence>
//             {sortedRows.map((row, idx) => {
//               const cells = rowRenderer(row);
//               return (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="bg-white/80 rounded-2xl p-4 border"
//                 >
//                   {headers.map(({ label }, i) => (
//                     <div key={i} className="mb-2 last:mb-0">
//                       <span className="text-xs font-medium uppercase tracking-wider">
//                         {label}:
//                       </span>
//                       <div className="text-sm font-medium mt-1">
//                         {cells[i]}
//                       </div>
//                     </div>
//                   ))}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResponsiveTable;



// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
// import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";

// const ResponsiveTable = ({
//   headers,      // array of { key: string, label: string }
//   rows,         // array of data objects
//   rowRenderer,  // function: row => [JSX cells…]
//   searchable = false,
//   sortable   = false,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode,  setViewMode]  = useState("table"); // "table" or "cards"
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   // 1) Filter by searchTerm
//   const filteredRows = useMemo(() => {
//     if (!searchTerm) return rows;
//     return rows.filter(row =>
//       rowRenderer(row).some(cell =>
//         String(cell).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [rows, searchTerm, rowRenderer]);

//   // 2) Sort if enabled
//   const sortedRows = useMemo(() => {
//     if (!sortable || !sortConfig.key) return filteredRows;
//     return [...filteredRows].sort((a, b) => {
//       const aVal = a[sortConfig.key];
//       const bVal = b[sortConfig.key];
//       if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredRows, sortConfig, sortable]);

//   return (
//     <div className="space-y-4 text-gray-800 bg-white dark:text-gray-200 dark:bg-gray-900">
//       {searchable && (
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="relative flex-1 max-w-md">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setViewMode("table")}
//               className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 viewMode === "table"
//                   ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
//                   : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
//               }`}
//             >
//               <HiOutlineViewList className="w-5 h-5" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setViewMode("cards")}
//               className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 viewMode === "cards"
//                   ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
//                   : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
//               }`}
//             >
//               <HiOutlineViewGrid className="w-5 h-5" />
//             </motion.button>
//           </div>
//         </div>
//       )}

//       {viewMode === "table" ? (
//         <div className="overflow-x-auto rounded-2xl border border-gray-300 dark:border-gray-600">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 {headers.map(({ key, label }, idx) => (
//                   <th
//                     key={idx}
//                     className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-700 dark:text-gray-300"
//                     onClick={() => {
//                       if (!sortable) return;
//                       setSortConfig(curr => {
//                         if (curr.key === key) {
//                           return {
//                             key,
//                             direction: curr.direction === "asc" ? "desc" : "asc"
//                           };
//                         }
//                         return { key, direction: "asc" };
//                       });
//                     }}
//                   >
//                     <div className="inline-flex items-center space-x-1">
//                       <span>{label}</span>
//                       {sortable && sortConfig.key === key && (
//                         sortConfig.direction === "asc"
//                           ? <FiArrowUp className="w-3 h-3" />
//                           : <FiArrowDown className="w-3 h-3" />
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//               <AnimatePresence>
//                 {sortedRows.map((row, rowIdx) => (
//                   <motion.tr
//                     key={rowIdx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ delay: rowIdx * 0.05 }}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     {rowRenderer(row).map((cell, cellIdx) => (
//                       <td
//                         key={cellIdx}
//                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
//                       >
//                         {cell}
//                       </td>
//                     ))}
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <AnimatePresence>
//             {sortedRows.map((row, idx) => {
//               const cells = rowRenderer(row);
//               return (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-300 dark:border-gray-600"
//                 >
//                   {headers.map(({ label }, i) => (
//                     <div key={i} className="mb-2 last:mb-0">
//                       <span className="text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
//                         {label}:
//                       </span>
//                       <div className="text-sm font-medium mt-1 text-gray-800 dark:text-gray-200">
//                         {cells[i]}
//                       </div>
//                     </div>
//                   ))}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResponsiveTable;


import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";

const ResponsiveTable = ({
  headers,      // array of { key: string, label: string }
  rows,         // array of data objects
  rowRenderer,  // function: row => [JSX cells…]
  searchable = false,
  sortable   = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode,  setViewMode]  = useState("table"); // "table" or "cards"
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 1) Filter by searchTerm
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter(row =>
      rowRenderer(row).some(cell =>
        String(cell).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm, rowRenderer]);

  // 2) Sort if enabled
  const sortedRows = useMemo(() => {
    if (!sortable || !sortConfig.key) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig, sortable]);

  return (
    <div className="space-y-4 text-gray-800 bg-white dark:text-gray-200 dark:bg-gray-900">
      {searchable && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                viewMode === "table"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              <HiOutlineViewList className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                viewMode === "cards"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              <HiOutlineViewGrid className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}

      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-300 dark:border-gray-600">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {headers.map(({ key, label }, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-700 dark:text-gray-300"
                    onClick={() => {
                      if (!sortable) return;
                      setSortConfig(curr => {
                        if (curr.key === key) {
                          return {
                            key,
                            direction: curr.direction === "asc" ? "desc" : "asc"
                          };
                        }
                        return { key, direction: "asc" };
                      });
                    }}
                  >
                    <div className="inline-flex items-center space-x-1">
                      <span>{label}</span>
                      {sortable && (
                        <>
                          <FiArrowUp
                            className={`w-3 h-3 transition-opacity ${
                              sortConfig.key === key && sortConfig.direction === "asc"
                                ? "text-gray-700 dark:text-gray-200"
                                : "text-gray-400 dark:text-gray-500"
                            }`} />
                          <FiArrowDown
                            className={`w-3 h-3 transition-opacity ${
                              sortConfig.key === key && sortConfig.direction === "desc"
                                ? "text-gray-700 dark:text-gray-200"
                                : "text-gray-400 dark:text-gray-500"
                            }`} />
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <AnimatePresence>
                {sortedRows.map((row, rowIdx) => (
                  <motion.tr
                    key={rowIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {rowRenderer(row).map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {sortedRows.map((row, idx) => {
              const cells = rowRenderer(row);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-300 dark:border-gray-600"
                >
                  {headers.map(({ label }, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <span className="text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                        {label}:
                      </span>
                      <div className="text-sm font-medium mt-1 text-gray-800 dark:text-gray-200">
                        {cells[i]}
                      </div>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ResponsiveTable;
