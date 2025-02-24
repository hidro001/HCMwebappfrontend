
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaTimes } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// import useAnnouncementStore from "../../../store/announcementStore";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import BaseModal from "../../common/BaseModal";
// import FullScreenLoader from "../../common/FullScreenLoader";

// const AnnouncementEditModal = ({
//   isOpen,
//   onClose,
//   currentAnnouncement,
//   departments,
// }) => {
//   const { updateAnnouncement } = useAnnouncementStore();

//   // Local copy of the data to edit
//   const [formData, setFormData] = useState(null);

//   // For confirm "Update"
//   const [showConfirm, setShowConfirm] = useState(false);

//   // For loading spinner
//   const [isEditLoading, setIsEditLoading] = useState(false);

//   // Copy currentAnnouncement into local formData on open
// //   useEffect(() => {
// //     if (currentAnnouncement) {
// //       setFormData({
// //         _id: currentAnnouncement._id,
// //         announcementDate: currentAnnouncement.announcementDate,
// //         announcementSubject: currentAnnouncement.announcementSubject,
// //         announcementPostImg: null, // new file if user uploads
// //         announcementPostImgUrl: currentAnnouncement.announcementPostImgUrl,
// //         announcementDescription: currentAnnouncement.announcementDescription,
// //         publishForAll: currentAnnouncement.publishForAll,
// //         selectedDepartments: currentAnnouncement.selectedDepartments || [],
// //       });
// //     }
// //   }, [currentAnnouncement]);

// // When the modal opens and we set local formData:
// useEffect(() => {
//     if (currentAnnouncement) {
//       setFormData({
//         _id: currentAnnouncement._id,
//         announcementDate: currentAnnouncement.announcementDate,
//         announcementSubject: currentAnnouncement.announcementSubject,
  
//         // The new file the user might upload:
//         announcementPostImg: null, 
  
//         // Keep the existing image's URL to display a preview
//         announcementPostImgUrl: currentAnnouncement.announcementPostImgUrl,
  
//         announcementDescription: currentAnnouncement.announcementDescription,
  
//         // For toggling publish_for_all
//         publishForAll: currentAnnouncement.publishForAll,
  
//         // Array of selected department IDs
//         selectedDepartments: currentAnnouncement.selectedDepartments || [],
//       });
//     }
//   }, [currentAnnouncement]);
  

//   if (!isOpen || !formData) return null;

//   // Handlers
// //   const handleChange = (e) => {
// //     const { name, value, type, files, checked } = e.target;
// //     setFormData((prev) => {
// //       if (type === "file") {
// //         return { ...prev, [name]: files[0] };
// //       } else if (type === "checkbox") {
// //         if (name === "publishForAll") {
// //           return {
// //             ...prev,
// //             publishForAll: checked,
// //             selectedDepartments: checked ? [] : prev.selectedDepartments,
// //           };
// //         }
// //       }
// //       return { ...prev, [name]: value };
// //     });
// //   };

// const handleChange = (e) => {
//     const { name, value, type, files, checked } = e.target;
//     setFormData((prev) => {
//       if (type === "file") {
//         // The user just picked a new file
//         return { 
//           ...prev, 
//           [name]: files[0] 
//         };
//       } else if (type === "checkbox") {
//         // For "Publish for all" checkbox
//         if (name === "publishForAll") {
//           return {
//             ...prev,
//             publishForAll: checked,
//             // If we set publishForAll to true, clear selectedDepartments
//             selectedDepartments: checked ? [] : prev.selectedDepartments,
//           };
//         }
//       }
//       // Default for text inputs, textareas, etc.
//       return { ...prev, [name]: value };
//     });
//   };
  

//   const handleDepartmentSelection = (deptId) => {
//     setFormData((prev) => {
//       const isSelected = prev.selectedDepartments.includes(deptId);
//       const updated = isSelected
//         ? prev.selectedDepartments.filter((id) => id !== deptId)
//         : [...prev.selectedDepartments, deptId];
//       return { ...prev, selectedDepartments: updated, publishForAll: false };
//     });
//   };

