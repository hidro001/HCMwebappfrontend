// import React from "react";
// import { motion } from "framer-motion";
// import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
// import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import { FaSearch, FaExclamationCircle, FaEdit, FaTrash } from "react-icons/fa";

// const tableContainerVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, y: 5 },
//   visible: { opacity: 1, y: 0 },
// };

// // Loading skeleton
// function SkeletonTableRows({ rows = 5 }) {
//   return (
//     <>
//       {Array.from({ length: rows }).map((_, i) => (
//         <tr
//           key={i}
//           className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//         >
//           {Array.from({ length: 5 }).map((__, cellIdx) => (
//             <td key={cellIdx} className="py-4 px-6">
//               <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
//             </td>
//           ))}
//         </tr>
//       ))}
//     </>
//   );
// }

// const AllDisciplinaryActions = () => {
//   const {
//     disciplinaryActions,
//     fetchAllDisciplinaryActions,
//     updateDisciplinaryAction,
//     deleteDisciplinaryAction,
//     loading,
//   } = useDisciplinaryStore();

//   const [openModal, setOpenModal] = React.useState(false);
//   const [editingAction, setEditingAction] = React.useState(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
//   const [actionToDelete, setActionToDelete] = React.useState(null);
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [manualPage, setManualPage] = React.useState(1);
//   const itemsPerPage = 10;

//   React.useEffect(() => {
//     fetchAllDisciplinaryActions();
//   }, [fetchAllDisciplinaryActions]);

//   const handleEditClick = (action) => {
//     setEditingAction(action);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setEditingAction(null);
//   };

//   const handleUpdate = (data) => {
//     updateDisciplinaryAction(editingAction._id, data, () => {
//       handleCloseModal();
//     });
//   };

//   const handleDeleteClick = (action) => {
//     setActionToDelete(action);
//     setOpenDeleteDialog(true);
//   };

//   const handleDeleteConfirm = () => {
//     if (actionToDelete) {
//       deleteDisciplinaryAction(actionToDelete._id);
//     }
//     setOpenDeleteDialog(false);
//     setActionToDelete(null);
//   };

//   const handleDeleteCancel = () => {
//     setOpenDeleteDialog(false);
//     setActionToDelete(null);
//   };

//   const filteredActions =
//     disciplinaryActions?.filter((action) => {
//       const user = action.userId || {};
//       const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
//       const empId = user.employee_Id?.toLowerCase() || "";
//       const actionType = action.actionType.toLowerCase();
//       const notes = action.notes.toLowerCase();
//       const query = searchQuery.toLowerCase();
//       return (
//         fullName.includes(query) ||
//         empId.includes(query) ||
//         actionType.includes(query) ||
//         notes.includes(query)
//       );
//     }) || [];

//   const totalActions = filteredActions.length;
//   const totalPages = Math.ceil(totalActions / itemsPerPage) || 1;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentActions = filteredActions.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const fromIndex = startIndex + 1;
//   const toIndex = Math.min(startIndex + itemsPerPage, totalActions);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//       setManualPage(newPage);
//     }
//   };

//   const handleGoToPage = () => {
//     const page = Number(manualPage);
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4 sm:p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
//           <FaExclamationCircle className="mr-3 text-indigo-500" />
//           All Disciplinary Actions
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">
//           Manage and review disciplinary actions across the organization
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative max-w-lg">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
//             <FaSearch />
//           </span>
//           <input
//             type="text"
//             placeholder="Search by user, action type, or notes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
//           />
//         </div>
//       </div>

