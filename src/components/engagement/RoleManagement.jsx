// src/components/management/RoleManagement.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel 
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
// import useAuthStore from '../../store/authStore';
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
} from '../../service/service';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState('');
  const [editedPermissions, setEditedPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch roles.');
    }
  };

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch permissions.');
    }
  };

  const handleCreateRole = async () => {
    if (!newRoleName) {
      toast.error('Role name is required.');
      return;
    }
    try {
      const roleData = {
        name: newRoleName,
        permissions: selectedPermissions,
      };
      await createRole(roleData);
      toast.success('Role created successfully.');
      setNewRoleName('');
      setSelectedPermissions([]);
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
      toast.error(error.response?.data?.message || 'Failed to create role.');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      await deleteRole(roleId);
      toast.success('Role deleted successfully.');
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error(error.response?.data?.message || 'Failed to delete role.');
    }
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setEditedRoleName(role.name);
    setEditedPermissions(role.permissions);
    setEditDialogOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!editedRoleName) {
      toast.error('Role name is required.');
      return;
    }
    try {
      const updatedData = {
        name: editedRoleName,
        permissions: editedPermissions,
      };
      await updateRole(currentRole._id, updatedData);
      toast.success('Role updated successfully.');
      setEditDialogOpen(false);
      setCurrentRole(null);
      setEditedRoleName('');
      setEditedPermissions([]);
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.response?.data?.message || 'Failed to update role.');
    }
  };

  const handlePermissionChange = (permissionName, isChecked) => {
    if (isChecked) {
      setSelectedPermissions((prev) => [...prev, permissionName]);
    } else {
      setSelectedPermissions((prev) => prev.filter((perm) => perm !== permissionName));
    }
  };

  const handleEditPermissionChange = (permissionName, isChecked) => {
    if (isChecked) {
      setEditedPermissions((prev) => [...prev, permissionName]);
    } else {
      setEditedPermissions((prev) => prev.filter((perm) => perm !== permissionName));
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>

      {/* Create Role Section */}
      <Box mb={4}>
        <Typography variant="h6">Create New Role</Typography>
        <TextField
          label="Role Name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1">Select Permissions:</Typography>
        <Box display="flex" flexWrap="wrap">
          {permissions.map((perm) => (
            <FormControlLabel
              key={perm._id}
              control={
                <Checkbox
                  checked={selectedPermissions.includes(perm.name)}
                  onChange={(e) => handlePermissionChange(perm.name, e.target.checked)}
                  name={perm.name}
                />
              }
              label={perm.name}
            />
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleCreateRole} sx={{ mt: 2 }}>
          Create Role
        </Button>
      </Box>

      {/* Roles List Section */}
      <Box>
        <Typography variant="h6">Existing Roles</Typography>
        <List>
          {roles.map((role) => (
            <ListItem key={role._id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditRole(role)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRole(role._id)}>
                  <Delete />
                </IconButton>
              </>
            }>
              <ListItemText
                primary={role.name}
                secondary={`Permissions: ${role.permissions.join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Role</DialogTitle>
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
              />
              <Typography variant="subtitle1">Select Permissions:</Typography>
              <Box display="flex" flexWrap="wrap">
                {permissions.map((perm) => (
                  <FormControlLabel
                    key={perm._id}
                    control={
                      <Checkbox
                        checked={editedPermissions.includes(perm.name)}
                        onChange={(e) => handleEditPermissionChange(perm.name, e.target.checked)}
                        name={perm.name}
                      />
                    }
                    label={perm.name}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
