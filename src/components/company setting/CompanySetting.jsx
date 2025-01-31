// // HRPoliciesTabs.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import {
//   FaEdit,
//   FaTrash,
//   FaEye
// } from 'react-icons/fa';

// // ======== Motion Variants for Container and Rows ========
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { when: 'beforeChildren', staggerChildren: 0.05 },
//   },
// };

// const rowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// // ======== Dummy Data for Each Tab's Table ========
// const shiftTimingsData = [
//   { id: 1, name: 'Saket', start: '10:00 AM', end: '7:00 PM' },
//   { id: 2, name: 'Noida', start: '10:00 AM', end: '7:00 PM' },
//   { id: 3, name: 'Delhi', start: '10:00 AM', end: '7:00 PM' },
//   { id: 4, name: 'Saket', start: '10:00 AM', end: '7:00 PM' },
//   { id: 5, name: 'Noida', start: '10:00 AM', end: '7:00 PM' },
// ];

// const holidaysData = [
//   { id: 1, name: 'Saket', date: '26 Jan 2025', recurring: 'No' },
//   { id: 2, name: 'Noida', date: '26 Jan 2025', recurring: 'Yes' },
//   { id: 3, name: 'Delhi', date: '26 Jan 2025', recurring: 'Yes' },
// ];

// const deductionsData = [
//   { id: 1, name: 'Saket', percentage: '10%' },
//   { id: 2, name: 'Noida', percentage: '5%' },
//   { id: 3, name: 'Delhi', percentage: '15%' },
// ];

// const payrollCycleData = [
//   { id: 1, cycleName: 'Saket', processingDate: '7th Date' },
//   { id: 2, cycleName: 'Noida', processingDate: '1st Date' },
//   { id: 3, cycleName: 'Delhi', processingDate: '1st Date' },
// ];

// const leaveSystemData = [
//   { id: 1, name: 'Saket', workingDays: 'MON-FRI', monthlyPaid: '1.5' },
//   { id: 2, name: 'Noida', workingDays: 'MON-FRI', monthlyPaid: '2.0' },
//   { id: 3, name: 'Delhi', workingDays: 'MON-FRI', monthlyPaid: '1.5' },
// ];

// const employmentTypesData = [
//   { id: 1, name: 'Full Time' },
//   { id: 2, name: 'Part Time' },
//   { id: 3, name: 'Intern' },
// ];

// // ======== Individual Tab Components ========

// function AttendancePoliciesTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Attendance Policies</h2>
//       <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-md shadow">
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Full Day Hours</label>
//           <input
//             type="text"
//             placeholder="9 Hours"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Maximum Leave Carryover</label>
//           <input
//             type="text"
//             placeholder="00"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Half Day Hours</label>
//           <input
//             type="text"
//             placeholder="4.5 Hours"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Not Even a Half Day</label>
//           <input
//             type="text"
//             placeholder="3 Hours"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Auto-Absence Hours</label>
//           <input
//             type="text"
//             placeholder="6 Hours"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold">Months Between Hikes / Advances</label>
//           <input
//             type="text"
//             placeholder="00"
//             className="border rounded px-3 py-2 mt-1 text-sm"
//           />
//         </div>

//         <div className="flex items-center gap-4 mt-4">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" className="form-checkbox" />
//             <span className="text-sm">Enable Overtime</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="checkbox" className="form-checkbox" />
//             <span className="text-sm">Late Coming</span>
//           </label>
//         </div>

