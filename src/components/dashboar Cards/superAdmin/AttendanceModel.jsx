// import React, { useState } from "react";
// import Modal from "react-modal";
// import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

// function AttendanceModal({
//   isOpen,
//   onRequestClose,
//   attendanceDetailsLoading,
//   loggedInUsers,
//   notLoggedInUsers,
// }) {
//   // Local search states for each table
//   const [searchLoggedIn, setSearchLoggedIn] = useState("");
//   const [searchNotLoggedIn, setSearchNotLoggedIn] = useState("");

//   // Filter logic for "Logged In"
//   const filteredLoggedIn = loggedInUsers.filter((user) => {
//     const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
//     return fullName.includes(searchLoggedIn.toLowerCase());
//   });

//   // Filter logic for "Not Logged In"
//   const filteredNotLoggedIn = notLoggedInUsers.filter((user) => {
//     const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
//     return fullName.includes(searchNotLoggedIn.toLowerCase());
//   });

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Attendance Details"
//       ariaHideApp={false}
//       /*
//         We use a flex container with a bounded height so the modal won't
//         shrink or grow when search results change. The header won't scroll,
//         but the content area below will.
//       */
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//                  w-11/12 max-w-[900px]
//                  min-h-[60vh] max-h-[80vh]
//                  rounded-lg shadow-lg focus:outline-none
//                  bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
//                  transition-all duration-300 ease-in-out
//                  flex flex-col"
//       overlayClassName="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out"
//     >
//       {/* Header: fixed area (doesn't scroll) */}
//       <div className="flex-shrink-0 p-5 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-bold">User Attendance Details</h2>
//           <button
//             onClick={onRequestClose}
//             className="ml-4 text-sm px-3 py-1 rounded-lg
//                        bg-gray-200 hover:bg-gray-300 text-gray-800
//                        dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100
//                        transition-colors duration-200 ease-in-out"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       {/* Main Scrollable Content (fills remaining space) */}
//       <div className="flex-1 overflow-auto p-5">
//         {attendanceDetailsLoading && (
//           <p className="text-center text-gray-500 dark:text-gray-400">
//             Loading attendance details...
//           </p>
//         )}

//         {!attendanceDetailsLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* LOGGED IN SECTION */}
//             <div className="flex flex-col bg-white dark:bg-gray-800
//                             shadow-sm rounded-lg border border-green-200
//                             dark:border-green-700 transition-colors">
//               {/* Header row for the card */}
//               <div className="flex items-center p-4 border-b border-green-200 dark:border-green-700">
//                 <FaCheckCircle className="text-green-600 dark:text-green-400 mr-2" />
//                 <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
//                   Logged In ({filteredLoggedIn.length})
//                 </h3>
//               </div>

//               {/* Search Input */}
//               <div className="px-4 pt-4">
//                 <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700
//                                 rounded-md px-2 py-1">
//                   <FaSearch className="text-gray-400 dark:text-gray-300" />
//                   <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchLoggedIn}
//                     onChange={(e) => setSearchLoggedIn(e.target.value)}
//                     className="w-full bg-transparent focus:outline-none
//                                text-gray-700 dark:text-gray-200"
//                   />
//                 </div>
//               </div>

