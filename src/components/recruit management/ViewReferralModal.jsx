
// import React from "react";
// import { motion } from "framer-motion";
// import { FaTimes } from "react-icons/fa";

// export default function ViewReferralModal({ referral, onClose }) {
//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Modal Card */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-lg p-4 relative"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//       >
//         {/* Close Icon */}
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>

//         <h2 className="text-lg font-semibold mb-4">
//           Referral Of {referral.referredBy} For {referral.designation}
//         </h2>

//         <div className="flex gap-4">
//           {/* Left details */}
//           <div className="flex-1 space-y-2 text-sm">
//             <div>
//               <strong>Job Designation:</strong> {referral.designation}
//             </div>
//             <div>
//               <strong>Department:</strong> {referral.department}
//             </div>
//             <div>
//               <strong>Referred By:</strong> {referral.referredBy}
//             </div>
//             <div>
//               <strong>Candidate Name:</strong> {referral.candidateName}
//             </div>
//             <div>
//               <strong>Candidate Email:</strong> {referral.candidateEmail}
//             </div>
//             <div>
//               <strong>Candidate Phone Number:</strong> {referral.candidatePhone}
//             </div>
//             <div>
//               <strong>Candidate Location:</strong> {referral.candidateLocation}
//             </div>
//             <div>
//               <strong>Status:</strong> {referral.status}
//             </div>
//             <div>
//               <strong>Candidate Resume:</strong>{" "}
//               <span className="text-blue-600 cursor-pointer">
//                 <a
//                   href={referral.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
          
//                   <button>View</button>{" "}
//                 </a>
//               </span>
//             </div>
//           </div>
//           {/* Right side dummy illustration */}
//           <div className="flex-1 flex items-center justify-center">
//             {/* Example placeholder graphic */}
//             <svg
//               width="80"
//               height="80"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//               viewBox="0 0 24 24"
//               className="text-green-300"
//             >
//               <circle cx="8" cy="12" r="3"></circle>
//               <circle cx="16" cy="12" r="3"></circle>
//               <line x1="10.5" y1="12" x2="13.5" y2="12"></line>
//             </svg>
//           </div>
//         </div>

//         <div className="mt-4 text-right">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={onClose}
//           >
//           Close
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// 1) Import your BaseModal
import BaseModal from "../common/BaseModal"; // Adjust path as needed

export default function ViewReferralModal({ referral, onClose }) {
  // If there's no referral or the modal isn't supposed to open, render nothing
  if (!referral) return null;

  return (
    // 2) Wrap your "card" in BaseModal
    <BaseModal isOpen={Boolean(referral)} onClose={onClose}>
      {/* 3) Keep the motion.div for the "card" animation */}
      <motion.div
        className="bg-white dark:bg-gray-800 dark:text-gray-100
                   rounded-lg shadow-lg w-full max-w-lg p-4 relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 
                     dark:hover:text-gray-300"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Referral Of {referral.referredBy} For {referral.designation}
        </h2>

        <div className="flex gap-4">
          {/* Left details */}
          <div className="flex-1 space-y-2 text-sm">
            <div>
              <strong>Job Designation:</strong> {referral.designation}
            </div>
            <div>
              <strong>Department:</strong> {referral.department}
            </div>
            <div>
              <strong>Referred By:</strong> {referral.referredBy}
            </div>
            <div>
              <strong>Candidate Name:</strong> {referral.candidateName}
            </div>
            <div>
              <strong>Candidate Email:</strong> {referral.candidateEmail}
            </div>
            <div>
              <strong>Candidate Phone Number:</strong> {referral.candidatePhone}
            </div>
            <div>
              <strong>Candidate Location:</strong> {referral.candidateLocation}
            </div>
            <div>
              <strong>Status:</strong> {referral.status}
            </div>
            <div>
              <strong>Candidate Resume:</strong>{" "}
              <span className="text-blue-600 cursor-pointer">
                <a
                  href={referral.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>View</button>
                </a>
              </span>
            </div>
          </div>
          {/* Right side dummy illustration */}
          <div className="flex-1 flex items-center justify-center">
            {/* Example placeholder graphic */}
            <svg
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              className="text-green-300"
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
            Close
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}

