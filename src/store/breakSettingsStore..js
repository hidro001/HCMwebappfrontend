// src/store/breakSettingsStore.js
import {create} from 'zustand';
import axiosInstance from '../service/axiosInstance';
import toast from 'react-hot-toast';

const useBreakSettingsStore = create((set, get) => ({
  breakRecords: [],
  loading: false,
  uniqueApps: [],
  uniqueWebsites: [],
  error: null,
  /* per‑department tags */
  deptCategories: { productive: [], unproductive: [], unrated: [] },

  // Fetch all break records from the API
  fetchBreakRecords: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/break/get');
      if (response.data.success) {
        set({ breakRecords: response.data.data || [] });
        // You can uncomment the next line if you want a success message on fetch.
        // toast.success('Break records fetched successfully.');
      } else {
        toast.error(response.data.message || 'Failed to fetch break data.');
      }
    } catch (error) {
      console.error('Error fetching break data:', error);
      toast.error('An error occurred while fetching break data.');
    } finally {
      set({ loading: false });
    }
  },

  // Add a new break record
  addBreakRecord: async (breakData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/break/add', {
        // Ensure numeric values for breakHours and autoBreakMinutes
        ...breakData,
        breakHours: breakData.breakHours || 0,
        autoBreakMinutes: breakData.autoBreakMinutes || 0,
      });
      if (response.data.success) {
        toast.success('Break record saved successfully!');
        // Refresh the list after a successful add
        get().fetchBreakRecords();
      } else {
        toast.error(response.data.message || 'Failed to save break data.');
      }
    } catch (error) {
      console.error('Error saving break data:', error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while saving break data.'
      );
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing break record by its ID
  updateBreakRecord: async (id, breakData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/break/edit/${id}`, {
        ...breakData,
        breakHours: breakData.breakHours || 0,
        autoBreakMinutes: breakData.autoBreakMinutes || 0,
      });
      if (response.data.success) {
        toast.success('Break record updated successfully!');
        get().fetchBreakRecords();
      } else {
        toast.error(response.data.message || 'Failed to update break data.');
      }
    } catch (error) {
      console.error('Error updating break data:', error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while updating break data.'
      );
    } finally {
      set({ loading: false });
    }
  },

  // Delete a break record by its ID
  deleteBreakRecord: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete(`/break/delete/${id}`);
      if (response.data.success) {
        toast.success('Break record deleted successfully!');
        get().fetchBreakRecords();
      } else {
        toast.error(response.data.message || 'Failed to delete break record.');
      }
    } catch (error) {
      console.error('Error deleting break record:', error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while deleting break record.'
      );
    } finally {
      set({ loading: false });
    }
  },

  //To fetch all departments available in the organisation

  fetchDepartments: async () => {
    try {
      const response = await axiosInstance.get(`/departments`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  //To fetch unique apps and websites used throughout the organisation

  fetchUniqueUsage: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/usage-stats/webandappdata");
      if (res.data.success) {
        set({
          uniqueApps: res.data.data.uniqueApps,
          uniqueWebsites: res.data.data.uniqueWebsites,
        });
      }
    } catch (err) {
      toast.error("Failed to fetch unique usage data");
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchDeptCategories: async (deptName) => {
    if (!deptName) return;
    set({ loading: true });
    try {
      const trimmedDeptName = deptName.trim();  // <- trim here
      const res = await axiosInstance.get(
        `/usage-stats/department/${encodeURIComponent(trimmedDeptName)}`
      );
      if (res.data.success) {
        const d = res.data.data || {};
        set({
          deptCategories: {
            productive: d.productive || [],
            unproductive: d.unproductive || [],
            unrated: d.unrated || [],
          },
        });
      } else {
        toast.error(res.data.message || "Failed to fetch categories.");
      }
    } catch (err) {
      toast.error("Failed to fetch categories.");
    } finally {
      set({ loading: false });
    }
  },
  
  saveDeptCategories: async (deptName, ratings) => {
    set({ loading: true });
    try {
      const payload = { apps: [], websites: [] };
      Object.entries(ratings).forEach(([name, category]) => {
        if (!category) return;
        const isUrl = name.includes(".") || name.includes(" ");
        (isUrl ? payload.websites : payload.apps).push({ name, category });
      });
  
      const trimmedDeptName = deptName.trim(); // <- trim here as well
  
      const res = await axiosInstance.put(
        `/usage-stats/department/${encodeURIComponent(trimmedDeptName)}/bulk`,
        payload
      );
  
      if (res.data.success) {
        toast.success("Categories saved!");
        await get().fetchDeptCategories(trimmedDeptName);
      } else {
        toast.error(res.data.message || "Save failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed.");
    } finally {
      set({ loading: false });
    }
  },
  

}));

export default useBreakSettingsStore;
