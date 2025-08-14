// src/store/notificationStore.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI,
} from '../service/service'; // Adjust the path as necessary


const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      loading: false,
      error: null,
      fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
          const data = await fetchNotificationsAPI();
          set({ notifications: data, unreadCount: data.filter(n => !n.isRead).length });
        } catch (error) {
          set({ error: error.message || 'Failed to fetch notifications' });
        } finally {
          set({ loading: false });
        }
      },

    
      markAsRead: async (notificationId) => {
        try {
          await markNotificationAsReadAPI(notificationId);
          set(state => {
            const updatedNotifications = state.notifications.map(notification =>
              notification.id === notificationId ? { ...notification, isRead: true } : notification
            );
            return {
              notifications: updatedNotifications,
              unreadCount: updatedNotifications.filter(n => !n.isRead).length,
            };
          });
        } catch (error) {
          set({ error: error.message || 'Failed to mark notification as read' });
        }
      },

      // Optional: Mark all notifications as read
      markAllAsRead: async () => {
        try {
          await markNotificationAsReadAPI(null); // Assuming backend handles marking all as read if ID is null
          set({
            notifications: get().notifications.map(n => ({ ...n, isRead: true })),
            unreadCount: 0,
          });
        } catch (error) {
          set({ error: error.message || 'Failed to mark all notifications as read' });
        }
      },

      // Clear notifications (e.g., on logout)
      clearNotifications: () => set({ notifications: [], unreadCount: 0, error: null }),
    }),
    {
      name: 'notification-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useNotificationStore;