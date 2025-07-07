import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes, FaCheck, FaTimes as FaCross, FaClock } from "react-icons/fa";


const BaseModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const getColorClasses = (color = "bg-gray-500") => {
  try {
    const base = color.replace("500", "");
    return {
      bg: `${base}100`, 
      text: `text-${base.slice(3)}800`, 
    };
  } catch {
    return {
      bg: "bg-gray-100",
      text: "text-gray-800",
    };
  }
};

const MyLeave = ({ leaves = [], isLoading = false }) => {


  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLeave, setSelectedLeave] = useState(null);


  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date) => date.toISOString().split("T")[0];

  const getLeavesForDate = (date) => {
    const dateStr = formatDate(date);
    const matchingLeaves = leaves.filter((leave) => {
      const from = formatDate(new Date(leave.leave_From));
      const to = formatDate(new Date(leave.leave_To || leave.leave_From));
      return dateStr >= from && dateStr <= to;
    });
    
    return matchingLeaves;
  };

  const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return <FaCheck className="w-3 h-3 text-green-600" />;
    case 'rejected':
      return <FaCross className="w-3 h-3 text-red-600" />;
    case 'pending':
      return <FaClock className="w-3 h-3 text-yellow-600" />;
    default:
      return <FaClock className="w-3 h-3 text-gray-600" />;
  }
};

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day),
      });
    }


    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push({
        day,
        isCurrentMonth: true,
        date,
        leaves: getLeavesForDate(date),
      });
    }

    const totalCells = Math.ceil(days.length / 7) * 7;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    for (let day = 1; days.length < totalCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day),
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const calendarDays = generateCalendarDays();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading calendar...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📅 {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => navigateMonth(-1)} 
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              Today
            </button>
            <button 
              onClick={() => navigateMonth(1)} 
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayInfo, index) => (
              <div
                key={index}
                className={`rounded-lg border p-2 min-h-[90px] flex flex-col gap-1 transition-colors ${
                  dayInfo.isCurrentMonth
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                }`}
              >
                <div
                  className={`text-xs font-semibold ${
                    dayInfo.isCurrentMonth ? "text-gray-800 dark:text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {dayInfo.day}
                </div>

                {/* Leave items */}
                {dayInfo.leaves?.map((leave, leaveIndex) => {
                  const { bg, text } = getColorClasses(leave.leaveType?.color);
                  return (
                    <div
                      key={leave._id || leaveIndex}
                      onClick={() => setSelectedLeave(leave)}
                      className={`truncate text-xs px-2 py-1 rounded cursor-pointer font-medium transition-all hover:scale-105 ${bg} ${text} flex items-center justify-between`}
                      title={`${leave.leaveType?.name} - ${leave.leave_Status}`}
                    >
                      <span className="truncate">
                        {leave.leaveType?.name || "Leave"}
                        {leave.is_Half_Day && <span className="text-orange-600 ml-1">½</span>}
                      </span>
                      <span className="ml-1 flex-shrink-0">
                        {getStatusIcon(leave.leave_Status)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FaCheck className="w-3 h-3 text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-3 h-3 text-yellow-600" />
              <span className="text-gray-600 dark:text-gray-400">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCross className="w-3 h-3 text-red-600" />
              <span className="text-gray-600 dark:text-gray-400">Rejected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600 font-bold">½</span>
              <span className="text-gray-600 dark:text-gray-400">Half Day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Details Modal */}
      <AnimatePresence>
        {selectedLeave && (
          <BaseModal isOpen={true} onClose={() => setSelectedLeave(null)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Leave Details</h2>
                <button 
                  onClick={() => setSelectedLeave(null)} 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Leave Type
                  </label>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(selectedLeave.leaveType?.color).bg} ${getColorClasses(selectedLeave.leaveType?.color).text}`}>
                    {selectedLeave.leaveType?.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      From
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(selectedLeave.leave_From).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      To
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(selectedLeave.leave_To || selectedLeave.leave_From).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Duration
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedLeave.no_Of_Days} day(s)
                      {selectedLeave.is_Half_Day && <span className="text-orange-600 ml-1">(Half Day)</span>}
                    </p>
                  </div>
                </div>

                {selectedLeave.is_Half_Day && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Half-Day Session
                      </label>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {selectedLeave.half_Day_Session || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Half-Day Position
                      </label>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {selectedLeave.half_Day_Position || 'Not specified'}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Reason
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedLeave.reason_For_Leave}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Work Handover
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedLeave.workHandover || "Not specified"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Emergency Contact
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedLeave.emergencyContact}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Leave Category
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedLeave.is_Paid ? 'Paid Leave' : 'Unpaid Leave'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedLeave.leave_Status)}
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedLeave.leave_Status === "approved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : selectedLeave.leave_Status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {selectedLeave.leave_Status.charAt(0).toUpperCase() + selectedLeave.leave_Status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </BaseModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLeave;