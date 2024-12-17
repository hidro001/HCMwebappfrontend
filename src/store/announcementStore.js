// src/store/announcementStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchAnnouncementList,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "../service/service";
import { toast } from "react-toastify";
const useAnnouncementStore = create(
  persist(
    (set, get) => ({
      announcements: [],
      loading: false,
      error: null,
      currentPage: 1,
      announcementsPerPage: 5,

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

      addAnnouncement: async (announcementDetails, token) => {
        set({ loading: true, error: null });
        try {
          const response = await addAnnouncement(announcementDetails, token);
          if (response.success) {
            toast.success("Announcement published successfully!");
            // Refresh announcements
            get().fetchAnnouncements();
          } else {
            throw new Error(
              response.message || "Failed to publish announcement"
            );
          }
        } catch (error) {
          set({ error: error.message || "Failed to publish announcement" });
          toast.error(error.message || "Failed to publish announcement");
        } finally {
          set({ loading: false });
        }
      },

      deleteAnnouncement: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await deleteAnnouncement(
            id,
            localStorage.getItem("accessToken")
          );
          if (response.success) {
            toast.success("Announcement deleted successfully!");
            // Refresh announcements
            get().fetchAnnouncements();
          } else {
            throw new Error(
              response.message || "Failed to delete announcement"
            );
          }
        } catch (error) {
          set({ error: error.message || "Failed to delete announcement" });
          toast.error(error.message || "Failed to delete announcement");
        } finally {
          set({ loading: false });
        }
      },

      updateAnnouncement: async (id, announcementDetails) => {
        set({ loading: true, error: null });
        try {
          const response = await updateAnnouncement(
            id,
            announcementDetails,
            localStorage.getItem("accessToken")
          );
          if (response.success) {
            toast.success("Announcement updated successfully!");
            // Refresh announcements
            get().fetchAnnouncements();
          } else {
            throw new Error(
              response.message || "Failed to update announcement"
            );
          }
        } catch (error) {
          set({ error: error.message || "Failed to update announcement" });
          toast.error(error.message || "Failed to update announcement");
        } finally {
          set({ loading: false });
        }
      },

      setCurrentPage: (pageNumber) => set({ currentPage: pageNumber }),
    }),
    {
      name: "announcement-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAnnouncementStore;
