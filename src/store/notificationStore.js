// src/store/notificationStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markAsReadAPI,
} from '../service/service';
import useAuthStore from './store'; // Importing auth store for access token

const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [], // Array to store notifications
      unreadCount: 0,    // Count of unread notifications
      isLoading: false,  // Loading state for fetching notifications
      error: null,       // Error state

      // Action to fetch notifications
      fetchNotifications: async () => {
        const authStore = useAuthStore.getState();
        const token = authStore.accessToken;

        if (!token) {
          console.warn('No access token found. Unable to fetch notifications.');
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetchNotificationsAPI(token);
          if (response.success) {
            set({ notifications: response.data });
            // Calculate unread count
            const unread = response.data.filter(notif => !notif.isRead).length;
            set({ unreadCount: unread });
          } else {
            set({ error: response.message || 'Failed to fetch notifications.' });
            toast.error(response.message || 'Failed to fetch notifications.');
          }
        } catch (error) {
          set({ error: error.message || 'An error occurred.' });
          toast.error(error.message || 'An error occurred while fetching notifications.');
        } finally {
          set({ isLoading: false });
        }
      },

      // Action to mark a single notification as read
      markAsRead: async (notificationId) => {
        const authStore = useAuthStore.getState();
        const token = authStore.accessToken;

        if (!token) {
          console.warn('No access token found. Unable to mark notification as read.');
          return;
        }

        try {
          const response = await markAsReadAPI(token, notificationId);
          if (response.success) {
            // Update local state
            set(state => {
              const updatedNotifications = state.notifications.map(notif =>
                notif.id === notificationId ? { ...notif, isRead: true } : notif
              );
              const updatedUnreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0;
              return { notifications: updatedNotifications, unreadCount: updatedUnreadCount };
            });
          } else {
            toast.error(response.message || 'Failed to mark notification as read.');
          }
        } catch (error) {
          toast.error(error.message || 'An error occurred while marking notification as read.');
        }
      },

      // Action to mark all notifications as read
      markAllAsRead: async () => {
        const authStore = useAuthStore.getState();
        const token = authStore.accessToken;

        if (!token) {
          console.warn('No access token found. Unable to mark all notifications as read.');
          return;
        }

        try {
          const response = await markAsReadAPI(token, null); // Assuming backend handles null as "all"
          if (response.success) {
            set(state => ({
              notifications: state.notifications.map(notif => ({ ...notif, isRead: true })),
              unreadCount: 0,
            }));
          } else {
            toast.error(response.message || 'Failed to mark all notifications as read.');
          }
        } catch (error) {
          toast.error(error.message || 'An error occurred while marking all notifications as read.');
        }
      },

      // Optional: Action to add a new notification (e.g., real-time updates)
      addNotification: (newNotification) => {
        set(state => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + (!newNotification.isRead ? 1 : 0),
        }));
      },
    }),
    {
      name: 'notification-storage', // Unique name for storage
      getStorage: () => localStorage, // Specify storage method
      // Optionally, you can whitelist specific state properties
      // whitelist: ['notifications', 'unreadCount'],
    }
  )
);

export default useNotificationStore;
