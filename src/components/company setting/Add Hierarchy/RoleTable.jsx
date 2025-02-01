


import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import SkeletonRows from "./SkeletonRows";
import { availablePermission } from "../../../service/availablePermissions";

// Example existing roles data
const roleData = [
  {
    id: 1,
    name: "Saket",
    permissions: [
      "Super Admin Dashboard",
      "Employee Management",
      "Manager Dashboard",
      "Delete Employee",
      "View Policies",
    ],
  },
  {
    id: 2,
    name: "Noida",
    permissions: ["Super Admin Dashboard", "Employee Management"],
  },
  {
    id: 3,
    name: "Noida",
    permissions: [
      "Super Admin Dashboard",
      "Employee Management",
      "Organization Chart",
    ],
  },
  // ...other rows
];

export default function RoleTable({ isLoading }) {
  // ----------- STATE: Add Role Modal -----------
  const [showAddModal, setShowAddModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // ----------- STATE: View/Edit All Permissions Modal -----------
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // false ⇒ view only, true ⇒ can edit
  const [viewRoleName, setViewRoleName] = useState("");
  const [viewRolePermissions, setViewRolePermissions] = useState([]); // store that role's permissions

  // ---------- OPEN/CLOSE "ADD ROLE" MODAL ----------
  function handleOpenAddModal() {
    setShowAddModal(true);
  }
  function handleCloseAddModal() {
    setShowAddModal(false);
    // Reset fields
    setRoleName("");
    setSelectedPermissions([]);
  }

  // ---------- OPEN PERMISSIONS MODAL ----------
  // role: {id, name, permissions[]}, isEdit: bool
  function handleOpenPermissionModal(role, isEdit) {
    setViewRoleName(role.name);
    setViewRolePermissions(role.permissions);
    setIsEditing(isEdit);
    setShowPermissionModal(true);
  }
  function handleClosePermissionModal() {
    setShowPermissionModal(false);
    setIsEditing(false);
    setViewRoleName("");
    setViewRolePermissions([]);
  }

  // ---------- ADD ROLE ACTION ----------
  function handleAddRole() {
    console.log("New Role Name:", roleName);
    console.log("Permissions:", selectedPermissions);
    // TODO: call your backend to create
    handleCloseAddModal();
  }

  // ---------- TOGGLE PERMISSION (ADD ROLE) ----------
  function handleTogglePermission(permissionKey) {
    setSelectedPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((p) => p !== permissionKey)
        : [...prev, permissionKey]
    );
  }

  // ---------- TOGGLE PERMISSION (VIEW/EDIT MODAL) ----------
  function handleToggleViewPermission(permName) {
    setViewRolePermissions((prev) =>
      prev.includes(permName)
        ? prev.filter((p) => p !== permName)
        : [...prev, permName]
    );
  }

  // ---------- SAVE CHANGES from PERMISSIONS MODAL ----------
  function handleSavePermissions() {
    console.log("Editing role:", viewRoleName);
    console.log("New permission list:", viewRolePermissions);
    // TODO: call your backend to update
    handleClosePermissionModal();
  }

  return (
    <div>
      {/* ------------- Title + Add Role Button ------------- */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Roles</h2>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Role
        </button>
      </div>

      {/* ------------- ROLES TABLE ------------- */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Roles</th>
              <th className="py-3 px-4">Permissions</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows count={5} columns={4} />
            ) : (
              roleData.map((role, idx) => {
                // only show first 2 permissions in the table
                const firstTwo = role.permissions.slice(0, 2);
                const hasMore = role.permissions.length > 2;

                return (
                  <tr
                    key={role.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">{role.name}</td>
                    <td className="py-3 px-4">
                      {firstTwo.map((p) => (
                        <span
                          key={p}
                          className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 mr-2 mb-1 px-2 py-1 rounded"
                        >
                          {p}
                        </span>
                      ))}
                      {/* If there's more than 2, show "See all >" link */}
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
                      {/* EYE => open modal in read-only mode */}
                      <button
                        onClick={() => handleOpenPermissionModal(role, false)}
                        className="text-blue-500 hover:text-blue-600"
                        title="View"
                      >
                        <FaEye />
                      </button>

                      {/* EDIT => open same modal in editing mode */}
                      <button
                        onClick={() => handleOpenPermissionModal(role, true)}
                        className="text-green-500 hover:text-green-600"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE => your logic */}
                      <button
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

      {/* ========== ADD ROLE MODAL ========== */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center 
                     bg-black/40 backdrop-blur-sm"
        >
          <div className="relative w-96 max-h-[80vh] overflow-y-auto 
                          bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            {/* Close (X) button */}
            <button
              onClick={handleCloseAddModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700
                         dark:text-gray-300 dark:hover:text-gray-100"
            >
              <FaTimes />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Add New Role</h2>

            {/* Role Name Field */}
            <label className="block mb-2 font-medium" htmlFor="roleName">
              Role Name
            </label>
            <input
              id="roleName"
              type="text"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />

            {/* Permission Checkboxes */}
            <p className="font-medium mb-2">Select Permissions</p>
            <div className="space-y-2 mb-4">
              {availablePermission.map((item) => (
                <label
                  key={item.permission}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    checked={selectedPermissions.includes(item.permission)}
                    onChange={() =>
                      handleTogglePermission(item.permission)
                    }
                  />
                  <span className="dark:text-gray-100 text-gray-800">
                    {item.name}
                  </span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseAddModal}
                className="border border-orange-500 text-orange-500 
                           px-4 py-2 rounded hover:bg-orange-50 
                           dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="bg-blue-500 hover:bg-blue-600 
                           text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== VIEW/EDIT ALL PERMISSIONS MODAL ========== */}
      {showPermissionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center 
                     bg-black/40 backdrop-blur-sm"
        >
          <div className="relative w-96 max-h-[80vh] overflow-y-auto
                          bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            {/* Close (X) button */}
            <button
              onClick={handleClosePermissionModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700
                         dark:text-gray-300 dark:hover:text-gray-100"
            >
              <FaTimes />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">
              Permission List Of ROLE ({viewRoleName})
            </h2>

            {/* Permission List (Checkboxes). If not editing => read-only. */}
            <div className="space-y-2 mb-4">
              {availablePermission.map((item) => {
                const checked = viewRolePermissions.includes(item.name)
                  || viewRolePermissions.includes(item.permission);

                return (
                  <label
                    key={item.permission}
                    className="flex items-center space-x-2"
                  >
                    {isEditing ? (
                      // Edit mode: enable toggles
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={checked}
                        onChange={() => handleToggleViewPermission(item.name)}
                      />
                    ) : (
                      // View mode: display as "checked" or not, but disabled
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={checked}
                        disabled
                      />
                    )}
                    <span className="dark:text-gray-100 text-gray-800">
                      {item.name}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePermissionModal}
                className="border border-orange-500 text-orange-500 
                           px-4 py-2 rounded hover:bg-orange-50
                           dark:hover:bg-gray-700"
              >
                {isEditing ? "Cancel" : "Close"}
              </button>

              {/* If editing, show an edit/save button; otherwise hide */}
              {isEditing && (
                <button
                  onClick={handleSavePermissions}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
