import React, { useEffect, useState } from "react";
import { FaBell, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore"; // Import notification store
import { toast } from "react-toastify";
import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";
import NotificationDropdown from "../Notification/NotificationDropdown"; // Create this component

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const navigate = useNavigate();

  const authStore = useAuthStore();
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const loading = useNotificationStore((state) => state.loading);
  const error = useNotificationStore((state) => state.error);

  // Fetch notifications when user is authenticated
  useEffect(() => {
    if (authStore.isAuthenticated) {
      fetchNotifications();
    }
  }, [authStore.isAuthenticated, fetchNotifications]);

  const handleSignOut = () => {
    authStore.logout();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  const companyLogo =
    authStore.companyInfo?.logo ||
    "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userAvatar =
    authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userEmail = authStore.workingEmail || "john.doe@example.com";

  return (
    <nav
      className={"bg-green-300 text-black dark:text-white dark:bg-green-800 z-50 border-b border-gray-500 px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 shadow-md sticky top-0 left-0"}
    >
      {/* Left Section: Company Branding */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-white">
          <img className="w-24" src={companyLogo} alt="Company Logo" />
        </div>
        <div className="hidden sm:block text-sm font-light">
          Empowering Teams, Building Successs
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon with Unread Count */}
        <div className="relative">
          <FaBell
            className="text-yellow-400 w-6 h-6 cursor-pointer"
            onClick={() => setShowNotificationDropdown((prev) => !prev)}
          />
          {unreadCount > 0 && (
            <span
              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setShowNotificationDropdown((prev) => !prev)}
            >
              {unreadCount}
            </span>
          )}

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotificationDropdown && (
              <NotificationDropdown
                notifications={notifications}
                loading={loading}
                error={error}
                onClose={() => setShowNotificationDropdown(false)}
              />
            )}
          </AnimatePresence>
        </div>

        <ThemeToggleButton />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-gray-700 dark:bg-gray-800 text-white rounded-md shadow-lg z-10"
              >
                <div className="p-4 border-b border-gray-600">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-gray-300">{userEmail}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                    >
                      <FaHome className="mr-2 text-blue-400" /> Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                    >
                      <FaCog className="mr-2 text-green-400" /> Settings
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-600 focus:outline-none"
                    >
                      <FaSignOutAlt className="mr-2 text-red-400" /> Sign Out
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
