// // src/pages/NotificationsPage.js
// import React, { useEffect } from "react";
// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import useNotificationStore from "../../store/notificationStore";
// import { FaInfoCircle, FaBirthdayCake, FaExclamationCircle } from "react-icons/fa";

// const NotificationsPage = () => {
//   const notificationStore = useNotificationStore();

//   useEffect(() => {
//     notificationStore.fetchNotifications();
//   }, [notificationStore]);

//   const handleMarkAsRead = (id) => {
//     notificationStore.markAsRead(id);
//   };

//   const handleMarkAllAsRead = () => {
//     notificationStore.markAllAsRead();
//   };

//   return (
//     <Box className="p-6">
//       <Box className="flex justify-between items-center mb-4">
//         <Typography variant="h5" className="text-gray-800 dark:text-gray-200">
//           All Notifications
//         </Typography>
//         {notificationStore.unreadCount > 0 && (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleMarkAllAsRead}
//           >
//             Mark All as Read
//           </Button>
//         )}
//       </Box>

//       {notificationStore.loading ? (
//         <Box className="flex justify-center items-center mt-10">
//           <CircularProgress />
//         </Box>
//       ) : notificationStore.error ? (
//         <Typography color="error" className="text-center">
//           {notificationStore.error}
//         </Typography>
//       ) : notificationStore.notifications.length === 0 ? (
//         <Typography className="text-center text-gray-600 dark:text-gray-300">
//           You have no notifications.
//         </Typography>
//       ) : (
//         notificationStore.notifications.map((notification) => (
//           <Box
//             key={notification.id}
//             className={`flex items-start p-4 border-b border-gray-200 dark:border-gray-600 ${
//               !notification.isRead ? "bg-gray-100 dark:bg-gray-600" : ""
//             } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500`}
//             onClick={() => handleMarkAsRead(notification.id)}
//           >
//             {/* Icon based on notification type */}
//             <Box className="mr-3 mt-1">
//               {notification.type === "announcement" && (
//                 <FaInfoCircle className="text-blue-500" />
//               )}
//               {notification.type === "birthday" && (
//                 <FaBirthdayCake className="text-pink-500" />
//               )}
//               {notification.type === "resignation" && (
//                 <FaExclamationCircle className="text-red-500" />
//               )}
//               {/* Add more types as needed */}
//             </Box>

//             {/* Notification Details */}
//             <Box className="flex-1">
//               <Box className="flex justify-between items-center">
//                 <Typography
//                   variant="subtitle1"
//                   className={`${
//                     !notification.isRead ? "font-bold" : "font-medium"
//                   } text-gray-800 dark:text-gray-200`}
//                 >
//                   {notification.title}
//                 </Typography>
//                 {!notification.isRead && (
//                   <Button
//                     size="small"
//                     variant="text"
//                     color="primary"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering the mark as read on box click
//                       handleMarkAsRead(notification.id);
//                     }}
//                   >
//                     Mark as Read
//                   </Button>
//                 )}
//               </Box>
//               <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
//                 {notification.message}
//               </Typography>
//               <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
//                 {new Date(notification.createdAt).toLocaleString()}
//               </Typography>
//             </Box>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// export default NotificationsPage;

