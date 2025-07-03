import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const leaveTypeStore = create((set, get) => ({
  leaveTypes: [],
  assignedLeaveTypes: [],
  activeLeaveTypes: [],
  leaveTypeStats: null,
  isLoading: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  fetchLeaveTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/leaves-types/leave-type');
      set({ 
        leaveTypes: res.data?.data || [], 
        isLoading: false 
      });
    } catch (error) {
      console.error('[fetchLeaveTypes] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch leave types',
        isLoading: false 
      });
      toast.error('Failed to fetch leave types.');
    }
  },

  fetchLeaveTypeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/leaves-types/leave-type/${id}`);
      set({ isLoading: false });
      return res.data?.data || null;
    } catch (error) {
      console.error('[fetchLeaveTypeById] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch leave type',
        isLoading: false 
      });
      toast.error('Failed to fetch leave type.');
      return null;
    }
  },

  fetchAssignedLeaveTypeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/leaves-types/assigned-leave-type/${id}`);
      set({ 
         assignedLeaveTypes: res.data?.data || [], 
        isLoading: false
       });
    } catch (error) {
      console.error('[fetchAssignedLeaveTypeById] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch leave type',
        isLoading: false 
      });
      toast.error('Failed to fetch leave type.');
      return null;
    }
  },

  fetchActiveLeaveTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/leaves-types/active');
      set({ 
        activeLeaveTypes: res.data?.data || [], 
        isLoading: false 
      });
    } catch (error) {
      console.error('[fetchActiveLeaveTypes] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch active leave types',
        isLoading: false 
      });
      toast.error('Failed to fetch active leave types.');
    }
  },

  fetchLeaveTypesByCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/leaves-types/category/${category}`);
      set({ isLoading: false });
      return res.data?.data || [];
    } catch (error) {
      console.error('[fetchLeaveTypesByCategory] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch leave types by category',
        isLoading: false 
      });
      toast.error('Failed to fetch leave types by category.');
      return [];
    }
  },

  fetchLeaveTypeStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/leaves-types/stat');
      set({ 
        leaveTypeStats: res.data?.data || null, 
        isLoading: false 
      });
    } catch (error) {
      console.error('[fetchLeaveTypeStats] Error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch leave type statistics',
        isLoading: false 
      });
      toast.error('Failed to fetch leave type statistics.');
    }
  },

  createLeaveType: async (leaveTypeData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post('/leaves-types/create-leave-type', leaveTypeData);
      
      // Add the new leave type to the current list
      const newLeaveType = res.data?.data;
      set((state) => ({
        leaveTypes: [...state.leaveTypes, newLeaveType],
        isLoading: false
      }));
      
      toast.success('Leave type created successfully.');
      return newLeaveType;
    } catch (error) {
      console.error('[createLeaveType] Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create leave type';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      toast.error(errorMessage);
      return null;
    }
  },

  updateLeaveType: async (id, leaveTypeData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.put(`/leaves-types/update/${id}`, leaveTypeData);
      
      // Update the leave type in the current list
      const updatedLeaveType = res.data?.data;
      set((state) => ({
        leaveTypes: state.leaveTypes.map(lt => 
          lt._id === id ? updatedLeaveType : lt
        ),
        isLoading: false
      }));
      
      toast.success('Leave type updated successfully.');
      return updatedLeaveType;
    } catch (error) {
      console.error('[updateLeaveType] Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update leave type';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      toast.error(errorMessage);
      return null;
    }
  },

  addOrUpdateLeaveType: async (leaveTypeData) => {
    if (leaveTypeData.id || leaveTypeData._id) {
      const id = leaveTypeData.id || leaveTypeData._id;
      // Remove id from data before sending to API
      const { id: _, _id: __, ...dataWithoutId } = leaveTypeData;
      return await get().updateLeaveType(id, dataWithoutId);
    } else {
      return await get().createLeaveType(leaveTypeData);
    }
  },

  toggleLeaveTypeStatus: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/leaves-types/leave-status/${id}`);
      
      // Update the leave type status in the current list
      const updatedLeaveType = res.data?.data;
      set((state) => ({
        leaveTypes: state.leaveTypes.map(lt => 
          lt._id === id ? updatedLeaveType : lt
        ),
        isLoading: false
      }));
      
      const statusText = updatedLeaveType.isActive ? 'activated' : 'deactivated';
      toast.success(`Leave type ${statusText} successfully.`);
      return updatedLeaveType;
    } catch (error) {
      console.error('[toggleLeaveTypeStatus] Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to toggle leave type status';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      toast.error(errorMessage);
      return null;
    }
  },

  deleteLeaveType: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/leaves-types/delete`, {
        data: { id } 
      });

      set((state) => ({
        leaveTypes: state.leaveTypes.filter(lt => lt._id !== id),
        isLoading: false
      }));
      
      toast.success('Leave type deleted successfully.');
      return true;
    } catch (error) {
      console.error('[deleteLeaveType] Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete leave type';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      toast.error(errorMessage);
      return false;
    }
  },

  clearError: () => set({ error: null }),

  resetStore: () => set({
    leaveTypes: [],
    activeLeaveTypes: [],
    leaveTypeStats: null,
    isLoading: false,
    error: null
  })
}));

export default leaveTypeStore;