
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

// Basic fade-and-scale overlay animation
const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};


export default function AssignAssetModal({
  isOpen,
  onClose,
  onSubmit,
  employeeName = "",
}) {
  // Form fields
  const [assetName, setAssetName] = useState("");
  const [assetGroup, setAssetGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [assignDate, setAssignDate] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Prevent page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather form data
    const formData = {
      assetName,
      assetGroup,
      brand,
      model,
      value,
      status,
      assignDate,
      invoiceNumber,
      description,
      file,
    };
    // Pass to parent
    onSubmit(formData);
    // Close the modal
    onClose();
  };

  // If modal not open, render nothing
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          {...overlayAnimation}
        >
          {/* Modal Content */}
          <motion.div
            layout
            className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-4xl shadow-lg"
            {...overlayAnimation}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Assign Asset to ({employeeName || "Full name"})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Two-column grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1) Asset Name */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Asset Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                  />
                </div>

                {/* 2) Asset Group */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Asset group <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={assetGroup}
                    onChange={(e) => setAssetGroup(e.target.value)}
                  >
                    <option value="">Select</option>
                    {/* Add real group options here */}
                    <option value="group1">Group One</option>
                    <option value="group2">Group Two</option>
                  </select>
                </div>

                {/* 3) Brand */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                {/* 4) Model */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="">Select</option>
                    {/* Add real model options here */}
                    <option value="modelA">Model A</option>
                    <option value="modelB">Model B</option>
                  </select>
                </div>

                {/* 5) Value (In Rupees) */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Value (In Rupees) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Enter Full Name"
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                {/* 6) Status */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    {/* Add real status options here */}
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* 7) Assign Date WITH CALENDAR ICON */}
                {/* <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Assign Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={assignDate}
                      onChange={(date) => setAssignDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="w-full border border-gray-300 dark:border-gray-600 
                                 rounded px-3 py-2 focus:outline-none 
                                 bg-white dark:bg-gray-700 dark:text-white pl-10"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>

                </div> */}


<div className="flex flex-col">
  <label className="mb-1 text-sm font-medium">
    Assign Date <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <DatePicker
      selected={assignDate}
      onChange={(date) => setAssignDate(date)}
      dateFormat="dd/MM/yyyy"
      placeholderText="DD/MM/YYYY"
      className="
        w-full
        h-10                /* Force same height as other inputs */
        border border-gray-300 dark:border-gray-600
        rounded
        pl-10              /* Leave space for the icon */
        pr-3
        py-2
        focus:outline-none
        bg-white dark:bg-gray-700 dark:text-white
      "
    />
    <FaCalendarAlt
      className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-gray-500
      "
    />
  </div>
</div>

                {/* 8) Image Upload */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <label
                      className="flex flex-col items-center px-3 py-2 bg-blue-50 text-blue-600 
                                 border border-blue-300 rounded cursor-pointer hover:bg-blue-100 
                                 transition-colors text-sm"
                    >
                      <span>Click to upload</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="text-sm">
                      {file ? file.name : "No file chosen"}
                    </span>
                  </div>
                </div>

                {/* 9) Invoice Number */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Invoice Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Enter Full Name"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                {/* 10) Description */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 
                               rounded px-3 py-2 focus:outline-none 
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    <option value="">Select</option>
                    {/* Add real description options here */}
                    <option value="descA">Description A</option>
                    <option value="descB">Description B</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-orange-400 
                             text-orange-500 hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white 
                             hover:bg-blue-700 transition-colors"
                >
                  Assign Asset
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

