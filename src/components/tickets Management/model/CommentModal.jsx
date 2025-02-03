
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import useIssuesStore from "../../../store/useIssuesStore";

// 1) Import your BaseModal
import BaseModal from "../../common/BaseModal"; // adjust the path if needed

export default function CommentModal({
  isOpen,
  onClose,
  ticket,
  onAddComment,
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
    // 2) Wrap your content in <BaseModal>
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 
        3) Keep your "white box" design in a <motion.div> 
        for the fade/slide animation 
      */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 
                   rounded-xl shadow-2xl p-4 mx-4 my-8 transition-colors"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Comments for {ticket.issueTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-200 hover:text-gray-800 
                       dark:hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

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
                className="bg-gray-100 dark:bg-gray-700 
                           border border-gray-200 dark:border-gray-600 
                           rounded-md p-3 shadow-sm"
              >
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {typeof cmt.commenter === "object"
                    ? `${cmt.commenter.first_Name} ${cmt.commenter.last_Name}`
                    : "Anonymous"}
                </div>
                <div className="text-gray-800 dark:text-gray-100 text-sm">
                  {cmt.comment}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                  {new Date(cmt.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

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
    </BaseModal>
  );
}

