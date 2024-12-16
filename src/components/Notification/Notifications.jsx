// src/pages/Notifications.js
import React, { useEffect } from "react";
import useNotificationStore from "../../store/notificationStore";
import { Typography, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const Notifications = () => {
  const notificationStore = useNotificationStore();

  useEffect(() => {
    if (notificationStore.notifications.length === 0) {
      notificationStore.fetchNotifications();
    }
  }, [notificationStore]);

  return (
    <Box className="p-4">
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      {notificationStore.isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : notificationStore.notifications.length === 0 ? (
        <Typography variant="body1">No notifications available.</Typography>
      ) : (
        <Box className="space-y-4">
          {notificationStore.notifications.map((notif) => (
            <Box
              key={notif.id}
              className={`p-4 border rounded-md ${
                !notif.isRead ? 'bg-gray-100 dark:bg-gray-600' : 'bg-white dark:bg-gray-700'
              }`}
            >
              <Typography variant="h6">{notif.title}</Typography>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                {notif.message}
              </Typography>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {new Date(notif.createdAt).toLocaleString()}
              </Typography>
              {!notif.isRead && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => notificationStore.markAsRead(notif.id)}
                  className="mt-2"
                >
                  Mark as Read
                </Button>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Optional: Button to Mark All as Read */}
      {notificationStore.unreadCount > 0 && (
        <Box className="mt-4 text-center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => notificationStore.markAllAsRead()}
          >
            Mark All as Read
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