//       {/* Disciplinary Actions Table */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
//         variants={tableContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white">
//               <tr className="text-sm font-medium">
//                 <th className="py-4 px-6">User</th>
//                 <th className="py-4 px-6">Action Type</th>
//                 <th className="py-4 px-6">Date</th>
//                 <th className="py-4 px-6">Notes</th>
//                 <th className="py-4 px-6">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <SkeletonTableRows rows={itemsPerPage} />
//               ) : currentActions.length > 0 ? (
//                 currentActions.map((action) => {
//                   const user = action.userId || {};
//                   return (
//                     <motion.tr
//                       key={action._id}
//                       variants={tableRowVariants}
//                       className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
//                     >
//                       <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">
//                         {`${user.first_Name} ${user.last_Name} (${user.employee_Id})`}
//                       </td>
//                       <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
//                         {action.actionType}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
//                         {new Date(action.date).toLocaleDateString()}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
//                         {action.notes}
//                       </td>
//                       <td className="py-4 px-6 flex space-x-2">
//                         <button
//                           onClick={() => handleEditClick(action)}
//                           className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
//                         >
//                           <FaEdit className="mr-1" />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(action)}
//                           className="flex items-center bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
//                         >
//                           <FaTrash className="mr-1" />
//                           Delete
//                         </button>
//                       </td>
//                     </motion.tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-12">
//                     <div className="flex flex-col items-center justify-center">
//                       <FaExclamationCircle className="text-4xl text-gray-400 dark:text-gray-500 mb-4" />
//                       <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
//                         No disciplinary actions found
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         Try adjusting your search criteria.
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && totalActions > 0 && (
//           <div className="flex flex-col sm:flex-row items-center justify-between p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
//             <div className="mb-4 sm:mb-0">
//               Showing {fromIndex} to {toIndex} of {totalActions} actions
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               <input
//                 type="number"
//                 value={manualPage}
//                 onChange={(e) => setManualPage(e.target.value)}
//                 className="w-16 p-1.5 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 min="1"
//                 max={totalPages}
//               />
//               <button
//                 onClick={handleGoToPage}
//                 className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
//               >
//                 Go
//               </button>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </motion.div>

//       {/* Edit Modal */}
//       <DisciplinaryActionFormModal
//         open={openModal}
//         onClose={handleCloseModal}
//         onSubmit={handleUpdate}
//         isEdit={true}
//         defaultValues={
//           editingAction
//             ? {
//                 actionType: editingAction.actionType,
//                 date: editingAction.date?.split("T")[0],
//                 notes: editingAction.notes,
//                 userId: editingAction.userId?._id,
//               }
//             : {}
//         }
//       />

//       {/* Delete Confirmation Dialog */}
//       <ConfirmationDialog
//         open={openDeleteDialog}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this disciplinary action?"
//         onConfirm={handleDeleteConfirm}
//         onCancel={handleDeleteCancel}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };

// export default AllDisciplinaryActions;



import React from "react";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { 
  FaSearch, 
  FaExclamationCircle, 
  FaEdit, 
  FaTrash, 
  FaTable, 
  FaTh,
  FaUser,
  FaCalendarAlt,
  FaStickyNote,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH
} from "react-icons/fa";
import { 
  HiViewGrid, 
  HiViewList,
  HiFilter,
  HiSortAscending
} from "react-icons/hi";

// Loading skeleton for table
function SkeletonTableRows({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700 animate-pulse"
        >
          {Array.from({ length: 5 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-4 px-6">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// Loading skeleton for cards
function SkeletonCards({ cards = 5 }) {
  return (
    <>
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-20 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

// Modern Pagination Component
const ModernPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage 
}) => {
  const [inputPage, setInputPage] = React.useState(currentPage);
  
  React.useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

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
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputPage(value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage);
    }
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-400 order-2 lg:order-1">
        Showing <span className="font-medium text-gray-900 dark:text-white">{startItem}</span> to{' '}
        <span className="font-medium text-gray-900 dark:text-white">{endItem}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-white">{totalItems}</span> results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2 order-1 lg:order-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FaChevronLeft className="w-3 h-3" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="hidden md:flex items-center gap-1">
          {getVisiblePages().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                  <FaEllipsisH className="w-3 h-3" />
                </span>
              );
            }
            
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Go to page input (mobile) */}
        <form onSubmit={handleInputSubmit} className="flex items-center gap-2 md:hidden">
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            className="w-16 px-2 py-2 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max={totalPages}
          />
          <button
            type="submit"
            className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go
          </button>
        </form>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const AllDisciplinaryActions = () => {
  const {
    disciplinaryActions,
    fetchAllDisciplinaryActions,
    updateDisciplinaryAction,
    deleteDisciplinaryAction,
    loading,
  } = useDisciplinaryStore();

  const [openModal, setOpenModal] = React.useState(false);
  const [editingAction, setEditingAction] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [actionToDelete, setActionToDelete] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState('auto'); // 'table', 'card', 'auto'
  const itemsPerPage = 10;

  // Determine current view based on screen size and user preference
  const [screenSize, setScreenSize] = React.useState('desktop');
  const [currentView, setCurrentView] = React.useState('table');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else {
        setScreenSize('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (viewMode === 'auto') {
      setCurrentView(screenSize === 'desktop' ? 'table' : 'card');
    } else {
      setCurrentView(viewMode);
    }
  }, [viewMode, screenSize]);

  React.useEffect(() => {
    fetchAllDisciplinaryActions();
  }, [fetchAllDisciplinaryActions]);

  const handleEditClick = (action) => {
    setEditingAction(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAction(null);
  };

  const handleUpdate = (data) => {
    updateDisciplinaryAction(editingAction._id, data, () => {
      handleCloseModal();
    });
  };

  const handleDeleteClick = (action) => {
    setActionToDelete(action);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (actionToDelete) {
      deleteDisciplinaryAction(actionToDelete._id);
    }
    setOpenDeleteDialog(false);
    setActionToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setActionToDelete(null);
  };

  const filteredActions =
    disciplinaryActions?.filter((action) => {
      const user = action.userId || {};
      const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
      const empId = user.employee_Id?.toLowerCase() || "";
      const actionType = action.actionType.toLowerCase();
      const notes = action.notes.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        fullName.includes(query) ||
        empId.includes(query) ||
        actionType.includes(query) ||
        notes.includes(query)
      );
    }) || [];

  const totalActions = filteredActions.length;
  const totalPages = Math.ceil(totalActions / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActions = filteredActions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Action Type Badge Component
  const ActionTypeBadge = ({ type }) => {
    const getBadgeStyle = (actionType) => {
      const lower = actionType.toLowerCase();
      if (lower.includes('warning')) {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      } else if (lower.includes('suspension') || lower.includes('termination')) {
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      } else if (lower.includes('verbal')) {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      } else {
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle(type)}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaExclamationCircle className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              Disciplinary Actions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and review disciplinary actions across the organization
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <button
              onClick={() => setViewMode('auto')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'auto'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <HiFilter className="w-4 h-4" />
              Auto
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'table'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <HiViewList className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'card'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <HiViewGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by user, action type, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {currentView === 'table' ? (
          // Table View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <SkeletonTableRows rows={itemsPerPage} />
                ) : currentActions.length > 0 ? (
                  currentActions.map((action) => {
                    const user = action.userId || {};
                    return (
                      <tr
                        key={action._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {`${user.first_Name} ${user.last_Name}`}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.employee_Id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ActionTypeBadge type={action.actionType} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {new Date(action.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                            {action.notes}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(action)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                            >
                              <FaEdit className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(action)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                            >
                              <FaTrash className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <FaExclamationCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No disciplinary actions found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Try adjusting your search criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // Card View
          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <SkeletonCards cards={itemsPerPage} />
              </div>
            ) : currentActions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentActions.map((action) => {
                  const user = action.userId || {};
                  return (
                    <div
                      key={action._id}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 p-6 group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {`${user.first_Name} ${user.last_Name}`}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.employee_Id}
                            </p>
                          </div>
                        </div>
                        <ActionTypeBadge type={action.actionType} />
                      </div>

                      {/* Content */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                          {new Date(action.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaStickyNote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="line-clamp-3">{action.notes}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => handleEditClick(action)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                        >
                          <FaEdit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(action)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                        >
                          <FaTrash className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No disciplinary actions found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modern Pagination */}
        {!loading && totalActions > 0 && (
          <ModernPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalActions}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* Edit Modal */}
      <DisciplinaryActionFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleUpdate}
        isEdit={true}
        defaultValues={
          editingAction
            ? {
                actionType: editingAction.actionType,
                date: editingAction.date?.split("T")[0],
                notes: editingAction.notes,
                userId: editingAction.userId?._id,
              }
            : {}
        }
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={openDeleteDialog}
        title="Delete Disciplinary Action"
        message={`Are you sure you want to delete this disciplinary action? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        destructive={true}
      />
    </div>
  );
};

export default AllDisciplinaryActions;