import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuthStore from "../../store/store";
import DOMPurify from "dompurify";
import { FaArrowUp } from "react-icons/fa";
import { RiCheckboxBlankFill } from "react-icons/ri";

const CommentDrawer = ({
  post,
  commentText,
  setCommentText,
  isAddingComment,
  onAddComment,
  onClose,
  onLikeComment,
  loadingLikes = new Set(),
}) => {
  const currentUser = useAuthStore();

  const userId = currentUser?._id;
  const userAvatar = currentUser?.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";

  if (!post) return null;

  console.log(post, 'post')

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
      />

      <motion.aside
        onClick={e => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col p-6"
      >
        <button
          onClick={onClose}
          className="self-end text-gray-600 dark:text-gray-300 text-2xl font-bold hover:text-gray-900 dark:hover:text-white mb-4"
          aria-label="Close Comments Drawer"
          type="button"
        >
          ×
        </button>
         <div className="flex justify-content">
            <p className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 truncate" >
            Comments for 
            </p>
            <span className="font-semibold text-xl px-2 text-gray-900 dark:text-gray-100 mb-1" title={post.title}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
            ></span>
          </div> 

        <div className="space-y-4 overflow-y-auto flex-grow border-t border-gray-300 sidebar-scrollbar dark:border-gray-700 pt-4">
          {(!post.comments || post.comments.length === 0) && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">No comments yet.</p>
          )}
          {post.comments?.map(comment => {
            const isLiked = comment.reactions.some(r => r.user === userId);
            const likeCount = comment.reactions.filter(r => r.type === 'like').length;
            const isLoading = loadingLikes.has(comment._id);


            return (
              <div key={comment._id} className="flex items-center text-gray-800 dark:text-gray-200 text-sm pb-1 ">
                  <img
                    src={comment.commenter?.user_Avatar}
                    alt="User"
                    className="h-8 w-8 mx-1 rounded-full object-cover border border-gray-300"
                  />
                  
                 <div className="flex w-full mx-2 items-center justify-between items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                   <div>
                       <span className="text-black font-bold"> {comment.commenter?.first_Name || "Unknown"} {comment.commenter?.last_Name || "User"}</span>
                       <p>{typeof comment.comment === "string" ? comment.comment : JSON.stringify(comment.comment)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      if (!isLoading && userId) onLikeComment(comment._id);
                    }}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "text-gray-600 dark:text-gray-400 hover:text-red-500"
                    } focus:outline-none focus:ring-1 focus:ring-red-500 rounded`}
                    aria-label={isLiked ? "Unlike comment" : "Like comment"}
                    aria-pressed={isLiked}
                  >
                    {isLiked ? (
                      <AiFillHeart className="w-4 h-4 text-red-500" />
                    ) : (
                      <AiOutlineHeart className="w-4 h-4" />
                    )}
                    <span>{likeCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
       <div className="sticky  flex justify-center border border-gray-300 p-2 rounded-lg">
          <img
            src={userAvatar}
            alt="User"
            className="h-10 w-10 mx-1 rounded-full object-cover border border-gray-300"
          />
        <form onSubmit={onAddComment} className="flex items-center justify-center w-full ">
          <textarea
            rows={1}
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="p-2 w-full rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isAddingComment}
            className="self-end rounded-full p-2 bg-gray-500 text-black rounded hover:bg-gray-600 disabled:opacity-50"
          >
            {isAddingComment ? <RiCheckboxBlankFill /> : <FaArrowUp />}
          </button>
        </form> 
      </div>
      </motion.aside>
    </>,
    document.body
  );
};

export default CommentDrawer;
