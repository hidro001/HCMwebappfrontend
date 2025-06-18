// import React, { useEffect, useState } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import SkeletonRows from "./SkeletonRows";
// import FullScreenLoader from "../../common/FullScreenLoader";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { useHierarchyStore } from "../../../store/useHierarchyStore";
// import RoleAddModal from "./model/RoleAddModal";
// import RolePermissionModal from "./model/RolePermissionModal";

// export default function RoleTable({ isLoading }) {
//   const { roles, loading, error, fetchRoles, addRole, updateRole, deleteRole } =
//     useHierarchyStore();

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [addRoleName, setAddRoleName] = useState("");
//   const [addSelectedPerms, setAddSelectedPerms] = useState([]);
//   const [showPermissionModal, setShowPermissionModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editRoleId, setEditRoleId] = useState(null);
//   const [editRoleName, setEditRoleName] = useState("");
//   const [editPermissions, setEditPermissions] = useState([]);
//   const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedPerms, setSelectedPerms] = useState([]);

// const onTogglePerm = (perm) => {
//   setSelectedPerms((prev) => {
//     const exists = prev.some((p) => p.value === perm.permission);
//     if (exists) {
//       return prev.filter((p) => p.value !== perm.permission);
//     } else {
//       return [...prev, { value: perm.permission, name: perm.name }];
//     }
//   });
// };

//   useEffect(() => {
//     fetchRoles();
//   }, [fetchRoles]);

//   function handleOpenAddModal() {
//     setShowAddModal(true);
//     setAddRoleName("");
//     setAddSelectedPerms([]);
//   }

//   function handleCloseAddModal() {
//     setShowAddModal(false);
//   }

// function handleToggleAddPerm(permObj) {
//   const exists = addSelectedPerms.find((p) => p.value === permObj.permission);
//   if (exists) {
//     setAddSelectedPerms(
//       addSelectedPerms.filter((p) => p.value !== permObj.permission)
//     );
//   } else {
//     setAddSelectedPerms([
//       ...addSelectedPerms,
//       { value: permObj.permission, label: permObj.name },
//     ]);
//   }
// }


//   async function handleAddRoleSubmit() {
//     if (!addRoleName.trim()) {
//       toast.error("Role name is required");
//       return;
//     }
//     setActionLoading(true);
//     try {
//       await addRole(addRoleName, addSelectedPerms);
//       toast.success("Role added successfully!");
//       handleCloseAddModal();
//     } catch (err) {
//       toast.error(err?.message || "Failed to add role");
//     } finally {
//       setActionLoading(false);
//     }
//   }

//   function handleOpenPermissionModal(role, editMode) {
//     setIsEditing(editMode);
//     setEditRoleId(role._id);
//     setEditRoleName(role.role_name);
//     const mapped = (role.permission || []).map((p) => ({
//       label: p.name,
//       value: p.permission,
//     }));
//     setEditPermissions(mapped);
//     setShowPermissionModal(true);
//   }

//   function handleClosePermissionModal() {
//     setShowPermissionModal(false);
//     setIsEditing(false);
//     setEditRoleId(null);
//     setEditRoleName("");
//     setEditPermissions([]);
//   }

//   function handleToggleEditPerm(permObj) {
//     const exists = editPermissions.find((p) => p.value === permObj.permission);
//     if (exists) {
//       setEditPermissions(
//         editPermissions.filter((p) => p.value !== permObj.permission)
//       );
//     } else {
//       setEditPermissions([
//         ...editPermissions,
//         { label: permObj.name, value: permObj.permission },
//       ]);
//     }
//   }

//   async function handleSaveEditedRole() {
//     if (!editRoleName.trim()) {
//       toast.error("Role name is required");
//       return;
//     }
//     setActionLoading(true);
//     try {
//       await updateRole(editRoleId, editRoleName, editPermissions);
//       toast.success("Role updated successfully!");
//       handleClosePermissionModal();
//     } catch (err) {
//       toast.error(err?.message || "Failed to update role");
//     } finally {
//       setActionLoading(false);
//     }
//   }

//   function handleConfirmDelete(role) {
//     setDeleteData({ open: true, id: role._id, name: role.role_name });
//   }

//   async function onDeleteConfirm() {
//     setActionLoading(true);
//     try {
//       await deleteRole(deleteData.id);
//       toast.success("Role deleted!");
//     } catch (err) {
//       toast.error(err?.message || "Failed to delete role");
//     } finally {
//       setActionLoading(false);
//       setDeleteData({ open: false, id: null, name: "" });
//     }
//   }

