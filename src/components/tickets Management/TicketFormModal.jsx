import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TicketFormModal({
  isOpen,
  onClose,
  mode,            // "create" or "edit"
  initialData,     // data of the ticket to edit
  onSubmit,        // function to handle form submit
}) {
  // Local state for the form fields
  const [ticketTitle, setTicketTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [department, setDepartment] = useState("");
  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("High"); // "High" | "Medium" | "Low"
  const [status, setStatus] = useState("On Hold");  // "On Hold" | "Not Started" | "Done"
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);

  // Populate form if we're in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTicketTitle(initialData.ticketTitle || "");
      setAssignee(initialData.assignee || "");
      setDepartment(initialData.department || "");
      setEmpName(initialData.empName || "");
      setEmpId(initialData.empId || "");
      setDate(initialData.date ? new Date(initialData.date) : null);
      setPriority(initialData.priority || "High");
      setStatus(initialData.status || "On Hold");
      setDescription(initialData.description || "");
      setAttachment(initialData.attachment || null);
    } else {
      // Clear fields if create mode
      setTicketTitle("");
      setAssignee("");
      setDepartment("");
      setEmpName("");
      setEmpId("");
      setDate(null);
      setPriority("High");
      setStatus("On Hold");
      setDescription("");
      setAttachment(null);
    }
  }, [mode, initialData]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ticketTitle,
      assignee,
      department,
      empName,
      empId,
      date,
      priority,
      status,
      description,
      attachment,
    };

    // Pass data up to parent
    onSubmit(formData);

    // Close modal
    onClose();
  };

  // If not open, don’t render anything
  if (!isOpen) return null;

  return (
    /* Modal container */
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {/* Modal box */}
      <div className="bg-white rounded-md w-full max-w-lg mx-4 relative">
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 rounded-t-md">
          <h2 className="text-lg font-semibold">
            {mode === "edit" ? "Edit Ticket" : "Raise Ticket"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            {mode === "edit"
              ? "Update the ticket details as necessary."
              : "Raise a ticket to management effortlessly if you encounter any issues, ensuring quick resolution and support."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Ticket Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ticket Title *
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter ticket title"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                required
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Assignee
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Riya Mishra (RI0023)"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="IT"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            {/* Emp Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Emp Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Akhilesh"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
            </div>

            {/* Emp ID */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Emp ID
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="RI0056"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YY"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">Priority*</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={() => setPriority("High")}
                  />
                  <span className="text-red-600">High</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={priority === "Medium"}
                    onChange={() => setPriority("Medium")}
                  />
                  <span className="text-yellow-600">Medium</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === "Low"}
                    onChange={() => setPriority("Low")}
                  />
                  <span className="text-green-600">Low</span>
                </label>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status*</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="On Hold"
                    checked={status === "On Hold"}
                    onChange={() => setStatus("On Hold")}
                  />
                  <span className="text-red-600">On Hold</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="Not Started"
                    checked={status === "Not Started"}
                    onChange={() => setStatus("Not Started")}
                  />
                  <span className="text-orange-600">Not Started</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="Done"
                    checked={status === "Done"}
                    onChange={() => setStatus("Done")}
                  />
                  <span className="text-green-600">Done</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                rows={3}
                placeholder="Explain issue here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Attachment
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="text-sm"
              />
              {attachment && (
                <p className="mt-1 text-xs text-gray-500">
                  {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {mode === "edit" ? "Update Ticket" : "Submit Ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
