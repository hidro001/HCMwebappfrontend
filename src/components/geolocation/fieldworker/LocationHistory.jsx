import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaListUl,
  FaClock,
  FaMapMarkerAlt,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Import our helper



import { getAddressFromNominatim } from "../../../utils/nominatimService";
import axiosInstance from "../../../service/axiosInstance";



const baseUrl=import.meta.env.VITE_API_BASE_URL



const LocationHistory = ({ onClose, fieldworker }) => {
  // State for date
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // State to store fetched history
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State to cache addresses for lat/lon
  // Keyed by "lat,lon" => "Address string"
  const [addressCache, setAddressCache] = useState({});

  // Helper to fetch data from backend
  const fetchHistory = async (date, page, limit) => {
    setLoading(true);
    setError(null);
  
   
    const employeeId = fieldworker?.employee_Id;
    
    if ( !employeeId) {
      setError("fieldworker information.");
      setLoading(false);
      return;
    }
  
  
    try {
      const response = await axiosInstance.get("/geolocation/fieldworker/history", {
        params: {
          // accessToken: token,
          employee_Id: employeeId,
          date: date,
          page: page,
          limit: limit,
        },
      });
  
      if (response.data.success) {
        setHistory(response.data.data || []);
        const {
          totalCount = 0,
          totalPages = 1,
          currentPage = 1,
        } = response.data.pagination || {};
  
        setTotalCount(totalCount);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      } else {
        setError(response.data.message || "Failed to fetch history.");
      }
    } catch (err) {
      console.error("Error fetching location history:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // Fetch on mount or when fieldworker changes
  useEffect(() => {
    if (fieldworker) {
      setCurrentPage(1);
      fetchHistory(selectedDate, 1, itemsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldworker]);

  // Once we have new history data, fetch addresses for each coordinate
  useEffect(() => {
    if (history.length > 0) {
      (async () => {
        const newAddressCache = { ...addressCache };

        // Loop through each record and fetch address if we don’t have it already
        for (const record of history) {
          const lat = record.coordinates[1];
          const lon = record.coordinates[0];
          const key = `${lat},${lon}`;

          // If we haven't cached this coordinate yet, fetch from Nominatim
          if (!newAddressCache[key]) {
            const address = await getAddressFromNominatim(lat, lon);
            newAddressCache[key] = address;
          }
        }

        // Update cache in state
        setAddressCache(newAddressCache);
      })();
    }
  }, [history]);

  // If the user changes the date, fetch the new date, reset to page 1
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setCurrentPage(1);
    fetchHistory(newDate, 1, itemsPerPage);
  };

  // Handle items-per-page change
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    fetchHistory(selectedDate, 1, newLimit);
  };

  // Handle next/previous clicks
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchHistory(selectedDate, newPage, itemsPerPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchHistory(selectedDate, newPage, itemsPerPage);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black bg-opacity-50
        dark:bg-gray-900 dark:bg-opacity-70
        text-sm font-sans
      "
    >
      {/* The modal container is now 80% width */}
      <div
        className="
          relative
          w-4/5
          m-4 md:m-8
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          rounded shadow-lg
          flex flex-col
        "
        style={{ maxHeight: "90vh" }}
      >
        {/* Header row */}
        <div
          className="
            flex justify-between items-center
            px-4 py-3
            border-b border-gray-200 dark:border-gray-700
          "
        >
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FaGlobe />
            Location History
          </h2>
          <button
            onClick={onClose}
            className="
              bg-red-600 hover:bg-red-700
              text-white
              py-2 px-3
              rounded flex items-center gap-1
            "
          >
            <FaTimes />
            Close
          </button>
        </div>

        {/* Main content scrollable area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Fieldworker info */}
          <div className="mb-4 text-xl font-semibold flex items-center gap-3">
            <FaListUl className="text-blue-600" />
            {fieldworker
              ? `${fieldworker.first_Name} ${fieldworker.last_Name}`
              : "No Fieldworker Selected"}
          </div>

          {/* Date & Items per page selectors */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <label className="font-medium">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  rounded px-2 py-1
                  focus:outline-none focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400
                "
              />
            </div>

            <div className="flex items-center gap-2">
              <FaListUl className="text-green-600" />
              <label className="font-medium">Items per page:</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  rounded px-2 py-1
                  focus:outline-none focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400
                "
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Loading / Error states */}
          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 my-4">
              Loading...
            </p>
          )}
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}

          {/* History List */}
          {history.length > 0 ? (
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
              {history.map((record, index) => {
                const lat = record.coordinates[1];
                const lon = record.coordinates[0];
                const key = `${lat},${lon}`;
                const address = addressCache[key] || "Fetching address...";

                return (
                  <li key={index} className="py-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-blue-500" />
                      <strong>Time:</strong>
                      <span>{new Date(record.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-green-600" />
                      <strong>Coordinates:</strong>
                      <span>{lat}, {lon}</span>
                    </div>
                    {/* Display the resolved address */}
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-green-600" />
                      <strong>Address:</strong>
                      <span>{address}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            !loading && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No location history available for this date.
              </p>
            )
          )}
        </div>

        {/* Pagination Controls */}
        <div
          className="
            flex items-center justify-center
            p-4
            border-t border-gray-200 dark:border-gray-700
            gap-6
          "
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="
              bg-gray-200 dark:bg-gray-700
              hover:bg-gray-300 dark:hover:bg-gray-600
              text-black dark:text-white
              py-1 px-3
              rounded
              disabled:opacity-50
              flex items-center gap-1
            "
          >
            <FaChevronLeft />
            Prev
          </button>
          <span className="text-sm">
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{totalPages || 1}</strong> (Total: {totalCount})
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="
              bg-gray-200 dark:bg-gray-700
              hover:bg-gray-300 dark:hover:bg-gray-600
              text-black dark:text-white
              py-1 px-3
              rounded
              disabled:opacity-50
              flex items-center gap-1
            "
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationHistory;
