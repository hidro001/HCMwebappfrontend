


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal from "../../common/BaseModal"; // Adjust path to wherever BaseModal is

function AnnouncementModal({ isOpen, onClose, announcement }) {
  // If there's no announcement to display, don't render anything
  if (!announcement) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modalContent"
            className="
              w-11/12 max-w-2xl
              bg-white dark:bg-gray-800
              rounded-lg shadow-lg
              p-6
              relative
            "
            // Slide/scale in/out the modal
            initial={{ y: -40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-lime-600 dark:text-lime-400">
                Latest Announcement (
                {new Date(announcement.announcementDate).toLocaleDateString()})
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col sm:flex-row gap-4">
              {announcement.announcementPostImg && (
                <img
                  src={announcement.announcementPostImg}
                  alt={announcement.announcementSubject}
                  className="w-full max-w-xs h-auto object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {announcement.announcementSubject}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                  {new Date(announcement.announcementDate).toLocaleDateString()} | 12:00 pm
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300">
                  Posted by: Admin
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-800 dark:text-gray-100 text-sm whitespace-pre-wrap">
                {announcement.announcementDescription}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}

export default AnnouncementModal;
