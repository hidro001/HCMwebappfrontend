// AssignedTaskEdit.jsx
import React, { useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { updateTask } from "../../../../service/taskService"; // Adjust the path as needed

const AssignedTaskEdit = ({ task, onClose, onEditSuccess }) => {
  // If task is not provided, don't render the modal.
  if (!task) return null;

  const modalRef = useRef(null);

  // Lock the background scroll when the modal is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Submit handler that collects form data and calls updateTask.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Convert FormData to a plain object.
    const updatedTaskData = Object.fromEntries(formData.entries());
    const result = await updateTask(task._id, updatedTaskData);
    if (result) {
      // Call onEditSuccess to refresh the tasks list.
      if (onEditSuccess) {
        onEditSuccess();
      }
      onClose(); // Close modal on successful update.
    } else {
      console.error("Task update failed.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-hidden="true"
      >
        <motion.div
          ref={modalRef}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl overflow-hidden relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 transition duration-200"
            aria-label="Close form"
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <div className="bg-blue-900 dark:bg-blue-700 p-4 text-lg font-semibold text-white">
            Edit Assigned Task
          </div>

          {/* Form Content */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Edit the task details below.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Task Description */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="taskDesc">
                  Task Description*
                </label>
                <input
                  id="taskDesc"
                  name="assignTaskDesc"
                  type="text"
                  placeholder="Enter Task Description"
                  defaultValue={task.assignTaskDesc || ""}
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Assignee & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="assignee">
                    Assignee
                  </label>
                  <input
                    id="assignee"
                    type="text"
                    value={`${task.assignedToName || ""} (${task.assignedToEmployeeId || ""})`}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="department">
                    Department
                  </label>
                  <input
                    id="department"
                    type="text"
                    value={task.selectedDepartment || task.assignedToDepartment || ""}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Assigned By & Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="assignedBy">
                    Assigned By
                  </label>
                  <input
                    id="assignedBy"
                    type="text"
                    value={task.assignedByName || ""}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="designation">
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    value={task.assignedToDesignation || ""}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  defaultValue={
                    task.dueDate
                      ? new Date(task.dueDate).toISOString().substr(0, 10)
                      : ""
                  }
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Priority & Status */}
              <div className="space-y-2">
                <fieldset>
                  <legend className="text-sm font-medium mb-1">Priority*</legend>
                  <div className="flex space-x-4">
                    {["Low", "Medium", "High"].map((level) => (
                      <label key={level} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          defaultChecked={task.priority === level}
                          className="mr-2"
                        />
                        <span
                          className={
                            level === "Low"
                              ? "text-green-500"
                              : level === "Medium"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-medium mb-1">Status*</legend>
                  <div className="flex space-x-4">
                    {["Not Started", "In Progress", "Completed"].map((state) => (
                      <label key={state} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={state}
                          defaultChecked={task.status === state}
                          className="mr-2"
                        />
                        <span
                          className={
                            state === "Not Started"
                              ? "text-orange-500"
                              : state === "In Progress"
                              ? "text-blue-500"
                              : "text-green-500"
                          }
                        >
                          {state}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Updates/Comments */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="updatesComments">
                  Updates/Comments
                </label>
                <textarea
                  id="updatesComments"
                  name="updatesComments"
                  placeholder="Enter updates or comments..."
                  defaultValue={task.updatesComments || ""}
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
              >
                Submit Change
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignedTaskEdit;
