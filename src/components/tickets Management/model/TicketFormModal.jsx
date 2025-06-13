// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaTimes } from "react-icons/fa";
// import useDepartmentStore from "../../../store/departmentStore";
// import BaseModal from "../../common/BaseModal";

// export default function TicketFormModal({
//   isOpen,
//   onClose,
//   mode,
//   initialData,
//   onSubmit,
// }) {
//   const [ticketTitle, setTicketTitle] = useState("");
//   const [department, setDepartment] = useState("");
//   const [empId, setEmpId] = useState("");
//   const [date, setDate] = useState(null);
//   const [priority, setPriority] = useState("High");
//   const [status, setStatus] = useState("Pending");
//   const [description, setDescription] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [attachmentPreview, setAttachmentPreview] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const { departments, fetchDepartments } = useDepartmentStore();

//   useEffect(() => {
//     if (isOpen) {
//       fetchDepartments();
//     }
//     if (mode === "edit" && initialData && isOpen) {
//       setTicketTitle(initialData.issueTitle || "");
//       setDepartment(initialData.assignedTo || "");
//       setEmpId(initialData.createdBy?.employee_Id || "");
//       setDate(initialData.createdAt ? new Date(initialData.createdAt) : null);
//       setPriority(initialData.priority || "High");
//       setStatus(initialData.issueStatus || "Pending");
//       setDescription(initialData.issueDescription || "");
//     } else if (isOpen && mode === "create") {
//       setTicketTitle("");
//       setDepartment("");
//       setEmpId("");
//       setDate(null);
//       setPriority("High");
//       setStatus("Pending");
//       setDescription("");
//       setAttachment(null);
//       setAttachmentPreview(null);
//     }
//   }, [isOpen, mode, initialData, fetchDepartments]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setAttachment(file);
//       if (file.type.includes("image")) {
//         setAttachmentPreview(URL.createObjectURL(file));
//       } else {
//         setAttachmentPreview(null);
//       }
//     }
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       setAttachment(file);
//       if (file.type.includes("image")) {
//         setAttachmentPreview(URL.createObjectURL(file));
//       } else {
//         setAttachmentPreview(null);
//       }
//     }
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       ticketTitle,
//       department,
//       empId,
//       date,
//       priority,
//       status,
//       description,
//       attachment,
//     };
//     onSubmit(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <motion.div
//         className="relative bg-white dark:bg-gray-800 border border-gray-200 
//                    dark:border-gray-700 rounded-md w-full max-w-lg mx-4 my-8 h-[40vh] md:h-[50vh] lg:h-[60vh] 
//                    shadow-xl      
                   
