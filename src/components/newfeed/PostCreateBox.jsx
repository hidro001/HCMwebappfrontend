

// // src/components/PostCreateBox.js
// import React, { useState } from "react";
// import axiosInstance from "../../service/axiosInstance";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useAuthStore from "../../store/store";

// const PostCreateBox = ({ socket }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const user = useAuthStore((state) => state);

//   const handleFileChange = (e) => {
//     setMediaFiles([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim()) {
//       toast.error("Title and Description are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     mediaFiles.forEach((file) => {
//       formData.append("mediaFiles", file);
//     });

//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.post("/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       // Emit real-time event for new post
//       socket.emit("newPost", response.data.post);
//       // Reset form
//       setTitle("");
//       setDescription("");
//       setMediaFiles([]);
//       toast.success("Post created successfully!");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast.error("Failed to create post. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6 transition-colors duration-300"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title Input */}
//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           {/* Description Textarea */}
//           <textarea
//             placeholder="Share your thoughts..."
//             className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             rows={4}
//           />

//           {/* File Inputs */}
//           <div className="flex space-x-4">
//             {/* Photo Upload */}
//             <div>
//               <input
//                 accept="image/*"
//                 multiple
//                 type="file"
//                 id="photoFiles"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//               <label
//                 htmlFor="photoFiles"
//                 className="cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {/* Photo Icon */}
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 5a2 2 0 012-2h3.586a2 2 0 011.414.586l1.414 1.414A2 2 0 0111 5.586V5a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.586 1.414l-1.414 1.414A2 2 0 0118.414 9H19a2 2 0 012 2v3a2 2 0 01-.586 1.414l-1.414 1.414A2 2 0 0118 18.414V19a2 2 0 01-2 2h-3.586a2 2 0 01-1.414-.586l-1.414-1.414A2 2 0 0111 18.414V19a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 01.586-1.414l1.414-1.414A2 2 0 016.586 14H7a2 2 0 012-2v-3a2 2 0 01.586-1.414l1.414-1.414A2 2 0 0110.414 7H11a2 2 0 012-2z"
//                   />
//                 </svg>
//                 <span>Photo</span>
//               </label>
//             </div>

//             {/* Video Upload */}
//             <div>
//               <input
//                 accept="video/*"
//                 multiple
//                 type="file"
//                 id="videoFiles"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//               <label
//                 htmlFor="videoFiles"
//                 className="cursor-pointer flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-300"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {/* Video Icon */}
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 10v4m0 0v0a2 2 0 002 2h10a2 2 0 002-2v-4m-14 0h14"
//                   />
//                 </svg>
//                 <span>Video</span>
//               </label>
//             </div>
//           </div>

//           {/* Selected Files Preview */}
//           {mediaFiles.length > 0 && (
//             <div className="mt-2">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {mediaFiles.length} file(s) selected
//               </p>
//               <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
//                 {mediaFiles.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Posting..." : "Post"}
//           </button>
//         </form>
//       </motion.div>
//       <ToastContainer />
//     </>
//   );
// };

// export default PostCreateBox;

// src/components/PostCreateBox.js
import React, { useState } from "react";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

const PostCreateBox = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    mediaFiles.forEach((file) => {
      formData.append("mediaFiles", file);
    });

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Emit real-time event for new post if needed
      // socket.emit("newPost", response.data.post);
      // Reset form
      setTitle("");
      setDescription("");
      setMediaFiles([]);
      toast.success("Post created successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        error.response?.data?.message || "Failed to create post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description Textarea */}
      <textarea
        placeholder="Share your thoughts..."
        className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
      />

      {/* File Inputs */}
      <div className="flex space-x-4">
        {/* Photo Upload */}
        <div>
          <input
            accept="image/*"
            multiple
            type="file"
            id="photoFiles"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="photoFiles"
            className="cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Photo Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.586a2 2 0 011.414.586l1.414 1.414A2 2 0 0111 5.586V5a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.586 1.414l-1.414 1.414A2 2 0 0118.414 9H19a2 2 0 012 2v3a2 2 0 01-.586 1.414l-1.414 1.414A2 2 0 0118 18.414V19a2 2 0 01-2 2h-3.586a2 2 0 01-1.414-.586l-1.414-1.414A2 2 0 0111 18.414V19a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 01.586-1.414l1.414-1.414A2 2 0 016.586 14H7a2 2 0 012-2v-3a2 2 0 01.586-1.414l1.414-1.414A2 2 0 0110.414 7H11a2 2 0 012-2z"
              />
            </svg>
            <span>Photo</span>
          </label>
        </div>

        {/* Video Upload */}
        <div>
          <input
            accept="video/*"
            multiple
            type="file"
            id="videoFiles"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="videoFiles"
            className="cursor-pointer flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Video Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 10v4m0 0v0a2 2 0 002 2h10a2 2 0 002-2v-4m-14 0h14"
              />
            </svg>
            <span>Video</span>
          </label>
        </div>
      </div>

      {/* Selected Files Preview */}
      {mediaFiles.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mediaFiles.length} file(s) selected
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
            {mediaFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth
        startIcon={isLoading && <CircularProgress size={20} />}
      >
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default PostCreateBox;

