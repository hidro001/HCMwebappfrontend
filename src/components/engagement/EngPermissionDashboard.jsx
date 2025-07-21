import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaBan, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import BaseModal from "../common/BaseModal"; 
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getUsers,
  assignRoleToUser,
  banUser,
  unbanUser,
} from "../../service/service";
import useAuthStore from "../../store/store";
import useEngagementStore from "../../store/engagementStore";

import { useSocket } from "../../contexts/SocketContext";

const EngPermissionDashboard = () => {
  const socket = useSocket();

  const [tabIndex, setTabIndex] = useState(0);

  const [permissions, setPermissions] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [newPermissionDescription, setNewPermissionDescription] = useState("");
  const [editPermissionDialogOpen, setEditPermissionDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [editedPermissionDescription, setEditedPermissionDescription] =
    useState("");

  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissionsForRole, setSelectedPermissionsForRole] = useState(
    []
  );
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");
  const [editedRolePermissions, setEditedRolePermissions] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedRoleForUser, setSelectedRoleForUser] = useState("");
  const [editUserRoleDialogOpen, setEditUserRoleDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // --- Common States (from stores) ---
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId;
  const userPermissions = useEngagementStore((state) => state.permissions || []);

  // Fetch initial data
  useEffect(() => {
    fetchPermissions();
    fetchRoles();
    fetchUsers();
  }, []);

  // --- Permission Management Functions ---
  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch permissions."
      );
    }
  };

  const handleCreatePermission = async () => {
    if (!newPermissionName || !newPermissionDescription) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      const permissionData = {
        name: newPermissionName,
        description: newPermissionDescription,
      };
      await createPermission(permissionData);
      toast.success("Permission created successfully.");
      setNewPermissionName("");
      setNewPermissionDescription("");
      fetchPermissions();
    } catch (error) {
      console.error("Error creating permission:", error);
      toast.error(
        error.response?.data?.message || "Failed to create permission."
      );
    }
  };

  const handleDeletePermission = (permissionId, permissionName) => {
    handleOpenConfirmationDialog(
      "Delete Permission",
      `Are you sure you want to delete the permission "${permissionName}"? This action cannot be undone.`,
      async () => {
        try {
          await deletePermission(permissionId);
          toast.success("Permission deleted successfully.");
          fetchPermissions();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error deleting permission:", error);
          toast.error(
            error.response?.data?.message || "Failed to delete permission."
          );
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleEditPermission = (permission) => {
    setCurrentPermission(permission);
    setEditedPermissionDescription(permission.description);
    setEditPermissionDialogOpen(true);
  };

  const handleUpdatePermission = async () => {
    if (!editedPermissionDescription) {
      toast.error("Permission description is required.");
      return;
    }
    try {
      const updatedData = {
        description: editedPermissionDescription,
      };
      await updatePermission(currentPermission._id, updatedData);
      toast.success("Permission updated successfully.");
      setEditPermissionDialogOpen(false);
      setCurrentPermission(null);
      setEditedPermissionDescription("");
      fetchPermissions();
    } catch (error) {
      console.error("Error updating permission:", error);
      toast.error(
        error.response?.data?.message || "Failed to update permission."
      );
    }
  };

  // --- Role Management Functions ---
  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error(error.response?.data?.message || "Failed to fetch roles.");
    }
  };

  const handleCreateRole = async () => {
    if (!newRoleName) {
      toast.error("Role name is required.");
      return;
    }
    try {
      const roleData = {
        name: newRoleName,
        permissions: selectedPermissionsForRole,
      };
      await createRole(roleData);
      toast.success("Role created successfully.");
      setNewRoleName("");
      setSelectedPermissionsForRole([]);
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error(error.response?.data?.message || "Failed to create role.");
    }
  };

  const handleDeleteRole = (roleId, roleName) => {
    handleOpenConfirmationDialog(
      "Delete Role",
      `Are you sure you want to delete the role "${roleName}"? This action cannot be undone.`,
      async () => {
        try {
          await deleteRole(roleId);
          toast.success("Role deleted successfully.");
          fetchRoles();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error deleting role:", error);
          toast.error(
            error.response?.data?.message || "Failed to delete role."
          );
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setEditedRoleName(role.name);
    setEditedRolePermissions(role.permissions);
    setEditRoleDialogOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!editedRoleName) {
      toast.error("Role name is required.");
      return;
    }
    try {
      const updatedData = {
        name: editedRoleName,
        permissions: editedRolePermissions,
      };
      await updateRole(currentRole._id, updatedData);
      toast.success("Role updated successfully.");
      setEditRoleDialogOpen(false);
      setCurrentRole(null);
      setEditedRoleName("");
      setEditedRolePermissions([]);
      fetchRoles();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(error.response?.data?.message || "Failed to update role.");
    }
  };

  const handlePermissionChangeForRole = (permissionName, isChecked) => {
    if (isChecked) {
      setSelectedPermissionsForRole((prev) => [...prev, permissionName]);
    } else {
      setSelectedPermissionsForRole((prev) =>
        prev.filter((perm) => perm !== permissionName)
      );
    }
  };

  const handleEditPermissionChangeForRole = (permissionName, isChecked) => {
    if (isChecked) {
      setEditedRolePermissions((prev) => [...prev, permissionName]);
    } else {
      setEditedRolePermissions((prev) =>
        prev.filter((perm) => perm !== permissionName)
      );
    }
  };

  // --- User Moderation Functions ---
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error(response.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    }
  };

  const handleAssignRole = (assignUserId, roleName, userName) => {
    handleOpenConfirmationDialog(
      "Assign Role",
      `Are you sure you want to assign the role "${roleName}" to "${userName}"?`,
      async () => {
        try {
          await assignRoleToUser(assignUserId, roleName);
          toast.success("Role assigned successfully.");
          fetchUsers();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error assigning role:", error);
          toast.error(error.response?.data?.message || "Failed to assign role.");
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleBanUser = (banUserId, userName) => {
    handleOpenConfirmationDialog(
      "Ban User",
      `Are you sure you want to ban "${userName}" from engagement?`,
      async () => {
        try {
          await banUser(banUserId);
          toast.success("User banned from engagement.");
          fetchUsers();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error banning user:", error);
          toast.error(error.response?.data?.message || "Failed to ban user.");
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleUnbanUser = (unbanUserId, userName) => {
    handleOpenConfirmationDialog(
      "Unban User",
      `Are you sure you want to unban "${userName}" from engagement?`,
      async () => {
        try {
          await unbanUser(unbanUserId);
          toast.success("User unbanned from engagement.");
          fetchUsers();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error unbanning user:", error);
          toast.error(error.response?.data?.message || "Failed to unban user.");
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleOpenEditUserRoleDialog = (userData) => {
    setCurrentUser(userData);
    setSelectedRoleForUser(userData.permission_role || "");
    setEditUserRoleDialogOpen(true);
  };

  const handleCloseEditUserRoleDialog = () => {
    setCurrentUser(null);
    setSelectedRoleForUser("");
    setEditUserRoleDialogOpen(false);
  };

  const handleUpdateUserRole = () => {
    if (!selectedRoleForUser) {
      toast.error("Please select a role.");
      return;
    }
    handleAssignRole(
      currentUser._id,
      selectedRoleForUser,
      `${currentUser.first_Name} ${currentUser.last_Name}`
    );
    handleCloseEditUserRoleDialog();
  };

  // --- Confirmation Dialog Handlers ---
  const handleOpenConfirmationDialog = (title, message, onConfirm) => {
    setConfirmationDialog({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialog({
      open: false,
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  // --- Socket.io Event Listeners ---
  useEffect(() => {
    if (!socket) return;

    // Role Events
    socket.on("newRole", (role) => {
      setRoles((prevRoles) => [...prevRoles, role]);
      toast.info(`New role "${role.name}" has been created.`);
    });

    socket.on("updateRole", (updatedRole) => {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === updatedRole._id ? updatedRole : role
        )
      );
      toast.info(`Role "${updatedRole.name}" has been updated.`);
    });

    socket.on("deleteRole", ({ roleId }) => {
      setRoles((prevRoles) =>
        prevRoles.filter((role) => role._id !== roleId)
      );
      toast.info(`A role has been deleted.`);
    });

    // Permission Events
    socket.on("newPermission", (permission) => {
      setPermissions((prevPermissions) => [...prevPermissions, permission]);
      toast.info(`New permission "${permission.name}" has been created.`);
    });

    socket.on("updatePermission", (updatedPermission) => {
      setPermissions((prevPermissions) =>
        prevPermissions.map((perm) =>
          perm._id === updatedPermission._id ? updatedPermission : perm
        )
      );
      toast.info(`Permission "${updatedPermission.name}" has been updated.`);
    });

    socket.on("deletePermission", ({ permissionId }) => {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((perm) => perm._id !== permissionId)
      );
      toast.info(`A permission has been deleted.`);
    });

    // Cleanup on unmount
    return () => {
      socket.off("newRole");
      socket.off("updateRole");
      socket.off("deleteRole");
      socket.off("newPermission");
      socket.off("updatePermission");
      socket.off("deletePermission");
    };
  }, [socket]);

  // --- Filtered users based on search term ---
  const filteredUsers = users.filter((userItem) => {
    const fullName = `${userItem.first_Name} ${userItem.last_Name}`;
    const role = userItem.permission_role || "";
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Top Bar / Nav */}
      <div className="bg-blue-600 text-white rounded-md mb-4 p-4 shadow-sm">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-around bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-200 rounded-md shadow-sm">
        <button
          className={`w-full py-2 ${
            tabIndex === 0 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
          }`}
          onClick={() => setTabIndex(0)}
        >
          Permissions
        </button>
        <button
          className={`w-full py-2 ${
            tabIndex === 1 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
          }`}
          onClick={() => setTabIndex(1)}
        >
          Roles
        </button>
        <button
          className={`w-full py-2 ${
            tabIndex === 2 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
          }`}
          onClick={() => setTabIndex(2)}
        >
          User Moderation
        </button>
      </div>

      {/* Tab Panels */}
      <TabPanel value={tabIndex} index={0}>
        {/* Permission Management */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
            Permission Management
          </h2>
          <hr className="mb-4 border-gray-300 dark:border-gray-700" />

      

          {/* Existing Permissions */}
          <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Existing Permissions
            </h3>
            <ul>
              {permissions.map((perm) => (
                <li
                  key={perm._id}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
                >
                  <div>
                    <p className="font-medium dark:text-gray-100">{perm.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {perm.description}
                    </p>
                  </div>
                  {/* <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditPermission(perm)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeletePermission(perm._id, perm.name)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {/* Role Management */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
            Role Management
          </h2>
          <hr className="mb-4 border-gray-300 dark:border-gray-700" />

          {/* Create Role */}
          <div className="shadow-md p-4 mb-6 bg-white dark:bg-gray-800 rounded-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
              Create New Role
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 dark:text-gray-300">Role Name</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 dark:text-gray-300">
                  Select Permissions
                </label>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((perm) => (
                    <label
                      key={perm._id}
                      className="flex items-center space-x-1 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissionsForRole.includes(perm.name)}
                        onChange={(e) =>
                          handlePermissionChangeForRole(
                            perm.name,
                            e.target.checked
                          )
                        }
                        className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span>{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleCreateRole}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Create Role
            </button>
          </div>

          {/* Existing Roles */}
          <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Existing Roles
            </h3>
            <ul>
              {roles.map((role) => (
                <li
                  key={role._id}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
                >
                  <div>
                    <p className="font-medium dark:text-gray-100">{role.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Permissions: {role.permissions.join(", ")}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditRole(role)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role._id, role.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        {/* User Moderation */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
            User Moderation
          </h2>
          <hr className="mb-4 border-gray-300 dark:border-gray-700" />

          {/* Search */}
          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-300">
              Search Users by Name or Role
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Users List */}
          <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
              Users
            </h3>
            {filteredUsers.length === 0 ? (
              <p className="dark:text-gray-300">No users found.</p>
            ) : (
              <ul>
                {filteredUsers.map((userItem) => (
                  <li
                    key={userItem._id}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          userItem.user_Avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            userItem.first_Name + " " + userItem.last_Name
                          )}`
                        }
                        alt={`${userItem.first_Name} ${userItem.last_Name}`}
                      />
                      <div>
                        <p className="font-medium dark:text-gray-100">
                          {userItem.first_Name} {userItem.last_Name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Synergy Role: {userItem.roleId?.name || "N/A"} | Active:{" "}
                          {userItem.isActive ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleOpenEditUserRoleDialog(userItem)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      {userItem.isActive ? (
                        <button
                          onClick={() =>
                            handleBanUser(
                              userItem._id,
                              `${userItem.first_Name} ${userItem.last_Name}`
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaBan />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUnbanUser(
                              userItem._id,
                              `${userItem.first_Name} ${userItem.last_Name}`
                            )
                          }
                          className="text-green-500 hover:text-green-700"
                        >
                          <FaCheck />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </TabPanel>

      {/* --- Edit Permission Modal --- */}
      <BaseModal
        isOpen={editPermissionDialogOpen}
        onClose={() => setEditPermissionDialogOpen(false)}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Edit Permission
          </h2>
          {currentPermission && (
            <>
              <p className="dark:text-gray-300 mb-2">
                Permission Name:{" "}
                <span className="font-semibold">{currentPermission.name}</span>
              </p>
              <label className="block mb-1 dark:text-gray-300">Description</label>
              <input
                type="text"
                value={editedPermissionDescription}
                onChange={(e) => setEditedPermissionDescription(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setEditPermissionDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePermission}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Update Permission
            </button>
          </div>
        </div>
      </BaseModal>

      {/* --- Edit Role Modal --- */}
      <BaseModal
        isOpen={editRoleDialogOpen}
        onClose={() => setEditRoleDialogOpen(false)}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Edit Role
          </h2>
          <label className="block mb-1 dark:text-gray-300">Role Name</label>
          <input
            type="text"
            value={editedRoleName}
            onChange={(e) => setEditedRoleName(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <p className="dark:text-gray-300 font-semibold mb-2">
            Select Permissions:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {permissions.map((perm) => (
              <label
                key={perm._id}
                className="flex items-center space-x-1 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={editedRolePermissions.includes(perm.name)}
                  onChange={(e) =>
                    handleEditPermissionChangeForRole(
                      perm.name,
                      e.target.checked
                    )
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{perm.name}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setEditRoleDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateRole}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Update Role
            </button>
          </div>
        </div>
      </BaseModal>

      {/* --- Edit User Role Modal --- */}
      <BaseModal
        isOpen={editUserRoleDialogOpen}
        onClose={() => setEditUserRoleDialogOpen(false)}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Assign Role to User
          </h2>
          {currentUser && (
            <>
              <label className="block mb-1 dark:text-gray-300">Role</label>
              <select
                value={selectedRoleForUser}
                onChange={(e) => setSelectedRoleForUser(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setEditUserRoleDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateUserRole}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Assign Role
            </button>
          </div>
        </div>
      </BaseModal>

      {/* --- Confirmation Dialog (using BaseModal) --- */}
      <BaseModal
        isOpen={confirmationDialog.open}
        onClose={handleCloseConfirmationDialog}
      >
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          className="relative bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            {confirmationDialog.title}
          </h2>
          <p className="mb-6 dark:text-gray-300">{confirmationDialog.message}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCloseConfirmationDialog}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={confirmationDialog.onConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </BaseModal>
    </div>
  );
};

// Simple TabPanel component
const TabPanel = ({ children, value, index }) => {
  if (value !== index) return null;
  return <div className="py-4">{children}</div>;
};

export default EngPermissionDashboard;
