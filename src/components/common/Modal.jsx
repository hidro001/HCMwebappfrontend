import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Lock scroll when modal is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Escape key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    // Cleanup
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    {/* Background (click to close) */}
    <div className="absolute inset-0" onClick={onClose}></div>

    {/* Modal Box */}
    <div
      className="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title || "Modal Title"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
        {children}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

};

export default Modal;