//   // Validate & show confirm
//   const handleUpdateSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.announcementDate) {
//       toast.error("Date is required");
//       return;
//     }
//     if (!formData.announcementSubject.trim()) {
//       toast.error("Subject is required");
//       return;
//     }
//     if (!formData.announcementDescription.trim()) {
//       toast.error("Description is required");
//       return;
//     }
//     if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
//       toast.error("Select at least one department");
//       return;
//     }
//     setShowConfirm(true);
//   };

//   // Actually update after user confirms
// //   const confirmUpdate = async () => {
// //     try {
// //       setIsEditLoading(true);

// //       const form = new FormData();
// //       form.append("announcementDate", formData.announcementDate);
// //       form.append("announcementSubject", formData.announcementSubject);
// //       if (formData.announcementPostImg) {
// //         form.append("announcementPostImg", formData.announcementPostImg);
// //       }
// //       form.append("announcementDescription", formData.announcementDescription);
// //       form.append("publish_for_all", formData.publishForAll);
// //       formData.selectedDepartments.forEach((deptId) => {
// //         form.append("department[]", deptId);
// //       });

// //       await updateAnnouncement(formData._id, form);
// //       toast.success("Announcement updated successfully!");
// //       onClose();
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to update announcement.");
// //     } finally {
// //       setShowConfirm(false);
// //       setIsEditLoading(false);
// //     }
// //   };
// const confirmUpdate = async () => {
//     try {
//       setIsEditLoading(true);
  
//       // 1. Build FormData
//       const form = new FormData();
//       form.append("announcementDate", formData.announcementDate);
//       form.append("announcementSubject", formData.announcementSubject);
//       if (formData.announcementPostImg) {
//         form.append("announcementPostImg", formData.announcementPostImg);
//       }
//       form.append("announcementDescription", formData.announcementDescription);
  
//       // This must match the server's field name. 
//       // If your backend calls it "publish_for_all", do that exactly:
//       form.append("publish_for_all", formData.publishForAll);
  
//       // Departments must be appended one by one if you’re sending it as an array
//       formData.selectedDepartments.forEach((deptId) => {
//         form.append("department[]", deptId);
//       });
  
//       // 2. Actually call the store action to do the PUT request
//       await updateAnnouncement(formData._id, form);
  
//       toast.success("Announcement updated successfully!");
//       onClose();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update announcement.");
//     } finally {
//       setShowConfirm(false);
//       setIsEditLoading(false);
//     }
//   };
  

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       {/* Show loader if editing */}
//       {isEditLoading && <FullScreenLoader />}

//       {/* Confirmation dialog */}
//       <ConfirmationDialog
//         open={showConfirm}
//         title="Update Announcement"
//         message="Do you want to update this announcement?"
//         onConfirm={confirmUpdate}
//         onCancel={() => setShowConfirm(false)}
//         confirmText="Update"
//         cancelText="Cancel"
//       />

//       <motion.div
//         className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg 
//                    w-full max-w-2xl mx-4 p-4 md:p-6"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 dark:text-gray-200 
//                      hover:text-gray-700 dark:hover:text-gray-100"
//         >
//           <FaTimes />
//         </button>

//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
//           Edit Announcement
//         </h2>

//         <form onSubmit={handleUpdateSubmit} encType="multipart/form-data" className="space-y-4">
//           {/* Announcement Date */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Announcement Date
//             </label>
//             <input
//               type="date"
//               name="announcementDate"
//               value={formData.announcementDate}
//               onChange={handleChange}
//               className="w-full bg-white dark:bg-gray-700 border border-gray-300 
//                          dark:border-gray-600 rounded-md px-3 py-2 text-sm 
//                          focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>

