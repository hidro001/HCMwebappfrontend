// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import useIssuesStore from "../../../store/useIssuesStore";
// import BaseModal from "../../common/BaseModal";

// export default function TicketDetailsModal({
//   isOpen,
//   onClose,
//   ticket,
//   onAddComment,
// }) {
//   const { comments, isCommentLoading } = useIssuesStore();
//   const [newComment, setNewComment] = useState("");

//   if (!isOpen || !ticket) return null;

//   const handleSubmitComment = () => {
//     if (!newComment.trim()) return;
//     onAddComment(newComment);
//     setNewComment("");
//   };

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//      <motion.div
//   className="relative w-full max-w-5xl h-[60vh] md:h-[70vh] lg:h-[80vh] flex pointer-events-none bg-gray-300 dark:bg-gray-800 overflow-auto [&::-webkit-scrollbar]:w-2
//             [&::-webkit-scrollbar-track]:rounded-full
//             [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//             [&::-webkit-scrollbar-thumb]:rounded-full
//             [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//   initial={{ opacity: 0, y: 30 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: 30 }}
// >
//         <div
//           className="pointer-events-auto flex flex-1 bg-white/5 dark:bg-gray-800
//                      border border-gray-300 dark:border-gray-700
//                      text-gray-900 dark:text-gray-100 
//                      rounded-lg overflow-hidden shadow-lg"
//         >
//           <div
//             className="flex flex-col w-1/2 p-4 border-r border-white/20 dark:border-white/10 overflow-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//           >
//             <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
//             <div className="mb-4">
//               <p className="font-semibold">Title</p>
//               <p>{ticket.issueTitle || "N/A"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Created By</p>
//               <p>
//                 {ticket.createdBy
//                   ? `${ticket.createdBy.first_Name} ${ticket.createdBy.last_Name}`
//                   : "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Assigned Department</p>
//               <p>{ticket.assignedTo || "N/A"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Priority</p>
//               <p>{ticket.priority || "N/A"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Status</p>
//               <p>{ticket.issueStatus || "Pending"}</p>
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Attachment</p>
//               {ticket.file ? (
//                 <div className="mt-1 bg-white text-gray-800 px-2 py-1 inline-flex items-center rounded">
//                   <span className="mr-2">File Attached</span>
//                   <a
//                     href={ticket.file}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     Download
//                   </a>
//                 </div>
//               ) : (
//                 <p>None</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <p className="font-semibold">Description</p>
//               <p className="text-sm leading-relaxed">
//                 {ticket.issueDescription || "No description provided..."}
//               </p>
//             </div>
//             {ticket.additionalFiles && ticket.additionalFiles.length > 0 && (
//               <div className="mb-4">
//                 <p className="font-semibold">Additional Attachments</p>
//                 {ticket.additionalFiles.map((fileObj, idx) => (
//                   <div
//                     key={fileObj._id || idx}
//                     className="mt-1 bg-white text-gray-800 px-2 py-1 inline-flex items-center rounded"
//                   >
//                     <span className="mr-2">Attachment {idx + 1}</span>
//                     <a
//                       href={fileObj.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:text-blue-800 text-sm"
//                     >
//                       Download
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col w-1/2 p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Comments</h2>
//               <button onClick={onClose} title="Close">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div
//               className="flex-1 overflow-y-auto pr-2 space-y-3  overflow-auto [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
//             >
//               {isCommentLoading ? (
//                 <p>Loading comments...</p>
//               ) : comments.length === 0 ? (
//                 <div className="text-sm text-center text-gray-300">
//                   No comments yet
//                 </div>
//               ) : (
//                 comments.map((cmt, idx) => (
//                   <div
//                     key={cmt._id || idx}
//                     className="bg-white dark:bg-gray-700 text-gray-800 rounded p-3 text-text-primary  border"
//                   >
//                     <p className="text-sm font-semibold mb-1">
//                       {typeof cmt.commenter === "object"
//                         ? `${cmt.commenter.first_Name} ${cmt.commenter.last_Name}`
//                         : "Anonymous"}
//                     </p>
//                     <p className="text-sm">{cmt.comment}</p>
//                     <div className="text-right text-xs text-gray-400 mt-1">
//                       {new Date(cmt.createdAt).toLocaleTimeString()}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="mt-3 bg-white text-gray-700 rounded flex items-center p-2">
//               <input
//                 type="text"
//                 className="flex-1 px-2 py-1 outline-none"
//                 placeholder="Comment here..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
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
//                 onClick={handleSubmitComment}
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



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, FaPaperclip, FaPaperPlane, FaUser, FaBuilding, 
  FaFlag, FaTags, FaCalendarAlt, FaFileAlt, FaDownload,
  FaClock, FaExclamationTriangle, FaCheckCircle, FaSpinner,
  FaComments, FaEye, FaEdit
} from "react-icons/fa";
import { 
  HiOutlineX, HiOutlineUser, HiOutlineOfficeBuilding,
  HiOutlineFlag, HiOutlineTag, HiOutlineCalendar, 
  HiOutlineDocumentText, HiOutlineDownload, HiOutlinePaperClip,
  HiOutlinePaperAirplane, HiOutlineChat, HiOutlineEye,
  HiOutlineClock, HiOutlineExclamation
} from "react-icons/hi";
import { 
  MdClose, MdPerson, MdBusiness, MdPriorityHigh, 
  MdLabel, MdCalendarToday, MdDescription, MdAttachFile,
  MdSend, MdComment, MdAccessTime
} from "react-icons/md";
import { BiUser, BiBuilding, BiFlag, BiCalendar, BiFile } from "react-icons/bi";
import { AiOutlineUser, AiOutlineFlag, AiOutlineCalendar } from "react-icons/ai";
import useIssuesStore from "../../../store/useIssuesStore";
import BaseModal from "../../common/BaseModal";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const commentVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

