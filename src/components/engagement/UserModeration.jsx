// // src/components/UserModeration.js
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { Delete, Edit, Block, Check } from '@mui/icons-material';
// import { toast } from 'react-toastify';
// import useAuthStore from '../../store/store';
// import useEngagementStore from '../../store/engagementStore';
// import {
//   getRoles,
// //   getUsers, // Assume you have an API to fetch users
//   assignRoleToUser,
//   banUser,
//   unbanUser,
// } from '../../service/service';
// import axiosInstance from '../../service/axiosInstance'; // Adjust the path as needed

// const UserModeration = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const authStore = useAuthStore();
//   const userPermissions = useEngagementStore((state) => state.permissions);

//   useEffect(() => {
//     fetchUsers();
//     fetchRoles();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axiosInstance.get('/user/all-user');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error(error.message || 'Failed to fetch users.');
//     }
//   };

//   const fetchRoles = async () => {
//     try {
//       const data = await getRoles();
//       setRoles(data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       toast.error(error.message || 'Failed to fetch roles.');
//     }
//   };

//   const handleAssignRole = async (userId, roleName) => {
//     try {
//       await assignRoleToUser(userId, roleName);
//       toast.success('Role assigned successfully.');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error assigning role:', error);
//       toast.error(error.message || 'Failed to assign role.');
//     }
//   };

//   const handleBanUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to ban this user from engagement?')) return;
//     try {
//       await banUser(userId);
//       toast.success('User banned from engagement.');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error banning user:', error);
//       toast.error(error.message || 'Failed to ban user.');
//     }
//   };

//   const handleUnbanUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to unban this user from engagement?')) return;
//     try {
//       await unbanUser(userId);
//       toast.success('User unbanned from engagement.');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error unbanning user:', error);
//       toast.error(error.message || 'Failed to unban user.');
//     }
//   };

//   const handleOpenEditDialog = (user) => {
//     setCurrentUser(user);
//     setSelectedRole(user.user_Role);
//     setEditDialogOpen(true);
//   };

//   const handleCloseEditDialog = () => {
//     setCurrentUser(null);
//     setSelectedRole('');
//     setEditDialogOpen(false);
//   };

//   const handleUpdateRole = () => {
//     if (!selectedRole) {
//       toast.error('Please select a role.');
//       return;
//     }
//     handleAssignRole(currentUser._id, selectedRole);
//     handleCloseEditDialog();
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         User Moderation
//       </Typography>

//       {/* Users List */}
//       <Box>
//         <Typography variant="h6">Users</Typography>
//         <List>
//           {users.map((user) => (
//             <ListItem key={user._id} secondaryAction={
//               <>
//                 <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(user)}>
//                   <Edit />
//                 </IconButton>
//                 {user.isActive ? (
//                   <IconButton edge="end" aria-label="ban" onClick={() => handleBanUser(user._id)}>
//                     <Block />
//                   </IconButton>
//                 ) : (
//                   <IconButton edge="end" aria-label="unban" onClick={() => handleUnbanUser(user._id)}>
//                     <Check />
//                   </IconButton>
//                 )}
//               </>
//             }>
//               <ListItemText
//                 primary={`${user.first_Name} ${user.last_Name}`}
//                 secondary={`Role: ${user.user_Role} | Email: ${user.working_Email_Id} | Active: ${user.isActive}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Edit Role Dialog */}
//       <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
//         <DialogTitle>Assign Role to User</DialogTitle>
//         <DialogContent>
//           {currentUser && (
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="role-select-label">Role</InputLabel>
//               <Select
//                 labelId="role-select-label"
//                 value={selectedRole}
//                 label="Role"
//                 onChange={(e) => setSelectedRole(e.target.value)}
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
//           <Button onClick={handleCloseEditDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateRole} color="primary">
//             Assign Role
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default UserModeration;


import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit, Block, Check } from '@mui/icons-material';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/store';
import useEngagementStore from '../../store/engagementStore';
import {
  getRoles,
  assignRoleToUser,
  banUser,
  unbanUser,
} from '../../service/service';
import axiosInstance from '../../service/axiosInstance'; // Adjust the path as needed

const UserModeration = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const authStore = useAuthStore();
  const userPermissions = useEngagementStore((state) => state.permissions);

  // Fetch users and roles on component mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/user/all-user');
      if (response.data.success) {
        setUsers(response.data.data); // Set users from the "data" property in the response
        toast.success('Users fetched successfully.');
      } else {
        toast.error(response.data.message || 'Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Failed to fetch users.');
    }
  };

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error(error.message || 'Failed to fetch roles.');
    }
  };

  // Assign a role to a user
  const handleAssignRole = async (userId, roleName) => {
    try {
      await assignRoleToUser(userId, roleName);
      toast.success('Role assigned successfully.');
      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error(error.message || 'Failed to assign role.');
    }
  };

  // Ban a user
  const handleBanUser = async (userId) => {
    if (!window.confirm('Are you sure you want to ban this user from engagement?')) return;
    try {
      await banUser(userId);
      toast.success('User banned from engagement.');
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error(error.message || 'Failed to ban user.');
    }
  };

  // Unban a user
  const handleUnbanUser = async (userId) => {
    if (!window.confirm('Are you sure you want to unban this user from engagement?')) return;
    try {
      await unbanUser(userId);
      toast.success('User unbanned from engagement.');
      fetchUsers();
    } catch (error) {
      console.error('Error unbanning user:', error);
      toast.error(error.message || 'Failed to unban user.');
    }
  };

  // Open the edit dialog
  const handleOpenEditDialog = (user) => {
    setCurrentUser(user);
    setSelectedRole(user.permission_role || ''); // Use user's current role
    setEditDialogOpen(true);
  };

  // Close the edit dialog
  const handleCloseEditDialog = () => {
    setCurrentUser(null);
    setSelectedRole('');
    setEditDialogOpen(false);
  };

  // Update the user's role
  const handleUpdateRole = () => {
    if (!selectedRole) {
      toast.error('Please select a role.');
      return;
    }
    handleAssignRole(currentUser._id, selectedRole);
    handleCloseEditDialog();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        User Moderation
      </Typography>

      {/* Users List */}
      <Box>
        <Typography variant="h6">Users</Typography>
        <List>
          {users.map((user) => (
            <ListItem
              key={user._id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(user)}>
                    <Edit />
                  </IconButton>
                  {user.isActive ? (
                    <IconButton edge="end" aria-label="ban" onClick={() => handleBanUser(user._id)}>
                      <Block />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" aria-label="unban" onClick={() => handleUnbanUser(user._id)}>
                      <Check />
                    </IconButton>
                  )}
                </>
              }
            >
              <ListItemText
                primary={`${user.first_Name} ${user.last_Name}`}
                secondary={`Role: ${user.permission_role || 'N/A'} | Active: ${user.isActive}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Assign Role to User</DialogTitle>
        <DialogContent>
          {currentUser && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
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
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Assign Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserModeration;
