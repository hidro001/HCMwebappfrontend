// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaCalendarAlt, 
//   FaUsers, 
//   FaFileAlt, 
//   FaClock, 
//   FaCheckCircle, 
//   FaExclamationCircle,
//   FaEdit,
//   FaTrash,
//   FaToggleOn,
//   FaToggleOff,
//   FaSpinner,
//   FaPlus
// } from 'react-icons/fa';
// import LeaveType from "./models/LeaveTypeModel";
// import leaveTypeStore from "../../../store/leaveTypeStore";
// import ConfirmationDialog from "../../common/ConfirmationDialog.jsx"

// export default function LeavesTypes() {
//   const {
//     leaveTypes,
//     isLoading,
//     error,
//     fetchLeaveTypes,
//     deleteLeaveType,
//     toggleLeaveTypeStatus,
//     clearError
//   } = leaveTypeStore();

//   const [expandedLeave, setExpandedLeave] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingLeaveType, setEditingLeaveType] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(null);
//   const [isToggling, setIsToggling] = useState(null);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [leaveToDelete, setLeaveToDelete] = useState(null);

//   useEffect(() => {
//     fetchLeaveTypes();
//   }, [fetchLeaveTypes]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         clearError();
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, clearError]);

//   const handleAdd = () => {
//     setEditingLeaveType(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (leaveType) => {
//     setEditingLeaveType(leaveType);
//     setIsModalOpen(true);
//   };

 
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingLeaveType(null);
//     // Refresh the list after modal closes
//     fetchLeaveTypes();
//   };

//   const handleDelete = (id, name) => {
//     setLeaveToDelete({ id, name });
//     setOpenConfirm(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (leaveToDelete) {
//       setIsDeleting(leaveToDelete.id);
//       try {
//         const success = await deleteLeaveType(leaveToDelete.id);
//         if (success) {
//           await fetchLeaveTypes();
//           toast.success('Leave type deleted successfully');
//         }
//       } catch (error) {
//         console.error('Delete error:', error);
//       } finally {
//         setIsDeleting(null);
//         setOpenConfirm(false);
//         setLeaveToDelete(null);
//       }
//     }
//   };

//   const handleCancelDelete = () => {
//     setOpenConfirm(false);
//     setLeaveToDelete(null);
//   };

//   const handleToggleStatus = async (id, currentStatus, name) => {
//     setIsToggling(id);
//     try {
//       const result = await toggleLeaveTypeStatus(id);
//       if (result) {
//         await fetchLeaveTypes();
//         const action = currentStatus ? 'deactivated' : 'activated';
//         toast.success(`"${name}" has been ${action}`);
//       }
//     } catch (error) {
//       console.error('Toggle error:', error);
//     } finally {
//       setIsToggling(null);
//     }
//   };

//   const categories = [
//     { key: 'all', label: 'All Leave Types', count: leaveTypes.length },
//     { key: 'paid', label: 'Paid Leave', count: leaveTypes.filter(l => l.category === 'paid').length },
//     { key: 'unpaid', label: 'Unpaid Leave', count: leaveTypes.filter(l => l.category === 'unpaid').length },
//     { key: 'mixed', label: 'Mixed Benefits', count: leaveTypes.filter(l => l.category === 'mixed').length }
//   ];

//   const filteredLeaves = selectedCategory === 'all' 
//     ? leaveTypes 
//     : leaveTypes.filter(leave => leave.category === selectedCategory);

//   const toggleExpand = (leaveId) => {
//     setExpandedLeave(expandedLeave === leaveId ? null : leaveId);
//   };

//   const getCategoryColor = (category) => {
//     switch(category) {
//       case 'paid': return 'text-green-600 bg-green-100';
//       case 'unpaid': return 'text-red-600 bg-red-100';
//       case 'mixed': return 'text-blue-600 bg-blue-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getStatusColor = (isActive) => {
//     return isActive 
//       ? 'text-green-600 bg-green-100' 
//       : 'text-red-600 bg-red-100';
//   };

//   return (
//   <div className="bg-gray-50 dark:bg-gray-900 shadow rounded-xl p-6 transition-colors duration-300">
//     <div className="max-w-6xl mx-auto p-6 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
//               Leave Type Management
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
//               Comprehensive overview of all available leave types, policies, and requirements
//             </p>
//           </div>
//           <button
//             onClick={handleAdd}
//             disabled={isLoading}
//             className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:to-blue-500 transition-all duration-300 flex items-center gap-3 font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           >
//             <FaPlus className="w-4 h-4" />
//             Add Leave Type
//           </button>
//         </div>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm">
//           <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
//         </div>
//       )}

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex items-center justify-center py-16">
//           <div className="relative">
//             <FaSpinner className="w-10 h-10 animate-spin text-blue-500 dark:text-blue-400" />
//             <div className="absolute inset-0 w-10 h-10 border-2 border-blue-200 dark:border-blue-800 rounded-full animate-pulse"></div>
//           </div>
//           <span className="ml-4 text-gray-600 dark:text-gray-300 text-lg font-medium">Loading leave types...</span>
//         </div>
//       )}

