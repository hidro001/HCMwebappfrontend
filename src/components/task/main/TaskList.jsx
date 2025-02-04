import React from "react";
import { Link } from "react-router-dom";

export default function TaskList({ tasks = [], loading }) {
  // Ensure tasks is an array before using .slice()
  const safeTasks = Array.isArray(tasks) ? tasks.slice(-5) : [];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task List</h2>
        <Link to="/dashboard/assigned-task" className="text-blue-500 cursor-pointer hover:underline font-medium">
          See All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="px-4 text-left">Emp ID</th>
              <th className="px-4 text-left">Due Date</th>
              <th className="px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">Loading...</td>
              </tr>
            ) : safeTasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">No data available.</td>
              </tr>
            ) : (
              safeTasks.map((task, index) => (
                <tr key={index} className="border-b border-gray-300 dark:border-gray-700">
                  <td className="px-4 py-3">{task.name || "N/A"}</td>
                  <td className="px-4">{task.assignedToEmployeeId || "N/A"}</td>
                
                  <td className="px-4">  {new Date(task.dueDate || "N/A").toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                  <td className="px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                      ${task.status === "Completed" ? "bg-green-100 text-green-600" :
                        task.status === "Pending" || task.status === "On Hold" ? "bg-yellow-100 text-yellow-600" :
                        "bg-red-100 text-red-600"}`}>
                      {task.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
