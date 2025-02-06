// src/store/PostAndViewPerformersStore.js
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axiosInstance from '../service/axiosInstance';

const PostAndViewPerformersStore = create((set, get) => ({
  // ======= STATE =======
  designations: [],
  topEmployees: [],    // for "PostPerformer" (top-rated employees)
  topPerformers: [],   // for "ViewPerformer" (posted performers)
  employeeRatings: [], // for detailed ratings of an individual
  loading: false,

  // ======= ACTIONS =======

  /** Fetch designations for dropdown. */
  fetchDesignations: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get('/kpi/designations');
      const data = res.data?.data || [];
      if (Array.isArray(data) && data.length > 0) {
        set({ designations: data });
      } else {
        set({ designations: [] });
        toast.warn('No designations available to filter performers.');
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
      set({ designations: [] });
      toast.error('Failed to fetch designations.');
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Fetch top-rated employees (to display in PostPerformer table).
   * Endpoint: /kpi/ratings/top-rated?month=...&year=...&designation=...
   */
  fetchTopRatedEmployees: async (month, year, designation = '', limit = 5) => {
    set({ loading: true });
    try {
      if (!month || !year) {
        toast.error('Please select both month and year.');
        set({ loading: false });
        return;
      }

      // Prepare query params
      const params = new URLSearchParams();
      params.append('month', month);
      params.append('year', year);
      if (designation.trim()) {
        params.append('designation', designation.trim());
      }
      params.append('limit', limit);

      const res = await axiosInstance.get(`/kpi/ratings/top-rated?${params}`);
      const data = res.data?.data || [];

      set({ topEmployees: data });
      if (!data.length) {
        toast.info('No top-rated employees found for the selected criteria.');
      }
    } catch (error) {
      console.error('Error fetching top rated employees:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch top rated employees.');
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Post "Performer of the Month" (from the PostPerformerModal).
   * Endpoint: /kpi/posttopperformance
   */
  postTopPerformer: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/kpi/posttopperformance', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(res.data?.message || 'Successfully posted top performer.');
      // Optionally: after posting, you might want to refresh or reset something
    } catch (error) {
      console.error('Error posting top performer:', error);
      const msg = error.response?.data?.message || 'Failed to post top performer.';
      toast.error(msg);
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Fetch posted top performers (for "ViewPerformer").
   * Endpoint: /kpi/gettopperformance?month=...&year=...&designation=...
   */
  fetchTopPerformers: async (month, year, designation = '') => {
    set({ loading: true });
    try {
      const params = new URLSearchParams();
      params.append('month', month);
      params.append('year', year);
      if (designation.trim()) {
        params.append('designation', designation.trim());
      }

      const res = await axiosInstance.get(`/kpi/gettopperformance?${params}`);
      const data = res.data?.data;

      let finalArray = [];
      if (Array.isArray(data)) {
        finalArray = data;
      } else if (data) {
        finalArray = [data];
      }
      set({ topPerformers: finalArray });

      if (!finalArray.length) {
        toast.info('No top performers found for the selected criteria.');
      }
    } catch (error) {
      console.error('Error fetching top performers:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch top performers.');
      set({ topPerformers: [] });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Fetch detailed ratings of an employee, e.g. /kpi/ratings/employee/:employeeId
   */
  fetchEmployeeRatings: async (employeeId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/kpi/ratings/employee/${employeeId}`);
      const data = res.data?.data || [];
   
      set({ employeeRatings: data });
    } catch (error) {
      console.error('Error fetching employee ratings:', error);
      if (error.response?.status === 404) {
        toast.error('Employee not found or no ratings available.');
      } else {
        toast.error('Failed to fetch employee ratings.');
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default PostAndViewPerformersStore;
