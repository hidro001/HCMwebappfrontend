import  { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";
import useDepartmentStore from "../../store/departmentStore";

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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-full max-w-lg mx-4 my-8 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="bg-blue-900 text-white p-4 rounded-t-md flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {mode === "edit" ? "Edit Ticket" : "Raise Ticket"}
              </h2>
              <button onClick={onClose} className="hover:text-gray-200">
                <FaTimes />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {mode === "edit"
                  ? "Update the ticket details."
                  : "Fill the form to raise a new ticket."}
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                    placeholder="Issue Title"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Emp ID
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                    placeholder="Employee ID"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={(val) => setDate(val)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select date"
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
                    rows={3}
                    placeholder="Describe your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Attachment
                  </label>
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
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
                          {attachment.name} (
                          {(attachment.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
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
