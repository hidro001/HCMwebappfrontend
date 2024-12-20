// src/components/RoleManagement.js
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
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/store';
import useEngagementStore from '../../store/engagementStore';
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

  const authStore = useAuthStore();
  const userPermissions = useEngagementStore((state) => state.permissions);

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
      toast.error(error.message || 'Failed to fetch roles.');
    }
  };

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(error.message || 'Failed to fetch permissions.');
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
      toast.error(error.message || 'Failed to create role.');
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
      toast.error(error.message || 'Failed to delete role.');
    }
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setSelectedPermissions(role.permissions);
    setEditDialogOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!currentRole.name) {
      toast.error('Role name is required.');
      return;
    }
    try {
      const updatedData = {
        name: currentRole.name,
        permissions: selectedPermissions,
      };
      await updateRole(currentRole._id, updatedData);
      toast.success('Role updated successfully.');
      setEditDialogOpen(false);
      setCurrentRole(null);
      setSelectedPermissions([]);
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.message || 'Failed to update role.');
    }
  };

  const handlePermissionChange = (permissionName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionName)
        ? prev.filter((perm) => perm !== permissionName)
        : [...prev, permissionName]
    );
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
          fullWidth
          margin="normal"
        />
        <Box>
          <Typography variant="subtitle1">Select Permissions:</Typography>
          <Box display="flex" flexWrap="wrap">
            {permissions.map((perm) => (
              <FormControlLabel
                key={perm._id}
                control={
                  <Checkbox
                    checked={selectedPermissions.includes(perm.name)}
                    onChange={() => handlePermissionChange(perm.name)}
                    name={perm.name}
                  />
                }
                label={perm.name}
              />
            ))}
          </Box>
        </Box>
        <Button variant="contained" color="primary" onClick={handleCreateRole}>
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
                value={currentRole.name}
                onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Box>
                <Typography variant="subtitle1">Select Permissions:</Typography>
                <Box display="flex" flexWrap="wrap">
                  {permissions.map((perm) => (
                    <FormControlLabel
                      key={perm._id}
                      control={
                        <Checkbox
                          checked={selectedPermissions.includes(perm.name)}
                          onChange={() => handlePermissionChange(perm.name)}
                          name={perm.name}
                        />
                      }
                      label={perm.name}
                    />
                  ))}
                </Box>
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
