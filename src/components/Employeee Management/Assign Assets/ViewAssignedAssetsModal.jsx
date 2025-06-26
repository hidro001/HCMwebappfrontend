// import { useEffect, useState } from "react";
// import useAssetStore from "../../../store/useAssetStore";

// // 1) Import the BaseModal
// import BaseModal from "../../common/BaseModal";

// export default function ViewAssignedAssetsModal({
//   isOpen,
//   onClose,
//   employeeId,
//   employeeName,
// }) {
//   const {
//     assignedAssets,
//     fetchAssignedAssets,
//     updateAssetStatus,
//     deleteAsset,
//   } = useAssetStore();

//   const [localAssets, setLocalAssets] = useState([]);

//   useEffect(() => {
//     if (isOpen && employeeId) {
//       fetchAssignedAssets(employeeId);

//       // Prevent body scroll
//       const originalStyle = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalStyle;
//       };
//     }
//   }, [isOpen, employeeId, fetchAssignedAssets]);

//   useEffect(() => {
//     if (employeeId && assignedAssets[employeeId]) {
//       setLocalAssets(assignedAssets[employeeId]);
//     }
//   }, [employeeId, assignedAssets]);

//   // If you prefer, you can remove this line, since BaseModal won't render anything if isOpen=false
//   if (!isOpen) return null;

//   const handleUpdateStatus = (assetId, currentStatus) => {
//     const newStatus = currentStatus === "Assigned" ? "Returned" : "Assigned";
//     updateAssetStatus(employeeId, assetId, newStatus);
//   };

//   const handleDeleteAsset = (assetId) => {
//     deleteAsset(employeeId, assetId);
//   };

//   // 2) Wrap your existing UI in <BaseModal>
//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       {/* 
//         Everything inside here is your "inner" modal design, 
//         just as before—but without the old fixed overlay classes 
//       */}
//       <div className="relative w-full max-w-4xl mx-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-blue-600">
//           <h2 className="text-lg font-semibold text-white">
//             Assigned Assets for {employeeName}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 max-h-[70vh] overflow-y-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-blue-50 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Asset Number
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Asset Group
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Description
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Brand
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Model
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600">
//                   Status
//                 </th>
//                 <th className="p-3 border-b border-gray-200 dark:border-gray-600 text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {localAssets && localAssets.length > 0 ? (
//                 localAssets.map((asset) => (
//                   <tr
//                     key={asset._id}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b last:border-0 border-gray-200 dark:border-gray-600"
//                   >
//                     <td className="p-3">{asset.assetNo}</td>
//                     <td className="p-3">
//                       {asset.assetGroup?.name || asset.assetGroup}
//                     </td>
//                     <td className="p-3">{asset.description}</td>
//                     <td className="p-3">{asset.brand}</td>
//                     <td className="p-3">{asset.model}</td>
//                     <td className="p-3">
//                       <span
//                         className={`inline-block px-2 py-1 text-sm font-medium rounded ${
//                           asset.status === "Assigned"
//                             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                             : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
//                         }`}
//                       >
//                         {asset.status}
//                       </span>
//                     </td>
//                     <td className="p-3 text-right">
//                       <div className="flex justify-end items-center space-x-2">
//                         <button
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded transition-colors"
//                           onClick={() =>
//                             handleUpdateStatus(asset._id, asset.status)
//                           }
//                         >
//                           Update
//                         </button>
//                         <button className="bg-green-800 hover:bg-green-800 text-white text-xs px-3 py-1 rounded transition-colors">
//                           <a
//                             href={asset.image}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
                         
//                             Media
//                           </a>
//                         </button>
//                         <button
//                           className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition-colors"
//                           onClick={() => handleDeleteAsset(asset._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="p-6 text-center text-gray-500 dark:text-gray-400"
//                   >
//                     No assigned assets found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </BaseModal>
//   );
// }



