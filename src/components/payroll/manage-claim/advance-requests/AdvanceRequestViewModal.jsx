;

export default function AdvanceRequestViewModal({ request, onClose }) {
  if (!request) return null;

  const {
    empId = 'RI0023',
    name = 'Riya Mishra',
    requestedAt = '25 Jan 2024, 10:30AM',
    advanceAmount = 10000,
    status = 'Pending',
    description = 'Lorem ipsum...',
  } = request;

  // Colored bullet for status
  const renderStatus = () => {
    let dotColor = 'bg-yellow-500'; // default "Pending"
    if (status === 'Approve') dotColor = 'bg-green-500';
    if (status === 'Reject') dotColor = 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="
          relative
          w-full
          max-w-md
          mx-2
          bg-white
          dark:bg-gray-800
          rounded-md
          shadow-lg
          p-6
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Advance Request of {name} ({empId})
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Requested At
          </p>
          <p className="text-sm">{requestedAt}</p>
        </div>

        {/* Advance Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Advance Amount
          </p>
          <p className="text-sm">{advanceAmount}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </p>
          <div className="text-sm">{renderStatus()}</div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Description
          </p>
          <p className="text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