//       {/* Category Filter */}
//       {!isLoading && (
//         <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
//           <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
//             <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
//             Filter by Category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {categories.map(category => (
//               <button
//                 key={category.key}
//                 onClick={() => setSelectedCategory(category.key)}
//                 className={`p-5 rounded-xl border-2 transition-all duration-300 group hover:scale-105 ${
//                   selectedCategory === category.key
//                     ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-lg'
//                     : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
//                 }`}
//               >
//                 <div className="text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
//                   {category.count}
//                 </div>
//                 <div className="text-sm font-medium">{category.label}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!isLoading && leaveTypes.length === 0 && (
//         <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700">
//           <div className="text-gray-400 dark:text-gray-500 mb-6 relative">
//             <FaFileAlt className="w-20 h-20 mx-auto opacity-50" />
//             <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-3">No Leave Types Found</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
//             Get started by creating your first leave type and begin managing your organization's leave policies.
//           </p>
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300 flex items-center gap-3 font-semibold mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//           >
//             <FaPlus className="w-5 h-5" />
//             Create First Leave Type
//           </button>
//         </div>
//       )}

//       {/* Leave Types Grid */}
//       {!isLoading && filteredLeaves.length > 0 && (
//         <div className="grid gap-8">
//           {filteredLeaves.map(leave => (
//             <div
//               key={leave._id}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl dark:hover:shadow-3xl border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
//             >
//               {/* Leave Header */}
//               <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div 
//                     className="flex items-center space-x-6 cursor-pointer flex-1 group-hover:scale-[1.02] transition-transform duration-300"
//                     onClick={() => toggleExpand(leave._id)}
//                   >
//                     <div className={`w-5 h-5 rounded-full ${leave.color} shadow-lg ring-4 ring-white dark:ring-gray-800`}></div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4 mb-2">
//                         <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{leave.name}</h3>
//                         <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(leave.isActive)} shadow-sm`}>
//                           {leave.isActive ? 'Active' : 'Inactive'}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{leave.description}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-6">
//                     <span className={`px-4 py-2 rounded-xl text-sm font-bold capitalize shadow-sm ${getCategoryColor(leave.category)}`}>
//                       {leave.category}
//                     </span>
//                     <div className="text-center bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600">
//                       <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">{leave.maxDays}</div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Max Days</div>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleToggleStatus(leave._id, leave.isActive, leave.name)}
//                         disabled={isToggling === leave._id}
//                         className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300 disabled:opacity-50 group/btn"
//                         title={leave.isActive ? 'Deactivate' : 'Activate'}
//                       >
//                         {isToggling === leave._id ? (
//                           <FaSpinner className="w-5 h-5 animate-spin" />
//                         ) : leave.isActive ? (
//                           <FaToggleOn className="w-6 h-6 text-green-500 dark:text-green-400 group-hover/btn:scale-110 transition-transform duration-300" />
//                         ) : (
//                           <FaToggleOff className="w-6 h-6 text-red-500 dark:text-red-400 group-hover/btn:scale-110 transition-transform duration-300" />
//                         )}
//                       </button>
                      
//                       <button
//                         onClick={() => handleEdit(leave._id)}
//                         className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300 group/btn"
//                         title="Edit"
//                       >
//                         <FaEdit className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
//                       </button>
                      
//                       <button
//                         onClick={() => handleDelete(leave._id, leave.name)}
//                         disabled={isDeleting === leave._id}
//                         className="p-3 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300 disabled:opacity-50 group/btn"
//                         title="Delete"
//                       >
//                         {isDeleting === leave._id ? (
//                           <FaSpinner className="w-5 h-5 animate-spin" />
//                         ) : (
//                           <FaTrash className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
//                         )}
//                       </button>
//                     </div>
                    
