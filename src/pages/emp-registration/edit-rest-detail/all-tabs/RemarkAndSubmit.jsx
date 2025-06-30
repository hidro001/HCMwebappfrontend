import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../service/axiosInstance';
import RemarkChatEmp from './RemarkChatEmp';
import toast from 'react-hot-toast';

export default function VerificationStatusMessage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const empid = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/registration/verify-status/${empid}`);
        setStatus(res.data?.isUserVerified || 'Not Verified');
      } catch (err) {
        console.error('Error fetching verification status:', err);
        setStatus('Unknown');
      } finally {
        setLoading(false);
      }
    };

    if (empid) fetchStatus();
  }, [empid]);

  const handleMarkPending = async () => {
    try {
      setSubmitting(true);
      await axiosInstance.put(`/registration/verify-pending/${empid}`, {
        isUserVerified: 'Pending',
      });
      toast.success('Submitted for verification!');
      setStatus('Pending');
    } catch (err) {
      console.error('Failed to mark as pending:', err);
      toast.error('Failed to submit for verification.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStatus = () => {
    if (loading) {
      return <p className="text-gray-500 dark:text-gray-400">Checking submission status...</p>;
    }

    switch (status) {
      case 'Verified':
        return <p className="text-green-600 dark:text-green-400 font-medium">✅ Form has been verified.</p>;
      case 'Pending':
        return <p className="text-yellow-600 dark:text-yellow-400 font-medium">⏳ Verification is pending.</p>;
      case 'Not Verified':
        return <p className="text-red-600 dark:text-red-400 font-medium">❌ Form is not yet submitted.</p>;
      default:
        return <p className="text-gray-500 dark:text-gray-400">Status unknown.</p>;
    }
  };

  const canSubmit = status === 'Not Verified';

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Remarks */}
      <div className="md:w-1/2 w-full border rounded-lg bg-white dark:bg-[#0e1322] border-gray-300 dark:border-gray-700 shadow p-5">
        <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Remarks</h3>
        <RemarkChatEmp />
      </div>

      {/* Submission Status */}
      <div className="md:w-1/2 w-full border rounded-lg bg-white dark:bg-[#0e1322] border-gray-300 dark:border-gray-700 shadow p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Submission Status</h3>
          {renderStatus()}
        </div>

        {/* Submit Button */}
        {status === 'Not Verified' && (
          <button
            onClick={handleMarkPending}
            disabled={!canSubmit || submitting}
            className={`mt-6 w-full px-4 py-2 rounded-md text-white font-medium transition ${
              canSubmit
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit for Verification'}
          </button>
        )}
      </div>
    </div>
  );
}
