
// import React, { useState, useEffect } from "react";
// import usePolicyStore from "../../store/usePolicyStore";
// import useCategoryStore from "../../store/useCategoryStore";

// export default function CompanyPoliciesView() {
//   const [selectedTab, setSelectedTab] = useState("All");

//   // Fetch policies and categories from Zustand stores
//   const { policies, fetchPolicies } = usePolicyStore();
//   const { categories, fetchCategories } = useCategoryStore();

//   useEffect(() => {
//     fetchPolicies();
//     fetchCategories();
//   }, [fetchPolicies, fetchCategories]);

//   // Build dynamic TABS: Prepend "All" to the list of category names.
//   const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

//   // Filter policies by the selected category
//   const filteredPolicies =
//     selectedTab === "All"
//       ? policies
//       : policies.filter((item) => item.category === selectedTab);

//   return (
//     <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
//       {/* Tabs for filtering */}
//       <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
//         {dynamicTabs.map((tab) => (
//           <button
//             key={tab}
//             className={`py-1 px-3 whitespace-nowrap focus:outline-none ${
//               selectedTab === tab
//                 ? "border-b-2 border-blue-600 dark:border-blue-500 font-semibold"
//                 : "text-gray-600 dark:text-gray-400"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Policy Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredPolicies.map((policy) => (
//           <div
//             key={policy._id || policy.id}
//             className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
//           >
//             {policy.coverImage && (
//               <img
//                 src={policy.coverImage}
//                 alt={policy.title}
//                 className="w-full h-40 object-cover"
//               />
//             )}
//             <div className="p-4">
//               <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//                 {policy.title}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {policy.category}
//                  {/* | {policy.department} */}
//               </p>
//               <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                 {policy.description}
//               </p>
//               {policy.pdfUrl && (
//                 <div className="mt-4">
//                   <button
//                     onClick={() => window.open(policy.pdfUrl, "_blank")}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//                   >
//                     View Policy Document
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import usePolicyStore from "../../store/usePolicyStore";
import useCategoryStore from "../../store/useCategoryStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { 
  FiGrid, 
  FiList, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiEye,
  FiCalendar,
  FiUser,
  FiTag,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal
} from "react-icons/fi";
import { 
  HiOutlineDocumentText, 
  HiOutlineExternalLink,
  HiOutlineClock,
  HiOutlineOfficeBuilding
} from "react-icons/hi";

export default function CompanyPoliciesView() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [viewMode, setViewMode] = useState("auto"); // auto, grid, table
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Fetch policies and categories from Zustand stores
  const { policies, fetchPolicies } = usePolicyStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchPolicies();
    fetchCategories();
  }, [fetchPolicies, fetchCategories]);

  // Determine actual view mode based on screen size and user preference
  const [screenSize, setScreenSize] = useState('desktop');
  
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('desktop');
      } else {
        setScreenSize('mobile');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const actualViewMode = useMemo(() => {
    if (viewMode === "auto") {
      return screenSize === 'desktop' ? 'table' : 'grid';
    }
    return viewMode;
  }, [viewMode, screenSize]);

  // Build dynamic TABS: Prepend "All" to the list of category names.
  const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

  // Filter and sort policies
  const filteredAndSortedPolicies = useMemo(() => {
    let filtered = selectedTab === "All" 
      ? policies 
      : policies.filter((item) => item.category === selectedTab);

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(policy => 
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy] || "";
      let bVal = b[sortBy] || "";
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [policies, selectedTab, searchQuery, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPolicies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPolicies = filteredAndSortedPolicies.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery]);

  const handleViewPolicy = (policy) => {
    if (policy.pdfUrl) {
      window.open(policy.pdfUrl, "_blank");
    } else {
      setSelectedPolicy(policy);
      setShowConfirmDialog(true);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>
    );

    // First page + ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-400 dark:text-gray-500">
            <FiMoreHorizontal className="w-4 h-4" />
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
            i === currentPage
              ? "bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 py-2 text-gray-400 dark:text-gray-500">
            <FiMoreHorizontal className="w-4 h-4" />
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    );

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        {pages}
      </div>
    );
  };

  const renderTableView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Policy
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {paginatedPolicies.map((policy) => (
              <tr 
                key={policy._id || policy.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {policy.coverImage ? (
                      <img
                        src={policy.coverImage}
                        alt={policy.title}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <HiOutlineDocumentText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <HiOutlineClock className="w-3 h-3" />
                        <span>Updated recently</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    <FiTag className="w-3 h-3 mr-1" />
                    {policy.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {policy.description}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewPolicy(policy)}
                      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-110"
                      title="View Policy"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    {policy.pdfUrl && (
                      <button
                        onClick={() => window.open(policy.pdfUrl, "_blank")}
                        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 transform hover:scale-110"
                        title="Download PDF"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {paginatedPolicies.map((policy) => (
        <div
          key={policy._id || policy.id}
          className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
        >
          {policy.coverImage ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={policy.coverImage}
                alt={policy.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/20 flex items-center justify-center">
              <HiOutlineDocumentText className="w-16 h-16 text-blue-400 dark:text-blue-500" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                <FiTag className="w-3 h-3 mr-1" />
                {policy.category}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <HiOutlineClock className="w-3 h-3" />
                <span>Recent</span>
              </div>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
              {policy.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {policy.description}
            </p>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewPolicy(policy)}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <FiEye className="w-4 h-4" />
                <span>View Policy</span>
              </button>
              
              {policy.pdfUrl && (
                <button
                  onClick={() => window.open(policy.pdfUrl, "_blank")}
                  className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 transform hover:scale-105"
                  title="Download PDF"
                >
                  <FiDownload className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Company Policies
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and access all company policies and documents
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("auto")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "auto"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="Auto View"
                >
                  <FiFilter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="Grid View"
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="Table View"
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {dynamicTabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  selectedTab === tab
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedPolicies.length)} of {filteredAndSortedPolicies.length} policies
          </p>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {paginatedPolicies.length === 0 ? (
          <div className="text-center py-16">
            <FiFileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No policies found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchQuery ? "Try adjusting your search terms" : "No policies available for this category"}
            </p>
          </div>
        ) : (
          <>
            {actualViewMode === 'table' ? renderTableView() : renderGridView()}
            {totalPages > 1 && renderPagination()}
          </>
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={showConfirmDialog}
          title="Policy Document"
          message={`Would you like to view the policy document for "${selectedPolicy?.title}"?`}
          onConfirm={() => {
            if (selectedPolicy?.pdfUrl) {
              window.open(selectedPolicy.pdfUrl, "_blank");
            }
            setShowConfirmDialog(false);
            setSelectedPolicy(null);
          }}
          onCancel={() => {
            setShowConfirmDialog(false);
            setSelectedPolicy(null);
          }}
          confirmText="View Document"
          cancelText="Cancel"
          type="info"
          icon={HiOutlineDocumentText}
        />
      </div>
    </div>
  );
}