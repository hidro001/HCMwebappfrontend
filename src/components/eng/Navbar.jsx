// src/components/layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useAuthStore from '../../store/store';
import useNotificationStore from '../../store/notificationStore';

const Navbar = () => {
  const userAvatar = useAuthStore((state) => state.userAvatar);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);

  const handleNotificationClick = (id) => {
    // Implement notification click logic, e.g., mark as read
    markAsRead(id);
    // Additional actions like navigating to a related post can be added here
  };

  return (
    <AppBar position="fixed" className="z-50">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" noWrap component="div">
          Employee Engagement Dashboard
        </Typography>
        <div className="flex items-center space-x-4">
          <IconButton color="inherit">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar alt="User Avatar" src={userAvatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
