
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { FiPlus, FiDownload, FiTrash } from "react-icons/fi";
// import useInductionPPTStore from "../../../store/useInductionPPTStore";
// import InductionPPTModal from "./model/InductionPPTModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// export default function CompanyInduction() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [pptName, setPptName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [allDepartment, setAllDepartment] = useState(false); // <-- NEW
//   const [file, setFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//   const [pptToDelete, setPptToDelete] = useState(null);

//   const { pptList, fetchPPTs, createPPT, deletePPT } = useInductionPPTStore();

//   useEffect(() => {
//     fetchPPTs();
//   }, [fetchPPTs]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!pptName || !file) {
//       toast.error("Please provide a PPT name and PPT file.");
//       return;
//     }
//     // If not allDepartment, we need a department
//     if (!allDepartment && !department) {
//       toast.error("Please select a department or choose All Departments.");
//       return;
//     }

//     const pptData = {
//       pptName,
//       department,
//       allDepartment, // <--- Pass this
//       pptFile: file,
//       coverImage,
//     };

//     await createPPT(pptData);
//     setIsModalOpen(false);

//     // Clear form fields
//     setPptName("");
//     setDepartment("");
//     setAllDepartment(false);
//     setFile(null);
//     setCoverImage(null);
//   };

//   const handleDelete = (id) => {
//     setPptToDelete(id);
//     setIsConfirmDialogOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (pptToDelete) {
//       await deletePPT(pptToDelete);
//       setPptToDelete(null);
//       setIsConfirmDialogOpen(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setPptToDelete(null);
//     setIsConfirmDialogOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           All Induction PPTs
//         </h1>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white px-4 py-2 
//                      rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <FiPlus className="mr-2" />
//           Add Induction PPT
//         </motion.button>
//       </div>

//       {/* Grid of PPT cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pptList.map((item) => (
//           <motion.div
//             key={item._id}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
//           >
//             <img
//               src={item.coverImage}
//               alt={item.pptName}
//               className="h-40 w-full object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                 {item.pptName}
//               </h2>
//               {/* Show which department or if allDepartment */}
//               <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
//                 {item.allDepartment ? "All Departments" : item.department}
//               </p>
//               <div className="flex justify-between">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded 
//                              hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//                 >
//                   <FiDownload className="mr-2" />
//                   <a
//                     href={item.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View PPT
//                   </a>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-red-500 text-white px-3 py-2 rounded 
//                              hover:bg-red-600 transition-all"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   <FiTrash className="mr-1" />
//                   Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Modal */}
//       <InductionPPTModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         pptName={pptName}
//         setPptName={setPptName}
//         department={department}
//         setDepartment={setDepartment}
//         allDepartment={allDepartment}           // <--- pass down
//         setAllDepartment={setAllDepartment}     // <--- pass down
//         file={file}
//         setFile={setFile}
//         coverImage={coverImage}
//         setCoverImage={setCoverImage}
//         handleSubmit={handleSubmit}
//       />

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={isConfirmDialogOpen}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this PPT?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }

// src/components/CompanyInduction/CompanyInduction.jsx

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { FiPlus, FiDownload, FiTrash, FiEdit } from "react-icons/fi";
// import useInductionPPTStore from "../../../store/useInductionPPTStore";
// import InductionPPTModal from "./model/InductionPPTModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// export default function CompanyInduction() {
//   // Local states for the form
//   const [pptName, setPptName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [allDepartment, setAllDepartment] = useState(false);
//   const [file, setFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   // Modal, Edit, Confirm states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false); // are we editing or adding?
//   const [editingPPTId, setEditingPPTId] = useState(null);

//   const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//   const [pptToDelete, setPptToDelete] = useState(null);

//   // Pull in store
//   const { pptList, fetchPPTs, createPPT, updatePPT, deletePPT } =
//     useInductionPPTStore();

//   // Fetch PPTs on load
//   useEffect(() => {
//     fetchPPTs();
//   }, [fetchPPTs]);

