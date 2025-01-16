// import React, { useState, useEffect } from "react";
// import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import { usePoshStore } from "../../../store/poshStore";

// export default function IssueDetailsModal({ isOpen, onClose, issue }) {
//   const [commentText, setCommentText] = useState("");
//   const { fetchPoshActDetails, addPoshActComment, poshActs } = usePoshStore();

//   // If we want to refetch details each time user opens the modal
//   useEffect(() => {
//     if (isOpen && issue?.id) {
//       (async () => {
//         try {
//           await fetchPoshActDetails(issue.id);
//         } catch (err) {
//           // already handled toast in store
//         }
//       })();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen, issue?.id]);

//   if (!isOpen) return null;

//   // Find the updated object from the store (it has fresh comments, etc.)
//   const currentItem = poshActs.find((act) => act.id === issue.id) || issue;

//   const handleSendComment = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await addPoshActComment(currentItem.id, commentText.trim());
//       setCommentText("");
//     } catch (err) {
//       // error toast handled in store
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Semi-transparent backdrop */}
//       <div
//         className="absolute inset-0 
//                    bg-black/30 dark:bg-black/50 
//                    backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal container */}
//       <div className="relative w-full max-w-5xl h-[80vh] md:h-[70vh] lg:h-[75vh] flex pointer-events-none">
//         {/* The actual modal content */}
//         <div
//           className="
//             pointer-events-auto 
//             flex flex-1 
//             bg-white/5 dark:bg-gray-800
//             backdrop-blur-md 
//             border border-gray-300 dark:border-gray-700
//             text-gray-900 dark:text-gray-100
//             rounded-lg overflow-hidden shadow-lg
//           "
//         >
//           {/* LEFT PANEL — Issue Details */}
//           <div className="flex flex-col w-1/2 p-4 border-r border-white/20 dark:border-white/10">
//             <h2 className="text-xl font-bold mb-4">Issue Details</h2>

//             {/* Reporter */}
//             <div className="mb-4">
//               <p className="font-semibold">Reporter</p>
//               <p>
//                 {currentItem?.reporterName || "N/A"} ({currentItem?.reporterId})
//               </p>
//             </div>

//             {/* Accused */}
//             <div className="mb-4">
//               <p className="font-semibold">Accused</p>
//               <p>
//                 {currentItem?.accusedName || "N/A"} ({currentItem?.accusedId})
//               </p>
//             </div>

//             {/* Incident Date */}
//             <div className="mb-4">
//               <p className="font-semibold">Incident Date</p>
//               <p>
//                 {currentItem?.incidentDate
//                   ? new Date(currentItem.incidentDate).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </div>

//             {/* Type */}
//             <div className="mb-4">
//               <p className="font-semibold">Type</p>
//               <p>{currentItem?.type || "N/A"}</p>
//             </div>

//             {/* Status */}
//             <div className="mb-4">
//               <p className="font-semibold">Status</p>
//               <p>{currentItem?.status || "Pending"}</p>
//             </div>

//             {/* Attachment (if any) */}
//             <div className="mb-4">
//               <p className="font-semibold">Attachments</p>
//               {currentItem?.attachments?.length > 0 ? (
//                 <ul className="list-disc list-inside">
//                   {currentItem.attachments.map((att, idx) => (
//                     <li key={idx} className="mt-1">
//                       {/* In real scenario:  */}
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

//             {/* Description */}
//             <div className="mb-4">
//               <p className="font-semibold">Description</p>
//               <p className="text-sm leading-relaxed">
//                 {currentItem?.description || "No description provided..."}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT PANEL — Comments */}
//           <div className="flex flex-col w-1/2 p-4">
//             {/* Header row: 'Comment' + Close icon */}
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Comment</h2>
//               <button onClick={onClose} title="Close">
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Existing comments */}
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

//             {/* Comment Input Box */}
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
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { usePoshStore } from "../../../store/poshStore";

export default function IssueDetailsModal({ isOpen, onClose, issue }) {
  const [commentText, setCommentText] = useState("");
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
    if (!commentText.trim()) return;
    try {
      await addPoshActComment(currentItem.id, commentText.trim());
      setCommentText("");
    } catch {}
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
          <motion.div
            className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-5xl h-[80vh] md:h-[70vh] lg:h-[75vh] flex pointer-events-none"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
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
              <div className="flex flex-col w-1/2 p-4 border-r border-white/20 dark:border-white/10">
                <h2 className="text-xl font-bold mb-4">Issue Details</h2>
                <div className="mb-4">
                  <p className="font-semibold">Reporter</p>
                  <p>
                    {currentItem?.reporterName || "N/A"} (
                    {currentItem?.reporterId})
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Accused</p>
                  <p>
                    {currentItem?.accusedName || "N/A"} ({currentItem?.accusedId})
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Incident Date</p>
                  <p>
                    {currentItem?.incidentDate
                      ? new Date(currentItem.incidentDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Type</p>
                  <p>{currentItem?.type || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Status</p>
                  <p>{currentItem?.status || "Pending"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Attachments</p>
                  {currentItem?.attachments?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {currentItem.attachments.map((att, idx) => (
                        <li key={idx} className="mt-1">
                          <a href={att.url} target="_blank" rel="noreferrer">
                            <button className="text-blue-600 hover:text-blue-800 text-sm underline">
                              {att.name || `Attachment ${idx + 1}`}
                            </button>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>None</p>
                  )}
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Description</p>
                  <p className="text-sm leading-relaxed">
                    {currentItem?.description || "No description provided..."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-1/2 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Comment</h2>
                  <button onClick={onClose} title="Close">
                    <FaTimes size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {currentItem?.comments?.length ? (
                    currentItem.comments.map((c) => (
                      <div key={c._id} className="bg-white text-gray-800 rounded p-3">
                        <p className="text-sm font-semibold mb-1">
                          {c.user?.first_Name} {c.user?.last_Name}
                        </p>
                        <p className="text-sm">{c.message}</p>
                        <div className="text-right text-xs text-gray-400 mt-1">
                          {new Date(c.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-300 dark:text-gray-400">
                      No comments yet...
                    </div>
                  )}
                </div>
                <div className="mt-3 bg-white text-gray-700 rounded flex items-center p-2">
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 outline-none text-sm"
                    placeholder="Comment Here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
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
                    onClick={handleSendComment}
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
