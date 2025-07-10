
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import toast from "react-hot-toast";

const useLeaveStore = create((set, get) => ({
  
  // State variables
  leaves: [],
  availability: [],
  isLoading: false,
  availloading: false,
  availError: null,
  error: null,
  activeStatus: "all", 
  userProfile: null,
  companySettings: null,
  leaveSystem: null,
  monthlyPaidLeaves: 0,
  leaveTypes: [],

  // Update the active status (this now becomes our single source of truth)
  setActiveStatus: (status) => set({ activeStatus: status }),


  fetchLeaves: async (status) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(
        `/leaves/employee/?status=${status}`
      );
    
      set({ leaves: response.data || [] });
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Failed to fetch leaves.");
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },


  fetchUserProfile: async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      if (response.data.success) {
        set({ userProfile: response.data.response });
        return response.data.response;
      } else {
        throw new Error(response.data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile.");
      throw error;
    }
  },


  fetchCompanySettings: async () => {
    try {
      const response = await axiosInstance.get(
        "/company-settings/settings"
      );
      if (response.data.success) {
        set({ companySettings: response.data.data });
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch company settings."
        );
      }
    } catch (error) {
      console.error("Error fetching company settings:", error);
      toast.error("Failed to fetch company settings.");
      throw error;
    }
  },

  initializeData: async () => {
    try {
      const userProfile = await get().fetchUserProfile();
      const companySettings = await get().fetchCompanySettings();

     
      const employmentTypes = companySettings.employmentTypes || [];
      const leaveSystems = companySettings.leaveSystems || [];
      const employmentType = employmentTypes.find(
        (et) =>
          et.name.toLowerCase() === userProfile.employee_Type.toLowerCase()
      );

      if (employmentType) {
        const matchedLeaveSystem = leaveSystems.find(
          (ls) => ls.id === employmentType.leaveSystemId
        );
        if (matchedLeaveSystem) {
          set({
            leaveSystem: matchedLeaveSystem,
            monthlyPaidLeaves: matchedLeaveSystem.monthlyPaidLeaves || 0,
          });
        } else {
          set({
            error:
              "Your employment type does not have an associated leave system.",
          });
        }
      } else {
        set({
          error: `Your employment type "${userProfile.employee_Type}" is not configured in the system. Please contact your administrator.`,
        });
      }
    
      set({
        leaveTypes: companySettings.leaveTypes || [
          "Casual Leave",
          "Sick Leave",
          "Emergency Leave",
        ],
      });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load necessary data. Please try again later." });
    }
  },

  fetchAvailability: async (leaveTypeId) => {

    set({ availloading: true, availError: null });
    try {
      const res = await axiosInstance.get(`/leaves/leaveBalance?leaveTypeId=${leaveTypeId}`);
      set({ availability: res.data.data, availloading: false });
    } catch (error) {
      set({ availError: error.message, availloading: false });
    }
  },

  applyLeave: async (leaveData) => {
    console.log(leaveData, 'apply')
    try {
      const response = await axiosInstance.post(
        "/leaves/apply",
        leaveData,{ 
         headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        toast.success("Leave applied successfully");
        // Refresh leaves list after applying
        await get().fetchLeaves(get().activeStatus);
        // Refresh user profile to update leave balance
        const updatedProfile = await get().fetchUserProfile();
        toast.success(
          `Remaining Paid Leaves: ${updatedProfile.no_of_Paid_Leave}`
        );
      } else {
        throw new Error(response.data.message || "Failed to apply leave.");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      toast.error(error.response?.data?.message || "Failed to apply leave");
      throw error;
    }
  },
}));

export default useLeaveStore;
