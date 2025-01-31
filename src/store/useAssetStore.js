// src/store/useAssetStore.js
import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useAssetStore = create((set, get) => ({
  subordinates: [],
  loadingSubordinates: false,
  errorSubordinates: '',

  assetGroups: [],
  loadingAssetGroups: false,
  errorAssetGroups: '',

  assignedAssets: {}, // For holding assigned assets by employeeId (key-value)
  loadingAssignedAssets: false,
  errorAssignedAssets: '',

  // -----------------------------
  // 1) Fetch Subordinates
  // -----------------------------
  getSubordinates: async (employeeId) => {
    set({ loadingSubordinates: true, errorSubordinates: '' });
    try {
      // Example: add employeeId to query if needed
      const response = await axiosInstance.get('/admin/subordinates', {
        params: { employeeId },
      });
      if (response.data?.success) {
        set({
          subordinates: response.data.data || [],
          loadingSubordinates: false,
        });
      } else {
        throw new Error(response.data?.message || 'Failed to fetch subordinates');
      }
    } catch (error) {
      console.error('Error fetching subordinates:', error);
      toast.error(error.message);
      set({
        errorSubordinates: error.message,
        loadingSubordinates: false,
      });
    }
  },

  // -----------------------------
  // 2) Fetch Asset Groups
  // -----------------------------
  getAssetGroups: async () => {
    set({ loadingAssetGroups: true, errorAssetGroups: '' });
    try {
      const response = await axiosInstance.get('/superadmin/assetGroup/get');
      if (response.data?.success) {
        set({
          assetGroups: response.data.data || [],
          loadingAssetGroups: false,
        });
      } else {
        throw new Error(response.data?.message || 'Failed to fetch asset groups');
      }
    } catch (error) {
      console.error('Error fetching asset groups:', error);
      toast.error(error.message);
      set({
        errorAssetGroups: error.message,
        loadingAssetGroups: false,
      });
    }
  },

  // -----------------------------
  // 3) Create Asset Group
  // -----------------------------
  createAssetGroup: async (groupName, groupDescription) => {
    try {
      const response = await axiosInstance.post('/superadmin/assetGroup/add', {
        name: groupName,
        description: groupDescription,
      });
      if (response.data?.success) {
        toast.success('Asset group added successfully!');
        // Refresh local store
        await get().getAssetGroups();
      } else {
        throw new Error(response.data?.message || 'Failed to add asset group.');
      }
    } catch (error) {
      console.error('Error adding asset group:', error);
      toast.error(error.message);
    }
  },

  // -----------------------------
  // 4) Delete Asset Group
  // -----------------------------
  deleteAssetGroup: async (groupId) => {
    try {
      const response = await axiosInstance.delete(
        `/superadmin/assetGroup/delete/${groupId}`
      );
      if (response.data?.success) {
        toast.success('Asset group deleted successfully!');
        // Remove from local state
        set((state) => ({
          assetGroups: state.assetGroups.filter((g) => g._id !== groupId),
        }));
      } else {
        throw new Error(response.data?.message || 'Failed to delete asset group.');
      }
    } catch (error) {
      console.error('Error deleting asset group:', error);
      toast.error(error.message);
    }
  },

  // -----------------------------
  // 5) Fetch Assigned Assets for an Employee
  // -----------------------------
  fetchAssignedAssets: async (employeeId) => {
    set({ loadingAssignedAssets: true, errorAssignedAssets: '' });
    try {
      const response = await axiosInstance.get(`/superadmin/asset/get/${employeeId}`);
      if (response.data?.success) {
        const oldAssignedAssets = get().assignedAssets;
        set({
          assignedAssets: {
            ...oldAssignedAssets,
            [employeeId]: response.data.data || [],
          },
          loadingAssignedAssets: false,
        });
      } else {
        throw new Error(response.data?.message || 'Failed to fetch assigned assets.');
      }
    } catch (error) {
      console.error('Error fetching assigned assets:', error);
      toast.error(error.message);
      set({
        errorAssignedAssets: error.message,
        loadingAssignedAssets: false,
      });
    }
  },

  // -----------------------------
  // 6) Assign an Asset
  // -----------------------------
  assignAsset: async (employeeId, assetData, onSuccess) => {
    try {
      // assetData is typically a FormData or an object
      const formData = new FormData();
      Object.entries(assetData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('assignedTo', employeeId);

      const response = await axiosInstance.post('/superadmin/asset/add', formData);
      if (response.data?.success) {
        toast.success('Asset assigned successfully!');
        // Refresh assigned assets
        await get().fetchAssignedAssets(employeeId);
        if (onSuccess) onSuccess();
      } else {
        throw new Error(response.data?.message || 'Failed to assign asset.');
      }
    } catch (error) {
      console.error('Error assigning asset:', error);
      toast.error(error.message);
    }
  },

  // -----------------------------
  // 7) Update Asset Status
  // -----------------------------
  updateAssetStatus: async (employeeId, assetId, newStatus) => {
    try {
      const response = await axiosInstance.put(
        `/superadmin/asset/updateStatus/${assetId}`,
        { status: newStatus }
      );
      if (response.data?.success) {
        toast.success('Asset status updated successfully!');
        // Refresh assigned assets
        await get().fetchAssignedAssets(employeeId);
      } else {
        throw new Error(response.data?.message || 'Failed to update asset status.');
      }
    } catch (error) {
      console.error('Error updating asset status:', error);
      toast.error(error.message);
    }
  },

  // -----------------------------
  // 8) Delete an Asset
  // -----------------------------
  deleteAsset: async (employeeId, assetId) => {
    try {
      const response = await axiosInstance.delete(
        `/superadmin/asset/delete/${assetId}`
      );
      if (response.data?.success) {
        toast.success('Asset deleted successfully!');
        // Remove from local store
        const updated = get().assignedAssets[employeeId]?.filter(
          (item) => item._id !== assetId
        );
        set((state) => ({
          assignedAssets: {
            ...state.assignedAssets,
            [employeeId]: updated || [],
          },
        }));
      } else {
        throw new Error(response.data?.message || 'Failed to delete asset.');
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast.error(error.message);
    }
  },
}));

export default useAssetStore;