//               {/* Scrollable table area (vertical) */}
//               <div className="overflow-y-auto max-h-[300px] p-4">
//                 {filteredLoggedIn.length === 0 ? (
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {searchLoggedIn
//                       ? "No matching results."
//                       : "No one has logged in yet."}
//                   </p>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="table-auto w-full text-sm">
//                       <thead>
//                         <tr className="bg-green-50 dark:bg-green-700/40">
//                           <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Name
//                           </th>
//                           {/* <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Role
//                           </th>
//                           <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Department
//                           </th> */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredLoggedIn.map((user, index) => (
//                           <tr
//                             key={user._id}
//                             className={`${
//                               index % 2 === 0
//                                 ? "bg-gray-50 dark:bg-gray-700/20"
//                                 : "bg-white dark:bg-gray-800"
//                             } hover:bg-green-50 dark:hover:bg-green-700/30 transition-colors`}
//                           >
//                             <td className="px-4 py-2">
//                               {user.first_Name} {user.last_Name}
//                             </td>
//                             {/* <td className="px-4 py-2">
//                               <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
//                                                bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50">
//                                 Employee
//                               </span>
//                             </td>
//                             <td className="px-4 py-2">
//                               <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
//                                                bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
//                                 Sales
//                               </span>
//                             </td> */}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* NOT LOGGED IN SECTION */}
//             <div className="flex flex-col bg-white dark:bg-gray-800
//                             shadow-sm rounded-lg border border-red-200
//                             dark:border-red-700 transition-colors">
//               {/* Header row for the card */}
//               <div className="flex items-center p-4 border-b border-red-200 dark:border-red-700">
//                 <FaTimesCircle className="text-red-600 dark:text-red-400 mr-2" />
//                 <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
//                   Not Logged In ({filteredNotLoggedIn.length})
//                 </h3>
//               </div>

//               {/* Search Input */}
//               <div className="px-4 pt-4">
//                 <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700
//                                 rounded-md px-2 py-1">
//                   <FaSearch className="text-gray-400 dark:text-gray-300" />
//                   <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchNotLoggedIn}
//                     onChange={(e) => setSearchNotLoggedIn(e.target.value)}
//                     className="w-full bg-transparent focus:outline-none
//                                text-gray-700 dark:text-gray-200"
//                   />
//                 </div>
//               </div>

//               {/* Scrollable table area (vertical) */}
//               <div className="overflow-y-auto max-h-[300px] p-4">
//                 {filteredNotLoggedIn.length === 0 ? (
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {searchNotLoggedIn
//                       ? "No matching results."
//                       : "Everyone has logged in!"}
//                   </p>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="table-auto w-full text-sm">
//                       <thead>
//                         <tr className="bg-red-50 dark:bg-red-700/40">
//                           <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Name
//                           </th>
//                           {/* <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Role
//                           </th>
//                           <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
//                             Department
//                           </th> */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredNotLoggedIn.map((user, index) => (
//                           <tr
//                             key={user._id}
//                             className={`${
//                               index % 2 === 0
//                                 ? "bg-gray-50 dark:bg-gray-700/20"
//                                 : "bg-white dark:bg-gray-800"
//                             } hover:bg-red-50 dark:hover:bg-red-700/30 transition-colors`}
//                           >
//                             <td className="px-4 py-2">
//                               {user.first_Name} {user.last_Name}
//                             </td>
//                             {/* <td className="px-4 py-2">
//                               <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
//                                                bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50">
//                                 Employee
//                               </span>
//                             </td>
//                             <td className="px-4 py-2">
//                               <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
//                                                bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
//                                 Sales
//                               </span>
//                             </td> */}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

// export default AttendanceModal;

// import React, { useState } from "react";
// import Modal from "react-modal";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HiCheckCircle,
//   HiXCircle,
//   HiMagnifyingGlass,
//   HiXMark,
//   HiUsers,
//   HiUserMinus,
//   HiSparkles,
//   HiLightBulb
// } from "react-icons/hi2";
// import {
//   FaUserCheck,
//   FaUserTimes,
//   FaSearch,
//   FaFilter
// } from "react-icons/fa";

// function AttendanceModal({
//   isOpen,
//   onRequestClose,
//   attendanceDetailsLoading,
//   loggedInUsers,
//   notLoggedInUsers,
// }) {
//   const [searchLoggedIn, setSearchLoggedIn] = useState("");
//   const [searchNotLoggedIn, setSearchNotLoggedIn] = useState("");
//   const [activeTab, setActiveTab] = useState("present");

//   // Filter logic for "Logged In"
//   const filteredLoggedIn = loggedInUsers.filter((user) => {
//     const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
//     return fullName.includes(searchLoggedIn.toLowerCase());
//   });

//   // Filter logic for "Not Logged In"
//   const filteredNotLoggedIn = notLoggedInUsers.filter((user) => {
//     const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
//     return fullName.includes(searchNotLoggedIn.toLowerCase());
//   });

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50,
//       transition: {
//         duration: 0.2,
//         ease: "easeIn"
//       }
//     }
//   };

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 0.2 }
//     },
//     exit: {
//       opacity: 0,
//       transition: { duration: 0.2 }
//     }
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, x: 20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onRequestClose={onRequestClose}
//           contentLabel="Attendance Details"
//           ariaHideApp={false}
//           className="outline-none"
//           overlayClassName="outline-none"
//           style={{
//             overlay: {
//               position: 'fixed',
//               inset: 0,
//               zIndex: 50,
//               backgroundColor: 'transparent',
//             },
//             content: {
//               position: 'relative',
//               inset: 'auto',
//               border: 'none',
//               background: 'transparent',
//               overflow: 'visible',
//               borderRadius: 0,
//               outline: 'none',
//               padding: 0,
//               margin: 0,
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }
//           }}
//         >
//           {/* Animated Overlay */}
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={onRequestClose}
//           />

