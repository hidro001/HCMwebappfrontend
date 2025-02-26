import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";
import AssignTask from "./AssignTask"; // Updated AssignTask for adding tasks
import AssignedTaskModal from "./AssignedTaskModal"; // View Task
import AssignedTaskEdit from "./AssignedTaskEdit"; // Edit Task
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import { deleteTasks, fetchTasks } from "../../../service/taskService";
import { toast } from "react-hot-toast";

const AssignedTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const tasksPerPage = 10;

  // For dark mode handling
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Function to refresh tasks from the server.
  const refreshTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  // Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const totalItems = tasks.length;

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  // Delete Handler
  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setConfirmDelete(true);
  };

  const confirmDeleteTask = async () => {
    if (!deleteTaskId) return;
    const result = await deleteTasks(deleteTaskId);
    if (result !== null) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deleteTaskId));
      toast.success("Task deleted successfully!");
    } else {
      toast.error("Failed to delete task.");
    }
    setConfirmDelete(false);
    setDeleteTaskId(null);
  };

  // Open View Task Modal
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  // Open Edit Task Modal
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assigned Task</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Assign Task
        </button>
      </div>

      {/* Assign Task Modal */}
      {isModalOpen && (
        <AssignTask onClose={() => setIsModalOpen(false)} onAddSuccess={refreshTasks} />
      )}

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 border dark:border-gray-700">S.L</th>
              <th className="p-3 border dark:border-gray-700">Emp ID</th>
              <th className="p-3 border dark:border-gray-700">Emp Name</th>
              <th className="p-3 border dark:border-gray-700">Assigned Date</th>
              <th className="p-3 border dark:border-gray-700">Due Date</th>
              <th className="p-3 border dark:border-gray-700">Priority</th>
              <th className="p-3 border dark:border-gray-700">Status</th>
              <th className="p-3 border dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-3 text-center">
                  No data available.
                </td>
              </tr>
            ) : (
              currentTasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="text-center hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-3 border dark:border-gray-700">
                    {index + 1 + indexOfFirstTask}
                  </td>
                  <td className="p-3 border text-blue-600 dark:border-gray-700">
                    {task.assignedToEmployeeId}
                  </td>
                  <td className="p-3 border dark:border-gray-700">{task.assignedByName}</td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.createdAt).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {new Date(task.dueDate).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td
                    className={`p-3 border dark:border-gray-700 font-semibold ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200"
                          : task.status === "In Progress"
                          ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200"
                          : "bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-200"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 border dark:border-gray-700 flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                      onClick={() => handleViewTask(task)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                      onClick={() => handleEditTask(task)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
        <span className="text-sm mb-2 sm:mb-0">
          Showing {indexOfFirstTask + 1} to {Math.min(indexOfLastTask, totalItems)} of{" "}
          {totalItems} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum ? "bg-blue-500 text-white" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
          <span className="text-sm">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={manualPage}
            onChange={(e) => setManualPage(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />
          <button
            onClick={() => goToPage(Number(manualPage))}
            className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Go
          </button>
        </div>
      </div>

      {/* View Task Modal */}
      {isViewOpen && (
        <AssignedTaskModal
          task={selectedTask}
          onClose={() => setIsViewOpen(false)}
        />
      )}

      {/* Edit Task Modal */}
      {isEditOpen && (
        <AssignedTaskEdit
          task={selectedTask}
          onClose={() => setIsEditOpen(false)}
          onEditSuccess={refreshTasks}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDeleteTask}
        onCancel={() => setConfirmDelete(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default AssignedTask;
