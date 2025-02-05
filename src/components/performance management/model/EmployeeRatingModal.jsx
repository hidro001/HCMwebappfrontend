

import React, { useEffect } from 'react';
import BaseModal from '../../common/BaseModal';
import PostAndViewPerformersStore from '../../../store/PostAndViewPerformersStore';

const EmployeeRatingModal = ({ employee, onClose }) => {
  // 1) Declare all hooks at the top (unconditionally)
  const { fetchEmployeeRatings, employeeRatings, loading } = PostAndViewPerformersStore();

  useEffect(() => {
    // Only fetch if employee exists & has an _id
    if (employee && employee._id) {
      fetchEmployeeRatings(employee._id);
    }
  }, [employee, fetchEmployeeRatings]);

  // 2) THEN conditionally return null if needed
  if (!employee) {
    return null;
  }

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Ratings for {employee.firstName} {employee.lastName} (ID: {employee.employeeId})
        </h2>

        {loading ? (
          <p className="py-4">Loading ratings...</p>
        ) : employeeRatings.length === 0 ? (
          <p>No KPI ratings available for this employee.</p>
        ) : (
          <>
            {employeeRatings.map((ratingItem, idx) => (
              <div
                key={ratingItem._id || idx}
                className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-none last:mb-0 last:pb-0"
              >
                <p className="text-sm mb-1">
                  <strong>Rated By:</strong> {ratingItem.ratedBy?.first_Name || 'Unknown'}{' '}
                  {ratingItem.ratedBy?.last_Name || ''} (ID:{' '}
                  {ratingItem.ratedBy?.employee_Id || 'N/A'})
                </p>
                <p className="text-sm mb-1">
                  <strong>Average Rating:</strong> {ratingItem.averageRating || 0} / 5
                </p>
                <p className="text-sm mb-1">
                  <strong>Comments:</strong> {ratingItem.comments || 'No comments'}
                </p>
                <p className="text-sm mb-1">
                  <strong>Submitted On:</strong>{' '}
                  {ratingItem.createdAt
                    ? new Date(ratingItem.createdAt).toLocaleString()
                    : 'Unknown'}
                </p>

                <h3 className="font-semibold text-base mt-3 mb-2">KPI Scores:</h3>
                {ratingItem.ratings && ratingItem.ratings.length > 0 ? (
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="p-2 border font-medium">KPI Name</th>
                        <th className="p-2 border font-medium">Weight (%)</th>
                        <th className="p-2 border font-medium">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ratingItem.ratings.map((kpi, i) => (
                        <tr
                          key={kpi._id || i}
                          className="hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="p-2 border">{kpi.kpi?.name || 'Unknown KPI'}</td>
                          <td className="p-2 border">{kpi.kpi?.weight || 'N/A'}</td>
                          <td className="p-2 border">{kpi.score || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No KPI scores found for this rating.</p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default EmployeeRatingModal;

