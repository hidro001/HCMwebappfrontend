

// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const EmploymentTypes = () => {
//   const [employmentTypes, setEmploymentTypes] = useState([
//     {
//       id: 1,
//       name: "Saket",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 2,
//       name: "Noida",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 3,
//       name: "Noida",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 4,
//       name: "Delhi",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 5,
//       name: "Saket",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 6,
//       name: "Delhi",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 7,
//       name: "Noida",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 8,
//       name: "Delhi",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 9,
//       name: "Saket",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     },
//     {
//       id: 10,
//       name: "Noida",
//       deduction: 10,
//       payrollCycle: 10,
//       leaveSystem: 10,
//       salaryHike: 1.5
//     }
//   ]);

//   // NEW: control modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // NEW: form fields for adding an employment type
//   const [empTypeName, setEmpTypeName] = useState("");
//   const [deductionType, setDeductionType] = useState("PF"); // radio default
//   const [selectedPayrollCycle, setSelectedPayrollCycle] = useState("");
//   const [selectedLeaveSystem, setSelectedLeaveSystem] = useState("");
//   const [salaryHike, setSalaryHike] = useState("0%");

//   // This runs when user clicks "Add Employment type"
//   const handleAdd = () => {
//     // Instead of just a toast, open modal
//     setIsModalOpen(true);
//   };

//   // Submits the new employment type
//   const handleSubmitNewType = () => {
//     if (!empTypeName || !selectedPayrollCycle || !selectedLeaveSystem) {
//       toast.error("Please fill out all required fields.");
//       return;
//     }

//     // Construct a new entry
//     const newEntry = {
//       id: Date.now(),
//       name: empTypeName,
//       deduction: deductionType,      // or numeric if you prefer
//       payrollCycle: selectedPayrollCycle,
//       leaveSystem: selectedLeaveSystem,
//       salaryHike: salaryHike
//     };

//     setEmploymentTypes([...employmentTypes, newEntry]);
//     toast.success("Employment type added!");

//     // Reset fields & close modal
//     setEmpTypeName("");
//     setDeductionType("PF");
//     setSelectedPayrollCycle("");
//     setSelectedLeaveSystem("");
//     setSalaryHike("0%");
//     setIsModalOpen(false);
//   };

//   // Existing Edit & Delete handlers
//   const handleEdit = (id) => {
//     toast("Edit functionality not implemented in this demo.");
//   };

//   const handleDelete = (id) => {
//     setEmploymentTypes(employmentTypes.filter((item) => item.id !== id));
//     toast.success("Entry deleted.");
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Employment Type
//         </h2>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Employment type
//         </button>
//       </div>

//       {/* Unchanged table layout */}
//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">S.L</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Deduction</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">
//               Payroll Cycle
//             </th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">
//               Leave System
//             </th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">
//               Salary Hike
//             </th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employmentTypes.map((item, index) => (
//             <tr key={item.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {String(index + 1).padStart(2, "0")}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {item.name}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {item.deduction}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {item.payrollCycle}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {item.leaveSystem}
//               </td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {item.salaryHike}
//               </td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(item.id)}
//                   className="text-green-600 hover:text-green-800
//                              dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="text-red-600 hover:text-red-800
//                              dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* -- MODAL (only shows if isModalOpen is true) -- */}
//       {isModalOpen && (
//         <div
//           className="
//             fixed inset-0
//             bg-gray-500 bg-opacity-50
//             backdrop-blur-sm
//             flex justify-center items-center
//             z-50
//           "
//         >
//           <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6">
//             <h2 className="text-xl font-bold mb-4">Add Employment Type</h2>

//             {/* Employment Type Name */}
//             <div className="mb-4">
//               <label className="block mb-1 font-semibold">
//                 Employment Type Name
//               </label>
//               <input
//                 type="text"
//                 value={empTypeName}
//                 onChange={(e) => setEmpTypeName(e.target.value)}
//                 placeholder="Enter Employment Type Name"
//                 className="
//                   w-full p-2 
//                   border border-gray-300 dark:border-gray-700 
//                   rounded 
//                   focus:outline-none 
//                   focus:ring-2 focus:ring-blue-500
//                   dark:bg-gray-800
//                 "
//               />
//             </div>

//             {/* Select Deductions (radio buttons) */}
//             <div className="mb-4">
//               <p className="mb-1 font-semibold">Select Deductions</p>
//               <div className="flex items-center space-x-4">
//                 {["Late", "PF", "Half Day"].map((ded) => (
//                   <label key={ded} className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       value={ded}
//                       checked={deductionType === ded}
//                       onChange={(e) => setDeductionType(e.target.value)}
//                       className="accent-blue-600 mr-1"
//                     />
//                     {ded}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Select Payroll Cycle */}
//             <div className="mb-4">
//               <label className="block mb-1 font-semibold">
//                 Select Payroll Cycle
//               </label>
//               <select
//                 value={selectedPayrollCycle}
//                 onChange={(e) => setSelectedPayrollCycle(e.target.value)}
//                 className="
//                   w-full p-2 
//                   border border-gray-300 dark:border-gray-700 
//                   rounded 
//                   focus:outline-none 
//                   focus:ring-2 focus:ring-blue-500
//                   dark:bg-gray-800
//                 "
//               >
//                 <option value="">Select Option</option>
//                 <option value="10">Cycle 10</option>
//                 <option value="20">Cycle 20</option>
//               </select>
//             </div>

