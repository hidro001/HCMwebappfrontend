// src/components/NotificationDropdown.js
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "../../store/notificationStore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const NotificationDropdown = ({ onClose }) => {
  const { notifications, fetchNotifications, loading, error, markAsRead } = useNotificationStore(
    (state) => ({
      notifications: state.notifications.slice(0, 5), // Show latest 5
      fetchNotifications: state.fetchNotifications,
      loading: state.loading,
      error: state.error,
      markAsRead: state.markAsRead,
    })
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = (id) => {
    markAsRead(id);
    // Additional actions can be added here, such as navigating to a specific page
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Typography variant="h6" className="text-gray-800 dark:text-gray-200">
            Notifications
          </Typography>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <CircularProgress size={24} />
            </div>
          ) : error ? (
            <Typography color="error" className="p-4 text-sm">
              {error}
            </Typography>
          ) : notifications.length === 0 ? (
            <Typography className="p-4 text-sm text-gray-600 dark:text-gray-400">
              No new notifications.
            </Typography>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  !notif.isRead ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => handleNotificationClick(notif.id)}
              >
                <Typography variant="subtitle2" className="text-gray-800 dark:text-gray-200">
                  {notif.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  {notif.message}
                </Typography>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-500">
                  {new Date(notif.createdAt).toLocaleString()}
                </Typography>
              </div>
            ))
          )}
        </div>

        <div className="p-4">
          <Button
            variant="text"
            fullWidth
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700"
          >
            Show More
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationDropdown;
