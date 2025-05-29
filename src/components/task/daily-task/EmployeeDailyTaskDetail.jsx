import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDailyTasksByEmployeeId } from "../../../service/taskService";
import { toast, Toaster } from "react-hot-toast";

const EmployeeDailyTaskDetail = () => {
  const { employeeId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadEmployeeDailyTasks = async () => {
      try {
        const fetchedTasks = await fetchDailyTasksByEmployeeId(employeeId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching employee daily tasks:", error);
        toast.error("Failed to fetch daily tasks.");
      }
    };

    loadEmployeeDailyTasks();
  }, [employeeId]);

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTasks = tasks.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Toaster />

      <h2 className="text-xl font-bold mb-4">
        Daily Tasks for Employee ID: {employeeId}
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-3">S.L</th>
              <th className="p-3">Tasks</th>
              <th className="p-3">Task Date</th>           
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No daily tasks available.
                </td>
              </tr>
            ) : (
              paginatedTasks.map((task, index) => (
                <tr key={task.task_Id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3">
                    <ul>
                      {task.task.map((taskItem, idx) => (
                        <li key={idx}>• {taskItem}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3">{task.task_Date}</td>          
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {tasks.length > pageSize && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDailyTaskDetail;
