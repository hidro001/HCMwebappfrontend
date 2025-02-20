import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiEdit, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from "../../../service/todoService";
import toast from "react-hot-toast";

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const AssignedTaskListCard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTasks();
  }, [filterDate]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(filterDate);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !newTime.trim()) return;

    const taskData = { title: newTask, dueTime: newTime, priority: newPriority };
    try {
      const response = await createTask(taskData);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("Task added successfully!");
        fetchTasks();
        resetForm();
      }
    } catch (error) {
      toast.error("Error creating task.");
    }
  };

  const handleEditTask = (id, title, dueTime, priority) => {
    setEditId(id);
    setNewTask(title);
    setNewTime(dueTime);
    setNewPriority(priority);
  };

  const handleUpdateTask = async () => {
    if (!editId || !newTask.trim() || !newTime.trim()) return;

    try {
      await updateTask(editId, { title: newTask, dueTime: newTime, priority: newPriority });
      toast.success("Task updated successfully!");
      fetchTasks();
      resetForm();
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    try {
      await updateTaskStatus(id, { isComplete: !currentStatus });
      toast.success("Task status updated!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setNewTask("");
    setNewTime("");
    setNewPriority("Medium");
  };

  const isDisabled = !newTask.trim() || !newTime.trim();

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >
      {/* Title & Date Filter Side by Side */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">📌 Daily To-Do List</h2>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <input
          type="text"
          placeholder="Task title..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 w-full"
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">✅ Low</option>
        </select>
        <button
          onClick={editId ? handleUpdateTask : handleAddTask}
          disabled={isDisabled}
          className={`p-2 rounded-md text-white transition w-full flex items-center justify-center ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : editId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editId ? "Update" : <FiPlus size={20} />}
        </button>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {currentTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">🎉 No tasks for this date!</p>
        ) : (
          currentTasks.map((task, index) => (
            <motion.div key={task._id} className="flex items-center py-3 space-x-3">
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => handleCheckboxChange(task._id, task.isComplete)}
                className="cursor-pointer"
              />
              <span className="text-gray-500 dark:text-gray-400 w-6">{index + 1 + indexOfFirstItem}.</span>
              <span className={`text-lg flex-1 break-words ${task.isComplete ? "line-through text-gray-400" : ""}`}>
                {task.title}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{task.dueTime}</span>
              {/* Edit & Delete Buttons */}
              <div className="flex items-center space-x-2">
                <button onClick={() => handleEditTask(task._id, task.title, task.dueTime, task.priority)} className="text-blue-500 hover:text-blue-700 transition">
                  <FiEdit size={18} />
                </button>
                <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:text-red-700 transition">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls (Hide when no tasks) */}
      {tasks.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 bg-gray-300 rounded disabled:opacity-50">
            <FiChevronLeft />
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 bg-gray-300 rounded disabled:opacity-50">
            <FiChevronRight />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AssignedTaskListCard;
