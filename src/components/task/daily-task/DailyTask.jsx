import { useState, useEffect, useCallback, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addTask,
  fetchAllTasks,
  deleteTask,
  updateTaskdaily,
} from "../../../service/taskService";
import { toast } from "react-hot-toast";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCalendar,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiList,
  FiRefreshCw,
  FiAlertCircle,
  FiGrid,
  FiSearch,
  FiFilter,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

export default function UpdateTask() {
  // Task input state (for form)
  const [taskList, setTaskList] = useState([""]);

  // All tasks fetched from server
  const [fetchedTasks, setFetchedTasks] = useState([]);

  // Filtered tasks based on date
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Date filter state
  const [filterDate, setFilterDate] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading state (for fetch, add, update, delete)
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const tasksPerPage = 10; // Display 5 tasks per page

  // Edit mode tracking
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // View mode (list or grid)
  const [viewMode, setViewMode] = useState("list");

  // Theme toggle

  // Search term
  const [searchTerm, setSearchTerm] = useState("");



  // 1. Fetch tasks from the API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllTasks();
      if (res && res.success) {
        setFetchedTasks(res.data);
      } else {
        toast.error(res?.message || "Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Additional toast in service file if needed
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 2. Filter and search tasks
  useEffect(() => {
    let filtered = fetchedTasks;

    // Apply date filter
    if (filterDate) {
      filtered = filtered.filter((item) => item.task_Date === filterDate);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.task.some((task) =>
          task.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredTasks(filtered);

    // Reset pagination to page 1 whenever filter changes
    setCurrentPage(1);
    setManualPage(1);
  }, [fetchedTasks, filterDate, searchTerm]);

  // 3. Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const totalItems = filteredTasks.length;
  const startIndex = indexOfFirstTask;

  // Move to a different page
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    setManualPage(pageNum);
  };

  // Open modal for adding new task
  const openAddTaskModal = () => {
    setTaskList([""]);
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(true);
  };

  // Handlers for the form's input fields
  const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);

  const handleDeleteTaskInput = (index) => {
    setTaskList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    setTaskList((prev) => prev.map((task, i) => (i === index ? value : task)));
  };

  // If user decides to cancel edit
  const handleCancelEdit = () => {
    setTaskList([""]);
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(false);
    toast("Task operation cancelled", {
      icon: "🔄",
      style: {
        borderRadius: "12px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // 4. Submitting the form: add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nonEmptyTasks = taskList.filter((task) => task.trim().length > 0);
    if (nonEmptyTasks.length === 0) {
      toast.error("Please enter at least one non-empty task.");
      return;
    }

    const payload = { task: nonEmptyTasks };
    setLoading(true);

    try {
      if (editMode && editTaskId) {
        // If in edit mode, update the existing task
        const res = await updateTaskdaily(editTaskId, payload);
        if (res.success) {
          toast.success(res.message || "Task updated successfully!");
          // Reset the form and exit edit mode
          setTaskList([""]);
          setEditMode(false);
          setEditTaskId(null);
          setIsModalOpen(false);
          fetchTasks();
        } else {
          toast.error(res.message || "Failed to update the task.");
        }
      } else {
        // Not in edit mode => add new task
        const result = await addTask(payload);
        if (result.success) {
          toast.success(result.message || "Tasks submitted successfully!");
          // Clear the form
          setTaskList([""]);
          setIsModalOpen(false);
          fetchTasks();
        } else {
          toast.error(result.message || "Submission failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Deleting a task from the table
  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    setLoadingId(taskId);
    try {
      const res = await deleteTask(taskId);
      if (res.success) {
        toast.success(res.message || "Task deleted successfully!");
        fetchTasks();
      } else {
        toast.error(res.message || "Failed to delete the task.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  // 6. Editing a task from the table
  const handleUpdateClick = (item) => {
    // 'item.task' is an array of strings.
    // Populate 'taskList' for the form.
    setTaskList(item.task);
    setEditTaskId(item._id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterDate("");
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100  transition-all duration-300 ease-in-out">
      {/* Glassmorphism header */}
      <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg p-2 shadow-lg">
                <FiList className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                Daily Task Manager
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchTasks}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-indigo-600 dark:text-indigo-400"
                title="Refresh tasks"
              >
                <FiRefreshCw
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={openAddTaskModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <FiPlus className="mr-2 -ml-1 h-5 w-5" />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="filterDate"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-auto"
                />
              </div>

              {(filterDate || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiX className="mr-1 -ml-1 h-4 w-4" />
                  Clear
                </button>
              )}

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="List view"
                >
                  <FiList className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="Grid view"
                >
                  <FiGrid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List with Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 py-4 px-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FiList className="mr-2" /> Your Tasks
              {(filterDate || searchTerm) && (
                <span className="ml-2 text-sm font-normal bg-white/20 px-2 py-0.5 rounded-full">
                  {filterDate && searchTerm
                    ? "Filtered & Searched"
                    : filterDate
                    ? "Date Filtered"
                    : "Searched"}
                </span>
              )}
            </h2>
          </div>

          <div className="p-0">
            {loading && !loadingId ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Loading your tasks...
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`page-${currentPage}-${viewMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTasks.length > 0 ? (
                    <>
                      {viewMode === "list" ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  No.
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Task Details
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {currentTasks.map((item, index) => (
                                <motion.tr
                                  key={item._id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                                      {index + 1 + startIndex}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="space-y-1">
                                      {item.task &&
                                        item.task.map((t, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                          >
                                            <span className="h-5 w-5 mr-2 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-300 shrink-0 mt-0.5">
                                              {idx + 1}
                                            </span>
                                            <span>{t}</span>
                                          </div>
                                        ))}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {item.task_Date ? (
                                      <div className="flex items-center">
                                        <FiCalendar className="mr-1 text-indigo-500 dark:text-indigo-400" />
                                        {item.task_Date}
                                      </div>
                                    ) : (
                                      <span className="text-gray-400 dark:text-gray-500 italic flex items-center">
                                        <FiAlertCircle className="mr-1" /> No
                                        date set
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                      <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                        onClick={() => handleUpdateClick(item)}
                                      >
                                        <FiEdit2 className="mr-1" /> Edit
                                      </button>
                                      <button
                                        type="button"
                                        disabled={loadingId === item._id}
                                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                        onClick={() =>
                                          handleDeleteTask(item._id)
                                        }
                                      >
                                        {loadingId === item._id ? (
                                          <FiRefreshCw className="mr-1 animate-spin" />
                                        ) : (
                                          <FiTrash2 className="mr-1" />
                                        )}
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // Grid View
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                          {currentTasks.map((item, index) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                            >
                              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 flex justify-between items-center">
                                <span className="text-white font-medium flex items-center">
                                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-xs text-indigo-600 mr-2">
                                    {index + 1 + startIndex}
                                  </span>
                                  {item.task_Date ? (
                                    <span className="flex items-center text-sm">
                                      <FiCalendar className="mr-1" />{" "}
                                      {item.task_Date}
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-sm opacity-70">
                                      <FiAlertCircle className="mr-1" /> No date
                                    </span>
                                  )}
                                </span>
                                <div className="flex space-x-1">
                                  <button
                                    type="button"
                                    className="p-1.5 rounded bg-white/20 text-white hover:bg-white/30 transition-colors"
                                    onClick={() => handleUpdateClick(item)}
                                  >
                                    <FiEdit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={loadingId === item._id}
                                    className="p-1.5 rounded bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50"
                                    onClick={() => handleDeleteTask(item._id)}
                                  >
                                    {loadingId === item._id ? (
                                      <FiRefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <FiTrash2 className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="space-y-2">
                                  {item.task &&
                                    item.task.map((t, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                      >
                                        <span className="h-5 w-5 mr-2 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-300 shrink-0 mt-0.5">
                                          {idx + 1}
                                        </span>
                                        <span>{t}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-20 flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4">
                        <FiList className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-1">
                        No tasks found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {filterDate || searchTerm
                          ? "Try clearing your filters or "
                          : ""}
                        Add your first task using the button above!
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="py-4 px-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {Math.min(indexOfLastTask, totalItems)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {totalItems}
                    </span>{" "}
                    tasks
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                    >
                      <FiChevronLeft className="mr-1" /> Prev
                    </button>

                    <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={manualPage}
                        onChange={(e) =>
                          setManualPage(parseInt(e.target.value) || "")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") goToPage(Number(manualPage));
                        }}
                        onBlur={() => goToPage(Number(manualPage))}
                        className="w-12 text-center border-none py-1.5 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      />
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1.5 text-gray-500 dark:text-gray-400 text-sm">
                        / {totalPages}
                      </span>
                    </div>

                    <button
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => goToPage(currentPage + 1)}
                    >
                      Next <FiChevronRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => handleCancelEdit()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white flex items-center"
                    >
                      {editMode ? (
                        <>
                          <FiEdit2 className="mr-2" /> Edit Task
                        </>
                      ) : (
                        <>
                          <FiPlus className="mr-2" /> Add New Task
                        </>
                      )}
                    </Dialog.Title>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                      <AnimatePresence>
                        {taskList.map((task, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 group"
                          >
                            <div className="flex items-center mb-2">
                              <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mr-2">
                                {index + 1}
                              </div>
                              <label
                                htmlFor={`task-${index}`}
                                className="font-medium text-gray-700 dark:text-gray-300"
                              >
                                Task {index + 1}
                              </label>
                              {taskList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTaskInput(index)}
                                  className="ml-auto text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                  title="Delete this task input"
                                >
                                  <FiTrash2 />
                                </button>
                              )}
                            </div>
                            <textarea
                              id={`task-${index}`}
                              value={task}
                              onChange={(e) =>
                                handleChange(index, e.target.value)
                              }
                              placeholder="What needs to be done?"
                              rows={2}
                              className="block w-full rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-500 resize-none shadow-sm transition-all duration-200"
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex flex-row-reverse gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <FiRefreshCw className="animate-spin mr-2" />
                        ) : editMode ? (
                          <FiCheck className="mr-2" />
                        ) : (
                          <FiPlus className="mr-2" />
                        )}
                        {editMode ? "Update Task" : "Add Task"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <FiX className="mr-2" /> Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleAddTaskInput}
                        className="flex items-center mr-auto px-4 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiPlus className="mr-1" /> Add Another Task
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
