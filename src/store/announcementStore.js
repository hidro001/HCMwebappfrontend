// src/store/announcementStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchAnnouncementList,
  addAnnouncement as addAnnouncementAPI,
  deleteAnnouncement as deleteAnnouncementAPI,
  updateAnnouncement as updateAnnouncementAPI,
} from "../service/service";
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
          const data = await fetchAnnouncementList();
          if (data.success) {
            set({ announcements: data.data });
          } else {
            throw new Error(data.message || "Failed to fetch announcements");
          }
        } catch (error) {
          set({ error: error.message || "Failed to fetch announcements" });
          toast.error(error.message || "Failed to fetch announcements");
        } finally {
          set({ loading: false });
        }
      },

      // Add Announcement
      addAnnouncement: async (announcementDetails, token) => {
        set({ loading: true, error: null });
        try {
          const response = await addAnnouncementAPI(announcementDetails, token);
          if (response.success) {
            toast.success("Announcement published successfully!");
            // Refresh announcements
            await get().fetchAnnouncements();
          } else {
            throw new Error(response.message || "Failed to publish announcement");
          }
        } catch (error) {
          set({ error: error.message || "Failed to publish announcement" });
          toast.error(error.message || "Failed to publish announcement");
        } finally {
          set({ loading: false });
        }
      },

      // Delete Announcement
      deleteAnnouncement: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await deleteAnnouncementAPI(
            id,
            localStorage.getItem("accessToken")
          );
          if (response.success) {
            toast.success("Announcement deleted successfully!");
            // Refresh announcements
            await get().fetchAnnouncements();
          } else {
            throw new Error(response.message || "Failed to delete announcement");
          }
        } catch (error) {
          set({ error: error.message || "Failed to delete announcement" });
          toast.error(error.message || "Failed to delete announcement");
        } finally {
          set({ loading: false });
        }
      },

      // Update Announcement
      updateAnnouncement: async (id, announcementDetails) => {
        set({ loading: true, error: null });
        try {
          const response = await updateAnnouncementAPI(
            id,
            announcementDetails,
            localStorage.getItem("accessToken")
          );
          if (response.success) {
            toast.success("Announcement updated successfully!");
            // Refresh announcements
            await get().fetchAnnouncements();
          } else {
            throw new Error(response.message || "Failed to update announcement");
          }
        } catch (error) {
          set({ error: error.message || "Failed to update announcement" });
          toast.error(error.message || "Failed to update announcement");
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

