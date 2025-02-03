

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaUserCog,
//   FaClock,
//   FaRegCalendar,
//   FaMoneyBill,
//   FaSun
// } from "react-icons/fa";

// import AttendancePolicies from "./AttendancePolicies";
// import ShiftTimings from "./ShiftTimings";
// import Holidays from "./Holidays";
// import Deductions from "./Deductions";
// import PayrollCycles from "./PayrollCycles";
// import LeaveSystems from "./LeaveSystems";
// import EmploymentTypes from "./EmploymentTypes";

// const CompanySetting = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const tabItems = [
//     {
//       name: "Attendance Policies",
//       icon: <FaUserCog />,
//       component: <AttendancePolicies />,
//     },
//     {
//       name: "Shift Timings",
//       icon: <FaClock />,
//       component: <ShiftTimings />,
//     },
//     {
//       name: "Holidays",
//       icon: <FaRegCalendar />,
//       component: <Holidays />,
//     },
//     {
//       name: "Deductions",
//       icon: <FaMoneyBill />,
//       component: <Deductions />,
//     },
//     {
//       name: "Payroll Cycles",
//       icon: <FaMoneyBill />,
//       component: <PayrollCycles />,
//     },
//     {
//       name: "Leave Systems",
//       icon: <FaSun />,
//       component: <LeaveSystems />,
//     },
//     {
//       name: "Employment Types",
//       icon: <FaUserCog />,
//       component: <EmploymentTypes />,
//     },
//   ];

//   return (
//     <div className="bg-bg-secondary p-6  mt-5">
//       {/* Tab Buttons */}
//       <div className="flex flex-wrap gap-4 mb-6 ">
//         {tabItems.map((tab, index) => {
//           const isActive = activeTab === index;
//           return (
//             <button
//               key={index}
//               onClick={() => setActiveTab(index)}
//               className={`
//                 flex items-center space-x-2 px-4 py-2 rounded-full border-2 text-sm font-medium 
//                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 
//                 ${
//                   isActive
//                     ? // Active tab styles
//                       "bg-purple-600 border-purple-600 text-white"
//                     : // Inactive tab styles in both themes
//                       `
//                         border-purple-600 text-purple-600 
//                         hover:bg-purple-600 hover:text-white 
//                         dark:border-purple-400 dark:text-purple-400 
//                         dark:hover:border-purple-600 dark:hover:bg-purple-600 dark:hover:text-white
//                       `
//                 }
//               `}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.name}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Tab Content */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -30 }}
//           transition={{ duration: 0.3 }}
//           className=" rounded-md shadow-lg   bg-gray-700 "
//         >
//           {tabItems[activeTab].component}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CompanySetting;



// src/components/CompanySetting.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCog,
  FaClock,
  FaRegCalendar,
  FaMoneyBill,
  FaSun,
} from "react-icons/fa";

import AttendancePolicies from "./AttendancePolicies";
import ShiftTimings from "./ShiftTimings";
import Holidays from "./Holidays";
import Deductions from "./Deductions";
import PayrollCycles from "./PayrollCycles";
import LeaveSystems from "./LeaveSystems";
import EmploymentTypes from "./EmploymentTypes";

const CompanySetting = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabItems = [
    {
      name: "Attendance Policies",
      icon: <FaUserCog />,
      component: <AttendancePolicies />,
    },
    {
      name: "Shift Timings",
      icon: <FaClock />,
      component: <ShiftTimings />,
    },
    {
      name: "Holidays",
      icon: <FaRegCalendar />,
      component: <Holidays />,
    },
    {
      name: "Deductions",
      icon: <FaMoneyBill />,
      component: <Deductions />,
    },
    {
      name: "Payroll Cycles",
      icon: <FaMoneyBill />,
      component: <PayrollCycles />,
    },
    {
      name: "Leave Systems",
      icon: <FaSun />,
      component: <LeaveSystems />,
    },
    {
      name: "Employment Types",
      icon: <FaUserCog />,
      component: <EmploymentTypes />,
    },
  ];

  return (
    <div className="bg-bg-secondary p-6 mt-5">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {tabItems.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 text-sm font-medium 
                transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 
                ${
                  isActive
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="rounded-md shadow-lg bg-gray-700"
        >
          {tabItems[activeTab].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CompanySetting;
