

import React from "react";

export default function RatingsTable({ data, loading, onViewClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Ratings of Team Member
      </h2>

      {loading ? (
        <p className="text-center dark:text-gray-300">Loading ratings...</p>
      ) : data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  S.L
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Emp ID
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Employee Name
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Designation
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Average Rating
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Comments
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Rated By
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Submitted On
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  For YY/MM
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {data.map((item, idx) => (
                <tr key={item._id}>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.ratedTo?.employee_Id}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.ratedTo?.first_Name} {item.ratedTo?.last_Name}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.ratedTo?.designation}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.averageRating}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.comments || "N/A"}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.ratedBy?.first_Name} {item.ratedBy?.last_Name}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {item.year}/{item.month}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    <button
                      onClick={() => onViewClick(item)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dark:text-gray-300">No ratings found.</p>
      )}
    </div>
  );
}
