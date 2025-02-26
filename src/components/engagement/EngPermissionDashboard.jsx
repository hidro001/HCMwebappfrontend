import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Divider,
  Grid,
  Paper,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import { Delete, Edit, Block, Check } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

// Import services
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
import axiosInstance from "../../service/axiosInstance";

// Import stores
import useAuthStore from "../../store/store";
import useEngagementStore from "../../store/engagementStore";

// Import ConfirmationDialog
import ConfirmationDialog from "../common/ConfirmationDialog"; // Adjust the path as necessary

// Import Socket Context
import { useSocket } from "../../contexts/SocketContext"; // Adjust the path

const EngPermissionDashboard = () => {
  const theme = useTheme();
  const socket = useSocket();

  // Tabs state
  const [tabIndex, setTabIndex] = useState(0);

  // --- Permission Management States ---
  const [permissions, setPermissions] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [newPermissionDescription, setNewPermissionDescription] = useState("");
  const [editPermissionDialogOpen, setEditPermissionDialogOpen] =
    useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [editedPermissionDescription, setEditedPermissionDescription] =
    useState("");

  // --- Role Management States ---
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissionsForRole, setSelectedPermissionsForRole] = useState(
    []
  );
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");
  const [editedRolePermissions, setEditedRolePermissions] = useState([]);

  // --- User Moderation States ---
  const [users, setUsers] = useState([]);
  const [selectedRoleForUser, setSelectedRoleForUser] = useState("");
  const [editUserRoleDialogOpen, setEditUserRoleDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- Search State for Users ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- Confirmation Dialog States ---
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // --- Common States ---
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId;
  const userPermissions = useEngagementStore(
    (state) => state.permissions || []
  );

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
      const response = await getUsers(); // response = { success: true, message: "...", data: [...] }
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

  const handleAssignRole = (userId, roleName, userName) => {
    handleOpenConfirmationDialog(
      "Assign Role",
      `Are you sure you want to assign the role "${roleName}" to "${userName}"?`,
      async () => {
        try {
          await assignRoleToUser(userId, roleName);
          toast.success("Role assigned successfully.");
          fetchUsers();
          handleCloseConfirmationDialog();
        } catch (error) {
          console.error("Error assigning role:", error);
          toast.error(
            error.response?.data?.message || "Failed to assign role."
          );
          handleCloseConfirmationDialog();
        }
      }
    );
  };

  const handleBanUser = (userId, userName) => {
    handleOpenConfirmationDialog(
      "Ban User",
      `Are you sure you want to ban "${userName}" from engagement?`,
      async () => {
        try {
          await banUser(userId);
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

  const handleUnbanUser = (userId, userName) => {
    handleOpenConfirmationDialog(
      "Unban User",
      `Are you sure you want to unban "${userName}" from engagement?`,
      async () => {
        try {
          await unbanUser(userId);
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

  const handleOpenEditUserRoleDialog = (user) => {
    setCurrentUser(user);
    setSelectedRoleForUser(user.permission_role || "");
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
    // Pass userName for confirmation message
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

  // --- Tabs Handling ---
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));
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
    <Box p={4}>
      {/* AppBar for Navigation */}
      <AppBar position="static" color="primary" sx={{ borderRadius: 2, mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          {/* Theme Toggle Button can be added here if needed */}
        </Toolbar>
      </AppBar>

      {/* Tabs for Different Management Sections */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        sx={{ borderRadius: 2 }}
      >
        <Tab label="Permissions" {...a11yProps(0)} />
        <Tab label="Roles" {...a11yProps(1)} />
        <Tab label="User Moderation" {...a11yProps(2)} />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={tabIndex} index={0}>
        {/* Permission Management Section */}
        <Box mt={2}>
          <Typography variant="h5" gutterBottom color="text.primary">
            Permission Management
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Permissions List */}
          <Paper
            elevation={3}
            sx={{ p: 3, backgroundColor: "background.paper" }}
          >
            <Typography variant="h6" color="text.primary">
              Existing Permissions
            </Typography>
            <List>
              {permissions.map((perm) => (
                <ListItem
                  key={perm._id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditPermission(perm)}
                        sx={{ color: "primary.main" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          handleDeletePermission(perm._id, perm.name)
                        }
                        sx={{ color: "error.main" }}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={perm.name}
                    secondary={perm.description}
                    primaryTypographyProps={{ color: "text.primary" }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {/* Role Management Section */}
        <Box mt={2}>
          <Typography variant="h5" gutterBottom color="text.primary">
            Role Management
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Create Role */}
          <Paper
            elevation={3}
            sx={{ p: 3, mb: 4, backgroundColor: "background.paper" }}
          >
            <Typography variant="h6" color="text.primary">
              Create New Role
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role Name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  variant="outlined"
                  fullWidth
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="text.primary"
                >
                  Select Permissions:
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {permissions.map((perm) => (
                    <FormControlLabel
                      key={perm._id}
                      control={
                        <Checkbox
                          checked={selectedPermissionsForRole.includes(
                            perm.name
                          )}
                          onChange={(e) =>
                            handlePermissionChangeForRole(
                              perm.name,
                              e.target.checked
                            )
                          }
                          name={perm.name}
                          color="primary"
                        />
                      }
                      label={perm.name}
                      sx={{ mr: 2 }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateRole}
                >
                  Create Role
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Roles List */}
          <Paper
            elevation={3}
            sx={{ p: 3, backgroundColor: "background.paper" }}
          >
            <Typography variant="h6" color="text.primary">
              Existing Roles
            </Typography>
            <List>
              {roles.map((role) => (
                <ListItem
                  key={role._id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditRole(role)}
                        sx={{ color: "primary.main" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteRole(role._id, role.name)}
                        sx={{ color: "error.main" }}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={role.name}
                    secondary={`Permissions: ${role.permissions.join(", ")}`}
                    primaryTypographyProps={{ color: "text.primary" }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        {/* User Moderation Section */}
        <Box mt={2}>
          <Typography variant="h5" gutterBottom color="text.primary">
            User Moderation
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Search Field */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Search Users by Name or Role"
              variant="outlined"
              fullWidth
              color="primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {/* Users List */}
          <Paper
            elevation={3}
            sx={{ p: 3, backgroundColor: "background.paper" }}
          >
            <Typography variant="h6" color="text.primary">
              Users
            </Typography>
            <List>
              {filteredUsers.length === 0 ? (
                <Typography>No users found.</Typography>
              ) : (
                filteredUsers.map((userItem) => (
                  <ListItem
                    key={userItem._id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleOpenEditUserRoleDialog(userItem)}
                          sx={{ color: "primary.main" }}
                        >
                          <Edit />
                        </IconButton>
                        {userItem.isActive ? (
                          <IconButton
                            edge="end"
                            aria-label="ban"
                            onClick={() =>
                              handleBanUser(
                                userItem._id,
                                `${userItem.first_Name} ${userItem.last_Name}`
                              )
                            }
                            sx={{ color: "error.main" }}
                          >
                            <Block />
                          </IconButton>
                        ) : (
                          <IconButton
                            edge="end"
                            aria-label="unban"
                            onClick={() =>
                              handleUnbanUser(
                                userItem._id,
                                `${userItem.first_Name} ${userItem.last_Name}`
                              )
                            }
                            sx={{ color: "success.main" }}
                          >
                            <Check />
                          </IconButton>
                        )}
                      </>
                    }
                  >
                    <ListItemIcon>
                      <Avatar
                        src={
                          userItem.user_Avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            userItem.first_Name + " " + userItem.last_Name
                          )}`
                        }
                        alt={`${userItem.first_Name} ${userItem.last_Name}`}
                      />
                    </ListItemIcon>
                    <ListItemText
                       primary={`${userItem.first_Name} ${userItem.last_Name}`}
                       secondary={`Synergy Role: ${userItem.roleId?.name || "N/A"} | Active: ${
                         userItem.isActive ? "Yes" : "No"
                       }`}
                       primaryTypographyProps={{ color: "text.primary" }}
                       secondaryTypographyProps={{ color: "text.secondary" }}
                     />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Box>
      </TabPanel>

      {/* --- Edit Permission Dialog --- */}
      <Dialog
        open={editPermissionDialogOpen}
        onClose={() => setEditPermissionDialogOpen(false)}
      >
        <DialogTitle color="text.primary">Edit Permission</DialogTitle>
        <DialogContent>
          {currentPermission && (
            <>
              <Typography variant="subtitle1" color="text.primary">
                Permission Name: {currentPermission.name}
              </Typography>
              <TextField
                label="Description"
                value={editedPermissionDescription}
                onChange={(e) => setEditedPermissionDescription(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditPermissionDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdatePermission} color="primary">
            Update Permission
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Edit Role Dialog --- */}
      <Dialog
        open={editRoleDialogOpen}
        onClose={() => setEditRoleDialogOpen(false)}
      >
        <DialogTitle color="text.primary">Edit Role</DialogTitle>
        <DialogContent>
          {currentRole && (
            <>
              <TextField
                label="Role Name"
                value={editedRoleName}
                onChange={(e) => setEditedRoleName(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
              />
              <Typography variant="subtitle1" gutterBottom color="text.primary">
                Select Permissions:
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {permissions.map((perm) => (
                  <FormControlLabel
                    key={perm._id}
                    control={
                      <Checkbox
                        checked={editedRolePermissions.includes(perm.name)}
                        onChange={(e) =>
                          handleEditPermissionChangeForRole(
                            perm.name,
                            e.target.checked
                          )
                        }
                        name={perm.name}
                        color="primary"
                      />
                    }
                    label={perm.name}
                    sx={{ mr: 2 }}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditRoleDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Edit User Role Dialog --- */}
      <Dialog
        open={editUserRoleDialogOpen}
        onClose={() => setEditUserRoleDialogOpen(false)}
      >
        <DialogTitle color="text.primary">Assign Role to User</DialogTitle>
        <DialogContent>
          {currentUser && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label" color="primary">
                Role
              </InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRoleForUser}
                label="Role"
                onChange={(e) => setSelectedRoleForUser(e.target.value)}
                color="primary"
              >
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditUserRoleDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateUserRole} color="primary">
            Assign Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Confirmation Dialog --- */}
      <ConfirmationDialog
        open={confirmationDialog.open}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        onConfirm={confirmationDialog.onConfirm}
        onCancel={handleCloseConfirmationDialog}
      />
    </Box>
  );
};

// --- TabPanel Component ---
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-dashboard-tabpanel-${index}`}
      aria-labelledby={`admin-dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// --- Accessibility Props for Tabs ---
const a11yProps = (index) => {
  return {
    id: `admin-dashboard-tab-${index}`,
    "aria-controls": `admin-dashboard-tabpanel-${index}`,
  };
};

export default EngPermissionDashboard;
