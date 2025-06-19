// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import { usePoshStore } from "../../../../store/poshStore";
// import BaseModal from "../../../common/BaseModal";

// export default function IssueDetailsModal({ isOpen, onClose, issue }) {
//   const [commentText, setCommentText] = useState("");
//   const { fetchPoshActDetails, addPoshActComment, poshActs } = usePoshStore();

//   useEffect(() => {
//     if (isOpen && issue?.id) {
//       (async () => {
//         try {
//           await fetchPoshActDetails(issue.id);
//         } catch {}
//       })();
//     }
//   }, [isOpen, issue?.id, fetchPoshActDetails]);

//   const currentItem = poshActs.find((act) => act.id === issue?.id) || issue;

//   const handleSendComment = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await addPoshActComment(currentItem.id, commentText.trim());
//       setCommentText("");
//     } catch {}
//   };

//   if (!isOpen || !issue) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <motion.div
//         className="relative w-full max-w-5xl h-[80vh] md:h-[70vh] lg:h-[75vh] flex pointer-events-none bg-gray-300 dark:bg-gray-80"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//       >
//         <div
//           className="pointer-events-auto flex flex-1 bg-white/5 dark:bg-gray-800 
//             backdrop-blur-md border border-gray-300 dark:border-gray-700
//             text-gray-900 dark:text-gray-100 rounded-lg overflow-hidden shadow-lg"
//         >
//           <div
//             className="flex flex-col w-1/2 p-4 border-r border-white/20 dark:border-white/10 overflow-y-auto
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//           >
//             <h2 className="text-xl font-bold mb-4">Issue Details</h2>
//             <div className="mb-4">
//               <p className="font-semibold">Reporter</p>
//               <p>
//                 {currentItem?.reporterName || "N/A"} ({currentItem?.reporterId})
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Accused</p>
//               <p>
//                 {currentItem?.accusedName || "N/A"} ({currentItem?.accusedId})
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Incident Date</p>
//               <p>
//                 {currentItem?.incidentDate
//                   ? new Date(currentItem.incidentDate).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Type</p>
//               <p>{currentItem?.type || "N/A"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Status</p>
//               <p>{currentItem?.status || "Pending"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Attachments</p>
//               {currentItem?.attachments?.length > 0 ? (
//                 <ul className="list-disc list-inside">
//                   {currentItem.attachments.map((att, idx) => (
//                     <li key={idx} className="mt-1">
//                       <a href={att.url} target="_blank" rel="noreferrer">
//                         <button className="text-blue-600 hover:text-blue-800 text-sm underline">
//                           {att.name || `Attachment ${idx + 1}`}
//                         </button>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>None</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Description</p>
//               <p className="text-sm leading-relaxed">
//                 {currentItem?.description || "No description provided..."}
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col w-1/2 p-4 ">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Comment</h2>
//               <button onClick={onClose} title="Close">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto pr-2 space-y-3">
//               {currentItem?.comments?.length ? (
//                 currentItem.comments.map((c) => (
//                   <div
//                     key={c._id}
//                     className="bg-white text-gray-800 rounded p-3"
//                   >
//                     <p className="text-sm font-semibold mb-1">
//                       {c.user?.first_Name} {c.user?.last_Name}
//                     </p>
//                     <p className="text-sm">{c.message}</p>
//                     <div className="text-right text-xs text-gray-400 mt-1">
//                       {new Date(c.createdAt).toLocaleString()}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-sm text-gray-300 dark:text-gray-400">
//                   No comments yet...
//                 </div>
//               )}
//             </div>
//             <div className="mt-3 bg-white text-gray-700 rounded flex items-center p-2">
//               <input
//                 type="text"
//                 className="flex-1 px-2 py-1 outline-none text-sm"
//                 placeholder="Comment Here..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//               />
//               <button
//                 className="mx-1 text-gray-500 hover:text-gray-700"
//                 title="Attach File"
//               >
//                 <FaPaperclip />
//               </button>
//               <button
//                 className="text-blue-600 hover:text-blue-800"
//                 title="Send"
//                 onClick={handleSendComment}
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, FaPaperclip, FaPaperPlane, FaUser, FaCalendarAlt, 
  FaExclamationTriangle, FaShieldAlt, FaFileAlt, FaDownload,
  FaClock, FaCheckCircle, FaSpinner, FaComments, FaUserTie
} from "react-icons/fa";
import { 
  MdSecurity, MdAccessTime, MdCheckCircle, MdPending, MdAttachment,
  MdSend, MdClose, MdPerson, MdCalendarToday, MdDescription,
  MdComment, MdAttachFile, MdDownload, MdVerifiedUser
} from "react-icons/md";
import {
  HiOutlineUser, 
  HiOutlineCalendar, HiOutlineDocument, HiOutlineChat,
  HiOutlinePaperClip, HiOutlinePaperAirplane, HiOutlineX,
  HiOutlineClock, HiOutlineCheckCircle, HiOutlineBadgeCheck,
  HiOutlineDownload, HiOutlineUserCircle, HiOutlineIdentification
} from "react-icons/hi";

