// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import SkeletonRows from "./SkeletonRows";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import FullScreenLoader from "../../common/FullScreenLoader";
// import DepartmentModal from "./model/DepartmentModal";
// import { useHierarchyStore } from "../../../store/useHierarchyStore";

// export default function DepartmentTable() {
//   const {
//     departments,
//     loading,
//     error,
//     fetchDepartments,
//     addDepartment,
//     updateDepartment,
//     deleteDepartment,
//   } = useHierarchyStore();

//   const [showModal, setShowModal] = useState(false);
//   const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { departmentName: "" },
//   });

//   useEffect(() => {
//     fetchDepartments();
//   }, [fetchDepartments]);

//   function handleOpenModal() {
//     setShowModal(true);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleCloseModal() {
//     setShowModal(false);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleEdit(dept) {
//     setDepartmentIdToEdit(dept._id);
//     reset({ departmentName: dept.department });
//     setShowModal(true);
//   }

//   function handleConfirmDelete(dept) {
//     setDeleteData({ open: true, id: dept._id, name: dept.department });
//   }

//   async function onDeleteConfirm() {
//     setActionLoading(true);
//     try {
//       await deleteDepartment(deleteData.id);
//       toast.success("Department deleted!");
//     } catch {
//       toast.error("Failed to delete department");
//     } finally {
//       setActionLoading(false);
//       setDeleteData({ open: false, id: null, name: "" });
//     }
//   }

//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   const onSubmit = async (data) => {
//     const { departmentName } = data;
//     setActionLoading(true);
//     try {
//       if (departmentIdToEdit) {
//         await updateDepartment(departmentIdToEdit, departmentName);
//         toast.success("Department updated successfully!");
//       } else {
//         await addDepartment(departmentName);
//         toast.success("Department added successfully!");
//       }
//       handleCloseModal();
//     } catch {
//       toast.error("Something went wrong!");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div>
//       {actionLoading && <FullScreenLoader />}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Add Department</h2>
//         <button
//           onClick={handleOpenModal}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           + Add Department
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Department Name</th>
//               <th className="py-3 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <SkeletonRows count={5} columns={3} />
//             ) : (
//               departments.map((dept, idx) => (
//                 <tr key={dept._id} className="border-b border-gray-200 dark:border-gray-700">
//                   <td className="py-3 px-4">{String(idx + 1).padStart(2, "0")}</td>
//                   <td className="py-3 px-4">{dept.department}</td>
//                   <td className="py-3 px-4 flex space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       title="Edit"
//                       onClick={() => handleEdit(dept)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       title="Delete"
//                       onClick={() => handleConfirmDelete(dept)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <DepartmentModal
//         show={showModal}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmit(onSubmit)}
//         register={register}
//         departmentIdToEdit={departmentIdToEdit}
//       />
//       <ConfirmationDialog
//         open={deleteData.open}
//         title="Delete Department"
//         message={`Are you sure you want to delete "${deleteData.name}"?`}
//         onConfirm={onDeleteConfirm}
//         onCancel={onDeleteCancel}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaPlus, FaBuilding } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import SkeletonRows from "./SkeletonRows";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import FullScreenLoader from "../../common/FullScreenLoader";
// import DepartmentModal from "./model/DepartmentModal";
// import { useHierarchyStore } from "../../../store/useHierarchyStore";

// export default function DepartmentTable() {
//   const {
//     departments,
//     loading,
//     error,
//     fetchDepartments,
//     addDepartment,
//     updateDepartment,
//     deleteDepartment,
//   } = useHierarchyStore();

//   const [showModal, setShowModal] = useState(false);
//   const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { departmentName: "" },
//   });

//   useEffect(() => {
//     fetchDepartments();
//   }, [fetchDepartments]);

//   function handleOpenModal() {
//     setShowModal(true);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleCloseModal() {
//     setShowModal(false);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleEdit(dept) {
//     setDepartmentIdToEdit(dept._id);
//     reset({ departmentName: dept.department });
//     setShowModal(true);
//   }

//   function handleConfirmDelete(dept) {
//     setDeleteData({ open: true, id: dept._id, name: dept.department });
//   }

//   async function onDeleteConfirm() {
//     setActionLoading(true);
//     try {
//       await deleteDepartment(deleteData.id);
//       toast.success("Department deleted!");
//     } catch {
//       toast.error("Failed to delete department");
//     } finally {
//       setActionLoading(false);
//       setDeleteData({ open: false, id: null, name: "" });
//     }
//   }

//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   const onSubmit = async (data) => {
//     const { departmentName } = data;
//     setActionLoading(true);
//     try {
//       if (departmentIdToEdit) {
//         await updateDepartment(departmentIdToEdit, departmentName);
//         toast.success("Department updated successfully!");
//       } else {
//         await addDepartment(departmentName);
//         toast.success("Department added successfully!");
//       }
//       handleCloseModal();
//     } catch {
//       toast.error("Something went wrong!");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
//       {actionLoading && <FullScreenLoader />}
      
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
//         <div className="flex items-center gap-3 animate-fade-in">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//             <FaBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
//           </div>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
//               Departments
//             </h1>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               Manage your organization departments
//             </p>
//           </div>
//         </div>
        
