// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
// import WorkingDaySystemModal from "./models/WorkingDaySystemModal";

// export default function WorkingDays() {
//   const {
//     workingDaySystem,
//     fetchWorkingDaySystems,
//     addOrUpdateWorkingDaySystem,
//     deleteLeaveSystem,
//   } = useCompanySettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sysName, setSysName] = useState("");
//   const [workingDays, setWorkingDays] = useState([]);
//   const [monthlyLeaves, setMonthlyLeaves] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchWorkingDaySystems();
//   }, [fetchWorkingDaySystems]);

//   const handleSave = () => {
//     if (!sysName || workingDays.length === 0 || monthlyLeaves === "") {
//       toast.error("Please fill out all fields for Working Day system.");
//       return;
//     }

//     const payload = {
//       id: editId,
//       name: sysName,
//       workingDays: workingDays.join(", "), 
//       monthlyPaidLeaves: monthlyLeaves,
//     };

//     addOrUpdateWorkingDaySystem(payload);
//     handleCloseModal();
//   };

//   const handleEdit = (ls) => {
//     setEditId(ls.id);
//     setSysName(ls.name);
//     const daysArray =
//       typeof ls.workingDays === "string"
//         ? ls.workingDays.split(",").map((d) => d.trim())
//         : ls.workingDays;

//     setWorkingDays(daysArray);
//     setMonthlyLeaves(ls.monthlyPaidLeaves);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     deleteLeaveSystem(id);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSysName("");
//     setWorkingDays([]);
//     setMonthlyLeaves("");
//     setEditId(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Working Days
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Working Days
//         </button>
//       </div>

