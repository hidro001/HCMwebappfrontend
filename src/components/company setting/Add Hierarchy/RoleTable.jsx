import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import FullScreenLoader from "../../common/FullScreenLoader";
import ConfirmationDialog from "../../common/ConfirmationDialog";

import { useHierarchyStore } from "../../../store/useHierarchyStore";
import RoleAddModal from "./model/RoleAddModal";
import RolePermissionModal from "./model/RolePermissionModal";

export default function RoleTable({ isLoading }) {
  // ---------- Zustand Store ----------
  const { roles, loading, error, fetchRoles, addRole, updateRole, deleteRole } =
    useHierarchyStore();

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
