// src/components/management/PermissionManagement.js
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from '../../service/service';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [newPermissionDescription, setNewPermissionDescription] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch permissions.');
    }
  };

  const handleCreatePermission = async () => {
    if (!newPermissionName || !newPermissionDescription) {
      toast.error('Please fill all fields.');
      return;
    }
    try {
      const permissionData = {
        name: newPermissionName,
        description: newPermissionDescription,
      };
      await createPermission(permissionData);
      toast.success('Permission created successfully.');
      setNewPermissionName('');
      setNewPermissionDescription('');
      fetchPermissions();
    } catch (error) {
      console.error('Error creating permission:', error);
      toast.error(error.response?.data?.message || 'Failed to create permission.');
    }
  };

  const handleDeletePermission = async (permissionId) => {
    if (!window.confirm('Are you sure you want to delete this permission?')) return;
    try {
      await deletePermission(permissionId);
      toast.success('Permission deleted successfully.');
      fetchPermissions();
    } catch (error) {
      console.error('Error deleting permission:', error);
      toast.error(error.response?.data?.message || 'Failed to delete permission.');
    }
  };

  const handleEditPermission = (permission) => {
    setCurrentPermission(permission);
    setEditedDescription(permission.description);
    setEditDialogOpen(true);
  };

  const handleUpdatePermission = async () => {
    if (!editedDescription) {
      toast.error('Permission description is required.');
      return;
    }
    try {
      const updatedData = {
        description: editedDescription,
      };
      await updatePermission(currentPermission._id, updatedData);
      toast.success('Permission updated successfully.');
      setEditDialogOpen(false);
      setCurrentPermission(null);
      setEditedDescription('');
      fetchPermissions();
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error(error.response?.data?.message || 'Failed to update permission.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Permission Management
      </Typography>

      {/* Create Permission Section */}
      <Box mb={4}>
        <Typography variant="h6">Create New Permission</Typography>
        <TextField
          label="Permission Name"
          value={newPermissionName}
          onChange={(e) => setNewPermissionName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newPermissionDescription}
          onChange={(e) => setNewPermissionDescription(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreatePermission} sx={{ mt: 2 }}>
          Create Permission
        </Button>
      </Box>

      {/* Permissions List Section */}
      <Box>
        <Typography variant="h6">Existing Permissions</Typography>
        <List>
          {permissions.map((perm) => (
            <ListItem key={perm._id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPermission(perm)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePermission(perm._id)}>
                  <Delete />
                </IconButton>
              </>
            }>
              <ListItemText
                primary={perm.name}
                secondary={perm.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Edit Permission Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Permission</DialogTitle>
        <DialogContent>
          {currentPermission && (
            <>
              <Typography variant="subtitle1">Permission Name: {currentPermission.name}</Typography>
              <TextField
                label="Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePermission} color="primary">
            Update Permission
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionManagement;
