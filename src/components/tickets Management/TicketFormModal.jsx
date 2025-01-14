
// import React, { useState, useEffect, useRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function TicketFormModal({
//   isOpen,
//   onClose,
//   mode, // "create" or "edit"
//   initialData, // data of the ticket to edit
//   onSubmit, // function to handle form submit
// }) {
//   // Local state for the form fields
//   const [ticketTitle, setTicketTitle] = useState("");
//   const [assignee, setAssignee] = useState("");
//   const [department, setDepartment] = useState("");
//   const [empName, setEmpName] = useState("");
//   const [empId, setEmpId] = useState("");
//   const [date, setDate] = useState(null);
//   const [priority, setPriority] = useState("High"); // "High" | "Medium" | "Low"
//   const [status, setStatus] = useState("On Hold");  // "On Hold" | "Not Started" | "Done"
//   const [description, setDescription] = useState("");

//   // Single attachment + preview
//   const [attachment, setAttachment] = useState(null);
//   const [attachmentPreview, setAttachmentPreview] = useState(null);

//   // Drag-and-drop state
//   const [isDragging, setIsDragging] = useState(false);

//   // Ref for the hidden file input
//   const fileInputRef = useRef(null);

//   // Populate form if we're in edit mode
//   useEffect(() => {
//     if (mode === "edit" && initialData) {
//       setTicketTitle(initialData.ticketTitle || "");
//       setAssignee(initialData.assignee || "");
//       setDepartment(initialData.department || "");
//       setEmpName(initialData.empName || "");
//       setEmpId(initialData.empId || "");
//       setDate(initialData.date ? new Date(initialData.date) : null);
//       setPriority(initialData.priority || "High");
//       setStatus(initialData.status || "On Hold");
//       setDescription(initialData.description || "");
//       setAttachment(initialData.attachment || null);

//       // If editing and we already have an attachment, optionally show preview
//       if (initialData.attachment) {
//         try {
//           // If it's an image, create a URL. Otherwise no preview
//           if (initialData.attachment.type?.includes("image")) {
//             setAttachmentPreview(URL.createObjectURL(initialData.attachment));
//           } else {
//             setAttachmentPreview(null);
//           }
//         } catch {
//           setAttachmentPreview(null);
//         }
//       }
//     } else {
//       // Clear fields if create mode
//       setTicketTitle("");
//       setAssignee("");
//       setDepartment("");
//       setEmpName("");
//       setEmpId("");
//       setDate(null);
//       setPriority("High");
//       setStatus("On Hold");
//       setDescription("");
//       setAttachment(null);
//       setAttachmentPreview(null);
//     }
//   }, [mode, initialData]);

//   // Handle the standard file input's onChange
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setAttachment(file);

//       // If image, create preview
//       if (file.type.includes("image")) {
//         setAttachmentPreview(URL.createObjectURL(file));
//       } else {
//         setAttachmentPreview(null);
//       }
//     }
//   };

//   // Drag and Drop Handlers
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
//     // Must prevent default to allow onDrop to fire
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     // Files from the drop event
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       setAttachment(file);

//       // Show preview if it's an image
//       if (file.type.includes("image")) {
//         setAttachmentPreview(URL.createObjectURL(file));
//       } else {
//         setAttachmentPreview(null);
//       }
//     }
//   };

//   // Opens the file dialog
//   const openFileDialog = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       ticketTitle,
//       assignee,
//       department,
//       empName,
//       empId,
//       date,
//       priority,
//       status,
//       description,
//       attachment,
//     };

//     // Pass data up to parent
//     onSubmit(formData);

//     // Close modal
//     onClose();
//   };

//   // If not open, don’t render anything
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-30 
//                  dark:bg-black dark:bg-opacity-60 
//                  flex items-center justify-center z-50 
//                  overflow-y-auto"
//     >
//       <div
//         className="bg-white dark:bg-gray-800 
//                    border border-gray-200 dark:border-gray-700
//                    rounded-md w-full max-w-lg mx-4 my-8 relative 
//                    shadow-xl"
//       >
//         {/* Header */}
//         <div className="bg-blue-900 text-white p-4 rounded-t-md">
//           <h2 className="text-lg font-semibold">
//             {mode === "edit" ? "Edit Ticket" : "Raise Ticket"}
//           </h2>
//         </div>

