
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// // Example questions
// const questions = [
//   { id: 1, text: 'Business operates in a well-established, stable industry' },
//   { id: 2, text: 'The industry / market is growing' },
//   { id: 3, text: 'Business likely to be negatively influenced by industry restructuring' },
//   { id: 4, text: 'Business likely to be influenced by negative global trends' },
//   { id: 5, text: 'Future industry trends will positively affect the business' },
// ];

// // The dropdown options, each with a label and color class
// const responseOptions = [
//   { value: '', label: 'No response', colorClass: 'text-gray-500' },
//   { value: 'definitely', label: 'Definitely', colorClass: 'text-green-600' },
//   { value: 'probably', label: 'Probably', colorClass: 'text-orange-500' },
//   { value: 'slight', label: 'No – Will change slightly', colorClass: 'text-blue-500' },
//   { value: 'moderate', label: 'No – Will change moderately', colorClass: 'text-yellow-500' },
//   { value: 'significant', label: 'No – Will change significantly', colorClass: 'text-red-500' },
// ];

// export default function BusinessPerformanceTable() {
//   // Store which dropdown option is selected for each question
//   const [responses, setResponses] = useState({});
//   // Store the automatically mirrored Performance Review text
//   const [performanceReviews, setPerformanceReviews] = useState({});

//   // Called whenever the user picks a dropdown value
//   const handleResponseChange = (questionId, newValue) => {
//     setResponses(prev => ({ ...prev, [questionId]: newValue }));

//     // Also set Performance Review text to the matching label
//     const selected = responseOptions.find(opt => opt.value === newValue);
//     setPerformanceReviews(prev => ({
//       ...prev,
//       [questionId]: (selected && selected.label) || '',
//     }));

//   };

//   return (
//     <div className="container px-4 py-8 dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 overflow-x-auto">
   

//       <h1 className="text-2xl font-bold mb-4">Business Performance Assessment</h1>

//       <table className="min-w-full border border-gray-300 dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-800">
//           <tr>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Question</th>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Response</th>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Performance Review</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map(q => (
//             <tr key={q.id} className="border-b dark:border-gray-700">
//               {/* Question */}
//               <td className="py-2 px-4 align-top">{q.text}</td>
              
//               {/* Response dropdown */}
//               <td className="py-2 px-4 align-top">
//                 <ResponseDropdown
//                   questionId={q.id}
//                   options={responseOptions}
//                   value={responses[q.id] || ''}
//                   onChange={handleResponseChange}
//                 />
//               </td>

//               {/* Performance Review: 
//                   mirrored automatically from the dropdown's selected label 
//                   (not user-editable in this version) 
//               */}
//               <td className="py-2 px-4 align-top">
//                 <input
//                   type="text"
//                   placeholder="No response"
//                   className="w-full border dark:border-gray-700 rounded px-2 py-1 
//                              bg-gray-50 dark:bg-gray-800 dark:text-gray-100 
//                              focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   value={performanceReviews[q.id] || ''}
//                   onChange={() => {}}
//                   disabled
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Separate component for the dropdown
// function ResponseDropdown({ questionId, options, value, onChange }) {
//   const [open, setOpen] = useState(false);

//   const selectedOption = options.find(opt => opt.value === value) || options[0];

//   const handleSelect = (optionValue) => {
//     onChange(questionId, optionValue);
//     setOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-56">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="flex items-center justify-between w-full border 
//                    dark:border-gray-700 px-3 py-2 rounded shadow-sm
//                    dark:bg-gray-800 dark:text-gray-100"
//       >
//         {selectedOption.label}
//         {open ? <FaChevronUp /> : <FaChevronDown />}
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             className="absolute left-0 w-full mt-1 bg-white dark:bg-gray-800 
//                        border dark:border-gray-700 rounded shadow-md z-10"
//             initial={{ opacity: 0, y: -6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//           >
//             {options.map(opt => (
         
//               <li
//   key={opt.value}
//   onClick={() => handleSelect(opt.value)}
//   className={`
//     px-3 py-2 text-sm cursor-pointer 
//     hover:bg-gray-100 dark:hover:bg-gray-700 
//     ${opt.colorClass} 
//     ${opt.value === value ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''}
//   `}
// >
//   {opt.label}
// </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