//         <div className="flex items-center space-x-3 mt-4">
//           <button className="bg-gray-300 text-sm px-4 py-2 rounded">Cancel</button>
//           <button
//             className="bg-blue-500 text-white text-sm px-4 py-2 rounded"
//             onClick={() => {
//               toast.success('Attendance policies saved!');
//             }}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ShiftTimingsTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Shift Timings</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Name</th>
//               <th className="p-3 text-sm font-semibold">Start Time</th>
//               <th className="p-3 text-sm font-semibold">End Time</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shiftTimingsData.map((item, index) => (
//               <motion.tr
//                 key={item.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{item.name}</td>
//                 <td className="p-3 text-sm">{item.start}</td>
//                 <td className="p-3 text-sm">{item.end}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('Viewing shift...')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Editing shift...')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Shift deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// function HolidaysTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Holidays</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Name</th>
//               <th className="p-3 text-sm font-semibold">Date</th>
//               <th className="p-3 text-sm font-semibold">Recurring</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {holidaysData.map((holiday, index) => (
//               <motion.tr
//                 key={holiday.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{holiday.name}</td>
//                 <td className="p-3 text-sm">{holiday.date}</td>
//                 <td className="p-3 text-sm">{holiday.recurring}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('View holiday')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Edit holiday')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Holiday deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// function DeductionsTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Deductions</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Name</th>
//               <th className="p-3 text-sm font-semibold">Percentage (%)</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {deductionsData.map((deduction, index) => (
//               <motion.tr
//                 key={deduction.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{deduction.name}</td>
//                 <td className="p-3 text-sm">{deduction.percentage}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('View deduction')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Edit deduction')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Deduction deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// function PayrollCyclesTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Payroll Cycles</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Cycle Name</th>
//               <th className="p-3 text-sm font-semibold">Processing Date</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payrollCycleData.map((cycle, index) => (
//               <motion.tr
//                 key={cycle.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{cycle.cycleName}</td>
//                 <td className="p-3 text-sm">{cycle.processingDate}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('View cycle')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Edit cycle')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Cycle deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// function LeaveSystemsTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Leave Systems</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Name</th>
//               <th className="p-3 text-sm font-semibold">Working Days</th>
//               <th className="p-3 text-sm font-semibold">Monthly Paid Leaves</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveSystemData.map((leaveSys, index) => (
//               <motion.tr
//                 key={leaveSys.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{leaveSys.name}</td>
//                 <td className="p-3 text-sm">{leaveSys.workingDays}</td>
//                 <td className="p-3 text-sm">{leaveSys.monthlyPaid}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('View leave system')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Edit leave system')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Leave system deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// function EmploymentTypesTab() {
//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Employment Types</h2>
//       <motion.div
//         className="bg-white rounded-md shadow overflow-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Employment Type</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employmentTypesData.map((type, index) => (
//               <motion.tr
//                 key={type.id}
//                 variants={rowVariants}
//                 className="border-b hover:bg-gray-50 transition-colors"
//               >
//                 <td className="p-3 text-sm">{index + 1}</td>
//                 <td className="p-3 text-sm">{type.name}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       onClick={() => toast('View type')}
//                     >
//                       <FaEye size={14} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-600"
//                       onClick={() => toast('Edit type')}
//                     >
//                       <FaEdit size={14} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => toast.error('Employment type deleted')}
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </motion.table>
//       </motion.div>
//     </div>
//   );
// }

// // ======== Main Tabs Component ========
// export default function CompanySetting() {
//   // Track which tab is active
//   const [activeTab, setActiveTab] = useState(0);

//   // Each tab label + component
//   const tabs = [
//     { label: 'Attendance Policies', component: <AttendancePoliciesTab /> },
//     { label: 'Shift Timings',       component: <ShiftTimingsTab /> },
//     { label: 'Holidays',           component: <HolidaysTab /> },
//     { label: 'Deductions',         component: <DeductionsTab /> },
//     { label: 'Payroll Cycles',     component: <PayrollCyclesTab /> },
//     { label: 'Leave Systems',      component: <LeaveSystemsTab /> },
//     { label: 'Employment Types',   component: <EmploymentTypesTab /> },
//   ];

//   return (
//     <div className="p-4">
//       {/* Tab Buttons */}
//       <div className="flex space-x-2 mb-4">
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.label}
//             className={`px-4 py-2 text-sm rounded-t 
//               ${
//                 activeTab === index
//                   ? 'bg-white border-b-2 border-indigo-500 font-semibold'
//                   : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//             onClick={() => setActiveTab(index)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Active Tab Content with a small fade animation */}
//       <div className="bg-gray-100 p-4 rounded-b shadow-md">
//         <AnimatePresence wait>
//           <motion.div
//             key={activeTab} // needed so motion sees it as a new element
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//           >
//             {tabs[activeTab].component}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// ================== Framer Motion Variants ==================
const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.05 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ================== Dummy Table Data ==================

// 1) Shift Timings
const SHIFT_TIMINGS = [
  { id: 1, name: 'Saket', start: '10:00 AM', end: '7:00 PM' },
  { id: 2, name: 'Noida', start: '10:00 AM', end: '7:00 PM' },
  { id: 3, name: 'Noida', start: '10:00 AM', end: '7:00 PM' },
  { id: 4, name: 'Delhi', start: '10:00 AM', end: '7:00 PM' },
  // ... add as many as needed
];

