
// import { create } from "zustand";
// import { toast } from "react-hot-toast";
// import attendanceService from "../service/attendanceService";

// const useAttendanceStore = create((set, get) => ({
//   // ---- State ----
//   subordinates: [],
//   departments: [],
//   stats: null,

//   loading: false,
//   error: null,

//   // ---- Actions ----

//   // Fetch subordinates
//   fetchSubordinates: async (userId) => {
//     set({ loading: true, error: null });
//     try {
//       if (!userId) throw new Error("User ID is not available.");

//       const response = await attendanceService.getSubordinates(userId);
//       const data = response.data;

//       if (data.success) {
//         set({ subordinates: data.data });
//       } else {
//         throw new Error(data.message || "Failed to fetch subordinates.");
//       }
//     } catch (err) {
//       console.error("Error fetching subordinates:", err);
//       toast.error(err.message);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },


//   // Fetch subordinates
//   fetchAllUser: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await attendanceService.getAllUser();
//       const data = response.data;

//       if (data.success) {
//         set({ subordinates: data.data });
//       } else {
//         throw new Error(data.message || "Failed to fetch subordinates.");
//       }
//     } catch (err) {
//       console.error("Error fetching subordinates:", err);
//       toast.error(err.message);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },





//   // Fetch departments
//   fetchDepartments: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await attendanceService.getDepartments();
//       const data = response.data;

//       if (data.success) {
//         set({ departments: data.data });
//       } else {
//         throw new Error(data.message || "Failed to fetch departments.");
//       }
//     } catch (err) {
//       console.error("Error fetching departments:", err);
//       toast.error(err.message);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // Fetch stats
//   fetchStats: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await attendanceService.getStats();
//       const data = response.data;

//       if (data.success) {
//         // In your example, the stats object also contains 
//         //   numberOfEmployeesOnLeaveToday, numberOfUsersLoggedInToday, etc.
//         // We store it entirely (or pick specific fields)
//         set({ stats: data });
//       } else {
//         throw new Error(data.message || "Failed to fetch stats.");
//       }
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//       toast.error(err.message);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useAttendanceStore;


// src/store/useAttendanceStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; // Adjust the path as needed

const useAttendanceStore = create((set, get) => ({
  // ---- State ----
  subordinates: [],
  departments: [],
  stats: null,
  loading: false,
  error: null,

  // ---- Actions ----

  // Fetch subordinates for a given userId
  fetchSubordinates: async (userId) => {
    set({ loading: true, error: null });
    try {
      if (!userId) throw new Error("User ID is not available.");

      const response = await axiosInstance.get("/admin/subordinates", {
        params: { userId },
      });
      const data = response.data;

      if (data.success) {
        set({ subordinates: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      console.error("Error fetching subordinates:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all users (or subordinates, based on your existing logic)
  fetchAllUser: async () => {
    set({ loading: true, error: null });
    try {
      // If a userId is needed, you can add it as a parameter and pass it here.
      const response = await axiosInstance.get("/superadmin/employees");
      const data = response.data;

      if (data.success) {
        set({ subordinates: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch subordinates.");
      }
    } catch (err) {
      console.error("Error fetching subordinates:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all departments
  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/superadmin/departments");
      const data = response.data;

      if (data.success) {
        set({ departments: data.data });
      } else {
        throw new Error(data.message || "Failed to fetch departments.");
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch stats
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/stats");
      const data = response.data;

      if (data.success) {
        // The stats object may include various fields like numberOfEmployeesOnLeaveToday, etc.
        set({ stats: data });
      } else {
        throw new Error(data.message || "Failed to fetch stats.");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      toast.error(err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAttendanceStore;