export default function TicketDetailsModal({
  isOpen,
  onClose,
  ticket,
  onAddComment,
}) {
  const { comments, isCommentLoading } = useIssuesStore();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <HiOutlineExclamation className="text-red-500" />;
      case 'Medium': return <HiOutlineClock className="text-yellow-500" />;
      case 'Low': return <HiOutlineFlag className="text-green-500" />;
      default: return <HiOutlineClock className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FaClock className="text-orange-500" />;
      case 'In Progress': return <FaSpinner className="text-blue-500" />;
      case 'Resolved': return <FaCheckCircle className="text-green-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'from-red-500 to-red-600';
      case 'Medium': return 'from-yellow-500 to-yellow-600';
      case 'Low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'from-orange-500 to-orange-600';
      case 'In Progress': return 'from-blue-500 to-blue-600';
      case 'Resolved': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-7xl h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
              >
                <HiOutlineEye className="text-white text-2xl" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Ticket Details
                </h2>
                <p className="text-blue-100 mt-1">
                  #{ticket._id?.slice(-6)?.toUpperCase() || 'N/A'}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
            >
              <HiOutlineX size={20} />
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100%-120px)]">
          {/* Left Panel - Ticket Details */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="w-1/2 p-6 border-r border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar"
          >
            <div className="space-y-6">
              {/* Title Section */}
              <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineDocumentText className="text-blue-500 text-lg" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Title</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {ticket.issueTitle || "N/A"}
                </p>
              </motion.div>

              {/* Creator Info */}
              <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineUser className="text-indigo-500 text-lg" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Created By</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {ticket.createdBy?.first_Name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {ticket.createdBy
                        ? `${ticket.createdBy.first_Name} ${ticket.createdBy.last_Name}`
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {ticket.createdBy?.employee_Id || 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Department & Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineOfficeBuilding className="text-purple-500 text-lg" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Department</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {ticket.assignedTo || "Unassigned"}
                  </p>
                </motion.div>

                <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineTag className="text-blue-500 text-lg" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.issueStatus)}
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${getStatusColor(ticket.issueStatus)} text-white`}>
                      {ticket.issueStatus || "Pending"}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Priority & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineFlag className="text-red-500 text-lg" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Priority</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(ticket.priority)}
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${getPriorityColor(ticket.priority)} text-white`}>
                      {ticket.priority || "N/A"}
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineCalendar className="text-green-500 text-lg" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Created</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {ticket.createdAt ? formatDate(ticket.createdAt) : "N/A"}
                  </p>
                </motion.div>
              </div>

              {/* Description */}
              <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MdDescription className="text-purple-500 text-lg" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Description</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {ticket.issueDescription || "No description provided..."}
                </p>
              </motion.div>

              {/* Attachments */}
              {(ticket.file || (ticket.additionalFiles && ticket.additionalFiles.length > 0)) && (
                <motion.div variants={fieldVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlinePaperClip className="text-indigo-500 text-lg" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Attachments</h3>
                  </div>
                  <div className="space-y-2">
                    {ticket.file && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                            <BiFile className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Primary Attachment
                          </span>
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={ticket.file}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <HiOutlineDownload />
                          Download
                        </motion.a>
                      </motion.div>
                    )}
                    
                    {ticket.additionalFiles && ticket.additionalFiles.map((fileObj, idx) => (
                      <motion.div
                        key={fileObj._id || idx}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                            <BiFile className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Attachment {idx + 1}
                          </span>
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={fileObj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          <HiOutlineDownload />
                          Download
                        </motion.a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Comments */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="w-1/2 flex flex-col"
          >
            {/* Comments Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <HiOutlineChat className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comments</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <AnimatePresence>
                {isCommentLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-8"
                  >
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                      />
                      Loading comments...
                    </div>
                  </motion.div>
                ) : comments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
                      <HiOutlineChat className="text-3xl text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No comments yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Be the first to add a comment
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((cmt, idx) => (
                      <motion.div
                        key={cmt._id || idx}
                        variants={commentVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs">
                              {typeof cmt.commenter === "object" && cmt.commenter?.first_Name
                                ? cmt.commenter.first_Name.charAt(0)
                                : 'A'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                {typeof cmt.commenter === "object"
                                  ? `${cmt.commenter.first_Name} ${cmt.commenter.last_Name}`
                                  : "Anonymous"}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <MdAccessTime />
                                {new Date(cmt.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {cmt.comment}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Comment Input */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm
                                 text-gray-800 dark:text-gray-100 placeholder-gray-400 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                                 transition-all duration-200 resize-none"
                      rows={3}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
                      title="Attach File"
                    >
                      <HiOutlinePaperClip />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                                 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                      title="Send Comment"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <HiOutlinePaperAirplane />
                      )}
                    </motion.button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to send, Shift + Enter for new line
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </BaseModal>
  );
}