// src/pages/NotificationsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import useNotificationStore from "../../store/notificationStore";
import useDepartmentStore from "../../store/departmentStore";
import { toast } from "react-toastify";
import {
  FaInfoCircle,
  FaBirthdayCake,
  FaExclamationCircle,
  FaSearch,
  FaFilter,
  FaTimes,
  FaTrash,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const AnimatedButton = motion(Button);

const NotificationsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    notifications,
    loading: notificationsLoading,
    error: notificationsError,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationStore();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments,
  } = useDepartmentStore();

  // State for Confirmation Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });

  // State for Detailed Notification Dialog
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // State for Filters
  const [filterType, setFilterType] = useState("All");
  const [filterReadStatus, setFilterReadStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notifications and departments on mount
  useEffect(() => {
    fetchDepartments();
    fetchNotifications();
  }, [fetchDepartments, fetchNotifications]);

  // Handle Search Query Change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Clear Filters
  const handleClearFilters = () => {
    setFilterType("All");
    setFilterReadStatus("All");
    setSearchQuery("");
  };

  // Handle Filter Type Change
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  // Handle Filter Read Status Change
  const handleFilterReadStatusChange = (e) => {
    setFilterReadStatus(e.target.value);
  };

  // Handle Card Click to Open Detailed Dialog
  const handleCardClick = (notification) => {
    setSelectedNotification(notification);
    setOpenDetailDialog(true);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  // Handle Delete Notification
  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: "Delete Notification",
      content: "Are you sure you want to delete this notification?",
      onConfirm: () => {
        deleteNotification(id);
        setConfirmDialog({ ...confirmDialog, open: false });
      },
    });
  };

  // Apply Filters and Search using useMemo for performance optimization
  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((notification) => {
        if (filterType === "All") return true;
        return notification.type.toLowerCase() === filterType.toLowerCase();
      })
      .filter((notification) => {
        if (filterReadStatus === "All") return true;
        if (filterReadStatus === "Read") return notification.isRead;
        if (filterReadStatus === "Unread") return !notification.isRead;
        return true;
      })
      .filter((notification) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query)
        );
      });
  }, [notifications, filterType, filterReadStatus, searchQuery]);

  return (
    <Box
      className="min-h-screen p-6 w-2/3 m-auto"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Typography variant="h4" className="mb-4 md:mb-0">
          Notifications
        </Typography>
        {notifications.some((notif) => !notif.isRead) && (
          <AnimatedButton
            variant="contained"
            color="primary"
            onClick={() => {
              setConfirmDialog({
                open: true,
                title: "Mark All as Read",
                content: "Are you sure you want to mark all notifications as read?",
                onConfirm: () => {
                  markAllAsRead();
                  setConfirmDialog({ ...confirmDialog, open: false });
                },
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              backgroundColor: "indigo.600",
              color: "white",
              "&:hover": {
                backgroundColor: "indigo.700",
              },
            }}
            aria-label="Mark all notifications as read"
          >
            Mark All as Read
          </AnimatedButton>
        )}
      </Box>

      {/* Search, Filter, and Clear Filters Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          borderRadius: "16px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Bar */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
              <FaSearch style={{ marginRight: "8px", color: "grey" }} />
              <TextField
                label="Search Notifications"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                fullWidth
                aria-label="Search Notifications"
              />
            </Box>
          </Grid>

          {/* Filter by Type */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-type-label">Type</InputLabel>
              <Select
                labelId="filter-type-label"
                id="filter-type"
                value={filterType}
                label="Type"
                onChange={handleFilterTypeChange}
                aria-label="Filter by Type"
              >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="Announcement">Announcement</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Resignation">Resignation</MenuItem>
                {/* Add more types as needed */}
              </Select>
            </FormControl>
          </Grid>

          {/* Filter by Read Status */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-read-status-label">Status</InputLabel>
              <Select
                labelId="filter-read-status-label"
                id="filter-read-status"
                value={filterReadStatus}
                label="Status"
                onChange={handleFilterReadStatusChange}
                aria-label="Filter by Read Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Read">Read</MenuItem>
                <MenuItem value="Unread">Unread</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters Button */}
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="outlined"
              startIcon={<FaFilter />}
              onClick={handleClearFilters}
              fullWidth
              sx={{
                height: "100%",
              }}
              aria-label="Clear all filters"
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Notifications List */}
      <Box>
        {notificationsLoading ? (
          <List>
            {Array.from(new Array(5)).map((_, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemIcon>
                <ListItemText
                  primary={<Skeleton width="80%" />}
                  secondary={<Skeleton width="60%" />}
                />
                <ListItemSecondaryAction>
                  <Skeleton variant="rectangular" width={80} height={30} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : notificationsError ? (
          <Typography color="error" className="text-center">
            {notificationsError}
          </Typography>
        ) : filteredNotifications.length === 0 ? (
          <Typography className="text-center text-gray-600 dark:text-gray-300">
            No notifications found for the selected criteria.
          </Typography>
        ) : (
          <List>
            {filteredNotifications.map((notification) => (
              <StyledListItem
                key={notification.id}
                onClick={() => handleCardClick(notification)}
                button
                aria-label={`View details of notification: ${notification.title}`}
              >
                {/* Icon based on notification type */}
                <ListItemIcon>
                  {notification.type.toLowerCase() === "announcement" && (
                    <FaInfoCircle className="text-blue-500" size={24} />
                  )}
                  {notification.type.toLowerCase() === "birthday" && (
                    <FaBirthdayCake className="text-pink-500" size={24} />
                  )}
                  {notification.type.toLowerCase() === "resignation" && (
                    <FaExclamationCircle className="text-red-500" size={24} />
                  )}
                  {/* Add more types as needed */}
                </ListItemIcon>

                {/* Notification Details */}
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className={`${
                        !notification.isRead ? "font-bold" : "font-medium"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-300"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {new Date(notification.createdAt).toLocaleString()}
                      </Typography>
                      {/* Target Departments */}
                      <Box mt={1}>
                        {notification.targetDepartments.length > 0 ? (
                          notification.targetDepartments.map((dept, index) => (
                            <Chip
                              key={index}
                              label={dept}
                              size="small"
                              color="secondary"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))
                        ) : (
                          <Chip
                            label="All Departments"
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                      {/* Media URL */}
                 
                    </Box>
                  }
                />

                {/* Actions */}
                <ListItemSecondaryAction>
                  {!notification.isRead && (
                    <IconButton
                      edge="end"
                      aria-label={`Mark notification as read: ${notification.title}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the list item click
                        markAsRead(notification.id);
                      }}
                    >
                      <FaEnvelopeOpenText />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label={`Delete notification: ${notification.title}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the list item click
                      handleDelete(notification.id);
                    }}
                  >
                    <FaTrash className="text-red-500" />
                  </IconButton>
                </ListItemSecondaryAction>
              </StyledListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 },
          sx: {
            backgroundColor: "background.paper",
            borderRadius: "16px",
          },
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <DialogTitle id="confirm-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <Typography id="confirm-dialog-description">
            {confirmDialog.content}
          </Typography>
        </DialogContent>
        <MuiDialogActions>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            sx={{
              backgroundColor: "grey.300",
              color: "grey.800",
              "&:hover": {
                backgroundColor: "grey.400",
              },
            }}
            aria-label="Cancel action"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDialog.onConfirm}
            sx={{
              backgroundColor: "indigo.600",
              color: "white",
              "&:hover": {
                backgroundColor: "indigo.700",
              },
            }}
            aria-label="Confirm action"
          >
            Confirm
          </Button>
        </MuiDialogActions>
      </Dialog>

      {/* Detailed Notification Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="detail-notification-dialog-title"
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 },
          sx: {
            backgroundColor: "background.paper",
            borderRadius: "16px",
          },
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <DialogTitle id="detail-notification-dialog-title">
          Notification Details
        </DialogTitle>
        <DialogContent>
          {selectedNotification ? (
            <Box>
              {/* Close Button */}
              <IconButton
                onClick={() => setOpenDetailDialog(false)}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  color: "grey.500",
                }}
                aria-label="Close notification details"
              >
                <FaTimes />
              </IconButton>

              {/* Notification Type Icon */}
              <Box className="flex justify-center mb-4">
                {selectedNotification.type.toLowerCase() === "announcement" && (
                  <FaInfoCircle className="text-blue-500" size={40} />
                )}
                {selectedNotification.type.toLowerCase() === "birthday" && (
                  <FaBirthdayCake className="text-pink-500" size={40} />
                )}
                {selectedNotification.type.toLowerCase() === "resignation" && (
                  <FaExclamationCircle className="text-red-500" size={40} />
                )}
                {/* Add more types as needed */}
              </Box>

              {/* Notification Details */}
              <Typography variant="h5" gutterBottom className="text-center">
                {selectedNotification.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedNotification.message}
              </Typography>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </Typography>

              {/* Target Departments */}
              <Box mt={2}>
                {selectedNotification.targetDepartments.length > 0 ? (
                  selectedNotification.targetDepartments.map((dept, index) => (
                    <Chip
                      key={index}
                      label={dept}
                      size="small"
                      color="secondary"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))
                ) : (
                  <Chip
                    label="All Departments"
                    size="small"
                    color="primary"
                  />
                )}
              </Box>

              {/* Media URL */}
              {selectedNotification.mediaUrl && (
                <Box mt={4}>
                  <img
                    src={selectedNotification.mediaUrl}
                    alt={selectedNotification.title}
                    className="w-full h-64 object-cover rounded-md"
                    loading="lazy" // Lazy loading for performance
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Box className="flex justify-center items-center h-64">
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NotificationsPage;