//           {/* Announcement Subject */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Subject or Title
//             </label>
//             <input
//               type="text"
//               name="announcementSubject"
//               value={formData.announcementSubject}
//               onChange={handleChange}
//               className="w-full bg-white dark:bg-gray-700 border border-gray-300 
//                          dark:border-gray-600 rounded-md px-3 py-2 text-sm 
//                          focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Announcement Image */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Post Image</label>
//             <input
//               type="file"
//               name="announcementPostImg"
//               accept="image/*"
//               onChange={handleChange}
//               className="text-sm"
//             />
//             {/* Show new file name if user uploads */}
//             {formData.announcementPostImg && (
//               <p className="text-sm mt-1">{formData.announcementPostImg.name}</p>
//             )}

//             {/* Show existing image if no new file selected */}
//             {!formData.announcementPostImg && formData.announcementPostImgUrl && (
//               <div className="mt-2 w-full h-24 rounded-md overflow-hidden">
//                 <img
//                   src={formData.announcementPostImgUrl}
//                   alt={formData.announcementSubject}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Announcement Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Announcement Description
//             </label>
//             <textarea
//               name="announcementDescription"
//               rows={4}
//               value={formData.announcementDescription}
//               onChange={handleChange}
//               className="w-full bg-white dark:bg-gray-700 border border-gray-300 
//                          dark:border-gray-600 rounded-md px-3 py-2 text-sm 
//                          focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Publish for all? */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="publishForAll"
//               checked={formData.publishForAll}
//               onChange={handleChange}
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label className="text-sm">Publish for all departments</label>
//           </div>

//           {/* Departments */}
//           {!formData.publishForAll && (
//             <div>
//               <p className="text-sm font-medium mb-2">Select Departments</p>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {departments.map((dept) => (
//                   <label key={dept._id} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.selectedDepartments.includes(dept._id)}
//                       onChange={() => handleDepartmentSelection(dept._id)}
//                       className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                     />
//                     <span className="text-sm">{dept.department}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isEditLoading}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium 
//                          hover:bg-indigo-700 transition-colors"
//             >
//               {isEditLoading ? "Updating..." : "Update"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </BaseModal>
//   );
// };

// export default AnnouncementEditModal;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAnnouncementStore from "../../../store/announcementStore";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import BaseModal from "../../common/BaseModal";
import FullScreenLoader from "../../common/FullScreenLoader";

