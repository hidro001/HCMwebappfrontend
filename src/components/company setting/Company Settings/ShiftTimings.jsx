// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
// import ShiftTimingModal from "./models/ShiftTimingModal";

// export default function ShiftTimings() {
//   const {
//     shiftTimings,
//     fetchShiftTimings,
//     addOrUpdateShiftTiming,
//     deleteShiftTiming,
//   } = useCompanySettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchShiftTimings();
//   }, [fetchShiftTimings]);

//   const handleSave = () => {
//     if (!name || !start || !end) {
//       toast.error("Please fill out all fields.");
//       return;
//     }
//     const payload = {
//       id: editId,
//       name,
//       startTime: start,
//       endTime: end,
//     };

//     console.log(payload, 'shift -timings')
//     addOrUpdateShiftTiming(payload);
//     setIsModalOpen(false);
//     setName("");
//     setStart("");
//     setEnd("");
//     setEditId(null);
//   };

//   const handleDelete = (id) => {
//     deleteShiftTiming(id);
//   };

//   const handleEditClick = (shift) => {
//     setEditId(shift.id);
//     setName(shift.name);
//     setStart(shift.startTime);
//     setEnd(shift.endTime);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setName("");
//     setStart("");
//     setEnd("");
//     setEditId(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Shift Timings
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Shift Timing
//         </button>
//       </div>
//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Start Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">End Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shiftTimings.map((st) => (
//             <tr key={st.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.startTime}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.endTime}</td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEditClick(st)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(st.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <ShiftTimingModal
//         isOpen={isModalOpen}
//         editId={editId}
//         name={name}
//         start={start}
//         end={end}
//         onNameChange={(e) => setName(e.target.value)}
//         onStartChange={(e) => setStart(e.target.value)}
//         onEndChange={(e) => setEnd(e.target.value)}
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
  FaClock,
  FaBusinessTime,
  FaSun,
  FaMoon,
  FaCalendarAlt,
  FaUsers,
  FaRegClock,
  FaPlayCircle,
  FaStopCircle,
  FaEye,
  FaSearch
} from "react-icons/fa";
import {
  HiClock,
  HiPlus,
  HiPencil,
  HiTrash,
  HiOutlineEye
} from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import ShiftTimingModal from "./models/ShiftTimingModal";

export default function ShiftTimings() {
  const {
    shiftTimings,
    fetchShiftTimings,
    addOrUpdateShiftTiming,
    deleteShiftTiming,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // cards or table

  useEffect(() => {
    fetchShiftTimings();
  }, [fetchShiftTimings]);

  const handleSave = () => {
    if (!name || !start || !end) {
      toast.error("Please fill out all fields.");
      return;
    }
    const payload = {
      id: editId,
      name,
      startTime: start,
      endTime: end,
    };

    console.log(payload, 'shift -timings')
    addOrUpdateShiftTiming(payload);
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteShiftTiming(id);
  };

  const handleEditClick = (shift) => {
    setEditId(shift.id);
    setName(shift.name);
    setStart(shift.startTime);
    setEnd(shift.endTime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const formatTime = (time) => {
    if (!time) return "Not set";
    try {
      const [hours, minutes] = time.split(':');
      const hour24 = parseInt(hours, 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  const getShiftDuration = (start, end) => {
    if (!start || !end) return "Unknown";
    try {
      const [startHours, startMinutes] = start.split(':').map(Number);
      const [endHours, endMinutes] = end.split(':').map(Number);
      
      let duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
      if (duration < 0) duration += 24 * 60; // Handle overnight shifts
      
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
    } catch {
      return "Unknown";
    }
  };

  const getShiftIcon = (start) => {
    if (!start) return FaClock;
    try {
      const hour = parseInt(start.split(':')[0], 10);
      if (hour >= 6 && hour < 12) return FaSun;
      if (hour >= 12 && hour < 18) return FaBusinessTime;
      if (hour >= 18 && hour < 22) return FaClock;
      return FaMoon;
    } catch {
      return FaClock;
    }
  };

  const filteredShifts = shiftTimings.filter(shift =>
    shift.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiClock className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Shift Timings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your organization's work shift schedules and timings
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search shift timings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Only show on desktop */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
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
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Shift Timing</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {filteredShifts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaClock className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm ? "No shifts found" : "No Shift Timings"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Create your first shift timing to get started"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add First Shift</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Cards View - Mobile and Tablet, or Desktop when cards selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredShifts.map((shift) => {
                      const ShiftIcon = getShiftIcon(shift.startTime);
                      return (
                        <motion.div
                          key={shift.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <ShiftIcon className="text-blue-600 dark:text-blue-400 text-xl" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {shift.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Duration: {getShiftDuration(shift.startTime, shift.endTime)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Time Details */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                  <FaPlayCircle className="text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Time</p>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {formatTime(shift.startTime)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                                  <FaStopCircle className="text-red-600 dark:text-red-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">End Time</p>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {formatTime(shift.endTime)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditClick(shift)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil className="text-sm" />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(shift.id)}
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

              {/* Table View - Desktop only when table selected */}
              <div className={`hidden lg:${viewMode === "table" ? "block" : "hidden"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Shift Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Start Time
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            End Time
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredShifts.map((shift) => {
                            const ShiftIcon = getShiftIcon(shift.startTime);
                            return (
                              <motion.tr
                                key={shift.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                      <ShiftIcon className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {shift.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {formatTime(shift.startTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {formatTime(shift.endTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                  {getShiftDuration(shift.startTime, shift.endTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleEditClick(shift)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(shift.id)}
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
      <ShiftTimingModal
        isOpen={isModalOpen}
        editId={editId}
        name={name}
        start={start}
        end={end}
        onNameChange={(e) => setName(e.target.value)}
        onStartChange={(e) => setStart(e.target.value)}
        onEndChange={(e) => setEnd(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </motion.div>
  );
}