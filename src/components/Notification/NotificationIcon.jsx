

import React from "react";
import { FaBell } from "react-icons/fa";
import useNotificationStore from "../../store/notificationStore";

const NotificationIcon = ({ onClick }) => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <div className="relative cursor-pointer" onClick={onClick} aria-label="Notifications">
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
          {unreadCount}
        </span>
      )}
      <FaBell className="text-yellow-400 w-6 h-6" />
    </div>
  );
};

export default NotificationIcon;
