// import { useEffect, useState, useRef, useContext } from "react";
// import { FaBell, FaSignOutAlt, FaComments, FaUserCircle, FaBusinessTime} from "react-icons/fa";
// import { MdChat } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import logo from '../../assets/logo/logo-eye.webp';
// import useAuthStore from "../../store/store";
// import useNotificationStore from "../../store/notificationStore";
// import usePunchStore from "../../store/usePunchStore";
// import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";
// import NotificationDropdown from "../Notification/NotificationDropdown";
// import { GoSidebarCollapse } from "react-icons/go";
// import { ChatContextv2 } from "../../contexts/ChatContextv2";
// import ProfileSidebar from "./ProfileCard";
// import BreakCard from "./BreakCard";


// // Format seconds into HH:MM:SS
// function formatHMS(totalSeconds) {
//   const hrs = Math.floor(totalSeconds / 3600);
//   const mins = Math.floor((totalSeconds % 3600) / 60);
//   const secs = totalSeconds % 60;

//   const hh = hrs < 10 ? `0${hrs}` : hrs;
//   const mm = mins < 10 ? `0${mins}` : mins;
//   const ss = secs < 10 ? `0${secs}` : secs;
//   return `${hh}:${mm}:${ss}`;
// }

// const Navbar = ({ collapsed, setCollapsed }) => {

//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showNotificationDropdown, setShowNotificationDropdown] =useState(false);
//   const [showBreakCard, setShowBreakCard] = useState(false);

//   const { unreadCounts = {} } = useContext(ChatContextv2);
//   const personsWithUnread = Object.values(unreadCounts).filter(
//     (count) => count > 0
//   ).length;

//   const navigate = useNavigate();
//   const [showBadge, setShowBadge] = useState(true);

//   const handleClick = () => {
//     setShowBadge(false);
//     navigate("/dashboard/chats");
//   };

//   const authStore = useAuthStore();

//   const fetchNotifications = useNotificationStore(
//     (state) => state.fetchNotifications
//   );
//   const unreadCount = useNotificationStore((state) => state.unreadCount);
//   const notifications = useNotificationStore((state) => state.notifications);
//   const loading = useNotificationStore((state) => state.loading);
//   const error = useNotificationStore((state) => state.error);

//   const {
//     onBreak,
//     breakStartTime,
//     fetchAttendanceData,
//     fetchTargetCoordinates,
//     fetchUserBreakType,
//     getUserLocation,
//   } = usePunchStore();

//   const [navbarTimer, setNavbarTimer] = useState("00:00:00");

//   useEffect(() => {
//     if (authStore.isAuthenticated) {
//       fetchAttendanceData();
//       fetchTargetCoordinates();
//       fetchUserBreakType(authStore.employeeId);
//       getUserLocation();
//     }
//   }, [authStore.isAuthenticated]);

//   useEffect(() => {
//     if (authStore.isAuthenticated) {
//       fetchNotifications();
//     }
//   }, [authStore.isAuthenticated, fetchNotifications]);



//   useEffect(() => {
//     let intervalId;
//     if (onBreak && breakStartTime) {
//       updateTimer();
//       intervalId = setInterval(updateTimer, 1000);
//     } else {
//       setNavbarTimer("00:00:00");
//     }
//     return () => clearInterval(intervalId);
//   }, [onBreak, breakStartTime]);

//   const updateTimer = () => {
//     const now = new Date();
//     const diffSec = Math.floor((now - new Date(breakStartTime)) / 1000);
//     if (diffSec < 0) {
//       setNavbarTimer("00:00:00");
//     } else {
//       setNavbarTimer(formatHMS(diffSec));
//     }
//   };

//   const companyLogo =
//     authStore.companyInfo?.logo ||
//     "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userAvatar =
//     authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userName = authStore.userName || "John Doe";
//   const userID = authStore.employeeId || "john.doe@example.com";

//   const profileDropdownRef = useRef(null);
//   const notificationDropdownRef = useRef(null);
//   const breakCardRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         showProfileDropdown &&
//         profileDropdownRef.current &&
//         !profileDropdownRef.current.contains(event.target)
//       ) {
//         setShowProfileDropdown(false);
//       }
//       if (
//         showNotificationDropdown &&
//         notificationDropdownRef.current &&
//         !notificationDropdownRef.current.contains(event.target)
//       ) {
//         setShowNotificationDropdown(false);
//       }
//       if (
//         showBreakCard &&
//         breakCardRef.current &&
//         !breakCardRef.current.contains(event.target)
//       ) {
//         setShowBreakCard(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showProfileDropdown, showNotificationDropdown, showBreakCard]);

