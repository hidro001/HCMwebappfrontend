import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch, FaFilter } from "react-icons/fa";

import useAnnouncementStore from "../../store/announcementStore";
import AnnouncementDetailModal from "./model/AnnouncementDetailModal"; // path depends on your file structure

const SkeletonPlaceholder = ({ className }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md ${className}`}
  />
);

const ViewAnnouncements = () => {
  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncementsuser,
  } = useAnnouncementStore();

  // Detailed Announcement Dialog
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Infinite Scroll
  const [visibleCount, setVisibleCount] = useState(18); // initial # to display

  // Filters
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncementsuser();
  }, [fetchAnnouncementsuser]);

  // Search
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSortOrder("Newest");
    setSearchQuery("");
  };

  // Sort
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Card Click => Show detail dialog
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
  };

  // Filter + Sort logic
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((announcement) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          announcement.announcementSubject.toLowerCase().includes(q) ||
          announcement.announcementDescription.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "Newest") {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        } else {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        }
      });
  }, [announcements, searchQuery, sortOrder]);

  // Infinite Scroll
  const fetchMoreData = () => {
    if (visibleCount >= filteredAnnouncements.length) return;
    setTimeout(() => {
      setVisibleCount((prev) => prev + 18);
    }, 500);
  };

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [filteredAnnouncements, sortOrder, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          View Announcements
        </h1>
      </div>

      {/* Search, Sort, and Clear Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Search Bar */}
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <label htmlFor="searchBar" className="text-sm font-medium mb-1">
              Search
            </label>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-md px-2">
              <span className="text-gray-400 dark:text-gray-300 mr-2">
                <FaSearch />
              </span>
              <input
                id="searchBar"
                type="text"
                placeholder="Search Announcements"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="w-full bg-transparent focus:outline-none py-2 text-sm"
              />
            </div>
          </div>

          {/* Sort by Date */}
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <label htmlFor="sortOrder" className="text-sm font-medium mb-1">
              Sort by Date
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="w-full bg-white dark:bg-gray-700 
                   border border-gray-300 dark:border-gray-600 
                   rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="col-span-12 md:col-span-4 flex flex-col">
            {/* Invisible label for consistent vertical spacing */}
            <label className="invisible  text-sm font-medium">
              Clear Filters
            </label>
            <button
              onClick={handleClearFilters}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 
                   dark:text-gray-200 font-medium flex items-center 
                   justify-center space-x-2 hover:bg-gray-100 
                   dark:hover:bg-gray-600 text-sm"
            >
              <FaFilter />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Announcements List with Infinite Scroll */}
      <div>
        {announcementsLoading ? (
          // Skeleton loading placeholders
          <div className="grid grid-cols-1 gap-4">
            {Array.from(new Array(6)).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow"
              >
                <SkeletonPlaceholder className="w-full h-24 mb-4" />
                <SkeletonPlaceholder className="w-3/5 h-4 mb-2" />
                <SkeletonPlaceholder className="w-4/5 h-4" />
              </div>
            ))}
          </div>
        ) : announcementsError ? (
          <p className="text-center text-red-500">{announcementsError}</p>
        ) : filteredAnnouncements.length === 0 ? (
          <p className="text-center">
            No announcements found for the selected criteria.
          </p>
        ) : (
          <InfiniteScroll
            dataLength={visibleCount}
            next={fetchMoreData}
            hasMore={visibleCount < filteredAnnouncements.length}
            loader={
              <div className="flex justify-center my-4">
                {/* Tailwind-based spinner */}
                <div className="w-6 h-6 border-4 border-blue-500 dark:border-blue-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
            style={{ overflow: "visible" }}
          >
            {/* Wrap your cards in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnnouncements
                .slice(0, visibleCount)
                .map((announcement) => (
                  <motion.div
                    key={announcement._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCardClick(announcement)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 
                             cursor-pointer transform transition-transform 
                             hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Top: Image */}
                    <div className="w-full h-48 mb-3 rounded-md overflow-hidden">
                      {announcement.announcementPostImg ? (
                        <img
                          src={announcement.announcementPostImg}
                          alt={announcement.announcementSubject}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <SkeletonPlaceholder className="w-full h-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {announcement.updatedAt
                          ? new Date(
                              announcement.updatedAt
                            ).toLocaleString()
                          : ""}
                      </p>
                      <h2 className="font-semibold text-green-600 dark:text-green-400 truncate mb-1">
                        {announcement.announcementSubject}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {announcement.publish_for_all
                          ? "Department: All"
                          : `Department: ${announcement.department
                              .map((dept) => dept.department)
                              .join(", ")}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </InfiniteScroll>
        )}
      </div>

      {/* Modal: Use the separate AnnouncementDetailModal component */}
      <AnnouncementDetailModal
        isOpen={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default ViewAnnouncements;
