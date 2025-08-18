import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI, markAllNotificationsAsRead
} from '../service/service';


const normalizeNotification = (n) => ({
  ...n,
  id: n.id || n._id || Date.now().toString(),
  _id: n._id || n.id,
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
        type: 'all',
        status: 'all',
      },

      initializeSocket: (socket) => {
        set({ socket });

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

        socket.on('disconnect', () => {
          console.log('Socket disconnected');
        });
      },

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
        const notif = get().notifications.find(n => n.id === notificationId || n._id === notificationId);
        const realId = notif?._id || notificationId;

        if (!realId || String(realId).startsWith('temp-')) {
          console.warn('Invalid or temporary notification ID, skipping API call:', realId);
          return;
        }

        const previousState = get();
        set(state => {
          const updatedNotifications = state.notifications.map(notification =>
            notification.id === notificationId || notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification
          );
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.isRead).length,
          };
        });

        try {
          await markNotificationAsReadAPI(realId);
        } catch (error) {
          set({
            notifications: previousState.notifications,
            unreadCount: previousState.unreadCount,
            error: error.message || 'Failed to mark notification as read'
          });
        }
      },


      markAllAsRead: async (notify_id) => {
        const previousState = get();

        set({
          notifications: get().notifications.map(n => ({ ...n, isRead: true })),
          unreadCount: 0,
        });

        try {
          await markAllNotificationsAsRead(notify_id);
        } catch (error) {
          set({
            notifications: previousState.notifications,
            unreadCount: previousState.unreadCount,
            error: error.message || 'Failed to mark all notifications as read',
          });
        }
      },



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

      setFilter: (filterType, value) => {
        set((state) => ({
          filters: { ...state.filters, [filterType]: value },
        }));
      },

      deleteNotification: (notificationId) => {
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

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0, error: null });
      },

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
