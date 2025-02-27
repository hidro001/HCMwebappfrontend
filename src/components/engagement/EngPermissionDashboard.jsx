// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   Divider,
//   Grid,
//   Paper,
//   Avatar,
//   ListItemIcon,
// } from "@mui/material";
// import { Delete, Edit, Block, Check } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { useTheme } from "@mui/material/styles";

// // Import services
// import {
//   getPermissions,
//   createPermission,
//   updatePermission,
//   deletePermission,
//   getRoles,
//   createRole,
//   updateRole,
//   deleteRole,
//   getUsers,
//   assignRoleToUser,
//   banUser,
//   unbanUser,
// } from "../../service/service";
// import axiosInstance from "../../service/axiosInstance";

// // Import stores
// import useAuthStore from "../../store/store";
// import useEngagementStore from "../../store/engagementStore";

// // Import ConfirmationDialog
// import ConfirmationDialog from "../common/ConfirmationDialog"; // Adjust the path as necessary

// // Import Socket Context
// import { useSocket } from "../../contexts/SocketContext"; // Adjust the path

// const EngPermissionDashboard = () => {
//   const theme = useTheme();
//   const socket = useSocket();

//   // Tabs state
//   const [tabIndex, setTabIndex] = useState(0);

//   // --- Permission Management States ---
//   const [permissions, setPermissions] = useState([]);
//   const [newPermissionName, setNewPermissionName] = useState("");
//   const [newPermissionDescription, setNewPermissionDescription] = useState("");
//   const [editPermissionDialogOpen, setEditPermissionDialogOpen] =
//     useState(false);
//   const [currentPermission, setCurrentPermission] = useState(null);
//   const [editedPermissionDescription, setEditedPermissionDescription] =
//     useState("");

//   // --- Role Management States ---
//   const [roles, setRoles] = useState([]);
//   const [newRoleName, setNewRoleName] = useState("");
//   const [selectedPermissionsForRole, setSelectedPermissionsForRole] = useState(
//     []
//   );
//   const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);
//   const [editedRoleName, setEditedRoleName] = useState("");
//   const [editedRolePermissions, setEditedRolePermissions] = useState([]);

//   // --- User Moderation States ---
//   const [users, setUsers] = useState([]);
//   const [selectedRoleForUser, setSelectedRoleForUser] = useState("");
//   const [editUserRoleDialogOpen, setEditUserRoleDialogOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   // --- Search State for Users ---
//   const [searchTerm, setSearchTerm] = useState("");

//   // --- Confirmation Dialog States ---
//   const [confirmationDialog, setConfirmationDialog] = useState({
//     open: false,
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   // --- Common States ---
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId;
//   const userPermissions = useEngagementStore(
//     (state) => state.permissions || []
//   );

//   // Fetch initial data
//   useEffect(() => {
//     fetchPermissions();
//     fetchRoles();
//     fetchUsers();
//   }, []);

//   // --- Permission Management Functions ---
//   const fetchPermissions = async () => {
//     try {
//       const data = await getPermissions();
//       setPermissions(data);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch permissions."
//       );
//     }
//   };

//   const handleCreatePermission = async () => {
//     if (!newPermissionName || !newPermissionDescription) {
//       toast.error("Please fill all fields.");
//       return;
//     }
//     try {
//       const permissionData = {
//         name: newPermissionName,
//         description: newPermissionDescription,
//       };
//       await createPermission(permissionData);
//       toast.success("Permission created successfully.");
//       setNewPermissionName("");
//       setNewPermissionDescription("");
//       fetchPermissions();
//     } catch (error) {
//       console.error("Error creating permission:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create permission."
//       );
//     }
//   };

