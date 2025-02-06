
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import BaseModal from "../../common/BaseModal";

const modalVariant = {
  hidden: { y: "-20%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

export default function ViewRatingModal({ show, onClose, ratingItem }) {
  if (!show || !ratingItem) return null;

  const {
    ratedTo = {},
    ratedBy = {},
    averageRating = 0,
    comments = "No comments",
    createdAt = "",
    year = "",
    month = "",
    ratings = [],
  } = ratingItem;

  return (
    <BaseModal isOpen={show} onClose={onClose}>
      <AnimatePresence>
        {show && (
          <motion.div
            className="w-full max-w-lg rounded shadow-lg dark:bg-gray-800 bg-white"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-700 rounded-t">
              <h3 className="text-white font-semibold text-lg">
                Ratings for {ratedTo.first_Name} {ratedTo.last_Name} (ID:{" "}
                {ratedTo.employee_Id})
              </h3>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-gray-800 dark:text-gray-100 text-sm space-y-3">
              <div>
                <p className="font-semibold">Designation</p>
                <p>{ratedTo.designation || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold">Average Rating</p>
                <p>{averageRating} / 5</p>
              </div>

              <div>
                <p className="font-semibold">Rated By</p>
                <p>
                  {ratedBy.first_Name} {ratedBy.last_Name} (ID:{" "}
                  {ratedBy.employee_Id})
                </p>
              </div>

              <div>
                <p className="font-semibold">Comments</p>
                <p>{comments}</p>
              </div>

              <div>
                <p className="font-semibold">Submitted On</p>
                <p>{createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold">Period (YYYY/MM)</p>
                <p>
                  {year}/{month}
                </p>
              </div>

              {/* KPI Scores */}
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mt-4">
                KPI Scores:
              </h4>
              {ratings.length > 0 ? (
                <table className="w-full text-left text-sm border dark:border-gray-700">
                  <thead className="border-b dark:border-gray-700">
                    <tr>
                      <th className="p-2">KPI Name</th>
                      <th className="p-2">Weight</th>
                      <th className="p-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map((kpiRating) => (
                      <tr
                        key={kpiRating._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="p-2">{kpiRating.kpi?.name || "N/A"}</td>
                        <td className="p-2">{kpiRating.kpi?.weight || "N/A"}</td>
                        <td className="p-2">{kpiRating.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No KPI details Available Please Add Kpis.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}


