import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import BaseModal from "../common/BaseModal";
import useLeaveStore from "../../store/leaveStore.js";

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

const MyLeave = () => {
  const {
    leaves,
    isLoading,
    fetchLeaves,
    activeStatus,
    setActiveStatus,
    initializeData,
  } = useLeaveStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    initializeData?.();
    if (!activeStatus || activeStatus.toLowerCase() === "all") {
      fetchLeaves('all');
    } else {
      fetchLeaves('all');
    }
  }, [activeStatus]);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date) => date.toISOString().split("T")[0];

  const getLeavesForDate = (date) => {
    const dateStr = formatDate(date);
    return leaves.filter((leave) => {
      const from = formatDate(new Date(leave.leave_From));
      const to = formatDate(new Date(leave.leave_To || leave.leave_From));
      return dateStr >= from && dateStr <= to;
    });
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

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
     
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => navigateMonth(-1)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
              Today
            </button>
            <button onClick={() => navigateMonth(1)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaChevronRight className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

     
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayInfo, index) => (
              <div
                key={index}
                className={`rounded-lg border p-2 min-h-[90px] flex flex-col gap-1 ${
                  dayInfo.isCurrentMonth
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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

                {dayInfo.leaves?.map((leave) => {
                  const { bg, text } = getColorClasses(leave.leaveType?.color);
                  return (
                    <div
                      key={leave._id}
                      onClick={() => setSelectedLeave(leave)}
                      className={`truncate text-xs px-2 py-1 rounded cursor-pointer font-medium ${bg} ${text}`}
                    >
                      {leave.leaveType?.name || "Leave"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLeave && (
          <BaseModal isOpen={true} onClose={() => setSelectedLeave(null)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Leave Details</h2>
                <button onClick={() => setSelectedLeave(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Leave Type</label>
                  <div className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(selectedLeave.leaveType?.color).bg} ${getColorClasses(selectedLeave.leaveType?.color).text}`}>
                    {selectedLeave.leaveType?.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">From</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedLeave.leave_From).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">To</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedLeave.leave_To || selectedLeave.leave_From).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Duration</label>
                    <p className="text-gray-900 dark:text-white">{selectedLeave.no_Of_Days} day(s)</p>
                  </div>
                </div>

                {selectedLeave.is_Half_Day && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Half-Day Session</label>
                      <p className="text-gray-900 dark:text-white capitalize">{selectedLeave.half_Day_Session}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Half-Day Position</label>
                      <p className="text-gray-900 dark:text-white capitalize">{selectedLeave.half_Day_Position}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Reason</label>
                  <p className="text-gray-900 dark:text-white">{selectedLeave.reason_For_Leave}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Work Handover</label>
                  <p className="text-gray-900 dark:text-white">{selectedLeave.workHandover || "—"}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Emergency Contact</label>
                  <p className="text-gray-900 dark:text-white">{selectedLeave.emergencyContact}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Status</label>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
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
            </motion.div>
          </BaseModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLeave;
