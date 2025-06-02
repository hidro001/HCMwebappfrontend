import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/axiosInstance";
import BaseModal from "../../common/BaseModal";
import useDepartmentStore from "../../../store/departmentStore";
import { FaTimes } from "react-icons/fa";

const PollCreateBox = ({ onSuccess, onClose }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("24");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpenDepartment, setIsOpenDepartment] = useState(false);
  const [category, setCategory] = useState("General");

  const { departments } = useDepartmentStore();

  const ALL_DEPT_ID = "all-department";
  const allDepartmentsOption = { _id: ALL_DEPT_ID, department: "All Departments" };

  const toggleOption = (option) => {
    const isAllDept = option._id === ALL_DEPT_ID;
    if (isAllDept) {
      setDepartment([option]);
    } else {
      const withoutAll = department.filter((d) => d._id !== ALL_DEPT_ID);
      const alreadySelected = withoutAll.find((d) => d._id === option._id);
      if (alreadySelected) {
        setDepartment(withoutAll.filter((d) => d._id !== option._id));
      } else {
        setDepartment([...withoutAll, option]);
      }
    }
  };

  const filteredOptions = [
    allDepartmentsOption,
    ...departments.filter((opt) =>
      opt.department.toLowerCase().includes(search.toLowerCase())
    ),
  ];

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, idx) => idx !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || options.some((opt) => !opt.trim())) {
      toast.error("Please fill in the question and all options.");
      return;
    }

    let selectedDepartments = department;
    if (department.length === 1 && department[0]._id === ALL_DEPT_ID) {
      selectedDepartments = departments;
    }

    const payload = {
      question,
      options: options.filter((opt) => opt.trim() !== ""),
      duration: parseInt(duration),
      department: selectedDepartments.map((d) => d._id),
      categories: category,
    };

    try {
      setIsSubmitting(true);
      await axiosInstance.post("/polls", payload);
      toast.success("Poll created successfully!");
      setQuestion("");
      setOptions(["", ""]);
      setDuration("24");
      setDepartment([]);
      setCategory("General");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error(error.response?.data?.message || "Failed to create poll.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <BaseModal isOpen={true} onClose={onClose}>
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto space-y-6 text-black dark:text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create New Poll</h2>
            <button type="button" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Poll Question</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            {/* Options */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Options</label>
              {options.map((opt, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    required
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {options.length < 5 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="text-blue-600 text-sm hover:underline dark:text-blue-400"
                >
                  + Add Option
                </button>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Duration (hours)</label>
              <input
                type="number"
                min="1"
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option>All Announcement</option>
                <option>General</option>
                <option>New Hire</option>
                <option>SOP Updates</option>
                <option>Policy Updates</option>
                <option>Promotion</option>
                <option>Transfer</option>
                <option>Training</option>
                <option>Special</option>
              </select>
            </div>

            {/* Departments */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Departments</label>
              <div
                onClick={() => setIsOpenDepartment(!isOpenDepartment)}
                className="border px-3 py-2 rounded w-full cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-600 flex flex-wrap gap-2 min-h-[42px]"
              >
                {department.length > 0 ? (
                  department.map((d) => (
                    <span
                      key={d._id}
                      className="bg-blue-100 text-blue-700 text-sm rounded-full px-3 py-1 flex items-center gap-2"
                    >
                      {d.department}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(d);
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Select department(s)...</span>
                )}
              </div>

              {isOpenDepartment && (
                <div className="relative mt-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-1 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="Search departments..."
                  />
                  <ul className="max-h-40 overflow-auto border rounded shadow text-sm bg-white dark:bg-gray-800 dark:border-gray-600">
                    {filteredOptions.map((opt) => (
                      <li
                        key={opt._id}
                        onClick={() => toggleOption(opt)}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 ${
                          department.find((d) => d._id === opt._id)
                            ? "bg-blue-50 dark:bg-gray-700"
                            : ""
                        }`}
                      >
                        {opt.department}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded hover:bg-green-700 dark:hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Poll"}
            </button>
          </form>
        </motion.div>
      </BaseModal>
    </AnimatePresence>
  );
};

export default PollCreateBox;
