// src/store.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
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
        } = userData;
        
        // Update state
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
      },
      
      logout: () => {
        // Clear state
        set({
          isAuthenticated: false,
          userRole: '',
          permissionRole:"",
          userName: '',
          employeeId: '',
          department: '',
          workingEmail: '',
          phoneNumber: '',
          designation: '',
          departmentAlocated: [],
          teams: [],
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
      },
    }),
    {
      name: 'auth-storage', // unique name
    }
  )
);

export default useAuthStore;
