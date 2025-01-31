// // src/store/departmentStore.js
// import {create} from 'zustand';
// import { persist } from 'zustand/middleware';
// import {fetchDepartments} from '../service/service';
// import { toast } from 'react-toastify';

// const useDepartmentStore = create(
//   persist(
//     (set) => ({
//       departments: [],
//       loading: false,
//       error: null,

//       fetchDepartments: async () => {
//         set({ loading: true, error: null });
//         try {
//           const data = await fetchDepartments();
//           if (data.success) {
//             set({ departments: data.data });
//           } else {
//             throw new Error(data.message || 'Failed to fetch departments');
//           }
//         } catch (error) {
//           set({ error: error.message || 'Failed to fetch departments' });
//           toast.error(error.message || 'Failed to fetch departments');
//         } finally {
//           set({ loading: false });
//         }
//       },
//     }),
//     {
//       name: 'department-storage',
//       getStorage: () => localStorage,
//     }
//   )
// );

// export default useDepartmentStore;


// src/store/departmentStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchDepartments } from '../service/service';
import { toast } from 'react-hot-toast';

const useDepartmentStore = create(
  persist(
    (set) => ({
      departments: [],
      loading: false,
      error: null,

      fetchDepartments: async () => {
        set({ loading: true, error: null });
        try {
          const data = await fetchDepartments();
          if (data.success) {
            set({ departments: data.data });
          } else {
            throw new Error(data.message || 'Failed to fetch departments');
          }
        } catch (error) {
          set({ error: error.message || 'Failed to fetch departments' });
          toast.error(error.message || 'Failed to fetch departments');
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'department-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useDepartmentStore;