//   /** Open modal in ADD mode */
//   const handleAddNew = () => {
//     // Reset states
//     setPptName("");
//     setDepartment("");
//     setAllDepartment(false);
//     setFile(null);
//     setCoverImage(null);

//     setEditMode(false);
//     setEditingPPTId(null);
//     setIsModalOpen(true);
//   };

//   /** Open modal in EDIT mode, pre-fill states */
//   const handleEdit = (ppt) => {
//     setEditingPPTId(ppt._id);
//     setPptName(ppt.pptName);
//     setDepartment(ppt.department);
//     setAllDepartment(ppt.allDepartment || false);
//     setFile(null);
//     setCoverImage(null);

//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   /** Create OR Update */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!pptName) {
//       toast.error("PPT name is required.");
//       return;
//     }
//     if (!allDepartment && !department) {
//       toast.error("Please select a department or choose All Departments.");
//       return;
//     }

//     const pptData = {
//       pptName,
//       department,
//       allDepartment,
//       pptFile: file,
//       coverImage,
//     };

//     try {
//       if (editMode && editingPPTId) {
//         await updatePPT(editingPPTId, pptData);
//       } else {
//         // if we are adding a new PPT, file is required
//         if (!file) {
//           toast.error("Please select a PPT file for upload.");
//           return;
//         }
//         await createPPT(pptData);
//       }

//       // Close & reset
//       setIsModalOpen(false);
//       setEditMode(false);
//       setEditingPPTId(null);
//       setPptName("");
//       setDepartment("");
//       setAllDepartment(false);
//       setFile(null);
//       setCoverImage(null);
//     } catch (err) {
//       toast.error("Operation failed");
//     }
//   };

//   /** Confirm user wants to delete */
//   const handleDelete = (id) => {
//     setPptToDelete(id);
//     setIsConfirmDialogOpen(true);
//   };

//   /** Delete if user confirms */
//   const handleConfirmDelete = async () => {
//     if (pptToDelete) {
//       await deletePPT(pptToDelete);
//       setPptToDelete(null);
//       setIsConfirmDialogOpen(false);
//     }
//   };

//   /** User canceled delete */
//   const handleCancelDelete = () => {
//     setPptToDelete(null);
//     setIsConfirmDialogOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           All Induction PPTs
//         </h1>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white
//                      px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400
//                      dark:text-gray-900 transition-all"
//           onClick={handleAddNew}
//         >
//           <FiPlus className="mr-2" />
//           Add Induction PPT
//         </motion.button>
//       </div>

//       {/* PPT List Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pptList.map((item) => (
//           <motion.div
//             key={item._id}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
//           >
//             <img
//               src={item.coverImage}
//               alt={item.pptName}
//               className="h-40 w-full object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                 {item.pptName}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
//                 {item.allDepartment ? "All Departments" : item.department}
//               </p>
//               <div className="flex justify-between">
//                 {/* View PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-blue-500 text-white px-3 py-2
//                              rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900
//                              transition-all"
//                 >
//                   <FiDownload className="mr-2" />
//                   <a
//                     href={item.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View PPT
//                   </a>
//                 </motion.button>

//                 {/* Edit PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-green-500 text-white px-3 py-2
//                              rounded hover:bg-green-600 transition-all"
//                   onClick={() => handleEdit(item)}
//                 >
//                   <FiEdit className="mr-1" />
//                   Edit
//                 </motion.button>

//                 {/* Delete PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-red-500 text-white px-3 py-2
//                              rounded hover:bg-red-600 transition-all"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   <FiTrash className="mr-1" />
//                   Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Modal for Add/Edit */}
//       <InductionPPTModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         pptName={pptName}
//         setPptName={setPptName}
//         department={department}
//         setDepartment={setDepartment}
//         allDepartment={allDepartment}
//         setAllDepartment={setAllDepartment}
//         file={file}
//         setFile={setFile}
//         coverImage={coverImage}
//         setCoverImage={setCoverImage}
//         handleSubmit={handleSubmit}
//         editMode={editMode}
//       />

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={isConfirmDialogOpen}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this PPT?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiDownload, FiTrash, FiEdit } from "react-icons/fi";
import useInductionPPTStore from "../../../store/useInductionPPTStore";
import InductionPPTModal from "./model/InductionPPTModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";

