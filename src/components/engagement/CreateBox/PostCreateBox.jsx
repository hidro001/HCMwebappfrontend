import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  FaTimes, 
  FaImage, 
  FaVideo, 
  FaCalendarAlt, 
  FaClock, 
  FaRocket,
  FaLayerGroup,
  FaBuilding,
  FaChevronDown,
  FaSearch,
  FaPlus,
  FaTrashAlt,
  FaEye,
  FaInfinity,
  FaMagic,
  FaCheck
} from "react-icons/fa";
import { 
  HiSparkles, 
  HiLightningBolt, 
  HiGlobeAlt,
  HiChip,
  HiCollection,
  HiDocument,
  HiPhotograph,
  HiFilm
} from "react-icons/hi";
import axiosInstance from "../../../service/axiosInstance.js";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import BaseModal from "../../common/BaseModal.jsx";
import useDepartmentStore from "../../../store/departmentStore.js";
import ConfirmationDialog from "../../common/ConfirmationDialog.jsx";

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
  const [expiry, setExpiry] = useState("24 hour");
  const [isLoading, setIsLoading] = useState(false);
  const [manualExpiryDate, setManualExpiryDate] = useState("");
  const [manualExpiryTime, setManualExpiryTime] = useState("");
  const [showConfirmClose, setShowConfirmClose] = useState(false);


  useEffect(() => {
    const addDarkModeStyles = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        const style = document.createElement('style');
        style.id = 'quill-dark-styles';
        style.textContent = `
          .ql-toolbar {
            background: rgb(75 85 99) !important;
            border-color: rgb(75 85 99) !important;
          }
          .ql-container {
            background: rgb(55 65 81) !important;
            border-color: rgb(75 85 99) !important;
          }
          .ql-editor {
            background: rgb(55 65 81) !important;
            color: rgb(255 255 255) !important;
          }
          .ql-editor.ql-blank::before {
            color: rgb(156 163 175) !important;
          }
          .ql-stroke {
            stroke: rgb(209 213 219) !important;
          }
          .ql-fill {
            fill: rgb(209 213 219) !important;
          }
          .ql-picker-label {
            color: rgb(209 213 219) !important;
          }
          .ql-picker-options {
            background: rgb(55 65 81) !important;
            border-color: rgb(75 85 99) !important;
          }
          .ql-picker-item {
            color: rgb(209 213 219) !important;
          }
          .ql-picker-item:hover {
            background: rgb(75 85 99) !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        const existingStyle = document.getElementById('quill-dark-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    };

    addDarkModeStyles();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      addDarkModeStyles();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
      const existingStyle = document.getElementById('quill-dark-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const [search, setSearch] = useState("");
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
    setExpiry("24 hour");
    setManualExpiryDate("");
    setManualExpiryTime("");
  };

  const handleCloseClick = () => {
    const hasContent = title || description || mediaFiles.length > 0 || department.length > 0;
    if (hasContent) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plainTitle = DOMPurify.sanitize(title).replace(/<[^>]+>/g, "").trim();
    const plainDescription = DOMPurify.sanitize(description).replace(/<[^>]+>/g, "").trim();

    if (!plainTitle || !plainDescription) {
      toast.error("Title and Description are required.");
      return;
    }

    let scheduleDateISO = null;
    if (date && time) {
      scheduleDateISO = toUTCISOStringLocal(date, time);
    }

    let expiryValue = expiry;
    if (expiry === "Manual") {
      if (!manualExpiryDate || !manualExpiryTime) {
        toast.error("Please provide manual expiry date and time.");
        return;
      }
      expiryValue = toUTCISOStringLocal(manualExpiryDate, manualExpiryTime);
    } else if (expiry === "no expiry") {
      expiryValue = "";
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

    if (scheduleDateISO) {
      formData.append("schedule", scheduleDateISO);
    }
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      <BaseModal isOpen={true} onClose={handleCloseClick}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-5xl mx-auto max-h-[95vh] overflow-hidden"
        >
          {/* Futuristic Glass Container */}
          <div className="relative bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-600 rounded-3xl shadow-2xl">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-cyan-400/20 opacity-60 blur-sm -z-10"></div>
            
            {/* Header */}
            <motion.div 
              variants={itemVariants}
              className="relative px-8 py-6 border-b border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <HiSparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Create New Post
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Share your thoughts with the world
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseClick}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[calc(95vh-120px)] bg-white dark:bg-gray-800">
              {/* Title and Description */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <HiDocument className="w-4 h-4 text-blue-500" />
                    <span>Post Title</span>
                  </label>
                  <div className="relative">
                    <ReactQuill
                      value={title}
                      onChange={setTitle}
                      placeholder="Enter an engaging title..."
                      theme="snow"
                      className="rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm"
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline'],
                          ['link']
                        ]
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <HiChip className="w-4 h-4 text-purple-500" />
                    <span>Description</span>
                  </label>
                  <div className="relative">
                    <ReactQuill
                      value={description}
                      onChange={setDescription}
                      placeholder="Share your thoughts, ideas, or announcements..."
                      theme="snow"
                      className="rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm [&_.ql-editor]:bg-white [&_.ql-editor]:dark:bg-gray-700 [&_.ql-editor]:text-gray-900 [&_.ql-editor]:dark:text-white [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:dark:bg-gray-600 [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:dark:border-gray-500"
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline', 'strike'],
                          ['blockquote', 'code-block'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Media Upload */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  <HiCollection className="w-5 h-5 text-cyan-500" />
                  <span>Media Attachments</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 bg-gray-50/50 dark:bg-gray-700/50"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                        <HiPhotograph className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Upload Images</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </motion.label>

                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 bg-gray-50/50 dark:bg-gray-700/50"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                        <HiFilm className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Upload Videos</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">MP4, AVI, MOV up to 50MB</p>
                      </div>
                    </div>
                  </motion.label>
                </div>

                {/* Media Previews */}
                {mediaPreviews.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Media Preview ({mediaPreviews.length})
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          setMediaFiles([]);
                          setMediaPreviews([]);
                        }}
                        className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                      >
                        Clear All
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {mediaPreviews.map((media, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group rounded-xl overflow-hidden shadow-lg"
                        >
                          {media.type === "image" ? (
                            <img
                              src={media.url}
                              alt={media.name}
                              className="w-full h-24 object-cover"
                            />
                          ) : (
                            <video
                              src={media.url}
                              className="w-full h-24 object-cover"
                              muted
                            />
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => handleRemoveMedia(index)}
                              className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                            >
                              <FaTrashAlt className="w-3 h-3" />
                            </motion.button>
                          </div>
                          <div className="absolute top-2 left-2">
                            <div className="p-1 bg-black/50 rounded-full">
                              {media.type === "image" ? (
                                <FaImage className="w-3 h-3 text-white" />
                              ) : (
                                <FaVideo className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Configuration Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  <HiLightningBolt className="w-5 h-5 text-yellow-500" />
                  <span>Post Configuration</span>
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Department Selector */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      <FaBuilding className="w-4 h-4 text-green-500" />
                      <span>Target Departments</span>
                    </label>
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setIsOpenDepartment(!isOpenDepartment)}
                        className="flex flex-wrap items-center gap-2 border border-gray-300 dark:border-gray-500 rounded-xl px-4 py-3 cursor-pointer min-h-[48px] bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-200"
                      >
                        {department.length > 0 ? (
                          department.map((item) => (
                            <motion.span
                              key={item._id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full px-3 py-1 flex items-center gap-2 shadow-md"
                            >
                              {item.department}
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleOption(item);
                                }}
                                className="text-white/80 hover:text-white"
                              >
                                <FaTimes className="w-3 h-3" />
                              </motion.button>
                            </motion.span>
                          ))
                        ) : (
                          <span className="text-gray-500 dark:text-gray-300 flex items-center">
                            <FaBuilding className="w-4 h-4 mr-2" />
                            Select departments...
                          </span>
                        )}
                        <FaChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${isOpenDepartment ? 'rotate-180' : ''}`} />
                      </motion.div>

                      <AnimatePresence>
                        {isOpenDepartment && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded-xl shadow-2xl overflow-hidden"
                          >
                            <div className="p-3 border-b border-gray-200 dark:border-gray-500">
                              <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="text"
                                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-500 rounded-lg outline-none text-sm bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Search departments..."
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </div>
                            <ul className="max-h-48 overflow-auto">
                              {filteredOptions.length > 0 ? (
                                filteredOptions.map((item) => (
                                  <motion.li
                                    key={item._id}
                                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                    onClick={() => toggleOption(item)}
                                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                                      department.find((s) => s._id === item._id)
                                        ? "bg-blue-50 dark:bg-blue-800/50 text-blue-700 dark:text-blue-200"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="flex items-center">
                                        {item._id === ALL_DEPT_ID ? (
                                          <HiGlobeAlt className="w-4 h-4 mr-2" />
                                        ) : (
                                          <FaBuilding className="w-4 h-4 mr-2" />
                                        )}
                                        {item.department}
                                      </span>
                                      {department.find((s) => s._id === item._id) && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                                        >
                                          <FaCheck className="w-2 h-2 text-white" />
                                        </motion.div>
                                      )}
                                    </div>
                                  </motion.li>
                                ))
                              ) : (
                                <li className="px-4 py-3 text-gray-500 dark:text-gray-300 text-center">
                                  No departments found
                                </li>
                              )}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Category Select */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <FaLayerGroup className="w-4 h-4 text-orange-500" />
                      <span>Category</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
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

                {/* Schedule + Expiry */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <FaCalendarAlt className="w-4 h-4 text-indigo-500" />
                      <span>Schedule</span>
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        Optional
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <FaClock className="w-4 h-4 text-red-500" />
                      <span>Expiry</span>
                    </label>
                    <select
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    >
                      <option value="24 hour">24 Hours</option>
                      <option value="48 hour">48 Hours</option>
                      <option value="1 week">1 Week</option>
                      <option value="Manual">Manual</option>
                      <option value="no expiry">No Expiry</option>
                    </select>
                  </div>
                </div>

                {/* Manual Expiry Inputs */}
                <AnimatePresence>
                  {expiry === "Manual" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaMagic className="w-4 h-4 text-purple-500" />
                        <span>Manual Expiry Settings</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-800">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="date"
                          value={manualExpiryDate}
                          onChange={(e) => setManualExpiryDate(e.target.value)}
                          className="px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                          placeholder="Expiry Date"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="time"
                          value={manualExpiryTime}
                          onChange={(e) => setManualExpiryTime(e.target.value)}
                          className="px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                          placeholder="Expiry Time"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {expiry === "no expiry" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800"
                    >
                      <div className="p-2 bg-green-500 rounded-full">
                        <FaInfinity className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          No Expiry Set
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          This post will remain active indefinitely
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCloseClick}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <FaTimes className="w-4 h-4" />
                    <span>Cancel</span>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Post...</span>
                      </>
                    ) : (
                      <>
                        <FaRocket className="w-5 h-5" />
                        <span>Publish Post</span>
                        <HiSparkles className="w-4 h-4" />
                      </>
                    )}
                  </span>
                  {!isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={showConfirmClose}
          title="Discard Changes?"
          message="You have unsaved changes. Are you sure you want to close without saving?"
          onConfirm={handleConfirmClose}
          onCancel={() => setShowConfirmClose(false)}
          confirmText="Discard"
          cancelText="Keep Editing"
          type="warning"
          destructive={true}
        />
      </BaseModal>
    </AnimatePresence>
  );
};

export default PostCreateBox;