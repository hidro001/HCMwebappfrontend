// // src/components/Navbar.js
// import React, { useState } from "react";
// import { FaBell, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
// import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/store";
// import { toast } from "react-toastify";
// import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";

// const Navbar = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [currentDateTime, setCurrentDateTime] = useState({
//     date: "",
//     time: "",
//   });

//   const authStore = useAuthStore();
//   const navigate = useNavigate();

//   // Toggle Profile Dropdown
//   const toggleDropdown = () => setShowDropdown((prev) => !prev);

//   // Toggle Theme
//   // const toggleThemeHandler = () =>
//   //   setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   // Update Date and Time
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     const now = new Date();
//   //     setCurrentDateTime({
//   //       date: now.toLocaleDateString("en-US", {
//   //         weekday: "long",
//   //         month: "long",
//   //         day: "numeric",
//   //       }),
//   //       time: now.toLocaleTimeString("en-US", {
//   //         hour: "2-digit",
//   //         minute: "2-digit",
//   //         second: "2-digit",
//   //       }),
//   //     });
//   //   }, 1000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   const handleSignOut = () => {
//     authStore.logout();
//     toast.success("Signed out successfully!");
//     navigate("/");
//   };

//   const companyLogo =
//     authStore.companyInfo?.logo ||
//     "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userAvatar =
//     authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userName = authStore.userName || "John Doe";
//   const userEmail = authStore.workingEmail || "john.doe@example.com";

//   return (
//     <nav
//       className={
//         "bg-gray-200 text-black dark:text-white dark:bg-gray-800 z-50 border-b border-gray-500 px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 shadow-md "
//       }
//     >
//       {/* Left Section: Company Branding */}
//       <div className="flex items-center space-x-4">
//         <div className="text-2xl font-bold text-white">
//           <img className="w-24" src={companyLogo} alt="Company Logo" />
//         </div>
//         <div className="hidden sm:block text-xs font-light">
//           Empowering Teams, Building Successs
//         </div>
//       </div>

//       {/* Center Section
//       <div className="hidden md:flex items-center space-x-8">
//         <a
//           href="#dashboard"
//           className="flex items-center hover:text-gray-500 space-x-2"
//         >
//           <FaHome className="text-yellow-400" />
//           <span className="text-xs">Dashboard</span>
//         </a>
//       </div> */}

//       {/* Right Section */}
//       <div className="flex items-center space-x-6">
//         <div className="hidden md:block text-sm text-center">
//           {/* <div className="text-yellow-300 font-semibold text-xs">
//             {currentDateTime.date}
//           </div>
//           <div className="text-blue-300 font-bold text-xs">
//             {currentDateTime.time}
//           </div> */}
//         </div>

//         <div className="relative">
//           <FaBell className="text-yellow-400 w-6 h-6 cursor-pointer" />
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//             3
//           </span>
//         </div>

//         <ThemeToggleButton/>

//         <div className="relative">
//           <button
//             className="flex items-center space-x-2 focus:outline-none"
//             onClick={toggleDropdown}
//           >
//             <img
//               src={userAvatar}
//               alt="Profile"
//               className="w-8 h-8 rounded-full object-cover"
//             />
//           </button>

//           {showDropdown && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="absolute right-0 mt-2 w-48 bg-gray-700 dark:shadow-slate-600 text-white rounded-md shadow-lg z-10"
//             >
//               <div className="p-4 border-b border-gray-600">
//                 <p className="text-sm font-semibold">{userName}</p>
//                 <p className="text-xs text-gray-300">{userEmail}</p>
//               </div>
//               <ul className="py-2">
//                 <li>
//                   <a
//                     href="#dashboard"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
//                   >
//                     <FaHome className="mr-2 text-blue-400" /> Dashboard
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#settings"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
//                   >
//                     <FaCog className="mr-2 text-green-400" /> Settings
//                   </a>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleSignOut}
//                     className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-600 focus:outline-none"
//                   >
//                     <FaSignOutAlt className="mr-2 text-red-400" /> Sign Out
//                   </button>
//                 </li>
//               </ul>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React, { useEffect } from "react";
import { FaBell, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import useNotificationStore from "../../store/notificationStore"; // Import notification store
import { toast } from "react-toastify";
import ThemeToggleButton from "../theme toggle button/ThemeToggleButton";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();

  const navigate = useNavigate();

  // Toggle Profile Dropdown
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

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

  // Fetch notifications on component mount if not already fetched
  useEffect(() => {
    if (authStore.isAuthenticated && notificationStore.notifications.length === 0) {
      notificationStore.fetchNotifications();
    }
  }, [authStore.isAuthenticated, notificationStore]);

  return (
    <nav
      className={
        "bg-gray-200 text-black dark:text-white dark:bg-gray-800 z-50 border-b border-gray-500 px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 shadow-md "
      }
    >
      {/* Left Section: Company Branding */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-white">
          <img className="w-24" src={companyLogo} alt="Company Logo" />
        </div>
        <div className="hidden sm:block text-xs font-light">
          Empowering Teams, Building Successs
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon with Unread Count */}
        <div className="relative">
          <FaBell
            className="text-yellow-400 w-6 h-6 cursor-pointer"
            onClick={() => {
              setShowDropdown((prev) => !prev);
              // Optionally, mark all as read when opening dropdown
              // notificationStore.markAllAsRead();
            }}
          />
          {notificationStore.unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {notificationStore.unreadCount}
            </span>
          )}
        </div>

        <ThemeToggleButton />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-gray-700 dark:shadow-slate-600 text-white rounded-md shadow-lg z-10"
            >
              <div className="p-4 border-b border-gray-600">
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-xs text-gray-300">{userEmail}</p>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <FaHome className="mr-2 text-blue-400" /> Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#settings"
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
        </div>
      </div>

      {/* Notification Dropdown */}
      {showDropdown && (
        <div className="absolute right-4 top-16 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <Typography variant="h6">Notifications</Typography>
            {notificationStore.unreadCount > 0 && (
              <Button
                size="small"
                onClick={() => notificationStore.markAllAsRead()}
              >
                Mark All as Read
              </Button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notificationStore.isLoading ? (
              <div className="flex justify-center items-center p-4">
                <CircularProgress size={24} />
              </div>
            ) : notificationStore.notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications available.
              </div>
            ) : (
              notificationStore.notifications.slice(0, 5).map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-200 dark:border-gray-600 ${
                    !notif.isRead ? 'bg-gray-100 dark:bg-gray-600' : ''
                  } cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-500`}
                  onClick={() => notificationStore.markAsRead(notif.id)}
                >
                  <Typography variant="subtitle2">{notif.title}</Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                    {notif.message}
                  </Typography>
                </div>
              ))
            )}
          </div>
          {notificationStore.notifications.length > 5 && (
            <div className="p-4 text-center">
              <Button
                variant="text"
                onClick={() => navigate('/notifications')}
                color="primary"
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
