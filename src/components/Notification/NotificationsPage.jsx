import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoMdNotifications, 
  IoMdSearch, 
  IoMdClose, 
  IoMdTrash,
  IoMdCheckmarkCircleOutline,
  IoMdRefresh,
  IoMdInformationCircleOutline,
  IoMdHeart,
  IoMdAlert,
  IoMdGlobe,
  IoMdCheckmark,
  IoMdEye
} from "react-icons/io";
import { BsFilterCircle } from "react-icons/bs";

import { toast } from "react-hot-toast";
import useNotificationStore from "../../store/notificationStore";
import useDepartmentStore from "../../store/departmentStore";

export default function NotificationsPage() {
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

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filterType, setFilterType] = useState("All");
  const [filterReadStatus, setFilterReadStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length, 
    [notifications]
  );

  // Fetch departments and notifications on mount
  useEffect(() => {
    fetchDepartments();
    fetchNotifications();
  }, [fetchDepartments, fetchNotifications]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setFilterType("All");
    setFilterReadStatus("All");
    setSearchQuery("");
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterReadStatusChange = (e) => {
    setFilterReadStatus(e.target.value);
  };

  const handleCardClick = (notification) => {
    setSelectedNotification(notification);
    setOpenDetailDialog(true);
    if (!notification.isRead) {
      markAsRead(notification.id);
      toast.success("Notification marked as read!");
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: "Delete Notification",
      content: "Are you sure you want to delete this notification?",
      onConfirm: () => {
        deleteNotification(id);
        toast.success("Notification deleted!");
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleMarkAllAsRead = () => {
    setConfirmDialog({
      open: true,
      title: "Mark All as Read",
      content: "Are you sure you want to mark all notifications as read?",
      onConfirm: () => {
        markAllAsRead();
        toast.success("All notifications marked as read!");
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

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

  const getNotificationIcon = (type) => {
    switch(type.toLowerCase()) {
      case "announcement":
        return <IoMdInformationCircleOutline className="text-blue-500" size={24} />;
      case "birthday":
        return <IoMdHeart className="text-pink-500" size={24} />;
      case "resignation":
        return <IoMdAlert className="text-red-500" size={24} />;
      default:
        return <IoMdGlobe className="text-purple-500" size={24} />;
    }
  };

  const getNotificationBackgroundColor = (type, isRead) => {
    if (!isRead) {
      return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700";
    }
    
    switch(type.toLowerCase()) {
      case "announcement":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 opacity-60";
      case "birthday":
        return "bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-800 opacity-60";
      case "resignation":
        return "bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 opacity-60";
      default:
        return "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 opacity-60";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header with Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative backdrop-blur-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mb-8 p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <IoMdNotifications className="text-indigo-600 dark:text-indigo-400" size={36} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text">
                Notifications
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50"
              >
                <BsFilterCircle  size={18} />
                <span>Filters</span>
              </motion.button>

              {notifications.some((notif) => !notif.isRead) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMarkAllAsRead}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                >
                  <IoMdCheckmarkCircleOutline size={18} />
                  <span>Mark All as Read</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchNotifications()}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Refresh notifications"
              >
                <IoMdRefresh size={18} />
              </motion.button>
            </div>
          </div>

          {/* Search & Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center rounded-full px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                    <IoMdSearch className="text-gray-400 mr-2" size={20} />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      className="w-full bg-transparent focus:outline-none"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <IoMdClose size={18} />
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      value={filterType}
                      onChange={handleFilterTypeChange}
                      className="w-full appearance-none rounded-full px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="All">All Types</option>
                      <option value="Announcement">Announcements</option>
                      <option value="Birthday">Birthdays</option>
                      <option value="Resignation">Resignations</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <BsFilterCircle  className="text-gray-400" size={18} />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      value={filterReadStatus}
                      onChange={handleFilterReadStatusChange}
                      className="w-full appearance-none rounded-full px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="All">All Status</option>
                      <option value="Read">Read</option>
                      <option value="Unread">Unread</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <IoMdEye className="text-gray-400" size={18} />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearFilters}
                    className="flex items-center justify-center space-x-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <IoMdRefresh size={18} />
                    <span>Clear Filters</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Notifications Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notificationsLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md animate-pulse"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 w-3/4 mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-2/3 mb-2 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/4 mt-2 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : notificationsError ? (
            <div className="col-span-2 flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="text-center">
                <div className="text-red-500 mb-2">
                  <IoMdAlert size={48} />
                </div>
                <p className="text-lg font-medium text-red-500">{notificationsError}</p>
                <button 
                  onClick={() => fetchNotifications()}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="col-span-2 flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <IoMdNotifications size={48} />
                </div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No notifications found</p>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
              </div>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCardClick(notification)}
                className={`${getNotificationBackgroundColor(notification.type, notification.isRead)} 
                  backdrop-blur-lg rounded-xl p-4 shadow-md border border-white/20 dark:border-gray-700/30 
                  cursor-pointer hover:shadow-lg transition-all`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-white/90 dark:bg-gray-800/90 rounded-xl mr-4 shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-base ${!notification.isRead ? 'font-bold' : 'font-medium'} text-gray-900 dark:text-gray-100`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </div>
                      <div className="flex space-x-1">
                        {!notification.isRead && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                              toast.success("Notification marked as read!");
                            }}
                            className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30"
                            aria-label="Mark as read"
                          >
                            <IoMdCheckmark size={16} />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30"
                          aria-label="Delete notification"
                        >
                          <IoMdTrash size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chips/Tags */}
                {(notification.targetDepartments && notification.targetDepartments.length > 0) && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {notification.targetDepartments.map((dept, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 text-xs rounded-full 
                          bg-white/70 dark:bg-gray-800/70 text-indigo-600 dark:text-indigo-400 
                          border border-indigo-200 dark:border-indigo-800/50"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                )}
                
                {(!notification.targetDepartments || notification.targetDepartments.length === 0) && (
                  <div className="mt-3">
                    <span className="px-2 py-1 text-xs rounded-full 
                      bg-white/70 dark:bg-gray-800/70 text-indigo-600 dark:text-indigo-400 
                      border border-indigo-200 dark:border-indigo-800/50">
                      All Departments
                    </span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <AnimatePresence>
        {confirmDialog.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-11/12 max-w-md shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {confirmDialog.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {confirmDialog.content}
              </p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Dialog */}
      <AnimatePresence>
        {openDetailDialog && selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-11/12 max-w-2xl shadow-2xl border border-gray-100 dark:border-gray-700 relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenDetailDialog(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <IoMdClose size={20} />
              </motion.button>

              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  {getNotificationIcon(selectedNotification.type)}
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
                {selectedNotification.title}
              </h2>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {selectedNotification.message}
                </p>
              </div>

              {/* Departments / Tags */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {selectedNotification.targetDepartments.length > 0 ? (
                  selectedNotification.targetDepartments.map((dept, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50"
                    >
                      {dept}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                    All Departments
                  </span>
                )}
              </div>

              {/* Media Section */}
              {selectedNotification.mediaUrl && (
                <div className="mt-6">
                  <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-inner">
                    <img
                      src={selectedNotification.mediaUrl}
                      alt={selectedNotification.title}
                      className="w-full h-auto max-h-96 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpenDetailDialog(false)}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}