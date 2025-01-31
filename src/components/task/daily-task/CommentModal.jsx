import React, { useEffect, useState } from "react";
import { FaTimes, FaPaperclip, FaRegPaperPlane } from "react-icons/fa";

const CommentModal = ({ task, onClose }) => {
  if (!task) return null;

  const [comment, setComment] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSend = () => {
    if (comment.trim()) {
      alert(`Comment Sent: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Dark Transparent Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Slide-in Panel */}
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg transform transition-transform duration-300 p-6 relative z-50">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Comment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-blue-600 font-semibold cursor-pointer">{task.assignee}</span>
          </div>
          <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-300">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            <span>📌</span> 6:30 PM
          </div>
        </div>

        {/* Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Comment Here" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <FaPaperclip className="text-gray-500 dark:text-gray-400 cursor-pointer" />
          <FaRegPaperPlane className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