//   const handleDeletePermission = (permissionId, permissionName) => {
//     handleOpenConfirmationDialog(
//       "Delete Permission",
//       `Are you sure you want to delete the permission "${permissionName}"? This action cannot be undone.`,
//       async () => {
//         try {
//           await deletePermission(permissionId);
//           toast.success("Permission deleted successfully.");
//           fetchPermissions();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error deleting permission:", error);
//           toast.error(
//             error.response?.data?.message || "Failed to delete permission."
//           );
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleEditPermission = (permission) => {
//     setCurrentPermission(permission);
//     setEditedPermissionDescription(permission.description);
//     setEditPermissionDialogOpen(true);
//   };

//   const handleUpdatePermission = async () => {
//     if (!editedPermissionDescription) {
//       toast.error("Permission description is required.");
//       return;
//     }
//     try {
//       const updatedData = {
//         description: editedPermissionDescription,
//       };
//       await updatePermission(currentPermission._id, updatedData);
//       toast.success("Permission updated successfully.");
//       setEditPermissionDialogOpen(false);
//       setCurrentPermission(null);
//       setEditedPermissionDescription("");
//       fetchPermissions();
//     } catch (error) {
//       console.error("Error updating permission:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update permission."
//       );
//     }
//   };

//   // --- Role Management Functions ---
//   const fetchRoles = async () => {
//     try {
//       const data = await getRoles();
//       setRoles(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch roles.");
//     }
//   };

//   const handleCreateRole = async () => {
//     if (!newRoleName) {
//       toast.error("Role name is required.");
//       return;
//     }
//     try {
//       const roleData = {
//         name: newRoleName,
//         permissions: selectedPermissionsForRole,
//       };
//       await createRole(roleData);
//       toast.success("Role created successfully.");
//       setNewRoleName("");
//       setSelectedPermissionsForRole([]);
//       fetchRoles();
//     } catch (error) {
//       console.error("Error creating role:", error);
//       toast.error(error.response?.data?.message || "Failed to create role.");
//     }
//   };

//   const handleDeleteRole = (roleId, roleName) => {
//     handleOpenConfirmationDialog(
//       "Delete Role",
//       `Are you sure you want to delete the role "${roleName}"? This action cannot be undone.`,
//       async () => {
//         try {
//           await deleteRole(roleId);
//           toast.success("Role deleted successfully.");
//           fetchRoles();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error deleting role:", error);
//           toast.error(
//             error.response?.data?.message || "Failed to delete role."
//           );
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleEditRole = (role) => {
//     setCurrentRole(role);
//     setEditedRoleName(role.name);
//     setEditedRolePermissions(role.permissions);
//     setEditRoleDialogOpen(true);
//   };

//   const handleUpdateRole = async () => {
//     if (!editedRoleName) {
//       toast.error("Role name is required.");
//       return;
//     }
//     try {
//       const updatedData = {
//         name: editedRoleName,
//         permissions: editedRolePermissions,
//       };
//       await updateRole(currentRole._id, updatedData);
//       toast.success("Role updated successfully.");
//       setEditRoleDialogOpen(false);
//       setCurrentRole(null);
//       setEditedRoleName("");
//       setEditedRolePermissions([]);
//       fetchRoles();
//     } catch (error) {
//       console.error("Error updating role:", error);
//       toast.error(error.response?.data?.message || "Failed to update role.");
//     }
//   };

//   const handlePermissionChangeForRole = (permissionName, isChecked) => {
//     if (isChecked) {
//       setSelectedPermissionsForRole((prev) => [...prev, permissionName]);
//     } else {
//       setSelectedPermissionsForRole((prev) =>
//         prev.filter((perm) => perm !== permissionName)
//       );
//     }
//   };

//   const handleEditPermissionChangeForRole = (permissionName, isChecked) => {
//     if (isChecked) {
//       setEditedRolePermissions((prev) => [...prev, permissionName]);
//     } else {
//       setEditedRolePermissions((prev) =>
//         prev.filter((perm) => perm !== permissionName)
//       );
//     }
//   };

//   // --- User Moderation Functions ---
//   const fetchUsers = async () => {
//     try {
//       const response = await getUsers(); // response = { success: true, message: "...", data: [...] }
//       if (response.success) {
//         setUsers(response.data);
//       } else {
//         toast.error(response.message || "Failed to fetch users.");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch users.");
//     }
//   };

//   const handleAssignRole = (userId, roleName, userName) => {
//     handleOpenConfirmationDialog(
//       "Assign Role",
//       `Are you sure you want to assign the role "${roleName}" to "${userName}"?`,
//       async () => {
//         try {
//           await assignRoleToUser(userId, roleName);
//           toast.success("Role assigned successfully.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error assigning role:", error);
//           toast.error(
//             error.response?.data?.message || "Failed to assign role."
//           );
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleBanUser = (userId, userName) => {
//     handleOpenConfirmationDialog(
//       "Ban User",
//       `Are you sure you want to ban "${userName}" from engagement?`,
//       async () => {
//         try {
//           await banUser(userId);
//           toast.success("User banned from engagement.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error banning user:", error);
//           toast.error(error.response?.data?.message || "Failed to ban user.");
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleUnbanUser = (userId, userName) => {
//     handleOpenConfirmationDialog(
//       "Unban User",
//       `Are you sure you want to unban "${userName}" from engagement?`,
//       async () => {
//         try {
//           await unbanUser(userId);
//           toast.success("User unbanned from engagement.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error unbanning user:", error);
//           toast.error(error.response?.data?.message || "Failed to unban user.");
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleOpenEditUserRoleDialog = (user) => {
//     setCurrentUser(user);
//     setSelectedRoleForUser(user.permission_role || "");
//     setEditUserRoleDialogOpen(true);
//   };

//   const handleCloseEditUserRoleDialog = () => {
//     setCurrentUser(null);
//     setSelectedRoleForUser("");
//     setEditUserRoleDialogOpen(false);
//   };

//   const handleUpdateUserRole = () => {
//     if (!selectedRoleForUser) {
//       toast.error("Please select a role.");
//       return;
//     }
//     // Pass userName for confirmation message
//     handleAssignRole(
//       currentUser._id,
//       selectedRoleForUser,
//       `${currentUser.first_Name} ${currentUser.last_Name}`
//     );
//     handleCloseEditUserRoleDialog();
//   };

//   // --- Confirmation Dialog Handlers ---
//   const handleOpenConfirmationDialog = (title, message, onConfirm) => {
//     setConfirmationDialog({
//       open: true,
//       title,
//       message,
//       onConfirm,
//     });
//   };

//   const handleCloseConfirmationDialog = () => {
//     setConfirmationDialog({
//       open: false,
//       title: "",
//       message: "",
//       onConfirm: null,
//     });
//   };

//   // --- Tabs Handling ---
//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   // --- Socket.io Event Listeners ---
//   useEffect(() => {
//     if (!socket) return;

//     // Role Events
//     socket.on("newRole", (role) => {
//       setRoles((prevRoles) => [...prevRoles, role]);
//       toast.info(`New role "${role.name}" has been created.`);
//     });

//     socket.on("updateRole", (updatedRole) => {
//       setRoles((prevRoles) =>
//         prevRoles.map((role) =>
//           role._id === updatedRole._id ? updatedRole : role
//         )
//       );
//       toast.info(`Role "${updatedRole.name}" has been updated.`);
//     });

//     socket.on("deleteRole", ({ roleId }) => {
//       setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));
//       toast.info(`A role has been deleted.`);
//     });

//     // Permission Events
//     socket.on("newPermission", (permission) => {
//       setPermissions((prevPermissions) => [...prevPermissions, permission]);
//       toast.info(`New permission "${permission.name}" has been created.`);
//     });

//     socket.on("updatePermission", (updatedPermission) => {
//       setPermissions((prevPermissions) =>
//         prevPermissions.map((perm) =>
//           perm._id === updatedPermission._id ? updatedPermission : perm
//         )
//       );
//       toast.info(`Permission "${updatedPermission.name}" has been updated.`);
//     });

//     socket.on("deletePermission", ({ permissionId }) => {
//       setPermissions((prevPermissions) =>
//         prevPermissions.filter((perm) => perm._id !== permissionId)
//       );
//       toast.info(`A permission has been deleted.`);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("newRole");
//       socket.off("updateRole");
//       socket.off("deleteRole");
//       socket.off("newPermission");
//       socket.off("updatePermission");
//       socket.off("deletePermission");
//     };
//   }, [socket]);

//   // --- Filtered users based on search term ---
//   const filteredUsers = users.filter((userItem) => {
//     const fullName = `${userItem.first_Name} ${userItem.last_Name}`;
//     const role = userItem.permission_role || "";
//     return (
//       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       role.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   return (
//     <Box p={4}>
//       {/* AppBar for Navigation */}
//       <AppBar position="static" color="primary" sx={{ borderRadius: 2, mb: 2 }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Admin Dashboard
//           </Typography>
//           {/* Theme Toggle Button can be added here if needed */}
//         </Toolbar>
//       </AppBar>

//       {/* Tabs for Different Management Sections */}
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         indicatorColor="secondary"
//         textColor="inherit"
//         variant="fullWidth"
//         sx={{ borderRadius: 2 }}
//       >
//         <Tab label="Permissions" {...a11yProps(0)} />
//         <Tab label="Roles" {...a11yProps(1)} />
//         <Tab label="User Moderation" {...a11yProps(2)} />
//       </Tabs>

//       {/* Tab Panels */}
//       <TabPanel value={tabIndex} index={0}>
//         {/* Permission Management Section */}
//         <Box mt={2}>
//           <Typography variant="h5" gutterBottom color="text.primary">
//             Permission Management
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {/* Permissions List */}
//           <Paper
//             elevation={3}
//             sx={{ p: 3, backgroundColor: "background.paper" }}
//           >
//             <Typography variant="h6" color="text.primary">
//               Existing Permissions
//             </Typography>
//             <List>
//               {permissions.map((perm) => (
//                 <ListItem
//                   key={perm._id}
//                   secondaryAction={
//                     <>
//                       <IconButton
//                         edge="end"
//                         aria-label="edit"
//                         onClick={() => handleEditPermission(perm)}
//                         sx={{ color: "primary.main" }}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         edge="end"
//                         aria-label="delete"
//                         onClick={() =>
//                           handleDeletePermission(perm._id, perm.name)
//                         }
//                         sx={{ color: "error.main" }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </>
//                   }
//                 >
//                   <ListItemText
//                     primary={perm.name}
//                     secondary={perm.description}
//                     primaryTypographyProps={{ color: "text.primary" }}
//                     secondaryTypographyProps={{ color: "text.secondary" }}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={1}>
//         {/* Role Management Section */}
//         <Box mt={2}>
//           <Typography variant="h5" gutterBottom color="text.primary">
//             Role Management
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {/* Create Role */}
//           <Paper
//             elevation={3}
//             sx={{ p: 3, mb: 4, backgroundColor: "background.paper" }}
//           >
//             <Typography variant="h6" color="text.primary">
//               Create New Role
//             </Typography>
//             <Grid container spacing={2} mt={1}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Role Name"
//                   value={newRoleName}
//                   onChange={(e) => setNewRoleName(e.target.value)}
//                   variant="outlined"
//                   fullWidth
//                   color="primary"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography
//                   variant="subtitle1"
//                   gutterBottom
//                   color="text.primary"
//                 >
//                   Select Permissions:
//                 </Typography>
//                 <Box display="flex" flexWrap="wrap">
//                   {permissions.map((perm) => (
//                     <FormControlLabel
//                       key={perm._id}
//                       control={
//                         <Checkbox
//                           checked={selectedPermissionsForRole.includes(
//                             perm.name
//                           )}
//                           onChange={(e) =>
//                             handlePermissionChangeForRole(
//                               perm.name,
//                               e.target.checked
//                             )
//                           }
//                           name={perm.name}
//                           color="primary"
//                         />
//                       }
//                       label={perm.name}
//                       sx={{ mr: 2 }}
//                     />
//                   ))}
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleCreateRole}
//                 >
//                   Create Role
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>

//           {/* Roles List */}
//           <Paper
//             elevation={3}
//             sx={{ p: 3, backgroundColor: "background.paper" }}
//           >
//             <Typography variant="h6" color="text.primary">
//               Existing Roles
//             </Typography>
//             <List>
//               {roles.map((role) => (
//                 <ListItem
//                   key={role._id}
//                   secondaryAction={
//                     <>
//                       <IconButton
//                         edge="end"
//                         aria-label="edit"
//                         onClick={() => handleEditRole(role)}
//                         sx={{ color: "primary.main" }}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         edge="end"
//                         aria-label="delete"
//                         onClick={() => handleDeleteRole(role._id, role.name)}
//                         sx={{ color: "error.main" }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </>
//                   }
//                 >
//                   <ListItemText
//                     primary={role.name}
//                     secondary={`Permissions: ${role.permissions.join(", ")}`}
//                     primaryTypographyProps={{ color: "text.primary" }}
//                     secondaryTypographyProps={{ color: "text.secondary" }}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={2}>
//         {/* User Moderation Section */}
//         <Box mt={2}>
//           <Typography variant="h5" gutterBottom color="text.primary">
//             User Moderation
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {/* Search Field */}
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               label="Search Users by Name or Role"
//               variant="outlined"
//               fullWidth
//               color="primary"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           {/* Users List */}
//           <Paper
//             elevation={3}
//             sx={{ p: 3, backgroundColor: "background.paper" }}
//           >
//             <Typography variant="h6" color="text.primary">
//               Users
//             </Typography>
//             <List>
//               {filteredUsers.length === 0 ? (
//                 <Typography>No users found.</Typography>
//               ) : (
//                 filteredUsers.map((userItem) => (
//                   <ListItem
//                     key={userItem._id}
//                     secondaryAction={
//                       <>
//                         <IconButton
//                           edge="end"
//                           aria-label="edit"
//                           onClick={() => handleOpenEditUserRoleDialog(userItem)}
//                           sx={{ color: "primary.main" }}
//                         >
//                           <Edit />
//                         </IconButton>
//                         {userItem.isActive ? (
//                           <IconButton
//                             edge="end"
//                             aria-label="ban"
//                             onClick={() =>
//                               handleBanUser(
//                                 userItem._id,
//                                 `${userItem.first_Name} ${userItem.last_Name}`
//                               )
//                             }
//                             sx={{ color: "error.main" }}
//                           >
//                             <Block />
//                           </IconButton>
//                         ) : (
//                           <IconButton
//                             edge="end"
//                             aria-label="unban"
//                             onClick={() =>
//                               handleUnbanUser(
//                                 userItem._id,
//                                 `${userItem.first_Name} ${userItem.last_Name}`
//                               )
//                             }
//                             sx={{ color: "success.main" }}
//                           >
//                             <Check />
//                           </IconButton>
//                         )}
//                       </>
//                     }
//                   >
//                     <ListItemIcon>
//                       <Avatar
//                         src={
//                           userItem.user_Avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             userItem.first_Name + " " + userItem.last_Name
//                           )}`
//                         }
//                         alt={`${userItem.first_Name} ${userItem.last_Name}`}
//                       />
//                     </ListItemIcon>
//                     <ListItemText
//                        primary={`${userItem.first_Name} ${userItem.last_Name}`}
//                        secondary={`Synergy Role: ${userItem.roleId?.name || "N/A"} | Active: ${
//                          userItem.isActive ? "Yes" : "No"
//                        }`}
//                        primaryTypographyProps={{ color: "text.primary" }}
//                        secondaryTypographyProps={{ color: "text.secondary" }}
//                      />
//                   </ListItem>
//                 ))
//               )}
//             </List>
//           </Paper>
//         </Box>
//       </TabPanel>

//       {/* --- Edit Permission Dialog --- */}
//       <Dialog
//         open={editPermissionDialogOpen}
//         onClose={() => setEditPermissionDialogOpen(false)}
//       >
//         <DialogTitle color="text.primary">Edit Permission</DialogTitle>
//         <DialogContent>
//           {currentPermission && (
//             <>
//               <Typography variant="subtitle1" color="text.primary">
//                 Permission Name: {currentPermission.name}
//               </Typography>
//               <TextField
//                 label="Description"
//                 value={editedPermissionDescription}
//                 onChange={(e) => setEditedPermissionDescription(e.target.value)}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 color="primary"
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setEditPermissionDialogOpen(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleUpdatePermission} color="primary">
//             Update Permission
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- Edit Role Dialog --- */}
//       <Dialog
//         open={editRoleDialogOpen}
//         onClose={() => setEditRoleDialogOpen(false)}
//       >
//         <DialogTitle color="text.primary">Edit Role</DialogTitle>
//         <DialogContent>
//           {currentRole && (
//             <>
//               <TextField
//                 label="Role Name"
//                 value={editedRoleName}
//                 onChange={(e) => setEditedRoleName(e.target.value)}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 color="primary"
//               />
//               <Typography variant="subtitle1" gutterBottom color="text.primary">
//                 Select Permissions:
//               </Typography>
//               <Box display="flex" flexWrap="wrap">
//                 {permissions.map((perm) => (
//                   <FormControlLabel
//                     key={perm._id}
//                     control={
//                       <Checkbox
//                         checked={editedRolePermissions.includes(perm.name)}
//                         onChange={(e) =>
//                           handleEditPermissionChangeForRole(
//                             perm.name,
//                             e.target.checked
//                           )
//                         }
//                         name={perm.name}
//                         color="primary"
//                       />
//                     }
//                     label={perm.name}
//                     sx={{ mr: 2 }}
//                   />
//                 ))}
//               </Box>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setEditRoleDialogOpen(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateRole} color="primary">
//             Update Role
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- Edit User Role Dialog --- */}
//       <Dialog
//         open={editUserRoleDialogOpen}
//         onClose={() => setEditUserRoleDialogOpen(false)}
//       >
//         <DialogTitle color="text.primary">Assign Role to User</DialogTitle>
//         <DialogContent>
//           {currentUser && (
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="role-select-label" color="primary">
//                 Role
//               </InputLabel>
//               <Select
//                 labelId="role-select-label"
//                 value={selectedRoleForUser}
//                 label="Role"
//                 onChange={(e) => setSelectedRoleForUser(e.target.value)}
//                 color="primary"
//               >
//                 {roles.map((role) => (
//                   <MenuItem key={role._id} value={role.name}>
//                     {role.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setEditUserRoleDialogOpen(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateUserRole} color="primary">
//             Assign Role
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- Confirmation Dialog --- */}
//       <ConfirmationDialog
//         open={confirmationDialog.open}
//         title={confirmationDialog.title}
//         message={confirmationDialog.message}
//         onConfirm={confirmationDialog.onConfirm}
//         onCancel={handleCloseConfirmationDialog}
//       />
//     </Box>
//   );
// };

// // --- TabPanel Component ---
// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`admin-dashboard-tabpanel-${index}`}
//       aria-labelledby={`admin-dashboard-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// };

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// // --- Accessibility Props for Tabs ---
// const a11yProps = (index) => {
//   return {
//     id: `admin-dashboard-tab-${index}`,
//     "aria-controls": `admin-dashboard-tabpanel-${index}`,
//   };
// };

// export default EngPermissionDashboard;


// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { FaTrash, FaEdit, FaBan, FaCheck } from "react-icons/fa";
// import { motion } from "framer-motion";

// // --- Import services ---
// import {
//   getPermissions,
//   createPermission,
//   updatePermission,
//   deletePermission,
//   getRoles,
//   createRole,
//   updateRole,
//   deleteRole,
//   getUsers,
//   assignRoleToUser,
//   banUser,
//   unbanUser,
// } from "../../service/service";
// import useAuthStore from "../../store/store";
// import useEngagementStore from "../../store/engagementStore";
// import { useSocket } from "../../contexts/SocketContext";

// // --- Rewritten ConfirmationDialog in Tailwind ---
// const ConfirmationDialog = ({
//   open,
//   title,
//   message,
//   onConfirm,
//   onCancel,
// }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onCancel}
//       />
//       {/* Dialog */}
//       <motion.div
//         initial={{ y: "-100%", opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 0, opacity: 0 }}
//         className="relative z-10 bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md"
//       >
//         <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//           {title}
//         </h2>
//         <p className="mb-6 dark:text-gray-300">{message}</p>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
//           >
//             Confirm
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const EngPermissionDashboard = () => {
//   const socket = useSocket();

//   // Tab state
//   const [tabIndex, setTabIndex] = useState(0);

//   // --- Permission Management States ---
//   const [permissions, setPermissions] = useState([]);
//   const [newPermissionName, setNewPermissionName] = useState("");
//   const [newPermissionDescription, setNewPermissionDescription] = useState("");
//   const [editPermissionDialogOpen, setEditPermissionDialogOpen] = useState(false);
//   const [currentPermission, setCurrentPermission] = useState(null);
//   const [editedPermissionDescription, setEditedPermissionDescription] = useState("");

//   // --- Role Management States ---
//   const [roles, setRoles] = useState([]);
//   const [newRoleName, setNewRoleName] = useState("");
//   const [selectedPermissionsForRole, setSelectedPermissionsForRole] = useState(
//     []
//   );
//   const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);
//   const [editedRoleName, setEditedRoleName] = useState("");
//   const [editedRolePermissions, setEditedRolePermissions] = useState([]);

//   // --- User Moderation States ---
//   const [users, setUsers] = useState([]);
//   const [selectedRoleForUser, setSelectedRoleForUser] = useState("");
//   const [editUserRoleDialogOpen, setEditUserRoleDialogOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   // --- Search State for Users ---
//   const [searchTerm, setSearchTerm] = useState("");

//   // --- Confirmation Dialog States ---
//   const [confirmationDialog, setConfirmationDialog] = useState({
//     open: false,
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   // --- Common States (from stores) ---
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId;
//   const userPermissions = useEngagementStore((state) => state.permissions || []);

//   // Fetch initial data
//   useEffect(() => {
//     fetchPermissions();
//     fetchRoles();
//     fetchUsers();
//   }, []);

//   // --- Permission Management Functions ---
//   const fetchPermissions = async () => {
//     try {
//       const data = await getPermissions();
//       setPermissions(data);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch permissions."
//       );
//     }
//   };

//   const handleCreatePermission = async () => {
//     if (!newPermissionName || !newPermissionDescription) {
//       toast.error("Please fill all fields.");
//       return;
//     }
//     try {
//       const permissionData = {
//         name: newPermissionName,
//         description: newPermissionDescription,
//       };
//       await createPermission(permissionData);
//       toast.success("Permission created successfully.");
//       setNewPermissionName("");
//       setNewPermissionDescription("");
//       fetchPermissions();
//     } catch (error) {
//       console.error("Error creating permission:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create permission."
//       );
//     }
//   };

//   const handleDeletePermission = (permissionId, permissionName) => {
//     handleOpenConfirmationDialog(
//       "Delete Permission",
//       `Are you sure you want to delete the permission "${permissionName}"? This action cannot be undone.`,
//       async () => {
//         try {
//           await deletePermission(permissionId);
//           toast.success("Permission deleted successfully.");
//           fetchPermissions();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error deleting permission:", error);
//           toast.error(
//             error.response?.data?.message || "Failed to delete permission."
//           );
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleEditPermission = (permission) => {
//     setCurrentPermission(permission);
//     setEditedPermissionDescription(permission.description);
//     setEditPermissionDialogOpen(true);
//   };

//   const handleUpdatePermission = async () => {
//     if (!editedPermissionDescription) {
//       toast.error("Permission description is required.");
//       return;
//     }
//     try {
//       const updatedData = {
//         description: editedPermissionDescription,
//       };
//       await updatePermission(currentPermission._id, updatedData);
//       toast.success("Permission updated successfully.");
//       setEditPermissionDialogOpen(false);
//       setCurrentPermission(null);
//       setEditedPermissionDescription("");
//       fetchPermissions();
//     } catch (error) {
//       console.error("Error updating permission:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update permission."
//       );
//     }
//   };

//   // --- Role Management Functions ---
//   const fetchRoles = async () => {
//     try {
//       const data = await getRoles();
//       setRoles(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch roles.");
//     }
//   };

//   const handleCreateRole = async () => {
//     if (!newRoleName) {
//       toast.error("Role name is required.");
//       return;
//     }
//     try {
//       const roleData = {
//         name: newRoleName,
//         permissions: selectedPermissionsForRole,
//       };
//       await createRole(roleData);
//       toast.success("Role created successfully.");
//       setNewRoleName("");
//       setSelectedPermissionsForRole([]);
//       fetchRoles();
//     } catch (error) {
//       console.error("Error creating role:", error);
//       toast.error(error.response?.data?.message || "Failed to create role.");
//     }
//   };

//   const handleDeleteRole = (roleId, roleName) => {
//     handleOpenConfirmationDialog(
//       "Delete Role",
//       `Are you sure you want to delete the role "${roleName}"? This action cannot be undone.`,
//       async () => {
//         try {
//           await deleteRole(roleId);
//           toast.success("Role deleted successfully.");
//           fetchRoles();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error deleting role:", error);
//           toast.error(
//             error.response?.data?.message || "Failed to delete role."
//           );
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleEditRole = (role) => {
//     setCurrentRole(role);
//     setEditedRoleName(role.name);
//     setEditedRolePermissions(role.permissions);
//     setEditRoleDialogOpen(true);
//   };

//   const handleUpdateRole = async () => {
//     if (!editedRoleName) {
//       toast.error("Role name is required.");
//       return;
//     }
//     try {
//       const updatedData = {
//         name: editedRoleName,
//         permissions: editedRolePermissions,
//       };
//       await updateRole(currentRole._id, updatedData);
//       toast.success("Role updated successfully.");
//       setEditRoleDialogOpen(false);
//       setCurrentRole(null);
//       setEditedRoleName("");
//       setEditedRolePermissions([]);
//       fetchRoles();
//     } catch (error) {
//       console.error("Error updating role:", error);
//       toast.error(error.response?.data?.message || "Failed to update role.");
//     }
//   };

//   const handlePermissionChangeForRole = (permissionName, isChecked) => {
//     if (isChecked) {
//       setSelectedPermissionsForRole((prev) => [...prev, permissionName]);
//     } else {
//       setSelectedPermissionsForRole((prev) =>
//         prev.filter((perm) => perm !== permissionName)
//       );
//     }
//   };

//   const handleEditPermissionChangeForRole = (permissionName, isChecked) => {
//     if (isChecked) {
//       setEditedRolePermissions((prev) => [...prev, permissionName]);
//     } else {
//       setEditedRolePermissions((prev) =>
//         prev.filter((perm) => perm !== permissionName)
//       );
//     }
//   };

//   // --- User Moderation Functions ---
//   const fetchUsers = async () => {
//     try {
//       const response = await getUsers();
//       if (response.success) {
//         setUsers(response.data);
//       } else {
//         toast.error(response.message || "Failed to fetch users.");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch users.");
//     }
//   };

//   const handleAssignRole = (userId, roleName, userName) => {
//     handleOpenConfirmationDialog(
//       "Assign Role",
//       `Are you sure you want to assign the role "${roleName}" to "${userName}"?`,
//       async () => {
//         try {
//           await assignRoleToUser(userId, roleName);
//           toast.success("Role assigned successfully.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error assigning role:", error);
//           toast.error(error.response?.data?.message || "Failed to assign role.");
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleBanUser = (banUserId, userName) => {
//     handleOpenConfirmationDialog(
//       "Ban User",
//       `Are you sure you want to ban "${userName}" from engagement?`,
//       async () => {
//         try {
//           await banUser(banUserId);
//           toast.success("User banned from engagement.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error banning user:", error);
//           toast.error(error.response?.data?.message || "Failed to ban user.");
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleUnbanUser = (unbanUserId, userName) => {
//     handleOpenConfirmationDialog(
//       "Unban User",
//       `Are you sure you want to unban "${userName}" from engagement?`,
//       async () => {
//         try {
//           await unbanUser(unbanUserId);
//           toast.success("User unbanned from engagement.");
//           fetchUsers();
//           handleCloseConfirmationDialog();
//         } catch (error) {
//           console.error("Error unbanning user:", error);
//           toast.error(error.response?.data?.message || "Failed to unban user.");
//           handleCloseConfirmationDialog();
//         }
//       }
//     );
//   };

//   const handleOpenEditUserRoleDialog = (userData) => {
//     setCurrentUser(userData);
//     setSelectedRoleForUser(userData.permission_role || "");
//     setEditUserRoleDialogOpen(true);
//   };

//   const handleCloseEditUserRoleDialog = () => {
//     setCurrentUser(null);
//     setSelectedRoleForUser("");
//     setEditUserRoleDialogOpen(false);
//   };

//   const handleUpdateUserRole = () => {
//     if (!selectedRoleForUser) {
//       toast.error("Please select a role.");
//       return;
//     }
//     handleAssignRole(
//       currentUser._id,
//       selectedRoleForUser,
//       `${currentUser.first_Name} ${currentUser.last_Name}`
//     );
//     handleCloseEditUserRoleDialog();
//   };

//   // --- Confirmation Dialog Handlers ---
//   const handleOpenConfirmationDialog = (title, message, onConfirm) => {
//     setConfirmationDialog({
//       open: true,
//       title,
//       message,
//       onConfirm,
//     });
//   };

//   const handleCloseConfirmationDialog = () => {
//     setConfirmationDialog({
//       open: false,
//       title: "",
//       message: "",
//       onConfirm: null,
//     });
//   };

//   // --- Socket.io Event Listeners ---
//   useEffect(() => {
//     if (!socket) return;

//     // Role Events
//     socket.on("newRole", (role) => {
//       setRoles((prevRoles) => [...prevRoles, role]);
//       toast.info(`New role "${role.name}" has been created.`);
//     });

//     socket.on("updateRole", (updatedRole) => {
//       setRoles((prevRoles) =>
//         prevRoles.map((role) =>
//           role._id === updatedRole._id ? updatedRole : role
//         )
//       );
//       toast.info(`Role "${updatedRole.name}" has been updated.`);
//     });

//     socket.on("deleteRole", ({ roleId }) => {
//       setRoles((prevRoles) =>
//         prevRoles.filter((role) => role._id !== roleId)
//       );
//       toast.info(`A role has been deleted.`);
//     });

//     // Permission Events
//     socket.on("newPermission", (permission) => {
//       setPermissions((prevPermissions) => [...prevPermissions, permission]);
//       toast.info(`New permission "${permission.name}" has been created.`);
//     });

//     socket.on("updatePermission", (updatedPermission) => {
//       setPermissions((prevPermissions) =>
//         prevPermissions.map((perm) =>
//           perm._id === updatedPermission._id ? updatedPermission : perm
//         )
//       );
//       toast.info(`Permission "${updatedPermission.name}" has been updated.`);
//     });

//     socket.on("deletePermission", ({ permissionId }) => {
//       setPermissions((prevPermissions) =>
//         prevPermissions.filter((perm) => perm._id !== permissionId)
//       );
//       toast.info(`A permission has been deleted.`);
//     });

//     // Cleanup
//     return () => {
//       socket.off("newRole");
//       socket.off("updateRole");
//       socket.off("deleteRole");
//       socket.off("newPermission");
//       socket.off("updatePermission");
//       socket.off("deletePermission");
//     };
//   }, [socket]);

//   // --- Filtered users based on search term ---
//   const filteredUsers = users.filter((userItem) => {
//     const fullName = `${userItem.first_Name} ${userItem.last_Name}`;
//     const role = userItem.permission_role || "";
//     return (
//       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       role.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   return (
//     <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
//       {/* Top Bar / Nav */}
//       <div className="bg-bg-secondary text-text-primary rounded-md mb-4 p-4 shadow-sm">
//         <h1 className="text-xl font-bold">Synergy Admin Dashboard</h1>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-around bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-200 rounded-md shadow-sm">
//         <button
//           className={`w-full py-2 ${
//             tabIndex === 0 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
//           }`}
//           onClick={() => setTabIndex(0)}
//         >
//           Permissions
//         </button>
//         <button
//           className={`w-full py-2 ${
//             tabIndex === 1 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
//           }`}
//           onClick={() => setTabIndex(1)}
//         >
//           Roles
//         </button>
//         <button
//           className={`w-full py-2 ${
//             tabIndex === 2 ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
//           }`}
//           onClick={() => setTabIndex(2)}
//         >
//           User Moderation
//         </button>
//       </div>

//       {/* Tab Panels */}
//       <TabPanel value={tabIndex} index={0}>
//         {/* Permission Management */}
//         <div className="mt-2">
//           <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
//             Permission Management
//           </h2>
//           <hr className="mb-4 border-gray-300 dark:border-gray-700" />

//           {/* Create Permission */}
//           {/* <div className="shadow-md p-4 mb-6 bg-white dark:bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
//               Create New Permission
//             </h3>
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//               <div className="flex-1">
//                 <label className="block mb-1 dark:text-gray-300">
//                   Permission Name
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   type="text"
//                   value={newPermissionName}
//                   onChange={(e) => setNewPermissionName(e.target.value)}
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block mb-1 dark:text-gray-300">
//                   Permission Description
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   type="text"
//                   value={newPermissionDescription}
//                   onChange={(e) => setNewPermissionDescription(e.target.value)}
//                 />
//               </div>
//             </div>
//             <button
//               onClick={handleCreatePermission}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Create Permission
//             </button>
//           </div> */}

//           {/* Existing Permissions */}
//           <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
//               Existing Permissions
//             </h3>
//             <ul>
//               {permissions.map((perm) => (
//                 <li
//                   key={perm._id}
//                   className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
//                 >
//                   <div>
//                     <p className="font-medium dark:text-gray-100">
//                       {perm.name}
//                     </p>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {perm.description}
//                     </p>
//                   </div>
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => handleEditPermission(perm)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleDeletePermission(perm._id, perm.name)
//                       }
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={1}>
//         {/* Role Management */}
//         <div className="mt-2">
//           <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
//             Role Management
//           </h2>
//           <hr className="mb-4 border-gray-300 dark:border-gray-700" />

//           {/* Create Role */}
//           <div className="shadow-md p-4 mb-6 bg-white dark:bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
//               Create New Role
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 dark:text-gray-300">Role Name</label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                   type="text"
//                   value={newRoleName}
//                   onChange={(e) => setNewRoleName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 dark:text-gray-300">
//                   Select Permissions
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {permissions.map((perm) => (
//                     <label
//                       key={perm._id}
//                       className="flex items-center space-x-1 dark:text-gray-300"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedPermissionsForRole.includes(perm.name)}
//                         onChange={(e) =>
//                           handlePermissionChangeForRole(
//                             perm.name,
//                             e.target.checked
//                           )
//                         }
//                         className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <span>{perm.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={handleCreateRole}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Create Role
//             </button>
//           </div>

//           {/* Existing Roles */}
//           <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
//               Existing Roles
//             </h3>
//             <ul>
//               {roles.map((role) => (
//                 <li
//                   key={role._id}
//                   className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
//                 >
//                   <div>
//                     <p className="font-medium dark:text-gray-100">
//                       {role.name}
//                     </p>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       Permissions: {role.permissions.join(", ")}
//                     </p>
//                   </div>
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => handleEditRole(role)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteRole(role._id, role.name)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={2}>
//         {/* User Moderation */}
//         <div className="mt-2">
//           <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">
//             User Moderation
//           </h2>
//           <hr className="mb-4 border-gray-300 dark:border-gray-700" />

//           {/* Search */}
//           <div className="mb-4">
//             <label className="block mb-1 dark:text-gray-300">
//               Search Users by Name or Role
//             </label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Users List */}
//           <div className="shadow-md p-4 bg-white dark:bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
//               Users
//             </h3>
//             {filteredUsers.length === 0 ? (
//               <p className="dark:text-gray-300">No users found.</p>
//             ) : (
//               <ul>
//                 {filteredUsers.map((userItem) => (
//                   <li
//                     key={userItem._id}
//                     className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0"
//                   >
//                     <div className="flex items-center space-x-3">
//                       {/* Avatar */}
//                       <img
//                         className="w-10 h-10 rounded-full object-cover"
//                         src={
//                           userItem.user_Avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             userItem.first_Name + " " + userItem.last_Name
//                           )}`
//                         }
//                         alt={`${userItem.first_Name} ${userItem.last_Name}`}
//                       />
//                       <div>
//                         <p className="font-medium dark:text-gray-100">
//                           {userItem.first_Name} {userItem.last_Name}
//                         </p>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                           Synergy Role: {userItem.roleId?.name || "N/A"} | Active:{" "}
//                           {userItem.isActive ? "Yes" : "No"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleOpenEditUserRoleDialog(userItem)}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         <FaEdit />
//                       </button>
//                       {userItem.isActive ? (
//                         <button
//                           onClick={() =>
//                             handleBanUser(
//                               userItem._id,
//                               `${userItem.first_Name} ${userItem.last_Name}`
//                             )
//                           }
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FaBan />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() =>
//                             handleUnbanUser(
//                               userItem._id,
//                               `${userItem.first_Name} ${userItem.last_Name}`
//                             )
//                           }
//                           className="text-green-500 hover:text-green-700"
//                         >
//                           <FaCheck />
//                         </button>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </TabPanel>

//       {/* Edit Permission Modal */}
//       {editPermissionDialogOpen && (
//         <ModalContainer onClose={() => setEditPermissionDialogOpen(false)}>
//           <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//             Edit Permission
//           </h2>
//           {currentPermission && (
//             <>
//               <p className="dark:text-gray-300 mb-2">
//                 Permission Name:{" "}
//                 <span className="font-semibold">{currentPermission.name}</span>
//               </p>
//               <label className="block mb-1 dark:text-gray-300">Description</label>
//               <input
//                 type="text"
//                 value={editedPermissionDescription}
//                 onChange={(e) => setEditedPermissionDescription(e.target.value)}
//                 className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               />
//             </>
//           )}
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setEditPermissionDialogOpen(false)}
//               className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleUpdatePermission}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
//             >
//               Update Permission
//             </button>
//           </div>
//         </ModalContainer>
//       )}

//       {/* Edit Role Modal */}
//       {editRoleDialogOpen && (
//         <ModalContainer onClose={() => setEditRoleDialogOpen(false)}>
//           <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//             Edit Role
//           </h2>
//           <label className="block mb-1 dark:text-gray-300">Role Name</label>
//           <input
//             type="text"
//             value={editedRoleName}
//             onChange={(e) => setEditedRoleName(e.target.value)}
//             className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//           />
//           <p className="dark:text-gray-300 font-semibold mb-2">
//             Select Permissions:
//           </p>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {permissions.map((perm) => (
//               <label
//                 key={perm._id}
//                 className="flex items-center space-x-1 dark:text-gray-300"
//               >
//                 <input
//                   type="checkbox"
//                   checked={editedRolePermissions.includes(perm.name)}
//                   onChange={(e) =>
//                     handleEditPermissionChangeForRole(
//                       perm.name,
//                       e.target.checked
//                     )
//                   }
//                   className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span>{perm.name}</span>
//               </label>
//             ))}
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setEditRoleDialogOpen(false)}
//               className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleUpdateRole}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
//             >
//               Update Role
//             </button>
//           </div>
//         </ModalContainer>
//       )}

//       {/* Edit User Role Modal */}
//       {editUserRoleDialogOpen && (
//         <ModalContainer onClose={() => setEditUserRoleDialogOpen(false)}>
//           <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//             Assign Role to User
//           </h2>
//           {currentUser && (
//             <>
//               <label className="block mb-1 dark:text-gray-300">Role</label>
//               <select
//                 value={selectedRoleForUser}
//                 onChange={(e) => setSelectedRoleForUser(e.target.value)}
//                 className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//               >
//                 <option value="">Select a role</option>
//                 {roles.map((role) => (
//                   <option key={role._id} value={role.name}>
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </>
//           )}
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setEditUserRoleDialogOpen(false)}
//               className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-black dark:text-white"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleUpdateUserRole}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
//             >
//               Assign Role
//             </button>
//           </div>
//         </ModalContainer>
//       )}

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmationDialog.open}
//         title={confirmationDialog.title}
//         message={confirmationDialog.message}
//         onConfirm={confirmationDialog.onConfirm}
//         onCancel={handleCloseConfirmationDialog}
//       />
//     </div>
//   );
// };

// // Simple Tailwind Modal Container using Framer Motion
// const ModalContainer = ({ children, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//       />
//       {/* Content */}
//       <motion.div
//         initial={{ y: "-100%", opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 0, opacity: 0 }}
//         className="relative z-10 bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-md"
//       >
//         {children}
//       </motion.div>
//     </div>
//   );
// };

// // TabPanel component
// const TabPanel = ({ children, value, index }) => {
//   if (value !== index) return null;
//   return <div className="py-4">{children}</div>;
// };

// export default EngPermissionDashboard;


import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaBan, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

// --- Import your BaseModal component ---
import BaseModal from "../common/BaseModal"; // <-- Update path as needed!

// --- Import services ---
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

// --- Import stores ---
import useAuthStore from "../../store/store";
import useEngagementStore from "../../store/engagementStore";

// --- Import Socket Context ---
import { useSocket } from "../../contexts/SocketContext";

const EngPermissionDashboard = () => {
  const socket = useSocket();

  // Tab state
  const [tabIndex, setTabIndex] = useState(0);

  // --- Permission Management States ---
  const [permissions, setPermissions] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [newPermissionDescription, setNewPermissionDescription] = useState("");
  const [editPermissionDialogOpen, setEditPermissionDialogOpen] = useState(false);
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

  // --- Confirmation Dialog State ---
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
