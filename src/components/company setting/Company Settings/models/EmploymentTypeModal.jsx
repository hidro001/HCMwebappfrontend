// import React from "react";

// const EmploymentTypeModal = ({
//   isOpen,
//   editId,
//   empTypeName,
//   setEmpTypeName,
//   deductionIds,
//   handleCheckboxChange,
//   deductions,
//   payrollCycles,
//   leaveSystems,
//   selectedPayrollCycleId,
//   setSelectedPayrollCycleId,
//   selectedLeaveSystemId,
//   setSelectedLeaveSystemId,
//   salaryHike,
//   setSalaryHike,
//   onClose,
//   onSave,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-bold mb-4">
//           {editId ? "Edit Employment Type" : "Add Employment Type"}
//         </h2>

//         {/* Employment Type Name */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Employment Type Name
//           </label>
//           <input
//             type="text"
//             value={empTypeName}
//             onChange={(e) => setEmpTypeName(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>

//         {/* Select Deductions */}
//         <div className="mb-4">
//           <p className="mb-1 font-semibold">Select Deductions</p>
//           <div className="flex items-center flex-wrap gap-4">
//             {deductions.map((ded) => (
//               <label key={ded.id} className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={deductionIds.includes(ded.id)}
//                   onChange={() => handleCheckboxChange(ded.id)}
//                   className="accent-blue-600 mr-1"
//                 />
//                 {ded.name}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Select Payroll Cycle */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Select Payroll Cycle
//           </label>
//           <select
//             value={selectedPayrollCycleId}
//             onChange={(e) => setSelectedPayrollCycleId(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           >
//             <option value="">Select Cycle</option>
//             {payrollCycles.map((pc) => (
//               <option key={pc.id} value={pc.id}>
//                 {pc.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Select Leave System */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">
//             Select Leave System
//           </label>
//           <select
//             value={selectedLeaveSystemId}
//             onChange={(e) => setSelectedLeaveSystemId(e.target.value)}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           >
//             <option value="">Select System</option>
//             {leaveSystems.map((ls) => (
//               <option key={ls.id} value={ls.id}>
//                 {ls.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Salary Hike */}
//         <div className="mb-6">
//           <label className="block mb-1 font-semibold">
//             Salary Hike Percentage
//           </label>
//           <input
//             type="number"
//             value={salaryHike}
//             onChange={(e) => setSalaryHike(e.target.value)}
//             placeholder="0 - 100"
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {editId ? "Save" : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmploymentTypeModal;


import React from "react";
import BaseModal from "../../../common/BaseModal"; // Adjust the import path as needed

const EmploymentTypeModal = ({
  isOpen,
  editId,
  empTypeName,
  setEmpTypeName,
  deductionIds,
  handleCheckboxChange,
  deductions,
  payrollCycles,
  leaveSystems,
  selectedPayrollCycleId,
  setSelectedPayrollCycleId,
  selectedLeaveSystemId,
  setSelectedLeaveSystemId,
  salaryHike,
  setSalaryHike,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    // 1) Use <BaseModal> for the overlay + portal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 2) Keep your "white box" UI */}
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Employment Type" : "Add Employment Type"}
        </h2>

        {/* Employment Type Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Employment Type Name
          </label>
          <input
            type="text"
            value={empTypeName}
            onChange={(e) => setEmpTypeName(e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        {/* Select Deductions */}
        <div className="mb-4">
          <p className="mb-1 font-semibold">Select Deductions</p>
          <div className="flex items-center flex-wrap gap-4">
            {deductions.map((ded) => (
              <label key={ded.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={deductionIds.includes(ded.id)}
                  onChange={() => handleCheckboxChange(ded.id)}
                  className="accent-blue-600 mr-1"
                />
                {ded.name}
              </label>
            ))}
          </div>
        </div>

        {/* Select Payroll Cycle */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Select Payroll Cycle
          </label>
          <select
            value={selectedPayrollCycleId}
            onChange={(e) => setSelectedPayrollCycleId(e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          >
            <option value="">Select Cycle</option>
            {payrollCycles.map((pc) => (
              <option key={pc.id} value={pc.id}>
                {pc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Leave System */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Select Leave System
          </label>
          <select
            value={selectedLeaveSystemId}
            onChange={(e) => setSelectedLeaveSystemId(e.target.value)}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          >
            <option value="">Select System</option>
            {leaveSystems.map((ls) => (
              <option key={ls.id} value={ls.id}>
                {ls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Hike */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">
            Salary Hike Percentage
          </label>
          <input
            type="number"
            value={salaryHike}
            onChange={(e) => setSalaryHike(e.target.value)}
            placeholder="0 - 100"
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default EmploymentTypeModal;
