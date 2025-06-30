import React, { useState } from 'react';
import EmployeeCompensationAndAccessForm from './EmployeeCompensationAndAccessForm';
import BenefitsAndVerificationForm from './BenefitsAndVerificationForm';
import ExitDetailsForm from './ExitDetailsForm';
import EmployeeDetails from './EmployeeDetails';
import FinalReview from './FinalReview';
import SubmitOrRemark from './SubmitOrRemark';

const tabs = [
  'Employee Details',
  'Benefits & Verification',
  'Exit Details',
  'Employee Access',
  'Final Review',
  'Remark/Submit',
];

export default function ManagerTabOverview({ onClose, employeeId }) {
  const [activeTab, setActiveTab] = useState('Employee Details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Employee Details':
        return <EmployeeDetails employeeId={employeeId} />;
      case 'Employee Access':
        return <EmployeeCompensationAndAccessForm employeeId={employeeId} />;
      case 'Benefits & Verification':
        return <BenefitsAndVerificationForm employeeId={employeeId} />;
      case 'Exit Details':
        return <ExitDetailsForm employeeId={employeeId} />;
      case 'Final Review':
        return <FinalReview employeeId={employeeId} />; 
         case 'Remark/Submit':
        return <SubmitOrRemark employeeId={employeeId} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#0e1322] text-gray-800 dark:text-white rounded-lg shadow-lg flex flex-col max-h-[90vh]">
        
        <div className="sticky top-0 bg-white dark:bg-[#0e1322] z-10 px-6 pt-6 pb-4 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-start justify-between">
            <h2 className="text-1xl font-bold flex items-center gap-1">📋 Review Employee Details</h2>
            <button
              onClick={onClose}
              className="text-4xl font-bold text-gray-600 dark:text-white hover:text-red-600"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto p-4 flex-1">{renderTabContent()}</div>
      </div>
    </div>
  );
}
