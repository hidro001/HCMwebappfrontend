import { useEffect, useState, useRef, useContext } from "react";
import { FaBell, FaSignOutAlt, FaComments, FaUserCircle, FaBusinessTime} from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo-eye.webp';
import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore";
import usePunchStore from "../../store/usePunchStore";
import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";
import NotificationDropdown from "../Notification/NotificationDropdown";
import { GoSidebarCollapse } from "react-icons/go";
import { ChatContextv2 } from "../../contexts/ChatContextv2";
import ProfileSidebar from "./ProfileCard";

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
  const [showNotificationDropdown, setShowNotificationDropdown] =useState(false);
  const [showBreakCard, setShowBreakCard] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const { unreadCounts = {} } = useContext(ChatContextv2);
  const personsWithUnread = Object.values(unreadCounts).filter(
    (count) => count > 0
  ).length;

  const navigate = useNavigate();
  const [showBadge, setShowBadge] = useState(true);

  const handleClick = () => {
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
    const options = { day: "numeric", month: "long", year: "numeric" };
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

  const companyLogo =
    authStore.companyInfo?.logo ||
    "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userAvatar =
    authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userID = authStore.employeeId || "john.doe@example.com";

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const breakCardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showProfileDropdown &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        showNotificationDropdown &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
      if (
        showBreakCard &&
        breakCardRef.current &&
        !breakCardRef.current.contains(event.target)
      ) {
        setShowBreakCard(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown, showNotificationDropdown, showBreakCard]);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex justify-between items-center pr-4 bg-white shadow-sm shadow-gray-100 w-full  navbar-shadow ">
      
      <div className="flex gap-4">
        <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-black dark:text-white rounded-full ml-2 p-3 hover:text-gray-500 hover:bg-gray-200"
          >
            <GoSidebarCollapse size={25} />
        </button>
        <Link to={getDashboardPath()}>
          <img className="h-10 object-contain" src={logo} alt="Company Logo" />
        </Link>
      </div>

     
      <div className="flex items-center gap-4">

      {/* Chat */}
        <div className="relative">
          <button
            onClick={handleClick}
            className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
          >
            <MdChat className="text-gray-700 w-5 h-5" />
          </button>
          {personsWithUnread > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
              {personsWithUnread}
            </span>
          )}
        </div>

         {/* Theme Toggle */}
        <ThemeToggleButton />
         
          
        {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentDate}</span> */}

        {/* {onBreak && (
          <span className="text-sm font-semibold text-green-600">Break: {navbarTimer}</span>
        )} */}

        {/* Break Button */}
        {/* <div className="relative">
          <button
            onClick={() => setShowBreakCard((prev) => !prev)}
            className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
          >
            <FaBusinessTime className="text-green-500 w-5 h-5" />
          </button>
          <AnimatePresence>
            {showBreakCard && (
              <motion.div
                ref={breakCardRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-[350px] z-10"
              >
                <BreakCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div> */}


        {/* Notifications */}
       <div className="relative" ref={notificationDropdownRef}>
          <button
            onClick={() => setShowNotificationDropdown((prev) => !prev)}
            className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
          >
            <FaBell className="text-gray-700 w-5 h-5" />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}

        </div>

        {/* Profile */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ID : {userID}</p>
            </div>
            <img
              src={userAvatar}
              alt="User"
              className="h-9 w-9 rounded-full object-cover border border-gray-300"
            />
          </div>
         
        </div>
      </div>
    <AnimatePresence>
      {showNotificationDropdown && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-16 right-1 mt-2 z-50"
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
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-16 right-1 mt-2 z-40"
        >
          <ProfileSidebar
            notifications={notifications}
            loading={loading}
            error={error}
            onClose={() => setShowProfileDropdown(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </nav>
  );
};

export default Navbar;