//                     <button 
//                       onClick={() => toggleExpand(leave._id)}
//                       className="p-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 group/btn"
//                     >
//                       {expandedLeave === leave._id ? (
//                         <FaChevronUp className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-300" />
//                       ) : (
//                         <FaChevronDown className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-300" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Expanded Details */}
//               {expandedLeave === leave._id && (
//                 <div className="border-t border-gray-200 dark:border-gray-600 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
//                   <div className="p-8">
//                     <div className="grid md:grid-cols-2 gap-10">
//                       {/* Left Column */}
//                       <div className="space-y-8">
//                         {/* Quick Info */}
//                         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
//                           <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center text-lg">
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
//                               <FaClock className="w-4 h-4 text-white" />
//                             </div>
//                             Quick Information
//                           </h4>
//                           <div className="space-y-4">
//                             <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                               <span className="text-gray-600 dark:text-gray-300 font-medium">Approver:</span>
//                               <span className="font-bold text-gray-800 dark:text-gray-100">{leave.approver}</span>
//                             </div>
//                             <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                               <span className="text-gray-600 dark:text-gray-300 font-medium">Advance Notice:</span>
//                               <span className="font-bold text-gray-800 dark:text-gray-100">{leave.advanceNotice}</span>
//                             </div>
//                             <div className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                               <span className="text-gray-600 dark:text-gray-300 font-medium">Documents:</span>
//                               <div className="text-right">
//                                 {leave.documentsRequired && leave.documentsRequired !== 'Not Required' ? (
//                                   <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium">
//                                     <FaFileAlt className="w-4 h-4 mr-2" />
//                                     <span className="text-sm">{leave.documentsRequired}</span>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
//                                     <FaCheckCircle className="w-4 h-4 mr-2" />
//                                     <span className="text-sm">Not Required</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Eligibility */}
//                         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
//                           <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center text-lg">
//                             <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
//                               <FaUsers className="w-4 h-4 text-white" />
//                             </div>
//                             Eligibility
//                           </h4>
//                           <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                             <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{leave.eligibility}</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right Column */}
//                       <div>
//                         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300 h-full">
//                           <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center text-lg">
//                             <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//                               <FaExclamationCircle className="w-4 h-4 text-white" />
//                             </div>
//                             Policies & Guidelines
//                           </h4>
//                           {leave.policies && leave.policies.length > 0 ? (
//                             <ul className="space-y-3">
//                               {leave.policies.map((policy, index) => (
//                                 <li key={index} className="flex items-start p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-300">
//                                   <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
//                                   <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">{policy}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           ) : (
//                             <div className="p-6 text-center bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
//                               <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No specific policies defined.</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* No Results for Filter */}
//       {!isLoading && leaveTypes.length > 0 && filteredLeaves.length === 0 && (
//         <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700">
//           <div className="text-gray-400 dark:text-gray-500 mb-6 relative">
//             <FaFileAlt className="w-20 h-20 mx-auto opacity-50" />
//             <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-3">No Leave Types Found</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
//             No leave types match the selected category "<span className="font-semibold text-blue-600 dark:text-blue-400">{categories.find(c => c.key === selectedCategory)?.label}</span>".
//           </p>
//           <button
//             onClick={() => setSelectedCategory('all')}
//             className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-lg hover:underline transition-all duration-300"
//           >
//             Show All Leave Types
//           </button>
//         </div>
//       )}

//       {/* Summary Footer */}
//       {!isLoading && filteredLeaves.length > 0 && (
//         <div className="mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-500 dark:via-purple-500 dark:to-blue-700 rounded-2xl p-8 text-white shadow-2xl border border-blue-300 dark:border-blue-600 relative overflow-hidden">
//           <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
//           <div className="relative flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
//               <p className="text-blue-100 dark:text-blue-200 text-lg leading-relaxed">
//                 Contact HR for personalized leave planning assistance
//               </p>
//             </div>
//             <div className="text-right bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
//               <div className="text-4xl font-bold mb-1">{filteredLeaves.length}</div>
//               <div className="text-blue-100 dark:text-blue-200 font-medium">
//                 {selectedCategory === 'all' ? 'Total' : 'Filtered'} Leave Types
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
    
//     {/* Modal */}
//     <LeaveType 
//       isOpen={isModalOpen} 
//       onClose={handleCloseModal}
//       editingLeaveType={editingLeaveType}
//     />

//     <ConfirmationDialog
//         open={openConfirm}
//         title="Confirm Deletion"
//         message="Do you want to delete this Leave Type?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Yes, delete it!"
//         cancelText="Cancel"
//       />
//   </div>
// );
// }

// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaCalendarAlt, 
//   FaUsers, 
//   FaFileAlt, 
//   FaClock, 
//   FaCheckCircle, 
//   FaExclamationCircle,
//   FaEdit,
//   FaTrash,
//   FaToggleOn,
//   FaToggleOff,
//   FaSpinner,
//   FaPlus,
//   FaSearch,
//   FaFilter,
//   FaUmbrellaBeach,
//   FaListAlt,
//   FaEye,
//   FaEyeSlash
// } from 'react-icons/fa';
// import {
//   HiCalendar,
//   HiPlus,
//   HiPencil,
//   HiTrash,
//   HiSearch,
//   HiFilter,
//   HiEye,
//   HiEyeOff
// } from 'react-icons/hi';
// import { LuToggleLeft } from 'react-icons/lu';
// import LeaveType from "./models/LeaveTypeModel";
// import leaveTypeStore from "../../../store/leaveTypeStore";
// import ConfirmationDialog from "../../common/ConfirmationDialog.jsx";

