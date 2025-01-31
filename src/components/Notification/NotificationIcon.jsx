
import React from "react";
import { FaBell } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import useNotificationStore from "../../store/notificationStore";

const NotificationIcon = ({ onClick }) => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <Badge badgeContent={unreadCount} color="error">
      <FaBell
        className="text-yellow-400 w-6 h-6 cursor-pointer"
        onClick={onClick}
        aria-label="Notifications"
      />
    </Badge>
  );
};

export default NotificationIcon;
