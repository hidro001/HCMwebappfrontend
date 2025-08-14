import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI,
} from '../service/service';


const normalizeNotification = (n) => ({
  ...n,
  id: n.id || n._id || Date.now().toString(), // always have an id
  timestamp: n.timestamp || new Date().toISOString(),
  isRead: Boolean(n.isRead),
});

const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      loading: false,
      error: null,
      socket: null,
      filters: {
        type: 'all', // 'all', 'message', 'system', 'alert'
        status: 'all', // 'all', 'read', 'unread'
      },

      // Initialize socket connection for real-time updates
      initializeSocket: (socket) => {
        set({ socket });

        // Listen for new notifications
        socket.on('newNotification', (notification) => {
          const newNotif = normalizeNotification(notification);
          set((state) => {
            const updatedNotifications = [newNotif, ...state.notifications];
            return {
              notifications: updatedNotifications,
              unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
            };
          });
        });

        // Listen for notification updates
        socket.on('notificationUpdated', (updatedNotification) => {
          const updatedNotif = normalizeNotification(updatedNotification);
          set((state) => {
            const updatedNotifications = state.notifications.map((n) =>
              n.id === updatedNotif.id ? updatedNotif : n
            );
            return {
              notifications: updatedNotifications,
              unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
            };
          });
        });

        // Clean up on disconnect
        socket.on('disconnect', () => {
          console.log('Socket disconnected');
        });
      },

      // Fetch notifications from API
      fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
          const data = await fetchNotificationsAPI();
          const normalised = data.map(normalizeNotification);
          set({
            notifications: normalised,
            unreadCount: normalised.filter((n) => !n.isRead).length,
          });
        } catch (error) {
          set({ error: error.message || 'Failed to fetch notifications' });
        } finally {
          set({ loading: false });
        }
      },

      markAsRead: async (notificationId) => {
        if (!notificationId || notificationId.startsWith('temp-')) {
          console.warn('Invalid or temporary notification ID, skipping API call:', notificationId);
          return;
        }

        const previousState = get();
        set(state => {
          const updatedNotifications = state.notifications.map(notification =>
            notification.id === notificationId ? { ...notification, isRead: true } : notification
          );
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.isRead).length,
          };
        });

        try {
          // If backend expects _id, make sure we pass that
          await markNotificationAsReadAPI(notificationId);
        } catch (error) {
          set({
            notifications: previousState.notifications,
            unreadCount: previousState.unreadCount,
            error: error.message || 'Failed to mark notification as read'
          });
        }
      } , 

      // Mark all notifications as read
      markAllAsRead: async () => {
        const previousState = get();

        // Optimistic update
        set({
          notifications: get().notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        });

        try {
          await markNotificationAsReadAPI(null);
        } catch (error) {
          // Revert on error
          set({
            notifications: previousState.notifications,
            unreadCount: previousState.unreadCount,
            error:
              error.message || 'Failed to mark all notifications as read',
          });
        }
      },

      // Add new notification
      addNotification: (notification) => {
        const newNotification = normalizeNotification(notification);
        set((state) => {
          const updatedNotifications = [
            newNotification,
            ...state.notifications,
          ];
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
          };
        });
      },

      // Get filtered notifications
      getFilteredNotifications: () => {
        const { notifications, filters } = get();
        return notifications.filter((notification) => {
          const typeMatch =
            filters.type === 'all' || notification.type === filters.type;
          const statusMatch =
            filters.status === 'all' ||
            (filters.status === 'read' && notification.isRead) ||
            (filters.status === 'unread' && !notification.isRead);

          return typeMatch && statusMatch;
        });
      },

      // Set filter
      setFilter: (filterType, value) => {
        set((state) => ({
          filters: { ...state.filters, [filterType]: value },
        }));
      },

      // Remove notification
      removeNotification: (notificationId) => {
        set((state) => {
          const updatedNotifications = state.notifications.filter(
            (n) => n.id !== notificationId
          );
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
          };
        });
      },

      // Clear all notifications
      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0, error: null });
      },

      // Cleanup socket connection
      cleanupSocket: () => {
        const { socket } = get();
        if (socket) {
          socket.off('newNotification');
          socket.off('notificationUpdated');
          socket.off('disconnect');
          set({ socket: null });
        }
      },
    }),
    {
      name: 'notification-storage',
      getStorage: () => localStorage,
      // Exclude socket from persistence
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        filters: state.filters,
      }),
    }
  )
);

export default useNotificationStore;
