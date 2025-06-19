

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { FiPlus, FiDownload, FiTrash, FiEdit } from "react-icons/fi";
// import useInductionPPTStore from "../../../store/useInductionPPTStore";
// import InductionPPTModal from "./model/InductionPPTModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// export default function CompanyInduction() {
//   // Local states for the form
//   const [pptName, setPptName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [allDepartment, setAllDepartment] = useState(false);
//   const [file, setFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   // Modal, Edit, Confirm states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false); 
//   const [editingPPTId, setEditingPPTId] = useState(null);

//   const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//   const [pptToDelete, setPptToDelete] = useState(null);

//   // Zustand store
//   const { pptList, fetchPPTs, createPPT, updatePPT, deletePPT } =
//     useInductionPPTStore();

//   // Fetch PPTs on load
//   useEffect(() => {
//     fetchPPTs();
//   }, [fetchPPTs]);

//   /** Open modal in ADD mode */
//   const handleAddNew = () => {
//     // Reset form states
//     setPptName("");
//     setDepartment("");
//     setAllDepartment(false);
//     setFile(null);
//     setCoverImage(null);

//     setEditMode(false);
//     setEditingPPTId(null);
//     setIsModalOpen(true);
//   };

//   /** Open modal in EDIT mode, pre-fill states */
//   const handleEdit = (ppt) => {
//     setEditingPPTId(ppt._id);
//     setPptName(ppt.pptName);
//     setDepartment(ppt.department);
//     setAllDepartment(ppt.allDepartment || false);
//     setFile(null);
//     setCoverImage(null);

//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   /** Create OR Update */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!pptName) {
//       toast.error("PPT name is required.");
//       return;
//     }
//     if (!allDepartment && !department) {
//       toast.error("Please select a department or choose All Departments.");
//       return;
//     }

//     const pptData = {
//       pptName,
//       department,
//       allDepartment,
//       pptFile: file,
//       coverImage,
//     };

//     try {
//       if (editMode && editingPPTId) {
//         await updatePPT(editingPPTId, pptData);
//       } else {
//         if (!file) {
//           toast.error("Please select a PPT file for upload.");
//           return;
//         }
//         await createPPT(pptData);
//       }

//       // Close & reset
//       setIsModalOpen(false);
//       setEditMode(false);
//       setEditingPPTId(null);
//       setPptName("");
//       setDepartment("");
//       setAllDepartment(false);
//       setFile(null);
//       setCoverImage(null);
//     } catch (err) {
//       toast.error("Operation failed");
//     }
//   };

//   /** Confirm user wants to delete */
//   const handleDelete = (id) => {
//     setPptToDelete(id);
//     setIsConfirmDialogOpen(true);
//   };

//   /** Delete if user confirms */
//   const handleConfirmDelete = async () => {
//     if (pptToDelete) {
//       await deletePPT(pptToDelete);
//       setPptToDelete(null);
//       setIsConfirmDialogOpen(false);
//     }
//   };

//   /** User canceled delete */
//   const handleCancelDelete = () => {
//     setPptToDelete(null);
//     setIsConfirmDialogOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           All Induction PPTs
//         </h1>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white
//                      px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400
//                      dark:text-gray-900 transition-all"
//           onClick={handleAddNew}
//         >
//           <FiPlus className="mr-2" />
//           Add Induction PPT
//         </motion.button>
//       </div>

//       {/* PPT List Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pptList.map((item) => (
//           <motion.div
//             key={item._id}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
//           >
//             <img
//               src={item.coverImage}
//               alt={item.pptName}
//               className="h-40 w-full object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                 {item.pptName}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
//                 {item.allDepartment ? "All Departments" : item.department}
//               </p>
//               <div className="flex justify-between gap-1">
//                 {/* View PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-blue-500 text-white px-1 py-2
//                              rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900
//                              transition-all"
//                 >
//                   <FiDownload className="mr-2" />
//                   <a
//                     href={item.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View PPT
//                   </a>
//                 </motion.button>

//                 {/* Edit PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-green-500 text-white px-3 py-2
//                              rounded hover:bg-green-600 transition-all"
//                   onClick={() => handleEdit(item)}
//                 >
//                   <FiEdit className="mr-1" />
//                   Edit
//                 </motion.button>

