import React, { useRef, useState, useEffect } from "react";
import { FaTimes, FaPaperclip } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSubordinates, submitTask } from "../../../service/taskService";
import toast from "react-hot-toast";

const TaskForm = ({ onClose }) => {
  const modalRef = useRef(null);
  const [attachment, setAttachment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subordinates, setSubordinates] = useState([]);
  const [filteredSubordinates, setFilteredSubordinates] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSubordinates = async () => {
      const data = await fetchSubordinates();
      setSubordinates(data);
    };
    loadSubordinates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSubordinates([]);
    } else {
      const results = subordinates.filter((sub) =>
        `${sub.first_Name} ${sub.last_Name} ${sub.employee_Id}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredSubordinates(results);
    }
  }, [searchQuery, subordinates]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedAssignee || !dueDate || !priority) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const taskData = {
      title,
      description,
      assigned_to: selectedAssignee.employee_Id,
      due_date: dueDate,
      priority,
      attachment: attachment ? attachment.name : null,
    };

    console.log("Submitting Task Data:", taskData);
    try {
      await submitTask(taskData);
      toast.success("Task submitted successfully!");
      onClose();
    } catch (error) {
      alert("Error submitting task.");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50"
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 transition duration-200"
            aria-label="Close form"
            disabled={loading}
          >
            <FaTimes size={20} />
          </button>

          <div className="bg-blue-900 text-white dark:bg-blue-700 p-4 text-lg font-semibold">
            Assign Task
          </div>

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Assign tasks to team members, set deadlines, and track progress seamlessly.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Title*</label>
                <input
                  type="text"
                  placeholder="Enter Task Title"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium">Assignee*</label>
                <input
                  type="text"
                  placeholder="Search for an assignee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={loading}
                />
                {filteredSubordinates.length > 0 && (
                  <ul className="absolute z-10 bg-white dark:bg-gray-700 border rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
                    {filteredSubordinates.map((sub) => (
                      <li
                        key={sub._id}
                        onClick={() => {
                          setSelectedAssignee(sub);
                          setSearchQuery(`${sub.first_Name} ${sub.last_Name} (${sub.employee_Id})`);
                          setFilteredSubordinates([]);
                        }}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        {sub.first_Name} {sub.last_Name} ({sub.employee_Id})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Emp Name</label>
                  <input
                    type="text"
                    value={selectedAssignee ? `${selectedAssignee.first_Name} ${selectedAssignee.last_Name}` : ""}
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Emp ID</label>
                  <input
                    type="text"
                    value={selectedAssignee ? selectedAssignee.employee_Id : ""}
                    className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Due Date*</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <fieldset className="flex space-x-4">
                <legend className="text-sm font-medium">Priority*</legend>
                {["High", "Medium", "Low"].map((level) => (
                  <label key={level} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={priority === level}
                      onChange={() => setPriority(level)}
                      className="mr-2"
                    />
                    {level}
                  </label>
                ))}
              </fieldset>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter Task Description"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Task"}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskForm;