// export default function LeavesTypes() {
//   const {
//     leaveTypes,
//     isLoading,
//     error,
//     fetchLeaveTypes,
//     deleteLeaveType,
//     toggleLeaveTypeStatus,
//     clearError
//   } = leaveTypeStore();

//   const [expandedLeave, setExpandedLeave] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('table'); // table or grid (only affects desktop)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingLeaveType, setEditingLeaveType] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(null);
//   const [isToggling, setIsToggling] = useState(null);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [leaveToDelete, setLeaveToDelete] = useState(null);

//   useEffect(() => {
//     fetchLeaveTypes();
//   }, [fetchLeaveTypes]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         clearError();
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, clearError]);

//   const handleAdd = () => {
//     setEditingLeaveType(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (leaveType) => {
//     setEditingLeaveType(leaveType);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingLeaveType(null);
//     fetchLeaveTypes();
//   };

//   const handleDelete = (id, name) => {
//     setLeaveToDelete({ id, name });
//     setOpenConfirm(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (leaveToDelete) {
//       setIsDeleting(leaveToDelete.id);
//       try {
//         const success = await deleteLeaveType(leaveToDelete.id);
//         if (success) {
//           await fetchLeaveTypes();
//           toast.success('Leave type deleted successfully');
//         }
//       } catch (error) {
//         console.error('Delete error:', error);
//       } finally {
//         setIsDeleting(null);
//         setOpenConfirm(false);
//         setLeaveToDelete(null);
//       }
//     }
//   };

//   const handleCancelDelete = () => {
//     setOpenConfirm(false);
//     setLeaveToDelete(null);
//   };

//   const handleToggleStatus = async (id, currentStatus, name) => {
//     setIsToggling(id);
//     try {
//       const result = await toggleLeaveTypeStatus(id);
//       if (result) {
//         await fetchLeaveTypes();
//         const action = currentStatus ? 'deactivated' : 'activated';
//         toast.success(`"${name}" has been ${action}`);
//       }
//     } catch (error) {
//       console.error('Toggle error:', error);
//     } finally {
//       setIsToggling(null);
//     }
//   };

//   const categories = [
//     { key: 'all', label: 'All Leave Types', count: leaveTypes.length, color: 'blue' },
//     { key: 'paid', label: 'Paid Leave', count: leaveTypes.filter(l => l.category === 'paid').length, color: 'green' },
//     { key: 'unpaid', label: 'Unpaid Leave', count: leaveTypes.filter(l => l.category === 'unpaid').length, color: 'red' },
//     { key: 'mixed', label: 'Mixed Benefits', count: leaveTypes.filter(l => l.category === 'mixed').length, color: 'purple' }
//   ];

//   const filteredLeaves = leaveTypes.filter(leave => {
//     const matchesCategory = selectedCategory === 'all' || leave.category === selectedCategory;
//     const matchesSearch = leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          leave.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const toggleExpand = (leaveId) => {
//     setExpandedLeave(expandedLeave === leaveId ? null : leaveId);
//   };

//   const getCategoryColor = (category) => {
//     switch(category) {
//       case 'paid': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
//       case 'unpaid': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
//       case 'mixed': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20';
//       default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
//     }
//   };

//   const getStatusColor = (isActive) => {
//     return isActive 
//       ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' 
//       : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.3 }
//     },
//     hover: {
//       scale: 1.02,
//       y: -5,
//       boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       transition: { duration: 0.2 }
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
//     >
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <motion.div
//           variants={itemVariants}
//           className="text-center space-y-4"
//         >
//           <div className="flex items-center justify-center space-x-3">
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
//               <HiCalendar className="text-blue-600 dark:text-blue-400 text-2xl" />
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
//               Leave Types Management
//             </h1>
//           </div>
//           <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//             Configure and manage all available leave types, policies, and requirements for your organization
//           </p>
//         </motion.div>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
//           >
//             <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
//           </motion.div>
//         )}

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex items-center justify-center py-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//               <span className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading leave types...</span>
//             </div>
//           </div>
//         )}

//         {!isLoading && (
//           <>
//             {/* Stats Cards */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 md:grid-cols-4 gap-6"
//             >
//               {categories.map(category => (
//                 <motion.button
//                   key={category.key}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedCategory(category.key)}
//                   className={`p-6 rounded-xl border-2 transition-all duration-300 ${
//                     selectedCategory === category.key
//                       ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/20 text-${category.color}-600 dark:text-${category.color}-400 shadow-lg`
//                       : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="text-3xl font-bold mb-2">{category.count}</div>
//                   <div className="text-sm font-medium">{category.label}</div>
//                 </motion.button>
//               ))}
//             </motion.div>