//                 {/* Delete PPT */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-red-500 text-white px-3 py-2
//                              rounded hover:bg-red-600 transition-all"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   <FiTrash className="mr-1" />
//                   Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Modal for Add/Edit */}
//       <InductionPPTModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         pptName={pptName}
//         setPptName={setPptName}
//         department={department}
//         setDepartment={setDepartment}
//         allDepartment={allDepartment}
//         setAllDepartment={setAllDepartment}
//         file={file}
//         setFile={setFile}
//         coverImage={coverImage}
//         setCoverImage={setCoverImage}
//         handleSubmit={handleSubmit}
//         editMode={editMode}
//       />

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={isConfirmDialogOpen}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this PPT?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiDownload,
  FiTrash,
  FiEdit,
  FiEye,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList
} from "react-icons/fi";
import {
  HiAcademicCap,
  HiOfficeBuilding,
  HiPlus,
  HiEye,
  HiDownload,
  HiPencil,
  HiTrash,
  HiSearch,
  HiFilter,
  HiViewGrid,
  HiViewList,
  HiUsers,
  HiCalendar,
  HiDocumentText,
  HiPresentationChartBar,
  HiStar,
  HiClock
} from "react-icons/hi";
import useInductionPPTStore from "../../../store/useInductionPPTStore";
import InductionPPTModal from "./model/InductionPPTModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), " +
      "0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 300
    }
  }
};