const AnnouncementEditModal = ({
  isOpen,
  onClose,
  currentAnnouncement,
  departments,
}) => {
  const { updateAnnouncement } = useAnnouncementStore();

  // Local copy of data to edit
  const [formData, setFormData] = useState(null);

  // Local confirmation dialog
  const [showConfirm, setShowConfirm] = useState(false);

  // Loader
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Initialize formData from currentAnnouncement
  useEffect(() => {
    if (currentAnnouncement) {
      setFormData({
        _id: currentAnnouncement._id,
        announcementDate: currentAnnouncement.announcementDate,
        announcementSubject: currentAnnouncement.announcementSubject,

        // The new file (if user picks)
        announcementPostImg: null,

        // Keep the existing image's URL for preview
        announcementPostImgUrl: currentAnnouncement.announcementPostImgUrl,

        announcementDescription: currentAnnouncement.announcementDescription,
        publishForAll: currentAnnouncement.publishForAll,
        selectedDepartments: currentAnnouncement.selectedDepartments || [],
      });
    }
  }, [currentAnnouncement]);

  if (!isOpen || !formData) return null;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => {
      if (type === "file") {
        // The user just picked a new file
        return { ...prev, [name]: files[0] };
      } else if (type === "checkbox") {
        // For "Publish for all"
        if (name === "publishForAll") {
          return {
            ...prev,
            publishForAll: checked,
            // Clear selected depts if checking "publishForAll"
            selectedDepartments: checked ? [] : prev.selectedDepartments,
          };
        }
      }
      // Default: text, date, textarea
      return { ...prev, [name]: value };
    });
  };

  // Department checkboxes
  const handleDepartmentSelection = (deptId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedDepartments.includes(deptId);
      const updated = isSelected
        ? prev.selectedDepartments.filter((id) => id !== deptId)
        : [...prev.selectedDepartments, deptId];
      return { ...prev, selectedDepartments: updated, publishForAll: false };
    });
  };

  // Validate & show confirm
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!formData.announcementDate) {
      toast.error("Date is required");
      return;
    }
    if (!formData.announcementSubject.trim()) {
      toast.error("Subject is required");
      return;
    }
    if (!formData.announcementDescription.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
      toast.error("Select at least one department");
      return;
    }
    setShowConfirm(true);
  };

  // Confirm update
  const confirmUpdate = async () => {
    try {
      setIsEditLoading(true);

      // Build FormData
      const form = new FormData();
      form.append("announcementDate", formData.announcementDate);
      form.append("announcementSubject", formData.announcementSubject);

      // Only append the new file if user selected one
      if (formData.announcementPostImg) {
        form.append("announcementPostImg", formData.announcementPostImg);
      }

      form.append("announcementDescription", formData.announcementDescription);
      form.append("publish_for_all", formData.publishForAll);

      formData.selectedDepartments.forEach((deptId) => {
        form.append("department[]", deptId);
      });

      // Actually call the store to PUT
      await updateAnnouncement(formData._id, form);

      toast.success("Announcement updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update announcement.");
    } finally {
      setShowConfirm(false);
      setIsEditLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {isEditLoading && <FullScreenLoader />}

      <ConfirmationDialog
        open={showConfirm}
        title="Update Announcement"
        message="Do you want to update this announcement?"
        onConfirm={confirmUpdate}
        onCancel={() => setShowConfirm(false)}
        confirmText="Update"
        cancelText="Cancel"
      />

      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                   w-full max-w-2xl mx-4 p-4 md:p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 dark:text-gray-200 
                     hover:text-gray-700 dark:hover:text-gray-100"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>

        <form
          onSubmit={handleUpdateSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Announcement Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Announcement Date
            </label>
            <input
              type="date"
              name="announcementDate"
              value={formData.announcementDate}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border
                         rounded-md px-3 py-2 text-sm focus:outline-none
                         focus:ring-1 focus:ring-blue-500"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject or Title
            </label>
            <input
              type="text"
              name="announcementSubject"
              value={formData.announcementSubject}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border 
                         rounded-md px-3 py-2 text-sm focus:outline-none
                         focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Post Image</label>
            <input
              type="file"
              name="announcementPostImg"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />
            {/* Show new file name if user uploads */}
            {formData.announcementPostImg && (
              <p className="text-sm mt-1">
                {formData.announcementPostImg.name}
              </p>
            )}

            {/* Show existing image preview if no new file selected */}
            {!formData.announcementPostImg && formData.announcementPostImgUrl && (
              <div className="mt-2 w-full h-24 rounded-md overflow-hidden">
                <img
                  src={formData.announcementPostImgUrl}
                  alt={formData.announcementSubject}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Announcement Description
            </label>
            <textarea
              name="announcementDescription"
              rows={4}
              value={formData.announcementDescription}
              onChange={handleChange}
              className="w-full bg-white dark:bg-gray-700 border
                         rounded-md px-3 py-2 text-sm focus:outline-none
                         focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Publish for all? */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="publishForAll"
              checked={formData.publishForAll}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm">Publish for all departments</label>
          </div>

          {/* Departments */}
          {!formData.publishForAll && (
            <div>
              <p className="text-sm font-medium mb-2">Select Departments</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departments.map((dept) => (
                  <label key={dept._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedDepartments.includes(dept._id)}
                      onChange={() => handleDepartmentSelection(dept._id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm">{dept.department}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isEditLoading}
              className="bg-indigo-600 text-white px-4 py-2 
                         rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              {isEditLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </motion.div>
    </BaseModal>
  );
};

export default AnnouncementEditModal;
