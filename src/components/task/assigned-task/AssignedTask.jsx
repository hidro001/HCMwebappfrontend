import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFileAlt, FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import AssignTask from "./AssignTask";
import AssignedTaskModal from "./AssignedTaskModal";  // View Task
import AssignedTaskEdit from "./AssignedTaskEdit"; // Edit Task
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

const AssignedTaskTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: "#526534",
      name: "Kathryn Murphy",
      assignedDate: "25 Jan 2024",
      dueDate: "25 Jan 2024",
      priority: "Low",
      status: "Done",
      department: "IT",
      assignee: "John Doe",
      description: "Complete the testing phase.",
    },
    {
      id: "#696589",
      name: "Annette Black",
      assignedDate: "25 Jan 2024",
      dueDate: "25 Jan 2024",
      priority: "Medium",
      status: "On Hold",
      department: "HR",
      assignee: "Jane Smith",
      description: "Prepare reports for Q1.",
    },
    {
      id: "#105986",
      name: "Leslie Alexander",
      assignedDate: "15 March 2024",
      dueDate: "15 March 2024",
      priority: "High",
      status: "Pending",
      department: "Finance",
      assignee: "David Johnson",
      description: "Review the audit reports.",
    },
  ]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Delete Handler
  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setConfirmDelete(true);
  };

  const confirmDeleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deleteTaskId));
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
      {isModalOpen && <AssignTask onClose={() => setIsModalOpen(false)} />}

   <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
      {/* Show select */}
      <div className="flex items-center">
        <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
        <select className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800" disabled>
          <option>10</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
        <FaSearch className="text-gray-400 mr-2" />
        <input type="text" placeholder="Search by Employee ID" className="w-full focus:outline-none dark:bg-gray-900" disabled value="" />
      </div>

      {/* Month + Department */}
      <div className="flex items-center gap-2 ml-auto">
        <input type="month" className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900" disabled value="2024-01" />

        <select className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900" disabled>
          <option>All Departments</option>
        </select>
      </div>

      {/* Export Buttons */}
      <div className="flex items-center gap-2">
        <button title="Export CSV" className="w-10 h-10 flex items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200" disabled>
          <FaFileAlt className="w-4 h-4" />
        </button>
        <button title="Export Excel" className="w-10 h-10 flex items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200" disabled>
          <FaFileExcel className="w-4 h-4" />
        </button>
        <button title="Export PDF" className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200" disabled>
          <FaFilePdf className="w-4 h-4" />
        </button>
        <button title="Print" className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200" disabled>
          <FaPrint className="w-4 h-4" />
        </button>
      </div>
    </div>
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
            {tasks.map((task, index) => (
              <tr key={task.id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-3 border dark:border-gray-700">{index + 1}</td>
                <td className="p-3 border text-blue-600 dark:border-gray-700">{task.id}</td>
                <td className="p-3 border dark:border-gray-700">{task.name}</td>
                <td className="p-3 border dark:border-gray-700">{task.assignedDate}</td>
                <td className="p-3 border dark:border-gray-700">{task.dueDate}</td>
                <td className={`p-3 border dark:border-gray-700 font-semibold ${
                  task.priority === "High" ? "text-red-600" :
                  task.priority === "Medium" ? "text-orange-500" : "text-green-600"
                }`}>
                  {task.priority}
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    task.status === "Done" ? "bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-200" :
                    task.status === "On Hold" ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-200" :
                    "bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200"
                  }`}>
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
                    onClick={() => handleDeleteClick(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Task Modal */}
      {isViewOpen && <AssignedTaskModal task={selectedTask} onClose={() => setIsViewOpen(false)} />}

      {/* Edit Task Modal */}
      {isEditOpen && <AssignedTaskEdit onClose={() => setIsEditOpen(false)} />}

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

export default AssignedTaskTable;