//           {/* Modal Content */}
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="relative w-11/12 max-w-6xl max-h-[90vh]
//                        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
//                        rounded-3xl border border-gray-200/50 dark:border-gray-700/50
//                        shadow-2xl shadow-black/20
//                        flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Gradient Background Effects */}
//             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
//             <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

//             {/* Header */}
//             <div className="relative flex-shrink-0 p-8 border-b border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
//                     <HiUsers className="text-2xl text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                       Attendance Overview
//                     </h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       Real-time employee presence tracking
//                     </p>
//                   </div>
//                 </div>

//                 <motion.button
//                   onClick={onRequestClose}
//                   className="p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80
//                            hover:bg-gray-200/80 dark:hover:bg-gray-700/80
//                            border border-gray-200/50 dark:border-gray-700/50
//                            transition-all duration-200 group"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <HiXMark className="text-xl text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
//                 </motion.button>
//               </div>

//               {/* Stats Bar */}
//               <div className="flex items-center gap-6 mt-6">
//                 <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
//                   <HiCheckCircle className="text-green-600 dark:text-green-400" />
//                   <span className="text-sm font-medium text-green-700 dark:text-green-300">
//                     {loggedInUsers.length} Present
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-800/50">
//                   <HiXCircle className="text-red-600 dark:text-red-400" />
//                   <span className="text-sm font-medium text-red-700 dark:text-red-300">
//                     {notLoggedInUsers.length} Absent
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
//                   <HiSparkles className="text-blue-600 dark:text-blue-400" />
//                   <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
//                     {((loggedInUsers.length / (loggedInUsers.length + notLoggedInUsers.length)) * 100).toFixed(1)}% Rate
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="relative flex-shrink-0 px-8 pt-6">
//               <div className="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
//                 <motion.button
//                   onClick={() => setActiveTab("present")}
//                   className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                     activeTab === "present"
//                       ? "bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-lg border border-green-200/50 dark:border-green-800/50"
//                       : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
//                   }`}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <FaUserCheck className="text-lg" />
//                   <span>Present ({filteredLoggedIn.length})</span>
//                 </motion.button>
//                 <motion.button
//                   onClick={() => setActiveTab("absent")}
//                   className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                     activeTab === "absent"
//                       ? "bg-white dark:bg-gray-700 text-red-700 dark:text-red-300 shadow-lg border border-red-200/50 dark:border-red-800/50"
//                       : "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
//                   }`}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <FaUserTimes className="text-lg" />
//                   <span>Absent ({filteredNotLoggedIn.length})</span>
//                 </motion.button>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 overflow-hidden p-8">
//               {attendanceDetailsLoading ? (
//                 <motion.div
//                   className="flex flex-col items-center justify-center h-full"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div className="relative">
//                     <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
//                     <HiLightBulb className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 text-xl" />
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">
//                     Loading attendance data...
//                   </p>
//                 </motion.div>
//               ) : (
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeTab}
//                     variants={tabVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     className="h-full flex flex-col"
//                   >
//                     {/* Search Bar */}
//                     <div className="mb-6">
//                       <div className="relative max-w-md">
//                         <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
//                         <input
//                           type="text"
//                           placeholder={`Search ${activeTab === "present" ? "present" : "absent"} employees...`}
//                           value={activeTab === "present" ? searchLoggedIn : searchNotLoggedIn}
//                           onChange={(e) =>
//                             activeTab === "present"
//                               ? setSearchLoggedIn(e.target.value)
//                               : setSearchNotLoggedIn(e.target.value)
//                           }
//                           className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80
//                                    border border-gray-200/50 dark:border-gray-700/50
//                                    rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
//                                    text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
//                                    backdrop-blur-sm transition-all duration-200"
//                         />
//                       </div>
//                     </div>

