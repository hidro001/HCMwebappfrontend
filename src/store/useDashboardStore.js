// // src/stores/useDashboardStore.js

// import { create } from 'zustand';
// // import axiosInstance from '../services/axiosInstance'; // <--- your custom axios instance
// import axiosInstance from "../service/axiosInstance";

// export const useDashboardStore = create((set) => ({
//   totalUsers: 0,
//   usersLoggedInToday: 0,
//   employeesOnLeaveToday: 0,

//   // Fetches main dashboard stats
//   fetchDashboardStats: async () => {
//     try {
//       const response = await axiosInstance.get('/admin/stats'); 
//       if (response.data.success) {
//         set({
//           totalUsers: response.data.totalUsers ?? 0,
//           usersLoggedInToday: response.data.numberOfUsersLoggedInToday ?? 0,
//           employeesOnLeaveToday: response.data.numberOfEmployeesOnLeaveToday ?? 0,
//           // ...any other data you need to store
//         });
//       } else {
//         console.error('Failed to fetch dashboard stats:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//     }
//   },

//   // For “View Details” on the "Users Logged In Today" card
//   fetchAttendanceDetails: async () => {
//     try {
//       const response = await axiosInstance.get('/admin/attendance-details');
//       // console.log('Attendance details:', response.data);
//       // Handle or store the details as needed
//     } catch (error) {
//       console.error('Error fetching attendance details:', error);
//     }
//   },

//   // For “View Details” on the "Employees On Leave Today" card
//   fetchLeaveDetails: async () => {
//     try {
//       const response = await axiosInstance.get('/admin/leave-details');
//       // console.log('Leave details:', response.data);
//       // Handle or store the details as needed
//     } catch (error) {
//       console.error('Error fetching leave details:', error);
//     }
//   },
// }));

// // src/stores/useDashboardStore.js
// import { create } from 'zustand';
// import axiosInstance from '../service/axiosInstance'; // Your custom axios setup

// export const useDashboardStore = create((set) => ({
//   // State values you want to track
//   totalUsers: 0,
//   usersLoggedInToday: 0,
//   employeesOnLeaveToday: 0,
//   employeesPerDepartment: [],
//   maleCount: 0,
//   femaleCount: 0,
//   monthlyHiringTrend: [],
//   salaryRange: [],
//   ageDistribution: [],
//   totalSalaries: 0,

//   // Fetches main dashboard stats
//   fetchDashboardStats: async () => {
//     try {
//       // Hitting /admin/stats (baseURL is set in axiosInstance)
//       const response = await axiosInstance.get('/admin/stats');
//       if (response.data.success) {
//         set({
//           totalUsers: response.data.totalUsers ?? 0,
//           usersLoggedInToday: response.data.numberOfUsersLoggedInToday ?? 0,
//           employeesOnLeaveToday: response.data.numberOfEmployeesOnLeaveToday ?? 0,
//           employeesPerDepartment: Array.isArray(response.data.employeesPerDepartment)
//             ? response.data.employeesPerDepartment
//             : [],
//             employeesPerEmployeeType: Array.isArray(response.data.employeesPerEmployeeType)
//             ? response.data.employeesPerEmployeeType
//             : [], // fallback to []
//           maleCount: response.data.maleCount ?? 0,
//           femaleCount: response.data.femaleCount ?? 0,
//           monthlyHiringTrend: Array.isArray(response.data.monthlyHiringTrend)
//             ? response.data.monthlyHiringTrend
//             : [],
//           salaryRange: Array.isArray(response.data.salaryRange)
//             ? response.data.salaryRange
//             : [],
//           ageDistribution: Array.isArray(response.data.ageDistribution)
//             ? response.data.ageDistribution
//             : [],
//           totalSalaries: response.data.totalSalaries ?? 0,
//         });

//       } else {
//         console.error('Failed to fetch dashboard stats:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//     }
//   },

//   // Example: fetchAttendanceDetails
//   fetchAttendanceDetails: async () => {
//     try {
//       const response = await axiosInstance.get('/admin/attendance-details');
//       // Store or handle data as needed
//     } catch (error) {
//       console.error('Error fetching attendance details:', error);
//     }
//   },

//   // Example: fetchLeaveDetails
//   fetchLeaveDetails: async () => {
//     try {
//       const response = await axiosInstance.get('/admin/leave-details');
//       // Store or handle data as needed
//     } catch (error) {
//       console.error('Error fetching leave details:', error);
//     }
//   },
// }));

import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance'; // Your custom axios setup

export const useDashboardStore = create((set) => ({
  totalUsers: 0,
  usersLoggedInToday: 0,
  employeesOnLeaveToday: 0,
  employeesPerDepartment: [],
  employeesPerEmployeeType: [], // You added this
  maleCount: 0,
  femaleCount: 0,
  monthlyHiringTrend: [],
  salaryRange: [],
  ageDistribution: [],
  totalSalaries: 0,

  // Fetches main dashboard stats
  fetchDashboardStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/stats');
      if (response.data.success) {
        set({
          totalUsers: response.data.totalUsers ?? 0,
          usersLoggedInToday: response.data.numberOfUsersLoggedInToday ?? 0,
          employeesOnLeaveToday: response.data.numberOfEmployeesOnLeaveToday ?? 0,
          employeesPerDepartment: Array.isArray(response.data.employeesPerDepartment)
            ? response.data.employeesPerDepartment
            : [],
          employeesPerEmployeeType: Array.isArray(response.data.employeesPerEmployeeType)
            ? response.data.employeesPerEmployeeType
            : [],
          maleCount: response.data.maleCount ?? 0,
          femaleCount: response.data.femaleCount ?? 0,
          monthlyHiringTrend: Array.isArray(response.data.monthlyHiringTrend)
            ? response.data.monthlyHiringTrend
            : [],
          salaryRange: Array.isArray(response.data.salaryRange)
            ? response.data.salaryRange
            : [],
          ageDistribution: Array.isArray(response.data.ageDistribution)
            ? response.data.ageDistribution
            : [],
          totalSalaries: response.data.totalSalaries ?? 0,
        });
      } else {
        console.error('Failed to fetch dashboard stats:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  },

  // For attendance details
  fetchAttendanceDetails: async () => {
    try {
      await axiosInstance.get('/admin/attendance-details');
      // Handle as needed
    } catch (error) {
      console.error('Error fetching attendance details:', error);
    }
  },

  // For leave details
  fetchLeaveDetails: async () => {
    try {
      await axiosInstance.get('/admin/leave-details');
      // Handle as needed
    } catch (error) {
      console.error('Error fetching leave details:', error);
    }
  },
}));
