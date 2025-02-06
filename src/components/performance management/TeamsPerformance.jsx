

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Sub-components
import RateTable from "./RateTable";
import RatingsTable from "./RatingsTable";
import RateModal from "./model/RateModal";
import ViewRatingModal from "./model/ViewRatingModal";

// Import your Zustand store
import { useRatingStore } from "../../store/useRatingStore";

export default function TeamsPerformance() {
  // Tab state: "rate" or "ratings"
  const [activeTab, setActiveTab] = useState("rate");

  // Modal state
  const [showRateModal, setShowRateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Currently selected subordinate for rating
  const [selectedMember, setSelectedMember] = useState(null);
  // Currently selected rating item for detail view
  const [selectedRatingItem, setSelectedRatingItem] = useState(null);

  // ====== Get data and actions from Zustand store ======
  const {
    subordinates,
    loadingSubordinates,
    fetchSubordinates,
    subordinateRatings,
    loadingSubordinateRatings,
    fetchSubordinateRatings,
  } = useRatingStore();

  // fetch data when tab changes
  useEffect(() => {
    if (activeTab === "rate") {
      fetchSubordinates();
    } else {
      fetchSubordinateRatings();
    }
  }, [activeTab, fetchSubordinates, fetchSubordinateRatings]);

  // Handlers for opening modals
  const handleOpenRateModal = (member) => {
    setSelectedMember(member);
    setShowRateModal(true);
  };

  const handleOpenViewModal = (ratingItem) => {
    setSelectedRatingItem(ratingItem);
    setShowViewModal(true);
  };

  return (
    <div className=" px-4 py-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <div className=" mx-auto">
        {/* TAB SWITCH */}
        <div className="flex justify-center space-x-8 mb-8">
          <button
            onClick={() => setActiveTab("rate")}
            className={`px-4 py-2 rounded ${
              activeTab === "rate"
                ? "bg-purple-500 text-white dark:bg-purple-600"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Rate Team Member
          </button>
          <button
            onClick={() => setActiveTab("ratings")}
            className={`px-4 py-2 rounded ${
              activeTab === "ratings"
                ? "bg-purple-500 text-white dark:bg-purple-600"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Team Member Ratings
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "rate" && (
          <RateTable
            data={subordinates}  // from Zustand
            loading={loadingSubordinates}
            onRateClick={handleOpenRateModal}
          />
        )}
        {activeTab === "ratings" && (
          <RatingsTable
            data={subordinateRatings}  // from Zustand
            loading={loadingSubordinateRatings}
            onViewClick={handleOpenViewModal}
          />
        )}
      </div>

      {/* MODALS */}
      <RateModal
        show={showRateModal}
        onClose={() => setShowRateModal(false)}
        selectedMember={selectedMember}
      />

      <ViewRatingModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        ratingItem={selectedRatingItem}
      />
    </div>
  );
}