//                     {/* User List */}
//                     <div className="flex-1 overflow-hidden">
//                       {activeTab === "present" ? (
//                         <AttendanceList
//                           users={filteredLoggedIn}
//                           searchValue={searchLoggedIn}
//                           type="present"
//                         />
//                       ) : (
//                         <AttendanceList
//                           users={filteredNotLoggedIn}
//                           searchValue={searchNotLoggedIn}
//                           type="absent"
//                         />
//                       )}
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               )}
//             </div>
//           </motion.div>
//         </Modal>
//       )}
//     </AnimatePresence>
//   );
// }

// // Separate component for user list
// function AttendanceList({ users, searchValue, type }) {
//   const isPresentList = type === "present";

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   if (users.length === 0) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center h-full text-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className={`p-6 rounded-3xl ${
//           isPresentList
//             ? "bg-green-50 dark:bg-green-900/20"
//             : "bg-red-50 dark:bg-red-900/20"
//         }`}>
//           {isPresentList ? (
//             <FaUserCheck  className={`text-6xl ${
//               isPresentList
//                 ? "text-green-400 dark:text-green-500"
//                 : "text-red-400 dark:text-red-500"
//             }`} />
//           ) : (
//             <HiUserMinus className="text-6xl text-red-400 dark:text-red-500" />
//           )}
//         </div>
//         <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
//           {searchValue
//             ? "No matching results found"
//             : isPresentList
//               ? "No one has checked in yet"
//               : "Everyone is present today!"
//           }
//         </h3>
//         <p className="text-gray-500 dark:text-gray-400 mt-2">
//           {searchValue
//             ? "Try adjusting your search criteria"
//             : isPresentList
//               ? "Employees will appear here once they check in"
//               : "Great attendance today!"
//           }
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="h-full overflow-y-auto pr-2 space-y-3"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {users.map((user, index) => (
//         <motion.div
//           key={user._id}
//           variants={itemVariants}
//           className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer group ${
//             isPresentList
//               ? "bg-green-50/80 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50 hover:bg-green-100/80 dark:hover:bg-green-900/30"
//               : "bg-red-50/80 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/50 hover:bg-red-100/80 dark:hover:bg-red-900/30"
//           }`}
//           whileHover={{ y: -2 }}
//         >
//           <div className="flex items-center gap-4">
//             <div className={`p-3 rounded-xl ${
//               isPresentList
//                 ? "bg-green-100 dark:bg-green-800/50"
//                 : "bg-red-100 dark:bg-red-800/50"
//             }`}>
//               {isPresentList ? (
//                 <HiCheckCircle className="text-xl text-green-600 dark:text-green-400" />
//               ) : (
//                 <HiXCircle className="text-xl text-red-600 dark:text-red-400" />
//               )}
//             </div>

//             <div className="flex-1">
//               <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
//                 {user.first_Name} {user.last_Name}
//               </h4>
//               <p className={`text-sm mt-1 ${
//                 isPresentList
//                   ? "text-green-600 dark:text-green-400"
//                   : "text-red-600 dark:text-red-400"
//               }`}>
//                 {isPresentList ? "Currently present" : "Not checked in"}
//               </p>
//             </div>

//             <div className={`px-3 py-1 rounded-full text-xs font-medium ${
//               isPresentList
//                 ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
//                 : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
//             }`}>
//               {isPresentList ? "Present" : "Absent"}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// export default AttendanceModal;

// src/components/AttendanceModal.jsx

// import React, { useState } from "react";
// import BaseModal from "../../common/BaseModal"; 
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HiCheckCircle,
//   HiXCircle,
//   HiMagnifyingGlass,
//   HiXMark,
//   HiUsers,
//   HiSparkles,
//   HiUserMinus,
//   HiLightBulb,
// } from "react-icons/hi2";
// import { FaUserCheck, FaUserTimes } from "react-icons/fa";

// export default function AttendanceModal({
//   isOpen,
//   onRequestClose,
//   attendanceDetailsLoading,
//   loggedInUsers,
//   notLoggedInUsers,
// }) {
//   const [searchLoggedIn, setSearchLoggedIn] = useState("");
//   const [searchNotLoggedIn, setSearchNotLoggedIn] = useState("");
//   const [activeTab, setActiveTab] = useState("present");

//   const filteredLoggedIn = loggedInUsers.filter((u) =>
//     `${u.first_Name} ${u.last_Name}`
//       .toLowerCase()
//       .includes(searchLoggedIn.toLowerCase())
//   );
//   const filteredNotLoggedIn = notLoggedInUsers.filter((u) =>
//     `${u.first_Name} ${u.last_Name}`
//       .toLowerCase()
//       .includes(searchNotLoggedIn.toLowerCase())
//   );

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50,
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };
//   const tabVariants = {
//     hidden: { opacity: 0, x: 20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <BaseModal isOpen={isOpen} onClose={onRequestClose}>
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="relative w-11/12 max-w-6xl max-h-[90vh]
//                        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
//                        rounded-3xl border border-gray-200/50 dark:border-gray-700/50
//                        shadow-2xl shadow-black/20
//                        flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Decorative Gradients */}
//             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
//             <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

//             {/* Header */}
//             <div className="flex-shrink-0 p-8 border-b border-gray-200/50 dark:border-gray-700/50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
//                     <HiUsers className="text-2xl text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                       Attendance Overview
//                     </h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       Real-time employee presence tracking
//                     </p>
//                   </div>
//                 </div>
//                 <motion.button
//                   onClick={onRequestClose}
//                   className="p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <HiXMark className="text-xl text-gray-600 dark:text-gray-400" />
//                 </motion.button>
//               </div>

//               {/* Stats Bar */}
//               <div className="flex items-center gap-6 mt-6">
//                 <StatCard
//                   icon={
//                     <HiCheckCircle className="text-green-600 dark:text-green-400" />
//                   }
//                   label={`${loggedInUsers.length} Present`}
//                   bg="bg-green-50 dark:bg-green-900/20"
//                   border="border-green-200/50 dark:border-green-800/50"
//                   text="text-green-700 dark:text-green-300"
//                 />
//                 <StatCard
//                   icon={
//                     <HiXCircle className="text-red-600 dark:text-red-400" />
//                   }
//                   label={`${notLoggedInUsers.length} Absent`}
//                   bg="bg-red-50 dark:bg-red-900/20"
//                   border="border-red-200/50 dark:border-red-800/50"
//                   text="text-red-700 dark:text-red-300"
//                 />
//                 <StatCard
//                   icon={
//                     <HiSparkles className="text-blue-600 dark:text-blue-400" />
//                   }
//                   label={`${(
//                     (loggedInUsers.length /
//                       (loggedInUsers.length + notLoggedInUsers.length)) *
//                     100
//                   ).toFixed(1)}% Rate`}
//                   bg="bg-blue-50 dark:bg-blue-900/20"
//                   border="border-blue-200/50 dark:border-blue-800/50"
//                   text="text-blue-700 dark:text-blue-300"
//                 />
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex-shrink-0 px-8 pt-6">
//               <div className="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
//                 <TabButton
//                   active={activeTab === "present"}
//                   onClick={() => setActiveTab("present")}
//                   icon={<FaUserCheck className="text-lg" />}
//                   label={`Present (${filteredLoggedIn.length})`}
//                   activeStyles="bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-lg border border-green-200/50 dark:border-green-800/50"
//                   inactiveStyles="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
//                 />
//                 <TabButton
//                   active={activeTab === "absent"}
//                   onClick={() => setActiveTab("absent")}
//                   icon={<FaUserTimes className="text-lg" />}
//                   label={`Absent (${filteredNotLoggedIn.length})`}
//                   activeStyles="bg-white dark:bg-gray-700 text-red-700 dark:text-red-300 shadow-lg border border-red-200/50 dark:border-red-800/50"
//                   inactiveStyles="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-hidden p-8">
//               {attendanceDetailsLoading ? (
//                 <LoadingState />
//               ) : (
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeTab}
//                     variants={tabVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     className="h-full flex flex-col"
//                   >
//                     <SearchBar
//                       value={
//                         activeTab === "present"
//                           ? searchLoggedIn
//                           : searchNotLoggedIn
//                       }
//                       onChange={(e) =>
//                         activeTab === "present"
//                           ? setSearchLoggedIn(e.target.value)
//                           : setSearchNotLoggedIn(e.target.value)
//                       }
//                       placeholder={`Search ${activeTab} employees...`}
//                     />
//                     <div className="flex-1 overflow-hidden">
//                       <AttendanceList
//                         users={
//                           activeTab === "present"
//                             ? filteredLoggedIn
//                             : filteredNotLoggedIn
//                         }
//                         type={activeTab}
//                       />
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               )}
//             </div>
//           </motion.div>
//         </BaseModal>
//       )}
//     </AnimatePresence>
//   );
// }

