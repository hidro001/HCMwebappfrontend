// import React from "react";
// import PropTypes from "prop-types";
// import BaseModal from "../common/BaseModal"; // Adjust import as needed
// import { Button } from "@mui/material";

// const ConfirmationDialog = ({
//   open,
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
// }) => {
//   return (
//     <BaseModal isOpen={open} onClose={onCancel}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3 text-center ">
//         <h3 className="text-lg font-bold mb-3">{title}</h3>
//         <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>

//         <div className="flex justify-center gap-4">
//           <Button
//             onClick={onCancel}
//             variant="outlined"
//             color="secondary"
//             className="w-1/3"
//           >
//             {cancelText}
//           </Button>
//           <Button
//             onClick={onConfirm}
//             variant="contained"
//             color="primary"
//             className="w-1/3"
//           >
//             {confirmText}
//           </Button>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// ConfirmationDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired,
//   onConfirm: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
//   confirmText: PropTypes.string,
//   cancelText: PropTypes.string,
// };

// export default ConfirmationDialog;


import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaQuestionCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaTimes,
  FaTrash,
  FaSave,
  FaEdit,
  FaDownload
} from "react-icons/fa";
import {
  HiExclamation,
  HiInformationCircle,
  HiCheck,
  HiX
} from "react-icons/hi";
import BaseModal from "../common/BaseModal";

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", // default, warning, danger, success, info
  icon = null,
  destructive = false,
  loading = false,
}) => {
  // Get appropriate styling based on type
  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          confirmBg: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          defaultIcon: FaExclamationTriangle,
          borderColor: "border-yellow-200 dark:border-yellow-800"
        };
      case "danger":
        return {
          iconBg: "bg-red-100 dark:bg-red-900/20",
          iconColor: "text-red-600 dark:text-red-400",
          confirmBg: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          defaultIcon: FaExclamationTriangle,
          borderColor: "border-red-200 dark:border-red-800"
        };
      case "success":
        return {
          iconBg: "bg-green-100 dark:bg-green-900/20",
          iconColor: "text-green-600 dark:text-green-400",
          confirmBg: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
          defaultIcon: FaCheckCircle,
          borderColor: "border-green-200 dark:border-green-800"
        };
      case "info":
        return {
          iconBg: "bg-blue-100 dark:bg-blue-900/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          confirmBg: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          defaultIcon: FaInfoCircle,
          borderColor: "border-blue-200 dark:border-blue-800"
        };
      default:
        return {
          iconBg: "bg-gray-100 dark:bg-gray-700",
          iconColor: "text-gray-600 dark:text-gray-400",
          confirmBg: destructive 
            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          defaultIcon: FaQuestionCircle,
          borderColor: "border-gray-200 dark:border-gray-700"
        };
    }
  };

  const typeStyles = getTypeStyles();
  const IconComponent = icon || typeStyles.defaultIcon;

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <BaseModal isOpen={open} onClose={onCancel}>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border ${typeStyles.borderColor} w-full max-w-md mx-auto overflow-hidden`}
          >
            {/* Header Section */}
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${typeStyles.iconBg}`}>
                  <IconComponent className={`w-8 h-8 ${typeStyles.iconColor}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3">
                {/* Cancel Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onCancel}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <HiX className="w-4 h-4" />
                    <span>{cancelText}</span>
                  </span>
                </motion.button>

                {/* Confirm Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onConfirm}
                  disabled={loading}
                  className={`w-full sm:w-auto px-6 py-3 ${typeStyles.confirmBg} text-white rounded-xl focus:outline-none focus:ring-2 ${typeStyles.confirmBg.includes('ring-') ? '' : 'focus:ring-blue-500'} focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {destructive || type === "danger" ? (
                          <FaTrash className="w-4 h-4" />
                        ) : type === "success" ? (
                          <HiCheck className="w-4 h-4" />
                        ) : (
                          <HiCheck className="w-4 h-4" />
                        )}
                        <span>{confirmText}</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Additional Actions (if any) */}
            {(type === "danger" || destructive) && (
              <div className="px-6 pb-4">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <HiExclamation className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Warning
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        This action cannot be undone. Please make sure you want to proceed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(["default", "warning", "danger", "success", "info"]),
  icon: PropTypes.elementType,
  destructive: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ConfirmationDialog;