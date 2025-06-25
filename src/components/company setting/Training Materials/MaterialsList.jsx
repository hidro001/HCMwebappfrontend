// import React from "react";
// import {
//   FaFilePdf,
//   FaFilePowerpoint,
//   FaRegImage,
//   FaVideo,
// } from "react-icons/fa";

// function renderIcon(type) {
//   switch (type) {
//     case "ppt":
//       return <FaFilePowerpoint className="text-orange-500 w-6 h-6" />;
//     case "pdf":
//       return <FaFilePdf className="text-red-500 w-6 h-6" />;
//     case "video":
//       return <FaVideo className="text-blue-500 w-6 h-6" />;
//     case "image":
//       return <FaRegImage className="text-green-500 w-6 h-6" />;
//     default:
//       return null;
//   }
// }

// export default function MaterialsList({ materials }) {
//   if (!materials || materials.length === 0) {
//     return <div>No materials available for this module.</div>;
//   }

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {materials.map((item) => (
//         <div
//           key={item.id}
//           className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
//         >
//           <div className="flex items-center space-x-2">
//             {renderIcon(item.type)}
//             <h4 className="text-gray-800 dark:text-gray-100 font-medium">
//               {item.title}
//             </h4>
//           </div>
//           <button
//             onClick={() => window.open(item.presignedUrl, "_blank")}
//             className="mt-2 text-sm text-blue-600 dark:text-blue-400 underline self-start"
//           >
//             Open {item.type.toUpperCase()}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }



import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaRegImage,
  FaVideo,
  FaDownload,
  FaEye,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaClock,
  FaFileAlt,
  FaPlay,
  FaImage,
  FaBookOpen,
  FaGraduationCap,
  FaChartBar,
  FaStar,
  FaTag,
  FaCalendarAlt
} from "react-icons/fa";
import {
  HiDocumentText,
  HiPhotograph,
  HiPlay,
  HiSearch,
  HiFilter,
  HiEye,
  HiDownload,
  HiExternalLink,
  HiClock,
  HiCalendar,
  HiTag,
  HiStar
} from "react-icons/hi";
import { HiOutlinePresentationChartBar  }  from 'react-icons/hi2';

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
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 300
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Enhanced material data
const enhanceMaterialData = (material) => ({
  ...material,
  // Add some mock data for demonstration
  duration: material.type === 'video' ? `${Math.floor(Math.random() * 45) + 5} min` : 
            material.type === 'ppt' ? `${Math.floor(Math.random() * 20) + 10} slides` :
            material.type === 'pdf' ? `${Math.floor(Math.random() * 30) + 5} pages` :
            'Quick view',
  size: `${(Math.random() * 50 + 1).toFixed(1)} MB`,
  lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
  category: ["Tutorial", "Reference", "Exercise", "Assessment", "Guide"][Math.floor(Math.random() * 5)],
  rating: (Math.random() * 2 + 3).toFixed(1),
  views: Math.floor(Math.random() * 1000) + 50,
  isNew: Math.random() > 0.8,
  isFeatured: Math.random() > 0.7,
  downloadCount: Math.floor(Math.random() * 500) + 10
});

function renderIcon(type, className = "w-6 h-6") {
  const iconClass = `${className} transition-all duration-200`;
  
  switch (type) {
    case "ppt":
      return <HiOutlinePresentationChartBar className={`${iconClass} text-orange-500`} />;
    case "pdf":
      return <HiDocumentText className={`${iconClass} text-red-500`} />;
    case "video":
      return <HiPlay className={`${iconClass} text-blue-500`} />;
    case "image":
      return <HiPhotograph className={`${iconClass} text-green-500`} />;
    default:
      return <HiDocumentText className={`${iconClass} text-gray-500`} />;
  }
}

function getTypeColor(type) {
  switch (type) {
    case "ppt": return "orange";
    case "pdf": return "red";
    case "video": return "blue";
    case "image": return "green";
    default: return "gray";
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "ppt": return "Presentation";
    case "pdf": return "Document";
    case "video": return "Video";
    case "image": return "Image";
    default: return "File";
  }
}

function getCategoryColor(category) {
  switch (category) {
    case "Tutorial": return "blue";
    case "Reference": return "purple";
    case "Exercise": return "green";
    case "Assessment": return "red";
    case "Guide": return "orange";
    default: return "gray";
  }
}

export default function MaterialsList({ materials }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState("grid");

  // Enhanced materials with additional data
  const enhancedMaterials = useMemo(() => 
    materials ? materials.map(enhanceMaterialData) : []
  , [materials]);

  // Filter materials
  const filteredMaterials = enhancedMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    return matchesSearch && material.type === filterBy;
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "type":
        return a.type.localeCompare(b.type);
      case "date":
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const handleMaterialClick = (material) => {
    if (material.presignedUrl) {
      window.open(material.presignedUrl, "_blank");
    }
  };

  if (!materials || materials.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <HiDocumentText className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No Learning Materials Available
        </h3>
        <p className="text-gray-500 dark:text-gray-500 mb-6">
          This training module doesn't have any materials uploaded yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors duration-200">
            Contact Instructor
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            Browse Other Modules
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Training Materials
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Access your learning resources, documents, and training content
          </p>
        </motion.div>
      </div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials by title or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF Documents</option>
              <option value="ppt">Presentations</option>
              <option value="video">Videos</option>
              <option value="image">Images</option>
            </select>
            <HiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="title">Sort by Title</option>
              <option value="type">Sort by Type</option>
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedMaterials.length} of {enhancedMaterials.length} materials
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </motion.div>

      {/* Materials Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        <AnimatePresence>
          {sortedMaterials.map((material, index) => {
            const typeColor = getTypeColor(material.type);
            const categoryColor = getCategoryColor(material.category);
            
            if (viewMode === "list") {
              return (
                <motion.div
                  key={material.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <motion.div
                        variants={iconVariants}
                        whileHover="hover"
                        className={`p-3 bg-${typeColor}-100 dark:bg-${typeColor}-900/20 rounded-xl`}
                      >
                        {renderIcon(material.type, "w-6 h-6")}
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {material.title}
                        </h4>
                        {/* <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${typeColor}-100 dark:bg-${typeColor}-900/20 text-${typeColor}-800 dark:text-${typeColor}-300`}>
                            {getTypeLabel(material.type)}
                          </span>
                          <span className="flex items-center space-x-1">
                            <HiClock className="w-4 h-4" />
                            <span>{material.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <HiEye className="w-4 h-4" />
                            <span>{material.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <HiStar className="w-4 h-4 text-yellow-400" />
                            <span>{material.rating}</span>
                          </span>
                        </div> */}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMaterialClick(material)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                      >
                        <HiExternalLink className="w-4 h-4" />
                        <span>Open</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={material.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                layout
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer"
                onClick={() => handleMaterialClick(material)}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {material.isNew && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      New
                    </motion.div>
                  )}
                  {material.isFeatured && (
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                      className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                    >
                      <HiStar className="text-xs" />
                      <span>Featured</span>
                    </motion.div>
                  )}
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`p-4 bg-${typeColor}-100 dark:bg-${typeColor}-900/20 rounded-xl`}
                  >
                    {renderIcon(material.type, "w-8 h-8")}
                  </motion.div>
                </div>

                {/* Material Info */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
                      {material.title}
                    </h4>
                    {/* <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${typeColor}-100 dark:bg-${typeColor}-900/20 text-${typeColor}-800 dark:text-${typeColor}-300`}>
                        {getTypeLabel(material.type)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${categoryColor}-100 dark:bg-${categoryColor}-900/20 text-${categoryColor}-800 dark:text-${categoryColor}-300`}>
                        {material.category}
                      </span>
                    </div> */}
                  </div>

                  {/* Material Stats */}
                  {/* <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <HiClock className="text-gray-400" />
                      <span>{material.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiEye className="text-gray-400" />
                      <span>{material.views} views</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiStar className="text-yellow-400" />
                      <span>{material.rating}/5.0</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiDownload className="text-gray-400" />
                      <span>{material.size}</span>
                    </div>
                  </div> */}

                  {/* Last Updated */}
                  {/* <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <HiCalendar className="text-gray-400" />
                    <span>Updated {material.lastUpdated}</span>
                  </div> */}
                </div>

                {/* Action Area */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
                      Open {getTypeLabel(material.type)}
                    </span>
                    <motion.div
                      className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors duration-200"
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiExternalLink className="text-purple-600 dark:text-purple-400 text-sm" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-purple-50 dark:bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-2xl"
                  initial={false}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty Search Results */}
      {sortedMaterials.length === 0 && enhancedMaterials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiDocumentText className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No Materials Found
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterBy("all");
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {enhancedMaterials.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Materials
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {enhancedMaterials.filter(m => m.type === 'video').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Videos
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {enhancedMaterials.filter(m => m.type === 'pdf').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Documents
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(enhancedMaterials.reduce((acc, m) => acc + parseFloat(m.rating), 0) / enhancedMaterials.length * 10) / 10 || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Avg Rating
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}