//                    overflow-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//       >
//         <div className="bg-blue-900 text-white p-4 rounded-t-md flex items-center justify-between">
//           <h2 className="text-lg font-semibold">
//             {mode === "edit" ? "Edit Ticket" : "Raise Ticket"}
//           </h2>
//           <button onClick={onClose} className="hover:text-gray-200">
//             <FaTimes />
//           </button>
//         </div>
//         <div className="p-4 space-y-4">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {mode === "edit"
//               ? "Update the ticket details."
//               : "Fill the form to raise a new ticket."}
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title *</label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 placeholder="Issue Title"
//                 value={ticketTitle}
//                 onChange={(e) => setTicketTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Department
//               </label>
//               <select
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               >
//                 <option value="">Select Department</option>
//                 {departments.map((dep) => (
//                   <option key={dep._id} value={dep.department}>
//                     {dep.department}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Emp ID</label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 placeholder="Employee ID"
//                 value={empId}
//                 onChange={(e) => setEmpId(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <DatePicker
//                 selected={date}
//                 onChange={(val) => setDate(val)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="Select date"
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700 text-gray-800 
//                            dark:text-gray-100 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Priority</label>
//               <select
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               >
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Status</label>
//               <select
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Resolved">Resolved</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Description
//               </label>
//               <textarea
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700 text-gray-800
//                            dark:text-gray-100 focus:outline-none"
//                 rows={3}
//                 placeholder="Describe your issue..."
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Attachment
//               </label>
//               <div
//                 onDragEnter={handleDragEnter}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
//                   isDragging
//                     ? "border-blue-300 bg-blue-50 dark:bg-blue-900/40"
//                     : "border-gray-300 dark:border-gray-600"
//                 }`}
//                 onClick={openFileDialog}
//               >
//                 {isDragging
//                   ? "Drop your file here..."
//                   : "Click or Drag & Drop to attach a file"}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//               {attachment && (
//                 <div className="mt-2">
//                   {attachmentPreview ? (
//                     <img
//                       src={attachmentPreview}
//                       alt="Attachment Preview"
//                       className="max-h-32 rounded border mt-2"
//                     />
//                   ) : (
//                     <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
//                       {attachment.name} ({(attachment.size / 1024).toFixed(1)}{" "}
//                       KB)
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border rounded text-gray-600 
//                            hover:bg-gray-100 dark:text-gray-200 
//                            dark:hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 
//                            rounded hover:bg-blue-700 transition-colors"
//               >
//                 {mode === "edit" ? "Update Ticket" : "Submit Ticket"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaTimes, FaUpload, FaFile, FaImage, FaFilePdf, FaFileWord,
  FaCalendarAlt, FaUser, FaBuilding, FaFlag, FaTags,
  FaFileAlt, FaPaperclip, FaTrash, FaEye
} from "react-icons/fa";
import { 
  HiOutlineX, HiOutlineUpload, HiOutlineDocumentText,
  HiOutlineCalendar, HiOutlineUser, HiOutlineOfficeBuilding,
  HiOutlineFlag, HiOutlineTag, HiOutlinePaperClip, HiOutlineTrash
} from "react-icons/hi";
import { 
  MdCloudUpload, MdAttachFile, MdClose, MdCalendarToday,
  MdPerson, MdBusiness, MdPriorityHigh, MdLabel, MdDescription
} from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineFile } from "react-icons/ai";
import { BiUpload, BiFile, BiCalendar, BiUser, BiBuilding } from "react-icons/bi";
import useDepartmentStore from "../../../store/departmentStore";
import BaseModal from "../../common/BaseModal";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const dropzoneVariants = {
  idle: { 
    borderColor: "rgb(209, 213, 219)",
    backgroundColor: "transparent" 
  },
  hover: { 
    borderColor: "rgb(59, 130, 246)",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    scale: 1.02
  },
  dragging: { 
    borderColor: "rgb(59, 130, 246)",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    scale: 1.05
  }
};

