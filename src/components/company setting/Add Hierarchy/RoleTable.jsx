
// import React, { useEffect, useState } from "react";
// import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// import SkeletonRows from "./SkeletonRows";
// import { availablePermission } from "../../../service/availablePermissions";
// import { useHierarchyStore } from "../../../store/useHierarchyStore";
// import FullScreenLoader from "../../common/FullScreenLoader";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// export default function RoleTable({ isLoading }) {
//   // ---------- Zustand Store ----------
//   const {
//     roles,
//     loading,
//     error,
//     fetchRoles,
//     addRole,
//     updateRole,
//     deleteRole,
//   } = useHierarchyStore();

//   // ---------- Local State (Add Role Modal) ----------
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [addRoleName, setAddRoleName] = useState("");
//   const [addSelectedPerms, setAddSelectedPerms] = useState([]); 

//   // ---------- Local State (View/Edit Modal) ----------
//   const [showPermissionModal, setShowPermissionModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editRoleId, setEditRoleId] = useState(null);
//   const [editRoleName, setEditRoleName] = useState("");
//   const [editPermissions, setEditPermissions] = useState([]); 

//   // ---------- Local State (Delete Confirmation) ----------
//   const [deleteData, setDeleteData] = useState({
//     open: false,
//     id: null,
//     name: "",
//   });

//   // ---------- Fetch roles on mount ----------
//   useEffect(() => {
//     fetchRoles();
//   }, [fetchRoles]);

//   // =========== ADD ROLE ===========
//   function handleOpenAddModal() {
//     setShowAddModal(true);
//     setAddRoleName("");
//     setAddSelectedPerms([]);
//   }
//   function handleCloseAddModal() {
//     setShowAddModal(false);
//   }

//   // Toggle permission in Add Role modal
//   function handleToggleAddPerm(permObj) {
//     // permObj = { name: "Manager Dashboard", permission: "managerDashboard" }
//     const exists = addSelectedPerms.find((p) => p.value === permObj.permission);
//     if (exists) {
//       // remove
//       setAddSelectedPerms(
//         addSelectedPerms.filter((p) => p.value !== permObj.permission)
//       );
//     } else {
//       // add
//       setAddSelectedPerms([
//         ...addSelectedPerms,
//         { label: permObj.name, value: permObj.permission },
//       ]);
//     }
//   }

//   // Submit Add Role
//   async function handleAddRoleSubmit() {
//     if (!addRoleName.trim()) {
//       toast.error("Role name is required");
//       return;
//     }
//     try {
//       await addRole(addRoleName, addSelectedPerms);
//       toast.success("Role added successfully!");
//       handleCloseAddModal();
//     } catch (err) {
//       toast.error(err?.message || "Failed to add role");
//     }
//   }

//   // =========== VIEW/EDIT ROLE PERMISSIONS ===========

//   // Open the modal for either read-only or editing
//   function handleOpenPermissionModal(role, editMode) {
//     setIsEditing(editMode);
//     setEditRoleId(role._id);
//     setEditRoleName(role.role_name);

//     // Convert role.permission array to the shape: [{ label, value }, ...]
//     // if it's already name/permission, do so:
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

//   // Toggle permission in the "edit" modal
//   function handleToggleEditPerm(permObj) {
//     const exists = editPermissions.find((p) => p.value === permObj.permission);
//     if (exists) {
//       // remove
//       setEditPermissions(
//         editPermissions.filter((p) => p.value !== permObj.permission)
//       );
//     } else {
//       // add
//       setEditPermissions([
//         ...editPermissions,
//         { label: permObj.name, value: permObj.permission },
//       ]);
//     }
//   }

//   // Save changes from the "edit" modal
//   async function handleSaveEditedRole() {
//     if (!editRoleName.trim()) {
//       toast.error("Role name is required");
//       return;
//     }
//     try {
//       await updateRole(editRoleId, editRoleName, editPermissions);
//       toast.success("Role updated successfully!");
//       handleClosePermissionModal();
//     } catch (err) {
//       toast.error(err?.message || "Failed to update role");
//     }
//   }

//   // =========== DELETE ROLE ===========
//   function handleConfirmDelete(role) {
//     setDeleteData({
//       open: true,
//       id: role._id,
//       name: role.role_name,
//     });
//   }
//   async function onDeleteConfirm() {
//     try {
//       await deleteRole(deleteData.id);
//       toast.success("Role deleted!");
//     } catch (err) {
//       toast.error(err?.message || "Failed to delete role");
//     }
//     setDeleteData({ open: false, id: null, name: "" });
//   }
//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   // If store is loading, show loader
//   if (loading) return <FullScreenLoader />;