// // --- Helpers ---
// function StatCard({ icon, label, bg, border, text }) {
//   return (
//     <div
//       className={`flex items-center gap-2 px-4 py-2 ${bg} rounded-xl ${border}`}
//     >
//       {icon}
//       <span className={`text-sm font-medium ${text}`}>{label}</span>
//     </div>
//   );
// }

// function TabButton({
//   active,
//   onClick,
//   icon,
//   label,
//   activeStyles,
//   inactiveStyles,
// }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//         active ? activeStyles : inactiveStyles
//       }`}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       {icon}
//       <span>{label}</span>
//     </motion.button>
//   );
// }

// function SearchBar({ value, onChange, placeholder }) {
//   return (
//     <div className="mb-6">
//       <div className="relative max-w-md">
//         <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
//         />
//       </div>
//     </div>
//   );
// }

// function LoadingState() {
//   return (
//     <motion.div
//       className="flex flex-col items-center justify-center h-full"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
//         <HiLightBulb className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 text-xl" />
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">
//         Loading attendance data...
//       </p>
//     </motion.div>
//   );
// }

// function AttendanceList({ users, type }) {
//   const isPresent = type === "present";

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   if (users.length === 0) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center h-full text-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div
//           className={`p-6 rounded-3xl ${
//             isPresent
//               ? "bg-green-50 dark:bg-green-900/20"
//               : "bg-red-50 dark:bg-red-900/20"
//           }`}
//         >
//           {isPresent ? (
//             <FaUserCheck className="text-6xl text-green-400 dark:text-green-500" />
//           ) : (
//             <HiUserMinus className="text-6xl text-red-400 dark:text-red-500" />
//           )}
//         </div>
//         <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
//           {isPresent
//             ? "No one has checked in yet"
//             : "Everyone is present today!"}
//         </h3>
//         <p className="text-gray-500 dark:text-gray-400 mt-2">
//           {isPresent
//             ? "Employees will appear here once they check in"
//             : "Great attendance today!"}
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="h-full overflow-y-auto pr-2 space-y-3"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {users.map((user, idx) => (
//         <motion.div
//           key={user._id}
//           variants={itemVariants}
//           className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer group ${
//             isPresent
//               ? "bg-green-50/80 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50 hover:bg-green-100/80 dark:hover:bg-green-900/30"
//               : "bg-red-50/80 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/50 hover:bg-red-100/80 dark:hover:bg-red-900/30"
//           }`}
//           whileHover={{ y: -2 }}
//         >
//           <div className="flex items-center gap-4">
//             <div
//               className={`p-3 rounded-xl ${
//                 isPresent
//                   ? "bg-green-100 dark:bg-green-800/50"
//                   : "bg-red-100 dark:bg-red-800/50"
//               }`}
//             >
//               {isPresent ? (
//                 <HiCheckCircle className="text-xl text-green-600 dark:text-green-400" />
//               ) : (
//                 <HiXCircle className="text-xl text-red-600 dark:text-red-400" />
//               )}
//             </div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
//                 {user.first_Name} {user.last_Name}
//               </h4>
//               <p
//                 className={`text-sm mt-1 ${
//                   isPresent
//                     ? "text-green-600 dark:text-green-400"
//                     : "text-red-600 dark:text-red-400"
//                 }`}
//               >
//                 {isPresent ? "Currently present" : "Not checked in"}
//               </p>
//             </div>
//             <div
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 isPresent
//                   ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
//                   : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
//               }`}
//             >
//               {isPresent ? "Present" : "Absent"}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }



import React, { useState } from "react";
import BaseModal from "../../common/BaseModal"; 
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheckCircle,
  HiXCircle,
  HiMagnifyingGlass,
  HiXMark,
  HiUsers,
  HiSparkles,
  HiUserMinus,
  HiLightBulb,
} from "react-icons/hi2";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

export default function AttendanceModal({
  isOpen,
  onRequestClose,
  attendanceDetailsLoading,
  loggedInUsers,
  notLoggedInUsers,
}) {
  const [searchLoggedIn, setSearchLoggedIn] = useState("");
  const [searchNotLoggedIn, setSearchNotLoggedIn] = useState("");
  const [activeTab, setActiveTab] = useState("present");

  const filteredLoggedIn = loggedInUsers.filter((u) =>
    `${u.first_Name} ${u.last_Name}`
      .toLowerCase()
      .includes(searchLoggedIn.toLowerCase())
  );
  const filteredNotLoggedIn = notLoggedInUsers.filter((u) =>
    `${u.first_Name} ${u.last_Name}`
      .toLowerCase()
      .includes(searchNotLoggedIn.toLowerCase())
  );

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={onRequestClose}>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-[95vw] sm:w-11/12 max-w-2xl h-[95vh] sm:max-h-[90vh]
                       bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
                       rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50
                       shadow-2xl shadow-black/20
                       flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-full h-20 sm:h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-tl from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
                    <HiUsers className="text-lg sm:text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Attendance Overview
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                      Real-time employee presence tracking
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onRequestClose}
                  className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiXMark className="text-lg sm:text-xl text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-32 mt-20 sm:mt-20 ">
                <StatCard
                  icon={
                    <HiCheckCircle className="text-green-600 dark:text-green-400" />
                  }
                  label={`${loggedInUsers.length} Present`}
                  bg="bg-green-50 dark:bg-green-900/20"
                  border="border-green-200/50 dark:border-green-800/50"
                  text="text-green-700 dark:text-green-300"
                />
                <StatCard
                  icon={
                    <HiXCircle className="text-red-600 dark:text-red-400" />
                  }
                  label={`${notLoggedInUsers.length} Absent`}
                  bg="bg-red-50 dark:bg-red-900/20"
                  border="border-red-200/50 dark:border-red-800/50"
                  text="text-red-700 dark:text-red-300"
                />
                <StatCard
                  icon={
                    <HiSparkles className="text-blue-600 dark:text-blue-400" />
                  }
                  label={`${(
                    (loggedInUsers.length /
                      (loggedInUsers.length + notLoggedInUsers.length)) *
                    100
                  ).toFixed(1)}% Rate`}
                  bg="bg-blue-50 dark:bg-blue-900/20"
                  border="border-blue-200/50 dark:border-blue-800/50"
                  text="text-blue-700 dark:text-blue-300"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
              <div className="flex gap-1 sm:gap-2 p-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                <TabButton
                  active={activeTab === "present"}
                  onClick={() => setActiveTab("present")}
                  icon={<FaUserCheck className="text-sm sm:text-lg" />}
                  label={`Present (${filteredLoggedIn.length})`}
                  activeStyles="bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-lg border border-green-200/50 dark:border-green-800/50"
                  inactiveStyles="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                />
                <TabButton
                  active={activeTab === "absent"}
                  onClick={() => setActiveTab("absent")}
                  icon={<FaUserTimes className="text-sm sm:text-lg" />}
                  label={`Absent (${filteredNotLoggedIn.length})`}
                  activeStyles="bg-white dark:bg-gray-700 text-red-700 dark:text-red-300 shadow-lg border border-red-200/50 dark:border-red-800/50"
                  inactiveStyles="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                />
              </div>
            </div>

            {/* Content - Fixed height with proper scrolling */}
            <div className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
              {attendanceDetailsLoading ? (
                <LoadingState />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="h-full flex flex-col"
                  >
                    <SearchBar
                      value={
                        activeTab === "present"
                          ? searchLoggedIn
                          : searchNotLoggedIn
                      }
                      onChange={(e) =>
                        activeTab === "present"
                          ? setSearchLoggedIn(e.target.value)
                          : setSearchNotLoggedIn(e.target.value)
                      }
                      placeholder={`Search ${activeTab} employees...`}
                    />
                    {/* Fixed scrollable container */}
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <AttendanceList
                        users={
                          activeTab === "present"
                            ? filteredLoggedIn
                            : filteredNotLoggedIn
                        }
                        type={activeTab}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </BaseModal>
      )}
    </AnimatePresence>
  );
}

