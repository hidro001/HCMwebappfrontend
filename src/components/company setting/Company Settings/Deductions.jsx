
// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const Deductions = () => {
//   const [deductions, setDeductions] = useState([
//     { id: 1, name: "Professional Tax", percentage: "5%" },
//     { id: 2, name: "Health Insurance", percentage: "2%" },
//   ]);

//   // Form fields for a new deduction
//   const [newName, setNewName] = useState("");
//   const [newPercentage, setNewPercentage] = useState("");

//   // State to control the modal’s visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddDeduction = () => {
//     if (!newName || !newPercentage) {
//       toast.error("Please fill out all deduction fields.");
//       return;
//     }

//     const newDed = {
//       id: Date.now(),
//       name: newName,
//       percentage: newPercentage,
//     };

//     setDeductions([...deductions, newDed]);
//     toast.success("Deduction added!");

//     // Reset fields and close the modal
//     setNewName("");
//     setNewPercentage("");
//     setIsModalOpen(false);
//   };

//   const handleDeleteDeduction = (id) => {
//     setDeductions(deductions.filter((d) => d.id !== id));
//     toast.success("Deduction deleted.");
//   };

//   const handleEditDeduction = (id) => {
//     toast("Edit not implemented.");
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Deduction
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Deduction
//         </button>
//       </div>

//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">
//               Percentage
//             </th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {deductions.map((d) => (
//             <tr key={d.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{d.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">
//                 {d.percentage}
//               </td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEditDeduction(d.id)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteDeduction(d.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* --- MODAL --- */}
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
//           <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               Add Deduction
//             </h2>

//             {/* Deduction Name */}
//             <div className="mb-3">
//               <label className="block text-gray-700 dark:text-gray-200 mb-1">
//                 Deduction Name
//               </label>
//               <input
//                 type="text"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
//                 placeholder="Enter Deduction Name"
//               />
//             </div>

//             {/* Percentage */}
//             <div className="mb-4">
//               <label className="block text-gray-700 dark:text-gray-200 mb-1">
//                 Percentage (%)
//               </label>
//               <input
//                 type="text"
//                 value={newPercentage}
//                 onChange={(e) => setNewPercentage(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
//                 placeholder="0%"
//               />
//             </div>

//             {/* Modal Buttons */}
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddDeduction}
//                 className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Add Deduction
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* --- END MODAL --- */}
//     </div>
//   );
// };

// export default Deductions;

// src/components/Deductions.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

const Deductions = () => {
  const {
    deductions,
    fetchDeductions,
    addOrUpdateDeduction,
    deleteDeduction,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deductionName, setDeductionName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDeductions();
  }, [fetchDeductions]);

  const handleSave = () => {
    if (!deductionName || percentage === "") {
      toast.error("Please fill out all deduction fields.");
      return;
    }
    // Optional: parse number, validate <= 100, >= 0, etc.
    const numericPercent = parseFloat(percentage);
    if (numericPercent < 0 || numericPercent > 100) {
      toast.error("Percentage must be between 0 and 100.");
      return;
    }

    const payload = {
      id: editId,
      name: deductionName,
      percentage: numericPercent,
    };
    addOrUpdateDeduction(payload);

    setIsModalOpen(false);
    setDeductionName("");
    setPercentage("");
    setEditId(null);
  };

  const handleEdit = (d) => {
    setEditId(d.id);
    setDeductionName(d.name);
    setPercentage(d.percentage);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteDeduction(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Deductions
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Deduction
        </button>
      </div>

      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">
              Percentage (%)
            </th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((d) => (
            <tr key={d.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{d.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {d.percentage}%
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Deduction" : "Add Deduction"}
            </h2>
            <div className="mb-3">
              <label className="block mb-1">Deduction Name</label>
              <input
                type="text"
                value={deductionName}
                onChange={(e) => setDeductionName(e.target.value)}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Percentage (%)</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
                placeholder="0 - 100"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setDeductionName("");
                  setPercentage("");
                  setEditId(null);
                }}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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

export default Deductions;
