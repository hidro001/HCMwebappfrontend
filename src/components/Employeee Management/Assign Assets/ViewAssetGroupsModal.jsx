

// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import useAssetStore from "../../../store/useAssetStore";

// // Import the BaseModal
// import BaseModal from "../../common/BaseModal"; 

// const overlayAnimation = {
//   layout: true,
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
//   transition: { duration: 0.2 },
// };

// export default function ViewAssetGroupsModal({ isOpen, onClose }) {
//   const { assetGroups, getAssetGroups, deleteAssetGroup } = useAssetStore();

//   useEffect(() => {
//     if (isOpen) {
//       getAssetGroups();
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen, getAssetGroups]);

//   // If not open, no need to render anything
//   if (!isOpen) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
  
//       <motion.div
//         layout
//         className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-lg shadow-lg"
//         {...overlayAnimation}
//       >
//         {/* Modal header */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">View Asset Groups</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800 
//                        dark:text-gray-300 dark:hover:text-gray-100 
//                        text-2xl leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Modal body */}
//         <div
//           className="space-y-4 max-h-[60vh] overflow-auto pr-3
//                      [&::-webkit-scrollbar]:w-2
//                      [&::-webkit-scrollbar-track]:rounded-full
//                      [&::-webkit-scrollbar-track]:bg-gray-100
//                      dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                      [&::-webkit-scrollbar-thumb]:rounded-full
//                      [&::-webkit-scrollbar-thumb]:bg-gray-400
//                      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                      transition-colors duration-300"
//         >
//           {assetGroups.length > 0 ? (
//             assetGroups.map((group) => (
//               <div
//                 key={group._id}
//                 className="border rounded-md p-3 flex items-center justify-between"
//               >
//                 <div className="text-sm">
//                   <p className="mb-1 font-medium">
//                     Group name:{" "}
//                     <span className="font-normal">{group.name}</span>
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Group Description: {group.description || "—"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => deleteAssetGroup(group._id)}
//                   className="border border-red-400 text-red-500 
//                              px-3 py-1 rounded 
//                              hover:bg-red-50 
//                              transition-colors 
//                              text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No asset groups found.</p>
//           )}
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }




import React, { useEffect, useState } from "react";
import { 
  FaTimes, 
  FaBoxOpen, 
  FaTrash, 
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaTags,
  FaFileAlt,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import useAssetStore from "../../../store/useAssetStore";
import BaseModal from "../../common/BaseModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";

export default function ViewAssetGroupsModal({ isOpen, onClose }) {
  const { assetGroups, getAssetGroups, deleteAssetGroup } = useAssetStore();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchAssetGroups();
      setSearchTerm("");
    }
  }, [isOpen]);

  const fetchAssetGroups = async () => {
    setLoading(true);
    try {
      await getAssetGroups();
    } catch (error) {
      console.error("Error fetching asset groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (group) => {
    setSelectedGroup(group);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedGroup) return;
    
    setDeletingId(selectedGroup._id);
    try {
      await deleteAssetGroup(selectedGroup._id);
    } catch (error) {
      console.error("Error deleting asset group:", error);
    } finally {
      setDeletingId(null);
      setDeleteConfirmOpen(false);
      setSelectedGroup(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setSelectedGroup(null);
  };

  // Filter asset groups based on search term
  const filteredGroups = assetGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const AssetGroupCard = ({ group }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <FaTags className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {group.name}
            </h3>
          </div>
          
          {group.description ? (
            <div className="flex items-start space-x-2">
              <FaFileAlt className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {group.description}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FaFileAlt className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-400 italic">No description</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => handleDeleteClick(group)}
          disabled={deletingId === group._id}
          className="ml-3 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          title="Delete group"
        >
          {deletingId === group._id ? (
            <FaSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <FaTrash className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaEye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Asset Groups</h2>
                  <p className="text-blue-100 text-sm">
                    Manage your asset groups ({filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'})
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search asset groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="max-h-96 overflow-y-auto pr-2 space-y-4 
                           [&::-webkit-scrollbar]:w-2
                           [&::-webkit-scrollbar-track]:rounded-full
                           [&::-webkit-scrollbar-track]:bg-gray-100
                           dark:[&::-webkit-scrollbar-track]:bg-gray-700
                           [&::-webkit-scrollbar-thumb]:rounded-full
                           [&::-webkit-scrollbar-thumb]:bg-gray-300
                           dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                           hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                           dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">
              
              {loading ? (
                <LoadingSkeleton />
              ) : filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <AssetGroupCard key={group._id} group={group} />
                ))
              ) : (
                <div className="text-center py-12">
                  {searchTerm ? (
                    <div className="space-y-3">
                      <FaSearch className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No groups found</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        No asset groups match your search for "{searchTerm}"
                      </p>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FaBoxOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No asset groups</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        You haven't created any asset groups yet. Create your first group to get started.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer with stats */}
          {filteredGroups.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    {filteredGroups.length} of {assetGroups.length} groups
                  </span>
                  {searchTerm && (
                    <span className="text-blue-600 dark:text-blue-400">
                      Filtered by: "{searchTerm}"
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <FaBoxOpen className="w-4 h-4" />
                  <span>Asset Groups</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </BaseModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        title="Delete Asset Group"
        message={`Are you sure you want to delete the asset group "${selectedGroup?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        destructive={true}
        icon={FaExclamationTriangle}
        loading={deletingId !== null}
      />
    </>
  );
}