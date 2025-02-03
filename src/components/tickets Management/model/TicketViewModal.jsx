
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// 1) Import your BaseModal
import BaseModal from "../../common/BaseModal"; // Adjust path as needed

export default function TicketViewModal({ isOpen, onClose, ticket }) {
  const [showAttachments, setShowAttachments] = useState(false);

  // If the modal is closed or no ticket provided, render nothing
  if (!isOpen || !ticket) return null;

  return (
    // 2) Wrap your content in <BaseModal>
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 
        3) Keep your "white box" design in a motion.div 
        for the entrance/exit animations 
      */}
      <motion.div
        className="relative z-50 w-full max-w-2xl bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700
                   rounded-xl shadow-2xl p-6 mx-4 transition-colors
                   max-h-[90vh] overflow-y-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-100">
            Issue Details
          </h2>
          <button
            className="text-gray-600 dark:text-gray-200 hover:text-gray-800
                       dark:hover:text-white transition-colors"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Info Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <div className="font-semibold text-gray-700 dark:text-gray-200">
              Title:
            </div>
            <div className="col-span-2 text-gray-800 dark:text-gray-100">
              {ticket.issueTitle}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="font-semibold text-gray-700 dark:text-gray-200">
              Description:
            </div>
            <div className="col-span-2 text-gray-800 dark:text-gray-100">
              {ticket.issueDescription}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-100 dark:bg-gray-700">
            <div className="font-semibold text-gray-700 dark:text-gray-200">
              User Details:
            </div>
            <div className="col-span-2 space-y-1 text-gray-800 dark:text-gray-100">
              <div>
                <strong>Name:</strong>{" "}
                {ticket.createdBy
                  ? `${ticket.createdBy.first_Name} ${ticket.createdBy.last_Name}`
                  : "Unknown"}
              </div>
              <div>
                <strong>Department:</strong> {ticket.assignedTo}
              </div>
              <div>
                <strong>Priority:</strong> {ticket.priority}
              </div>
              <div>
                <strong>Status:</strong> {ticket.issueStatus}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(ticket.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Toggle attachments */}
        <div className="text-center mt-5">
          <button
            onClick={() => setShowAttachments((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md 
                       shadow-md hover:bg-blue-700 transition-colors text-sm"
          >
            {showAttachments ? "Hide Attachments" : "Show Attachments"}
          </button>
        </div>

        {showAttachments && (
          <div className="mt-5 space-y-4">
            {ticket.file ? (
              <div>
                <a href={ticket.file} target="_blank" rel="noopener noreferrer">
                  <img
                    src={ticket.file}
                    alt="Attachment"
                    className="max-w-full h-auto rounded-md shadow border border-gray-200 dark:border-gray-600"
                  />
                </a>
              </div>
            ) : (
              <p>No primary attachment found</p>
            )}

            {ticket.additionalFiles &&
              ticket.additionalFiles.length > 0 &&
              ticket.additionalFiles.map((af, idx) => (
                <div key={af._id || idx}>
                  <a href={af.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={af.url}
                      alt={`Attachment-${idx}`}
                      className="max-w-full h-auto rounded-md shadow border border-gray-200 dark:border-gray-600"
                    />
                  </a>
                </div>
              ))}
          </div>
        )}
      </motion.div>
    </BaseModal>
  );
}
