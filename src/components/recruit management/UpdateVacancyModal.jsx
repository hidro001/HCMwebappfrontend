import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Skeleton } from '@mui/material';

// ------------------ UpdateVacancyModal ------------------
export default function UpdateVacancyModal({ vacancy, onClose, onSave }) {
    const [status, setStatus] = useState(vacancy.status || 'Vacant');
    const [budget, setBudget] = useState(vacancy.budget || '');


    
  
    const handleSave = () => {
      onSave(status, budget);
    };
  
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40  backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
        >
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
            onClick={onClose}
          >
            &times;
          </button>
  
          <h2 className="text-lg font-semibold mb-4">
            Vacancy Of {vacancy.designation}
          </h2>
  
          <div className="space-y-2 text-sm mb-4">
            <div>
              <strong>Job Designation:</strong> {vacancy.designation}
            </div>
            <div>
              <strong>Department:</strong> {vacancy.department}
            </div>
            <div>
              <strong>Posted By:</strong> {vacancy.postedBy}
            </div>
            <div>
              <strong>Posted Date:</strong> {vacancy.postedDate} &nbsp;|&nbsp; 10:30 AM
            </div>
            <div>
              <strong>Job Description:</strong>{' '}
              <span className="inline-block text-blue-600 underline cursor-pointer">
                JD.zip
              </span>
            </div>
          </div>
  
          {/* Status & Budget fields */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Status</label>
            <select
              className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Vacant">Vacant</option>
              <option value="Filled">Filled</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm mb-1">Budget</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              placeholder="3 LPA"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
  
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }