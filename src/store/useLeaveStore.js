// src/stores/useLeaveStore.js
import {create} from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useLeaveStore = create((set, get) => ({
  leaves: [],
  userProfile: null,
  companySettings: null,
  isLoading: false,

  // Fetch assigned leaves (if status is "all" the API call omits the filter)
  fetchAssignedLeaves: async (status = 'all') => {
    set({ isLoading: true });
    try {
      let url = '/leaves/assigned';
      if (status !== 'all') {
        url += `?status=${status}`;
      }
      const response = await axiosInstance.get(url);
      // Assume the leaves are in response.data.data (or fallback to response.data)
      set({ leaves: response.data.data || response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leaves');
    } finally {
      set({ isLoading: false });
    }
  },

  // Handle (approve/reject) a leave request
  handleLeaveRequest: async (leaveId, action, reason_For_Reject) => {
    set({ isLoading: true });
    console.log(reason_For_Reject)
    try {
      const data = { action, reason_For_Reject };
      await axiosInstance.put(`/leaves/handle-leave/${leaveId}`, data);
      toast.success(`Leave request ${action} successfully`);
      // Refresh leaves after the update
      await get().fetchAssignedLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update leave request');
    } finally {
      set({ isLoading: false });
    }
  },

  // Apply for a new leave
  applyLeave: async (leaveData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('/leaves/apply', leaveData);
      toast.success('Leave applied successfully');
      // Refresh leaves after applying
      await get().fetchAssignedLeaves();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply leave');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch the user profile
  fetchUserProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/user/profile');
      set({ userProfile: response.data.response });
      return response.data.response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch user profile');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch company settings (if needed in the leave application)
  fetchCompanySettings: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/company-settings');
      set({ companySettings: response.data.data });
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch company settings');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useLeaveStore;
