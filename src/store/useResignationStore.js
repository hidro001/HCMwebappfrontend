

// import { create } from 'zustand';
// import axiosInstance from '../service/axiosInstance';
// import { toast } from 'react-toastify';

// const useResignationStore = create((set, get) => ({
//   // Common state
//   resignations: [],
//   loading: false,
//   error: null,

//   // Employee-specific state: latest resignation record
//   resignation: null,

//   // Superadmin-specific state
//   chartData: null,
//   totalPages: 1,
//   totalResignations: 0,
//   filters: {
//     search: "",
//     status: "",
//     year: "",
//     month: "",
//   },
//   currentPage: 1,

//   // ---------------------------
//   // Employee Methods
//   // ---------------------------

//   // Fetch resignation history for an employee
//   fetchEmployeeResignations: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axiosInstance.get('/resignation/history/employee');
//       const resignations = response.data.resignations;
//       set({
//         resignations,
//         resignation: resignations.length > 0 ? resignations[0] : null,
//         loading: false,
//       });
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || 'Error fetching resignation history',
//         loading: false,
//       });
//       toast.error(error.response?.data?.message || 'Error fetching resignation history');
//     }
//   },

//   // Submit resignation with date validation
//   submitResignation: async ({ resignationDate, lastWorkingDay, comments }) => {
//     if (new Date(resignationDate) > new Date(lastWorkingDay)) {
//       toast.error("Last working day must be after resignation date.");
//       throw new Error("Invalid dates");
//     }
//     try {
//       const res = await axiosInstance.post('/resignation/submit', {
//         resignationDate,
//         lastWorkingDay,
//         comments,
//       });
//       toast.success(res.data.message);
//       // Refresh employee resignation data after submission
//       await get().fetchEmployeeResignations();
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error submitting resignation");
//       throw error;
//     }
//   },

//   // Withdraw resignation
//   withdrawResignation: async () => {
//     try {
//       const res = await axiosInstance.delete('/resignation/withdraw');
//       toast.success(res.data.message);
//       await get().fetchEmployeeResignations();
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error withdrawing resignation");
//       throw error;
//     }
//   },

//   // Request FNF (Full and Final Settlement)
//   requestFNF: async () => {
//     try {
//       const res = await axiosInstance.post('/fnf/request', {});
//       toast.success(res.data.message);
//       await get().fetchEmployeeResignations();
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error requesting FNF");
//       throw error;
//     }
//   },

//   // ---------------------------
//   // Superadmin Methods
//   // ---------------------------

//   // Fetch resignations with filters and pagination for superadmin
//   fetchSuperadminResignations: async () => {
//     set({ loading: true });
//     const { filters, currentPage } = get();
//     let query = `?page=${currentPage}&limit=10`;
//     if (filters.search) query += `&search=${encodeURIComponent(filters.search)}`;
//     if (filters.status) query += `&status=${filters.status}`;
//     if (filters.year) query += `&year=${filters.year}`;
//     if (filters.month) query += `&month=${filters.month}`;
//     try {
//       const response = await axiosInstance.get(`/resignation/superadmin/history${query}`);
//       set({
//         resignations: response.data.resignations,
//         chartData: response.data.chartData,
//         totalPages: response.data.totalPages,
//         totalResignations: response.data.totalResignations,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching resignations", error);
//       toast.error(error.response?.data?.message || "Error fetching resignations");
//       set({ loading: false });
//     }
//   },

//   // Update filters (for superadmin view)
//   setFilters: (newFilters) =>
//     set((state) => ({ filters: { ...state.filters, ...newFilters } })),

//   // Update current page (for superadmin pagination)
//   setCurrentPage: (page) => set({ currentPage: page }),
// }));

// export default useResignationStore;



import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-toastify';

const useResignationStore = create((set, get) => ({
  // Common state
  resignations: [],
  loading: false,
  error: null,

  // Employee-specific state: latest resignation record
  resignation: null,

  // ===== NEW: hold the FNF details for the currently logged-in user =====
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

  // ---------------------------
  // Employee Methods
  // ---------------------------

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

  // ===== NEW: fetch employee FNF details =====
  fetchEmployeeFnf: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/fnf/status');
      // If there's no FNF record yet, API might return an empty object or null
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

  // Submit resignation with date validation
  submitResignation: async ({ resignationDate, lastWorkingDay, comments }) => {
    if (new Date(resignationDate) > new Date(lastWorkingDay)) {
      toast.error("Last working day must be after resignation date.");
      throw new Error("Invalid dates");
    }
    try {
      const res = await axiosInstance.post('/resignation/submit', {
        resignationDate,
        lastWorkingDay,
        comments,
      });
      toast.success(res.data.message);
      // Refresh employee resignation data after submission
      await get().fetchEmployeeResignations();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting resignation");
      throw error;
    }
  },

  // Withdraw resignation
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

  // Request FNF (Full and Final Settlement)
  requestFNF: async () => {
    try {
      const res = await axiosInstance.post('/fnf/request', {});
      toast.success(res.data.message);
      // Refresh both resignation & fnf
      await get().fetchEmployeeResignations();
      await get().fetchEmployeeFnf();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error requesting FNF");
      throw error;
    }
  },

  // ---------------------------
  // Superadmin Methods
  // ---------------------------
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
      console.error("Error fetching resignations", error);
      toast.error(error.response?.data?.message || "Error fetching resignations");
      set({ loading: false });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useResignationStore;