//   return (
//     <div>
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
//             {roles.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   No roles found.
//                 </td>
//               </tr>
//             ) : (
//               roles.map((role, idx) => {
//                 // role.permission is array of { name, permission }
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
//                       {/* View => read-only mode */}
//                       <button
//                         onClick={() => handleOpenPermissionModal(role, false)}
//                         className="text-blue-500 hover:text-blue-600"
//                         title="View"
//                       >
//                         <FaEye />
//                       </button>

//                       {/* Edit => open same modal in editing mode */}
//                       <button
//                         onClick={() => handleOpenPermissionModal(role, true)}
//                         className="text-green-500 hover:text-green-600"
//                         title="Edit"
//                       >
//                         <FaEdit />
//                       </button>

//                       {/* Delete => confirm */}
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

//       {/* ADD ROLE MODAL */}
//       {showAddModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/40 backdrop-blur-sm"
//         >
//           <div className="relative w-96 max-h-[80vh] overflow-y-auto 
//                           bg-white dark:bg-gray-800 rounded-lg shadow p-6"
//           >
//             <button
//               onClick={handleCloseAddModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
//                          dark:text-gray-300 dark:hover:text-gray-100"
//             >
//               <FaTimes />
//             </button>

//             <h2 className="text-lg font-semibold mb-4">Add New Role</h2>

//             <label className="block mb-2 font-medium" htmlFor="addRoleName">
//               Role Name
//             </label>
//             <input
//               id="addRoleName"
//               type="text"
//               placeholder="Enter Role Name"
//               value={addRoleName}
//               onChange={(e) => setAddRoleName(e.target.value)}
//               className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
//                          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//             />

//             <p className="font-medium mb-2">Select Permissions</p>
//             <div className="space-y-2 mb-4">
//               {availablePermission.map((perm) => {
//                 const isChecked = addSelectedPerms.some(
//                   (p) => p.value === perm.permission
//                 );
//                 return (
//                   <label
//                     key={perm.permission}
//                     className="flex items-center space-x-2"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-blue-500"
//                       checked={isChecked}
//                       onChange={() => handleToggleAddPerm(perm)}
//                     />
//                     <span className="dark:text-gray-100 text-gray-800">
//                       {perm.name}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>

//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={handleCloseAddModal}
//                 className="border border-orange-500 text-orange-500 
//                            px-4 py-2 rounded hover:bg-orange-50 
//                            dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddRoleSubmit}
//                 className="bg-blue-500 hover:bg-blue-600 
//                            text-white px-4 py-2 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW/EDIT PERMISSIONS MODAL */}
//       {showPermissionModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/40 backdrop-blur-sm"
//         >
//           <div className="relative w-96 max-h-[80vh] overflow-y-auto
//                           bg-white dark:bg-gray-800 rounded-lg shadow p-6"
//           >
//             <button
//               onClick={handleClosePermissionModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
//                          dark:text-gray-300 dark:hover:text-gray-100"
//             >
//               <FaTimes />
//             </button>

//             <h2 className="text-lg font-semibold mb-4">
//               {isEditing
//                 ? `Edit Role (${editRoleName})`
//                 : `View Role (${editRoleName})`}
//             </h2>

//             {/* If editing, show an editable Role Name field */}
//             {isEditing && (
//               <>
//                 <label className="block mb-2 font-medium" htmlFor="editRoleName">
//                   Role Name
//                 </label>
//                 <input
//                   id="editRoleName"
//                   type="text"
//                   placeholder="Enter Role Name"
//                   value={editRoleName}
//                   onChange={(e) => setEditRoleName(e.target.value)}
//                   className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
//                              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//                 />
//               </>
//             )}

//             {/* Permissions list: either read-only or checkboxes if editing */}
//             <p className="font-medium mb-2">Permissions</p>
//             <div className="space-y-2 mb-4">
//               {availablePermission.map((perm) => {
//                 const isChecked = editPermissions.some(
//                   (p) => p.value === perm.permission
//                 );
//                 return (
//                   <label key={perm.permission} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-blue-500"
//                       checked={isChecked}
//                       onChange={() => {
//                         if (isEditing) {
//                           handleToggleEditPerm(perm);
//                         }
//                       }}
//                       disabled={!isEditing}
//                     />
//                     <span className="dark:text-gray-100 text-gray-800">
//                       {perm.name}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>

//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={handleClosePermissionModal}
//                 className="border border-orange-500 text-orange-500 
//                            px-4 py-2 rounded hover:bg-orange-50
//                            dark:hover:bg-gray-700"
//               >
//                 {isEditing ? "Cancel" : "Close"}
//               </button>
//               {isEditing && (
//                 <button
//                   onClick={handleSaveEditedRole}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE CONFIRMATION DIALOG */}
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
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import FullScreenLoader from "../../common/FullScreenLoader";
import ConfirmationDialog from "../../common/ConfirmationDialog";

