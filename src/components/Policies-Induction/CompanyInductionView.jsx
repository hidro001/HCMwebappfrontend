// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { FiPlus, FiDownload, FiTrash } from "react-icons/fi";
// import useInductionPPTStore from "../../store/useInductionPPTStore";

// export default function CompanyInductionView() {
//   // Use the induction PPT store
//   const { pptList, fetchPPTsUser,  } =
//     useInductionPPTStore();

//   useEffect(() => {
//     fetchPPTsUser();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           All Induction PPT&apos;s
//         </h1>
//       </div>

//       {/* Grid of PPT cards */}
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
//                 {item.department && item.allDepartment===false ? item.department : "All Departments"}
//               </p>
//               <div className="flex justify-between">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
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
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
  FiDownload, 
  FiGrid, 
  FiList, 
  FiMonitor, 
  FiSmartphone,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiCalendar,
  FiUsers,
  FiFile,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from "react-icons/fi";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import useInductionPPTStore from "../../store/useInductionPPTStore";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function CompanyInductionView() {
  const { pptList, fetchPPTsUser } = useInductionPPTStore();
  
  // State management
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'table', 'card'
  const [currentView, setCurrentView] = useState('card'); // actual current view
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPPT, setSelectedPPT] = useState(null);
  
  // Screen size detection for auto mode
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    fetchPPTsUser();
  }, []);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('desktop');
      } else {
        setScreenSize('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto toggle logic
  useEffect(() => {
    if (viewMode === 'auto') {
      setCurrentView(screenSize === 'desktop' ? 'table' : 'card');
    } else {
      setCurrentView(viewMode);
    }
  }, [viewMode, screenSize]);

  // Filter and search logic
  const filteredPPTs = pptList.filter(ppt => {
    const matchesSearch = ppt.pptName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || 
      (filterDepartment === 'allDepts' && ppt.allDepartment) ||
      ppt.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPPTs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPPTs = filteredPPTs.slice(startIndex, startIndex + itemsPerPage);

  // Get unique departments
  const departments = [...new Set(pptList.map(ppt => ppt.department).filter(Boolean))];

  // Pagination component
  const PaginationControls = () => {
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); 
           i <= Math.min(totalPages - 1, currentPage + delta); 
           i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-8 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <span>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPPTs.length)} of {filteredPPTs.length} results
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* First page */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronsLeft className="w-4 h-4" />
          </button>
          
          {/* Previous page */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : page === '...'
                  ? 'border-transparent text-gray-400 cursor-default'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next page */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
          
          {/* Last page */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronsRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    );
  };

  // Card View Component
  const PPTCard = ({ ppt }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={ppt.coverImage}
          alt={ppt.pptName}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.35em' font-family='sans-serif' font-size='14' fill='%236b7280'%3EPPT%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {ppt.pptName}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <FiUsers className="w-4 h-4 mr-2" />
          <span>{ppt.allDepartment ? "All Departments" : ppt.department}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
            <FiCalendar className="w-3 h-3 mr-1" />
            <span>{new Date(ppt.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
          
          <button
            onClick={() => window.open(ppt.fileUrl, '_blank')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            View PPT
          </button>
        </div>
      </div>
    </div>
  );

  // Table View Component
  const PPTTable = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                PPT Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedPPTs.map((ppt, index) => (
              <tr 
                key={ppt._id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        src={ppt.coverImage}
                        alt={ppt.pptName}
                        className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6' rx='6'/%3E%3Ctext x='24' y='24' text-anchor='middle' dy='.35em' font-family='sans-serif' font-size='8' fill='%236b7280'%3EPPT%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {ppt.pptName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiFile className="w-3 h-3 mr-1" />
                        PowerPoint Presentation
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ppt.allDepartment 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      <FiUsers className="w-3 h-3 mr-1" />
                      {ppt.allDepartment ? "All Departments" : ppt.department}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {new Date(ppt.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => window.open(ppt.fileUrl, '_blank')}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FiDownload className="w-4 h-4 mr-1.5" />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Induction PPT Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Access and manage company induction presentations
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPPTs.length} presentations
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-6 space-y-4">
          {/* Search and Filter Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search presentations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none min-w-[200px]"
              >
                <option value="all">All Departments</option>
                <option value="allDepts">Universal Access</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('auto')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    viewMode === 'auto'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FiSmartphone className="w-4 h-4 mr-2" />
                  Auto
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <HiOutlineViewList className="w-4 h-4 mr-2" />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    viewMode === 'card'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <HiOutlineViewGrid className="w-4 h-4 mr-2" />
                  Cards
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FiMonitor className="w-4 h-4 mr-2" />
              Current: {currentView === 'table' ? 'Table View' : 'Card View'}
              {viewMode === 'auto' && (
                <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md text-xs">
                  Auto
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          {filteredPPTs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FiFile className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No presentations found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm || filterDepartment !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "No induction presentations are currently available"
                }
              </p>
            </div>
          ) : currentView === 'table' ? (
            <PPTTable />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedPPTs.map((ppt) => (
                <PPTCard key={ppt._id} ppt={ppt} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <PaginationControls />

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={showDeleteDialog}
          title="Delete Presentation"
          message={`Are you sure you want to delete "${selectedPPT?.pptName}"? This action cannot be undone.`}
          onConfirm={() => {
            // Handle delete logic here
            setShowDeleteDialog(false);
            setSelectedPPT(null);
            toast.success('Presentation deleted successfully');
          }}
          onCancel={() => {
            setShowDeleteDialog(false);
            setSelectedPPT(null);
          }}
          type="danger"
          confirmText="Delete"
          destructive={true}
        />
      </div>
    </div>
  );
}