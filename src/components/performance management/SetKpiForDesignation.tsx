

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaEdit, FaTrash } from "react-icons/fa";

// // Zustand store
// import { useKpiStore } from "../../store/useKpiStore";

// // Components
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import AddKpiModal from "./model/AddKpiModal";
// import EditKpiModal from "./model/EditKpiModal";

// const SetKpiForDesignation = () => {
//   const {
//     designations,
//     kpis,
//     loading,
//     selectedDesignation,
//     setSelectedDesignation,
//     fetchDesignations,
//     fetchKpisByDesignation,
//     deleteKpi,
//   } = useKpiStore();

//   // 1) Fetch designations on mount
//   useEffect(() => {
//     fetchDesignations();
//   }, [fetchDesignations]);

//   // 2) If we have designations and none is selected, automatically pick the first
//   useEffect(() => {
//     if (!selectedDesignation && designations.length > 0) {
//       setSelectedDesignation(designations[0]);
//     }
//   }, [designations, selectedDesignation, setSelectedDesignation]);

//   // 3) Fetch KPIs whenever a designation is selected
//   useEffect(() => {
//     if (selectedDesignation) {
//       fetchKpisByDesignation(selectedDesignation);
//     }
//   }, [selectedDesignation, fetchKpisByDesignation]);

//   // Track which KPI is being edited
//   const [currentEditKpi, setCurrentEditKpi] = useState(null);

//   // Modals
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   // Confirmation dialog for deletion
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [kpiToDelete, setKpiToDelete] = useState(null);

//   // Handle designation dropdown
//   const handleDesignationChange = (e) => {
//     setSelectedDesignation(e.target.value);
//   };

//   // ----- Add Modal -----
//   const handleOpenAddModal = () => {
//     setIsAddModalOpen(true);
//   };
//   const handleCloseAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   // ----- Edit Modal -----
//   const handleOpenEditModal = (kpiId) => {
//     setCurrentEditKpi(kpiId);
//     setIsEditModalOpen(true);
//   };
//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//   };

//   // ----- Delete -----
//   const handleDeleteKpi = (kpiId) => {
//     setKpiToDelete(kpiId);
//     setConfirmDialogOpen(true);
//   };
//   const handleConfirmDelete = () => {
//     if (kpiToDelete) {
//       deleteKpi(kpiToDelete);
//     }
//     setConfirmDialogOpen(false);
//     setKpiToDelete(null);
//   };
//   const handleCancelDelete = () => {
//     setConfirmDialogOpen(false);
//     setKpiToDelete(null);
//   };

//   return (
//     <div className="mx-auto w-full p-4 dark:bg-gray-900 dark:text-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-6"
//       >
//         <h1 className="text-xl font-semibold mb-2">Set KPI For Designation</h1>
//         <label htmlFor="designationSelect" className="block text-sm font-medium mb-2">
//           Select Designation
//         </label>
//         <select
//           id="designationSelect"
//           value={selectedDesignation}
//           onChange={handleDesignationChange}
//           className="border border-gray-300 rounded-md p-2 
//                      dark:bg-gray-800 dark:border-gray-700"
//         >
//           <option value="">-- Select Designation --</option>
//           {designations.map((dsg) => (
//             <option key={dsg} value={dsg}>
//               {dsg}
//             </option>
//           ))}
//         </select>
//       </motion.div>

//       {/* Only show the table if a designation is selected */}
//       {selectedDesignation && (
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">
//               KPIs for: {selectedDesignation}
//             </h2>
//             <button
//               onClick={handleOpenAddModal}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md 
//                          hover:bg-blue-700 transition dark:bg-blue-500 
//                          dark:hover:bg-blue-600"
//             >
//               Add New KPI
//             </button>
//           </div>

//           <div className="overflow-x-auto rounded-md shadow">
//             <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-700 text-left">
//                   <th className="py-2 px-4">S NO.</th>
//                   <th className="py-2 px-4">Name Of KPI</th>
//                   <th className="py-2 px-4">Weight (%)</th>
//                   <th className="py-2 px-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   // Skeleton rows while loading
//                   Array.from({ length: 5 }).map((_, index) => (
//                     <tr key={index} className="border-b dark:border-gray-700">
//                       <td className="py-3 px-4">
//                         <div className="h-4 w-6 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : kpis.length === 0 ? (
//                   <tr>
//                     <td
//                       className="py-4 px-4 text-center text-gray-500 dark:text-gray-300"
//                       colSpan={4}
//                     >
//                       No KPIs found for this designation.
//                     </td>
//                   </tr>
//                 ) : (
//                   kpis.map((kpi, index) => (
//                     <tr
//                       key={kpi._id}
//                       className="border-b dark:border-gray-700 hover:bg-gray-50 
//                                  dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <td className="py-3 px-4">{index + 1}</td>
//                       <td className="py-3 px-4">{kpi.name}</td>
//                       <td className="py-3 px-4">{kpi.weight}</td>
//                       <td className="py-3 px-4 flex items-center gap-3">
//                         <button
//                           onClick={() => handleOpenEditModal(kpi._id)}
//                           className="text-green-600 hover:text-green-700 
//                                      dark:text-green-400 dark:hover:text-green-300"
//                           title="Edit KPI"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteKpi(kpi._id)}
//                           className="text-red-600 hover:text-red-700 
//                                      dark:text-red-400 dark:hover:text-red-300"
//                           title="Delete KPI"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* ---------------- Add KPI Modal ---------------- */}
//       <AddKpiModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />

