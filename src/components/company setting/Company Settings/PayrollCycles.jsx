// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
// import PayrollCycleModal from "./models/PayrollCycleModal";

// export default function PayrollCycles() {
//   const {
//     payrollCycles,
//     fetchPayrollCycles,
//     addOrUpdatePayrollCycle,
//     deletePayrollCycle,
//   } = useCompanySettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cycleName, setCycleName] = useState("");
//   const [processingDate, setProcessingDate] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchPayrollCycles();
//   }, [fetchPayrollCycles]);

//   const handleSave = () => {
//     if (!cycleName || !processingDate) {
//       toast.error("Please fill out all fields.");
//       return;
//     }
//     const payload = {
//       id: editId,
//       name: cycleName,
//       processingDate,
//     };
//     addOrUpdatePayrollCycle(payload);
//     setIsModalOpen(false);
//     setCycleName("");
//     setProcessingDate("");
//     setEditId(null);
//   };

//   const handleEdit = (cycle) => {
//     setEditId(cycle.id);
//     setCycleName(cycle.name);
//     setProcessingDate(cycle.processingDate);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     deletePayrollCycle(id);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setCycleName("");
//     setProcessingDate("");
//     setEditId(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Payroll Cycles</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Payroll Cycle
//         </button>
//       </div>
//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Cycle Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Processing Date</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payrollCycles.map((c) => (
//             <tr key={c.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{c.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{c.processingDate}</td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(c)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(c.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <PayrollCycleModal
//         isOpen={isModalOpen}
//         editId={editId}
//         cycleName={cycleName}
//         processingDate={processingDate}
//         onCycleNameChange={(e) => setCycleName(e.target.value)}
//         onProcessingDateChange={(e) => setProcessingDate(e.target.value)}
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
  FaSearch,
  FaClock,
  FaCalendarDay,
  FaSync,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaRegCalendarCheck
} from "react-icons/fa";
import {
  HiCash,
  HiPlus,
  HiPencil,
  HiTrash,
  HiCalendar,
  HiClock,
  HiRefresh
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import PayrollCycleModal from "./models/PayrollCycleModal";

export default function PayrollCycles() {
  const {
    payrollCycles,
    fetchPayrollCycles,
    addOrUpdatePayrollCycle,
    deletePayrollCycle,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cycleName, setCycleName] = useState("");
  const [processingDate, setProcessingDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // cards or table

  useEffect(() => {
    fetchPayrollCycles();
  }, [fetchPayrollCycles]);

  const handleSave = () => {
    if (!cycleName || !processingDate) {
      toast.error("Please fill out all fields.");
      return;
    }
    const payload = {
      id: editId,
      name: cycleName,
      processingDate,
    };
    addOrUpdatePayrollCycle(payload);
    setIsModalOpen(false);
    setCycleName("");
    setProcessingDate("");
    setEditId(null);
  };

  const handleEdit = (cycle) => {
    setEditId(cycle.id);
    setCycleName(cycle.name);
    setProcessingDate(cycle.processingDate);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deletePayrollCycle(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCycleName("");
    setProcessingDate("");
    setEditId(null);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getDayOfMonth = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.getDate();
    } catch {
      return "?";
    }
  };

  const getNextProcessingDate = (processingDate) => {
    try {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const processingDay = getDayOfMonth(processingDate);
      
      // Create next processing date for current month
      let nextDate = new Date(currentYear, currentMonth, processingDay);
      
      // If the date has passed this month, move to next month
      if (nextDate < today) {
        nextDate = new Date(currentYear, currentMonth + 1, processingDay);
      }
      
      return nextDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return "Unknown";
    }
  };

  const getDaysUntilNext = (processingDate) => {
    try {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const processingDay = getDayOfMonth(processingDate);
      
      let nextDate = new Date(currentYear, currentMonth, processingDay);
      if (nextDate < today) {
        nextDate = new Date(currentYear, currentMonth + 1, processingDay);
      }
      
      const diffTime = nextDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      return `${diffDays} days`;
    } catch {
      return "Unknown";
    }
  };

  const getCycleFrequency = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('weekly')) return { icon: FaClock, color: 'blue', frequency: 'Weekly' };
    if (lowercaseName.includes('biweekly') || lowercaseName.includes('bi-weekly')) return { icon: HiClock, color: 'green', frequency: 'Bi-weekly' };
    if (lowercaseName.includes('monthly')) return { icon: FaCalendarAlt, color: 'purple', frequency: 'Monthly' };
    if (lowercaseName.includes('quarterly')) return { icon: FaChartLine, color: 'orange', frequency: 'Quarterly' };
    if (lowercaseName.includes('annual') || lowercaseName.includes('yearly')) return { icon: HiRefresh, color: 'red', frequency: 'Annual' };
    return { icon: HiCash, color: 'indigo', frequency: 'Custom' };
  };

  const filteredCycles = payrollCycles.filter(cycle =>
    cycle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <FaRegCalendarCheck className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {payrollCycles.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Cycles
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {payrollCycles.filter(c => getDaysUntilNext(c.processingDate) === "Today").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Due Today
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <FaExclamationTriangle className="text-orange-600 dark:text-orange-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {payrollCycles.filter(c => {
                    const days = getDaysUntilNext(c.processingDate);
                    return days !== "Today" && days !== "Unknown" && parseInt(days) <= 7;
                  }).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Due This Week
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
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search payroll cycles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Desktop only */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-yellow-600 dark:text-yellow-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-yellow-600 dark:text-yellow-400 shadow-sm"
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
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Payroll Cycle</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {filteredCycles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaCalendarAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm ? "No cycles found" : "No Payroll Cycles"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Start by creating your first payroll cycle"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Create First Cycle</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredCycles.map((cycle) => {
                      const cycleInfo = getCycleFrequency(cycle.name);
                      const CycleIcon = cycleInfo.icon;
                      const daysUntil = getDaysUntilNext(cycle.processingDate);
                      const nextDate = getNextProcessingDate(cycle.processingDate);
                      
                      return (
                        <motion.div
                          key={cycle.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className={`bg-${cycleInfo.color}-50 dark:bg-${cycleInfo.color}-900/10 p-6 border-b border-gray-100 dark:border-gray-700`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-3 bg-${cycleInfo.color}-100 dark:bg-${cycleInfo.color}-900/20 rounded-lg`}>
                                  <CycleIcon className={`text-${cycleInfo.color}-600 dark:text-${cycleInfo.color}-400 text-xl`} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {cycle.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {cycleInfo.frequency} Cycle
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Processing Date */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <FaCalendarDay className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processing Date</p>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {formatDate(cycle.processingDate)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                  <FaSync className="text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Processing</p>
                                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    {nextDate}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                  <FaClock className="text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Until Next</p>
                                  <p className={`text-lg font-semibold ${
                                    daysUntil === "Today" ? "text-red-600 dark:text-red-400" :
                                    daysUntil === "Tomorrow" ? "text-orange-600 dark:text-orange-400" :
                                    "text-gray-900 dark:text-gray-100"
                                  }`}>
                                    {daysUntil}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(cycle)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil className="text-sm" />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(cycle.id)}
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
                            Cycle Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Processing Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Next Processing
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Time Until Next
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredCycles.map((cycle) => {
                            const cycleInfo = getCycleFrequency(cycle.name);
                            const CycleIcon = cycleInfo.icon;
                            const daysUntil = getDaysUntilNext(cycle.processingDate);
                            const nextDate = getNextProcessingDate(cycle.processingDate);
                            
                            return (
                              <motion.tr
                                key={cycle.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className={`p-2 bg-${cycleInfo.color}-100 dark:bg-${cycleInfo.color}-900/20 rounded-lg`}>
                                      <CycleIcon className={`text-${cycleInfo.color}-600 dark:text-${cycleInfo.color}-400`} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {cycle.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {cycleInfo.frequency} Cycle
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {formatDate(cycle.processingDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                                  {nextDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    daysUntil === "Today" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" :
                                    daysUntil === "Tomorrow" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300" :
                                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                  }`}>
                                    {daysUntil}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleEdit(cycle)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(cycle.id)}
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
      <PayrollCycleModal
        isOpen={isModalOpen}
        editId={editId}
        cycleName={cycleName}
        processingDate={processingDate}
        onCycleNameChange={(e) => setCycleName(e.target.value)}
        onProcessingDateChange={(e) => setProcessingDate(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </motion.div>
  );
}