import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";

import useAnnouncementStore from "../../store/announcementStore";
import AnnouncementDetailModal from "./model/AnnouncementDetailModal"; // adjust path if needed

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

  // Pagination: Fixed 10 items per page
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);

  // Filters
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncementsuser();
  }, [fetchAnnouncementsuser]);

  // Update search query
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

  // Clear Filters
  const handleClearFilters = () => {
    setSortOrder("Newest");
    setSearchQuery("");
  };

  // Update sort order
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  // Card click handler to show detail modal
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
  };

  // Filter and sort announcements
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

  // Pagination calculations
  const totalResults = filteredAnnouncements.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(pageInput, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Keep pageInput in sync with currentPage
  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-6">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          View Announcements
        </h1>
      </div>

      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          
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

          
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <label htmlFor="sortOrder" className="text-sm font-medium mb-1">
              Sort by Date
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>

          
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <label className="invisible text-sm font-medium">
              Clear Filters
            </label>
            <button
              onClick={handleClearFilters}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 font-medium flex items-center justify-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
            >
              <FaFilter />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      
      <div>
        {announcementsLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAnnouncements.map((announcement) => (
              <motion.div
                key={announcement._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(announcement)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
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
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {announcement.updatedAt
                      ? new Date(announcement.updatedAt).toLocaleString()
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
        )}
      </div>

      
      {!announcementsLoading &&
        !announcementsError &&
        filteredAnnouncements.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              {totalResults > 0
                ? `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${
                    currentPage * itemsPerPage > totalResults
                      ? totalResults
                      : currentPage * itemsPerPage
                  } of ${totalResults} entries`
                : "Showing 0 to 0 of 0 entries"}
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Prev
              </button>
              <div className="flex items-center space-x-2">
                <span>Page</span>
                <input
                  type="number"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  className="w-16 text-center border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  min="1"
                  max={totalPages}
                />
                <span>of {totalPages}</span>
                <button
                  onClick={handleGoToPage}
                  className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Go
                </button>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

      
      <AnnouncementDetailModal
        isOpen={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default ViewAnnouncements;
