// import { create } from 'zustand';
// import axiosInstance from '../../service/axiosInstance'; // or your own axios setup

// const usePerformanceTrendsStore = create((set, get) => ({
//   // Data shape depends on timeframe:
//   // - monthly => [{ month, year, averageScore }, ...]
//   // - yearly  => [{ year, averageScore }, ...]
//   data: null,
//   loading: false,
//   error: null,

//   // The user can pick timeframe= 'monthly' or 'yearly'
//   timeframe: 'monthly',
//   year: new Date().getFullYear(), // relevant if timeframe=monthly
//   setTimeframe: (timeframe) => set({ timeframe }),
//   setYear: (year) => set({ year }),

//   fetchPerformanceTrends: async () => {
//     set({ loading: true, error: null, data: null });
//     try {
//       const { timeframe, year } = get(); // read store state
//       let url = `/dashboard-card/performance-trends?timeframe=${timeframe}`;
//       if (timeframe === 'monthly') {
//         url += `&year=${year}`;
//       }
//       // Must be logged in => the axiosInstance includes token in headers (or interceptors)
//       const res = await axiosInstance.get(url);

//       set({
//         data: res.data.data,
//         loading: false,
//       });
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || err.message,
//         loading: false,
//         data: null,
//       });
//     }
//   },
// }));

// export default usePerformanceTrendsStore;


import { create } from 'zustand';
import axiosInstance from '../../service/axiosInstance';

const usePerformanceTrendsStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  timeframe: 'monthly',
  year: new Date().getFullYear(),
  setTimeframe: (timeframe) => set({ timeframe }),
  setYear: (year) => set({ year }),

  fetchPerformanceTrends: async () => {
    set({ loading: true, error: null, data: null });
    try {
      const { timeframe, year } = get();
      let url = `/dashboard-card/performance-trends?timeframe=${timeframe}`;
      if (timeframe === 'monthly') {
        url += `&year=${year}`;
      }
      const res = await axiosInstance.get(url);

      set({
        data: res.data.data, // Now includes ratingCount
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
        data: null,
      });
    }
  },
}));

export default usePerformanceTrendsStore;
