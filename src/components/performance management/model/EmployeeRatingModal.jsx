import React from 'react';

const EmployeeRatingModal = ({ employee, onClose }) => {
  if (!employee) return null;

  // Example KPI data (you might already have this from props or API)
  const kpiScores = [
    { name: 'Sales (Indiamart-3/Livekeeping-10)', weight: 50, score: 4 },
    { name: 'Behavior', weight: 10, score: 4 },
    { name: 'Hygiene', weight: 10, score: 4 },
    { name: 'Installations(25)/Online PPT(50)', weight: 20, score: 4 },
    { name: 'Video Calls(25)/Demos(18)', weight: 10, score: 4 },
  ];

  return (
    <>
      {/* ===== Overlay ===== */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* ===== Modal ===== */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-lg relative shadow-lg">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-100
                       hover:text-gray-800 dark:hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4">
            Ratings for {employee.name} (ID: {employee.empId})
          </h2>

          {/* Basic Info (Reference Image Style) */}
          <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Designation
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.designation || 'N/A'}
            </div>

            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Average Rating
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.avgRating || 'N/A'} / 5
            </div>

            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Rated By
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.ratedBy || 'N/A'} (ID: {employee.ratedById || 'N/A'})
            </div>

            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Designation
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.raterDesignation || 'N/A'}
            </div>

            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Comments
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.comments || 'No comments available'}
            </div>

            <div className="text-gray-500 dark:text-gray-300 font-medium">
              Submitted On
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {employee.submittedOn || 'N/A'}
            </div>
          </div>

          {/* KPI Scores Table */}
          <h3 className="text-lg font-semibold mb-2">KPI Scores:</h3>
          <table className="w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 border border-gray-200 dark:border-gray-700 font-medium">
                  Name
                </th>
                <th className="p-2 border border-gray-200 dark:border-gray-700 font-medium">
                  Weight (%)
                </th>
                <th className="p-2 border border-gray-200 dark:border-gray-700 font-medium">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {kpiScores.map((kpi, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-2 border border-gray-200 dark:border-gray-700">
                    {kpi.name}
                  </td>
                  <td className="p-2 border border-gray-200 dark:border-gray-700">
                    {kpi.weight}
                  </td>
                  <td className="p-2 border border-gray-200 dark:border-gray-700">
                    {kpi.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeRatingModal;
