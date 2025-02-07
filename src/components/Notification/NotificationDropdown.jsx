import React from "react";
import { motion } from "framer-motion";
import { FaExclamationCircle, FaInfoCircle, FaBirthdayCake } from "react-icons/fa";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/notificationStore"; // Import notification store

const NotificationDropdown = ({ notifications, loading, error, onClose }) => {
  const navigate = useNavigate();
  const notificationStore = useNotificationStore();

  const handleShowMore = () => {
    onClose();
    navigate("notifications");
  };

  const handleMarkAsRead = (id) => {
    notificationStore.markAsRead(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20"
    >
      <Box className="p-4 border-b border-gray-200 dark:border-gray-600">
        <Typography variant="h6" className="text-gray-800 dark:text-gray-200">
          Notifications
        </Typography>
      </Box>

      <Box className="max-h-60 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
        {loading ? (
          <Box className="flex justify-center items-center p-4">
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Typography color="error" className="p-4 text-sm">
            {error}
          </Typography>
        ) : notifications.length === 0 ? (
          <Typography className="p-4 text-sm text-gray-600 dark:text-gray-300">
            No notifications available.
          </Typography>
        ) : (
          notifications.slice(0, 5).map((notification) => (
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
              <Box>
                <Typography
                  variant="subtitle2"
                  className={`${
                    !notification.isRead ? "font-bold" : "font-medium"
                  } text-gray-800 dark:text-gray-200`}
                >
                  {notification.title}
                </Typography>
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

      {/* Show More Button */}
      {notifications.length > 5 && (
        <Box className="p-4">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </Box>
      )}
    </motion.div>
  );
};

export default NotificationDropdown;
