// import React, { useState } from 'react';
// import { motion } from 'framer-motion';


// const initialTasks = [
//   {
//     id: 1,
//     number: '01',
//     numberBg: 'bg-blue-400',
//     title: 'UI Elements and Widgets',
//     activityStatus: { text: 'Active', color: 'text-green-500 bg-green-50 border-green-500' },
//     progressStatus: { text: 'Progress', color: 'text-yellow-500' },
//     isComplete: false,
//   },
//   {
//     id: 2,
//     number: '02',
//     numberBg: 'bg-yellow-400',
//     title: 'Styleguide and Elements',
//     activityStatus: { text: 'Inactive', color: 'text-red-500 bg-red-50 border-red-500' },
//     progressStatus: { text: 'On Hold', color: 'text-red-500' },
//     isComplete: false,
//   },
//   {
//     id: 3,
//     number: '03',
//     numberBg: 'bg-pink-400',
//     title: 'Webdesigner Mockups',
//     activityStatus: { text: 'Active', color: 'text-green-500 bg-green-50 border-green-500' },
//     progressStatus: { text: 'Done', color: 'text-green-500' },
//     isComplete: true,
//   },
//   {
//     id: 4,
//     number: '04',
//     numberBg: 'bg-purple-400',
//     title: 'User Interface Styles',
//     activityStatus: { text: 'Active', color: 'text-green-500 bg-green-50 border-green-500' },
//     progressStatus: { text: 'Progress', color: 'text-yellow-500' },
//     isComplete: false,
//   },
// ];

// const AssignedTaskListCard = () => {
//   // Local state for tasks, so checkbox toggling can work.
//   const [tasks, setTasks] = useState(initialTasks);

//   // Toggle the “isComplete” field
//   const handleCheckboxChange = (id) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === id ? { ...task, isComplete: !task.isComplete } : task
//       )
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full p-5 rounded-lg shadow bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
//     >
//       {/* Card Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold">Assigned Task List</h2>
//         <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <circle cx="10" cy="4" r="2" />
//             <circle cx="10" cy="10" r="2" />
//             <circle cx="10" cy="16" r="2" />
//           </svg>
//         </button>
//       </div>

//       {/* Table-like Task Rows */}
//       <div className="divide-y divide-gray-200 dark:divide-slate-600 ">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className="flex items-center justify-between py-3  w-full m-auto "
//           >
//             {/* Left side: Number circle + Title */}
//             <div className="flex items-center space-x-3  w-80">
//               <div
//                 className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold  ${task.numberBg}`}
//               >
//                 {task.number}
//               </div>
//               <span className="font-semibold ">{task.title}</span>
//             </div>

//             {/* Middle area: Activity + Progress */}
//             <div className="flex items-center justify-between space-x-6  w-44">
//               {/* Activity status pill with tiny color circle */}
//               <div
//                 className={`
//                   flex items-center space-x-2 
//                   border 
//                   rounded-full 
//                   px-3 py-1 
//                   text-sm 
//                   font-medium
//                   ${task.activityStatus.color}
//                 `}
//               >
//                 <span
//                   className="inline-block w-2 h-2 rounded-full"
//                   style={{
//                     backgroundColor: task.activityStatus.color.includes('green')
//                       ? '#10B981'
//                       : '#EF4444',
//                   }}
//                 />
//                 <span>{task.activityStatus.text}</span>
//               </div>

//               {/* Progress status text */}
//               <span className={`text-sm font-semibold ${task.progressStatus.color}`}>
//                 {task.progressStatus.text}
//               </span>
//             </div>

//             {/* Right side: Checkbox */}
//             <div>
//               <label className="inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={task.isComplete}
//                   onChange={() => handleCheckboxChange(task.id)}
//                   className="form-checkbox h-5 w-5 text-blue-500 rounded"
//                 />
//               </label>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default AssignedTaskListCard;


import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialTasks = [
  {
    id: 1,
    number: '01',
    numberBg: 'bg-blue-400',
    title: 'UI Elements and Widgets',
    activityStatus: {
      text: 'Active',
      color: 'text-green-500 bg-green-50 border-green-500',
    },
    progressStatus: { text: 'Progress', color: 'text-yellow-500' },
    isComplete: false,
  },
  {
    id: 2,
    number: '02',
    numberBg: 'bg-yellow-400',
    title: 'Styleguide and Elements',
    activityStatus: {
      text: 'Inactive',
      color: 'text-red-500 bg-red-50 border-red-500',
    },
    progressStatus: { text: 'On Hold', color: 'text-red-500' },
    isComplete: false,
  },
  {
    id: 3,
    number: '03',
    numberBg: 'bg-pink-400',
    title: 'Webdesigner Mockups',
    activityStatus: {
      text: 'Active',
      color: 'text-green-500 bg-green-50 border-green-500',
    },
    progressStatus: { text: 'Done', color: 'text-green-500' },
    isComplete: true,
  },
  {
    id: 4,
    number: '04',
    numberBg: 'bg-purple-400',
    title: 'User Interface Styles',
    activityStatus: {
      text: 'Active',
      color: 'text-green-500 bg-green-50 border-green-500',
    },
    progressStatus: { text: 'Progress', color: 'text-yellow-500' },
    isComplete: false,
  },
];

const AssignedTaskListCard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleCheckboxChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const newIsComplete = !task.isComplete;
          return {
            ...task,
            isComplete: newIsComplete,
            // Update progress status dynamically:
            progressStatus: newIsComplete
              ? { text: 'Done', color: 'text-green-500' }
              : { text: 'Progress', color: 'text-yellow-500' },
          };
        }
        return task;
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-5 rounded-lg shadow bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Assigned Task List</h2>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="16" r="2" />
          </svg>
        </button>
      </div>

      {/* Table-like Task Rows */}
      <div className="divide-y divide-gray-200 dark:divide-slate-600">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-3 w-full m-auto"
          >
            {/* Left side: Number circle + Title */}
            <div className="flex items-center space-x-3 w-80">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold ${task.numberBg}`}
              >
                {task.number}
              </div>
              <span className="font-semibold">{task.title}</span>
            </div>

            {/* Middle area: Activity + Progress */}
            <div className="flex items-center justify-between space-x-6 w-44">
              {/* Activity status pill */}
              <div
                className={`
                  flex items-center space-x-2
                  border
                  rounded-full
                  px-3 py-1
                  text-sm
                  font-medium
                  ${task.activityStatus.color}
                `}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: task.activityStatus.color.includes('green')
                      ? '#10B981'
                      : '#EF4444',
                  }}
                />
                <span>{task.activityStatus.text}</span>
              </div>
              {/* Progress status text */}
              <span className={`text-sm font-semibold ${task.progressStatus.color}`}>
                {task.progressStatus.text}
              </span>
            </div>

            {/* Right side: Checkbox */}
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={() => handleCheckboxChange(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignedTaskListCard;
