// src/pages/NotificationsPage.js
import React, { useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useNotificationStore from "../../store/notificationStore";
import { FaInfoCircle, FaBirthdayCake, FaExclamationCircle } from "react-icons/fa";

const NotificationsPage = () => {
  const notificationStore = useNotificationStore();

  useEffect(() => {
    notificationStore.fetchNotifications();
  }, [notificationStore]);

  const handleMarkAsRead = (id) => {
    notificationStore.markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    notificationStore.markAllAsRead();
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-gray-800 dark:text-gray-200">
          All Notifications
        </Typography>
        {notificationStore.unreadCount > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleMarkAllAsRead}
          >
            Mark All as Read
          </Button>
        )}
      </Box>

      {notificationStore.loading ? (
        <Box className="flex justify-center items-center mt-10">
          <CircularProgress />
        </Box>
      ) : notificationStore.error ? (
        <Typography color="error" className="text-center">
          {notificationStore.error}
        </Typography>
      ) : notificationStore.notifications.length === 0 ? (
        <Typography className="text-center text-gray-600 dark:text-gray-300">
          You have no notifications.
        </Typography>
      ) : (
        notificationStore.notifications.map((notification) => (
          <Box
            key={notification.id}
            className={`flex items-start p-4 border-b border-gray-200 dark:border-gray-600 ${
              !notification.isRead ? "bg-gray-100 dark:bg-gray-600" : ""
            } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500`}
            onClick={() => handleMarkAsRead(notification.id)}
          >
            {/* Icon based on notification type */}
            <Box className="mr-3 mt-1">
              {notification.type === "announcement" && (
                <FaInfoCircle className="text-blue-500" />
              )}
              {notification.type === "birthday" && (
                <FaBirthdayCake className="text-pink-500" />
              )}
              {notification.type === "resignation" && (
                <FaExclamationCircle className="text-red-500" />
              )}
              {/* Add more types as needed */}
            </Box>

            {/* Notification Details */}
            <Box className="flex-1">
              <Box className="flex justify-between items-center">
                <Typography
                  variant="subtitle1"
                  className={`${
                    !notification.isRead ? "font-bold" : "font-medium"
                  } text-gray-800 dark:text-gray-200`}
                >
                  {notification.title}
                </Typography>
                {!notification.isRead && (
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the mark as read on box click
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    Mark as Read
                  </Button>
                )}
              </Box>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                {notification.message}
              </Typography>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default NotificationsPage;
