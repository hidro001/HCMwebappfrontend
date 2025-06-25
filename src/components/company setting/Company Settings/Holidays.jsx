// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
// import HolidayModal from "./models/HolidayModal";

// export default function Holidays() {
//   const { holidays, fetchHolidays, addOrUpdateHoliday, deleteHoliday } =
//     useCompanySettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [holidayName, setHolidayName] = useState("");
//   const [holidayDate, setHolidayDate] = useState("");
//   const [recurring, setRecurring] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchHolidays();
//   }, [fetchHolidays]);

//   const handleSave = () => {
//     if (!holidayName || !holidayDate) {
//       toast.error("Please fill out holiday name and date.");
//       return;
//     }
//     const payload = {
//       id: editId,
//       name: holidayName,
//       date: holidayDate,
//       recurring,
//     };
//     addOrUpdateHoliday(payload);
//     setIsModalOpen(false);
//     setHolidayName("");
//     setHolidayDate("");
//     setRecurring(false);
//     setEditId(null);
//   };

//   const handleEdit = (hol) => {
//     setEditId(hol.id);
//     setHolidayName(hol.name);
//     setHolidayDate(hol.date);
//     setRecurring(hol.recurring);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     deleteHoliday(id);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setHolidayName("");
//     setHolidayDate("");
//     setRecurring(false);
//     setEditId(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Holidays
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Declare Holidays
//         </button>
//       </div>
//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Date</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Recurring</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {holidays.map((h) => (
//             <tr key={h.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{h.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {h.date.split("T")[0]}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {h.recurring ? "Yes" : "No"}
//               </td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(h)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(h.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <HolidayModal
//         isOpen={isModalOpen}
//         editId={editId}
//         holidayName={holidayName}
//         holidayDate={holidayDate}
//         recurring={recurring}
//         onHolidayNameChange={(e) => setHolidayName(e.target.value)}
//         onHolidayDateChange={(e) => setHolidayDate(e.target.value)}
//         onRecurringChange={(e) => setRecurring(e.target.value === "true")}
//         onClose={handleCloseModal}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaGift,
  FaStar,
  FaGlobe,
  FaSearch,
  FaFilter,
  FaCalendarDay,
  FaSync,
  FaRegCalendarAlt,
  FaHeart,
  FaTree,
  FaSnowflake,
  FaBirthdayCake
} from "react-icons/fa";
import {
  HiCalendar,
  HiPlus,
  HiPencil,
  HiTrash,
  HiGift,
  HiRefresh
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import HolidayModal from "./models/HolidayModal";

export default function Holidays() {
  const { holidays, fetchHolidays, addOrUpdateHoliday, deleteHoliday } =
    useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, recurring, single
  const [viewMode, setViewMode] = useState("table"); // cards or table

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleSave = () => {
    if (!holidayName || !holidayDate) {
      toast.error("Please fill out holiday name and date.");
      return;
    }
    const payload = {
      id: editId,
      name: holidayName,
      date: holidayDate,
      recurring,
    };
    addOrUpdateHoliday(payload);
    setIsModalOpen(false);
    setHolidayName("");
    setHolidayDate("");
    setRecurring(false);
    setEditId(null);
  };

  const handleEdit = (hol) => {
    setEditId(hol.id);
    setHolidayName(hol.name);
    setHolidayDate(hol.date);
    setRecurring(hol.recurring);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteHoliday(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHolidayName("");
    setHolidayDate("");
    setRecurring(false);
    setEditId(null);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString.split("T")[0];
    }
  };

  const getMonthName = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long' });
    } catch {
      return 'Unknown';
    }
  };

  const getDaysUntil = (dateString) => {
    try {
      const today = new Date();
      const holidayDate = new Date(dateString);
      const currentYear = today.getFullYear();
      
      // Set the holiday to current year for comparison
      holidayDate.setFullYear(currentYear);
      
      // If the holiday has passed this year, check next year
      if (holidayDate < today) {
        holidayDate.setFullYear(currentYear + 1);
      }
      
      const diffTime = holidayDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      if (diffDays <= 7) return `In ${diffDays} days`;
      if (diffDays <= 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
      return `In ${Math.ceil(diffDays / 30)} months`;
    } catch {
      return "";
    }
  };

  const getHolidayIcon = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('christmas') || lowercaseName.includes('xmas')) return FaTree;
    if (lowercaseName.includes('birthday')) return FaBirthdayCake;
    if (lowercaseName.includes('valentine')) return FaHeart;
    if (lowercaseName.includes('new year')) return FaSnowflake;
    if (lowercaseName.includes('independence') || lowercaseName.includes('national')) return FaStar;
    return FaGift;
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
      (filterType === "recurring" && holiday.recurring) ||
      (filterType === "single" && !holiday.recurring);
    return matchesSearch && matchesFilter;
  });

  const upcomingHolidays = filteredHolidays
    .filter(h => getDaysUntil(h.date) !== "")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
    

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {holidays.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Holidays
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <HiRefresh className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {holidays.filter(h => h.recurring).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recurring Holidays
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <HiGift className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {upcomingHolidays.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upcoming Soon
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Holidays</option>
                  <option value="recurring">Recurring Only</option>
                  <option value="single">Single Events</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Desktop only */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Declare Holiday</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {filteredHolidays.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaCalendarAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm || filterType !== "all" ? "No holidays found" : "No Holidays Declared"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Start by declaring your first company holiday"}
              </p>
              {!searchTerm && filterType === "all" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Declare First Holiday</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredHolidays.map((holiday) => {
                      const HolidayIcon = getHolidayIcon(holiday.name);
                      const daysUntil = getDaysUntil(holiday.date);
                      return (
                        <motion.div
                          key={holiday.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-100 dark:border-gray-700 relative">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                  <HolidayIcon className="text-green-600 dark:text-green-400 text-xl" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                                    {holiday.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {getMonthName(holiday.date)}
                                  </p>
                                </div>
                              </div>
                              {holiday.recurring && (
                                <div className="absolute top-4 right-4">
                                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                    <FaSync className="text-blue-600 dark:text-blue-400 text-xs" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Date Info */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <FaCalendarDay className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {formatDate(holiday.date)}
                                  </p>
                                </div>
                              </div>

                              {daysUntil && (
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                    <FaRegCalendarAlt className="text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Occurrence</p>
                                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                      {daysUntil}
                                    </p>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                  <FaSync className="text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {holiday.recurring ? "Recurring" : "Single Event"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(holiday)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil className="text-sm" />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(holiday.id)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiTrash className="text-sm" />
                                <span>Delete</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Table View - Desktop only when selected */}
              <div className={`hidden lg:${viewMode === "table" ? "block" : "hidden"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Holiday Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Next Occurrence
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredHolidays.map((holiday) => {
                            const HolidayIcon = getHolidayIcon(holiday.name);
                            const daysUntil = getDaysUntil(holiday.date);
                            return (
                              <motion.tr
                                key={holiday.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                      <HolidayIcon className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {holiday.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {formatDate(holiday.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    {holiday.recurring && (
                                      <FaSync className="text-blue-500 text-xs" />
                                    )}
                                    <span className="text-sm text-gray-900 dark:text-gray-100">
                                      {holiday.recurring ? "Recurring" : "Single Event"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 dark:text-purple-400 font-medium">
                                  {daysUntil || "—"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleEdit(holiday)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(holiday.id)}
                                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiTrash className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <HolidayModal
        isOpen={isModalOpen}
        editId={editId}
        holidayName={holidayName}
        holidayDate={holidayDate}
        recurring={recurring}
        onHolidayNameChange={(e) => setHolidayName(e.target.value)}
        onHolidayDateChange={(e) => setHolidayDate(e.target.value)}
        onRecurringChange={(e) => setRecurring(e.target.value === "true")}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </motion.div>
  );
}