import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import BaseModal from "../../common/BaseModal"; 


const SkeletonPlaceholder = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md ${className}`} />
);

const AnnouncementDetailModal = ({ isOpen, onClose, announcement }) => {
  // If there's no announcement or the modal is not open, return null.
  if (!isOpen || !announcement) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full mx-4 p-4 md:p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Announcement Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100"
            aria-label="Close announcement details"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">
          {/* Announcement Image */}
          {announcement.announcementPostImg ? (
            <div className="w-full h-64 md:h-72 rounded-md overflow-hidden mb-4">
              <img
                src={announcement.announcementPostImg}
                alt={announcement.announcementSubject}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <SkeletonPlaceholder className="w-full h-64 mb-4" />
          )}

          {/* Subject, Description */}
          <h3 className="text-lg font-bold mb-2">
            {announcement.announcementSubject || (
              <SkeletonPlaceholder className="w-1/2 h-4" />
            )}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 whitespace-pre-line">
            {announcement.announcementDescription || (
              <SkeletonPlaceholder className="w-full h-4" />
            )}
          </p>

          {/* Date and "Chip" for Departments */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Date:</span>{" "}
              {announcement.announcementDate
                ? new Date(announcement.announcementDate).toLocaleDateString()
                : "—"}
            </p>
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded mt-1 md:mt-0
                ${
                  announcement.publish_for_all
                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                    : "bg-green-500 dark:bg-green-600 text-white"
                }`}
            >
              {announcement.publish_for_all
                ? "All Departments"
                : `${announcement.department.length} Dept`}
            </span>
          </div>

          {/* List of Departments (if not publish_for_all) */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Departments:</strong>{" "}
            {announcement.publish_for_all
              ? "All Departments"
              : announcement.department
                  .map((dept) => dept.department)
                  .join(", ")}
          </p>
        </div>
      </motion.div>
    </BaseModal>
  );
};

export default AnnouncementDetailModal;