export default function CompanyInduction() {
  // Local states for the form
  const [pptName, setPptName] = useState("");
  const [department, setDepartment] = useState("");
  const [allDepartment, setAllDepartment] = useState(false);
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Modal, Edit, Confirm states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); 
  const [editingPPTId, setEditingPPTId] = useState(null);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pptToDelete, setPptToDelete] = useState(null);

  // Zustand store
  const { pptList, fetchPPTs, createPPT, updatePPT, deletePPT } =
    useInductionPPTStore();

  // Fetch PPTs on load
  useEffect(() => {
    fetchPPTs();
  }, [fetchPPTs]);

  /** Open modal in ADD mode */
  const handleAddNew = () => {
    // Reset form states
    setPptName("");
    setDepartment("");
    setAllDepartment(false);
    setFile(null);
    setCoverImage(null);

    setEditMode(false);
    setEditingPPTId(null);
    setIsModalOpen(true);
  };

  /** Open modal in EDIT mode, pre-fill states */
  const handleEdit = (ppt) => {
    setEditingPPTId(ppt._id);
    setPptName(ppt.pptName);
    setDepartment(ppt.department);
    setAllDepartment(ppt.allDepartment || false);
    setFile(null);
    setCoverImage(null);

    setEditMode(true);
    setIsModalOpen(true);
  };

  /** Create OR Update */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pptName) {
      toast.error("PPT name is required.");
      return;
    }
    if (!allDepartment && !department) {
      toast.error("Please select a department or choose All Departments.");
      return;
    }

    const pptData = {
      pptName,
      department,
      allDepartment,
      pptFile: file,
      coverImage,
    };

    try {
      if (editMode && editingPPTId) {
        await updatePPT(editingPPTId, pptData);
      } else {
        if (!file) {
          toast.error("Please select a PPT file for upload.");
          return;
        }
        await createPPT(pptData);
      }

      // Close & reset
      setIsModalOpen(false);
      setEditMode(false);
      setEditingPPTId(null);
      setPptName("");
      setDepartment("");
      setAllDepartment(false);
      setFile(null);
      setCoverImage(null);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  /** Confirm user wants to delete */
  const handleDelete = (id) => {
    setPptToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  /** Delete if user confirms */
  const handleConfirmDelete = async () => {
    if (pptToDelete) {
      await deletePPT(pptToDelete);
      setPptToDelete(null);
      setIsConfirmDialogOpen(false);
    }
  };

  /** User canceled delete */
  const handleCancelDelete = () => {
    setPptToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Induction PPTs
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white
                     px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400
                     dark:text-gray-900 transition-all"
          onClick={handleAddNew}
        >
          <FiPlus className="mr-2" />
          Add Induction PPT
        </motion.button>
      </div>

      {/* PPT List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pptList.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
          >
            <img
              src={item.coverImage}
              alt={item.pptName}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.pptName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {item.allDepartment ? "All Departments" : item.department}
              </p>
              <div className="flex justify-between gap-1">
                {/* View PPT */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-blue-500 text-white px-1 py-2
                             rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900
                             transition-all"
                >
                  <FiDownload className="mr-2" />
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PPT
                  </a>
                </motion.button>

                {/* Edit PPT */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-green-500 text-white px-3 py-2
                             rounded hover:bg-green-600 transition-all"
                  onClick={() => handleEdit(item)}
                >
                  <FiEdit className="mr-1" />
                  Edit
                </motion.button>

                {/* Delete PPT */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-red-500 text-white px-3 py-2
                             rounded hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(item._id)}
                >
                  <FiTrash className="mr-1" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      <InductionPPTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pptName={pptName}
        setPptName={setPptName}
        department={department}
        setDepartment={setDepartment}
        allDepartment={allDepartment}
        setAllDepartment={setAllDepartment}
        file={file}
        setFile={setFile}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this PPT?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
