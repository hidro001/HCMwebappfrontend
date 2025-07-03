// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
// import BreakSettingsModal from "./model/BreakSettingsModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import useBreakSettingsStore from "../../../store/breakSettingsStore.";
// import UsageCategorizer from "./UsageCategorizer";

// export default function BreakSettings() {
//   const {
//     breakRecords,
//     loading,
//     fetchBreakRecords,
//     addBreakRecord,
//     updateBreakRecord,
//     deleteBreakRecord,
//   } = useBreakSettingsStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [breakType, setBreakType] = useState("");
//   const [breakDuration, setBreakDuration] = useState("");
//   const [autoBreakStart, setAutoBreakStart] = useState("");
//   const [detectionType, setDetectionType] = useState("Face Detection");
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     fetchBreakRecords();
//   }, [fetchBreakRecords]);

//   const handleAddBreakSettings = () => {
//     setEditingItem(null);
//     setBreakType("");
//     setBreakDuration("");
//     setAutoBreakStart("");
//     setDetectionType("Face Detection");
//     setIsModalOpen(true);
//   };

//   const handleEdit = (id) => {
//     const itemToEdit = breakRecords.find((item) => item._id === id);
//     if (itemToEdit) {
//       setEditingItem(itemToEdit);
//       setBreakType(itemToEdit.breakType);
//       setBreakDuration(itemToEdit.breakHours.toString());
//       setAutoBreakStart(itemToEdit.autoBreakMinutes.toString());
//       setDetectionType(itemToEdit.detectionType);
//       setIsModalOpen(true);
//     }
//   };

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     if (deleteId) {
//       deleteBreakRecord(deleteId);
//     }
//     setDeleteDialogOpen(false);
//     setDeleteId(null);
//   };

//   const handleDeleteCancel = () => {
//     setDeleteDialogOpen(false);
//     setDeleteId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       breakType,
//       breakHours: parseFloat(breakDuration) || 0,
//       autoBreakMinutes: parseFloat(autoBreakStart) || 0,
//       detectionType,
//     };
//     if (editingItem) {
//       updateBreakRecord(editingItem._id, payload);
//     } else {
//       addBreakRecord(payload);
//     }
//     setIsModalOpen(false);
//     setEditingItem(null);
//     setBreakType("");
//     setBreakDuration("");
//     setAutoBreakStart("");
//     setDetectionType("Face Detection");
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 p-8">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Break Settings
//         </h1>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//           onClick={handleAddBreakSettings}
//         >
//           <FiPlus className="mr-2" />
//           Add Break Settings
//         </motion.button>
//       </div>
//       <div className="overflow-x-auto rounded-lg shadow-2xl">
//         <table className="w-full text-left whitespace-nowrap">
//           <thead className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
//             <tr>
//               <th className="px-4 py-3">S.L</th>
//               <th className="px-4 py-3">Break Type</th>
//               <th className="px-4 py-3">Break Hours</th>
//               <th className="px-4 py-3">Auto Break (Min)</th>
//               <th className="px-4 py-3">Detection Type</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800">
//             {loading ? (
//               // Render 5 skeleton rows while loading
//               Array.from({ length: 5 }).map((_, index) => (
//                 <tr key={index} className="animate-pulse">
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               // Render actual break records once loaded
//               breakRecords.map((item, index) => (
//                 <tr
//                   key={item._id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   <td className="px-4 py-3">
//                     {String(index + 1).padStart(2, "0")}
//                   </td>
//                   <td className="px-4 py-3">{item.breakType}</td>
//                   <td className="px-4 py-3">{item.breakHours} Hours</td>
//                   <td className="px-4 py-3">{item.autoBreakMinutes} Min</td>
//                   <td className="px-4 py-3">{item.detectionType}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-2">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         onClick={() => handleEdit(item._id)}
//                         className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-all"
//                       >
//                         <FiEdit />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         onClick={() => confirmDelete(item._id)}
//                         className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-all"
//                       >
//                         <FiTrash2 />
//                       </motion.button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <BreakSettingsModal
//         isOpen={isModalOpen}
//         editingItem={editingItem}
//         breakType={breakType}
//         setBreakType={setBreakType}
//         breakDuration={breakDuration}
//         setBreakDuration={setBreakDuration}
//         autoBreakStart={autoBreakStart}
//         setAutoBreakStart={setAutoBreakStart}
//         detectionType={detectionType}
//         setDetectionType={setDetectionType}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingItem(null);
//           setBreakType("");
//           setBreakDuration("");
//           setAutoBreakStart("");
//           setDetectionType("Face Detection");
//         }}
//         onSubmit={handleSubmit}
//       />
//       <ConfirmationDialog
//         open={deleteDialogOpen}
//         title="Delete Confirmation"
//         message="Are you sure you want to delete this break record?"
//         onConfirm={handleDeleteConfirm}
//         onCancel={handleDeleteCancel}
//         confirmText="Yes, delete it!"
//         cancelText="Cancel"
//       />
//       <UsageCategorizer />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiGrid, 
  FiList, 
  FiClock, 
  FiEye, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from "react-icons/fi";
import { 
  HiOutlineSparkles,
  HiOutlineAdjustments,
  HiOutlineClock
} from "react-icons/hi";
import BreakSettingsModal from "./model/BreakSettingsModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import useBreakSettingsStore from "../../../store/breakSettingsStore.";
import UsageCategorizer from "./UsageCategorizer";

export default function BreakSettings() {
  const {
    breakRecords,
    loading,
    fetchBreakRecords,
    addBreakRecord,
    updateBreakRecord,
    deleteBreakRecord,
  } = useBreakSettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [breakType, setBreakType] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [autoBreakStart, setAutoBreakStart] = useState("");
  const [detectionType, setDetectionType] = useState("Face Detection");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // New state for view management
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('breakSettings_viewMode');
    return saved || (window.innerWidth < 1024 ? 'card' : 'table');
  });
  const [autoToggle, setAutoToggle] = useState(() => {
    const saved = localStorage.getItem('breakSettings_autoToggle');
    return saved === 'true';
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate pagination
  const filteredRecords = breakRecords.filter(record => 
    record.breakType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.detectionType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  // Auto-toggle based on screen size
  useEffect(() => {
    if (autoToggle) {
      const handleResize = () => {
        const newViewMode = window.innerWidth < 1024 ? 'card' : 'table';
        setViewMode(newViewMode);
        localStorage.setItem('breakSettings_viewMode', newViewMode);
      };
      
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [autoToggle]);

  useEffect(() => {
    fetchBreakRecords();
  }, [fetchBreakRecords]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('breakSettings_viewMode', mode);
  };

  const handleAutoToggleChange = () => {
    const newAutoToggle = !autoToggle;
    setAutoToggle(newAutoToggle);
    localStorage.setItem('breakSettings_autoToggle', newAutoToggle.toString());
  };

  const handleAddBreakSettings = () => {
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const itemToEdit = breakRecords.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setBreakType(itemToEdit.breakType);
      setBreakDuration(itemToEdit.breakHours.toString());
      setAutoBreakStart(itemToEdit.autoBreakMinutes.toString());
      setDetectionType(itemToEdit.detectionType);
      setIsModalOpen(true);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteBreakRecord(deleteId);
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      breakType,
      breakHours: parseFloat(breakDuration) || 0,
      autoBreakMinutes: parseFloat(autoBreakStart) || 0,
      detectionType,
    };
    if (editingItem) {
      updateBreakRecord(editingItem._id, payload);
    } else {
      addBreakRecord(payload);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <span>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} results
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronsLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-1">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === number
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderSkeletonTable = () => (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">S.L</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Break Type</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Break Hours</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Auto Break</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Detection</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-6 py-4"><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
              <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
              <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
              <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
              <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
              <td className="px-6 py-4"><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSkeletonCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {loading ? renderSkeletonTable() : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">S.L</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Break Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Break Hours</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Auto Break</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Detection</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedRecords.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-3">
                        <HiOutlineSparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.breakType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <HiOutlineClock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.breakHours} Hours</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      {item.autoBreakMinutes} Min
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.detectionType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(item._id)}
                        className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && renderPagination()}
    </div>
  );

  const renderCardView = () => (
    <div className="space-y-6">
      {loading ? renderSkeletonCards() : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedRecords.map((item, index) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl mr-4">
                      <HiOutlineSparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.breakType}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">ID: {String(startIndex + index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HiOutlineClock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Break Duration</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.breakHours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Auto Break</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      {item.autoBreakMinutes} Min
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Detection Type</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.detectionType}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(item._id)}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!loading && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              {renderPagination()}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
              <HiOutlineAdjustments className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Break Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your break configurations and settings</p>
            </div>
          </div>
          
          <button
            onClick={handleAddBreakSettings}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add Break Settings
          </button>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search break settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
              <FiSettings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Auto Toggle:</label>
              <button
                onClick={handleAutoToggleChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoToggle ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoToggle ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleViewModeChange('table')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'table'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleViewModeChange('card')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'card'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'table' ? renderTableView() : renderCardView()}

        {/* Modals */}
        <BreakSettingsModal
          isOpen={isModalOpen}
          editingItem={editingItem}
          breakType={breakType}
          setBreakType={setBreakType}
          breakDuration={breakDuration}
          setBreakDuration={setBreakDuration}
          autoBreakStart={autoBreakStart}
          setAutoBreakStart={setAutoBreakStart}
          detectionType={detectionType}
          setDetectionType={setDetectionType}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
            setBreakType("");
            setBreakDuration("");
            setAutoBreakStart("");
            setDetectionType("Face Detection");
          }}
          onSubmit={handleSubmit}
        />
        
        <ConfirmationDialog
          open={deleteDialogOpen}
          title="Delete Break Setting"
          message="Are you sure you want to delete this break setting? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          destructive={true}
        />

        <UsageCategorizer />
      </div>
    </div>
  );
}