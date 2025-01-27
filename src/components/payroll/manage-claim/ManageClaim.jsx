import  { useState } from 'react';

// Import your tab components
import HikeRequests from './hike-requests/HikeRequests';
import AdvanceRequests from './advance-requests/AdvanceRequests';
import ReimbursementRequests from './reimbursement-requests/ReimbursementRequests';
import LoanRequests from './loan-requests/LoanRequests';

export default function ManageClaim() {
  // Track the active tab
  const [activeTab, setActiveTab] = useState('hike');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Top Info Banner */}
      <div
        className="
          bg-green-100 border border-green-200 text-green-700
          p-4 text-sm md:text-base
          flex flex-col md:flex-row items-center justify-between
          dark:bg-green-900 dark:border-green-800 dark:text-green-100
        "
      >
        <p>Stay on top of your department’s progress with Department Statistics! ...</p>
        <div className="mt-2 md:mt-0 flex items-center gap-4">
          <a href="#" className="underline text-green-800 dark:text-green-200">
            Hide Help
          </a>
          <a href="#" className="underline text-blue-600 dark:text-blue-300">
            Task
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 p-4">
        <button
          onClick={() => setActiveTab('hike')}
          className={`
            px-4 py-2 rounded-full border
            ${
              activeTab === 'hike'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-100 dark:border-purple-700'
            }
          `}
        >
          Hike Requests
        </button>
        <button
          onClick={() => setActiveTab('advance')}
          className={`
            px-4 py-2 rounded-full border
            ${
              activeTab === 'advance'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-100 dark:border-purple-700'
            }
          `}
        >
          Advance Requests
        </button>
        <button
          onClick={() => setActiveTab('reimbursement')}
          className={`
            px-4 py-2 rounded-full border
            ${
              activeTab === 'reimbursement'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-100 dark:border-purple-700'
            }
          `}
        >
          Reimbursement Requests
        </button>
        <button
          onClick={() => setActiveTab('loan')}
          className={`
            px-4 py-2 rounded-full border
            ${
              activeTab === 'loan'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-100 dark:border-purple-700'
            }
          `}
        >
          Loan Requests
        </button>
      </div>

      {/* Render the correct content based on active tab */}
      {activeTab === 'hike' && <HikeRequests />}
      {activeTab === 'advance' && <AdvanceRequests />}
      {activeTab === 'reimbursement' && <ReimbursementRequests />}
      {activeTab === 'loan' && <LoanRequests />}

      {/* Optional: Pagination or other shared UI goes here */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4">
        <span className="text-sm">Showing 1 to 10 of 12 entries</span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 border rounded bg-white dark:bg-gray-700 text-sm">1</button>
          <button className="px-3 py-1 border rounded bg-white dark:bg-gray-700 text-sm">2</button>
        </div>
      </div>
    </div>
  );
}
