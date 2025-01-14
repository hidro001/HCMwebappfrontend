
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";

// Import your department store if you want dynamic departments
import useDepartmentStore from "../../store/departmentStore";

export default function EmployessIssueModel({
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