import React from "react";

const PreviousScoresTable = ({ previousScores, setSelectedScore }) => {
  return (
    <div className="border rounded p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Previous Scores</h3>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b dark:border-gray-600">
            <th className="p-2">Date</th>
            <th className="p-2">Overall Score</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {previousScores.length > 0 ? (
            previousScores.map((score, index) => (
              <tr key={index} className="border-b last:border-none dark:border-gray-600">
                <td className="p-2">
                  {new Date(score.date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {(score.overallScore * 10).toFixed(2)}%
                </td>
                <td className="p-2">
                  <button
                    onClick={() => setSelectedScore(score)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 text-center">
                No previous scores found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousScoresTable;
