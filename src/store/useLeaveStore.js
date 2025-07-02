import {create} from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useLeaveStore = create((set, get) => ({
  leaves: [],
  monthlyLeave: [],
  userProfile: null,
  companySettings: null,
  isLoading: false,
  monthlyLeaveLoading: false,

  fetchAssignedLeaves: async (status = 'all') => {
    set({ isLoading: true });
    try {
      let url = '/leaves/assigned';
      if (status !== 'all') {
        url += `?status=${status}`;
      }
      const response = await axiosInstance.get(url);
      console.log(response.data, 'response')
      set({ leaves: response.data.data || response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leaves');
    } finally {
      set({ isLoading: false });
    }
  },

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

  fetchMonthlySummary: async (month) => {
    console.log('kjfd')
    set({ monthlyLeaveLoading: true});
    try {
      const res = await axiosInstance.get(`/leaves/monthly-summary?month=${month}`);
      set({ monthlyLeave: res.data.data, monthlyLeaveLoading: false });

    } catch (error) {
      console.log(error)
      set({ monthlyLeaveLoading: false });
    }
  }
}));

export default useLeaveStore;
