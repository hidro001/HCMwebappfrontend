

export default function HikeRequestViewModal({ request, onClose }) {
  // If no request is passed, don't render anything
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg w-full max-w-md p-6 relative mx-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &times;
        </button>

        <h2 className="text-lg md:text-xl font-semibold mb-3">
          Hike Request of {request.name} ({request.empId})
        </h2>
        <div className="mb-2">
          <strong>Requested At:</strong> {request.requestedAt}
        </div>
        <div className="mb-2">
          <strong>Salary Hike (%):</strong> {request.salaryHike}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {request.status}
        </div>
        <div className="mb-2">
          <strong>Description:</strong>
          <p className="mt-1">
            {request.description || 'No description provided.'}
          </p>
        </div>
      </div>
    </div>
  );
}
