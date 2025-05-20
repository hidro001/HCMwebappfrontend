import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore";
import usePunchStore from "../../store/usePunchStore";
import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";
import NotificationDropdown from "../Notification/NotificationDropdown";
import ProfileSidebar from "./ProfileCard";
import { ChatContextv2 } from "../../contexts/ChatContextv2";

// Icons
import { IoNotificationsOutline, IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { HiMenuAlt2, HiOutlineChevronDown } from "react-icons/hi";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import { RiTimerLine, RiUserLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import logo from '../../assets/logo/logo-eye.webp';

// Format seconds into HH:MM:SS
function formatHMS(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const hh = hrs < 10 ? `0${hrs}` : hrs;
  const mm = mins < 10 ? `0${mins}` : mins;
  const ss = secs < 10 ? `0${secs}` : secs;
  return `${hh}:${mm}:${ss}`;
}

const Navbar = ({ collapsed, setCollapsed }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showBreakCard, setShowBreakCard] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { unreadCounts = {} } = useContext(ChatContextv2);
  const personsWithUnread = Object.values(unreadCounts).filter(
    (count) => count > 0
  ).length;

  const navigate = useNavigate();
  const [showBadge, setShowBadge] = useState(true);

  const handleChatClick = () => {
    setShowBadge(false);
    navigate("/dashboard/chats");
  };

  const authStore = useAuthStore();

  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const loading = useNotificationStore((state) => state.loading);
  const error = useNotificationStore((state) => state.error);

  const {
    onBreak,
    breakStartTime,
    fetchAttendanceData,
    fetchTargetCoordinates,
    fetchUserBreakType,
    getUserLocation,
  } = usePunchStore();

  const [navbarTimer, setNavbarTimer] = useState("00:00:00");

  useEffect(() => {
    if (authStore.isAuthenticated) {
      fetchAttendanceData();
      fetchTargetCoordinates();
      fetchUserBreakType(authStore.employeeId);
      getUserLocation();
    }
  }, [authStore.isAuthenticated]);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      fetchNotifications();
    }
  }, [authStore.isAuthenticated, fetchNotifications]);

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    let intervalId;
    if (onBreak && breakStartTime) {
      updateTimer();
      intervalId = setInterval(updateTimer, 1000);
    } else {
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

  const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userID = authStore.employeeId || "john.doe@example.com";

  const getDashboardPath = () => {
    switch (authStore.userRole?.toLowerCase()) {
      case "employee":
        return "/dashboard/employee";
      case "super-admin":
        return "/dashboard/super-employee-dashboard";
      default:
        return "/dashboard/employee";
    }
  };

  const navbarVariants = {
    expanded: { height: "auto" },
    collapsed: { height: "64px" }
  };

  const searchBarVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "100%" }
  };

  const closeAllDropdowns = () => {
    setShowProfileDropdown(false);
    setShowNotificationDropdown(false);
    setShowBreakCard(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or handle search
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setShowSearchBar(false);
    }
  };

  return (
    <motion.nav
      initial="collapsed"
      animate="collapsed"
      variants={navbarVariants}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border-b border-gray-200 dark:border-gray-700 flex flex-col shadow-sm"
    >
      <div className="flex justify-between items-center h-16 px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
            <HiMenuAlt2 size={22} />
          </motion.button>
          
          <Link to={getDashboardPath()} className="flex items-center">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              className="h-10 object-contain"
              src={logo}
              alt="Company Logo"
            />
          </Link>
          
          <div className="hidden md:flex items-center ml-4">
            <motion.div 
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              className="flex items-center text-gray-500 dark:text-gray-400"
            >
              <IoCalendarOutline className="mr-2" size={18} />
              <span className="text-sm font-medium">{currentDate}</span>
            </motion.div>
            
            {onBreak && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-6 flex items-center text-amber-500 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full"
              >
                <IoTimeOutline className="mr-2" size={16} />
                <span className="text-sm font-medium">Break: {navbarTimer}</span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {/* Search */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-all"
            >
              <FiSearch size={20} />
            </motion.button>
            
            <AnimatePresence>
              {showSearchBar && (
                <motion.form
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={searchBarVariants}
                  transition={{ type: "tween" }}
                  className="absolute right-0 top-12 w-64 md:w-80"
                  onSubmit={handleSearchSubmit}
                >
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-2 pl-10 pr-4 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" size={16} />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          {/* Break Timer */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBreakCard(!showBreakCard)}
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
            <RiTimerLine size={20} />
            {onBreak && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
            )}
          </motion.button>
          
          {/* Chat */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChatClick}
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
            <FiMessageSquare size={20} />
            {personsWithUnread > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-bold bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {personsWithUnread}
              </span>
            )}
          </motion.button>
          
          {/* Theme toggle */}
          <div className="flex items-center">
            <ThemeToggleButton />
          </div>
          
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowProfileDropdown(false);
              setShowBreakCard(false);
            }}
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
            <IoNotificationsOutline size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-bold bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </motion.button>
          
          {/* User profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotificationDropdown(false);
                setShowBreakCard(false);
              }}
              className="flex items-center space-x-3 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={userAvatar}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              
              <div className="hidden md:block">
                <HiOutlineChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Dropdowns */}
      <AnimatePresence>
        {showNotificationDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-16 right-4 mt-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <NotificationDropdown
              notifications={notifications}
              loading={loading}
              error={error}
              onClose={() => setShowNotificationDropdown(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showProfileDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-16 right-4 mt-2 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileSidebar
              onClose={() => setShowProfileDropdown(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {(showProfileDropdown || showNotificationDropdown || showBreakCard) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-30"
            onClick={closeAllDropdowns}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;