//   const getDashboardPath = () => {
//     switch (authStore.userRole?.toLowerCase()) {
//       case "employee":
//         return "/dashboard/employee";
//       case "super-admin":
//         return "/dashboard/super-employee-dashboard";
//       default:
//         return "/dashboard/employee";
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex justify-between items-center pr-4 bg-white shadow-sm shadow-gray-100 w-full  navbar-shadow ">
      
//       <div className="flex gap-4">
//         <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-black dark:text-white rounded-full ml-2 p-3 hover:text-gray-500 hover:bg-gray-200"
//           >
//             <GoSidebarCollapse size={25} />
//         </button>
//         <Link to={getDashboardPath()}>
//           <img className="h-10 object-contain" src={logo} alt="Company Logo" />
//         </Link>
//       </div>

     
//       <div className="flex items-center gap-4">

//       {/* Chat */}
//         <div className="relative">
//           <button
//             onClick={handleClick}
//             className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
//           >
//             <MdChat className="text-gray-700 w-5 h-5" />
//           </button>
//           {personsWithUnread > 0 && (
//             <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
//               {personsWithUnread}
//             </span>
//           )}
//         </div>

//          {/* Theme Toggle */}
//         <ThemeToggleButton />
         
          

//         {onBreak && (
//           <span className="text-sm font-semibold text-green-600">Break: {navbarTimer}</span>
//         )}

//         {/* Break Button */}
//         <div className="relative">
//           <button
//             onClick={() => setShowBreakCard((prev) => !prev)}
//             className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
//           >
//             <FaBusinessTime className="text-green-500 w-5 h-5" />
//           </button>
//           <AnimatePresence>
//             {showBreakCard && (
//               <motion.div
//                 ref={breakCardRef}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute right-0 mt-2 w-[350px] z-10"
//               >
//                 <BreakCard />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>


//         {/* Notifications */}
//        <div className="relative" ref={notificationDropdownRef}>
//           <button
//             onClick={() => setShowNotificationDropdown((prev) => !prev)}
//             className="p-2 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100"
//           >
//             <FaBell className="text-gray-700 w-5 h-5" />
//           </button>

//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
//               {unreadCount}
//             </span>
//           )}

//         </div>

//         {/* Profile */}
//         <div className="relative">
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setShowProfileDropdown((prev) => !prev)}
//           >
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-medium text-gray-800 dark:text-white">{userName}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">ID : {userID}</p>
//             </div>
//             <img
//               src={userAvatar}
//               alt="User"
//               className="h-9 w-9 rounded-full object-cover border border-gray-300"
//             />
//           </div>
         
//         </div>
//       </div>
//     <AnimatePresence>
//       {showNotificationDropdown && (
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="absolute top-16 right-1 mt-2 z-50"
//         >
//           <NotificationDropdown
//             notifications={notifications}
//             loading={loading}
//             error={error}
//             onClose={() => setShowNotificationDropdown(false)}
//           />
//         </motion.div>
//       )}
//     </AnimatePresence>
//     <AnimatePresence>
//       {showProfileDropdown && (
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 100 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="absolute top-16 right-1 mt-2 z-40"
//         >
//           <ProfileSidebar
//             notifications={notifications}
//             loading={loading}
//             error={error}
//             onClose={() => setShowProfileDropdown(false)}
//           />
//         </motion.div>
//       )}
//     </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;


// import { useEffect, useState, useRef, useContext } from "react";
// import { 
//   RiNotification3Line, 
//   RiLogoutBoxRLine, 
//   RiMessage3Line, 
//   RiUser3Line, 
//   RiTimeLine,
//   RiMenuFoldLine,
//   RiMenuUnfoldLine, 
//   RiSunLine, 
//   RiMoonLine,
//   RiDashboardLine
// } from "react-icons/ri";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import logo from '../../assets/logo/logo-eye.webp';
// import useAuthStore from "../../store/store";
// import useNotificationStore from "../../store/notificationStore";
// import usePunchStore from "../../store/usePunchStore";
// import NotificationDropdown from "../Notification/NotificationDropdown";
// import { ChatContextv2 } from "../../contexts/ChatContextv2";
// import ProfileSidebar from "./ProfileCard";
// import BreakCard from "./BreakCard";

