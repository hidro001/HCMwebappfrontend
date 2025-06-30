// import { FaUserCircle } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { IoClose } from 'react-icons/io5';
// import { motion } from "framer-motion";
// import useAuthStore from "../../store/store";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProfileSidebar = ({ onClose }) => {
//   const authStore = useAuthStore();
//   const userAvatar =
//     authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userName = authStore.userName || "John Doe";
//   const userID = authStore.employeeId || "RI0000";
//   const userEmail = authStore.workingEmail || "john.doe@example.com";
//   const userDepart = authStore.department || "Work";
//   const userDesignation = authStore.designation || "john.doe";

//   const navigate = useNavigate();

//   // Sign out
//   const handleSignOut = () => {
//     authStore.logout();
//     toast.success("Signed out successfully!");
//     navigate("/");
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 100 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="rounded-lg  w-[360px] h-[auto] bg-white dark:bg-gray-700 shadow-xl z-50"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-600 font-medium cursor-pointer hover:text-red-600"
//         >
//           <IoClose size={24} />
//         </button>

//         <div className="p-2 flex justify-around items-center">
//           <img
//             src={userAvatar}
//             alt="Profile"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div className="flex flex-col items-start">
//             <h3 className="font-semibold text-md text-gray-800">
//               {userName}
//             </h3>
//             <span className="text-sm">User ID: {userID}</span>
//             <span className="text-sm truncate max-w-[200px]">
//               {userEmail}
//             </span>
//             <span className="text-sm">Department: {userDepart}</span>
//             <span className="text-sm truncate max-w-[210px]">Designation: { userDesignation}</span>
//           </div>
//         </div>

//         <div className="mx-4 flex justify-between items-center">

//           <Link to={"/dashboard/my-profile"} className="text-black flex items-center cursor-pointer font-medium hover:text-blue-900" >
//             <FaUserCircle /> <p className="pl-1">My Account</p>
//           </Link>

//           <button onClick={handleSignOut} className="text-red-600 flex items-center cursor-pointer font-medium hover:bg-red-600 hover:text-white rounded-md px-2 py-1 my-2">
//             <FiLogOut /> <p className="pl-1">Sign Out</p>
//           </button>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default ProfileSidebar;

// import { useState } from "react";
// import { FaUserCircle, FaUserCog } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";
// import { RiDashboardLine } from "react-icons/ri";
// import { BsBellFill } from "react-icons/bs";
// import { HiOutlineMail } from "react-icons/hi";
// import { motion, AnimatePresence } from "framer-motion";
// import useAuthStore from "../../store/store";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProfileSidebar = ({ onClose }) => {
//   const authStore = useAuthStore();
//   const [activeTab, setActiveTab] = useState("profile");

//   const userAvatar =
//     authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
//   const userName = authStore.userName || "John Doe";
//   const userID = authStore.employeeId || "RI0000";
//   const userEmail = authStore.workingEmail || "john.doe@example.com";
//   const userDepart = authStore.department || "Work";
//   const userDesignation = authStore.designation || "john.doe";

//   const navigate = useNavigate();

//   // Sign out
//   const handleSignOut = () => {
//     authStore.logout();
//     toast.success("Signed out successfully!");
//     navigate("/");
//   };

//   const menuItems = [
//     { id: "profile", icon: <FaUserCircle size={18} />, label: "Profile" },
//     { id: "dashboard", icon: <RiDashboardLine size={18} />, label: "Dashboard" },
//     { id: "settings", icon: <FaUserCog size={18} />, label: "Settings" }
//   ];

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 100 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="rounded-2xl w-80 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl z-50 overflow-hidden border border-slate-200 dark:border-gray-700"
//       >
//         {/* Header with Close Button */}
//         <div className="relative h-28 bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="absolute top-3 right-3 bg-white/20 p-1 rounded-full text-white hover:bg-white/30 transition-all"
//           >
//             <IoClose size={20} />
//           </motion.button>

//           <div className="flex items-center mt-6">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="relative"
//             >
//               <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
//                 <img
//                   src={userAvatar}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
//             </motion.div>

