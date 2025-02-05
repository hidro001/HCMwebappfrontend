


import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  AiOutlineEye,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineWarning,
} from "react-icons/ai";
import AllEmpRatingsModal from "./model/AllEmpRatingsModal";
import { useAllEmployeeRatingsStore } from "../../store/useAllEmployeeRatingsStore";

const summaryData = [
  {
    title: "Top Performer",
    value: 20,
    difference: "+200 this Month",
    icon: <AiOutlineBarChart size={28} />,
    bgColor: "bg-blue-500",
  },
  {
    title: "Average Performer",
    value: 12,
    difference: "-200 this Month",
    icon: <AiOutlineUser size={28} />,
    bgColor: "bg-purple-500",
  },
  {
    title: "Below Average Performer",
    value: 3,
    difference: "+200 this Month",
    icon: <AiOutlineWarning size={28} />,
    bgColor: "bg-red-500",
  },
];

function AllEmpRatings() {
  const {
    ratings,
    overallAverage,
    loading,
    pagination,
    fetchAllEmployeeRatings,
    handlePageChange,
  } = useAllEmployeeRatingsStore();

  const [selectedRating, setSelectedRating] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch ratings on component mount
  useEffect(() => {
    fetchAllEmployeeRatings(1);
  }, [fetchAllEmployeeRatings]);

  // Open modal
  const openModal = (rating) => {
    setSelectedRating(rating);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedRating(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 p-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryData.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center p-5 rounded-lg shadow-sm text-white ${item.bgColor}`}
          >
            <div className="mr-4">{item.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <div className="text-3xl font-bold">{item.value}</div>
              <span className="text-sm opacity-90">{item.difference}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table of Ratings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Ratings Of Team Member</h2>

        {loading && (
          <p className="text-center text-blue-500">Loading, please wait...</p>
        )}

        {!loading && ratings?.length === 0 && (
          <p className="text-center">No ratings available.</p>
        )}

        {!loading && ratings?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse border-b border-gray-300/50">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="divide-x divide-gray-300/50 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  <th className="py-3 px-2">S.L</th>
                  <th className="py-3 px-2">Emp ID</th>
                  <th className="py-3 px-2">Employee Name</th>
                  <th className="py-3 px-2">Designation</th>
                  <th className="py-3 px-2">Average Rating</th>
                  <th className="py-3 px-2">Rated By</th>
                  <th className="py-3 px-2">Submitted On</th>
                  <th className="py-3 px-2">For YY/MM</th>
                  <th className="py-3 px-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300/50 text-gray-900 dark:text-gray-200">
                {ratings.map((rating, idx) => {
                  const { ratedTo, ratedBy } = rating;
                  return (
                    <tr
                      key={rating._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600 divide-x divide-gray-300/50"
                    >
                      <td className="py-2 px-2">
                        {String(
                          idx + 1 + (pagination.currentPage - 1) * 20
                        ).padStart(2, "0")}
                      </td>
                      <td className="py-2 px-2">
                        {ratedTo?.employee_Id || "N/A"}
                      </td>
                      <td className="py-2 px-2">
                        {ratedTo
                          ? `${ratedTo.first_Name} ${ratedTo.last_Name}`
                          : "N/A"}
                      </td>
                      <td className="py-2 px-2">
                        {ratedTo?.designation || "N/A"}
                      </td>
                      <td className="py-2 px-2">
                        {rating.averageRating || 0} / 5
                      </td>
                      <td className="py-2 px-2">
                        {ratedBy
                          ? `${ratedBy.first_Name} ${ratedBy.last_Name} (${ratedBy.employee_Id || "N/A"})`
                          : "N/A"}
                      </td>
                      <td className="py-2 px-2">
                        {rating.createdAt
                          ? new Date(rating.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-2">
                        {rating.year}/{rating.month}
                      </td>
                      <td className="py-2 px-2">
                        <button
                          onClick={() => openModal(rating)}
                          className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                        >
                          <AiOutlineEye className="mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {pagination?.totalPages > 1 && (
            <>
              {pagination.currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="px-3 py-1 border rounded"
                >
                  Prev
                </button>
              )}
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              {pagination.currentPage < pagination.totalPages && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="px-3 py-1 border rounded"
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Detailed Rating */}
      <AnimatePresence>
        {isModalOpen && selectedRating && (
          <AllEmpRatingsModal
            isOpen={isModalOpen}
            rating={selectedRating}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AllEmpRatings;