// // Format seconds into HH:MM:SS
// function formatHMS(totalSeconds) {
//   const hrs = Math.floor(totalSeconds / 3600);
//   const mins = Math.floor((totalSeconds % 3600) / 60);
//   const secs = totalSeconds % 60;

//   const hh = hrs < 10 ? `0${hrs}` : hrs;
//   const mm = mins < 10 ? `0${mins}` : mins;
//   const ss = secs < 10 ? `0${secs}` : secs;
//   return `${hh}:${mm}:${ss}`;
// }

// const Navbar = () => {
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
//   const [showBreakCard, setShowBreakCard] = useState(false);
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('theme') || 'light';
//   });

//   const { unreadCounts = {} } = useContext(ChatContextv2);
//   const personsWithUnread = Object.values(unreadCounts).filter(
//     (count) => count > 0
//   ).length;

//   const navigate = useNavigate();
//   const [showBadge, setShowBadge] = useState(true);

//   const authStore = useAuthStore();

//   const fetchNotifications = useNotificationStore(
//     (state) => state.fetchNotifications
//   );
//   const unreadCount = useNotificationStore((state) => state.unreadCount);
//   const notifications = useNotificationStore((state) => state.notifications);
//   const loading = useNotificationStore((state) => state.loading);
//   const error = useNotificationStore((state) => state.error);

//   const { 
//     onBreak, 
//     breakStartTime, 
//     fetchAttendanceData, 
//     fetchTargetCoordinates, 
//     fetchUserBreakType, 
//     getUserLocation 
//   } = usePunchStore();

//   const [navbarTimer, setNavbarTimer] = useState("00:00:00");

//   // Toggle theme function
//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.toggle('dark');
//   };

