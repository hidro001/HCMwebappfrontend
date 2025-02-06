
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// // Questions
// const questions = [
//   { id: 1, text: 'Business operates in a well-established, stable industry' },
//   { id: 2, text: 'The industry / market is growing' },
//   { id: 3, text: 'Business likely to be negatively influenced by industry restructuring' },
//   { id: 4, text: 'Business likely to be influenced by negative global trends' },
//   { id: 5, text: 'Future industry trends will positively affect the business' },
// ];

// // Dropdown options with color classes
// const responseOptions = [
//   { value: '', label: 'No response', colorClass: 'text-gray-500' },
//   { value: 'definitely', label: 'Definitely', colorClass: 'text-green-600' },
//   { value: 'probably', label: 'Probably', colorClass: 'text-blue-600' },
//   { value: 'no-slight', label: 'No – Will change slightly', colorClass: 'text-yellow-600' },
//   { value: 'no-moderate', label: 'No – Will change moderately', colorClass: 'text-orange-600' },
//   { value: 'no-significant', label: 'No – Will change significantly', colorClass: 'text-red-600' },
// ];

// export default function IndustryPerformanceTable() {
//   // Track dropdown selections
//   const [responses, setResponses] = useState({});
//   // Track automatically mirrored Performance Review text
//   const [reviews, setReviews] = useState({});

//   const handleResponseChange = (id, newValue) => {
//     // Update the responses
//     setResponses(prev => ({ ...prev, [id]: newValue }));

//     // Also update Performance Review with the selected label
//     const selectedOption = responseOptions.find(opt => opt.value === newValue);
//     setReviews(prev => ({
//       ...prev,
//       [id]: (selectedOption && selectedOption.label) || '',
//     }));
//   };

//   const handleReviewChange = (id, newValue) => {
//     setReviews(prev => ({ ...prev, [id]: newValue }));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100 h-fit border rounded-2xl mt-2 overflow-x-auto">
   

//       <h1 className="text-2xl font-bold mb-4">Assessment Form</h1>

//       <table className="min-w-full border border-gray-300 dark:border-gray-700 overflow-x-auto">
//         <thead className="bg-gray-100 dark:bg-gray-800">
//           <tr>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Question</th>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Response</th>
//             <th className="py-2 px-4 border-b dark:border-gray-700">Performance Review</th>
//           </tr>
//         </thead>
//         <tbody className=''>
//           {questions.map((q) => (
//             <tr key={q.id} className="border-b dark:border-gray-700">
//               <td className="py-2 px-4 align-top">{q.text}</td>

//               {/* Dropdown Cell */}
//               <td className="py-2 px-4 align-top">
//                 <ResponseDropdown
//                   questionId={q.id}
//                   options={responseOptions}
//                   value={responses[q.id] || ''}
//                   onChange={handleResponseChange}
//                 />
//               </td>