//             {/* Controls Section */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//                 {/* Search */}
//                 <div className="relative flex-1 max-w-md">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <HiSearch className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search leave types..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   />
//                 </div>

//                 {/* Controls */}
//                 <div className="flex items-center space-x-4">
//                   {/* View Mode Toggle - Desktop Only */}
//                   <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//                     <button
//                       onClick={() => setViewMode("table")}
//                       className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                         viewMode === "table"
//                           ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                           : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                       }`}
//                     >
//                       Table
//                     </button>
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                         viewMode === "grid"
//                           ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                           : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                       }`}
//                     >
//                       Cards
//                     </button>
//                   </div>

//                   {/* Mobile/Tablet View Indicator */}
//                   <div className="lg:hidden text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
//                     Card View
//                   </div>

//                   {/* Add Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleAdd}
//                     disabled={isLoading}
//                     className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
//                   >
//                     <HiPlus className="text-lg" />
//                     <span className="hidden sm:inline">Add Leave Type</span>
//                     <span className="sm:hidden">Add</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Empty State */}
//             {leaveTypes.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
//               >
//                 <FaUmbrellaBeach className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                   No Leave Types Found
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-500 mb-6">
//                   Get started by creating your first leave type and begin managing your organization's leave policies
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleAdd}
//                   className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
//                 >
//                   <FaPlus />
//                   <span>Create First Leave Type</span>
//                 </motion.button>
//               </motion.div>
//             )}

//             {/* No Results for Filter */}
//             {leaveTypes.length > 0 && filteredLeaves.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
//               >
//                 <FaSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                   No Leave Types Found
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-500 mb-6">
//                   No leave types match your current search and filter criteria
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
//                   >
//                     Clear Search
//                   </button>
//                   <button
//                     onClick={() => setSelectedCategory('all')}
//                     className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
//                   >
//                     Show All Categories
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Leave Types Display */}
//             {filteredLeaves.length > 0 && (
//               <motion.div variants={itemVariants}>
//                 {/* Cards View - Always on Mobile/Tablet, Optional on Desktop */}
//                 <div className={`block lg:${viewMode === 'grid' ? 'block' : 'hidden'}`}>
//                   <div className="grid gap-6">
//                     <AnimatePresence>
//                       {filteredLeaves.map(leave => (
//                         <motion.div
//                           key={leave._id}
//                           variants={cardVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="hidden"
//                           whileHover="hover"
//                           className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//                         >
//                           {/* Leave Header */}
//                           <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
//                             <div className="flex items-center justify-between">
//                               <div 
//                                 className="flex items-center space-x-4 cursor-pointer flex-1"
//                                 onClick={() => toggleExpand(leave._id)}
//                               >
//                                 <div className={`w-4 h-4 rounded-full ${leave.color || 'bg-blue-500'} shadow-lg`}></div>
//                                 <div className="flex-1">
//                                   <div className="flex items-center gap-3 mb-2">
//                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">{leave.name}</h3>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(leave.isActive)}`}>
//                                       {leave.isActive ? 'Active' : 'Inactive'}
//                                     </span>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(leave.category)}`}>
//                                       {leave.category}
//                                     </span>
//                                   </div>
//                                   <p className="text-gray-600 dark:text-gray-300">{leave.description}</p>
//                                 </div>
//                               </div>
                              
//                               <div className="flex items-center space-x-4">
//                                 <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow border border-gray-200 dark:border-gray-600">
//                                   <div className="text-2xl font-bold text-gray-900 dark:text-white">{leave.maxDays}</div>
//                                   <div className="text-xs text-gray-500 dark:text-gray-400">Max Days</div>
//                                 </div>
                                
//                                 {/* Action Buttons */}
//                                 <div className="flex items-center gap-2">
//                                   <motion.button
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     onClick={() => handleToggleStatus(leave._id, leave.isActive, leave.name)}
//                                     disabled={isToggling === leave._id}
//                                     className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                     title={leave.isActive ? 'Deactivate' : 'Activate'}
//                                   >
//                                     {isToggling === leave._id ? (
//                                       <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                                     ) : leave.isActive ? (
//                                       <HiEye className="w-5 h-5 text-green-500" />
//                                     ) : (
//                                       <HiEyeOff className="w-5 h-5 text-red-500" />
//                                     )}
//                                   </motion.button>
                                  
//                                   <motion.button
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     onClick={() => handleEdit(leave._id)}
//                                     className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                     title="Edit"
//                                   >
//                                     <HiPencil className="w-5 h-5" />
//                                   </motion.button>
                                  
