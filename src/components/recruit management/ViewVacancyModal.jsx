import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Skeleton } from '@mui/material';





// ------------------ ViewVacancyModal ------------------
export default function ViewVacancyModal({ vacancy, onClose }) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40  backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-lg p-4 relative"
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
  
          <div className="flex gap-4 text-sm">
            {/* Left info */}
            <div className="flex-1 space-y-2">
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
                <strong>Candidate Budget:</strong> {vacancy.budget}
              </div>
              <div>
                <strong>Hiring Status:</strong>{' '}
                <span className={vacancy.status === 'Vacant' ? 'text-red-500' : 'text-green-500'}>
                  {vacancy.status}
                </span>
              </div>
              <div>
                <strong>Job Description:</strong>{' '}
                <span className="inline-block text-blue-600 underline cursor-pointer">
                  JD.zip
                </span>
              </div>
            </div>
            {/* Right illustration (replace with your graphic) */}
            <div className="flex-1 flex items-center justify-center">
              <svg
                width="80"
                height="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
                className="text-green-200"
              >
                <circle cx="8" cy="12" r="3"></circle>
                <circle cx="16" cy="12" r="3"></circle>
                <line x1="10.5" y1="12" x2="13.5" y2="12"></line>
              </svg>
            </div>
          </div>
  
          <div className="mt-4 text-right">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Update Status
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }