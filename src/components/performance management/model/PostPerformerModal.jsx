

// import React, { useEffect, useState } from 'react';
// import PostAndViewPerformersStore from '../../../store/PostAndViewPerformersStore';
// import { useForm } from 'react-hook-form';

// const PostPerformerModal = ({ isOpen, onClose }) => {
//   const { topEmployees, postTopPerformer, loading } = PostAndViewPerformersStore();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       employeeId: '',
//       comment: '',
//       month: '',
//       year: '',
//       files: null,
//     },
//   });

//   // We keep local state for fields we want read-only (designation, department, averageRating)
//   const [designation, setDesignation] = useState('');
//   const [department, setDepartment] = useState('');
//   const [avgRating, setAvgRating] = useState('');

//   // Watch the selected employee, auto-fill read-only data
//   const selectedId = watch('employeeId');
//   useEffect(() => {
//     const found = topEmployees.find((emp) => emp._id === selectedId);
//     if (found) {
//       setDesignation(found.designation || '');
//       setDepartment(found.department || '');
//       setAvgRating(found.averageRating ?? '');
//     } else {
//       setDesignation('');
//       setDepartment('');
//       setAvgRating('');
//     }
//   }, [selectedId, topEmployees]);

//   // Submit
//   const onSubmit = async (data) => {
//     const { employeeId, comment, month, year, files } = data;

//     // Build FormData
//     const formData = new FormData();
//     formData.append('employeeId', employeeId);
//     formData.append('averageRating', avgRating); // from local state
//     formData.append('comment', comment);
//     formData.append('designation', designation); // <- IMPORTANT: append designation
//     formData.append('month', month);
//     formData.append('year', year);

//     // Append media files if any
//     if (files && files.length > 0) {
//       for (const file of files) {
//         formData.append('media', file);
//       }
//     }

//     // Call the store action
//     await postTopPerformer(formData);

//     // Reset form and close modal
//     reset();
//     onClose();
//   };

//   // If modal not open, don't render
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-30 z-40"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div
//           className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md relative shadow-lg"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Close Button */}
//           <button
//             className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 
//                        hover:text-gray-800 dark:hover:text-gray-200"
//             onClick={onClose}
//           >
//             ✕
//           </button>

//           <h2 className="text-xl font-semibold mb-4">Post Performer of the Month</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Select Employee */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Select Employee</label>
//               <select
//                 {...register('employeeId', { required: true })}
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               >
//                 <option value="">-- Select Employee --</option>
//                 {topEmployees.map((emp) => (
//                   <option key={emp._id} value={emp._id}>
//                     {emp.firstName} {emp.lastName} (ID: {emp.employeeId})
//                   </option>
//                 ))}
//               </select>
//               {errors.employeeId && (
//                 <p className="text-red-500 text-xs mt-1">Employee is required</p>
//               )}
//             </div>

//             {/* Read-only: Designation, Department, Average Rating */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Designation</label>
//               <input
//                 type="text"
//                 value={designation}
//                 readOnly
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Department</label>
//               <input
//                 type="text"
//                 value={department}
//                 readOnly
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Average Rating</label>
//               <input
//                 type="text"
//                 value={avgRating}
//                 readOnly
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               />
//             </div>

//             {/* Comments (Optional) */}
//             <div>
//               <label className="block text-sm font-medium mb-1 bg-bg-secondary">Comments (optional)</label>
//               <textarea
//                 rows={3}
//                 {...register('comment')}
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//                 placeholder="Add comments if any"
//               />
//             </div>

//             {/* Month / Year */}
//             <div>
//               <label className="block text-sm font-medium mb-1 bg-bg-secondary">Month</label>
//               <input
//                 type="number"
//                 placeholder="1-12"
//                 {...register('month', { required: true })}
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               />
//               {errors.month && <p className="text-red-500 text-xs mt-1 bg-bg-secondary">Month is required</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1 bg-bg-secondary">Year</label>
//               <input
//                 type="number"
//                 placeholder="YYYY"
//                 {...register('year', { required: true })}
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
//               />
//               {errors.year && <p className="text-red-500 text-xs mt-1">Year is required</p>}
//             </div>

//             {/* Media (Multiple Files) */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Upload Media</label>
//               <input
//                 type="file"
//                 multiple
//                 {...register('files')}
//                 className="border border-gray-300 rounded-md w-full p-2 text-sm"
//               />
//               <p className="text-xs text-gray-400 mt-1">
//                 Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
//               disabled={loading}
//             >
//               {loading ? 'Posting...' : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostPerformerModal;

import React, { useEffect, useState } from 'react';
import PostAndViewPerformersStore from '../../../store/PostAndViewPerformersStore';
import { useForm } from 'react-hook-form';
import BaseModal from '../../common/BaseModal'; // Import BaseModal

const PostPerformerModal = ({ isOpen, onClose }) => {
  const { topEmployees, postTopPerformer, loading } = PostAndViewPerformersStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeId: '',
      comment: '',
      month: '',
      year: '',
      files: null,
    },
  });

  // We keep local state for fields we want read-only (designation, department, averageRating)
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [avgRating, setAvgRating] = useState('');

  // Watch the selected employee, auto-fill read-only data
  const selectedId = watch('employeeId');
  useEffect(() => {
    const found = topEmployees.find((emp) => emp._id === selectedId);
    if (found) {
      setDesignation(found.designation || '');
      setDepartment(found.department || '');
      setAvgRating(found.averageRating ?? '');
    } else {
      setDesignation('');
      setDepartment('');
      setAvgRating('');
    }
  }, [selectedId, topEmployees]);

  // Submit
  const onSubmit = async (data) => {
    const { employeeId, comment, month, year, files } = data;

    // Build FormData
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('averageRating', avgRating); // from local state
    formData.append('comment', comment);
    formData.append('designation', designation); // <- IMPORTANT: append designation
    formData.append('month', month);
    formData.append('year', year);

    // Append media files if any
    if (files && files.length > 0) {
      for (const file of files) {
        formData.append('media', file);
      }
    }

    // Call the store action
    await postTopPerformer(formData);

    // Reset form and close modal
    reset();
    onClose();
  };

  // If modal not open, don't render
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 
                     hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Post Performer of the Month</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Select Employee */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Employee</label>
            <select
              {...register('employeeId', { required: true })}
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            >
              <option value="">-- Select Employee --</option>
              {topEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName} (ID: {emp.employeeId})
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <p className="text-red-500 text-xs mt-1">Employee is required</p>
            )}
          </div>

          {/* Read-only: Designation, Department, Average Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input
              type="text"
              value={designation}
              readOnly
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              value={department}
              readOnly
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Average Rating</label>
            <input
              type="text"
              value={avgRating}
              readOnly
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            />
          </div>

          {/* Comments (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1 bg-bg-secondary">Comments (optional)</label>
            <textarea
              rows={3}
              {...register('comment')}
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
              placeholder="Add comments if any"
            />
          </div>

          {/* Month / Year */}
          <div>
            <label className="block text-sm font-medium mb-1 bg-bg-secondary">Month</label>
            <input
              type="number"
              placeholder="1-12"
              {...register('month', { required: true })}
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            />
            {errors.month && <p className="text-red-500 text-xs mt-1 bg-bg-secondary">Month is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 bg-bg-secondary">Year</label>
            <input
              type="number"
              placeholder="YYYY"
              {...register('year', { required: true })}
              className="border border-gray-300 rounded-md w-full p-2 text-sm bg-bg-secondary"
            />
            {errors.year && <p className="text-red-500 text-xs mt-1">Year is required</p>}
          </div>

          {/* Media (Multiple Files) */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Media</label>
            <input
              type="file"
              multiple
              {...register('files')}
              className="border border-gray-300 rounded-md w-full p-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Submit'}
          </button>
        </form>
      </div>
    </BaseModal>
  );
};

export default PostPerformerModal;
