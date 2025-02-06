import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";

export default function AddNewPolicyModal({
  isOpen,
  onClose,
  roleName,
  setRoleName,
  department,
  setDepartment,
  coverImage,
  setCoverImage,
  description,
  setDescription,
  handleUpload,
}) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  // If you want to handle changing editor content
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 
                     flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 
                       w-11/12 max-w-5xl rounded-md p-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300"
              onClick={onClose}
            >
              <MdClose size={24} />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Add New Policy
            </h2>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                  Role Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Role Name"
                  className="w-full border dark:border-gray-700 
                             rounded-md p-2 focus:outline-none 
                             focus:ring-2 focus:ring-blue-400 
                             dark:bg-gray-700 dark:text-white"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>

              {/* Select Department */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                  Select Department
                </label>
                <select
                  className="w-full border dark:border-gray-700 rounded-md p-2 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 
                             dark:bg-gray-700 dark:text-white"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="All Department">All Department</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                Select Cover post of policy
              </label>
              <div
                className="border-2 border-dashed border-gray-300 
                           dark:border-gray-600 rounded-md p-4 
                           flex items-center justify-center cursor-pointer
                           hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {!coverImage && (
                  <label
                    htmlFor="coverImage"
                    className="flex flex-col items-center text-sm 
                               text-gray-500 dark:text-gray-300"
                  >
                    <svg
                      className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7l8.89 5.26a2 2 0 002.22 0L23 
                           7m-2 10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 
                           2 0 012-2h14a2 2 0 012 2v12z"
                      ></path>
                    </svg>
                    Select Cover post of policy
                  </label>
                )}
                {coverImage && (
                  <div className="text-sm dark:text-gray-200">
                    {coverImage.name}
                  </div>
                )}
                <input
                  id="coverImage"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Policy Description - using TinyMCE */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Write Policy Description
              </label>
              <Editor
                apiKey="YOUR_TINYMCE_API_KEY"
                // or: tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={description}
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end mt-8">
              <button
                className="text-gray-700 dark:text-gray-300 border border-gray-400 
                           dark:border-gray-600 px-4 py-2 rounded-md mr-4
                           hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
