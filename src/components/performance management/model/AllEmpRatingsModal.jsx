

import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import BaseModal from "../../common/BaseModal"; 

function AllEmpRatingsModal({ isOpen, rating, onClose }) {
  if (!rating) return null;

  const ratedTo = rating.ratedTo;
  const ratedBy = rating.ratedBy;

  if (!isOpen) return null;

  return (
    // 1) Use <BaseModal> for the overlay/portal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 2) Keep the "modal card" in a motion.div for scale/fade animations */}
      <motion.div
        className="relative w-full max-w-lg rounded-md shadow-lg overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Header Section (Blue Bar) */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Ratings for {ratedTo?.first_Name} {ratedTo?.last_Name} (ID:{" "}
            {ratedTo?.employee_Id})
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Body Section (White Card) */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6">
          <p className="mb-1">
            <span className="font-semibold">Designation:</span>{" "}
            {ratedTo?.designation || "N/A"}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Average Rating:</span>{" "}
            {rating.averageRating} / 5
          </p>
          <p className="mb-1">
            <span className="font-semibold">Rated By:</span>{" "}
            {ratedBy
              ? `${ratedBy.first_Name} ${ratedBy.last_Name} (ID: ${ratedBy.employee_Id})`
              : "N/A"}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Comments:</span>{" "}
            {rating.comments || <em>No comments available</em>}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Submitted On:</span>{" "}
            {rating.createdAt
              ? new Date(rating.createdAt).toLocaleString()
              : "N/A"}
          </p>

          {/* KPI Scores */}
          <h3 className="text-lg font-bold text-blue-600 mb-2">KPI Scores:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                  <th className="py-2 px-2 font-semibold">KPI Name</th>
                  <th className="py-2 px-2 font-semibold">Weight (%)</th>
                  <th className="py-2 px-2 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody className="text-gray-900 dark:text-gray-200">
                {rating.ratings && rating.ratings.length > 0 ? (
                  rating.ratings.map((kpi, i) => (
                    <tr
                      key={kpi._id || i}
                      className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-2 px-2">
                        {kpi.kpi?.name || "Unknown"}
                      </td>
                      <td className="py-2 px-2">
                        {kpi.kpi?.weight || "N/A"}
                      </td>
                      <td className="py-2 px-2">{kpi.score ?? "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-2" colSpan={3}>
                      No KPI data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </BaseModal>
  );
}

export default AllEmpRatingsModal;