//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   return (
//     <div>
//       {actionLoading && <FullScreenLoader />}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Manage Roles</h2>
//         <button
//           onClick={handleOpenAddModal}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           + Add Role
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Role Name</th>
//               <th className="py-3 px-4">Permissions</th>
//               <th className="py-3 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <SkeletonRows count={5} columns={4} />
//             ) : roles.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   No roles found.
//                 </td>
//               </tr>
//             ) : (
//               roles.map((role, idx) => {
//                 const firstTwo = role.permission.slice(0, 2);
//                 const hasMore = role.permission.length > 2;
//                 return (
//                   <tr
//                     key={role._id}
//                     className="border-b border-gray-200 dark:border-gray-700"
//                   >
//                     <td className="py-3 px-4">
//                       {String(idx + 1).padStart(2, "0")}
//                     </td>
//                     <td className="py-3 px-4">{role.role_name}</td>
//                     <td className="py-3 px-4">
//                       {firstTwo.map((perm) => (
//                         <span
//                           key={perm.permission}
//                           className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 mr-2 mb-1 px-2 py-1 rounded"
//                         >
//                           {perm.name}
//                         </span>
//                       ))}
//                       {hasMore && (
//                         <button
//                           onClick={() => handleOpenPermissionModal(role, false)}
//                           className="text-blue-500 ml-2 underline"
//                         >
//                           See all &gt;
//                         </button>
//                       )}
//                     </td>
//                     <td className="py-3 px-4 flex space-x-2">
//                       <button
//                         onClick={() => handleOpenPermissionModal(role, false)}
//                         className="text-blue-500 hover:text-blue-600"
//                         title="View"
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         onClick={() => handleOpenPermissionModal(role, true)}
//                         className="text-green-500 hover:text-green-600"
//                         title="Edit"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleConfirmDelete(role)}
//                         className="text-red-500 hover:text-red-600"
//                         title="Delete"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//       <RoleAddModal
//         show={showAddModal}
//         onClose={handleCloseAddModal}
//         roleName={addRoleName}
//         setRoleName={setAddRoleName}
//         selectedPerms={addSelectedPerms}
//         setSelectedPerms={setAddSelectedPerms} 
//         onTogglePerm={handleToggleAddPerm}
//         onSubmit={handleAddRoleSubmit}
//       />

//       <RolePermissionModal
//         show={showPermissionModal}
//         onClose={handleClosePermissionModal}
//         isEditing={isEditing}
//         roleName={editRoleName}
//         setRoleName={setEditRoleName}
//         permissions={editPermissions}
//         onTogglePerm={handleToggleEditPerm}
//         onSave={handleSaveEditedRole}
//       />
//       <ConfirmationDialog
//         open={deleteData.open}
//         title="Delete Role"
//         message={`Are you sure you want to delete "${deleteData.name}"?`}
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
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaSearch,
  FaFilter,
  FaShieldAlt,
  FaKey,
  FaUsers,
  FaCog,
  FaLock,
  FaUserShield,
  FaEllipsisH
} from "react-icons/fa";
import { 
  HiShieldCheck,
  HiPlus,
  HiPencil,
  HiTrash,
  HiSearch,
  HiFilter,
  HiEye,
  HiKey,
  HiLockClosed
} from "react-icons/hi";
import { toast } from "react-hot-toast";
import SkeletonRows from "./SkeletonRows";
import FullScreenLoader from "../../common/FullScreenLoader";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { useHierarchyStore } from "../../../store/useHierarchyStore";
import RoleAddModal from "./model/RoleAddModal";
import RolePermissionModal from "./model/RolePermissionModal";

