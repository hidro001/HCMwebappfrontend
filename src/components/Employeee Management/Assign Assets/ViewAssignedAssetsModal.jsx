import React, { useEffect } from "react";

export default function ViewAssignedAssetsModal({
  isOpen,
  onClose,
  assignedAssets,
  employeeName,
}) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Overlay: in dark mode, adjust background opacity if needed
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      {/* Modal container */}
      <div className="relative w-full max-w-4xl mx-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-600">
          <h2 className="text-lg font-semibold text-white">
            Assigned Assets for {employeeName}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Asset Number</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Asset Group</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Description</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Brand</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Model</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Status</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedAssets.length > 0 ? (
                assignedAssets.map((asset, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b last:border-0 border-gray-200 dark:border-gray-600"
                  >
                    <td className="p-3">{asset.assetNumber}</td>
                    <td className="p-3">{asset.assetGroup}</td>
                    <td className="p-3">{asset.description}</td>
                    <td className="p-3">{asset.brand}</td>
                    <td className="p-3">{asset.model}</td>
                    <td className="p-3">
                      <span
                        className={`
                          inline-block px-2 py-1 text-sm font-medium rounded
                          ${
                            asset.status === "Assigned"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : asset.status === "Returned"
                              ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }
                        `}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          className="
                            bg-yellow-500 hover:bg-yellow-600
                            text-white text-xs px-3 py-1 rounded
                            transition-colors
                          "
                        >
                          Update
                        </button>
                        <button
                          className="
                            bg-red-500 hover:bg-red-600
                            text-white text-xs px-3 py-1 rounded
                            transition-colors
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No assigned assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