import { useEffect, useState } from "react";
import { 
  FaTimes, 
  FaUser, 
  FaClipboardList,
  FaBoxOpen,
  FaTags,
  FaEdit,
  FaTrash,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaIndustry
} from "react-icons/fa";
import { 
  HiViewGrid, 
  HiViewList,
  HiExternalLink
} from "react-icons/hi";
import useAssetStore from "../../../store/useAssetStore";
import BaseModal from "../../common/BaseModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";

export default function ViewAssignedAssetsModal({
  isOpen,
  onClose,
  employeeId,
  employeeName,
}) {
  const {
    assignedAssets,
    fetchAssignedAssets,
    updateAssetStatus,
    deleteAsset,
  } = useAssetStore();

  const [localAssets, setLocalAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [updateConfirmOpen, setUpdateConfirmOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (isOpen && employeeId) {
      fetchAssignedAssetsData();
      setSearchTerm("");
      setStatusFilter("All");
    }
  }, [isOpen, employeeId]);

  useEffect(() => {
    if (employeeId && assignedAssets[employeeId]) {
      setLocalAssets(assignedAssets[employeeId]);
    }
  }, [employeeId, assignedAssets]);

  const fetchAssignedAssetsData = async () => {
    setLoading(true);
    try {
      await fetchAssignedAssets(employeeId);
    } catch (error) {
      console.error("Error fetching assigned assets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter assets based on search and status
  const filteredAssets = localAssets.filter(asset => {
    const matchesSearch = 
      asset.assetNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof asset.assetGroup === 'string' ? asset.assetGroup : asset.assetGroup?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || asset.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatusClick = (asset) => {
    setSelectedAsset(asset);
    setUpdateConfirmOpen(true);
  };

  const handleUpdateConfirm = async () => {
    if (!selectedAsset) return;
    
    setActionLoading(selectedAsset._id);
    try {
      const newStatus = selectedAsset.status === "Assigned" ? "Returned" : "Assigned";
      await updateAssetStatus(employeeId, selectedAsset._id, newStatus);
    } catch (error) {
      console.error("Error updating asset status:", error);
    } finally {
      setActionLoading(null);
      setUpdateConfirmOpen(false);
      setSelectedAsset(null);
    }
  };

  const handleDeleteClick = (asset) => {
    setSelectedAsset(asset);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAsset) return;
    
    setActionLoading(selectedAsset._id);
    try {
      await deleteAsset(employeeId, selectedAsset._id);
    } catch (error) {
      console.error("Error deleting asset:", error);
    } finally {
      setActionLoading(null);
      setDeleteConfirmOpen(false);
      setSelectedAsset(null);
    }
  };

  const handleCancel = () => {
    setDeleteConfirmOpen(false);
    setUpdateConfirmOpen(false);
    setSelectedAsset(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Assigned":
        return <FaCheckCircle className="w-3 h-3 text-green-600" />;
      case "Returned":
        return <FaTimesCircle className="w-3 h-3 text-gray-600" />;
      default:
        return <FaClock className="w-3 h-3 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "Assigned":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case "Returned":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    }
  };

  // Asset Card Component
  const AssetCard = ({ asset }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FaBoxOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              {asset.assetNo}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {typeof asset.assetGroup === 'string' ? asset.assetGroup : asset.assetGroup?.name || "N/A"}
            </p>
          </div>
        </div>
        <span className={getStatusBadge(asset.status)}>
          {getStatusIcon(asset.status)}
          <span>{asset.status}</span>
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <FaClipboardList className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {asset.description}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaIndustry className="w-3 h-3 text-purple-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {asset.brand}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaTags className="w-3 h-3 text-orange-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {asset.model}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleUpdateStatusClick(asset)}
          disabled={actionLoading === asset._id}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center space-x-1 disabled:opacity-50"
        >
          {actionLoading === asset._id ? (
            <FaSpinner className="w-3 h-3 animate-spin" />
          ) : (
            <FaEdit className="w-3 h-3" />
          )}
          <span>Update</span>
        </button>
        
        {asset.image && (
          <button
            onClick={() => window.open(asset.image, '_blank')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <FaImage className="w-3 h-3" />
            <span>Media</span>
          </button>
        )}
        
        <button
          onClick={() => handleDeleteClick(asset)}
          disabled={actionLoading === asset._id}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center space-x-1 disabled:opacity-50"
        >
          <FaTrash className="w-3 h-3" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            <div className="w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="flex space-x-2 mt-3">
            <div className="flex-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="flex-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="flex-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-6xl mx-auto overflow-hidden transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Assigned Assets</h2>
                  <p className="text-blue-100 text-sm">
                    Assets assigned to {employeeName} ({filteredAssets.length} {filteredAssets.length === 1 ? 'asset' : 'assets'})
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

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Left Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64 transition-all duration-200"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <FaFilter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <option value="All">All Status</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "table"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Table View"
                  >
                    <HiViewList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("card")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "card"
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    title="Card View"
                  >
                    <HiViewGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {loading ? (
              <LoadingSkeleton />
            ) : filteredAssets.length > 0 ? (
              <>
                {/* Table View */}
                {viewMode === "table" && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Asset Number</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Asset Group</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Description</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Brand</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Model</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Status</th>
                          <th className="text-center py-4 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredAssets.map((asset) => (
                          <tr
                            key={asset._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="py-4 px-4 font-medium text-gray-900 dark:text-gray-100">
                              {asset.assetNo}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              {typeof asset.assetGroup === 'string' ? asset.assetGroup : asset.assetGroup?.name || "N/A"}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300 max-w-xs">
                              <div className="truncate" title={asset.description}>
                                {asset.description}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              {asset.brand}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              {asset.model}
                            </td>
                            <td className="py-4 px-4">
                              <span className={getStatusBadge(asset.status)}>
                                {getStatusIcon(asset.status)}
                                <span>{asset.status}</span>
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleUpdateStatusClick(asset)}
                                  disabled={actionLoading === asset._id}
                                  className="inline-flex items-center px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                  {actionLoading === asset._id ? (
                                    <FaSpinner className="w-3 h-3 animate-spin mr-1" />
                                  ) : (
                                    <FaEdit className="w-3 h-3 mr-1" />
                                  )}
                                  Update
                                </button>
                                
                                {asset.image && (
                                  <button
                                    onClick={() => window.open(asset.image, '_blank')}
                                    className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                                  >
                                    <FaImage className="w-3 h-3 mr-1" />
                                    Media
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => handleDeleteClick(asset)}
                                  disabled={actionLoading === asset._id}
                                  className="inline-flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                  <FaTrash className="w-3 h-3 mr-1" />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Card View */}
                {viewMode === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssets.map((asset) => (
                      <AssetCard key={asset._id} asset={asset} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                {searchTerm || statusFilter !== "All" ? (
                  <div className="space-y-3">
                    <FaSearch className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No assets found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No assets match your current filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("All");
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FaBoxOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No assigned assets</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {employeeName} has no assets assigned yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with summary */}
          {filteredAssets.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    {filteredAssets.length} of {localAssets.length} assets
                  </span>
                  {(searchTerm || statusFilter !== "All") && (
                    <span className="text-blue-600 dark:text-blue-400">
                      Filtered
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {filteredAssets.filter(a => a.status === "Assigned").length} Assigned
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {filteredAssets.filter(a => a.status === "Returned").length} Returned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </BaseModal>

      {/* Update Status Confirmation Dialog */}
      <ConfirmationDialog
        open={updateConfirmOpen}
        title="Update Asset Status"
        message={`Are you sure you want to change the status of "${selectedAsset?.assetNo}" from "${selectedAsset?.status}" to "${selectedAsset?.status === "Assigned" ? "Returned" : "Assigned"}"?`}
        onConfirm={handleUpdateConfirm}
        onCancel={handleCancel}
        confirmText={selectedAsset?.status === "Assigned" ? "Mark as Returned" : "Mark as Assigned"}
        cancelText="Cancel"
        type="warning"
        loading={actionLoading !== null}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        title="Delete Asset"
        message={`Are you sure you want to delete the asset "${selectedAsset?.assetNo}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        destructive={true}
        icon={FaExclamationTriangle}
        loading={actionLoading !== null}
      />
    </>
  );
}