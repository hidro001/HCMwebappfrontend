import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addTask,
  fetchAllTasks,
  deleteTask,
  updateTaskdaily,
} from "../../../service/taskService";
import { toast } from "react-hot-toast";

export default function UpdateTask() {
  // Task input state (for form)
  const [taskList, setTaskList] = useState([""]);

  // All tasks fetched from server
  const [fetchedTasks, setFetchedTasks] = useState([]);

  // Filtered tasks based on date
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Date filter state
  const [filterDate, setFilterDate] = useState("");

  // Loading state (for fetch, add, update, delete)
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const tasksPerPage = 5; // Display 5 tasks per page

  // Edit mode tracking
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

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

  // 2. Filter tasks by date (client-side)
  useEffect(() => {
    if (!filterDate) {
      // No filter => show all
      setFilteredTasks(fetchedTasks);
    } else {
      // Filter for matching date
      const newFiltered = fetchedTasks.filter(
        (item) => item.task_Date === filterDate
      );
      setFilteredTasks(newFiltered);
    }

    // Reset pagination to page 1 whenever filter changes
    setCurrentPage(1);
    setManualPage(1);
  }, [fetchedTasks, filterDate]);

  // 3. Pagination calculations (on filteredTasks instead of fetchedTasks)
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const totalItems = filteredTasks.length;
  const startIndex = indexOfFirstTask;
  const endIndex = Math.min(indexOfLastTask, totalItems);

  // Move to a different page
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    setManualPage(pageNum);
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
    toast("Edit mode cancelled");
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

    setLoading(true);
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
      setLoading(false);
    }
  };

  // 6. Editing a task from the table
  const handleUpdateClick = (item) => {
    // 'item.task' is an array of strings. 
    // Populate 'taskList' for the form.
    setTaskList(item.task);
    setEditTaskId(item._id);
    setEditMode(true);
    // Optionally scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      {/* Page Title */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          Update Your Daily Task
        </h1>
       
      </div>

      {/* Date Filter */}
    
      {/* Update Task Card / Form */}
      <div className="max-w-3xl mx-auto rounded-md shadow-lg border border-green-300 p-6 mb-6 dark:border-green-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-blue-700 dark:text-blue-400">
          {editMode ? "Edit Task" : "Add Tasks"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {taskList.map((task, index) => (
            <div
              key={index}
              className="relative p-2 border rounded-md border-gray-300 dark:border-gray-600 transition-colors duration-300"
            >
              <label
                htmlFor={`task-${index}`}
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Task {index + 1}
              </label>
              <textarea
                id={`task-${index}`}
                value={task}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Write something..."
                rows={2}
                className="block w-full rounded border border-gray-300 bg-white p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-600"
              />
              {taskList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteTaskInput(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
                  title="Delete this task input"
                >
                  &#10005;
                </button>
              )}
            </div>
          ))}

          <div className="flex items-center gap-4 justify-end">
            <button
              type="button"
              onClick={handleAddTaskInput}
              className="rounded border border-purple-500 px-6 py-1 font-medium text-purple-500 transition-colors hover:bg-purple-500 hover:text-white"
            >
              Add Field
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded border border-gray-400 px-6 py-1 font-medium text-gray-600 dark:text-gray-200 hover:bg-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded border border-orange-500 px-6 py-1 font-medium text-orange-500 transition-colors hover:bg-orange-500 hover:text-white disabled:opacity-50"
            >
              {editMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Fetched Tasks Table */}
      <div className="max-w-5xl mx-auto p-4 rounded-md shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          All Tasks
        </h3>
        <div className="max-w-md mx-auto mb-6 flex items-center gap-2">
        <label htmlFor="filterDate" className="text-gray-600 dark:text-gray-300">
          Filter by Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="rounded border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />
        {filterDate && (
          <button
            type="button"
            onClick={() => setFilterDate("")}
            className="px-3 py-1 border border-red-400 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentTasks.length > 0 ? (
                <table className="min-w-full text-left text-sm border-t border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      <th className="px-4 py-2">S.L</th>
                      <th className="px-4 py-2">Task</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {currentTasks.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          {index + 1 + startIndex}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          {item.task &&
                            item.task.map((t, idx) => (
                              <div key={idx}>
                                {idx + 1}. {t}
                              </div>
                            ))}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          {item.task_Date || (
                            <span className="text-gray-400 italic">
                              No date
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex gap-2">
                            {/* Edit / Update button */}
                            <button
                              type="button"
                              className="rounded border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                              onClick={() => handleUpdateClick(item)}
                            >
                              Edit
                            </button>
                            {/* Delete button */}
                            <button
                              type="button"
                              className="rounded border border-red-500 px-3 py-1 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              onClick={() => handleDeleteTask(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-8 flex flex-col items-center">
                  <img
                    src="https://img.icons8.com/clouds/100/000000/test.png"
                    alt="No tasks"
                    className="mb-3 opacity-50"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    No tasks available. Please add some!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination Controls */}
        {totalItems > 0 && (
          <div className="flex items-center justify-end p-4 flex-col sm:flex-row gap-2 mt-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-400">
                Go to page:
              </span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={manualPage}
                onChange={(e) => setManualPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToPage(Number(manualPage));
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
              <button
                onClick={() => goToPage(Number(manualPage))}
                className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                Go
              </button>
            </div>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
