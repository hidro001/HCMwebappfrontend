import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Simple fade-and-scale animation
const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

/**
 * ViewAssetGroupsModal
 *
 * Props:
 * - isOpen (Boolean): whether the modal is visible
 * - onClose (Function): callback to close the modal
 * - groups (Array): list of group objects, e.g. [{ id, name, description }, ...]
 * - onDeleteGroup (Function): called when user clicks "Delete" for a specific group
 */
export default function ViewAssetGroupsModal({
  isOpen,
  onClose,
  groups = [],
  onDeleteGroup,
}) {
  // 1) Prevent body scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current overflow style to restore it later
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling
      document.body.style.overflow = "hidden";

      // Cleanup: restore original body overflow
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-red-600"
          {...overlayAnimation}
        >
          <motion.div
            layout
            className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-lg shadow-lg border border-red-600"
            {...overlayAnimation}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">View Asset Group</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Body: list of groups */}
            <div
              className="space-y-4 max-h-[60vh] overflow-auto pr-5     [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 
                dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
            >
              {groups.length > 0 ? (
                groups.map((grp) => (
                  <div
                    key={grp.id}
                    className="border rounded-md p-3 flex items-center justify-between"
                  >
                    <div className="text-sm">
                      <p className="mb-1 font-medium">
                        Group name :{" "}
                        <span className="font-normal">{grp.name}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Group Description : {grp.description || "—"}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteGroup(grp.id)}
                      className="border border-orange-400 text-orange-500 px-3 py-1 rounded hover:bg-orange-50 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No asset groups found.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
