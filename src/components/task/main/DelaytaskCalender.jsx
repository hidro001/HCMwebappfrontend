import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DelaytaskCalender({ tasks, loading }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Filter tasks to show only "Not Started" and "In Progress"
  const delayedTasks = tasks.filter(
    (task) => task.status === "Not Started" || task.status === "In Progress"
  );

  // Functions to navigate months
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start p-6">
      {/* Delayed Tasks Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-2/3">
        <h2 className="text-xl font-semibold mb-4">Delayed Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                <th className="py-3 px-4 text-gray-600 dark:text-gray-300">EMP ID</th>
                <th className="px-4">Department</th>
                <th className="px-4">Date</th>
                <th className="px-4">Status</th>
                <th className="px-4">Assigned Manager</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-4 py-3 text-center" colSpan="5">Loading...</td></tr>
              ) : delayedTasks.length > 0 ? (
                delayedTasks.map((task, index) => (
                  <tr key={task._id} className="border-b border-gray-300 dark:border-gray-700 text-center">
                    <td className="px-4 py-3">{task.assignedToEmployeeId}</td>
                    <td className="px-4">{task.selectedDepartment || "-"}</td>
                    <td className="px-4">{format(new Date(task.dueDate), "dd MMM yyyy")}</td>
                    <td className="px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                        ${task.status === "Not Started" ? "bg-yellow-100 text-yellow-600" :
                          task.status === "In Progress" ? "bg-blue-100 text-blue-600" : ""}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4">{task.assignedByName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3" colSpan="5">No delayed tasks available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/dashboard/assigned-task" className="text-blue-500 cursor-pointer hover:underline font-medium">
            See All →
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <FiChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <button onClick={nextMonth} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <FiChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-gray-500 dark:text-gray-400 font-medium mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center">
          {days.map((day, index) => (
            <div key={index} className={`p-2 rounded-full ${isSameMonth(day, monthStart) ? "text-gray-900 dark:text-gray-100" : "text-gray-400"} 
              ${isToday(day) ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"}`}>
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
