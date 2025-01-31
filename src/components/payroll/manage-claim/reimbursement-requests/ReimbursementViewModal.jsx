;
import { FaDownload } from 'react-icons/fa';

export default function ReimbursementViewModal({ request, onClose }) {
  if (!request) return null;

  const {
    empId = 'RI0023',
    name = 'Riya Mishra',
    requestedAt = '25 Jan 2024, 10:30AM',
    amount = 10000,
    status = 'Pending',
    description = 'Lorem ipsum dolor sit amet...',
    attachment = {
      fileName: 'Transcend.zip',
      size: '1.8MB',
      url: '/path/to/Transcend.zip',
    },
  } = request;

  // Colored bullet for status
  const renderStatusDot = () => {
    let dotColor = 'bg-yellow-500';
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Reimbursement Request of {name} ({empId})
        </h2>

        {/* Requested At */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Requested At
          </p>
          <p className="text-sm">{requestedAt}</p>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Amount
          </p>
          <p className="text-sm">{amount}</p>
        </div>

        {/* Status */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </p>
          <div className="text-sm">{renderStatusDot()}</div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Description
          </p>
          <p className="text-sm mt-1">{description}</p>
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            View Attachment
          </p>
          {attachment && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-600 px-3 py-2">
              <div className="text-sm">
                <p className="font-semibold">{attachment.fileName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {attachment.size}
                </p>
              </div>
              <a
                href={attachment.url}
                download
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <FaDownload />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
