

import React from "react";
import { motion } from "framer-motion";
import { FaExclamationCircle, FaInfoCircle, FaBirthdayCake } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useNotificationStore from "../../store/notificationStore";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = ({ notifications, loading, error, onClose,  }) => {
  const { markAsRead } = useNotificationStore();

  const navigate = useNavigate();

  const handleShowMore = () => {
    onClose();            
    navigate("/dashboard/notifications"); 
  };


  const handleMarkAsRead = (id) => {
    markAsRead(id);
    toast.success("Notification marked as read!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Notifications
        </h2>
      </div>

      <div
        className="max-h-60 overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-neutral-600
          scrollbar-track-gray-100 dark:scrollbar-track-neutral-800"
      >
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="p-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-600 dark:text-gray-300">
            No notifications available.
          </p>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 border-b border-gray-200 dark:border-gray-600 
              ${
                !notification.isRead ? "bg-gray-100 dark:bg-gray-600" : ""
              } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              {/* Icon based on notification type */}
              <div className="mr-3 mt-1">
                {notification.type.toLowerCase() === "announcement" && (
                  <FaInfoCircle className="text-blue-500" />
                )}
                {notification.type.toLowerCase() === "birthday" && (
                  <FaBirthdayCake className="text-pink-500" />
                )}
                {notification.type.toLowerCase() === "resignation" && (
                  <FaExclamationCircle className="text-red-500" />
                )}
              </div>

              {/* Notification Details */}
              <div>
                <p
                  className={`${
                    !notification.isRead ? "font-bold" : "font-medium"
                  } text-gray-800 dark:text-gray-200`}
                >
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      
        <div className="p-4">
          <button
            onClick={handleShowMore}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Show More
          </button>
        </div>
    
    </motion.div>
  );
};

export default NotificationDropdown;
