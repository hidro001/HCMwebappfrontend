import  { useEffect, useState } from 'react';
import ReviewChat from './ReviewChat';
import axiosInstance from '../../../../service/axiosInstance';

export default function SubmitOrRemark({ employeeId, isManager = true }) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [verifyStatus, setVerifyStatus] = useState('Not Verified');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');
  const managerId = localStorage.getItem("employeeId"); // reviewer or manager

  const empid = employeeId;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/registration/verify-status/${empid}`);
        setVerifyStatus(res.data?.isUserVerified || 'Not Verified');
      } catch (err) {
        console.error('Failed to check verification status:', err);
      }
    };

    if (empid) fetchStatus();
  }, [empid]);

  const confirmStatusChange = (status) => {
    setPendingStatus(status);
    setShowConfirm(true);
  };

  const handleStatusChange = async () => {
    setShowConfirm(false);
    try {
      setSubmitting(true);
      const res = await axiosInstance.put(`/registration/mark-verifiedv2/${empid}`, {
        isUserVerified: pendingStatus,
      });

      if (res.data?.success) {
        setMessage(`✅ Status updated to "${pendingStatus}"`);
        setVerifyStatus(pendingStatus);
      } else {
        setMessage(res.data?.message || '❌ Failed to update status.');
      }
    } catch (err) {
      console.error('Status update failed:', err);
      setMessage('❌ Status update failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinalSubmit = () => {
    confirmStatusChange('Verified');
  };

  const isFinalized = verifyStatus === 'Verified';

  const renderStatusBadge = (status) => {
    const base = 'text-sm font-semibold px-3 py-1 rounded-full inline-block';
    const statusClasses = {
      'Verified': 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
      'Not Verified': 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200',
    };
    return <span className={`${base} ${statusClasses[status] || ''}`}>{status}</span>;
  };

  return (
    <div className="relative flex flex-col md:flex-row w-full h-full gap-6">
      {/* Review Chat */}
      <div className="md:w-1/2 w-full h-full border rounded-xl p-5 bg-white dark:bg-[#0e1322] border-gray-300 dark:border-gray-700 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Chat</h2>
       <ReviewChat managerId={managerId} employeeId={employeeId} />

      </div>

      {/* Submission / Status Panel */}
      <div className="md:w-1/2 w-full h-full border rounded-xl p-6 bg-white dark:bg-[#0e1322] border-gray-300 dark:border-gray-700 shadow-md flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Final Submission</h2>

          {!isManager ? (
            <>
              {verifyStatus !== 'Not Verified' ? (
                renderStatusBadge(verifyStatus)
              ) : (
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-blue-600 rounded border-gray-400 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I acknowledge that all the information has been reviewed and verified accurately.
                  </span>
                </label>
              )}
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Change Verification Status:
              </label>
              <select
                value={verifyStatus}
                onChange={(e) => confirmStatusChange(e.target.value)}
                disabled={submitting}
                className="w-full mt-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Not Verified">Not Verified</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
              </select>
              <div className="pt-2">{renderStatusBadge(verifyStatus)}</div>
            </div>
          )}
        </div>

        {!isManager && (
          <div className="pt-6 space-y-2">
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isFinalized || verifyStatus === 'Pending' || !acknowledged || submitting}
              className={`w-full text-sm font-medium py-2.5 rounded-md transition-colors ${
                isFinalized || verifyStatus === 'Pending' || !acknowledged
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isFinalized
                ? 'Already Verified'
                : verifyStatus === 'Pending'
                ? 'Awaiting Review'
                : submitting
                ? 'Submitting...'
                : 'Submit Final Review'}
            </button>
          </div>
        )}

        {message && (
          <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2">{message}</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border dark:border-gray-700 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Confirm Status Change
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Are you sure you want to change the status to <strong>{pendingStatus}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