//   useEffect(() => {
//     // Set initial theme
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   useEffect(() => {
//     if (authStore.isAuthenticated) {
//       fetchAttendanceData();
//       fetchTargetCoordinates();
//       fetchUserBreakType(authStore.employeeId);
//       getUserLocation();
//     }
//   }, [authStore.isAuthenticated]);

//   useEffect(() => {
//     if (authStore.isAuthenticated) {
//       fetchNotifications();
//     }
//   }, [authStore.isAuthenticated, fetchNotifications]);

//   useEffect(() => {
//     let intervalId;
//     if (onBreak && breakStartTime) {
//       updateTimer();
//       intervalId = setInterval(updateTimer, 1000);
//     } else {
//       setNavbarTimer("00:00:00");
//     }
//     return () => clearInterval(intervalId);
//   }, [onBreak, breakStartTime]);

//   const updateTimer = () => {
//     const now = new Date();
//     const diffSec = Math.floor((now - new Date(breakStartTime)) / 1000);
//     if (diffSec < 0) {
//       setNavbarTimer("00:00:00");
//     } else {
//       setNavbarTimer(formatHMS(diffSec));
//     }
//   };

//   const handleChatClick = () => {
//     setShowBadge(false);
//     navigate("/dashboard/chats");
//   };

//   const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userName = authStore.userName || "John Doe";
//   const userID = authStore.employeeId || "john.doe@example.com";

//   const profileDropdownRef = useRef(null);
//   const notificationDropdownRef = useRef(null);
//   const breakCardRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         showProfileDropdown &&
//         profileDropdownRef.current &&
//         !profileDropdownRef.current.contains(event.target)
//       ) {
//         setShowProfileDropdown(false);
//       }
//       if (
//         showNotificationDropdown &&
//         notificationDropdownRef.current &&
//         !notificationDropdownRef.current.contains(event.target)
//       ) {
//         setShowNotificationDropdown(false);
//       }
//       if (
//         showBreakCard &&
//         breakCardRef.current &&
//         !breakCardRef.current.contains(event.target)
//       ) {
//         setShowBreakCard(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showProfileDropdown, showNotificationDropdown, showBreakCard]);

//   const getDashboardPath = () => {
//     switch (authStore.userRole?.toLowerCase()) {
//       case "employee":
//         return "/dashboard/employee";
//       case "super-admin":
//         return "/dashboard/super-employee-dashboard";
//       default:
//         return "/dashboard/employee";
//     }
//   };

//   // Icon button component for reusability
//   const IconButton = ({ icon, onClick, notification = 0, color = "blue", tooltip }) => (
//     <div className="relative">
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onClick}
//         className={`p-2.5 rounded-full bg-opacity-20 dark:bg-opacity-20 bg-${color}-500 hover:bg-${color}-400 dark:bg-${color}-600 dark:hover:bg-${color}-500 backdrop-blur-sm text-${color}-600 dark:text-${color}-400 transition-all duration-300 ease-in-out relative group shadow-lg shadow-${color}-500/20 dark:shadow-${color}-500/10`}
//         aria-label={tooltip}
//       >
//         {icon}
//         {tooltip && (
//           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//             {tooltip}
//           </div>
//         )}
//       </motion.button>
//       {notification > 0 && (
//         <motion.span
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
//         >
//           {notification}
//         </motion.span>
//       )}
//     </div>
//   );

//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/50 flex justify-between items-center px-4 py-1 shadow-lg dark:shadow-gray-900/30 border-b border-gray-100 dark:border-gray-800 transition-all duration-300`}
//     >
//       <div className="flex items-center gap-4">
   
        
//         <Link to={getDashboardPath()} className="flex items-center">
//           <motion.img 
//             whileHover={{ rotate: 5 }}
//             className="h-10 object-contain" 
//             src={logo} 
//             alt="Company Logo" 
//           />
//           <motion.span 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="ml-2 text-lg font-semibold text-gray-800 dark:text-white hidden md:block"
//           >
//             HCM Portal
//           </motion.span>
//         </Link>
//       </div>

//       <div className="flex items-center gap-1 sm:gap-3">
//         {onBreak && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full"
//           >
//             <RiTimeLine className="text-green-600 dark:text-green-400" />
//             <span className="text-sm font-medium text-green-600 dark:text-green-400">
//               {navbarTimer}
//             </span>
//           </motion.div>
//         )}

//         {/* <IconButton 
//           icon={<RiDashboardLine size={20} />} 
//           onClick={() => navigate(getDashboardPath())}
//           color="indigo"
//           tooltip="Dashboard"
//         /> */}

//         <IconButton 
//           icon={<RiMessage3Line size={20} />} 
//           onClick={handleChatClick}
//           notification={personsWithUnread}
//           color="emerald"
//           tooltip="Messages"
//         />
        
//         <IconButton 
//           icon={<RiTimeLine size={20} />} 
//           onClick={() => setShowBreakCard(!showBreakCard)}
//           color="amber"
//           tooltip="Break Time"
//         />
        
//         <IconButton 
//           icon={<RiNotification3Line size={20} />} 
//           onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
//           notification={unreadCount}
//           color="red"
//           tooltip="Notifications"
//         />

//         <IconButton 
//           icon={theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />} 
//           onClick={toggleTheme}
//           color="purple"
//           tooltip={theme === 'dark' ? "Light Mode" : "Dark Mode"}
//         />
        
//       <motion.div 
//           // variants={itemVariants}
//           className="relative ml-1"
//           whileHover={{ scale: 1.05 }}
//         >
//           <motion.div
//             // whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
//             className="flex items-center gap-3 cursor-pointer rounded-full pl-3 pr-2 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 border border-blue-100 dark:border-blue-800"
//             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//           >
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-medium text-gray-800 dark:text-white">{userName}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">ID: {userID}</p>
//             </div>
//             <motion.div
//               whileHover={{ rotate: 5, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               className="relative"
//             >
//               <img
//                 src={userAvatar}
//                 alt="User"
//                 className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
//               />
//               <motion.div 
//                 animate={{ scale: [1, 1.2, 1] }} 
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" 
//               />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Dropdowns */}
//       <AnimatePresence>
//         {showNotificationDropdown && (
//           <motion.div
//             ref={notificationDropdownRef}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             className="absolute top-16 right-4 mt-2 z-50"
//           >
//             <NotificationDropdown
//               notifications={notifications}
//               loading={loading}
//               error={error}
//               onClose={() => setShowNotificationDropdown(false)}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showProfileDropdown && (
//           <motion.div
//             ref={profileDropdownRef}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             className="absolute top-16 right-4 mt-2 z-40"
//           >
//             <ProfileSidebar
//               notifications={notifications}
//               loading={loading}
//               error={error}
//               onClose={() => setShowProfileDropdown(false)}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showBreakCard && (
//           <motion.div
//             ref={breakCardRef}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             className="absolute top-16 right-12 mt-2 z-30"
//           >
//             <BreakCard />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;

import { useEffect, useState, useRef, useContext } from "react";
import { 
  RiNotification3Line, 
  RiLogoutBoxRLine, 
  RiMessage3Line, 
  RiUser3Line, 
  RiTimeLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine, 
  RiSunLine, 
  RiMoonLine,
  RiDashboardLine
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo-eye.webp';
import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore";
import usePunchStore from "../../store/usePunchStore";
import NotificationDropdown from "../Notification/NotificationDropdown";
import { ChatContextv2 } from "../../contexts/ChatContextv2";
import ProfileSidebar from "./ProfileCard";
import BreakCard from "./BreakCard";

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

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showBreakCard, setShowBreakCard] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const { unreadCounts = {} } = useContext(ChatContextv2);
  const personsWithUnread = Object.values(unreadCounts).filter(
    (count) => count > 0
  ).length;

  const navigate = useNavigate();
  const [showBadge, setShowBadge] = useState(true);

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
    getUserLocation 
  } = usePunchStore();

  const [navbarTimer, setNavbarTimer] = useState("00:00:00");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Set initial theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const handleChatClick = () => {
    setShowBadge(false);
    navigate("/dashboard/chats");
  };

  const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userID = authStore.employeeId || "john.doe@example.com";

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const breakCardRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is on the profile button - if so, we'll handle it separately
      if (profileButtonRef.current && profileButtonRef.current.contains(event.target)) {
        return;
      }
      
      // Only close profile dropdown if click is outside both the dropdown and the button
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

  // Toggle function for profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prevState => !prevState);
  };

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

  // Icon button component for reusability
  const IconButton = ({ icon, onClick, notification = 0, color = "blue", tooltip }) => (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`p-2.5 rounded-full bg-opacity-20 dark:bg-opacity-20 bg-${color}-500 hover:bg-${color}-400 dark:bg-${color}-600 dark:hover:bg-${color}-500 backdrop-blur-sm text-${color}-600 dark:text-${color}-400 transition-all duration-300 ease-in-out relative group shadow-lg shadow-${color}-500/20 dark:shadow-${color}-500/10`}
        aria-label={tooltip}
      >
        {icon}
        {tooltip && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {tooltip}
          </div>
        )}
      </motion.button>
      {notification > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
        >
          {notification}
        </motion.span>
      )}
    </div>
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/50 flex justify-between items-center px-4 py-1 shadow-lg dark:shadow-gray-900/30 border-b border-gray-100 dark:border-gray-800 transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
   
        
        <Link to={getDashboardPath()} className="flex items-center">
          <motion.img 
            whileHover={{ rotate: 5 }}
            className="h-10 object-contain" 
            src={logo} 
            alt="Company Logo" 
          />
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="ml-2 text-lg font-semibold text-gray-800 dark:text-white hidden md:block"
          >
            HCM Portal
          </motion.span>
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        {onBreak && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full"
          >
            <RiTimeLine className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {navbarTimer}
            </span>
          </motion.div>
        )}

        <IconButton 
          icon={<RiMessage3Line size={20} />} 
          onClick={handleChatClick}
          notification={personsWithUnread}
          color="emerald"
          tooltip="Messages"
        />
        
        <IconButton 
          icon={<RiTimeLine size={20} />} 
          onClick={() => setShowBreakCard(!showBreakCard)}
          color="amber"
          tooltip="Break Time"
        />
        
        <IconButton 
          icon={<RiNotification3Line size={20} />} 
          onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
          notification={unreadCount}
          color="red"
          tooltip="Notifications"
        />

        <IconButton 
          icon={theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />} 
          onClick={toggleTheme}
          color="purple"
          tooltip={theme === 'dark' ? "Light Mode" : "Dark Mode"}
        />
        
      <motion.div 
          className="relative ml-1"
          whileHover={{ scale: 1.05 }}
          ref={profileButtonRef}
        >
          <motion.div
            className="flex items-center gap-3 cursor-pointer rounded-full pl-3 pr-2 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 border border-blue-100 dark:border-blue-800"
            onClick={toggleProfileDropdown}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ID: {userID}</p>
            </div>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <img
                src={userAvatar}
                alt="User"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dropdowns */}
      <AnimatePresence>
        {showNotificationDropdown && (
          <motion.div
            ref={notificationDropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-16 right-4 mt-2 z-50"
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
            ref={profileDropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-16 right-4 mt-2 z-40"
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

      <AnimatePresence>
        {showBreakCard && (
          <motion.div
            ref={breakCardRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-16 right-12 mt-2 z-30"
          >
            <BreakCard />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;