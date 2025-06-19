// import React, { useState, useEffect, useRef } from 'react';
// import { getComments, addComment } from '../../../service/taskService';
// import { FaComments, FaUser, FaClock, FaPaperPlane } from 'react-icons/fa';

// // A small utility to animate the scroll
// const smoothScrollTo = (element, to, duration = 600) => {
//   const start = element.scrollTop;
//   const change = to - start;
//   let currentTime = 0;
//   const increment = 16; // ~60 frames per second if we use setTimeout

//   const easeInOutQuad = (t, b, c, d) => {
//     // Quadratic easeInOut
//     t /= d / 2;
//     if (t < 1) return (c / 2) * t * t + b;
//     t--;
//     return (-c / 2) * (t * (t - 2) - 1) + b;
//   };

//   function animateScroll() {
//     currentTime += increment;
//     const val = easeInOutQuad(currentTime, start, change, duration);
//     element.scrollTop = val;
//     if (currentTime < duration) {
//       setTimeout(animateScroll, increment);
//     }
//   }

//   animateScroll();
// };

// const Comment = ({ taskId }) => {
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState('');
//   const commentListRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getComments(taskId);
//         if (result.success) {
//           setComments(result.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching comments:', error.message);
//       }
//     };

//     if (taskId) {
//       fetchData();
//     }
//   }, [taskId]);

//   // Whenever 'comments' changes, animate the scroll to the bottom
//   useEffect(() => {
//     if (commentListRef.current) {
//       const scrollHeight = commentListRef.current.scrollHeight;
//       smoothScrollTo(commentListRef.current, scrollHeight);
//     }
//   }, [comments]);

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
//     try {
//       const result = await addComment(taskId, commentText);
//       if (result.success && result.data) {
//         setComments((prev) => [...prev, result.data]);
//         setCommentText('');
//       }
//     } catch (error) {
//       console.error('Error adding comment:', error.message);
//     }
//   };

//   return (
//     <div className="max-w-xl w-full mx-auto p-6 my-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-md shadow-md">
//       <div className="flex items-center mb-4">
//         <FaComments className="text-xl text-blue-500 mr-2" />
//         <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//           Acknowledge
//         </h2>
//       </div>

//       <ul
//         ref={commentListRef}
//         className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-2"
//       >
//         {comments.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-400 py-2">
//             No Acknowledge yet. Add one below!
//           </p>
//         ) : (
//           comments.map(({ _id, comment, commenter, createdAt }) => {
//             const commenterName = commenter
//               ? `${commenter.first_Name || ''} ${commenter.last_Name || ''}`.trim()
//               : 'Unknown User';
//             const formattedDate = createdAt
//               ? new Date(createdAt).toLocaleString()
//               : '';

//             return (
//               <li
//                 key={_id}
//                 className="border border-gray-300 dark:border-gray-700 p-3 rounded bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 break-words transition-colors"
//               >
//                 <div className="mb-1 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
//                   <span className="flex items-center font-medium">
//                     <FaUser className="mr-1 text-gray-500" />
//                     {commenterName}
//                   </span>
//                   <span className="flex items-center">
//                     <FaClock className="mr-1 text-gray-500" />
//                     {formattedDate}
//                   </span>
//                 </div>
//                 <div>{comment}</div>
//               </li>
//             );
//           })
//         )}
//       </ul>

//       <form onSubmit={handleAddComment} className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Write a comment..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//         >
//           <FaPaperPlane className="mr-2" />
//           Add
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Comment;



import React, { useState, useEffect, useRef } from 'react';
import { getComments, addComment } from '../../../service/taskService';
import { 
  FaComments, 
  FaUser, 
  FaClock, 
  FaPaperPlane, 
  FaCheck,
  FaPlus,
  FaRegCommentDots,
  FaSpinner
} from 'react-icons/fa';

// A small utility to animate the scroll
const smoothScrollTo = (element, to, duration = 600) => {
  const start = element.scrollTop;
  const change = to - start;
  let currentTime = 0;
  const increment = 16; // ~60 frames per second if we use setTimeout

  const easeInOutQuad = (t, b, c, d) => {
    // Quadratic easeInOut
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  function animateScroll() {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }

  animateScroll();
};

const Comment = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getComments(taskId);
        if (result.success) {
          setComments(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  // Whenever 'comments' changes, animate the scroll to the bottom
  useEffect(() => {
    if (commentListRef.current && !isLoading) {
      const scrollHeight = commentListRef.current.scrollHeight;
      smoothScrollTo(commentListRef.current, scrollHeight);
    }
  }, [comments, isLoading]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await addComment(taskId, commentText);
      if (result.success && result.data) {
        setComments((prev) => [...prev, result.data]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg">
          <FaComments className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Task Comments
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Discussion and updates</p>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          ref={commentListRef}
          className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-[300px] max-h-[400px]"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e0 transparent'
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <FaSpinner className="text-2xl text-green-500 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                <FaRegCommentDots className="text-2xl text-gray-400" />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                  No Comments Yet
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start the discussion by adding the first comment!
                </p>
              </div>
            </div>
          ) : (
            comments.map(({ _id, comment, commenter, createdAt }, index) => {
              const commenterName = commenter
                ? `${commenter.first_Name || ''} ${commenter.last_Name || ''}`.trim()
                : 'Unknown User';
              const formattedDate = createdAt
                ? new Date(createdAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : '';

              return (
                <div
                  key={_id}
                  className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Comment Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {commenterName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FaClock className="text-xs" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                  
                  {/* Comment Content */}
                  <div className="bg-gray-50/50 dark:bg-gray-600/50 rounded-lg p-3 border border-gray-200/30 dark:border-gray-500/30">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed break-words">
                      {comment}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Comment Form */}
        <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <form onSubmit={handleAddComment} className="space-y-4">
            <div className="relative">
              <textarea
                placeholder="Write a comment or update..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              <div className="absolute bottom-3 right-3">
                <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                  <FaComments className="text-green-600 dark:text-green-400 text-sm" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    <span>Add Comment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
        
        /* Custom scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        
        .dark div::-webkit-scrollbar-thumb {
          background: #4a5568;
        }
        
        .dark div::-webkit-scrollbar-thumb:hover {
          background: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default Comment;