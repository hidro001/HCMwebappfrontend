// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import ConfirmationDialog from "../../../components/common/ConfirmationDialog"; // Adjust the import path as needed
// import useResignationStore from "../../../store/useResignationStore";

// export default function SubmitResignationModal({ isOpen, onClose, onSubmit }) {
//   const { submitResignation } = useResignationStore();
//   const { register, handleSubmit, reset } = useForm();
//   const [error, setError] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState(null);

//   // When the form is submitted, validate dates and then ask for confirmation
//   const onFormSubmit = (data) => {
//     setError(null);
//     if (new Date(data.resignationDate) > new Date(data.lastWorkingDay)) {
//       setError("Last working day must be after resignation date.");
//       return;
//     }
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   // When the confirmation is accepted, call the store API
//   const handleConfirmSubmit = async () => {
//     try {
//       await submitResignation(formData);
//       setShowConfirm(false);
//       reset();
//       onSubmit();
//     } catch (err) {
//       // The store handles error toasts
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
//           <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
//             Submit Resignation
//           </h2>
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
//           >
//             ✕
//           </button>
//           {/* Error Message */}
//           {error && (
//             <p className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-300 p-2 rounded-md text-sm">
//               {error}
//             </p>
//           )}
//           <form onSubmit={handleSubmit(onFormSubmit)}>
//             {/* Resignation Date */}
//             <div className="mt-2">
//               <label htmlFor="resignationDate" className="block font-semibold mb-1">
//                 Resignation Date
//               </label>
//               <input
//                 id="resignationDate"
//                 type="date"
//                 {...register("resignationDate", { required: true })}
//                 className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             {/* Last Working Day */}
//             <div className="mt-4">
//               <label htmlFor="lastWorkingDay" className="block font-semibold mb-1">
//                 Last Working Day
//               </label>
//               <input
//                 id="lastWorkingDay"
//                 type="date"
//                 {...register("lastWorkingDay", { required: true })}
//                 className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             {/* Comments */}
//             <div className="mt-4">
//               <label htmlFor="comments" className="block font-semibold mb-1">
//                 Comments
//               </label>
//               <textarea
//                 id="comments"
//                 placeholder="Write Comment..."
//                 {...register("comments")}
//                 className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex justify-end mt-6 space-x-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={showConfirm}
//         title="Confirm Resignation"
//         message="Are you sure you want to submit your resignation?"
//         onConfirm={handleConfirmSubmit}
//         onCancel={() => setShowConfirm(false)}
//         confirmText="Yes, Submit"
//         cancelText="Cancel"
//       />
//     </>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import useResignationStore from "../../../store/useResignationStore";

// 1) Import from react-hot-toast
import toast from "react-hot-toast";

export default function SubmitResignationModal({ isOpen, onClose, onSubmit }) {
  const { submitResignation } = useResignationStore();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);

  // When the form is submitted, validate dates and then show a confirmation dialog
  const onFormSubmit = (data) => {
    setError(null);
    if (new Date(data.resignationDate) > new Date(data.lastWorkingDay)) {
      setError("Last working day must be after resignation date.");
      return;
    }
    setFormData(data);
    setShowConfirm(true);
  };

  // When the confirmation is accepted, call the store's submitResignation
  const handleConfirmSubmit = async () => {
    try {
      await submitResignation(formData);
      toast.success("Resignation submitted successfully!"); // <-- success toast
      setShowConfirm(false);
      reset();
      onSubmit();
    } catch (err) {
      // If for some reason your store doesn't already handle errors, you can:
      toast.error("Failed to submit resignation. Please try again."); // <-- error toast
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
          <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Submit Resignation
          </h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            ✕
          </button>
          {/* Error Message */}
          {error && (
            <p className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-300 p-2 rounded-md text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Resignation Date */}
            <div className="mt-2">
              <label
                htmlFor="resignationDate"
                className="block font-semibold mb-1"
              >
                Resignation Date
              </label>
              <input
                id="resignationDate"
                type="date"
                {...register("resignationDate", { required: true })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Last Working Day */}
            <div className="mt-4">
              <label
                htmlFor="lastWorkingDay"
                className="block font-semibold mb-1"
              >
                Last Working Day
              </label>
              <input
                id="lastWorkingDay"
                type="date"
                {...register("lastWorkingDay", { required: true })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Comments */}
            <div className="mt-4">
              <label htmlFor="comments" className="block font-semibold mb-1">
                Comments
              </label>
              <textarea
                id="comments"
                placeholder="Write Comment..."
                {...register("comments")}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirm}
        title="Confirm Resignation"
        message="Are you sure you want to submit your resignation?"
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowConfirm(false)}
        confirmText="Yes, Submit"
        cancelText="Cancel"
      />
    </>
  );
}