import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

import { usePoshStore } from "../../../../store/poshStore";
import BaseModal from "../../../common/BaseModal";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const commentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2 }
  }
};

export default function IssueDetailsModal({ isOpen, onClose, issue }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchPoshActDetails, addPoshActComment, poshActs } = usePoshStore();

  useEffect(() => {
    if (isOpen && issue?.id) {
      (async () => {
        try {
          await fetchPoshActDetails(issue.id);
        } catch {}
      })();
    }
  }, [isOpen, issue?.id, fetchPoshActDetails]);

  const currentItem = poshActs.find((act) => act.id === issue?.id) || issue;

  const handleSendComment = async () => {
    if (!commentText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addPoshActComment(currentItem.id, commentText.trim());
      setCommentText("");
    } catch {
      // Handle error silently as per original
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': 
        return <HiOutlineClock className="text-orange-500" />;
      case 'Under Review': 
        return <HiOutlineBadgeCheck className="text-blue-500" />;
      case 'Resolved': 
        return <HiOutlineCheckCircle className="text-green-500" />;
      default: 
        return <HiOutlineClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': 
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'Under Review': 
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'Resolved': 
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default: 
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Harassment': 
        return <HiOutlineExclamationTriangle className="text-red-500" />;
      case 'Discrimination': 
        return <MdSecurity className="text-purple-500" />;
      default: 
        return <MdSecurity className="text-gray-500" />;
    }
  };

  if (!isOpen || !issue) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="relative w-full max-w-7xl h-[85vh] flex pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="pointer-events-auto flex flex-1 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-red-500 to-orange-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <MdSecurity className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">POSH Case Details</h1>
                  <p className="text-red-100">Case ID: {currentItem?.id || 'N/A'}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
              >
                <HiOutlineX size={24} />
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 pt-24">
            
            {/* Left Panel - Case Details */}
            <motion.div
              className="flex flex-col w-1/2 p-6 border-r border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-6">
                
                {/* Status & Type Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(currentItem?.status)}
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">Status</h3>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(currentItem?.status)}`}>
                      {currentItem?.status || "Pending"}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(currentItem?.type)}
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">Type</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentItem?.type || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Reporter Information */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineUserCircle className="text-blue-600 text-2xl" />
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Reporter Information</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {currentItem?.reporterName?.charAt(0) || 'R'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {currentItem?.reporterName || "N/A"}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          ID: {currentItem?.reporterId || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accused Information */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineIdentification className="text-red-600 text-2xl" />
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Accused Information</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {currentItem?.accusedName?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {currentItem?.accusedName || "N/A"}
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          ID: {currentItem?.accusedId || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incident Date */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <HiOutlineCalendar className="text-gray-600 text-xl" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Incident Date</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 ml-8">
                    {currentItem?.incidentDate
                      ? new Date(currentItem.incidentDate).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Not specified"}
                  </p>
                </div>

                {/* Attachments */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlinePaperClip className="text-gray-600 text-xl" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Attachments</h3>
                  </div>
                  {currentItem?.attachments?.length > 0 ? (
                    <div className="space-y-2">
                      {currentItem.attachments.map((att, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg border"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <HiOutlineDocument className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {att.name || `Attachment ${idx + 1}`}
                            </span>
                          </div>
                          <motion.a
                            href={att.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <HiOutlineDownload />
                          </motion.a>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm ml-8">No attachments</p>
                  )}
                </div>

                {/* Description */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineDocument className="text-gray-600 text-xl" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Case Description</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {currentItem?.description || "No description provided for this case."}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Right Panel - Comments */}
            <motion.div
              className="flex flex-col w-1/2 p-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineChat className="text-indigo-600 text-2xl" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comments & Discussion</h2>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {currentItem?.comments?.length ? (
                    currentItem.comments.map((c, index) => (
                      <motion.div
                        key={c._id}
                        variants={commentVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {c.user?.first_Name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {c.user?.first_Name} {c.user?.last_Name}
                              </p>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(c.createdAt).toLocaleString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {c.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <HiOutlineChat className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No comments yet. Start the discussion!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Comment Input */}
              <div className="mt-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 shadow-lg">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Add your comment here..."
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isSubmitting}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Press Enter to send, Shift+Enter for new line
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {commentText.length}/500
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
                      title="Attach File"
                      disabled={isSubmitting}
                    >
                      <HiOutlinePaperClip size={20} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg transition-all ${
                        commentText.trim() && !isSubmitting
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      title="Send Comment"
                      onClick={handleSendComment}
                      disabled={!commentText.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" size={20} />
                      ) : (
                        <HiOutlinePaperAirplane size={20} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </BaseModal>
  );
}