//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Working Days</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">
//               Monthly Paid Leaves
//             </th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workingDaySystem.map((ls) => (
//             <tr key={ls.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{ls.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {Array.isArray(ls.workingDays)
//                   ? ls.workingDays.join(", ")
//                   : ls.workingDays}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {ls.monthlyPaidLeaves}
//               </td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(ls)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(ls.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <WorkingDaySystemModal
//         isOpen={isModalOpen}
//         editId={editId}
//         sysName={sysName}
//         workingDays={workingDays}
//         monthlyLeaves={monthlyLeaves}
//         onSysNameChange={(e) => setSysName(e.target.value)}
//         onWorkingDaysChange={setWorkingDays}
//         onMonthlyLeavesChange={(e) => setMonthlyLeaves(e.target.value)}
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
  FaCalendarWeek,
  FaSearch,
  FaClock,
  FaCalendarDay,
  FaBusinessTime,
  FaUmbrellaBeach,
  FaChartBar,
  FaUsers,
  FaRegCalendarAlt,
  FaSun,
  FaMoon,
  FaCalendarCheck
} from "react-icons/fa";
import {
  HiSun,
  HiPlus,
  HiPencil,
  HiTrash,
  HiCalendar,
  HiClock,
  HiUsers,
  HiChartBar
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import WorkingDaySystemModal from "./models/WorkingDaySystemModal";

export default function WorkingDays() {
  const {
    workingDaySystem,
    fetchWorkingDaySystems,
    addOrUpdateWorkingDaySystem,
    deleteLeaveSystem,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sysName, setSysName] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [monthlyLeaves, setMonthlyLeaves] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // cards or table

  useEffect(() => {
    fetchWorkingDaySystems();
  }, [fetchWorkingDaySystems]);

  const handleSave = () => {
    if (!sysName || workingDays.length === 0 || monthlyLeaves === "") {
      toast.error("Please fill out all fields for Working Day system.");
      return;
    }

    const payload = {
      id: editId,
      name: sysName,
      workingDays: workingDays.join(", "), 
      monthlyPaidLeaves: monthlyLeaves,
    };

    addOrUpdateWorkingDaySystem(payload);
    handleCloseModal();
  };

  const handleEdit = (ls) => {
    setEditId(ls.id);
    setSysName(ls.name);
    const daysArray =
      typeof ls.workingDays === "string"
        ? ls.workingDays.split(",").map((d) => d.trim())
        : ls.workingDays;

    setWorkingDays(daysArray);
    setMonthlyLeaves(ls.monthlyPaidLeaves);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteLeaveSystem(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSysName("");
    setWorkingDays([]);
    setMonthlyLeaves("");
    setEditId(null);
  };

  const getDayAbbreviation = (day) => {
    const dayMap = {
      'Monday': 'MON', 'Tuesday': 'TUE', 'Wednesday': 'WED', 
      'Thursday': 'THU', 'Friday': 'FRI', 'Saturday': 'SAT', 'Sunday': 'SUN'
    };
    return dayMap[day] || day.substring(0, 3).toUpperCase();
  };

  const getWorkingDaysArray = (workingDays) => {
    if (Array.isArray(workingDays)) return workingDays;
    if (typeof workingDays === 'string') {
      return workingDays.split(',').map(d => d.trim()).filter(d => d);
    }
    return [];
  };

  const getWorkingDaysPerWeek = (workingDays) => {
    const daysArray = getWorkingDaysArray(workingDays);
    return daysArray.length;
  };

  const getWorkScheduleType = (workingDays) => {
    const daysArray = getWorkingDaysArray(workingDays);
    const dayCount = daysArray.length;
    
    if (dayCount === 7) return { type: '7-Day', icon: FaSun, color: 'red' };
    if (dayCount === 6) return { type: '6-Day', icon: FaBusinessTime, color: 'orange' };
    if (dayCount === 5) return { type: '5-Day', icon: FaCalendarWeek, color: 'green' };
    if (dayCount === 4) return { type: '4-Day', icon: FaUmbrellaBeach, color: 'blue' };
    return { type: 'Custom', icon: FaCalendarDay, color: 'purple' };
  };

  const calculateMonthlyWorkingDays = (workingDays) => {
    const daysPerWeek = getWorkingDaysPerWeek(workingDays);
    const averageWeeksPerMonth = 4.33;
    return Math.round(daysPerWeek * averageWeeksPerMonth);
  };

  const filteredSystems = workingDaySystem.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSystems = workingDaySystem.length;
  const averageWorkingDays = workingDaySystem.length > 0 
    ? (workingDaySystem.reduce((sum, sys) => sum + getWorkingDaysPerWeek(sys.workingDays), 0) / workingDaySystem.length).toFixed(1)
    : 0;

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
                <HiCalendar className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalSystems}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Work Schedules
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <HiChartBar className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageWorkingDays}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Working Days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaUmbrellaBeach className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {workingDaySystem.reduce((sum, sys) => sum + parseInt(sys.monthlyPaidLeaves || 0), 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Monthly Leaves
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
                placeholder="Search working day systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                      ? "bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm"
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
                className="flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Working Days</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {filteredSystems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaCalendarWeek className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm ? "No systems found" : "No Working Day Systems"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Start by creating your first working day system"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Create First System</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredSystems.map((system) => {
                      const scheduleType = getWorkScheduleType(system.workingDays);
                      const ScheduleIcon = scheduleType.icon;
                      const workingDaysArray = getWorkingDaysArray(system.workingDays);
                      const monthlyWorkingDays = calculateMonthlyWorkingDays(system.workingDays);
                      
                      return (
                        <motion.div
                          key={system.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className={`bg-${scheduleType.color}-50 dark:bg-${scheduleType.color}-900/10 p-6 border-b border-gray-100 dark:border-gray-700`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-3 bg-${scheduleType.color}-100 dark:bg-${scheduleType.color}-900/20 rounded-lg`}>
                                  <ScheduleIcon className={`text-${scheduleType.color}-600 dark:text-${scheduleType.color}-400 text-xl`} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {system.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {scheduleType.type} Schedule
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Working Days Display */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <FaCalendarWeek className="text-blue-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Working Days ({workingDaysArray.length}/week)
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {workingDaysArray.map((day, index) => (
                                  <span
                                    key={index}
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${scheduleType.color}-100 text-${scheduleType.color}-800 dark:bg-${scheduleType.color}-900/20 dark:text-${scheduleType.color}-300`}
                                  >
                                    {getDayAbbreviation(day)}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                  <FaCalendarCheck className="text-green-500 text-sm" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Monthly</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  ~{monthlyWorkingDays}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Working Days</p>
                              </div>
                              
                              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                  <FaUmbrellaBeach className="text-purple-500 text-sm" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Leaves</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {system.monthlyPaidLeaves}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Per Month</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(system)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil className="text-sm" />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(system.id)}
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
                            System Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Working Days
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Schedule Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Monthly Leaves
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredSystems.map((system) => {
                            const scheduleType = getWorkScheduleType(system.workingDays);
                            const ScheduleIcon = scheduleType.icon;
                            const workingDaysArray = getWorkingDaysArray(system.workingDays);
                            
                            return (
                              <motion.tr
                                key={system.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className={`p-2 bg-${scheduleType.color}-100 dark:bg-${scheduleType.color}-900/20 rounded-lg`}>
                                      <ScheduleIcon className={`text-${scheduleType.color}-600 dark:text-${scheduleType.color}-400`} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {system.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1">
                                    {workingDaysArray.slice(0, 3).map((day, index) => (
                                      <span
                                        key={index}
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${scheduleType.color}-100 text-${scheduleType.color}-800 dark:bg-${scheduleType.color}-900/20 dark:text-${scheduleType.color}-300`}
                                      >
                                        {getDayAbbreviation(day)}
                                      </span>
                                    ))}
                                    {workingDaysArray.length > 3 && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                        +{workingDaysArray.length - 3}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${scheduleType.color}-100 text-${scheduleType.color}-800 dark:bg-${scheduleType.color}-900/20 dark:text-${scheduleType.color}-300`}>
                                    {scheduleType.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600 dark:text-purple-400">
                                  {system.monthlyPaidLeaves} days
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleEdit(system)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(system.id)}
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
      <WorkingDaySystemModal
        isOpen={isModalOpen}
        editId={editId}
        sysName={sysName}
        workingDays={workingDays}
        monthlyLeaves={monthlyLeaves}
        onSysNameChange={(e) => setSysName(e.target.value)}
        onWorkingDaysChange={setWorkingDays}
        onMonthlyLeavesChange={(e) => setMonthlyLeaves(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </motion.div>
  );
}