export default function TicketFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}) {
  const [ticketTitle, setTicketTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const { departments, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
    if (mode === "edit" && initialData && isOpen) {
      setTicketTitle(initialData.issueTitle || "");
      setDepartment(initialData.assignedTo || "");
      setEmpId(initialData.createdBy?.employee_Id || "");
      setDate(initialData.createdAt ? new Date(initialData.createdAt) : null);
      setPriority(initialData.priority || "High");
      setStatus(initialData.issueStatus || "Pending");
      setDescription(initialData.issueDescription || "");
    } else if (isOpen && mode === "create") {
      setTicketTitle("");
      setDepartment("");
      setEmpId("");
      setDate(null);
      setPriority("High");
      setStatus("Pending");
      setDescription("");
      setAttachment(null);
      setAttachmentPreview(null);
    }
  }, [isOpen, mode, initialData, fetchDepartments]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);
      if (file.type.includes("image")) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setAttachment(file);
      if (file.type.includes("image")) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = {
        ticketTitle,
        department,
        empId,
        date,
        priority,
        status,
        description,
        attachment,
      };
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'doc':
      case 'docx': return <FaFileWord className="text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return <FaImage className="text-green-500" />;
      default: return <FaFile className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'from-red-500 to-red-600';
      case 'Medium': return 'from-yellow-500 to-yellow-600';
      case 'Low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'from-orange-500 to-orange-600';
      case 'In Progress': return 'from-blue-500 to-blue-600';
      case 'Resolved': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
              >
                <HiOutlineDocumentText className="text-white text-2xl" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {mode === "edit" ? "Edit Ticket" : "Create New Ticket"}
                </h2>
                <p className="text-blue-100 mt-1">
                  {mode === "edit"
                    ? "Update the ticket details"
                    : "Fill the form to raise a new ticket"}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
            >
              <HiOutlineX size={20} />
            </motion.button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title Field */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <HiOutlineDocumentText className="text-blue-500" />
                Title *
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                           transition-all duration-200 placeholder-gray-400"
                placeholder="Enter a descriptive title for your ticket"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                required
              />
            </motion.div>

            {/* Department and Employee ID Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fieldVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiOutlineOfficeBuilding className="text-purple-500" />
                  Department
                </label>
                <select
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                             focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800
                             transition-all duration-200"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep.department}>
                      {dep.department}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={fieldVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiOutlineUser className="text-indigo-500" />
                  Employee ID
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                             transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter employee ID"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
              </motion.div>
            </div>

            {/* Date and Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fieldVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiOutlineCalendar className="text-green-500" />
                  Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={date}
                    onChange={(val) => setDate(val)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select date"
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm 
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                               focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800
                               transition-all duration-200 placeholder-gray-400"
                  />
                  <MdCalendarToday className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div variants={fieldVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiOutlineFlag className="text-red-500" />
                  Priority
                </label>
                <div className="relative">
                  <select
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                               focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800
                               transition-all duration-200"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">🔴 High Priority</option>
                    <option value="Medium">🟡 Medium Priority</option>
                    <option value="Low">🟢 Low Priority</option>
                  </select>
                  <div className={`absolute right-12 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(priority)}`}></div>
                </div>
              </motion.div>
            </div>

            {/* Status Field */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <HiOutlineTag className="text-blue-500" />
                Status
              </label>
              <div className="relative">
                <select
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                             transition-all duration-200"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">🔄 In Progress</option>
                  <option value="Resolved">✅ Resolved</option>
                </select>
                <div className={`absolute right-12 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(status)}`}></div>
              </div>
            </motion.div>

            {/* Description Field */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <MdDescription className="text-purple-500" />
                Description
              </label>
              <textarea
                className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800
                           transition-all duration-200 placeholder-gray-400 resize-none"
                rows={4}
                placeholder="Describe your issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </motion.div>

            {/* File Attachment */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <HiOutlinePaperClip className="text-indigo-500" />
                Attachment
              </label>
              
              {!attachment ? (
                <motion.div
                  variants={dropzoneVariants}
                  animate={isDragging ? "dragging" : "idle"}
                  whileHover="hover"
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <motion.div
                    animate={{ y: isDragging ? -5 : 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                      <AiOutlineCloudUpload className="text-3xl text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {isDragging ? "Drop your file here" : "Upload a file"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Click to browse or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Supports: Images, PDFs, Documents (Max 10MB)
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        {getFileIcon(attachment.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {attachment.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {attachmentPreview && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => window.open(attachmentPreview, '_blank')}
                          className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                        >
                          <FaEye />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={removeAttachment}
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      >
                        <HiOutlineTrash />
                      </motion.button>
                    </div>
                  </div>
                  
                  {attachmentPreview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 overflow-hidden"
                    >
                      <img
                        src={attachmentPreview}
                        alt="Attachment Preview"
                        className="max-h-40 rounded-lg border border-gray-200 dark:border-gray-600 object-cover"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={fieldVariants}
              className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !ticketTitle.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl 
                           hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 font-medium shadow-lg hover:shadow-xl
                           flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    {mode === "edit" ? "Update Ticket" : "Create Ticket"}
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </BaseModal>
  );
}