//             <div className="ml-3 text-white">
//               <h3 className="font-bold text-lg">{userName}</h3>
//               <div className="flex items-center mt-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
//                 <span className="truncate max-w-40">{userEmail}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* User Details */}
//         <div className="p-4 pt-3">
//           <div className="flex flex-wrap gap-2 mb-3">
//             <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
//               <div className="text-xs text-gray-500 dark:text-gray-400">Employee ID</div>
//               <div className="font-medium text-gray-800 dark:text-gray-200">{userID}</div>
//             </div>
//             <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
//               <div className="text-xs text-gray-500 dark:text-gray-400">Department</div>
//               <div className="font-medium text-gray-800 dark:text-gray-200 truncate">{userDepart}</div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm mb-4">
//             <div className="text-xs text-gray-500 dark:text-gray-400">Designation</div>
//             <div className="font-medium text-gray-800 dark:text-gray-200">{userDesignation}</div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
//             {menuItems.map((item) => (
//               <motion.button
//                 key={item.id}
//                 whileTap={{ scale: 0.97 }}
//                 className={`flex items-center justify-center flex-1 py-2 rounded-md text-sm transition-all ${
//                   activeTab === item.id
//                     ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-medium"
//                     : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
//                 }`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <span className="mr-1">{item.icon}</span>
//                 {item.label}
//               </motion.button>
//             ))}
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-3 gap-2 mb-4">
//             <motion.div
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer"
//             >
//               <Link to="/dashboard/my-profile" className="flex flex-col items-center text-blue-600 dark:text-blue-400">
//                 <FaUserCircle size={22} />
//                 <span className="text-xs mt-1">Profile</span>
//               </Link>
//             </motion.div>

//             <motion.div
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer"
//             >
//               <div className="flex flex-col items-center text-purple-600 dark:text-purple-400">
//                 <BsBellFill size={22} />
//                 <span className="text-xs mt-1">Alerts</span>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer"
//             >
//               <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
//                 <HiOutlineMail size={22} />
//                 <span className="text-xs mt-1">Messages</span>
//               </div>
//             </motion.div>
//           </div>

//           {/* Sign Out Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleSignOut}
//             className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-all"
//           >
//             <FiLogOut size={18} className="mr-2" />
//             Sign Out
//           </motion.button>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProfileSidebar;

import { useState } from "react";
import { FaUserCircle, FaUserCog, FaTasks } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiDashboardLine, RiBarChartFill } from "react-icons/ri";
import { BsBellFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileSidebar = ({ onClose }) => {
  const authStore = useAuthStore();
  const [activeTab, setActiveTab] = useState("synergy");

  const userAvatar =
    authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const userName = authStore.userName || "John Doe";
  const userID = authStore.employeeId || "RI0000";
  const userEmail = authStore.workingEmail || "john.doe@example.com";
  const userDepart = authStore.department || "Work";
  const userDesignation = authStore.designation || "john.doe";

  const navigate = useNavigate();

  // Sign out
  const handleSignOut = async () => {
    try {
      await authStore.logout();
      toast.success("Signed out successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong during logout.");
    }
  };

  // Handle tab navigation
  const handleTabClick = (tabId, route) => {
    setActiveTab(tabId);
    navigate(route);
    onClose(); // Close the sidebar after navigation
  };

  const handleQuickActionClick = (route) => {
    navigate(route);
    onClose();
  };

  const menuItems = [
    {
      id: "synergy",
      icon: <RiDashboardLine size={18} />,
      label: "Synergy",
      route: "/dashboard/engagement-feed",
    },
    {
      id: "dailyTask",
      icon: <FaTasks size={18} />,
      label: "Task",
      route: "/dashboard/daily-task",
    },
    {
      id: "performance",
      icon: <RiBarChartFill size={18} />,
      label: "Performance",
      route: "/dashboard/my-performance",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="rounded-2xl w-80 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl z-50 overflow-hidden border border-slate-200 dark:border-gray-700"
      >
        {/* Header with Close Button */}
        <div className="relative h-28 bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/20 p-1 rounded-full text-white hover:bg-white/30 transition-all"
          >
            <IoClose size={20} />
          </motion.button>

          <div className="flex items-center mt-6">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </motion.div>

            <div className="ml-3 text-white">
              <h3 className="font-bold text-lg">{userName}</h3>
              <div className="flex items-center mt-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
                <span className="truncate max-w-40">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 pt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Employee ID
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {userID}
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Department
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {userDepart}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Designation
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {userDesignation}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center flex-1 py-2 rounded-md text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
                onClick={() => handleTabClick(item.id, item.route)}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl flex flex-col items-center justify-center"
              onClick={() => handleQuickActionClick("/dashboard/my-profile")}
            >
              <div className="flex flex-col items-center text-blue-600 dark:text-blue-400  cursor-pointer">
                <FaUserCircle size={22} />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-xl flex flex-col items-center justify-center"
              onClick={() => handleQuickActionClick("/dashboard/notifications")}
            >
              <div className="flex flex-col items-center text-purple-600 dark:text-purple-400  cursor-pointer">
                <BsBellFill size={22} />
                <span className="text-xs mt-1">Alerts</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-xl flex flex-col items-center justify-center "
              onClick={() => handleQuickActionClick("/dashboard/chats")}
            >
              <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400  cursor-pointer">
                <HiOutlineMail size={22} />
                <span className="text-xs mt-1">Messages</span>
              </div>
            </motion.div>
          </div>

          {/* Sign Out Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-all"
          >
            <FiLogOut size={18} className="mr-2" />
            Sign Out
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileSidebar;