//       {/* ---------------- Edit KPI Modal ---------------- */}
//       <EditKpiModal
//         isOpen={isEditModalOpen}
//         onClose={handleCloseEditModal}
//         kpiId={currentEditKpi}
//       />

//       {/* ---------------- Confirmation Dialog ---------------- */}
//       <ConfirmationDialog
//         open={confirmDialogOpen}
//         title="Delete KPI"
//         message="Are you sure you want to delete this KPI?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };

// export default SetKpiForDesignation;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

// Zustand store
import { useKpiStore } from "../../store/useKpiStore";

// Components
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddKpiModal from "./model/AddKpiModal";
import EditKpiModal from "./model/EditKpiModal";

const SetKpiForDesignation = () => {
  const {
    designations,
    kpis,
    loading,
    selectedDesignation,
    setSelectedDesignation,
    fetchDesignations,
    fetchKpisByDesignation,
    deleteKpi,
  } = useKpiStore();

  // 1) Fetch designations on mount
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // 2) If we have designations and none is selected, automatically pick the first
  useEffect(() => {
    if (!selectedDesignation && designations.length > 0) {
      setSelectedDesignation(designations[0]);
    }
  }, [designations, selectedDesignation, setSelectedDesignation]);

  // 3) Fetch KPIs whenever a designation is selected
  useEffect(() => {
    if (selectedDesignation) {
      fetchKpisByDesignation(selectedDesignation);
    }
  }, [selectedDesignation, fetchKpisByDesignation]);

  // Track which KPI is being edited
  const [currentEditKpi, setCurrentEditKpi] = useState(null);

  // ----- Modals -----
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Confirmation dialog for deletion
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [kpiToDelete, setKpiToDelete] = useState(null);

  // Handle designation dropdown
  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
  };

  // ----- Add Modal -----
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // ----- Edit Modal -----
  const handleOpenEditModal = (kpiId) => {
    setCurrentEditKpi(kpiId);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // ----- Delete -----
  const handleDeleteKpi = (kpiId) => {
    setKpiToDelete(kpiId);
    setConfirmDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (kpiToDelete) {
      deleteKpi(kpiToDelete);
    }
    setConfirmDialogOpen(false);
    setKpiToDelete(null);
  };
  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setKpiToDelete(null);
  };

  return (
    <div className="mx-auto w-full p-4 dark:bg-gray-900 dark:text-gray-100">
      {/* Title & Designation Selector */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-xl font-semibold mb-2">Set KPI For Designation</h1>
        <label htmlFor="designationSelect" className="block text-sm font-medium mb-2">
          Select Designation
        </label>
        <select
          id="designationSelect"
          value={selectedDesignation}
          onChange={handleDesignationChange}
          className="border border-gray-300 rounded-md p-2 
                     dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="">-- Select Designation --</option>
          {designations.map((dsg) => (
            <option key={dsg} value={dsg}>
              {dsg}
            </option>
          ))}
        </select>
      </motion.div>

      {/* KPI Table */}
      {selectedDesignation && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              KPIs for: {selectedDesignation}
            </h2>
            <button
              onClick={handleOpenAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md 
                         hover:bg-blue-700 transition dark:bg-blue-500 
                         dark:hover:bg-blue-600"
            >
              Add New KPI
            </button>
          </div>

          <div className="overflow-x-auto rounded-md shadow">
            <table
              className="min-w-full border-collapse border border-gray-300 
                         bg-white dark:bg-gray-800"
            >
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left border-b border-gray-300">
                  <th className="py-2 px-4 border-r border-gray-300 font-semibold">S NO.</th>
                  <th className="py-2 px-4 border-r border-gray-300 font-semibold">Name Of KPI</th>
                  <th className="py-2 px-4 border-r border-gray-300 font-semibold">Weight (%)</th>
                  <th className="py-2 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Skeleton rows
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="py-3 px-4 border-r border-gray-300">
                        <div className="h-4 w-6 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                      </td>
                      <td className="py-3 px-4 border-r border-gray-300">
                        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                      </td>
                      <td className="py-3 px-4 border-r border-gray-300">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                      </td>
                    </tr>
                  ))
                ) : kpis.length === 0 ? (
                  <tr>
                    <td
                      className="py-4 px-4 text-center text-gray-500 dark:text-gray-300"
                      colSpan={4}
                    >
                      No KPIs found for this designation.
                    </td>
                  </tr>
                ) : (
                  kpis.map((kpi, index) => (
                    <tr
                      key={kpi._id}
                      className="border-b border-gray-300 hover:bg-gray-50 
                                 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 px-4 border-r border-gray-300">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-300">
                        {kpi.name}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-300">
                        {kpi.weight}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        <button
                          onClick={() => handleOpenEditModal(kpi._id)}
                          className="text-green-600 hover:text-green-700 
                                     dark:text-green-400 dark:hover:text-green-300"
                          title="Edit KPI"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteKpi(kpi._id)}
                          className="text-red-600 hover:text-red-700 
                                     dark:text-red-400 dark:hover:text-red-300"
                          title="Delete KPI"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Add KPI Modal */}
      <AddKpiModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />

      {/* Edit KPI Modal */}
      <EditKpiModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        kpiId={currentEditKpi}
      />

      {/* Confirmation Dialog for Deletion */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Delete KPI"
        message="Are you sure you want to delete this KPI?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default SetKpiForDesignation;
