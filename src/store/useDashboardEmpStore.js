import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';

const useDashboardEmpStore = create((set) => ({
  // State
  lineChartData: null,   // { monthly: [...], weekly: [...], yearly: { labels: [...], counts: [...] } }
  overviewData: null,    // { Today: [...], "This Week": [...], "This Month": [...] }
  activeEmployees: [],   // array of employee objects
  inactiveEmployees: [], // array of employee objects
  loading: false,
  error: null,

  // Actions
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      // Example: GET /api/dashboard
      const response = await axiosInstance.get('/superadmin/allemployees/dashboarddata');
      if (response.data.success) {
        const { lineChart, overview, employees } = response.data.data;

        set({
          lineChartData: lineChart,
          overviewData: overview,
          activeEmployees: employees.active,
          inactiveEmployees: employees.inactive,
          loading: false,
        });
      } else {
        set({
          error: response.data.message || 'Failed to fetch dashboard data',
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.message || 'Something went wrong',
        loading: false,
      });
    }
  },
}));

export default useDashboardEmpStore;
