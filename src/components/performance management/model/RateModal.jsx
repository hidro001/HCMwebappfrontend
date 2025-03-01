
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

import BaseModal from "../../common/BaseModal";
import { useRatingStore } from "../../../store/useRatingStore";

const modalVariant = {
  hidden: { y: "-20%", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { duration: 0.3 } },
};

export default function RateModal({ show, onClose, selectedMember }) {
  // zustand store
  const { kpis, loadingKpis, fetchKpis, submitRatings } = useRatingStore();

  // local states for rating form
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState({}); 

  // Fetch KPIs whenever the subordinate changes
  useEffect(() => {
    if (show && selectedMember?.designation) {
      fetchKpis(selectedMember.designation);
    }
  }, [show, selectedMember, fetchKpis]);

  // Whenever kpis changes, set default rating of 3 (or any default)
  useEffect(() => {
    if (kpis && kpis.length) {
      const initRatings = {};
      kpis.forEach((kpi) => {
        initRatings[kpi._id] = 3;
      });
      setRatings(initRatings);
    } else {
      setRatings({});
    }
  }, [kpis]);

  // Compute average rating
  const averageRating = React.useMemo(() => {
    const scores = Object.values(ratings);
    if (!scores.length) return 0;
    const total = scores.reduce((a, b) => a + b, 0);
    return (total / scores.length).toFixed(2);
  }, [ratings]);

  // handle rating change
  const handleRatingChange = (kpiId, value) => {
    setRatings((prev) => ({
      ...prev,
      [kpiId]: Number(value),
    }));
  };

  // handle submit
  const handleSubmit = () => {
    // convert the {kpiId: score} map to an array
    const formattedRatings = Object.entries(ratings).map(([key, val]) => {
      return { kpi: key, score: val };
    });

    submitRatings({
      ratedTo: selectedMember?._id,
      ratings: formattedRatings,
      comments: comment,
      month,
      year,
      onSuccess: () => {
        // optional: reset or close the modal
        onClose();
      },
    });
  };

  if (!show) return null;

  return (
    <BaseModal isOpen={show} onClose={onClose}>
      <AnimatePresence>
        {show && (
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative h-[82%] overflow-y-auto"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-100 hover:text-gray-900"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
              Rate{" "}
              {selectedMember
                ? `${selectedMember.first_Name} ${selectedMember.last_Name}`
                : "Employee"}
            </h3>

            {/* If loading KPIs */}
            {loadingKpis ? (
              <p className="text-center">Loading KPIs...</p>
            ) : kpis.length > 0 ? (
              <div className="space-y-4">
                {/* Month */}
                <div>
                  <label className="block mb-1 dark:text-gray-100">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="">Select Month</option>
                    {[...Array(12)].map((_, i) => {
                      const monthNumber = i + 1;
                      return (
                        <option key={monthNumber} value={monthNumber}>
                          {new Date(0, monthNumber - 1).toLocaleString(
                            "default",
                            { month: "long" }
                          )}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block mb-1 dark:text-gray-100">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter Year"
                    className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                    min="1900"
                    max={new Date().getFullYear() + 5}
                  />
                </div>

                {/* Average Rating */}
                <div>
                  <label className="block mb-1 dark:text-gray-100">
                    Average Rating
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                    value={averageRating}
                    readOnly
                  />
                </div>

                {/* KPI list */}
                {kpis.map((kpi) => (
                  <div key={kpi._id}>
                    <label className="block mb-1 dark:text-gray-100">
                      {kpi.name}
                    </label>
                    <select
                      value={ratings[kpi._id] ?? 3}
                      onChange={(e) =>
                        handleRatingChange(kpi._id, e.target.value)
                      }
                      className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                    >
                      <option value={1}>1 - Poor</option>
                      <option value={2}>2 - Fair</option>
                      <option value={3}>3 - Good</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={5}>5 - Excellent</option>
                    </select>
                  </div>
                ))}

                {/* Comment */}
                <div>
                  <label className="block mb-1 dark:text-gray-100">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment here..."
                    className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            ) : (
              <p>No KPIs available for this subordinate’s designation.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}
