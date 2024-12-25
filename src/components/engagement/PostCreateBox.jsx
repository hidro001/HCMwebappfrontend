
import React, { useState } from "react";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { Button, CircularProgress, TextField, IconButton } from "@mui/material";
import { AddPhotoAlternate, VideoLibrary } from "@mui/icons-material";

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
      toast.success("Post created successfully!");
      setTitle("");
      setDescription("");
      setMediaFiles([]);
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