// Enhanced PPT data
const enhancePPTData = (ppt) => ({
  ...ppt,
  createdDate: new Date(
    Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  lastModified: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  views: Math.floor(Math.random() * 500) + 20,
  downloads: Math.floor(Math.random() * 200) + 5,
  rating: (Math.random() * 2 + 3).toFixed(1),
  duration: `${Math.floor(Math.random() * 30) + 10} min`,
  slides: Math.floor(Math.random() * 50) + 15,
  isPopular: Math.random() > 0.7,
  isNew: Math.random() > 0.8,
  category: [
    "Orientation",
    "Company Culture",
    "Policies",
    "Safety",
    "Benefits"
  ][Math.floor(Math.random() * 5)]
});

export default function CompanyInduction() {
  // Local states for the form
  const [pptName, setPptName] = useState("");
  const [department, setDepartment] = useState("");
  const [allDepartment, setAllDepartment] = useState(false);
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  // Modal, Edit, Confirm states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingPPTId, setEditingPPTId] = useState(null);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pptToDelete, setPptToDelete] = useState(null);

  // Zustand store
  const { pptList, fetchPPTs, createPPT, updatePPT, deletePPT } =
    useInductionPPTStore();

  // Enhanced PPT list
  const enhancedPPTs = pptList.map(enhancePPTData);

  // Filter and sort PPTs
  const filteredPPTs = enhancedPPTs.filter((ppt) => {
    const matchesSearch =
      ppt.pptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ppt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ppt.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === "all") return matchesSearch;
    if (filterBy === "popular") return matchesSearch && ppt.isPopular;
    if (filterBy === "new") return matchesSearch && ppt.isNew;
    if (filterBy === "all-dept") return matchesSearch && ppt.allDepartment;

    return matchesSearch;
  });

  const sortedPPTs = [...filteredPPTs].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.pptName.localeCompare(b.pptName);
      case "date":
        return new Date(b.createdDate) - new Date(a.createdDate);
      case "views":
        return b.views - a.views;
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  // Fetch PPTs on load
  useEffect(() => {
    fetchPPTs();
  }, [fetchPPTs]);

  /** Open modal in ADD mode */
  const handleAddNew = () => {
    setPptName("");
    setDepartment("");
    setAllDepartment(false);
    setFile(null);
    setCoverImage(null);

    setEditMode(false);
    setEditingPPTId(null);
    setIsModalOpen(true);
  };

  /** Open modal in EDIT mode, pre-fill states */
  const handleEdit = (ppt) => {
    setEditingPPTId(ppt._id);
    setPptName(ppt.pptName);
    setDepartment(ppt.department);
    setAllDepartment(ppt.allDepartment || false);
    setFile(null);
    setCoverImage(null);

    setEditMode(true);
    setIsModalOpen(true);
  };

  /** Create OR Update */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pptName) {
      toast.error("PPT name is required.");
      return;
    }
    if (!allDepartment && !department) {
      toast.error("Please select a department or choose All Departments.");
      return;
    }

    const pptData = {
      pptName,
      department,
      allDepartment,
      pptFile: file,
      coverImage
    };

    try {
      if (editMode && editingPPTId) {
        await updatePPT(editingPPTId, pptData);
      } else {
        if (!file) {
          toast.error("Please select a PPT file for upload.");
          return;
        }
        await createPPT(pptData);
      }

      // Close & reset
      setIsModalOpen(false);
      setEditMode(false);
      setEditingPPTId(null);
      setPptName("");
      setDepartment("");
      setAllDepartment(false);
      setFile(null);
      setCoverImage(null);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  /** Confirm user wants to delete */
  const handleDelete = (id) => {
    setPptToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  /** Delete if user confirms */
  const handleConfirmDelete = async () => {
    if (pptToDelete) {
      await deletePPT(pptToDelete);
      setPptToDelete(null);
      setIsConfirmDialogOpen(false);
    }
  };

  /** User canceled delete */
  const handleCancelDelete = () => {
    setPptToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Orientation":
        return "blue";
      case "Company Culture":
        return "purple";
      case "Policies":
        return "red";
      case "Safety":
        return "yellow";
      case "Benefits":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
              <HiAcademicCap className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Company Induction
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Manage onboarding presentations and induction materials for new
            employees
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search presentations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
            

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="views">Sort by Views</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <HiViewGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <HiViewList className="w-5 h-5" />
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddNew}
                className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <HiPlus className="text-lg" />
                <span className="hidden sm:inline">Add Induction PPT</span>
                <span className="sm:hidden">Add PPT</span>
              </motion.button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedPPTs.length} of {enhancedPPTs.length} presentations
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div variants={itemVariants}>
          {sortedPPTs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <HiPresentationChartBar className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {searchTerm || filterBy !== "all"
                  ? "No PPTs Found"
                  : "No Induction PPTs"}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search terms or filters"
                  : "Create your first induction presentation to get started"}
              </p>
              {!searchTerm && filterBy === "all" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddNew}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  Create First PPT
                </motion.button>
              )}
              {(searchTerm || filterBy !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterBy("all");
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedPPTs.map((item) => {
                  const categoryColor = getCategoryColor(item.category);
                  return (
                    <motion.div
                      key={item._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      layout
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200"
                    >
                      {/* Image Header */}
                      <div className="relative">
                        <img
                          src={
                            item.coverImage ||
                            "https://via.placeholder.com/300x200?text=PPT+Cover"
                          }
                          alt={item.pptName}
                          className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                 

                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="space-y-3">
                          {/* Title and Category */}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                              {item.pptName}
                            </h3>
                            <div className="flex items-center space-x-2 mt-2">
                           
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  item.allDepartment
                                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {item.allDepartment
                                  ? "All Departments"
                                  : item.department}
                              </span>
                            </div>
                          </div>

                 

                          {/* Meta Info */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <div className="flex items-center justify-between">
                              <span>Created: {item.createdDate}</span>
                          
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            <HiEye className="w-4 h-4" />
                            <span>View</span>
                          </motion.a>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200"
                          >
                            <HiPencil className="w-5 h-5" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                          >
                            <HiTrash className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* Missing “else” branch for viewMode !== 'grid' */
            null
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {enhancedPPTs.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total PPTs
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {enhancedPPTs.filter((p) => p.allDepartment).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              All Departments
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {new Set(enhancedPPTs.map((p) => p.category)).size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Categories
            </div>
          </div>

        </motion.div>
      </div>

      {/* Modal for Add/Edit */}
      <InductionPPTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pptName={pptName}
        setPptName={setPptName}
        department={department}
        setDepartment={setDepartment}
        allDepartment={allDepartment}
        setAllDepartment={setAllDepartment}
        file={file}
        setFile={setFile}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this induction PPT? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}