//               {/* Performance Review Cell */}
//               <td className="py-2 px-4 align-top">
//                 <input
//                   type="text"
//                   className="w-full border dark:border-gray-700 rounded px-2 py-1 
//                              focus:outline-none dark:bg-gray-800 dark:text-gray-100"
//                   placeholder="No response"
//                   value={reviews[q.id] || ''}
//                   onChange={(e) => handleReviewChange(q.id, e.target.value)}
//                   // If you want read-only, add: disabled or readOnly
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function ResponseDropdown({ questionId, options, value, onChange }) {
//   const [open, setOpen] = useState(false);

//   const selectedOption = options.find(opt => opt.value === value) || options[0];

//   const handleOptionClick = (optionValue) => {
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
//             {options.map(option => (
//               <li
//                 key={option.value}
//                 onClick={() => handleOptionClick(option.value)}
//                 className={`
//                   px-3 py-2 text-sm cursor-pointer 
//                   hover:bg-gray-100 dark:hover:bg-gray-700 
//                   ${option.colorClass}
//                   ${option.value === value ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''}
//                 `}
//               >
//                 {option.label}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Questions (matching the screenshot)
const questions = [
  { id: 1, text: 'Business operates in a well-established, stable industry' },
  { id: 2, text: 'The industry / market is growing' },
  { id: 3, text: 'Business likely to be negatively influenced by industry restructuring' },
  { id: 4, text: 'Business likely to be influenced by negative global trends' },
  // Starting here, the same question repeated but each row can have a different response selected
  { id: 5, text: 'Future industry trends will positively affect the business' },
  { id: 6, text: 'Future industry trends will positively affect the business' },
  { id: 7, text: 'Future industry trends will positively affect the business' },
  { id: 8, text: 'Future industry trends will positively affect the business' },
  { id: 9, text: 'Future industry trends will positively affect the business' },
  { id: 10, text: 'Future industry trends will positively affect the business' },
  { id: 11, text: 'Future industry trends will positively affect the business' },
  { id: 12, text: 'Future industry trends will positively affect the business' },
  { id: 13, text: 'Future industry trends will positively affect the business' },
  { id: 14, text: 'Future industry trends will positively affect the business' },
  { id: 15, text: 'Future industry trends will positively affect the business' },
];

// Color‐coded dropdown options
const responseOptions = [
  { value: '', label: 'No response', colorClass: 'text-gray-500' },
  { value: 'average', label: 'Average', colorClass: 'text-purple-500' },
  { value: 'below-average', label: 'Below Average', colorClass: 'text-orange-500' },
  { value: 'low', label: 'Low', colorClass: 'text-blue-600' },
  { value: 'above-average', label: 'Above Average', colorClass: 'text-orange-500' },
  { value: 'no-opinion', label: 'No Opinion', colorClass: 'text-gray-500' },
  { value: 'extremely-low', label: 'Extremely Low', colorClass: 'text-green-600' },
  { value: 'very-low', label: 'Very Low', colorClass: 'text-blue-600' },
  { value: 'high', label: 'High', colorClass: 'text-blue-600' },
  { value: 'very-high', label: 'Very High', colorClass: 'text-green-600' },
  { value: 'exceptional', label: 'Exceptional', colorClass: 'text-pink-500' },
  { value: 'perfect', label: 'Perfect', colorClass: 'text-green-600' },
  { value: 'no-slight', label: 'No – Will change slightly', colorClass: 'text-blue-500' },
];

export default function IndustryPerformanceTable() {
  // Track dropdown selections
  const [responses, setResponses] = useState({});
  // Track automatically mirrored Performance Review text
  const [reviews, setReviews] = useState({});

  const handleResponseChange = (id, newValue) => {
    // Update the responses
    setResponses((prev) => ({ ...prev, [id]: newValue }));

    // Update Performance Review with the selected label
    const selectedOption = responseOptions.find((opt) => opt.value === newValue);
    setReviews((prev) => ({
      ...prev,
      [id]: (selectedOption && selectedOption.label) || '',
    }));
  };

  const handleReviewChange = (id, newValue) => {
    setReviews((prev) => ({ ...prev, [id]: newValue }));
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100 border rounded-2xl mt-2 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Assessment Form</h1>

      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">Question</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Response</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Performance Review</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="border-b dark:border-gray-700">
              {/* Question */}
              <td className="py-2 px-4 align-top">{q.text}</td>

              {/* Response Dropdown */}
              <td className="py-2 px-4 align-top">
                <ResponseDropdown
                  questionId={q.id}
                  options={responseOptions}
                  value={responses[q.id] || ''}
                  onChange={handleResponseChange}
                />
              </td>

              {/* Performance Review (auto-mirrors the dropdown, color-coded) */}
              <td className="py-2 px-4 align-top">
                <PerformanceReviewInput
                  reviewValue={reviews[q.id] || ''}
                  onChange={(val) => handleReviewChange(q.id, val)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResponseDropdown({ questionId, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleOptionClick = (optionValue) => {
    onChange(questionId, optionValue);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-48">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full border px-3 py-2 rounded shadow-sm
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 
          ${selectedOption.colorClass}`}
      >
        {selectedOption.label}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute left-0 w-full mt-1 bg-white dark:bg-gray-800 
                       border dark:border-gray-700 rounded shadow-md z-10"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                  ${option.colorClass}
                  ${
                    option.value === value
                      ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                      : ''
                  }
                `}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Performance review input that uses the same color class as the selected dropdown label
function PerformanceReviewInput({ reviewValue, onChange }) {
  // Map the label text to a color class
  const colorMap = {
    'Average': 'text-purple-500',
    'Below Average': 'text-orange-500',
    'Low': 'text-blue-600',
    'Above Average': 'text-orange-500',
    'No Opinion': 'text-gray-500',
    'Extremely Low': 'text-green-600',
    'Very Low': 'text-blue-600',
    'High': 'text-blue-600',
    'Very High': 'text-green-600',
    'Exceptional': 'text-pink-500',
    'Perfect': 'text-green-600',
    'No – Will change slightly': 'text-blue-500',
    'No response': 'text-gray-500',
  };

  // If the text doesn't match exactly, default to gray
  const colorClass = colorMap[reviewValue] || 'text-gray-500';

  return (
    <input
      type="text"
      className={`w-full border dark:border-gray-700 rounded px-2 py-1 
        focus:outline-none dark:bg-gray-800 dark:text-gray-100 
        ${colorClass}
      `}
      placeholder="No response"
      value={reviewValue}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
