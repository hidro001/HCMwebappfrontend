// import React from "react";
// import { FaBuilding } from "react-icons/fa";

// export default function CompaniesList({ companies, onSelectCompany }) {
//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {companies.map((company) => (
//         <button
//           key={company._id}
//           onClick={() => onSelectCompany(company._id)}
//           className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
//         >
//           <FaBuilding className="text-gray-500 dark:text-gray-300 w-6 h-6" />
//           <span className="text-gray-800 dark:text-gray-100 font-medium">
//             {company.name}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBuilding, 
  FaSearch, 
  FaFilter, 
  FaArrowRight,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaStar
} from "react-icons/fa";
import { 
  HiOfficeBuilding, 
  HiSearch, 
  HiFilter, 
  HiArrowRight,
  HiLocationMarker,
  HiGlobe,
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
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 300
    }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const iconVariants = {
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const arrowVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Sample company data enhancement (in real app, this would come from props/API)
const enhanceCompanyData = (company) => ({
  ...company,
  // Add some mock data for demonstration
  employeeCount: Math.floor(Math.random() * 1000) + 50,
  location: ["New York", "London", "Tokyo", "Berlin", "Sydney"][Math.floor(Math.random() * 5)],
  industry: ["Technology", "Finance", "Healthcare", "Education", "Manufacturing"][Math.floor(Math.random() * 5)],
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
  isPopular: Math.random() > 0.7
});

export default function CompaniesList({ companies, onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Enhanced companies with additional data
  const enhancedCompanies = companies.map(enhanceCompanyData);

  // Filter companies based on search
  const filteredCompanies = enhancedCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "employees":
        return b.employeeCount - a.employeeCount;
      default:
        return 0;
    }
  });

  const getCompanyIcon = (industry) => {
    switch (industry) {
      case "Technology": return HiGlobe;
      case "Finance": return FaBuilding;
      case "Healthcare": return FaUsers;
      case "Education": return HiOfficeBuilding;
      default: return HiOfficeBuilding;
    }
  };

  const getIndustryColor = (industry) => {
    switch (industry) {
      case "Technology": return "blue";
      case "Finance": return "green";
      case "Healthcare": return "red";
      case "Education": return "purple";
      case "Manufacturing": return "orange";
      default: return "gray";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 "
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Process
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a company to access their training modules and materials
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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies, industries, or locations..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="employees">Sort by Size</option>
            </select>
            <HiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedCompanies.length} of {companies.length} companies
        </div>
      </motion.div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedCompanies.map((company, index) => {
            const CompanyIcon = getCompanyIcon(company.industry);
            const industryColor = getIndustryColor(company.industry);
            
            return (
              <motion.button
                key={company._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                layout
                onClick={() => onSelectCompany(company._id)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-left overflow-hidden transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {/* Popular Badge */}
                {company.isPopular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                  >
                    <HiStar className="text-xs" />
                    <span>Popular</span>
                  </motion.div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`p-3 bg-${industryColor}-100 dark:bg-${industryColor}-900/20 rounded-xl`}
                  >
                    <CompanyIcon className={`text-${industryColor}-600 dark:text-${industryColor}-400 text-xl`} />
                  </motion.div>
                  
                  <motion.div
                    variants={arrowVariants}
                    whileHover="hover"
                    className="text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
                  >
                    <HiArrowRight className="text-lg" />
                  </motion.div>
                </div>

                {/* Company Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {company.name}
                    </h3>
                    {/* <p className={`text-sm font-medium text-${industryColor}-600 dark:text-${industryColor}-400`}>
                      {company.industry}
                    </p> */}
                  </div>

                  {/* Company Details */}
                  {/* <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <HiLocationMarker className="text-gray-400" />
                      <span>{company.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <FaUsers className="text-gray-400" />
                      <span>{company.employeeCount.toLocaleString()} employees</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <HiStar className="text-yellow-400" />
                      <span>{company.rating}/5.0 rating</span>
                    </div>
                  </div> */}
                </div>

                {/* Action Area */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                      View Training Modules
                    </span>
                    <motion.div
                      className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiArrowRight className="text-blue-600 dark:text-blue-400 text-sm" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  initial={false}
                />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedCompanies.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiOfficeBuilding className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No Companies Found
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Clear Search
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
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {companies.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Companies
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {enhancedCompanies.filter(c => c.isPopular).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Popular
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {new Set(enhancedCompanies.map(c => c.industry)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Industries
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {new Set(enhancedCompanies.map(c => c.location)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Locations
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}