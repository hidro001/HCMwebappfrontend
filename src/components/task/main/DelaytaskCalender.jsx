import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DelaytaskCalender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Function to navigate months
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
              {[
                { id: "R0001", dept: "IT-Development", date: "27 Mar 2024", status: "Pending", manager: "Nikunj", color: "bg-yellow-100 text-yellow-600" },
                { id: "R0002", dept: "Marketing", date: "27 Mar 2024", status: "On Hold", manager: "Amit", color: "bg-red-100 text-red-600" },
                { id: "R0003", dept: "Sales", date: "27 Mar 2024", status: "Pending", manager: "Akhilesh", color: "bg-yellow-100 text-yellow-600" },
                { id: "R0004", dept: "IT-Designing", date: "27 Mar 2024", status: "Pending", manager: "Sapna", color: "bg-yellow-100 text-yellow-600" },
                { id: "R0005", dept: "Finance", date: "27 Mar 2024", status: "On Hold", manager: "Nikhil", color: "bg-red-100 text-red-600" },
              ].map((task, index) => (
                <tr key={index} className="border-b border-gray-300 dark:border-gray-700 text-center">
                  <td className="px-4 py-3">{task.id}</td>
                  <td className="px-4">{task.dept}</td>
                  <td className="px-4">{task.date}</td>
                  <td className="px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${task.color}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4">{task.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-blue-500 mt-4 text-right cursor-pointer hover:underline font-medium">See All →</div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <FiChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
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
            <div key={index} className={`p-2 rounded-full ${isSameMonth(day, monthStart) ? "text-gray-900 dark:text-gray-100" : "text-gray-400"} ${isToday(day) ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"}`}>
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
