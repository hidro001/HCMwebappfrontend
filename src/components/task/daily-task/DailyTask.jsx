


import { useState, useEffect, useCallback } from "react";
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
  FiSearch,
} from "react-icons/fi";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import TaskModal from "./TaskModal";

export default function UpdateTask() {
  /* ---------- state ---------- */
  const todayString = new Date().toISOString().substring(0, 10);

  const [taskList, setTaskList] = useState([""]);
  const [taskDate, setTaskDate] = useState("");

  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const tasksPerPage = 10;

  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: () => {},
  });

  /* ---------- helpers ---------- */
  const openConfirmation = ({
    title,
    message,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
  }) => {
    setConfirmationData({ title, message, onConfirm, confirmText, cancelText });
    setConfirmationOpen(true);
  };
  const closeConfirmation = () => setConfirmationOpen(false);

  /* ---------- fetch ---------- */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllTasks();
      if (res?.success) setFetchedTasks(res.data);
      else toast.error(res?.message || "Failed to fetch tasks.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong fetching tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* ---------- filter ---------- */
  useEffect(() => {
    let list = fetchedTasks;
    if (filterDate) list = list.filter((t) => t.task_Date === filterDate);
    if (searchTerm)
      list = list.filter((t) =>
        t.task.some((x) =>
          x.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    setFilteredTasks(list);
    setCurrentPage(1);
    setManualPage(1);
  }, [fetchedTasks, filterDate, searchTerm]);

  /* ---------- pagination ---------- */
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const totalItems = filteredTasks.length;
  const startIndex = indexOfFirstTask;

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    setManualPage(p);
  };

  /* ---------- modal handlers ---------- */
  const openAddTaskModal = () => {
    setTaskList([""]);
    setTaskDate(todayString);
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setTaskList([""]);
    setTaskDate("");
    setEditMode(false);
    setEditTaskId(null);
    setIsModalOpen(false);
    toast("Task operation cancelled", {
      icon: "🔄",
      style: { borderRadius: "12px", background: "#333", color: "#fff" },
    });
  };

  const handleAddTaskInput = () => setTaskList((prev) => [...prev, ""]);
  const handleDeleteTaskInput = (idx) =>
    setTaskList((prev) => prev.filter((_, i) => i !== idx));
  const handleChange = (idx, val) =>
    setTaskList((prev) => prev.map((t, i) => (i === idx ? val : t)));

  /* ---------- submit ---------- */
  const doSubmitTask = async () => {
    const nonEmpty = taskList.filter((t) => t.trim().length);
    if (!nonEmpty.length) return toast.error("Please enter at least one task.");
    if (!taskDate) return toast.error("Please select a date for this task.");

    const payload = { task: nonEmpty, task_Date: taskDate };
    setLoading(true);
    try {
      const res = editMode
        ? await updateTaskdaily(editTaskId, payload)
        : await addTask(payload);
      if (res?.success) {
        toast.success(res.message || "Operation successful!");
        setTaskList([""]);
        setTaskDate("");
        setEditMode(false);
        setEditTaskId(null);
        setIsModalOpen(false);
        fetchTasks();
      } else toast.error(res?.message || "Operation failed.");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openConfirmation({
      title: editMode ? "Update Task" : "Add Task",
      message: editMode
        ? "Are you sure you want to update this task?"
        : "Are you sure you want to add this task?",
      confirmText: editMode ? "Update" : "Add",
      onConfirm: () => {
        closeConfirmation();
        doSubmitTask();
      },
    });
  };

  /* ---------- delete ---------- */
  const doDeleteTask = async (id) => {
    setLoadingId(id);
    try {
      const res = await deleteTask(id);
      if (res?.success) {
        toast.success(res.message || "Task deleted!");
        fetchTasks();
      } else toast.error(res?.message || "Delete failed.");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteTask = (id) =>
    openConfirmation({
      title: "Delete Task",
      message: "Are you sure you want to delete this task?",
      confirmText: "Delete",
      onConfirm: () => {
        closeConfirmation();
        doDeleteTask(id);
      },
    });

  /* ---------- edit ---------- */
  const handleUpdateClick = (item) => {
    setTaskList(item.task);
    setTaskDate(item.task_Date || todayString);
    setEditTaskId(item._id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setFilterDate("");
    setSearchTerm("");
  };

  /* ---------- UI ---------- */
  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-all duration-300">
      {/* HEADER */}
      <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
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
                  className={loading ? "h-5 w-5 animate-spin" : "h-5 w-5"}
                />
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-sm font-medium transition-all"
              >
                <FiPlus className="mr-2 -ml-1 h-5 w-5" />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER / SEARCH */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* date filter */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-auto"
                />
              </div>
              {(filterDate || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiX className="mr-1 h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TASKS TABLE */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
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
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTasks.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            {["No.", "Task Details", "Date", "Actions"].map(
                              (h) => (
                                <th
                                  key={h}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  {h}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {currentTasks.map((item, idx) => (
                            <motion.tr
                              key={item._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                            >
                              <td className="px-6 py-4 font-medium">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                                  {idx + 1 + startIndex}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  {item.task.map((t, n) => (
                                    <div
                                      key={n}
                                      className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                    >
                                      <span className="h-5 w-5 mr-2 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-300 shrink-0 mt-0.5">
                                        {n + 1}
                                      </span>
                                      <span>{t}</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {item.task_Date ? (
                                  <span className="flex items-center">
                                    <FiCalendar className="mr-1 text-indigo-500 dark:text-indigo-400" />
                                    {item.task_Date}
                                  </span>
                                ) : (
                                  <span className="flex items-center text-gray-400 dark:text-gray-500 italic">
                                    <FiAlertCircle className="mr-1" /> No date
                                    set
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateClick(item)}
                                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors"
                                  >
                                    <FiEdit2 className="mr-1" /> Edit
                                  </button>
                                  <button
                                    type="button"
                                    disabled={loadingId === item._id}
                                    onClick={() => handleDeleteTask(item._id)}
                                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors disabled:opacity-50"
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
                    /* empty state */
                    <div className="py-20 flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4">
                        <FiList className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-1">
                        No tasks found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {filterDate || searchTerm
                          ? "Try clearing filters or "
                          : ""}
                        add your first task using the button above!
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* PAGINATION */}
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
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                          setManualPage(parseInt(e.target.value, 10) || "")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") goToPage(Number(manualPage));
                        }}
                        onBlur={() => goToPage(Number(manualPage))}
                        className="w-12 text-center border-none py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1.5 text-gray-500 dark:text-gray-400 text-sm">
                        / {totalPages}
                      </span>
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

      {/* ADD / EDIT MODAL */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        taskList={taskList}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        handleAddTaskInput={handleAddTaskInput}
        handleDeleteTaskInput={handleDeleteTaskInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        editMode={editMode}
      />

      {/* CONFIRMATION DIALOG */}
      <ConfirmationDialog
        open={confirmationOpen}
        title={confirmationData.title}
        message={confirmationData.message}
        confirmText={confirmationData.confirmText}
        cancelText={confirmationData.cancelText}
        onConfirm={confirmationData.onConfirm}
        onCancel={closeConfirmation}
      />
    </div>
  );
}
