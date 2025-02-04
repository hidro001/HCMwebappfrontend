
// import React from 'react';
// import { AiOutlineEye } from 'react-icons/ai';

// const PerformerDetailsModal = ({ performer, onClose }) => {
//   if (!performer) return null;

//   const { employee, media } = performer;



//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose} />
//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div
//           className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-lg relative shadow-lg"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Close button */}
//           <button
//             className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//           <h2 className="text-xl font-bold mb-4">
//             Ratings for {employee?.first_Name} {employee?.last_Name} (ID: {employee?.employee_Id})
//           </h2>

//           <p className="text-sm mb-4">
//             <strong>Designation:</strong> {employee?.designation} <br />
//             <strong>Department:</strong> {employee?.department} <br />
//             <strong>Average Rating:</strong> {performer.averageRating} / 5 <br />
//             <strong>Month/Year:</strong> {performer.month}/{performer.year} <br />
//             <strong>Comments:</strong> {performer.comment || 'No comments available'}
//           </p>

//           {/* Media Section */}
//           <h3 className="text-base font-semibold mb-2">Media Attachments</h3>
//           {media && media.length > 0 ? (
//             <div className="grid grid-cols-2 gap-4">
//               {media.map((url, idx) => {
//                 return (
//                   <div
//                     key={idx}
//                     className="border rounded p-2 flex flex-col items-center"
//                   >
//                     {/* We can check file extension to render icon or image */}
//                     {/* For simplicity, assume images: */}
//                     {/* Or you can display an icon for PDF, doc, etc. */}
//                     <img src={url} alt={`Attachment ${idx + 1}`} className="max-h-32 object-cover" />
//                     <button
//                       onClick={() => window.open(url, '_blank')}
//                       className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:underline text-sm"
//                     >
//                       <AiOutlineEye />
//                       View
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <p>No media attachments available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PerformerDetailsModal;

import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import BaseModal from "../../common/BaseModal"; // Adjust path as needed

const PerformerDetailsModal = ({ performer, onClose }) => {
  if (!performer) return null;

  const { employee, media } = performer;

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-lg 
                   relative shadow-lg"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 
                     hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Ratings for {employee?.first_Name} {employee?.last_Name} (ID:{" "}
          {employee?.employee_Id})
        </h2>

        <p className="text-sm mb-4">
          <strong>Designation:</strong> {employee?.designation} <br />
          <strong>Department:</strong> {employee?.department} <br />
          <strong>Average Rating:</strong> {performer.averageRating} / 5 <br />
          <strong>Month/Year:</strong> {performer.month}/{performer.year} <br />
          <strong>Comments:</strong>{" "}
          {performer.comment || "No comments available"}
        </p>

        {/* Media Section */}
        <h3 className="text-base font-semibold mb-2">Media Attachments</h3>
        {media && media.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {media.map((url, idx) => (
              <div
                key={idx}
                className="border rounded p-2 flex flex-col items-center"
              >
                <img
                  src={url}
                  alt={`Attachment ${idx + 1}`}
                  className="max-h-32 object-cover"
                />
                <button
                  onClick={() => window.open(url, "_blank")}
                  className="inline-flex items-center gap-1 mt-2 text-blue-600 
                             hover:underline text-sm"
                >
                  <AiOutlineEye />
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No media attachments available.</p>
        )}
      </div>
    </BaseModal>
  );
};

export default PerformerDetailsModal;
