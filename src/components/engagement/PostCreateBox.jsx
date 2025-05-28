import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import BaseModal from "../common/BaseModal.jsx";
import useDepartmentStore from "../../store/departmentStore";

// Converts local date + time to a UTC ISO string
const toUTCISOStringLocal = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split("-");
  const [hours, minutes] = timeStr.split(":");

  const localDate = new Date();
  localDate.setFullYear(+year);
  localDate.setMonth(+month - 1);
  localDate.setDate(+day);
  localDate.setHours(+hours);
  localDate.setMinutes(+minutes);
  localDate.setSeconds(0);
  localDate.setMilliseconds(0);

  return localDate.toISOString();
};

const PostCreateBox = ({ onSuccess, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState("24 Hour");
  const [isLoading, setIsLoading] = useState(false);
  const [manualExpiryDate, setManualExpiryDate] = useState("");
  const [manualExpiryTime, setManualExpiryTime] = useState("");

  const [search, setSearch] = useState('');
  const [isOpenDepartment, setIsOpenDepartment] = useState(false);

  const { departments } = useDepartmentStore();

  const ALL_DEPT_ID = "all-department";
  const allDepartmentsOption = {
    _id: ALL_DEPT_ID,
    department: "All Departments",
  };

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
      name: file.name,
    }));

    setMediaPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveMedia = (index) => {
    const updatedFiles = [...mediaFiles];
    updatedFiles.splice(index, 1);
    setMediaFiles(updatedFiles);

    const updatedPreviews = [...mediaPreviews];
    updatedPreviews.splice(index, 1);
    setMediaPreviews(updatedPreviews);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFiles([]);
    setMediaPreviews([]);
    setDepartment([]);
    setCategory("General");
    setDate("");
    setTime("");
    setExpiry("24 Hour");
    setManualExpiryDate("");
    setManualExpiryTime("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plainTitle = DOMPurify.sanitize(title).replace(/<[^>]+>/g, "").trim();
    const plainDescription = DOMPurify.sanitize(description).replace(/<[^>]+>/g, "").trim();

    if (!plainTitle || !plainDescription) {
      toast.error("Title and Description are required.");
      return;
    }

    if (!date || !time) {
      toast.error("Please provide schedule date and time.");
      return;
    }

    const scheduleDateISO = toUTCISOStringLocal(date, time);

    let expiryValue = expiry;
    if (expiry === "Manual") {
      if (!manualExpiryDate || !manualExpiryTime) {
        toast.error("Please provide manual expiry date and time.");
        return;
      }
      expiryValue = toUTCISOStringLocal(manualExpiryDate, manualExpiryTime);
    }

    let selectedDepartments = department;
    if (department.length === 1 && department[0]._id === ALL_DEPT_ID) {
      selectedDepartments = departments;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    selectedDepartments.forEach((d) => formData.append("department", d._id));
    formData.append("categories", category);
    formData.append("schedule", scheduleDateISO);
    formData.append("expiry", expiryValue);
    mediaFiles.forEach((file) => formData.append("mediaFiles", file));

    try {
      setIsLoading(true);
      await axiosInstance.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post created successfully!");
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <BaseModal isOpen={true} onClose={onClose}>
        <motion.div
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full h-full bg-white p-6 overflow-hidden shadow-md rounded space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create New Post</h2>
              <button type="button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Post Title</label>
                <ReactQuill
                  value={title}
                  onChange={setTitle}
                  placeholder="Enter title here"
                  theme="snow"
                  className="bg-white rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  placeholder="Share your thoughts..."
                  theme="snow"
                  className="bg-white rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col border px-4 py-6 rounded items-center justify-center cursor-pointer text-gray-600 hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="text-sm">🖼️</span>
                <span className="text-sm">Upload Images</span>
              </label>

              <label className="flex flex-col border px-4 py-6 rounded items-center justify-center cursor-pointer text-gray-600 hover:bg-gray-50">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="text-sm">🎬</span>
                <span className="text-sm">Upload Videos</span>
              </label>
            </div>

            {mediaPreviews.length > 0 && (
              <div>
                <p className="text-sm mb-2 text-gray-600">Preview:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {mediaPreviews.map((media, index) => (
                    <div key={index} className="relative">
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt={media.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      ) : (
                        <video
                          src={media.url}
                          className="w-full h-32 object-cover rounded"
                          controls
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(index)}
                        className="absolute top-1 right-1 bg-white rounded-full text-red-500 px-1"
                      >
                        ✕
                      </button>
                      <p className="text-xs text-center mt-1 truncate">{media.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Select Departments</label>
                <div className="relative">
                  <div
                    onClick={() => setIsOpenDepartment(!isOpenDepartment)}
                    className="flex flex-wrap items-center gap-2 border border-gray-300 rounded px-3 py-2 cursor-pointer min-h-[42px] bg-white"
                  >
                    {department.length > 0 ? (
                      department.map((item) => (
                        <span
                          key={item._id}
                          className="bg-blue-100 text-blue-700 text-sm rounded-full px-3 py-1 flex items-center gap-2"
                        >
                          {item.department}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOption(item);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">Select department(s)...</span>
                    )}
                  </div>

                  {isOpenDepartment && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg overflow-auto">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border-b border-gray-200 outline-none text-sm"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <ul className="max-h-40 overflow-auto sidebar-scrollbar text-sm">
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((item) => (
                            <li
                              key={item._id}
                              onClick={() => toggleOption(item)}
                              className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                department.find((s) => s._id === item._id) ? 'bg-blue-50' : ''
                              }`}
                            >
                              {item.department}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-gray-500">No results found</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Categories
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border w-full px-4 py-2 rounded"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Schedule
                </label>
               <div className="flex justify-between ">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border w-full px-4 py-2 rounded"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border w-full px-4 py-2 rounded"
                  />
                </div>
               </div>

               <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Expiry
                </label>
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="border px-2 py-2 rounded"
              >
                <option value="24 hour">24 Hour</option>
                <option value="48 hour">48 Hour</option>
                <option value="1 week">1 Week</option>
                <option value="Manual">Manual</option>
              </select>
              </div>
            </div>
              {expiry === "Manual" && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  type="date"
                  value={manualExpiryDate}
                  onChange={(e) => setManualExpiryDate(e.target.value)}
                  className="border px-4 py-2 rounded"
                  placeholder="Expiry Date"
                />
                <input
                  type="time"
                  value={manualExpiryTime}
                  onChange={(e) => setManualExpiryTime(e.target.value)}
                  className="border px-4 py-2 rounded"
                  placeholder="Expiry Time"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {isLoading ? "Posting..." : "Post Now"}
            </button>
          </form>
        </motion.div>
      </BaseModal>
    </AnimatePresence>
  );
};

export default PostCreateBox;