// 2) Holidays
const HOLIDAYS = [
  { id: 1, name: 'Saket', date: '26 Jan 2025', recurring: 'NO' },
  { id: 2, name: 'Noida', date: '26 Jan 2025', recurring: 'Yes' },
  // ...
];

// 3) Deductions
const DEDUCTIONS = [
  { id: 1, name: 'Saket', percentage: '25%' },
  { id: 2, name: 'Noida', percentage: '15%' },
  // ...
];

// 4) Payroll Cycles
const PAYROLL_CYCLES = [
  { id: 1, cycleName: 'Saket', processingDate: '7th Date' },
  { id: 2, cycleName: 'Noida', processingDate: '1st Date' },
  // ...
];

// 5) Leave Systems
const LEAVE_SYSTEMS = [
  { id: 1, name: 'Saket', workingDays: 'MON, TUE, WED, THUR, FRI, SAT', monthlyPaid: '1.5' },
  { id: 2, name: 'Noida', workingDays: 'MON, TUE, WED, THUR, FRI, SAT', monthlyPaid: '1.5' },
  // ...
];

// 6) Employment Types
const EMPLOYMENT_TYPES = [
  { id: 1, type: 'Full-Time', description: 'Standard 8-9 hr job' },
  { id: 2, type: 'Part-Time', description: 'Less than 5 hr job' },
  // ...
];

