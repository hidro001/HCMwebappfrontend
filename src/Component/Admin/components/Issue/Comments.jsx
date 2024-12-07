// // src/components/Admin/components/Issue/Comments.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./Comments.css"; // Optional: Create this CSS file for styling

// const Comments = ({ issueId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch comments when the component mounts or issueId changes
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           throw new Error("No access token found");
//         }

//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}/comments`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setComments(response.data.data);
//         } else {
//           throw new Error(response.data.message || "Failed to fetch comments");
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error.message);
//         toast.error(error.message || "Error fetching comments");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, [issueId]);

//   // Handle adding a new comment
//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found");
//       }

//       const response = await axios.post(
//         `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}/comments`,
//         { comment: newComment },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         setComments([...comments, response.data.data]);
//         setNewComment("");
//         toast.success("Comment added successfully");
//       } else {
//         throw new Error(response.data.message || "Failed to add comment");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error.message);
//       toast.error(error.message || "Error adding comment");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="comments-section">
//       <h4>Comments</h4>

//       {/* Comments List */}
//       {isLoading ? (
//         <p>Loading comments...</p>
//       ) : comments.length === 0 ? (
//         <p>No comments yet.</p>
//       ) : (
//         <ul className="comments-list">
//           {comments.map((c) => (
//             <li key={c._id} className="comment-item">
//               <div className="comment-header">
//                 <strong>{c.role === "admin" ? "Admin" : "User"}</strong>
//                 <span className="comment-timestamp">
//                   {new Date(c.createdAt).toLocaleString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </span>
//               </div>
//               <p className="comment-text">{c.comment}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Add Comment Form */}
//       <form onSubmit={handleAddComment} className="add-comment-form">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           required
//           className="comment-input"
//         ></textarea>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="submit-comment-button"
//         >
//           {isSubmitting ? "Adding..." : "Add Comment"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Comments;
// src/components/Admin/components/Issue/Comments.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./Comments.css"; // Optional: Create this CSS file for styling

// const Comments = ({ issueId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch comments when the component mounts or issueId changes
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           throw new Error("No access token found");
//         }

//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}/comments`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setComments(response.data.data);
//         } else {
//           throw new Error(response.data.message || "Failed to fetch comments");
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error.message);
//         toast.error(error.message || "Error fetching comments");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, [issueId]);

//   // Handle adding a new comment
//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found");
//       }

//       const response = await axios.post(
//         `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}/comments`,
//         { comment: newComment },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         setComments([...comments, response.data.data]);
//         setNewComment("");
//         toast.success("Comment added successfully");
//       } else {
//         throw new Error(response.data.message || "Failed to add comment");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error.message);
//       toast.error(error.message || "Error adding comment");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="comments-section">
//       <h4>Comments</h4>

//       {/* Comments List */}
//       {isLoading ? (
//         <p>Loading comments...</p>
//       ) : comments.length === 0 ? (
//         <p>No comments yet.</p>
//       ) : (
//         <ul className="comments-list">
//           {comments.map((c) => (
//             <li key={c._id} className="comment-item">
//               <div className="comment-header">
//                 <strong>{c.role === "admin" ? "Admin" : "User"}</strong>
//                 <span className="comment-timestamp">
//                   {new Date(c.createdAt).toLocaleString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </span>
//               </div>
//               <p className="comment-text">{c.comment}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Add Comment Form */}
//       <form onSubmit={handleAddComment} className="add-comment-form">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           required
//           className="comment-input"
//         ></textarea>
//         <button type="submit" disabled={isSubmitting} className="submit-comment-button">
//           {isSubmitting ? "Adding..." : "Add Comment"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Comments;

// components/Comments.jsx

// import { useState, useEffect } from "react";
// import service from "./api"; // Ensure correct path
// import { toast } from "react-toastify";

// const Comments = ({ issueId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Fetch comments on component mount and when issueId changes
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await service.getCommentsForIssue(issueId);
//         if (response.success) {
//           setComments(response.data);
//         } else {
//           throw new Error(response.message || "Failed to fetch comments.");
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error.message);
//         toast.error(error.message || "Failed to fetch comments.");
//       }
//     };

//     if (issueId) {
//       fetchComments();
//     }
//   }, [issueId]);

//   // Add a new comment
//   const handleAddComment = async () => {
//     if (!newComment.trim()) {
//       toast.error("Comment cannot be empty!");
//       return;
//     }

//     try {
//       const response = await service.postCommentOnIssue(issueId, newComment);

//       if (response.success) {
//         setComments([...comments, response.data.data]); // Assuming response.data.data is the new comment
//         toast.success("Comment added successfully!");
//         setNewComment("");
//       } else {
//         throw new Error(response.message || "Failed to add comment");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error.message);
//       toast.error(error.message || "Error adding comment.");
//     }
//   };

//   return (
//     <div className="comments-section">
//       <h4>Comments</h4>
//       <div className="comments-list">
//         {comments.length > 0 ? (
//           comments.map((comment) => (
//             <div key={comment._id} className="comment">
//               <strong>
//                 {comment.commenter.firstName} {comment.commenter.lastName}
//               </strong>
//               <p>{comment.comment}</p>
//               <small>
//                 {new Date(comment.createdAt).toLocaleString("en-IN", {
//                   timeZone: "Asia/Kolkata",
//                 })}
//               </small>
//             </div>
//           ))
//         ) : (
//           <p>No comments available.</p>
//         )}
//       </div>
//       <div className="add-comment">
//         <textarea
//           className="comment-input"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment"
//         />
//         <button onClick={handleAddComment} className="comment-button">
//           Submit Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Comments;

// components/Comments.jsx
// Comments.jsx

import { useState, useEffect } from "react";
import service from "./api"; // Ensure correct path
import { toast } from "react-toastify";
import "./Comments.css"; // Optional: Create this CSS file for styling

const Comments = ({ issueId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       console.log("Fetching comments for issueId:", issueId); // Logging
  //       const response = await service.getCommentsForIssue(issueId);
  //       console.log("16561",response);

  //       if (response.success) {
  //         setComments(response.data);
  //       } else {
  //         throw new Error(response.message || "Failed to fetch comments.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comments:", error.message);
  //       toast.error("Failed to fetch comments.");
  //     }
  //   };

  //   if (issueId) {
  //     fetchComments();
  //   }
  // }, [issueId]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for issueId:", issueId); // Logging
        const response = await service.getCommentsForIssue(issueId);
        console.log("16561", response); // Should log the comments array

        if (response) {
          setComments(response);
        } else {
          throw new Error(response.message || "Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        toast.error("Failed to fetch comments.");
      }
    };

    if (issueId) {
      fetchComments();
    }
  }, [issueId]);

  console.log(comments);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      console.log(
        "Adding comment to issueId:",
        issueId,
        "Comment:",
        newComment
      ); // Logging
      const response = await service.postCommentOnIssue(issueId, newComment);

      if (response) {
        setComments([...comments, response.data]); // Directly append the new comment
        toast.success("Comment added successfully!");
        setNewComment("");
      } else {
        throw new Error(response.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
      toast.error(error.message || "Error adding comment.");
    }
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>
              {comment.commenter.first_Name} {comment.commenter.last_Name}
            </strong>
            <p>{comment.comment}</p>
            <small>
              {new Date(comment.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </small>
          </div>
        ))}
      </div>

      <div className="add-comment">
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="comment-button">
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
