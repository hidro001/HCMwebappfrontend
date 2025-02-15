// DailyTask.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileAlt,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaEye,
  FaTrash,
  FaCommentDots,
} from "react-icons/fa";
import CommentModal from "./CommentModal";
import DailyTaskModal from "./DailyTaskModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { fetchManagerTasks } from "../../../service/taskService";
import { Toaster, toast } from "react-hot-toast";

const DailyTask = () => {
  // State for tasks and modals.
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentTask, setCommentTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  // New state variable for selected date (default "2025-02-04").
  const [selectedDate, setSelectedDate] = useState("2025-02-04");

  // Fetch tasks for the selected date.
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchManagerTasks(selectedDate);
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, [selectedDate]);

  // Handle task deletion.
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeleteTask(null);
    toast.success("Task deleted successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white transition-all">
      <Toaster /> {/* Global toaster for notifications */}

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">View Daily Task</h2>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Show select */}
        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Show
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800"
            disabled
          >
            <option>10</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Employee ID"
            className="w-full focus:outline-none dark:bg-gray-900"
            disabled
            value=""
          />
        </div>

        {/* Date Picker & Department */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Date Picker */}
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            />
          </div>

          {/* Department (disabled) */}
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            disabled
          >
            <option>All Departments</option>
          </select>
        </div>

        {/* Export Buttons */}
        {/* <div className="flex items-center gap-2">
          <button
            title="Export CSV"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
            disabled
          >
            <FaFileAlt className="w-4 h-4" />
          </button>
          <button
            title="Export Excel"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200"
            disabled
          >
            <FaFileExcel className="w-4 h-4" />
          </button>
          <button
            title="Export PDF"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
            disabled
          >
            <FaFilePdf className="w-4 h-4" />
          </button>
          <button
            title="Print"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200"
            disabled
          >
            <FaPrint className="w-4 h-4" />
          </button>
        </div> */}
      </div>

      {/* Task Table */}
      <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 transition-all">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-black dark:text-white">
                <th className="p-3">S.L</th>
                <th className="p-3">Emp ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Assigned Date</th>
                {/* <th className="p-3">Status</th> */}
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No data available.
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 text-blue-500 cursor-pointer">{task.employee_Id}</td>
                    <td className="p-3">{task.full_Name}</td>
                    <td className="p-3">{new Date(task.createdAt || "N/A").toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                    </td>
                    {/* <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          task.status === "Done"
                            ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200"
                            : task.status === "On Hold"
                            ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-200"
                            : "bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td> */}
                    <td className="p-3 flex gap-3">
                      <FaEye
                        size={20}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setSelectedTask(task)}
                      />
                      <FaCommentDots
                        size={20}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => setCommentTask(task)}
                      />
                      <FaTrash
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => setDeleteTask(task)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <DailyTaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
      <CommentModal task={commentTask} onClose={() => setCommentTask(null)} />
      <ConfirmationDialog
        open={!!deleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={() => handleDelete(deleteTask?.id)}
        onCancel={() => setDeleteTask(null)}
      />
    </div>
  );
};

export default DailyTask;