// --- Helpers ---
function StatCard({ icon, label, bg, border, text }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2 ${bg} rounded-lg sm:rounded-xl ${border} flex-1 sm:flex-none`}
    >
      {icon}
      <span className={`text-xs sm:text-sm font-medium ${text}`}>{label}</span>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  activeStyles,
  inactiveStyles,
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm lg:text-base ${
        active ? activeStyles : inactiveStyles
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </motion.button>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="mb-4 sm:mb-6 flex-shrink-0">
      <div className="relative w-full sm:max-w-md">
        <HiMagnifyingGlass className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base sm:text-lg" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
        />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
        <HiLightBulb className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium text-sm sm:text-base">
        Loading attendance data...
      </p>
    </motion.div>
  );
}

function AttendanceList({ users, type }) {
  const isPresent = type === "present";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (users.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full text-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl ${
            isPresent
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {isPresent ? (
            <FaUserCheck className="text-4xl sm:text-6xl text-green-400 dark:text-green-500" />
          ) : (
            <HiUserMinus className="text-4xl sm:text-6xl text-red-400 dark:text-red-500" />
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {isPresent
            ? "No one has checked in yet"
            : "Everyone is present today!"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          {isPresent
            ? "Employees will appear here once they check in"
            : "Great attendance today!"}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 pr-2 space-y-2 sm:space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent',
        }}
      >
        {users.map((user, idx) => (
          <motion.div
            key={user._id}
            variants={itemVariants}
            className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] cursor-pointer group ${
              isPresent
                ? "bg-green-50/80 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50 hover:bg-green-100/80 dark:hover:bg-green-900/30"
                : "bg-red-50/80 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/50 hover:bg-red-100/80 dark:hover:bg-red-900/30"
            }`}
            whileHover={{ y: -1 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                  isPresent
                    ? "bg-green-100 dark:bg-green-800/50"
                    : "bg-red-100 dark:bg-red-800/50"
                }`}
              >
                {isPresent ? (
                  <HiCheckCircle className="text-lg sm:text-xl text-green-600 dark:text-green-400" />
                ) : (
                  <HiXCircle className="text-lg sm:text-xl text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base truncate">
                  {user.first_Name} {user.last_Name}
                </h4>
                <p
                  className={`text-xs sm:text-sm mt-1 ${
                    isPresent
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPresent ? "Currently present" : "Not checked in"}
                </p>
              </div>
              <div
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  isPresent
                    ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                {isPresent ? "Present" : "Absent"}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}