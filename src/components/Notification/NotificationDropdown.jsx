// import { motion } from "framer-motion";
// import { FaExclamationCircle, FaInfoCircle, FaBirthdayCake, FaBell } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import useNotificationStore from "../../store/notificationStore";
// import { useNavigate } from "react-router-dom";
// import { IoClose } from 'react-icons/io5';
// import { MdOutlineCalendarToday } from 'react-icons/md';

// const NotificationDropdown = ({ notifications, loading, error, onClose }) => {
//   const { markAsRead } = useNotificationStore();
//   const navigate = useNavigate();

//   const handleShowMore = () => {
//     onClose();
//     navigate("/dashboard/notifications");
//   };

//   const handleMarkAsRead = (id) => {
//     markAsRead(id);
//     toast.success("Notification marked as read!");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 100 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className=" p-4 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg">

//       <div className="pb-2 mb-3 flex justify-between items-center border-gray-200 dark:border-gray-600">
//         <h2 className="text-lg font-semibold text-gray-800 flex items-center  gap-2 dark:text-gray-200">
//            <div className='rounded-full bg-yellow-200 text-white p-2'>
//               <FaBell size={20} />
//             </div>
//           Notifications
//         </h2>
//         <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-red-600 transition">
//             <IoClose size={22} />
//           </button>
//       </div>

//       <div className="max-h-60 overflow-y-auto sidebar-scrollbar dark:scrollbar-thumb-neutral-600 scrollbar-track-gray-100 dark:scrollbar-track-neutral-800">
//         {loading ? (
//           <div className="flex justify-center items-center p-4">
//             <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : error ? (
//           <p className="p-4 text-sm text-red-600 dark:text-red-400">{error}</p>
//         ) : notifications.length === 0 ? (
//           <p className="p-4 text-sm text-gray-600 dark:text-gray-300">
//             No notifications available.
//           </p>
//         ) : (
//           notifications.slice(0, 5).map((notification) => (
//             <div
//               key={notification.id}
//               className={`flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition ${
//                 !notification.isRead ? "bg-gray-100 m-1 dark:bg-gray-600" : ""
//               } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500`}
//               onClick={() => handleMarkAsRead(notification.id)}
//             >
//               <div className="mr-3 mt-1">
//                 {notification.type.toLowerCase() === "announcement" ?(
//                   <FaInfoCircle className="text-blue-500" />
//                 ) :
//                 notification.type.toLowerCase() === "birthday" ? (
//                   <FaBirthdayCake className="text-pink-500" />
//                 ):
//                 notification.type.toLowerCase() === "resignation" ? (
//                   <FaExclamationCircle className="text-red-500" />
//                 ) : <MdOutlineCalendarToday size={20} className="text-green-600" /> }
//               </div>
//               {/* <div className="mt-1 text-green-600">
//                 <MdOutlineCalendarToday size={20} />
//               </div> */}
//               <div>
//                 <p
//                   className={`${
//                     !notification.isRead ? "font-bold" : "font-medium"
//                   } text-gray-800 dark:text-gray-200`}
//                 >
//                   {notification.title}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">
//                   {notification.message}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {new Date(notification.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="p-4">
//         <button
//           onClick={handleShowMore}
//           className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           Show More
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default NotificationDropdown;

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaExclamationCircle,
//   FaInfoCircle,
//   FaBirthdayCake,
//   FaBell,
//   FaCheck,
// } from "react-icons/fa";
// import { IoClose, IoFilter } from "react-icons/io5";
// import { MdOutlineCalendarToday } from "react-icons/md";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
// import { toast } from "react-hot-toast";
// import useNotificationStore from "../../store/notificationStore";
// import { useNavigate } from "react-router-dom";

// const NotificationDropdown = ({ notifications, loading, error, onClose }) => {
//   const { markAsRead } = useNotificationStore();
//   const navigate = useNavigate();
//   const [activeFilter, setActiveFilter] = useState("all");

//   const handleShowMore = () => {
//     onClose();
//     navigate("/dashboard/notifications");
//   };

//   const handleMarkAsRead = (id) => {
//     markAsRead(id);
//     toast.success("Notification marked as read!");
//   };

//   const handleMarkAllAsRead = () => {
//     notifications.forEach((notification) => {
//       if (!notification.isRead) {
//         markAsRead(notification.id);
//       }
//     });
//     toast.success("All notifications marked as read!");
//   };

//   const filters = [
//     { id: "all", label: "All" },
//     { id: "announcement", label: "Announcements" },
//     { id: "birthday", label: "Birthdays" },
//     { id: "calendar", label: "Calendar" },
//     { id: "resignation", label: "Alerts" },
//   ];

//   const filteredNotifications = notifications.filter((notification) => {
//     if (activeFilter === "all") return true;
//     return notification.type.toLowerCase() === activeFilter.toLowerCase();
//   });

//   const getIcon = (type) => {
//     switch (type.toLowerCase()) {
//       case "announcement":
//         return (
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-500">
//             <HiOutlineSpeakerphone size={18} />
//           </div>
//         );
//       case "birthday":
//         return (
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-500">
//             <FaBirthdayCake size={18} />
//           </div>
//         );
//       case "resignation":
//         return (
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500">
//             <FaExclamationCircle size={18} />
//           </div>
//         );
//       default:
//         return (
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
//             <MdOutlineCalendarToday size={18} />
//           </div>
//         );
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10, scale: 0.98 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: -10, scale: 0.98 }}
//       transition={{ type: "spring", stiffness: 400, damping: 30 }}
//       className="w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 relative">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
//               <FaBell size={18} className="text-white" />
//             </div>
//             <h2 className="text-lg font-bold text-white">Notifications</h2>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30 transition "
//           >
//             <IoClose size={18} />
//           </motion.button>
//         </div>