export default function RoleTable({ isLoading }) {
  const { roles, loading, error, fetchRoles, addRole, updateRole, deleteRole } =
    useHierarchyStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [addRoleName, setAddRoleName] = useState("");
  const [addSelectedPerms, setAddSelectedPerms] = useState([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");
  const [editPermissions, setEditPermissions] = useState([]);
  const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or cards

const onTogglePerm = (perm) => {
  setSelectedPerms((prev) => {
    const exists = prev.some((p) => p.value === perm.permission);
    if (exists) {
      return prev.filter((p) => p.value !== perm.permission);
    } else {
      return [...prev, { value: perm.permission, name: perm.name }];
    }
  });
};

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  function handleOpenAddModal() {
    setShowAddModal(true);
    setAddRoleName("");
    setAddSelectedPerms([]);
  }

  function handleCloseAddModal() {
    setShowAddModal(false);
  }

function handleToggleAddPerm(permObj) {
  const exists = addSelectedPerms.find((p) => p.value === permObj.permission);
  if (exists) {
    setAddSelectedPerms(
      addSelectedPerms.filter((p) => p.value !== permObj.permission)
    );
  } else {
    setAddSelectedPerms([
      ...addSelectedPerms,
      { value: permObj.permission, label: permObj.name },
    ]);
  }
}

  async function handleAddRoleSubmit() {
    if (!addRoleName.trim()) {
      toast.error("Role name is required");
      return;
    }
    setActionLoading(true);
    try {
      await addRole(addRoleName, addSelectedPerms);
      toast.success("Role added successfully!");
      handleCloseAddModal();
    } catch (err) {
      toast.error(err?.message || "Failed to add role");
    } finally {
      setActionLoading(false);
    }
  }

  function handleOpenPermissionModal(role, editMode) {
    setIsEditing(editMode);
    setEditRoleId(role._id);
    setEditRoleName(role.role_name);
    const mapped = (role.permission || []).map((p) => ({
      label: p.name,
      value: p.permission,
    }));
    setEditPermissions(mapped);
    setShowPermissionModal(true);
  }

  function handleClosePermissionModal() {
    setShowPermissionModal(false);
    setIsEditing(false);
    setEditRoleId(null);
    setEditRoleName("");
    setEditPermissions([]);
  }

  function handleToggleEditPerm(permObj) {
    const exists = editPermissions.find((p) => p.value === permObj.permission);
    if (exists) {
      setEditPermissions(
        editPermissions.filter((p) => p.value !== permObj.permission)
      );
    } else {
      setEditPermissions([
        ...editPermissions,
        { label: permObj.name, value: permObj.permission },
      ]);
    }
  }

  async function handleSaveEditedRole() {
    if (!editRoleName.trim()) {
      toast.error("Role name is required");
      return;
    }
    setActionLoading(true);
    try {
      await updateRole(editRoleId, editRoleName, editPermissions);
      toast.success("Role updated successfully!");
      handleClosePermissionModal();
    } catch (err) {
      toast.error(err?.message || "Failed to update role");
    } finally {
      setActionLoading(false);
    }
  }

  function handleConfirmDelete(role) {
    setDeleteData({ open: true, id: role._id, name: role.role_name });
  }

  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteRole(deleteData.id);
      toast.success("Role deleted!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete role");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  // Filter roles based on search term
  const filteredRoles = roles.filter(role =>
    role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <HiShieldCheck className="text-green-600 dark:text-green-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Role Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage user roles and permissions across your organization
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaShieldAlt className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roles.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Roles
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaKey className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredRoles.reduce((acc, role) => acc + (role.permission?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Permissions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaUserShield className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredRoles.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Roles
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
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
                      ? "bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm"
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
                onClick={handleOpenAddModal}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Role</span>
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
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredRoles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No roles found" : "No roles yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "Get started by creating your first role"}
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add First Role</span>
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
                            Role Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Permissions
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {filteredRoles.map((role, idx) => {
                            const firstTwo = role.permission.slice(0, 2);
                            const hasMore = role.permission.length > 2;
                            return (
                              <motion.tr
                                key={role._id}
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
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                      <FaShieldAlt className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {role.role_name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {role.permission.length} permissions
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1">
                                    {firstTwo.map((perm) => (
                                      <span
                                        key={perm.permission}
                                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                                      >
                                        {perm.name}
                                      </span>
                                    ))}
                                    {hasMore && (
                                      <button
                                        onClick={() => handleOpenPermissionModal(role, false)}
                                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                      >
                                        +{role.permission.length - 2} more
                                      </button>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleOpenPermissionModal(role, false)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                      title="View Role"
                                    >
                                      <HiEye className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleOpenPermissionModal(role, true)}
                                      className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                      title="Edit Role"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleConfirmDelete(role)}
                                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                      title="Delete Role"
                                    >
                                      <HiTrash className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
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
                    {filteredRoles.map((role, idx) => (
                      <motion.div
                        key={role._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="bg-green-50 dark:bg-green-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <FaShieldAlt className="text-green-600 dark:text-green-400 text-xl" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {role.role_name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Role #{String(idx + 1).padStart(2, "0")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="space-y-4">
                            {/* Permissions Count */}
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <FaKey className="text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Permissions</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {role.permission.length} assigned
                                </p>
                              </div>
                            </div>

                            {/* Sample Permissions */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Permissions:</p>
                              <div className="flex flex-wrap gap-1">
                                {role.permission.slice(0, 3).map((perm) => (
                                  <span
                                    key={perm.permission}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                                  >
                                    {perm.name}
                                  </span>
                                ))}
                                {role.permission.length > 3 && (
                                  <button
                                    onClick={() => handleOpenPermissionModal(role, false)}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    +{role.permission.length - 3} more
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOpenPermissionModal(role, false)}
                              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiEye className="text-sm" />
                              <span>View</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOpenPermissionModal(role, true)}
                              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiPencil className="text-sm" />
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleConfirmDelete(role)}
                              className="flex items-center justify-center p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <HiTrash className="text-sm" />
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
      <RoleAddModal
        show={showAddModal}
        onClose={handleCloseAddModal}
        roleName={addRoleName}
        setRoleName={setAddRoleName}
        selectedPerms={addSelectedPerms}
        setSelectedPerms={setAddSelectedPerms} 
        onTogglePerm={handleToggleAddPerm}
        onSubmit={handleAddRoleSubmit}
      />

      <RolePermissionModal
        show={showPermissionModal}
        onClose={handleClosePermissionModal}
        isEditing={isEditing}
        roleName={editRoleName}
        setRoleName={setEditRoleName}
        permissions={editPermissions}
        onTogglePerm={handleToggleEditPerm}
        onSave={handleSaveEditedRole}
      />
      
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Role"
        message={`Are you sure you want to delete "${deleteData.name}"? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}