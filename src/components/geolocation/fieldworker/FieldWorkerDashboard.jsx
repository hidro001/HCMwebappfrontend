import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaUserAlt,
  FaBriefcase,
  FaBuilding,
  FaUserShield,
  FaMapMarkerAlt,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from 'react-icons/fa';
import { getFieldworkers } from '../../../service/geolocationServices';
import ViewLiveLocation from './ViewLiveLocation';
import LocationHistory from './LocationHistory';

const Fieldworker = () => {
  const [fieldworkers, setFieldworkers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [goToPageValue, setGoToPageValue] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add search query state

  // Modal states for live location and history
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [selectedFieldworker, setSelectedFieldworker] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedHistoryFieldworker, setSelectedHistoryFieldworker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFieldworkers(page, limit, searchQuery); // Pass searchQuery
        if (response.success) {
          setFieldworkers(response.data);
          setTotalPages(response.pagination.totalPages);
          setTotalCount(response.pagination.totalCount);
        }
      } catch (error) {
        console.error('Error fetching fieldworkers:', error);
      }
    };
    fetchData();
  }, [page, limit, searchQuery]); // Trigger re-fetch when searchQuery changes

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleGoToPage = () => {
    const targetPage = parseInt(goToPageValue, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      setPage(targetPage);
    }
    setGoToPageValue('');
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Handlers for modal opening/closing
  const handleViewLocation = (fw) => {
    setSelectedFieldworker(fw);
    setIsLiveModalOpen(true);
  };

  const handleViewHistory = (fw) => {
    setSelectedHistoryFieldworker(fw);
    setIsHistoryModalOpen(true);
  };

  const handleCloseLiveModal = () => {
    setIsLiveModalOpen(false);
    setSelectedFieldworker(null);
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedHistoryFieldworker(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 p-4">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="text-3xl text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold">Fieldworker List</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Employee ID, First Name or Last Name"
          className="px-4 py-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Pagination Controls (top) */}
      <div className="flex items-center flex-wrap mb-4 gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Items per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="
              border border-gray-300 rounded px-2 py-1
              dark:bg-gray-800 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="text-sm">
          <strong>Total:</strong> {totalCount}
        </div>
      </div>

      {/* Fieldworker Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Sr No</th>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fieldworkers && fieldworkers.length > 0 ? (
              fieldworkers.map((fw, index) => {
                const fullName = `${fw.first_Name || ''} ${fw.last_Name || ''}`.trim() || 'N/A';
                return (
                  <tr key={fw._id} className="border-t border-gray-300 dark:border-gray-600">
                    <td className="px-4 py-2 text-center">{(page - 1) * limit + index + 1}</td> {/* Sr No */}
                    <td className="px-4 py-2 text-center">
                      {fw.user_Avatar ? (
                        <img
                          src={fw.user_Avatar}
                          alt={fullName}
                          className="w-12 h-12 object-cover rounded-full mx-auto"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center mx-auto bg-gray-200 dark:bg-gray-600 rounded-full">
                          <FaUserAlt className="text-gray-500 dark:text-gray-300 text-2xl" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">{fullName}</td>
                    <td className="px-4 py-2">{fw.designation || 'N/A'}</td>
                    <td className="px-4 py-2">{fw.department || 'N/A'}</td>
                    <td className="px-4 py-2">{fw.user_Role || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleViewLocation(fw)}
                        className="text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded shadow transition-colors"
                      >
                        <FaMapMarkerAlt />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleViewHistory(fw)}
                        className="text-white bg-green-600 hover:bg-green-700 py-1 px-3 rounded shadow transition-colors ml-2"
                      >
                        <FaHistory />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-600 dark:text-gray-400 py-4">
                  No fieldworkers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination: Prev, Next, Go To Page */}
      <div className="flex flex-wrap items-center justify-center mt-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1}
          className="
            flex items-center gap-1
            bg-gray-300 dark:bg-gray-700
            text-black dark:text-white
            py-2 px-4
            rounded shadow
            disabled:opacity-50
            transition-colors
            hover:bg-gray-400 dark:hover:bg-gray-600
          "
        >
          <FaChevronLeft />
          Prev
        </button>

        <div className="text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>

        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="
            flex items-center gap-1
            bg-gray-300 dark:bg-gray-700
            text-black dark:text-white
            py-2 px-4
            rounded shadow
            disabled:opacity-50
            transition-colors
            hover:bg-gray-400 dark:hover:bg-gray-600
          "
        >
          Next
          <FaChevronRight />
        </button>

        {/* "Go to page" */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPageValue}
            onChange={(e) => setGoToPageValue(e.target.value)}
            placeholder="Go to page..."
            className="
              w-24 border border-gray-300 rounded
              px-2 py-1 dark:bg-gray-800 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          />
          <button
            onClick={handleGoToPage}
            className="
              flex items-center gap-1
              bg-blue-600 hover:bg-blue-700
              text-white py-2 px-4
              rounded shadow
              transition-colors
            "
          >
            <FaSearch />
            Go
          </button>
        </div>
      </div>

      {/* Modals for Live Location and Location History */}
      {isLiveModalOpen && (
        <ViewLiveLocation onClose={handleCloseLiveModal} fieldworker={selectedFieldworker} />
      )}
      {isHistoryModalOpen && (
        <LocationHistory onClose={handleCloseHistoryModal} fieldworker={selectedHistoryFieldworker} />
      )}
    </div>
  );
};

export default Fieldworker;
