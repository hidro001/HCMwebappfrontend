import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useResignationStore = create((set, get) => ({
  resignations: [],
  chartData: null,
  loading: false,
  totalPages: 1,
  totalResignations: 0,
  // Filters: search text, status, year and month.
  filters: {
    search: "",
    status: "",
    year: "",
    month: "",
  },
  currentPage: 1,
  
  fetchResignations: async () => {
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
