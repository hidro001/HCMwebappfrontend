
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaFilter } from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAnnouncementStore from "../../store/announcementStore";
import useDepartmentStore from "../../store/departmentStore";

// Modals
import AnnouncementDetailModal from "./model/AnnouncementDetailModal";
import AnnouncementEditModal from "./model/AnnouncementEditModal";
import AnnouncementAddModal from "./model/AnnouncementAddModal";
import ConfirmationDialog from "../common/ConfirmationDialog"; // For delete confirm
import FullScreenLoader from "../common/FullScreenLoader";      // Our new loader

const MakeAnnouncement = () => {
  const navigate = useNavigate();

  // -------------------- Store Hooks --------------------
  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncements,
    deleteAnnouncement, 
    // (addAnnouncement and updateAnnouncement are used inside the modals now)
  } = useAnnouncementStore();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments,
  } = useDepartmentStore();

  // -------------------- Local UI State --------------------
  // Add Modal
  const [openAddModal, setOpenAddModal] = useState(false);

  // Edit Modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  // Detail Modal
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Confirmation for DELETE
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // **Loader** for Delete
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Infinite Scroll
  const [visibleCount, setVisibleCount] = useState(18);

  // Filters
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------- Effects --------------------
  useEffect(() => {
    fetchDepartments();
    fetchAnnouncements();
  }, [fetchDepartments, fetchAnnouncements]);

  // Reset visible count whenever filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [filterDepartment, sortOrder, searchQuery]);

  // -------------------- Delete Handler --------------------
  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: "Delete Announcement",
      message: "Are you sure you want to delete this announcement?",
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await deleteAnnouncement(id);
          toast.success("Announcement deleted successfully!");
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete announcement.");
        } finally {
          setConfirmDialog((prev) => ({ ...prev, open: false }));
          setDeleteLoading(false);
        }
      },
    });
  };

  // -------------------- Detail Modal Handler --------------------
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
  };

  // -------------------- Edit Modal Handlers --------------------
  const handleOpenEditModal = (announcement) => {
    setCurrentAnnouncement({
      ...announcement,
      publishForAll: announcement.publish_for_all,
      selectedDepartments: announcement.publish_for_all
        ? []
        : announcement.department.map((dept) => dept._id),
      announcementPostImgUrl: announcement.announcementPostImg,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentAnnouncement(null);
  };

  // -------------------- Filters & Sorting --------------------
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleClearFilters = () => {
    setFilterDepartment("All");
    setSortOrder("Newest");
    setSearchQuery("");
  };
  const handleFilterDepartmentChange = (e) => setFilterDepartment(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((ann) => {
        // Department filter
        if (filterDepartment === "All") return true;
        // If publish_for_all is true, skip it if filter != "All"
        if (ann.publish_for_all) return false;
        return ann.department?.some((dept) => dept._id === filterDepartment);
      })
      .filter((ann) => {
        // Search
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          ann.announcementSubject.toLowerCase().includes(q) ||
          ann.announcementDescription.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        // Sort by date
        if (sortOrder === "Newest") {
          return new Date(b.announcementDate) - new Date(a.announcementDate);
        }
        return new Date(a.announcementDate) - new Date(b.announcementDate);
      });
  }, [announcements, filterDepartment, sortOrder, searchQuery]);

  // -------------------- Infinite Scroll --------------------
  const fetchMoreData = () => {
    if (visibleCount >= filteredAnnouncements.length) return;
    setTimeout(() => {
      setVisibleCount((prev) => prev + 18);
    }, 500);
  };

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors">
      {/* If currently deleting, show our full-screen loader */}
      {deleteLoading && <FullScreenLoader />}

      {/* Header + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          Manage Announcements
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenAddModal(true)}
          className="flex items-center bg-yellow-600 text-indigo-800 
                     px-4 py-2 rounded-md font-semibold hover:bg-yellow-500"
        >
          <FaPlus className="mr-2" />
          Add Announcement
        </motion.button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
    
    {/* Search */}
    <div className="col-span-12 md:col-span-4 flex flex-col">
      <label className="text-sm font-medium mb-1">Search</label>
      <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-md px-2">
        <FaSearch className="text-gray-400 dark:text-gray-300 mr-2" />
        <input
          type="text"
          placeholder="Search Announcements"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="w-full bg-transparent focus:outline-none py-2 text-sm"
        />
      </div>
    </div>
    
    {/* Filter by Department */}
    <div className="col-span-12 md:col-span-3 flex flex-col">
      <label className="text-sm font-medium mb-1">Filter by Department</label>
      <select
        value={filterDepartment}
        onChange={handleFilterDepartmentChange}
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md px-3 py-2 text-sm 
                   focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="All">All Departments</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.department}
          </option>
        ))}
      </select>
    </div>
    
    {/* Sort by Date */}
    <div className="col-span-12 md:col-span-3 flex flex-col">
      <label className="text-sm font-medium mb-1">Sort by Date</label>
      <select
        value={sortOrder}
        onChange={handleSortOrderChange}
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md px-3 py-2 text-sm 
                   focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
    
    {/* Clear Filters */}
    <div className="col-span-12 md:col-span-2 flex flex-col">
      {/* Hidden label so spacing is consistent */}
      <label className="invisible ">Clear</label>
      <button
        onClick={handleClearFilters}
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md px-2 py-2 text-gray-700 
                   dark:text-gray-200 font-medium flex items-center 
                   justify-center space-x-2 hover:bg-gray-100 
                   dark:hover:bg-gray-600 text-sm "
      >
        <FaFilter />
        <span>Clear Filters</span>
      </button>
    </div>

  </div>