//             {/* Select Leave System */}
//             <div className="mb-4">
//               <label className="block mb-1 font-semibold">
//                 Select Leave System
//               </label>
//               <select
//                 value={selectedLeaveSystem}
//                 onChange={(e) => setSelectedLeaveSystem(e.target.value)}
//                 className="
//                   w-full p-2 
//                   border border-gray-300 dark:border-gray-700 
//                   rounded 
//                   focus:outline-none 
//                   focus:ring-2 focus:ring-blue-500
//                   dark:bg-gray-800
//                 "
//               >
//                 <option value="">Select Option</option>
//                 <option value="10">System 10</option>
//                 <option value="20">System 20</option>
//               </select>
//             </div>

//             {/* Salary Hike Percentage */}
//             <div className="mb-6">
//               <label className="block mb-1 font-semibold">
//                 Salary Hike Percentage
//               </label>
//               <input
//                 type="text"
//                 value={salaryHike}
//                 onChange={(e) => setSalaryHike(e.target.value)}
//                 placeholder="0%"
//                 className="
//                   w-full p-2 
//                   border border-gray-300 dark:border-gray-700 
//                   rounded 
//                   focus:outline-none 
//                   focus:ring-2 focus:ring-blue-500
//                   dark:bg-gray-800
//                 "
//               />
//             </div>

//             {/* Modal Buttons */}
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="
//                   px-4 py-2 
//                   bg-gray-300 dark:bg-gray-600 
//                   text-gray-800 dark:text-gray-100 
//                   rounded 
//                   hover:bg-gray-400 dark:hover:bg-gray-500
//                 "
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitNewType}
//                 className="
//                   px-4 py-2 
//                   bg-blue-600 
//                   text-white 
//                   rounded 
//                   hover:bg-blue-700
//                 "
//               >
//                 ADD
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* -- END MODAL -- */}
//     </div>
//   );
// };

// export default EmploymentTypes;


// src/components/EmploymentTypes.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

const EmploymentTypes = () => {
  const {
    employmentTypes,
    fetchEmploymentTypes,
    addOrUpdateEmploymentType,
    deleteEmploymentType,
    // If you need to show payroll cycle or deduction names in a dropdown:
    deductions,
    payrollCycles,
    leaveSystems,
    fetchDeductions,
    fetchPayrollCycles,
    fetchLeaveSystems,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // form fields
  const [empTypeName, setEmpTypeName] = useState("");
  const [deductionIds, setDeductionIds] = useState([]);
  const [selectedPayrollCycleId, setSelectedPayrollCycleId] = useState("");
  const [selectedLeaveSystemId, setSelectedLeaveSystemId] = useState("");
  const [salaryHike, setSalaryHike] = useState("");

  useEffect(() => {
    fetchEmploymentTypes();
    fetchDeductions();
    fetchPayrollCycles();
    fetchLeaveSystems();
  }, [
    fetchEmploymentTypes,
    fetchDeductions,
    fetchPayrollCycles,
    fetchLeaveSystems,
  ]);

  const handleAdd = () => {
    // open modal
    setIsModalOpen(true);
    setEditId(null);
    setEmpTypeName("");
    setDeductionIds([]);
    setSelectedPayrollCycleId("");
    setSelectedLeaveSystemId("");
    setSalaryHike("");
  };

  const handleEdit = (et) => {
    setEditId(et.id);
    setEmpTypeName(et.name);
    setDeductionIds(et.deductions || []); 
    setSelectedPayrollCycleId(et.payrollCycleId || "");
    setSelectedLeaveSystemId(et.leaveSystemId || "");
    setSalaryHike(et.salaryHikePercentage || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteEmploymentType(id);
  };

  const handleSave = () => {
    if (!empTypeName || !selectedPayrollCycleId || !selectedLeaveSystemId) {
      toast.error("Please fill out all required fields.");
      return;
    }
    // Validate salaryHike if needed
    const numericHike = parseFloat(salaryHike);
    if (numericHike < 0 || numericHike > 100) {
      toast.error("Salary Hike must be between 0 and 100.");
      return;
    }

    const payload = {
      id: editId,
      name: empTypeName,
      deductions: deductionIds,
      payrollCycleId: selectedPayrollCycleId,
      leaveSystemId: selectedLeaveSystemId,
      salaryHikePercentage: numericHike,
    };
    addOrUpdateEmploymentType(payload);

    setIsModalOpen(false);
    setEditId(null);
    setEmpTypeName("");
    setDeductionIds([]);
    setSelectedPayrollCycleId("");
    setSelectedLeaveSystemId("");
    setSalaryHike("");
  };

  const handleCheckboxChange = (dedId) => {
    setDeductionIds((prev) =>
      prev.includes(dedId)
        ? prev.filter((id) => id !== dedId)
        : [...prev, dedId]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Employment Types
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Employment Type
        </button>
      </div>

      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">#</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Deductions</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Payroll Cycle</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Leave System</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Salary Hike %</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {employmentTypes.map((et, index) => (
            <tr key={et.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{index + 1}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{et.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {et.deductions
                  ?.map((dId) => {
                    const dedObj = deductions.find((dd) => dd.id === dId);
                    return dedObj ? dedObj.name : dId;
                  })
                  .join(", ")}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {payrollCycles.find((pc) => pc.id === et.payrollCycleId)?.name ??
                  et.payrollCycleId}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {leaveSystems.find((ls) => ls.id === et.leaveSystemId)?.name ??
                  et.leaveSystemId}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {et.salaryHikePercentage}%
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(et)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(et.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
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
                onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                  setEmpTypeName("");
                  setDeductionIds([]);
                  setSelectedPayrollCycleId("");
                  setSelectedLeaveSystemId("");
                  setSalaryHike("");
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmploymentTypes;
