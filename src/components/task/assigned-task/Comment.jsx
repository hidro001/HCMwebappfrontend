import React, { useState, useEffect, useRef } from 'react';
import { getComments, addComment } from '../../../service/taskService';
import { FaComments, FaUser, FaClock, FaPaperPlane } from 'react-icons/fa';

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
  const commentListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComments(taskId);
        if (result.success) {
          setComments(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  // Whenever 'comments' changes, animate the scroll to the bottom
  useEffect(() => {
    if (commentListRef.current) {
      const scrollHeight = commentListRef.current.scrollHeight;
      smoothScrollTo(commentListRef.current, scrollHeight);
    }
  }, [comments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const result = await addComment(taskId, commentText);
      if (result.success && result.data) {
        setComments((prev) => [...prev, result.data]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 my-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-md shadow-md">
      <div className="flex items-center mb-4">
        <FaComments className="text-xl text-blue-500 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Acknowledge
        </h2>
      </div>

      <ul
        ref={commentListRef}
        className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-2"
      >
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-2">
            No Acknowledge yet. Add one below!
          </p>
        ) : (
          comments.map(({ _id, comment, commenter, createdAt }) => {
            const commenterName = commenter
              ? `${commenter.first_Name || ''} ${commenter.last_Name || ''}`.trim()
              : 'Unknown User';
            const formattedDate = createdAt
              ? new Date(createdAt).toLocaleString()
              : '';

            return (
              <li
                key={_id}
                className="border border-gray-300 dark:border-gray-700 p-3 rounded bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 break-words transition-colors"
              >
                <div className="mb-1 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                  <span className="flex items-center font-medium">
                    <FaUser className="mr-1 text-gray-500" />
                    {commenterName}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-1 text-gray-500" />
                    {formattedDate}
                  </span>
                </div>
                <div>{comment}</div>
              </li>
            );
          })
        )}
      </ul>

      <form onSubmit={handleAddComment} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <FaPaperPlane className="mr-2" />
          Add
        </button>
      </form>
    </div>
  );
};

export default Comment;