//         <button
//           onClick={handleOpenModal}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 animate-fade-in"
//         >
//           <FaPlus className="text-sm" />
//           Add Department
//         </button>
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50 dark:bg-gray-900/50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                   S.L
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                   Department Name
//                 </th>
//                 <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {loading ? (
//                 <SkeletonRows count={5} columns={3} />
//               ) : (
//                 departments.map((dept, idx) => (
//                   <tr 
//                     key={dept._id} 
//                     className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
//                         {String(idx + 1).padStart(2, "0")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//                           <FaBuilding className="text-blue-600 dark:text-blue-400 text-sm" />
//                         </div>
//                         <span className="text-gray-900 dark:text-white font-medium">
//                           {dept.department}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-110"
//                           title="Edit Department"
//                           onClick={() => handleEdit(dept)}
//                         >
//                           <FaEdit className="text-sm" />
//                         </button>
//                         <button
//                           className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-110"
//                           title="Delete Department"
//                           onClick={() => handleConfirmDelete(dept)}
//                         >
//                           <FaTrash className="text-sm" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile/Tablet Card View */}
//       <div className="lg:hidden space-y-4 animate-fade-in">
//         {loading ? (
//           // Mobile skeleton loading
//           Array.from({ length: 5 }).map((_, idx) => (
//             <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//                   <div className="space-y-2">
//                     <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//                   <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           departments.map((dept, idx) => (
//             <div 
//               key={dept._id} 
//               className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3 flex-1">
//                   <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
//                     <FaBuilding className="text-blue-600 dark:text-blue-400 text-lg" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
//                       {dept.department}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Department #{String(idx + 1).padStart(2, "0")}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-2 ml-3">
//                   <button
//                     className="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
//                     title="Edit Department"
//                     onClick={() => handleEdit(dept)}
//                   >
//                     <FaEdit className="text-lg" />
//                   </button>
//                   <button
//                     className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
//                     title="Delete Department"
//                     onClick={() => handleConfirmDelete(dept)}
//                   >
//                     <FaTrash className="text-lg" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Empty State */}
//       {!loading && departments.length === 0 && (
//         <div className="text-center py-16 animate-fade-in">
//           <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
//             <FaBuilding className="text-3xl text-gray-400 dark:text-gray-500" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//             No departments found
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Get started by creating your first department
//           </p>
//           <button
//             onClick={handleOpenModal}
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105"
//           >
//             <FaPlus className="text-sm" />
//             Add First Department
//           </button>
//         </div>
//       )}

//       {/* Modals */}
//       <DepartmentModal
//         show={showModal}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmit(onSubmit)}
//         register={register}
//         departmentIdToEdit={departmentIdToEdit}
//       />
      
//       <ConfirmationDialog
//         open={deleteData.open}
//         title="Delete Department"
//         message={`Are you sure you want to delete "${deleteData.name}"? This action cannot be undone.`}
//         onConfirm={onDeleteConfirm}
//         onCancel={onDeleteCancel}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaBuilding, 
  FaSearch,
  FaFilter,
  FaSort,
  FaEye,
  FaCog,
  FaUsers
} from "react-icons/fa";
import { 
  HiOfficeBuilding,
  HiPlus,
  HiPencil,
  HiTrash,
  HiSearch,
  HiFilter,
  HiEye
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DepartmentModal from "./model/DepartmentModal";
import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DepartmentTable() {
  const {
    departments,
    loading,
    error,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useHierarchyStore();

  const [showModal, setShowModal] = useState(false);
  const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or cards

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { departmentName: "" },
  });

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  function handleOpenModal() {
    setShowModal(true);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  function handleCloseModal() {
    setShowModal(false);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  function handleEdit(dept) {
    setDepartmentIdToEdit(dept._id);
    reset({ departmentName: dept.department });
    setShowModal(true);
  }

  function handleConfirmDelete(dept) {
    setDeleteData({ open: true, id: dept._id, name: dept.department });
  }

  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteDepartment(deleteData.id);
      toast.success("Department deleted!");
    } catch {
      toast.error("Failed to delete department");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  const onSubmit = async (data) => {
    const { departmentName } = data;
    setActionLoading(true);
    try {
      if (departmentIdToEdit) {
        await updateDepartment(departmentIdToEdit, departmentName);
        toast.success("Department updated successfully!");
      } else {
        await addDepartment(departmentName);
        toast.success("Department added successfully!");
      }
      handleCloseModal();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept =>
    dept.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      {actionLoading && <FullScreenLoader />}
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Departments
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your organization's department structure
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {departments.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Departments
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaUsers className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredDepartments.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Departments
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaCog className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchTerm ? 'Filtered' : 'All'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View Mode
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Toggle & Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle - Desktop only */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Department</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredDepartments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBuilding className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No departments found" : "No departments yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "Get started by creating your first department"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenModal}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add First Department</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className={`hidden lg:${viewMode === "table" ? "block" : "hidden"}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Department Name
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredDepartments.map((dept, idx) => (
                            <motion.tr
                              key={dept._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                    <FaBuilding className="text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {dept.department}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEdit(dept)}
                                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    title="Edit Department"
                                  >
                                    <HiPencil className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleConfirmDelete(dept)}
                                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete Department"
                                  >
                                    <HiTrash className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Cards View - Mobile/Tablet and Desktop when selected */}
              <div className={`block lg:${viewMode === "cards" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredDepartments.map((dept, idx) => (
                      <motion.div
                        key={dept._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <FaBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {dept.department}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Department #{String(idx + 1).padStart(2, "0")}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <FaUsers className="text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                  Active
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <FaCog className="text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Department Type</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  Operational
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(dept)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiPencil className="text-sm" />
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleConfirmDelete(dept)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiTrash className="text-sm" />
                              <span>Delete</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <DepartmentModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        departmentIdToEdit={departmentIdToEdit}
      />
      
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteData.name}"? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}