//                                   <motion.button
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     onClick={() => handleDelete(leave._id, leave.name)}
//                                     disabled={isDeleting === leave._id}
//                                     className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
//                                     title="Delete"
//                                   >
//                                     {isDeleting === leave._id ? (
//                                       <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
//                                     ) : (
//                                       <HiTrash className="w-5 h-5" />
//                                     )}
//                                   </motion.button>
//                                 </div>
                                
//                                 <motion.button 
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   onClick={() => toggleExpand(leave._id)}
//                                   className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//                                 >
//                                   {expandedLeave === leave._id ? (
//                                     <FaChevronUp className="w-5 h-5" />
//                                   ) : (
//                                     <FaChevronDown className="w-5 h-5" />
//                                   )}
//                                 </motion.button>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Expanded Details */}
//                           <AnimatePresence>
//                             {expandedLeave === leave._id && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="overflow-hidden"
//                               >
//                                 <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
//                                   <div className="grid md:grid-cols-2 gap-6">
//                                     {/* Left Column */}
//                                     <div className="space-y-6">
//                                       {/* Quick Info */}
//                                       <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
//                                         <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
//                                           <FaClock className="w-4 h-4 text-blue-500 mr-2" />
//                                           Quick Information
//                                         </h4>
//                                         <div className="space-y-3">
//                                           <div className="flex justify-between items-center">
//                                             <span className="text-gray-600 dark:text-gray-400">Approver:</span>
//                                             <span className="font-medium text-gray-900 dark:text-white">{leave.approver}</span>
//                                           </div>
//                                           <div className="flex justify-between items-center">
//                                             <span className="text-gray-600 dark:text-gray-400">Advance Notice:</span>
//                                             <span className="font-medium text-gray-900 dark:text-white">{leave.advanceNotice}</span>
//                                           </div>
//                                           <div className="flex justify-between items-center">
//                                             <span className="text-gray-600 dark:text-gray-400">Documents:</span>
//                                             <div className="flex items-center">
//                                               {leave.documentsRequired && leave.documentsRequired !== 'Not Required' ? (
//                                                 <>
//                                                   <FaFileAlt className="w-4 h-4 text-orange-500 mr-1" />
//                                                   <span className="text-sm text-orange-600 dark:text-orange-400">{leave.documentsRequired}</span>
//                                                 </>
//                                               ) : (
//                                                 <>
//                                                   <FaCheckCircle className="w-4 h-4 text-green-500 mr-1" />
//                                                   <span className="text-sm text-green-600 dark:text-green-400">Not Required</span>
//                                                 </>
//                                               )}
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>

//                                       {/* Eligibility */}
//                                       <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
//                                         <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
//                                           <FaUsers className="w-4 h-4 text-green-500 mr-2" />
//                                           Eligibility
//                                         </h4>
//                                         <p className="text-gray-700 dark:text-gray-300">{leave.eligibility}</p>
//                                       </div>
//                                     </div>

//                                     {/* Right Column */}
//                                     <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
//                                       <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
//                                         <FaExclamationCircle className="w-4 h-4 text-purple-500 mr-2" />
//                                         Policies & Guidelines
//                                       </h4>
//                                       {leave.policies && leave.policies.length > 0 ? (
//                                         <ul className="space-y-2">
//                                           {leave.policies.map((policy, index) => (
//                                             <li key={index} className="flex items-start">
//                                               <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                                               <span className="text-gray-700 dark:text-gray-300 text-sm">{policy}</span>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       ) : (
//                                         <p className="text-gray-500 dark:text-gray-400 text-sm">No specific policies defined.</p>
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>

//                 {/* Table View - Desktop Only when Table mode is selected */}
//                 <div className={`hidden lg:${viewMode === 'table' ? 'block' : 'hidden'}`}>
//                   <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                         <thead className="bg-gray-50 dark:bg-gray-700">
//                           <tr>
//                             <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                               Leave Type
//                             </th>
//                             <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                               Category
//                             </th>
//                             <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                               Max Days
//                             </th>
//                             <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                               Status
//                             </th>
//                             <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                           <AnimatePresence>
//                             {filteredLeaves.map((leave) => (
//                               <motion.tr
//                                 key={leave._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
//                               >
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center space-x-3">
//                                     <div className={`w-3 h-3 rounded-full ${leave.color || 'bg-blue-500'}`}></div>
//                                     <div>
//                                       <div className="text-sm font-medium text-gray-900 dark:text-white">
//                                         {leave.name}
//                                       </div>
//                                       <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
//                                         {leave.description}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(leave.category)}`}>
//                                     {leave.category}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                                   {leave.maxDays}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(leave.isActive)}`}>
//                                     {leave.isActive ? 'Active' : 'Inactive'}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                   <div className="flex items-center justify-end space-x-2">
//                                     <motion.button
//                                       whileHover={{ scale: 1.1 }}
//                                       whileTap={{ scale: 0.9 }}
//                                       onClick={() => handleToggleStatus(leave._id, leave.isActive, leave.name)}
//                                       disabled={isToggling === leave._id}
//                                       className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                     >
//                                       {isToggling === leave._id ? (
//                                         <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                                       ) : leave.isActive ? (
//                                         <HiEye className="h-4 w-4 text-green-500" />
//                                       ) : (
//                                         <HiEyeOff className="h-4 w-4 text-red-500" />
//                                       )}
//                                     </motion.button>
//                                     <motion.button
//                                       whileHover={{ scale: 1.1 }}
//                                       whileTap={{ scale: 0.9 }}
//                                       onClick={() => handleEdit(leave._id)}
//                                       className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
//                                     >
//                                       <HiPencil className="h-4 w-4" />
//                                     </motion.button>
//                                     <motion.button
//                                       whileHover={{ scale: 1.1 }}
//                                       whileTap={{ scale: 0.9 }}
//                                       onClick={() => handleDelete(leave._id, leave.name)}
//                                       disabled={isDeleting === leave._id}
//                                       className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
//                                     >
//                                       {isDeleting === leave._id ? (
//                                         <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
//                                       ) : (
//                                         <HiTrash className="h-4 w-4" />
//                                       )}
//                                     </motion.button>
//                                   </div>
//                                 </td>
//                               </motion.tr>
//                             ))}
//                           </AnimatePresence>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

      
//           </>
//         )}
//       </div>
      
//       {/* Modal */}
//       <LeaveType 
//         isOpen={isModalOpen} 
//         onClose={handleCloseModal}
//         editingLeaveType={editingLeaveType}
//       />

//       <ConfirmationDialog
//         open={openConfirm}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this leave type? This action cannot be undone."
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Yes, delete it!"
//         cancelText="Cancel"
//       />
//     </motion.div>
//   );
// }



import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaCalendarAlt, 
  FaUsers, 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaSpinner,
  FaPlus
} from 'react-icons/fa';
import LeaveType from "./models/LeaveTypeModel";
import leaveTypeStore from "../../../store/leaveTypeStore";
import ConfirmationDialog from "../../common/ConfirmationDialog.jsx";

