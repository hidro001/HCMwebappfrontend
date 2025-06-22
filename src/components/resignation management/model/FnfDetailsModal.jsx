// import { motion } from "framer-motion";
// import { FiCheckCircle, FiClock, FiRefreshCw, FiAlertCircle, FiDollarSign, FiXCircle, FiUser } from "react-icons/fi";

// const getStatusIcon = (status) => {
//   switch (status) {
//     case "Processed":
//       return <FiCheckCircle className="w-5 h-5 text-green-500" />;
//     case "Pending":
//       return <FiClock className="w-5 h-5 text-amber-500" />;
//     case "In Progress":
//       return <FiRefreshCw className="w-5 h-5 text-blue-500" />;
//     default:
//       return <FiAlertCircle className="w-5 h-5 text-gray-500" />;
//   }
// };

// const getStatusStyles = (status) => {
//   switch (status) {
//     case "Processed":
//       return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
//     case "Pending":
//       return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
//     case "In Progress":
//       return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
//     default:
//       return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
//   }
// };

// export default function FnfDetailsModal({ isOpen, onClose, fnf }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed z-50 inset-0 flex items-center justify-center p-4">
//       {/* backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* modal content */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 20 }}
//         className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//       >
//         {/* header */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
//               <FiDollarSign className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
//               FNF Details
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Full and Final Settlement Information</p>
//           </div>
//           <button onClick={onClose} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
//             <FiXCircle className="w-6 h-6" />
//           </button>
//         </div>

//         {/* body */}
//         <div className="p-6">
//           {fnf ? (
//             <div className="space-y-6">
//               {/* status */}
//               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Status</span>
//                 <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusStyles(fnf.status)}`}>
//                   {getStatusIcon(fnf.status)}
//                   <span>{fnf.status}</span>
//                 </div>
//               </div>

//               {/* financials */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <FiDollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
//                     <span className="text-sm font-medium text-green-800 dark:text-green-400">FNF Amount</span>
//                   </div>
//                   <p className="text-2xl font-bold text-green-900 dark:text-green-300">₹{fnf.fnfAmount || "0"}</p>
//                 </div>
//                 <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <FiXCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
//                     <span className="text-sm font-medium text-red-800 dark:text-red-400">Deductions</span>
//                   </div>
//                   <p className="text-2xl font-bold text-red-900 dark:text-red-300">₹{fnf.deductions || "0"}</p>
//                 </div>
//                 <div className="md:col-span-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <FiCheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                     <span className="text-sm font-medium text-blue-800 dark:text-blue-400">Net Payable Amount</span>
//                   </div>
//                   <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">₹{fnf.netPayable || "0"}</p>
//                 </div>
//               </div>

//               {/* processed by */}
//               {fnf.processedBy && (
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
//                     <FiUser className="w-4 h-4 mr-2" />
//                     Processing Information
//                   </h4>
//                   <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
//                     <p>
//                       <span className="font-medium">Processed By:</span>{" "}
//                       {fnf.processedBy.first_Name} {fnf.processedBy.last_Name} ({fnf.processedBy.employee_Id})
//                     </p>
//                     <p>
//                       <span className="font-medium">Processed At:</span>{" "}
//                       {fnf.processedAt ? new Date(fnf.processedAt).toLocaleString() : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiDollarSign className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No FNF Record Found</h3>
//               <p className="text-gray-500 dark:text-gray-400">Your FNF settlement hasn't been processed yet.</p>
//             </div>
//           )}
//         </div>

//         {/* footer */}
//         <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600 flex justify-end">
//           <button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 font-medium transition-colors">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



// src/components/FnfDetailsModal.jsx

import React from "react";
import BaseModal from "../../common/BaseModal"; 
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiAlertCircle,
  FiDollarSign,
  FiXCircle,
  FiUser,
} from "react-icons/fi";

const getStatusIcon = (status) => {
  switch (status) {
    case "Processed":
      return <FiCheckCircle className="w-5 h-5 text-green-500" />;
    case "Pending":
      return <FiClock className="w-5 h-5 text-amber-500" />;
    case "In Progress":
      return <FiRefreshCw className="w-5 h-5 text-blue-500" />;
    default:
      return <FiAlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case "Processed":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    case "Pending":
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

export default function FnfDetailsModal({ isOpen, onClose, fnf }) {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <FiDollarSign className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
              FNF Details
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Full and Final Settlement Information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <FiXCircle className="w-6 h-6" />
          </button>
        </div>

        {/* body */}
        <div className="p-6">
          {fnf ? (
            <div className="space-y-6">
              {/* status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current Status
                </span>
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusStyles(
                    fnf.status
                  )}`}
                >
                  {getStatusIcon(fnf.status)}
                  <span>{fnf.status}</span>
                </div>
              </div>

              {/* financials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiDollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-400">
                      FNF Amount
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                    ₹{fnf.fnfAmount || "0"}
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiXCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-800 dark:text-red-400">
                      Deductions
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-300">
                    ₹{fnf.deductions || "0"}
                  </p>
                </div>
                <div className="md:col-span-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiCheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-400">
                      Net Payable Amount
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                    ₹{fnf.netPayable || "0"}
                  </p>
                </div>
              </div>

              {/* processed by */}
              {fnf.processedBy && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    Processing Information
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      <span className="font-medium">Processed By:</span>{" "}
                      {fnf.processedBy.first_Name} {fnf.processedBy.last_Name} (
                      {fnf.processedBy.employee_Id})
                    </p>
                    <p>
                      <span className="font-medium">Processed At:</span>{" "}
                      {fnf.processedAt
                        ? new Date(fnf.processedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No FNF Record Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your FNF settlement hasn't been processed yet.
              </p>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}