//         {/* Body */}
//         <div className="p-4 space-y-4 text-gray-800 dark:text-gray-100">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {mode === "edit"
//               ? "Update the ticket details as necessary."
//               : "Raise a ticket if you encounter any issues, ensuring quick resolution and support."}
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-3">
//             {/* Ticket Title */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Ticket Title *
//               </label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            focus:outline-none"
//                 placeholder="Enter ticket title"
//                 value={ticketTitle}
//                 onChange={(e) => setTicketTitle(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Department */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Department
//               </label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            focus:outline-none"
//                 placeholder="IT"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               />
//             </div>

//             {/* Emp ID */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Emp ID
//               </label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            focus:outline-none"
//                 placeholder="RI0056"
//                 value={empId}
//                 onChange={(e) => setEmpId(e.target.value)}
//               />
//             </div>

//             {/* Date */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <DatePicker
//                 selected={date}
//                 onChange={(d) => setDate(d)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="DD/MM/YY"
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            focus:outline-none"
//               />
//             </div>

//             {/* Priority */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Priority *
//               </label>
//               <div className="flex items-center gap-4 text-sm">
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="priority"
//                     value="High"
//                     checked={priority === "High"}
//                     onChange={() => setPriority("High")}
//                   />
//                   <span className="text-red-600 dark:text-red-400">High</span>
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="priority"
//                     value="Medium"
//                     checked={priority === "Medium"}
//                     onChange={() => setPriority("Medium")}
//                   />
//                   <span className="text-yellow-600 dark:text-yellow-300">
//                     Medium
//                   </span>
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="priority"
//                     value="Low"
//                     checked={priority === "Low"}
//                     onChange={() => setPriority("Low")}
//                   />
//                   <span className="text-green-600 dark:text-green-400">Low</span>
//                 </label>
//               </div>
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Status *</label>
//               <div className="flex items-center gap-4 text-sm">
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="status"
//                     value="On Hold"
//                     checked={status === "On Hold"}
//                     onChange={() => setStatus("On Hold")}
//                   />
//                   <span className="text-red-600 dark:text-red-400">On Hold</span>
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Not Started"
//                     checked={status === "Not Started"}
//                     onChange={() => setStatus("Not Started")}
//                   />
//                   <span className="text-orange-600 dark:text-orange-300">
//                     Not Started
//                   </span>
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Done"
//                     checked={status === "Done"}
//                     onChange={() => setStatus("Done")}
//                   />
//                   <span className="text-green-600 dark:text-green-400">Done</span>
//                 </label>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Description
//               </label>
//               <textarea
//                 className="w-full border rounded px-3 py-2 text-sm 
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100
//                            focus:outline-none"
//                 rows={3}
//                 placeholder="Explain issue here..."
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             {/* Attachment with Drag & Drop */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Attachment</label>

//               {/* Drag-and-drop area */}
//               <div
//                 onDragEnter={handleDragEnter}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded 
//                   ${
//                     isDragging
//                       ? "border-blue-400 bg-blue-50 dark:bg-blue-900/40"
//                       : "border-gray-300 dark:border-gray-600"
//                   }
//                   cursor-pointer
//                   transition-colors
//                 `}
//               >
//                 {/* Instruction text */}
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {isDragging
//                     ? "Drop your file here..."
//                     : "Drag & Drop or click the button below to select a file"}
//                 </p>

//                 {/* Hidden input & button to open file dialog */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//                 <button
//                   type="button"
//                   onClick={openFileDialog}
//                   className="mt-2 px-3 py-1 bg-blue-600 text-white rounded
//                              hover:bg-blue-700 text-sm transition-colors"
//                 >
//                   Choose File
//                 </button>
//               </div>

//               {/* Show file name or preview if it's an image */}
//               {attachment && (
//                 <div className="mt-2">
//                   {/* If it's an image, show preview */}
//                   {attachmentPreview ? (
//                     <img
//                       src={attachmentPreview}
//                       alt="Attachment Preview"
//                       className="max-h-32 rounded border border-gray-300 
//                                  dark:border-gray-600 mt-2"
//                     />
//                   ) : (
//                     // Otherwise, show file info
//                     <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
//                       {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Submit & Cancel Buttons */}
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border rounded 
//                            text-gray-600 hover:bg-gray-100 
//                            dark:text-gray-200 dark:hover:bg-gray-700
//                            transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded 
//                            hover:bg-blue-700 transition-colors"
//               >
//                 {mode === "edit" ? "Update Ticket" : "Submit Ticket"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";

// Import your department store if you want dynamic departments
import useDepartmentStore from "../../store/departmentStore";

export default function TicketFormModal({
  isOpen,
  onClose,
  mode,          // "create" or "edit"
  initialData,   // ticket data if editing
  onSubmit,      // function to handle final form submission
}) {
  // ----- Local state for fields -----
  const [ticketTitle, setTicketTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("High");   // "High" | "Medium" | "Low"
  const [status, setStatus] = useState("Pending");    // "Pending" | "In Progress" | "Resolved"
  const [description, setDescription] = useState("");

  // ----- For attachments/media -----
  const [attachment, setAttachment] = useState(null); // single file example
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ----- Fetch dynamic departments if needed -----
  const { departments, fetchDepartments } = useDepartmentStore();

  // ----- On mount or when modal opens -----
  useEffect(() => {
    if (isOpen) {
      // Optionally refetch departments
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

      // If editing, you may set an existing file in "attachmentPreview" if you have a URL
      // e.g. setAttachmentPreview(initialData.file || null);
    }
    else if (isOpen && mode === "create") {
      // Clear fields for a new ticket
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

  // ----- File / Attachment handlers -----

  // Called when user selects a file from the standard file input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);

      // If the file is an image, create a local preview
      if (file.type.includes("image")) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  // Optional: Drag & drop handlers
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

  // Opens file dialog manually
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ----- Form submit -----
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather all fields + the selected file
    const formData = {
      ticketTitle,
      department,
      empId,
      date,
      priority,
      status,
      description,
      attachment, // pass the File object to parent
    };

    onSubmit(formData);
  };

  // If not open, don’t render
  if (!isOpen) return null;

  // ----- Render -----
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-60 
                     flex items-center justify-center z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Clickable backdrop to close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            className="relative bg-white dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       rounded-md w-full max-w-lg mx-4 my-8 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-blue-900 text-white p-4 rounded-t-md flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {mode === "edit" ? "Edit Ticket" : "Raise Ticket"}
              </h2>
              <button onClick={onClose} className="hover:text-gray-200">
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {mode === "edit"
                  ? "Update the ticket details."
                  : "Fill the form to raise a new ticket."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm 
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100 
                               focus:outline-none"
                    placeholder="Issue Title"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Department (select from dynamic store) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm 
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               focus:outline-none"
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
                </div>

                {/* Emp ID */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Emp ID
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm 
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100 
                               focus:outline-none"
                    placeholder="Employee ID"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={(val) => setDate(val)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select date"
                    className="w-full border rounded px-3 py-2 text-sm
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               focus:outline-none"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               focus:outline-none"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border rounded px-3 py-2 text-sm
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               focus:outline-none"
                    rows={3}
                    placeholder="Describe your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Attachment (Drag & Drop OR File Input) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Attachment
                  </label>
                  {/* Drag & Drop area */}
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded p-4 text-center 
                      cursor-pointer transition-colors ${
                        isDragging
                          ? "border-blue-300 bg-blue-50 dark:bg-blue-900/40"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    onClick={openFileDialog}
                  >
                    {isDragging
                      ? "Drop your file here..."
                      : "Click or Drag & Drop to attach a file"}
                  </div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Preview if image */}
                  {attachment && (
                    <div className="mt-2">
                      {attachmentPreview ? (
                        <img
                          src={attachmentPreview}
                          alt="Attachment Preview"
                          className="max-h-32 rounded border mt-2"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit / Cancel Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded 
                               text-gray-600 hover:bg-gray-100 
                               dark:text-gray-200 dark:hover:bg-gray-700
                               transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded 
                               hover:bg-blue-700 transition-colors"
                  >
                    {mode === "edit" ? "Update Ticket" : "Submit Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

