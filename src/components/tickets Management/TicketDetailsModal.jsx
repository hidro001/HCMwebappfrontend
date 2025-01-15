// src/components/TicketDetailsModal.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import useIssuesStore from "../../store/useIssuesStore";

export default function TicketDetailsModal({
  isOpen,
  onClose,
  ticket,         // The currently-selected ticket
  onAddComment,   // Function that calls postComment in your store
}) {
  // Grab comments + loading state from the store
  const { comments, isCommentLoading } = useIssuesStore();

  // Local state for new comment text
  const [newComment, setNewComment] = useState("");

  if (!isOpen || !ticket) return null;

  // Submit a new comment
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment(""); // Clear input
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Semi-transparent backdrop */}
          <div
            className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Container: width and height constraints */}
          <motion.div
            className="relative w-full max-w-5xl h-[80vh] md:h-[70vh] lg:h-[75vh] flex pointer-events-none"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            exit={{ y: 30 }}
          >
            {/* The actual modal content */}
            <div
              className="
                pointer-events-auto 
                flex flex-1 
                bg-white/5 dark:bg-gray-800
                backdrop-blur-md 
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                rounded-lg overflow-hidden shadow-lg
              "
            >
              {/** LEFT PANEL — Ticket Details */}
              <div className="flex flex-col w-1/2 p-4 border-r border-white/20 dark:border-white/10">
                <h2 className="text-xl font-bold mb-4">Ticket Details</h2>

                {/* Title */}
                <div className="mb-4">
                  <p className="font-semibold">Title</p>
                  <p>{ticket.issueTitle || "N/A"}</p>
                </div>

                {/* Created By */}
                <div className="mb-4">
                  <p className="font-semibold">Created By</p>
                  <p>
                    {ticket.createdBy
                      ? `${ticket.createdBy.first_Name} ${ticket.createdBy.last_Name}`
                      : "N/A"}
                  </p>
                </div>

                {/* Department */}
                <div className="mb-4">
                  <p className="font-semibold">Assigned Department</p>
                  <p>{ticket.assignedTo || "N/A"}</p>
                </div>

                {/* Priority */}
                <div className="mb-4">
                  <p className="font-semibold">Priority</p>
                  <p>{ticket.priority || "N/A"}</p>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <p className="font-semibold">Status</p>
                  <p>{ticket.issueStatus || "Pending"}</p>
                </div>

                {/* Attachment (primary file) */}
                <div className="mb-4">
                  <p className="font-semibold">Attachment</p>
                  {ticket.file ? (
                    <div className="mt-1 bg-white text-gray-800 px-2 py-1 inline-flex items-center rounded">
                      <span className="mr-2">File Attached</span>
                      <a
                        href={ticket.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Download
                      </a>
                    </div>
                  ) : (
                    <p>None</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="font-semibold">Description</p>
                  <p className="text-sm leading-relaxed">
                    {ticket.issueDescription || "No description provided..."}
                  </p>
                </div>

                {/* Additional Attachments */}
                {ticket.additionalFiles && ticket.additionalFiles.length > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold">Additional Attachments</p>
                    {ticket.additionalFiles.map((fileObj, idx) => (
                      <div
                        key={fileObj._id || idx}
                        className="mt-1 bg-white text-gray-800 px-2 py-1 inline-flex items-center rounded"
                      >
                        <span className="mr-2">Attachment {idx + 1}</span>
                        <a
                          href={fileObj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/** RIGHT PANEL — Comments */}
              <div className="flex flex-col w-1/2 p-4">
                {/* Header row: 'Comment' + Close icon */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Comments</h2>
                  <button onClick={onClose} title="Close">
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Comments list */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {isCommentLoading ? (
                    <p>Loading comments...</p>
                  ) : comments.length === 0 ? (
                    <div className="text-sm text-center text-gray-300">
                      No comments yet
                    </div>
                  ) : (
                    comments.map((cmt, idx) => (
                      <div key={cmt._id || idx} className="bg-white text-gray-800 rounded p-3">
                        <p className="text-sm font-semibold mb-1">
                          {typeof cmt.commenter === "object"
                            ? `${cmt.commenter.first_Name} ${cmt.commenter.last_Name}`
                            : "Anonymous"}
                        </p>
                        <p className="text-sm">{cmt.comment}</p>
                        <div className="text-right text-xs text-gray-400 mt-1">
                          {new Date(cmt.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input Box */}
                <div className="mt-3 bg-white text-gray-700 rounded flex items-center p-2">
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 outline-none"
                    placeholder="Comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className="mx-1 text-gray-500 hover:text-gray-700"
                    title="Attach File"
                  >
                    <FaPaperclip />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Send"
                    onClick={handleSubmitComment}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
