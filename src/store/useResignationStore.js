
import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';

const useResignationStore = create((set, get) => ({
  // Common state
  resignations: [],
  loading: false,
  error: null,

  // Employee-specific state
  resignation: null,
  employeeFnf: null, 

  // Superadmin-specific state
  chartData: null,
  totalPages: 1,
  totalResignations: 0,
  filters: {
    search: "",
    status: "",
    year: "",
    month: "",
  },
  currentPage: 1,

  //------------------------------------------
  // Employee Methods
  //------------------------------------------

  // Fetch resignation history for an employee
  fetchEmployeeResignations: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/resignation/history/employee');
      const resignations = response.data.resignations;
      set({
        resignations,
        resignation: resignations.length > 0 ? resignations[0] : null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching resignation history',
        loading: false,
      });
      toast.error(error.response?.data?.message || 'Error fetching resignation history');
    }
  },

  // Fetch the employee's FNF details
  fetchEmployeeFnf: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/fnf/status');
      set({
        employeeFnf: res.data?.fnf || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching FNF details',
        loading: false,
      });
      toast.error(error.response?.data?.message || 'Error fetching FNF details');
    }
  },

  // Submit a new resignation
  submitResignation: async ({ resignationDate, lastWorkingDayCompany, lastWorkingDayUser, comments }) => {
    if (new Date(resignationDate) > new Date(lastWorkingDayUser)) {
      toast.error("Last working day must be after resignation date.");
      throw new Error("Invalid dates");
    }
    try {
      const res = await axiosInstance.post('/resignation/submit', {
        resignationDate,
        lastWorkingDayCompany, 
        lastWorkingDayUser,
        comments,
      });
      toast.success(res.data.message);
      await get().fetchEmployeeResignations();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting resignation");
      throw error;
    }
  },

  // Withdraw a resignation
  withdrawResignation: async () => {
    try {
      const res = await axiosInstance.delete('/resignation/withdraw');
      toast.success(res.data.message);
      await get().fetchEmployeeResignations();
      // Also refresh FNF since withdrawing might affect it
      await get().fetchEmployeeFnf();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error withdrawing resignation");
      throw error;
    }
  },

  // Request FNF
  requestFNF: async () => {
    try {
      const res = await axiosInstance.post('/fnf/request', {});
      toast.success(res.data.message);
      await get().fetchEmployeeResignations();
      await get().fetchEmployeeFnf();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error requesting FNF");
      throw error;
    }
  },

  //------------------------------------------
  // Superadmin Methods (Optional)
  //------------------------------------------
  fetchSuperadminResignations: async () => {
    set({ loading: true });
    const { filters, currentPage } = get();
    let query = `?page=${currentPage}&limit=10`;
    if (filters.search) query += `&search=${encodeURIComponent(filters.search)}`;
    if (filters.status) query += `&status=${filters.status}`;
    if (filters.year) query += `&year=${filters.year}`;
    if (filters.month) query += `&month=${filters.month}`;
    try {
      const response = await axiosInstance.get(`/resignation/superadmin/history${query}`);
      set({
        resignations: response.data.resignations,
        chartData: response.data.chartData,
        totalPages: response.data.totalPages,
        totalResignations: response.data.totalResignations,
        loading: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching resignations");
      set({ loading: false });
    }
  },

  // Set or update filters for superadmin usage
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  // Set current page for pagination
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useResignationStore;