// ================== Main Component ==================
export default function HRSettings() {
  const [activeTab, setActiveTab] = useState(0);

  // ------------- Attendance Policies Form State -------------
  const [fullDayHours, setFullDayHours] = useState('9');
  const [maxLeaveCarry, setMaxLeaveCarry] = useState('0');
  const [halfDayHours, setHalfDayHours] = useState('4.5');
  const [notHalfDay, setNotHalfDay] = useState('3');
  const [autoAbsenceHours, setAutoAbsenceHours] = useState('6');
  const [monthsHikes, setMonthsHikes] = useState('0');
  const [enableOvertime, setEnableOvertime] = useState(true);
  const [lateComing, setLateComing] = useState(true);
  const [overtimeRate, setOvertimeRate] = useState('');
  const [minOvertimeHours, setMinOvertimeHours] = useState('10');
  const [lateComingGrace, setLateComingGrace] = useState('30 Min');
  const [lateComingPenaltyType, setLateComingPenaltyType] = useState('');
  const [lateComingPenaltyValue, setLateComingPenaltyValue] = useState('');
  const [maxMonthlyLate, setMaxMonthlyLate] = useState('');

  // ------------- Toast Example -------------
  const handleSaveAttendancePolicies = () => {
    toast.success('Attendance Policies saved successfully!');
  };

  // ------------- Helper: Reusable Table Layout -------------
  const AnimatedTable = ({ columns, data, renderRow }) => {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-sm font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                variants={tableRowVariants}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {renderRow(item, index)}
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    );
  };

  // ------------- Table Columns for each tab -------------
  const shiftColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'name', label: 'Name' },
    { key: 'start', label: 'Start Time' },
    { key: 'end', label: 'End Time' },
    { key: 'action', label: 'Action' },
  ];

  const holidaysColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'recurring', label: 'Recurring' },
    { key: 'action', label: 'Action' },
  ];

  const deductionColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'name', label: 'Name' },
    { key: 'perc', label: 'Percentage (%)' },
    { key: 'action', label: 'Action' },
  ];

  const payrollColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'name', label: 'Cycle Name' },
    { key: 'date', label: 'Processing Date' },
    { key: 'action', label: 'Action' },
  ];

  const leaveSystemColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'name', label: 'Name' },
    { key: 'days', label: 'Working Days' },
    { key: 'paid', label: 'Monthly Paid Leaves' },
    { key: 'action', label: 'Action' },
  ];

  const employmentColumns = [
    { key: 'sl', label: 'S.L' },
    { key: 'type', label: 'Employment Type' },
    { key: 'desc', label: 'Description' },
    { key: 'action', label: 'Action' },
  ];

  // ------------- Tab Content Renderers -------------
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        // Attendance Policies form
        return (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Day Hours
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={fullDayHours}
                  onChange={(e) => setFullDayHours(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Maximum Leave Carryover
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={maxLeaveCarry}
                  onChange={(e) => setMaxLeaveCarry(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Half Day Hours
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={halfDayHours}
                  onChange={(e) => setHalfDayHours(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Not Even a Half Day
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={notHalfDay}
                  onChange={(e) => setNotHalfDay(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Auto‐Absence Hours
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={autoAbsenceHours}
                  onChange={(e) => setAutoAbsenceHours(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Months Between Hikes or Advances
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={monthsHikes}
                  onChange={(e) => setMonthsHikes(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium">
                  Enable Overtime:
                </label>
                <input
                  type="checkbox"
                  checked={enableOvertime}
                  onChange={() => setEnableOvertime(!enableOvertime)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium">
                  Late Coming:
                </label>
                <input
                  type="checkbox"
                  checked={lateComing}
                  onChange={() => setLateComing(!lateComing)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Overtime Rate Multiplier
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  placeholder="e.g. 1.5× normal hourly rate"
                  value={overtimeRate}
                  onChange={(e) => setOvertimeRate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Min Overtime Hours
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={minOvertimeHours}
                  onChange={(e) => setMinOvertimeHours(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Late Coming Grace Minutes
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={lateComingGrace}
                  onChange={(e) => setLateComingGrace(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Late Coming Penalty Type
                </label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={lateComingPenaltyType}
                  onChange={(e) => setLateComingPenaltyType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Late Coming Penalty Value
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  placeholder="percentage or fixed amount"
                  value={lateComingPenaltyValue}
                  onChange={(e) => setLateComingPenaltyValue(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Monthly Lateness Allowed
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  placeholder="percentage or fixed amount"
                  value={maxMonthlyLate}
                  onChange={(e) => setMaxMonthlyLate(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleSaveAttendancePolicies}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        );

      case 1:
        // Shift Timings Table
        return (
          <AnimatedTable
            columns={shiftColumns}
            data={SHIFT_TIMINGS}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm">{item.start}</td>
                <td className="p-3 text-sm">{item.end}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => toast.success(`Edit shift #${item.id}`)}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => toast.error(`Delete shift #${item.id}`)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      case 2:
        // Holidays Table
        return (
          <AnimatedTable
            columns={holidaysColumns}
            data={HOLIDAYS}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm">{item.date}</td>
                <td className="p-3 text-sm">{item.recurring}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => toast.success(`Edit holiday #${item.id}`)}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => toast.error(`Delete holiday #${item.id}`)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      case 3:
        // Deductions Table
        return (
          <AnimatedTable
            columns={deductionColumns}
            data={DEDUCTIONS}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm">{item.percentage}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => toast.success(`Edit deduction #${item.id}`)}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => toast.error(`Delete deduction #${item.id}`)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      case 4:
        // Payroll Cycles Table
        return (
          <AnimatedTable
            columns={payrollColumns}
            data={PAYROLL_CYCLES}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.cycleName}</td>
                <td className="p-3 text-sm">{item.processingDate}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() =>
                        toast.success(`Edit payroll cycle #${item.id}`)
                      }
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() =>
                        toast.error(`Delete payroll cycle #${item.id}`)
                      }
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      case 5:
        // Leave Systems Table
        return (
          <AnimatedTable
            columns={leaveSystemColumns}
            data={LEAVE_SYSTEMS}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm">{item.workingDays}</td>
                <td className="p-3 text-sm">{item.monthlyPaid}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() =>
                        toast.success(`Edit leave system #${item.id}`)
                      }
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() =>
                        toast.error(`Delete leave system #${item.id}`)
                      }
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      case 6:
        // Employment Types Table
        return (
          <AnimatedTable
            columns={employmentColumns}
            data={EMPLOYMENT_TYPES}
            renderRow={(item, index) => (
              <>
                <td className="p-3 text-sm">{index + 1}</td>
                <td className="p-3 text-sm">{item.type}</td>
                <td className="p-3 text-sm">{item.description}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() =>
                        toast.success(`Edit employment type #${item.id}`)
                      }
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() =>
                        toast.error(`Delete employment type #${item.id}`)
                      }
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* ---- Tabs ---- */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          'Attendance Policies',
          'Shift Timings',
          'Holidays',
          'Deductions',
          'Payroll Cycles',
          'Leave Systems',
          'Employment Types',
        ].map((tabLabel, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 text-sm rounded font-medium transition-colors
              ${
                activeTab === idx
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {tabLabel}
          </button>
        ))}
      </div>

      {/* ---- Tab Content ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
