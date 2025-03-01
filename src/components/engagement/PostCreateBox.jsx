
// import  { useState } from "react";
// import axiosInstance from "../../service/axiosInstance";
// import { toast } from "react-toastify";
// import { Button, CircularProgress, TextField, IconButton, Grid } from "@mui/material";
// import { AddPhotoAlternate, VideoLibrary, Delete } from "@mui/icons-material";

// const PostCreateBox = ({ onSuccess }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [mediaPreviews, setMediaPreviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setMediaFiles(files);

//     const previews = files.map((file) => ({
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith("image") ? "image" : "video",
//       name: file.name,
//     }));
//     setMediaPreviews(previews);
//   };

//   const handleRemoveMedia = (index) => {
//     const updatedFiles = [...mediaFiles];
//     updatedFiles.splice(index, 1);
//     setMediaFiles(updatedFiles);

//     const updatedPreviews = [...mediaPreviews];
//     updatedPreviews.splice(index, 1);
//     setMediaPreviews(updatedPreviews);
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
//       toast.success("Post created successfully!");
//       setTitle("");
//       setDescription("");
//       setMediaFiles([]);
//       setMediaPreviews([]);
//       if (onSuccess) onSuccess();
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create post. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 ">
//       {/* Title Input */}
//       <TextField
//         label="Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />

//       {/* Description Textarea */}
//       <TextField
//         label="Share your thoughts..."
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />

//       {/* File Inputs */}
//       <div className="flex flex-wrap gap-4">
//         {/* Photo Upload */}
//         <div>
//           <input
//             accept="image/*"
//             multiple
//             type="file"
//             id="photoFiles"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="photoFiles"
//             className="cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
//           >
//             <AddPhotoAlternate />
//             <span>Photo</span>
//           </label>
//         </div>

//         {/* Video Upload */}
//         <div>
//           <input
//             accept="video/*"
//             multiple
//             type="file"
//             id="videoFiles"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="videoFiles"
//             className="cursor-pointer flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-300"
//           >
//             <VideoLibrary />
//             <span>Video</span>
//           </label>
//         </div>
//       </div>

//       {/* Selected Files Preview */}
//       {mediaPreviews.length > 0 && (
//         <div className="mt-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//             Preview of selected media:
//           </p>
//           <Grid container spacing={2}>
//             {mediaPreviews.map((media, index) => (
//               <Grid item xs={6} sm={4} md={3} key={index} className="relative">
//                 <div className="relative">
//                   {media.type === "image" ? (
//                     <img
//                       src={media.url}
//                       alt={media.name}
//                       className="w-full h-32 object-cover rounded-md"
//                     />
//                   ) : (
//                     <video
//                       src={media.url}
//                       className="w-full h-32 object-cover rounded-md"
//                       controls
//                     />
//                   )}
//                   <IconButton
//                     onClick={() => handleRemoveMedia(index)}
//                     className="absolute top-1 right-1 bg-white dark:bg-gray-700 rounded-full"
//                     size="small"
//                     aria-label="Remove media"
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </div>
//                 <p className="text-xs text-center mt-1 truncate">{media.name}</p>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       )}

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         disabled={isLoading}
//         fullWidth
//         startIcon={isLoading && <CircularProgress size={20} />}
//       >
//         {isLoading ? "Posting..." : "Post"}
//       </Button>
//     </form>
//   );
// };

// export default PostCreateBox;




import { useState } from "react";
import axiosInstance from "../../service/axiosInstance";
// 1) Import the toast function from react-hot-toast
import { toast } from "react-hot-toast";
import {
  Button,
  CircularProgress,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import {
  AddPhotoAlternate,
  VideoLibrary,
  Delete,
} from "@mui/icons-material";

const PostCreateBox = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
      name: file.name,
    }));
    setMediaPreviews(previews);
  };

  const handleRemoveMedia = (index) => {
    const updatedFiles = [...mediaFiles];
    updatedFiles.splice(index, 1);
    setMediaFiles(updatedFiles);

    const updatedPreviews = [...mediaPreviews];
    updatedPreviews.splice(index, 1);
    setMediaPreviews(updatedPreviews);
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
      toast.success("Post created successfully!");
      setTitle("");
      setDescription("");
      setMediaFiles([]);
      setMediaPreviews([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description Textarea */}
      <TextField
        label="Share your thoughts..."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* File Inputs */}
      <div className="flex flex-wrap gap-4">
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
            <AddPhotoAlternate />
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
            <VideoLibrary />
            <span>Video</span>
          </label>
        </div>
      </div>

      {/* Selected Files Preview */}
      {mediaPreviews.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Preview of selected media:
          </p>
          <Grid container spacing={2}>
            {mediaPreviews.map((media, index) => (
              <Grid item xs={6} sm={4} md={3} key={index} className="relative">
                <div className="relative">
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-32 object-cover rounded-md"
                      controls
                    />
                  )}
                  <IconButton
                    onClick={() => handleRemoveMedia(index)}
                    className="absolute top-1 right-1 bg-white dark:bg-gray-700 rounded-full"
                    size="small"
                    aria-label="Remove media"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
                <p className="text-xs text-center mt-1 truncate">
                  {media.name}
                </p>
              </Grid>
            ))}
          </Grid>
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
