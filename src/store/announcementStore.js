
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../service/axiosInstance"; // Adjust the path as needed
import { toast } from "react-toastify";

const useAnnouncementStore = create(
  persist(
    (set, get) => ({
      announcements: [],
      loading: false,
      error: null,

      // Fetch Announcements
      fetchAnnouncements: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.get("/admin/announcement");
          const data = response.data;
          if (data.success) {
            set({ announcements: data.data });
          } else {
            throw new Error(data.message || "Failed to fetch announcements");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to fetch announcements";
          set({ error: errorMessage });
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      // Fetch Announcements user
      fetchAnnouncementsuser: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.get("/admin/announcement-user");
          const data = response.data;
          if (data.success) {
            set({ announcements: data.data });
          } else {
            throw new Error(data.message || "Failed to fetch announcements");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to fetch announcements";
          set({ error: errorMessage });
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },



      // Add Announcement
      addAnnouncement: async (announcementDetails, token) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post(
            "/admin/announcement",
            announcementDetails,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const data = response.data;
          if (data.success) {
            toast.success("Announcement published successfully!");
            // Refresh announcements list
            await get().fetchAnnouncements();
          } else {
            throw new Error(data.message || "Failed to publish announcement");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to publish announcement";
          set({ error: errorMessage });
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      // Delete Announcement
      deleteAnnouncement: async (id) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axiosInstance.delete(`/admin/announcement/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          if (data.success) {
            toast.success("Announcement deleted successfully!");
            // Refresh announcements list
            await get().fetchAnnouncements();
          } else {
            throw new Error(data.message || "Failed to delete announcement");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to delete announcement";
          set({ error: errorMessage });
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      // Update Announcement
      updateAnnouncement: async (id, announcementDetails) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axiosInstance.put(
            `/admin/announcement/${id}`,
            announcementDetails,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                // When sending FormData, the browser will set the correct Content-Type automatically.
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const data = response.data;
          if (data.success) {
            toast.success("Announcement updated successfully!");
            // Refresh announcements list
            await get().fetchAnnouncements();
          } else {
            throw new Error(data.message || "Failed to update announcement");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to update announcement";
          set({ error: errorMessage });
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      
    }),
    {
      name: "announcement-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAnnouncementStore;