export default function LeavesTypes() {

  const {
    leaveTypes,
    isLoading,
    error,
    fetchLeaveTypes,
    deleteLeaveType,
    toggleLeaveTypeStatus,
    clearError
  } = leaveTypeStore();

  const [expandedLeave, setExpandedLeave] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isToggling, setIsToggling] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  useEffect(() => {
    fetchLeaveTypes();
  }, [fetchLeaveTypes]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleAdd = () => {
    setEditingLeaveType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (leaveType) => {
    setEditingLeaveType(leaveType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLeaveType(null);
    fetchLeaveTypes();
  };

  const handleDelete = (id, name) => {
    setLeaveToDelete({ id, name });
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (leaveToDelete) {
      setIsDeleting(leaveToDelete.id);
      try {
        const success = await deleteLeaveType(leaveToDelete.id);
        if (success) {
          await fetchLeaveTypes();
          toast.success('Leave type deleted successfully');
        }
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setIsDeleting(null);
        setOpenConfirm(false);
        setLeaveToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setLeaveToDelete(null);
  };

  const handleToggleStatus = async (id, currentStatus, name) => {
    setIsToggling(id);
    try {
      const result = await toggleLeaveTypeStatus(id);
      if (result) {
        await fetchLeaveTypes();
        const action = currentStatus ? 'deactivated' : 'activated';
        toast.success(`"${name}" has been ${action}`);
      }
    } catch (error) {
      console.error('Toggle error:', error);
    } finally {
      setIsToggling(null);
    }
  };

  const categories = [
    { key: 'all', label: 'All Leave Types', count: leaveTypes.length, color: 'blue' },
    { key: 'paid', label: 'Paid Leave', count: leaveTypes.filter(l => l.category === 'paid').length, color: 'green' },
    { key: 'unpaid', label: 'Unpaid Leave', count: leaveTypes.filter(l => l.category === 'unpaid').length, color: 'red' },
    { key: 'mixed', label: 'Mixed Benefits', count: leaveTypes.filter(l => l.category === 'mixed').length, color: 'purple' }
  ];

  const filteredLeaves = leaveTypes.filter(leave => {
    const matchesCategory = selectedCategory === 'all' || leave.category === selectedCategory;
    const matchesSearch = leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (leaveId) => {
    setExpandedLeave(expandedLeave === leaveId ? null : leaveId);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'paid': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'unpaid': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'mixed': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' 
      : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
  };

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
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
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiCalendar className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Leave Types Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Configure and manage all available leave types, policies, and requirements for your organization
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
          >
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading leave types...</span>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {categories.map(category => (
                <motion.button
                  key={category.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedCategory === category.key
                      ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/20 text-${category.color}-600 dark:text-${category.color}-400 shadow-lg`
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl font-bold mb-2">{category.count}</div>
                  <div className="text-sm font-medium">{category.label}</div>
                </motion.button>
              ))}
            </motion.div>

            {/* Controls Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search leave types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Add Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <HiPlus className="text-lg" />
                  <span className="hidden sm:inline">Add Leave Type</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Empty State */}
            {leaveTypes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <FaUmbrellaBeach className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Leave Types Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Get started by creating your first leave type and begin managing your organization's leave policies
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  <span>Create First Leave Type</span>
                </motion.button>
              </motion.div>
            )}

            {/* No Results for Filter */}
            {leaveTypes.length > 0 && filteredLeaves.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <FaSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Leave Types Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  No leave types match your current search and filter criteria
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    Show All Categories
                  </button>
                </div>
              </motion.div>
            )}

            {/* Leave Types Cards Display */}
            {filteredLeaves.length > 0 && (
              <motion.div variants={itemVariants}>
                <div className="grid gap-6">
                  <AnimatePresence>
                    {filteredLeaves.map(leave => (
                      <motion.div
                        key={leave._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Leave Header */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex items-center space-x-4 cursor-pointer flex-1"
                              onClick={() => toggleExpand(leave._id)}
                            >
                              <div className={`w-4 h-4 rounded-full ${leave.color || 'bg-blue-500'} shadow-lg`}></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{leave.name}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(leave.isActive)}`}>
                                    {leave.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(leave.category)}`}>
                                    {leave.category}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{leave.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow border border-gray-200 dark:border-gray-600">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{leave.maxDays}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Max Days</div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleToggleStatus(leave._id, leave.isActive, leave.name)}
                                  disabled={isToggling === leave._id}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  title={leave.isActive ? 'Deactivate' : 'Activate'}
                                >
                                  {isToggling === leave._id ? (
                                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                  ) : leave.isActive ? (
                                    <HiEye className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <HiEyeOff className="w-5 h-5 text-red-500" />
                                  )}
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEdit(leave._id)}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                  title="Edit"
                                >
                                  <HiPencil className="w-5 h-5" />
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(leave._id, leave.name)}
                                  disabled={isDeleting === leave._id}
                                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                  title="Delete"
                                >
                                  {isDeleting === leave._id ? (
                                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <HiTrash className="w-5 h-5" />
                                  )}
                                </motion.button>
                              </div>
                              
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleExpand(leave._id)}
                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                {expandedLeave === leave._id ? (
                                  <FaChevronUp className="w-5 h-5" />
                                ) : (
                                  <FaChevronDown className="w-5 h-5" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedLeave === leave._id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Left Column */}
                                  <div className="space-y-6">
                                    {/* Quick Info */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <FaClock className="w-4 h-4 text-blue-500 mr-2" />
                                        Quick Information
                                      </h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Approver:</span>
                                          <span className="font-medium text-gray-900 dark:text-white">{leave.approver}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Advance Notice:</span>
                                          <span className="font-medium text-gray-900 dark:text-white">{leave.advanceNotice}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                                          <div className="flex items-center">
                                            {leave.documentsRequired && leave.documentsRequired !== 'Not Required' ? (
                                              <>
                                                <FaFileAlt className="w-4 h-4 text-orange-500 mr-1" />
                                                <span className="text-sm text-orange-600 dark:text-orange-400">{leave.documentsRequired}</span>
                                              </>
                                            ) : (
                                              <>
                                                <FaCheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                                <span className="text-sm text-green-600 dark:text-green-400">Not Required</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Eligibility */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <FaUsers className="w-4 h-4 text-green-500 mr-2" />
                                        Eligibility
                                      </h4>
                                      <p className="text-gray-700 dark:text-gray-300">{leave.eligibility}</p>
                                    </div>
                                  </div>

                                  {/* Right Column */}
                                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-600">
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                      <FaExclamationCircle className="w-4 h-4 text-purple-500 mr-2" />
                                      Policies & Guidelines
                                    </h4>
                                    {leave.policies && leave.policies.length > 0 ? (
                                      <ul className="space-y-2">
                                        {leave.policies.map((policy, index) => (
                                          <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{policy}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-gray-500 dark:text-gray-400 text-sm">No specific policies defined.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Modal */}
      <LeaveType 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        editingLeaveType={editingLeaveType}
      />

      <ConfirmationDialog
        open={openConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this leave type? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, delete it!"
        cancelText="Cancel"
      />
    </motion.div>
  );
}