//         {/* Filter chips */}
//         <div
//           className="mt-4 flex gap-2 overflow-x-auto pb-2   scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
//         [&::-webkit-scrollbar]:w-1
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                 "
//         >
//           {filters.map((filter) => (
//             <motion.button
//               key={filter.id}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveFilter(filter.id)}
//               className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                 activeFilter === filter.id
//                   ? "bg-white text-indigo-600"
//                   : "bg-white/20 text-white hover:bg-white/30"
//               }`}
//             >
//               {filter.label}
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       {/* Actions bar */}
//       <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-700">
//         <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
//           {filteredNotifications.length} notification
//           {filteredNotifications.length !== 1 ? "s" : ""}
//         </div>
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={handleMarkAllAsRead}
//           className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
//         >
//           <FaCheck size={12} />
//           Mark all as read
//         </motion.button>
//       </div>

//       {/* Notifications list */}
//       <div
//         className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
//       [&::-webkit-scrollbar]:w-1
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600

//       "
//       >
//         <AnimatePresence>
//           {loading ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : error ? (
//             <div className="p-6 flex flex-col items-center justify-center">
//               <FaExclamationCircle size={32} className="text-red-500 mb-2" />
//               <p className="text-sm text-center text-gray-600 dark:text-gray-400">
//                 {error}
//               </p>
//             </div>
//           ) : filteredNotifications.length === 0 ? (
//             <div className="p-8 flex flex-col items-center justify-center">
//               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
//                 <FaBell
//                   size={24}
//                   className="text-gray-400 dark:text-gray-500"
//                 />
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 text-center">
//                 No notifications available.
//               </p>
//             </div>
//           ) : (
//             filteredNotifications.slice(0, 5).map((notification) => (
//               <motion.div
//                 key={notification.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//                 className={`flex items-start gap-3 m-3 p-3 rounded-xl transition-all ${
//                   !notification.isRead
//                     ? "bg-indigo-50 dark:bg-gray-700 border-l-4 border-indigo-500"
//                     : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
//                 } hover:shadow-md cursor-pointer`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // prevent bubbling if parent has click-away logic
//                   handleMarkAsRead(notification.id);
//                 }}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {getIcon(notification.type)}

//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <p
//                       className={`${
//                         !notification.isRead ? "font-bold" : "font-medium"
//                       } text-gray-800 dark:text-gray-200`}
//                     >
//                       {notification.title}
//                     </p>
//                     {!notification.isRead && (
//                       <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                     {notification.message}
//                   </p>
//                   <div className="flex justify-between items-center mt-2">
//                     <p className="text-xs text-gray-500 dark:text-gray-500">
//                       {new Date(notification.createdAt).toLocaleString(
//                         undefined,
//                         {
//                           month: "short",
//                           day: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         }
//                       )}
//                     </p>

//                     {!notification.isRead && (
//                       <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
//                         New
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Footer */}
//       <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={handleShowMore}
//           className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
//         >
//           View All Notifications
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default NotificationDropdown;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaBirthdayCake,
  FaBell,
  FaCheck,
} from "react-icons/fa";
import { IoClose, IoFilter } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { toast } from "react-hot-toast";
import useNotificationStore from "../../store/notificationStore";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = ({ notifications, loading, error, onClose }) => {
  const { markAsRead } = useNotificationStore();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleShowMore = () => {
    onClose();
    navigate("/dashboard/notifications");
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
    toast.success("Notification marked as read!");
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.isRead) {
        markAsRead(notification.id);
      }
    });
    toast.success("All notifications marked as read!");
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "announcement", label: "Announcements" },
    { id: "birthday", label: "Birthdays" },
    { id: "calendar", label: "Calendar" },
    { id: "resignation", label: "Alerts" },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    return notification.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case "announcement":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-500">
            <HiOutlineSpeakerphone size={16} />
          </div>
        );
      case "birthday":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-500">
            <FaBirthdayCake size={16} />
          </div>
        );
      case "resignation":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500">
            <FaExclamationCircle size={16} />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
            <MdOutlineCalendarToday size={16} />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="bg-[#5a189a] p-3 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
              <FaBell size={16} className="text-white" />
            </div>
            <h2 className="text-base font-bold text-white">Notifications</h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30 transition"
          >
            <IoClose size={16} />
          </motion.button>
        </div>

        {/* Filter chips */}
        <div
          className="mt-3 flex gap-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
        [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                "
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-white text-indigo-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-700">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {filteredNotifications.length} notification
          {filteredNotifications.length !== 1 ? "s" : ""}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <FaCheck size={10} />
          Mark all as read
        </motion.button>
      </div>

      {/* Notifications list */}
      <div
        className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
      [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
      
      "
      >
        <AnimatePresence>
          {loading ? (
            <div className="flex justify-center items-center p-6">
              <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 flex flex-col items-center justify-center">
              <FaExclamationCircle size={24} className="text-red-500 mb-2" />
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                {error}
              </p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <FaBell
                  size={20}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                No notifications available.
              </p>
            </div>
          ) : (
            filteredNotifications.slice(0, 5).map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-2 m-2 p-2 rounded-lg transition-all ${
                  !notification.isRead
                    ? "bg-indigo-50 dark:bg-gray-700 border-l-3 border-indigo-500"
                    : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                } hover:shadow-md cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation(); // prevent bubbling if parent has click-away logic
                  handleMarkAsRead(notification.id);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getIcon(notification.type)}

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p
                      className={`${
                        !notification.isRead ? "font-bold" : "font-medium"
                      } text-sm text-gray-800 dark:text-gray-200`}
                    >
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(notification.createdAt).toLocaleString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>

                    {!notification.isRead && (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShowMore}
          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
        >
          View All Notifications
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
