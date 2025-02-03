


// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const ShiftTimings = () => {
//   const [shifts, setShifts] = useState([
//     { id: 1, name: "Saket", start: "10:00 AM", end: "7:00 PM" },
//     { id: 2, name: "Noida", start: "10:00 AM", end: "7:00 PM" },
//     { id: 3, name: "Delhi", start: "9:00 AM", end: "6:00 PM" },
//   ]);

//   // Fields for new shift
//   const [newName, setNewName] = useState("");
//   const [newStart, setNewStart] = useState("");
//   const [newEnd, setNewEnd] = useState("");

//   // Control the modal open/close
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddShift = () => {
//     if (!newName || !newStart || !newEnd) {
//       toast.error("Please fill out all fields before adding.");
//       return;
//     }
//     const newShift = {
//       id: Date.now(),
//       name: newName,
//       start: newStart,
//       end: newEnd,
//     };
//     setShifts([...shifts, newShift]);
//     toast.success("Shift added!");
    
//     // Clear fields and close the modal
//     setNewName("");
//     setNewStart("");
//     setNewEnd("");
//     setIsModalOpen(false);
//   };

//   const handleDeleteShift = (id) => {
//     setShifts(shifts.filter((shift) => shift.id !== id));
//     toast.success("Shift deleted.");
//   };

//   const handleEditShift = (id) => {
//     toast("Edit functionality not implemented in this demo.");
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Shift Timings
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Shift Timing
//         </button>
//       </div>

//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Start Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">End Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shifts.map((shift) => (
//             <tr key={shift.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{shift.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{shift.start}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{shift.end}</td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEditShift(shift.id)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteShift(shift.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* --- MODAL OVERLAY & CONTENT --- */}
//       {isModalOpen && (
//         <div 
//           className="
//             fixed inset-0 
//             bg-gray-500 bg-opacity-20
//             backdrop-blur-sm 
//             flex justify-center items-center 
//             z-50
//           "
//         >
//           {/* Modal container */}
//           <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full relative">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               Add Shift Timing
//             </h2>
            
//             {/* Form fields */}
//             <div className="mb-3">
//               <label className="block text-gray-700 dark:text-gray-200 mb-1">Shift Name</label>
//               <input
//                 type="text"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
//                 placeholder="Enter Shift Name"
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block text-gray-700 dark:text-gray-200 mb-1">Start Time</label>
//               <input
//                 type="time"
//                 value={newStart}
//                 onChange={(e) => setNewStart(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 dark:text-gray-200 mb-1">End Time</label>
//               <input
//                 type="time"
//                 value={newEnd}
//                 onChange={(e) => setNewEnd(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
//               />
//             </div>

//             {/* Modal buttons */}
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddShift}
//                 className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Add Shift
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* --- END MODAL --- */}
//     </div>
//   );
// };

// export default ShiftTimings;


// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

// const ShiftTimings = () => {
//   const {
//     shiftTimings,
//     fetchShiftTimings,
//     addOrUpdateShiftTiming,
//     deleteShiftTiming,
//   } = useCompanySettingsStore();

//   // Local states for modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [editId, setEditId] = useState(null);

//   // Fetch on mount
//   useEffect(() => {
//     fetchShiftTimings();
//   }, [fetchShiftTimings]);

//   // Handle add or update
//   const handleSave = () => {
//     if (!name || !start || !end) {
//       toast.error("Please fill out all fields.");
//       return;
//     }
//     const payload = {
//       id: editId,
//       name,
//       startTime: start,
//       endTime: end,
//     };
//     addOrUpdateShiftTiming(payload);

//     setIsModalOpen(false);
//     setName("");
//     setStart("");
//     setEnd("");
//     setEditId(null);
//   };

//   const handleDelete = (id) => {
//     deleteShiftTiming(id);
//   };

//   const handleEditClick = (shift) => {
//     setEditId(shift.id);
//     setName(shift.name);
//     setStart(shift.startTime);
//     setEnd(shift.endTime);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Shift Timings
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Shift Timing
//         </button>
//       </div>

//       <table className="min-w-full text-left border dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//           <tr>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Start Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">End Time</th>
//             <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shiftTimings.map((st) => (
//             <tr key={st.id} className="border-b dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.name}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.startTime}</td>
//               <td className="p-2 text-gray-700 dark:text-gray-200">{st.endTime}</td>
//               <td className="p-2 flex space-x-2">
//                 <button
//                   onClick={() => handleEditClick(st)}
//                   className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(st.id)}
//                   className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
//         >
//           <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//             <h2 className="text-xl font-semibold mb-4">
//               {editId ? "Edit Shift Timing" : "Add Shift Timing"}
//             </h2>
//             <div className="mb-3">
//               <label className="block mb-1">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block mb-1">Start</label>
//               <input
//                 type="time"
//                 value={start}
//                 onChange={(e) => setStart(e.target.value)}
//                 className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-1">End</label>
//               <input
//                 type="time"
//                 value={end}
//                 onChange={(e) => setEnd(e.target.value)}
//                 className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setName("");
//                   setStart("");
//                   setEnd("");
//                   setEditId(null);
//                 }}
//                 className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 {editId ? "Save" : "Add"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShiftTimings;


import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import ShiftTimingModal from "./models/ShiftTimingModal"; 

const ShiftTimings = () => {
  const {
    shiftTimings,
    fetchShiftTimings,
    addOrUpdateShiftTiming,
    deleteShiftTiming,
  } = useCompanySettingsStore();

  // Local states for modal and shift timing fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch shift timings on component mount
  useEffect(() => {
    fetchShiftTimings();
  }, [fetchShiftTimings]);

  // Handle add or update of a shift timing
  const handleSave = () => {
    if (!name || !start || !end) {
      toast.error("Please fill out all fields.");
      return;
    }
    const payload = {
      id: editId,
      name,
      startTime: start,
      endTime: end,
    };
    addOrUpdateShiftTiming(payload);

    // Reset the modal state after saving
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteShiftTiming(id);
  };

  const handleEditClick = (shift) => {
    setEditId(shift.id);
    setName(shift.name);
    setStart(shift.startTime);
    setEnd(shift.endTime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Shift Timings
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Shift Timing
        </button>
      </div>

      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Start Time</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">End Time</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {shiftTimings.map((st) => (
            <tr key={st.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.startTime}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.endTime}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEditClick(st)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(st.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ShiftTimingModal
        isOpen={isModalOpen}
        editId={editId}
        name={name}
        start={start}
        end={end}
        onNameChange={(e) => setName(e.target.value)}
        onStartChange={(e) => setStart(e.target.value)}
        onEndChange={(e) => setEnd(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default ShiftTimings;