import { useHierarchyStore } from "../../../store/useHierarchyStore";
import RoleAddModal from "./RoleAddModal";
import RolePermissionModal from "./RolePermissionModal";

export default function RoleTable({ isLoading }) {
  // ---------- Zustand Store ----------
  const {
    roles,
    loading,
    error,
    fetchRoles,
    addRole,
    updateRole,
    deleteRole,
  } = useHierarchyStore();

  // ---------- Local State (Add Role Modal) ----------
  const [showAddModal, setShowAddModal] = useState(false);
  const [addRoleName, setAddRoleName] = useState("");
  const [addSelectedPerms, setAddSelectedPerms] = useState([]);

  // ---------- Local State (View/Edit Modal) ----------
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");
  const [editPermissions, setEditPermissions] = useState([]);

  // ---------- Local State (Delete Confirmation) ----------
  const [deleteData, setDeleteData] = useState({
    open: false,
    id: null,
    name: "",
  });

  // ---------- Action Loading State ----------
  const [actionLoading, setActionLoading] = useState(false);

  // ---------- Fetch roles on mount ----------
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // =========== ADD ROLE ===========
  function handleOpenAddModal() {
    setShowAddModal(true);
    setAddRoleName("");
    setAddSelectedPerms([]);
  }
  function handleCloseAddModal() {
    setShowAddModal(false);
  }

  // Toggle permission in Add Role modal
  function handleToggleAddPerm(permObj) {
    // permObj = { name: "Manager Dashboard", permission: "managerDashboard" }
    const exists = addSelectedPerms.find((p) => p.value === permObj.permission);
    if (exists) {
      // remove
      setAddSelectedPerms(
        addSelectedPerms.filter((p) => p.value !== permObj.permission)
      );
    } else {
      // add
      setAddSelectedPerms([
        ...addSelectedPerms,
        { label: permObj.name, value: permObj.permission },
      ]);
    }
  }

  // Submit Add Role
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

  // =========== VIEW/EDIT ROLE PERMISSIONS ===========
  function handleOpenPermissionModal(role, editMode) {
    setIsEditing(editMode);
    setEditRoleId(role._id);
    setEditRoleName(role.role_name);
    // Convert role.permission array to shape: [{ label, value }, ...]
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

  // Toggle permission in the "edit" modal
  function handleToggleEditPerm(permObj) {
    const exists = editPermissions.find((p) => p.value === permObj.permission);
    if (exists) {
      // remove
      setEditPermissions(
        editPermissions.filter((p) => p.value !== permObj.permission)
      );
    } else {
      // add
      setEditPermissions([
        ...editPermissions,
        { label: permObj.name, value: permObj.permission },
      ]);
    }
  }

  // Save changes from the "edit" modal
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

  // =========== DELETE ROLE ===========
  function handleConfirmDelete(role) {
    setDeleteData({
      open: true,
      id: role._id,
      name: role.role_name,
    });
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

  return (
    <div>
      {/* Show FullScreenLoader during user actions */}
      {actionLoading && <FullScreenLoader />}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Roles</h2>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Role Name</th>
              <th className="py-3 px-4">Permissions</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows count={5} columns={4} />
            ) : roles.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role, idx) => {
                // Display first two permissions; if more, show a "See all" button
                const firstTwo = role.permission.slice(0, 2);
                const hasMore = role.permission.length > 2;
                return (
                  <tr
                    key={role._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">{role.role_name}</td>
                    <td className="py-3 px-4">
                      {firstTwo.map((perm) => (
                        <span
                          key={perm.permission}
                          className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 mr-2 mb-1 px-2 py-1 rounded"
                        >
                          {perm.name}
                        </span>
                      ))}
                      {hasMore && (
                        <button
                          onClick={() => handleOpenPermissionModal(role, false)}
                          className="text-blue-500 ml-2 underline"
                        >
                          See all &gt;
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => handleOpenPermissionModal(role, false)}
                        className="text-blue-500 hover:text-blue-600"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleOpenPermissionModal(role, true)}
                        className="text-green-500 hover:text-green-600"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(role)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Separated Add Role Modal */}
      <RoleAddModal
        show={showAddModal}
        onClose={handleCloseAddModal}
        roleName={addRoleName}
        setRoleName={setAddRoleName}
        selectedPerms={addSelectedPerms}
        onTogglePerm={handleToggleAddPerm}
        onSubmit={handleAddRoleSubmit}
      />

      {/* Separated View/Edit Role Modal */}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Role"
        message={`Are you sure you want to delete "${deleteData.name}"?`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

