

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAnnouncementStore from "../../../store/announcementStore";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import BaseModal from "../../common/BaseModal";
import FullScreenLoader from "../../common/FullScreenLoader";

const AnnouncementAddModal = ({ isOpen, onClose, departments }) => {
  const { addAnnouncement } = useAnnouncementStore();

  // Local state for the form
  const [formData, setFormData] = useState({
    announcementDate: "",
    announcementSubject: "",
    announcementPostImg: null,
    announcementDescription: "",
    publishForAll: true,
    selectedDepartments: [],
  });

  // Local confirmation dialog
  const [showConfirm, setShowConfirm] = useState(false);

  // Loader
  const [isAddLoading, setIsAddLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      if (name === "publishForAll") {
        setFormData((prev) => ({
          ...prev,
          publishForAll: checked,
          // Clear selected depts if "publishForAll" is re-checked
          selectedDepartments: checked ? [] : prev.selectedDepartments,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Department checkbox selection
  const handleDepartmentSelection = (deptId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedDepartments.includes(deptId);
      const updated = isSelected
        ? prev.selectedDepartments.filter((id) => id !== deptId)
        : [...prev.selectedDepartments, deptId];
      return { ...prev, selectedDepartments: updated, publishForAll: false };
    });
  };

  // Validate & open confirmation
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.announcementDate) {
      toast.error("Announcement date is required");
      return;
    }
    if (!formData.announcementSubject.trim()) {
      toast.error("Subject is required");
      return;
    }
    if (!formData.announcementDescription.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
      toast.error("Select at least one department");
      return;
    }
    setShowConfirm(true);
  };

  // Confirm publish
  const confirmPublish = async () => {
    try {
      setIsAddLoading(true);
      const form = new FormData();
      form.append("announcementDate", formData.announcementDate);
      form.append("announcementSubject", formData.announcementSubject);
      if (formData.announcementPostImg) {
        form.append("announcementPostImg", formData.announcementPostImg);
      }
      form.append("announcementDescription", formData.announcementDescription);
      form.append("publish_for_all", formData.publishForAll);

      formData.selectedDepartments.forEach((deptId) => {
        form.append("department[]", deptId);
      });

      const token = localStorage.getItem("accessToken") || "";
      await addAnnouncement(form, token);

      // Reset form & close modal
      setFormData({
        announcementDate: "",
        announcementSubject: "",
        announcementPostImg: null,
        announcementDescription: "",
        publishForAll: true,
        selectedDepartments: [],
      });
      onClose();
      toast.success("Announcement published successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish announcement.");
    } finally {
      setShowConfirm(false);
      setIsAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* Show loader if adding */}
      {isAddLoading && <FullScreenLoader />}

      {/* Local confirmation dialog */}
      <ConfirmationDialog
        open={showConfirm}
        title="Publish Announcement"
        message="Do you want to publish this announcement?"
        onConfirm={confirmPublish}
        onCancel={() => setShowConfirm(false)}
        confirmText="Publish"
        cancelText="Cancel"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                   w-full max-w-2xl mx-4 p-4 md:p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 dark:text-gray-200 
                     hover:text-gray-700 dark:hover:text-gray-100"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Announcement</h2>
        <form
          onSubmit={handleAddSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Announcement Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Announcement Date
            </label>
            <input
              type="date"
              name="announcementDate"
              value={formData.announcementDate}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border 
                         rounded-md px-3 py-2 text-sm focus:outline-none 
                         focus:ring-1 focus:ring-blue-500"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject or Title
            </label>
            <input
              type="text"
              name="announcementSubject"
              value={formData.announcementSubject}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border 
                         rounded-md px-3 py-2 text-sm focus:outline-none 
                         focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Post Image</label>
            <input
              type="file"
              name="announcementPostImg"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />
            {formData.announcementPostImg && (
              <p className="text-sm mt-1">
                {formData.announcementPostImg.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Announcement Description
            </label>
            <textarea
              name="announcementDescription"
              rows={4}
              value={formData.announcementDescription}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border 
                         rounded-md px-3 py-2 text-sm focus:outline-none 
                         focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Publish for All */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="publishForAll"
              checked={formData.publishForAll}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm">Publish for all departments</label>
          </div>

          {/* Department checkboxes if not publishForAll */}
          {!formData.publishForAll && (
            <div>
              <p className="text-sm font-medium mb-2">Select Departments</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departments.map((dept) => (
                  <label key={dept._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedDepartments.includes(dept._id)}
                      onChange={() => handleDepartmentSelection(dept._id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm">{dept.department}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAddLoading}
              className="bg-indigo-600 text-white px-4 py-2 
                         rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              {isAddLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </motion.div>
    </BaseModal>
  );
};

export default AnnouncementAddModal;
