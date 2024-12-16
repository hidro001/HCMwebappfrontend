


// // src/store/store.js
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       // Authentication States
//       isAuthenticated: !!localStorage.getItem('accessToken'),
//       userRole: localStorage.getItem('userRole') || '',
//       permissionRole: localStorage.getItem('permissionRole') || '',
//       userName: localStorage.getItem('userName') || '',
//       employeeId: localStorage.getItem('employeeId') || '',
//       department: localStorage.getItem('department') || '',
//       workingEmail: localStorage.getItem('workingEmail') || '',
//       phoneNumber: localStorage.getItem('phoneNumber') || '',
//       designation: localStorage.getItem('designation') || '',
//       departmentAlocated: JSON.parse(localStorage.getItem('departmentAlocated')) || [],
//       teams: JSON.parse(localStorage.getItem('teams')) || [],
//       userAvatar: localStorage.getItem('userAvatar') || '',

//       // Company Information States
//       companyInfo: JSON.parse(localStorage.getItem('companyInfo')) || null,

//       // Actions
//       login: (userData) => {
//         const {
//           accessToken,
//           userRole,
//           permissionRole,
//           userName,
//           employeeId,
//           department,
//           workingEmail,
//           phoneNumber,
//           designation,
//           departmentAlocated,
//           teams,
//           userAvatar,
//         } = userData;

//         // Update Authentication State
//         set({
//           isAuthenticated: true,
//           userRole,
//           permissionRole,
//           userName,
//           employeeId,
//           department,
//           workingEmail,
//           phoneNumber,
//           designation,
//           departmentAlocated,
//           teams,
//           userAvatar,
//         });

//         // Persist to localStorage
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('userRole', userRole);
//         localStorage.setItem('permissionRole', permissionRole);
//         localStorage.setItem('userName', userName);
//         localStorage.setItem('employeeId', employeeId);
//         localStorage.setItem('department', department);
//         localStorage.setItem('workingEmail', workingEmail);
//         localStorage.setItem('phoneNumber', phoneNumber);
//         localStorage.setItem('designation', designation);
//         localStorage.setItem('departmentAlocated', JSON.stringify(departmentAlocated));
//         localStorage.setItem('teams', JSON.stringify(teams));
//         localStorage.setItem('userAvatar', userAvatar || '');
//       },

//       setCompanyInfo: (companyData) => {
//         set({ companyInfo: companyData });
//         localStorage.setItem('companyInfo', JSON.stringify(companyData));
//       },

//       logout: () => {
//         // Clear Authentication and Company State
//         set({
//           isAuthenticated: false,
//           userRole: '',
//           permissionRole: '',
//           userName: '',
//           employeeId: '',
//           department: '',
//           workingEmail: '',
//           phoneNumber: '',
//           designation: '',
//           departmentAlocated: [],
//           teams: [],
//           userAvatar: '',
//           companyInfo: null,
//         });

//         // Remove from localStorage
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('permissionRole');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('employeeId');
//         localStorage.removeItem('department');
//         localStorage.removeItem('workingEmail');
//         localStorage.removeItem('phoneNumber');
//         localStorage.removeItem('designation');
//         localStorage.removeItem('departmentAlocated');
//         localStorage.removeItem('teams');
//         localStorage.removeItem('userAvatar');
//         localStorage.removeItem('companyInfo');
//       },
//     }),
//     {
//       name: 'auth-storage', // unique name
//     }
//   )
// );

// export default useAuthStore;


// src/store/store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useNotificationStore from './notificationStore'; // Import notification store

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Authentication States
      isAuthenticated: !!localStorage.getItem('accessToken'),
      userRole: localStorage.getItem('userRole') || '',
      permissionRole: localStorage.getItem('permissionRole') || '',
      userName: localStorage.getItem('userName') || '',
      employeeId: localStorage.getItem('employeeId') || '',
      department: localStorage.getItem('department') || '',
      workingEmail: localStorage.getItem('workingEmail') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || '',
      designation: localStorage.getItem('designation') || '',
      departmentAlocated: JSON.parse(localStorage.getItem('departmentAlocated')) || [],
      teams: JSON.parse(localStorage.getItem('teams')) || [],
      userAvatar: localStorage.getItem('userAvatar') || '',

      // Company Information States
      companyInfo: JSON.parse(localStorage.getItem('companyInfo')) || null,

      // Actions
      login: (userData) => {
        const {
          accessToken,
          userRole,
          permissionRole,
          userName,
          employeeId,
          department,
          workingEmail,
          phoneNumber,
          designation,
          departmentAlocated,
          teams,
          userAvatar,
        } = userData;

        // Update Authentication State
        set({
          isAuthenticated: true,
          userRole,
          permissionRole,
          userName,
          employeeId,
          department,
          workingEmail,
          phoneNumber,
          designation,
          departmentAlocated,
          teams,
          userAvatar,
        });

        // Persist to localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('permissionRole', permissionRole);
        localStorage.setItem('userName', userName);
        localStorage.setItem('employeeId', employeeId);
        localStorage.setItem('department', department);
        localStorage.setItem('workingEmail', workingEmail);
        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('designation', designation);
        localStorage.setItem('departmentAlocated', JSON.stringify(departmentAlocated));
        localStorage.setItem('teams', JSON.stringify(teams));
        localStorage.setItem('userAvatar', userAvatar || '');
           // Fetch notifications after login
           useNotificationStore.getState().fetchNotifications();
      },

      setCompanyInfo: (companyData) => {
        const currentCompanyInfo = get().companyInfo;
        // Deep compare current and new companyData
        if (JSON.stringify(currentCompanyInfo) !== JSON.stringify(companyData)) {
          set({ companyInfo: companyData });
          localStorage.setItem('companyInfo', JSON.stringify(companyData));
        }
        // If identical, do nothing to prevent redundant updates
      },

      logout: () => {
        // Clear Authentication and Company State
        set({
          isAuthenticated: false,
          userRole: '',
          permissionRole: '',
          userName: '',
          employeeId: '',
          department: '',
          workingEmail: '',
          phoneNumber: '',
          designation: '',
          departmentAlocated: [],
          teams: [],
          userAvatar: '',
          companyInfo: null,
        });

        // Remove from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('permissionRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('employeeId');
        localStorage.removeItem('department');
        localStorage.removeItem('workingEmail');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('designation');
        localStorage.removeItem('departmentAlocated');
        localStorage.removeItem('teams');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('companyInfo');
        useNotificationStore.getState().set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: 'auth-storage', // unique name
    }
  )
);

export default useAuthStore;