</div>


      {/* Announcements List + Infinite Scroll */}
      <div>
        {/* Loading State */}
        {announcementsLoading && (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow space-y-3"
              >
                <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                <div className="w-3/5 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {announcementsError && !announcementsLoading && (
          <p className="text-center text-red-500">{announcementsError}</p>
        )}

        {/* No Results */}
        {!announcementsLoading &&
          !announcementsError &&
          filteredAnnouncements.length === 0 && (
            <p className="text-center">No announcements found.</p>
          )}

        {/* Data */}
        {!announcementsLoading &&
          !announcementsError &&
          filteredAnnouncements.length > 0 && (
            <InfiniteScroll
              dataLength={visibleCount}
              next={fetchMoreData}
              hasMore={visibleCount < filteredAnnouncements.length}
              loader={
                <div className="flex justify-center my-4">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              }
              style={{ overflow: "visible" }}
            >
              {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
                <motion.div
                  key={announcement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4 
                             flex flex-col md:flex-row items-start md:items-center 
                             justify-between transform hover:-translate-y-1 
                             hover:shadow-lg transition"
                >
                  {/* Left: Image & Subject */}
                  <div
                    onClick={() => handleCardClick(announcement)}
                    className="flex items-start cursor-pointer"
                  >
                    <div className="w-24 h-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
                      {announcement.announcementPostImg ? (
                        <img
                          src={announcement.announcementPostImg}
                          alt={announcement.announcementSubject}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      )}
                    </div>

                    <div>
                      {/* Using createdAt to show real date/time */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {announcement.createdAt
                          ? new Date(announcement.createdAt).toLocaleString()
                          : ""}
                      </p>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {announcement.announcementSubject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                        Department:{" "}
                        {announcement.publish_for_all
                          ? "All"
                          : announcement.department
                              .map((dept) => dept.department)
                              .join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Right: Edit / Delete Buttons */}
                  <div className="flex mt-4 md:mt-0 space-x-2 md:space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(announcement);
                      }}
                      className="flex items-center bg-yellow-600 text-white
                                 px-3 py-2 rounded-md font-medium hover:bg-yellow-500"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(announcement._id);
                      }}
                      className="flex items-center bg-red-600 text-white
                                 px-3 py-2 rounded-md font-medium hover:bg-red-500"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </InfiniteScroll>
          )}
      </div>

      {/* --------------------------- Add Announcement Modal --------------------------- */}
      <AnnouncementAddModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        departments={departments}
      />

      {/* --------------------------- Edit Announcement Modal --------------------------- */}
      <AnnouncementEditModal
        isOpen={openEditModal}
        onClose={handleCloseEditModal}
        currentAnnouncement={currentAnnouncement}
        departments={departments}
      />

      {/* --------------------------- Confirmation Dialog (DELETE) --------------------------- */}
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
      />

      {/* --------------------------- Detailed Announcement Modal --------------------------- */}
      <AnnouncementDetailModal
        isOpen={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default MakeAnnouncement;

