

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTimes } from "react-icons/fa";

// export default function CommentModal({
//   isOpen,
//   onClose,
//   ticket, // if you need ticket info
//   comments = [], // array of existing comments
//   onAddComment, // callback to add a new comment
// }) {
//   const [newComment, setNewComment] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     // Don’t post empty strings
//     if (!newComment.trim()) return;
//     onAddComment(newComment);
//     setNewComment("");
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/30 dark:bg-black/50 
//                      backdrop-blur-sm overflow-y-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Clickable backdrop to close */}
//           <div className="absolute inset-0" onClick={onClose} />

//           <motion.div
//             className="relative z-10 w-full max-w-md 
//                        bg-white dark:bg-gray-800
//                        border border-gray-200 dark:border-gray-700
//                        rounded-xl shadow-2xl p-4
//                        overflow-hidden mx-4 my-8 transition-colors"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 30, opacity: 0 }}
//           >
//             {/* Header with close button */}
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//                 Comments
//               </h2>
//               <button
//                 className="text-gray-600 dark:text-gray-200 
//                            hover:text-gray-800 dark:hover:text-white 
//                            transition-colors"
//                 onClick={onClose}
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Existing comments */}
//             <div className="space-y-3 max-h-60 overflow-auto pr-1">
//               {comments.map((comment, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-100 dark:bg-gray-700 border 
//                              border-gray-200 dark:border-gray-600
//                              rounded-md p-3 shadow-sm"
//                 >
//                   {/* Example: user name + ID at the top */}
//                   <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//                     {comment.userName}{" "}
//                     <span className="text-xs text-gray-400 dark:text-gray-400">
//                       ({comment.userId})
//                     </span>
//                   </div>
//                   {/* Comment body */}
//                   <div className="text-gray-800 dark:text-gray-100 text-sm">
//                     {comment.text}
//                   </div>
//                   {/* Timestamp (bottom-right) */}
//                   <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
//                     {comment.timestamp}
//                   </div>
//                 </div>
//               ))}

//               {/* If no comments yet */}
//               {comments.length === 0 && (
//                 <div className="text-gray-500 dark:text-gray-400 text-sm text-center">
//                   No comments yet
//                 </div>
//               )}
//             </div>

//             {/* Add new comment */}
//             <div className="mt-4">
//               <textarea
//                 className="w-full border border-gray-200 dark:border-gray-600 
//                            bg-white dark:bg-gray-700
//                            rounded p-2 text-sm text-gray-800 dark:text-gray-100
//                            focus:outline-none focus:ring-1 focus:ring-blue-400
//                            placeholder-gray-400 dark:placeholder-gray-500"
//                 rows={3}
//                 placeholder="Write your comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />

//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-blue-600 hover:bg-blue-700 text-white
//                              px-4 py-2 rounded text-sm shadow-md
//                              transition-colors"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// src/components/CommentModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// If you want to read the store's comments directly from useIssuesStore,
// you can or pass them as props from TicketsPage.

import useIssuesStore from "../../store/useIssuesStore";

export default function CommentModal({
  isOpen,
  onClose,
  ticket, // The selected issue
  onAddComment, // callback to add a new comment
}) {
  const [newComment, setNewComment] = useState("");
  const { comments, isCommentLoading } = useIssuesStore();

  if (!isOpen || !ticket) return null;

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Clickable backdrop */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       rounded-xl shadow-2xl p-4 mx-4 my-8 transition-colors"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Comments for {ticket.issueTitle}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Comments List */}
            {isCommentLoading ? (
              <p>Loading comments...</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-auto pr-1">
                {comments.length === 0 && (
                  <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                    No comments yet
                  </div>
                )}
                {comments.map((cmt, idx) => (
                  <div
                    key={cmt._id || idx}
                    className="bg-gray-100 dark:bg-gray-700 border 
                               border-gray-200 dark:border-gray-600
                               rounded-md p-3 shadow-sm"
                  >
                    {/* Top line: userName (if available) */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {typeof cmt.commenter === "object"
                        ? `${cmt.commenter.first_Name} ${cmt.commenter.last_Name}`
                        : "Anonymous"}
                    </div>
                    {/* Body */}
                    <div className="text-gray-800 dark:text-gray-100 text-sm">
                      {cmt.comment}
                    </div>
                    {/* Timestamp */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                      {new Date(cmt.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add new comment */}
            <div className="mt-4">
              <textarea
                className="w-full border border-gray-200 dark:border-gray-600
                           bg-white dark:bg-gray-700 rounded p-2 text-sm
                           text-gray-800 dark:text-gray-100 focus:outline-none
                           placeholder-gray-400 dark:placeholder-gray-500"
                rows={3}
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white
                             px-4 py-2 rounded text-sm shadow-md transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
