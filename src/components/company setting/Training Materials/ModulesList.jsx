// import React from "react";
// import { FaTasks } from "react-icons/fa";

// export default function ModulesList({ modules, onSelectModule }) {
//   if (!modules || modules.length === 0) {
//     return <div>No modules available for this company.</div>;
//   }

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {modules.map((mod) => (
//         <button
//           key={mod._id}
//           onClick={() => onSelectModule(mod._id)}
//           className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
//         >
//           <FaTasks className="text-gray-500 dark:text-gray-300 w-6 h-6" />
//           <span className="text-gray-800 dark:text-gray-100 font-medium">
//             {mod.name}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }



import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTasks, 
  FaSearch, 
  FaFilter, 
  FaArrowRight,
  FaBook,
  FaGraduationCap,
  FaLaptopCode,
  FaUserTie,
  FaChartLine,
  FaCertificate,
  FaClock,
  FaUsers,
  FaPlay,
  FaStar,
  FaBookOpen,
  FaBrain,
  FaTools
} from "react-icons/fa";
import { 
  HiCollection, 
  HiSearch, 
  HiFilter, 
  HiArrowRight,
  HiAcademicCap,
  HiBookOpen,
  HiCode,
  HiBriefcase,
  HiTrendingUp,
  HiBadgeCheck,
  HiClock,
  HiUsers,
  HiPlay,
  HiStar
} from "react-icons/hi";

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
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 300
    }
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 }
  }
};

const iconVariants = {
  hover: {
    rotate: [0, -5, 5, 0],
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: {
    width: "var(--progress-width)",
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

// Enhanced module data (in real app, this would come from API)
const enhanceModuleData = (module) => ({
  ...module,
  // Add some mock data for demonstration
  duration: `${Math.floor(Math.random() * 8) + 2} hours`,
  difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
  progress: Math.floor(Math.random() * 100),
  enrolledUsers: Math.floor(Math.random() * 500) + 20,
  rating: (Math.random() * 2 + 3).toFixed(1),
  materialsCount: Math.floor(Math.random() * 15) + 5,
  category: ["Technical", "Leadership", "Compliance", "Soft Skills", "Product Training"][Math.floor(Math.random() * 5)],
  isPopular: Math.random() > 0.7,
  isNew: Math.random() > 0.8,
  hasVideo: Math.random() > 0.5,
  hasCertificate: Math.random() > 0.6
});

export default function ModulesList({ modules, onSelectModule }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Enhanced modules with additional data
  const enhancedModules = useMemo(() => 
    modules ? modules.map(enhanceModuleData) : []
  , [modules]);

  // Filter modules
  const filteredModules = enhancedModules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "popular") return matchesSearch && module.isPopular;
    if (filterBy === "new") return matchesSearch && module.isNew;
    if (filterBy === "certificate") return matchesSearch && module.hasCertificate;
    
    return matchesSearch && module.difficulty.toLowerCase() === filterBy;
  });

  // Sort modules
  const sortedModules = [...filteredModules].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "popularity":
        return b.enrolledUsers - a.enrolledUsers;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const getModuleIcon = (category) => {
    switch (category) {
      case "Technical": return HiCode;
      case "Leadership": return HiBriefcase;
      case "Compliance": return HiBadgeCheck;
      case "Soft Skills": return HiUsers;
      case "Product Training": return HiAcademicCap;
      default: return HiCollection;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Technical": return "blue";
      case "Leadership": return "purple";
      case "Compliance": return "red";
      case "Soft Skills": return "green";
      case "Product Training": return "orange";
      default: return "gray";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "green";
      case "Intermediate": return "yellow";
      case "Advanced": return "red";
      default: return "gray";
    }
  };

  if (!modules || modules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <HiCollection className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No Training Modules Available
        </h3>
        <p className="text-gray-500 dark:text-gray-500 mb-6">
          This company doesn't have any training modules set up yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200">
            Contact Administrator
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            Browse Other Companies
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
            Choose Training Module
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a module to access training materials and start learning
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
              placeholder="Search modules by name or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all">All Modules</option>
              <option value="popular">Popular</option>
              <option value="new">New</option>
              <option value="certificate">With Certificate</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <HiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedModules.length} of {enhancedModules.length} training modules
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedModules.map((module, index) => {
            const ModuleIcon = getModuleIcon(module.category);
            const categoryColor = getCategoryColor(module.category);
            const difficultyColor = getDifficultyColor(module.difficulty);
            
            return (
              <motion.button
                key={module._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                layout
                onClick={() => onSelectModule(module._id)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-left overflow-hidden transition-all duration-200 hover:border-green-300 dark:hover:border-green-600"
              >
                {/* Badges */}
                {/* <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {module.isNew && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      New
                    </motion.div>
                  )}
                  {module.isPopular && (
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                      className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                    >
                      <HiStar className="text-xs" />
                      <span>Popular</span>
                    </motion.div>
                  )}
                </div> */}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`p-3 bg-${categoryColor}-100 dark:bg-${categoryColor}-900/20 rounded-xl`}
                  >
                    <ModuleIcon className={`text-${categoryColor}-600 dark:text-${categoryColor}-400 text-xl`} />
                  </motion.div>
                </div>

                {/* Module Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 line-clamp-2">
                      {module.name}
                    </h3>
                    {/* <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${categoryColor}-100 dark:bg-${categoryColor}-900/20 text-${categoryColor}-800 dark:text-${categoryColor}-300`}>
                        {module.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${difficultyColor}-100 dark:bg-${difficultyColor}-900/20 text-${difficultyColor}-800 dark:text-${difficultyColor}-300`}>
                        {module.difficulty}
                      </span>
                    </div> */}
                  </div>

                  {/* Module Stats */}
                  {/* <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <HiClock className="text-gray-400" />
                      <span>{module.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiUsers className="text-gray-400" />
                      <span>{module.enrolledUsers}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiStar className="text-yellow-400" />
                      <span>{module.rating}/5.0</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HiBookOpen className="text-gray-400" />
                      <span>{module.materialsCount} items</span>
                    </div>
                  </div> */}

                  {/* Progress Bar (if applicable) */}
                  {/* {module.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-green-500 h-2 rounded-full"
                          variants={progressVariants}
                          initial="hidden"
                          animate="visible"
                          style={{ "--progress-width": `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  )} */}

                  {/* Features */}
                  {/* <div className="flex items-center space-x-3">
                    {module.hasVideo && (
                      <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
                        <HiPlay className="text-xs" />
                        <span>Video</span>
                      </div>
                    )}
               
                  </div> */}
                </div>

                {/* Action Area */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">
                      Start Learning
                    </span>
                    <motion.div
                      className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors duration-200"
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiArrowRight className="text-green-600 dark:text-green-400 text-sm" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-green-50 dark:bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  initial={false}
                />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty Search Results */}
      {sortedModules.length === 0 && enhancedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiCollection className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No Modules Found
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterBy("all");
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
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
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {enhancedModules.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Modules
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {enhancedModules.filter(m => m.hasCertificate).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            With Certificate
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {new Set(enhancedModules.map(m => m.category)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Categories
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(enhancedModules.reduce((acc, m) => acc + parseFloat(m.rating), 0) / enhancedModules.length * 10) / 10 || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Avg Rating
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}