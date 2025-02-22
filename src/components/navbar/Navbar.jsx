import { useEffect, useState } from "react";
import {
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaComments,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore";
import usePunchStore from "../../store/usePunchStore"; // <-- Import the punch store

import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";
import NotificationDropdown from "../Notification/NotificationDropdown";
import { FaBusinessTime } from "react-icons/fa6";
import BreakCard from "./BreakCard";
import { ChatContext } from "../../contexts/ChatContext";
import { useContext } from "react";

// Helper to format seconds into HH:MM:SS
function formatHMS(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const hh = hrs < 10 ? `0${hrs}` : hrs;
  const mm = mins < 10 ? `0${mins}` : mins;
  const ss = secs < 10 ? `0${secs}` : secs;
  return `${hh}:${mm}:${ss}`;
}

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  // const [showChatDropdown, setShowChatDropdown] = useState(false);
  const [showBreakCard, setShowBreakCard] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  // chat related ###################

  const { unreadCounts } = useContext(ChatContext);
  const navigate = useNavigate();
  const userCount = Object.keys(unreadCounts).length;

  // Local state to control badge visibility.
  const [showBadge, setShowBadge] = useState(true);

  // Whenever unreadCounts changes and there are unread messages, show the badge.
  useEffect(() => {
    if (userCount > 0) {
      setShowBadge(true);
    }
  }, [userCount]);

  const handleClick = () => {
    // Hide the badge.
    setShowBadge(false);
    // Navigate to the chat dashboard.
    navigate("/dashboard/chats");
  };

  // chat end ######################

  const authStore = useAuthStore();

  // Notification store
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const loading = useNotificationStore((state) => state.loading);
  const error = useNotificationStore((state) => state.error);

  // -----------------------------------------
  // PUNCH STORE: for break info + fetch logic
  // -----------------------------------------
  const {
    onBreak,
    breakStartTime,
    // methods to fetch data
    fetchAttendanceData,
    fetchTargetCoordinates,
    fetchUserBreakType,
    getUserLocation,
  } = usePunchStore();

  // Local timer in the navbar
  const [navbarTimer, setNavbarTimer] = useState("00:00:00");

  // 1) On mount (if authenticated), fetch punch/attendance data
  useEffect(() => {
    if (authStore.isAuthenticated) {
      // same calls you do in BreakCard
      fetchAttendanceData();
      fetchTargetCoordinates();
      fetchUserBreakType(authStore.employeeId);
      getUserLocation();
    }
  }, [authStore.isAuthenticated]);

  // 2) Notification fetch if user is authenticated
  useEffect(() => {
    if (authStore.isAuthenticated) {
      fetchNotifications();
    }
  }, [authStore.isAuthenticated, fetchNotifications]);

  // 3) Set current date on mount
  useEffect(() => {
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatted = today.toLocaleDateString(undefined, options);
    setCurrentDate(formatted);
  }, []);

  // 4) If on break, update local timer every second
  useEffect(() => {
    let intervalId;
    if (onBreak && breakStartTime) {
      updateTimer(); // run once immediately
      intervalId = setInterval(updateTimer, 1000);
    } else {
      // reset if not on break
      setNavbarTimer("00:00:00");
    }
    return () => clearInterval(intervalId);
  }, [onBreak, breakStartTime]);

  const updateTimer = () => {
    const now = new Date();
    const diffSec = Math.floor((now - new Date(breakStartTime)) / 1000);
    if (diffSec < 0) {
      setNavbarTimer("00:00:00");
    } else {
      setNavbarTimer(formatHMS(diffSec));
    }
  };

  // Sign out
  const handleSignOut = () => {
    authStore.logout();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  // Company & user info
  const companyLogo =
    authStore.companyInfo?.logo ||
    "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userAvatar =
    authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userEmail = authStore.workingEmail || "john.doe@example.com";

  return (
    <nav
      className={
        "bg-white text-black dark:text-white dark:bg-gray-800 " +
        "z-50 border-b border-gray-500 px-4 sm:px-6 lg:px-8 " +
        "flex items-center justify-between h-16 shadow-md stickey w-full top-0 left-0"
      }
    >
      {/* Left Section: Company Branding */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-white">
          <Link to="/dashboard">
            <img className="w-24" src={companyLogo} alt="Company Logo" />
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Current Date */}
        <div className="font-bold">{currentDate}</div>

        {/* If user is on break, show timer in the center */}
        {onBreak && (
          <p className="font-semibold text-green-600">
            Break Running: {navbarTimer}
          </p>
        )}

        {/* BreakCard Dropdown Trigger */}
        <div className="relative">
          <FaBusinessTime
            className="text-green-400 w-7 h-7 cursor-pointer"
            onClick={() => setShowBreakCard((prev) => !prev)}
          />
          <AnimatePresence>
            {showBreakCard && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-[350px] z-10"
              >
                <BreakCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

        {/* Chat Icon */}
        <div className="relative cursor-pointer" onClick={handleClick}>
          {userCount > 0 && showBadge && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full transition-opacity duration-300">
              {userCount}
            </span>
          )}
          <FaComments className="text-blue-500 w-6 h-6" />
        </div>

        {/* Theme Toggle */}
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
                  {/* <li>
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                    >
                      <FaHome className="mr-2 text-blue-400" /> Dashboard
                    </a>
                  </li> */}

                  <li>
                    <Link
                      to={"/dashboard/my-profile"}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                    >
                      <FaUserCircle className="mr-2 text-green-400" /> Profile
                    </Link>
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
