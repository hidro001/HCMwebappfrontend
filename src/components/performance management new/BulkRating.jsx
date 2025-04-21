


import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils";
import useRatingStore from "../../store/useRatingNewStore";

// 1) Import the designation store
import useDesignationStore from "../../store/designationStore";

function BulkRating() {
  const { generateBulkTemplate, uploadBulkRatings, loading, error } = useRatingStore();

  // 2) Bring in designations from the store
  const {
    designations,
    loading: designationLoading,
    error: designationError,
    fetchDesignations,
  } = useDesignationStore();

  // 3) On mount, fetch designations
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // Figure out today's date for defaults
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0]; // e.g. "2025-04-21"
  const defaultYear = String(today.getFullYear());
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

  // Setup state with defaults
  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState(defaultDate);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [week, setWeek] = useState("");

  // 4) We'll store the selectedDesignation from the dropdown
  const [designation, setDesignation] = useState("");

  // For file upload
  const [file, setFile] = useState(null);

  // Store the array of weeks for the chosen year+month
  const [availableWeeks, setAvailableWeeks] = useState([]);

  // Whenever frequency=weekly & year & month are set, re-calc available weeks
  useEffect(() => {
    if (frequency === "weekly" && year && month) {
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10) - 1;
      if (yearNum > 0 && monthNum >= 0) {
        const weeksArr = getWeeksInMonth(yearNum, monthNum);

        // Attempt to find which week "today" falls into
        const foundWeek = weeksArr.find((w) => {
          return today >= w.startDate && today <= w.endDate;
        });

        setWeek(foundWeek ? foundWeek.value : weeksArr[0]?.value || "");
        setAvailableWeeks(weeksArr);
      }
    } else {
      setAvailableWeeks([]);
    }
  }, [frequency, year, month]);

  // When frequency changes, reset appropriate fields
  const handleFrequencyChange = (e) => {
    const newFreq = e.target.value;
    setFrequency(newFreq);

    if (newFreq === "daily") {
      setDate(defaultDate);
    } else if (newFreq === "weekly") {
      setYear(defaultYear);
      setMonth(defaultMonth);
      setWeek("");
    } else if (newFreq === "monthly") {
      setYear(defaultYear);
      setMonth(defaultMonth);
    } else if (newFreq === "yearly") {
      setYear(defaultYear);
    }
  };

  // Download template
  const handleDownloadTemplate = async () => {
    try {
      let params = { frequency };

      if (frequency === "daily") {
        params.date = date;
      }
      if (frequency === "weekly") {
        params.year = year;
        params.month = month;
        params.week = week;
      }
      if (frequency === "monthly") {
        params.year = year;
        params.month = month;
      }
      if (frequency === "yearly") {
        params.year = year;
      }

      // If a designation is chosen (not empty), send it
      if (designation) {
        params.designation = designation;
      }

      const res = await generateBulkTemplate(params);

      // res.data is an ArrayBuffer for Excel
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bulk_rating_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Template downloaded!");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error");
    }
  };

  // Upload filled Excel
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadBulkRatings(formData);
      toast.success(
        `Bulk ratings uploaded. Inserted: ${res.data.newCount || 0}, Updated: ${
          res.data.updatedCount || 0
        }`
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error uploading.");
    }
  };

  // If designations are still loading, show a spinner or text
  if (designationLoading) {
    return <p className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">Loading designations...</p>;
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Bulk Rating via Excel</h2>

      {loading && <p className="text-blue-500">Processing...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* If there's a designation error, show it (optional) */}
      {designationError && (
        <p className="text-red-500 mb-2">Error fetching designations: {designationError}</p>
      )}

      {/* Rating Period Box */}
      <div className="border border-gray-200 dark:border-gray-700 rounded p-4 mb-4 bg-white dark:bg-gray-800">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Select Rating Period</h3>

        {/* Frequency */}
        <div className="mb-2">
          <label className="block font-medium mb-1">Frequency</label>
          <select
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                       bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            value={frequency}
            onChange={handleFrequencyChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Daily fields */}
        {frequency === "daily" && (
          <div className="mb-2">
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                         bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        {/* Weekly fields => Year, Month, then Week */}
        {frequency === "weekly" && (
          <>
            <div className="mb-2">
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                           bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                placeholder="e.g. 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium mb-1">Month</label>
              <select
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                           bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => {
                  const m = i + 1;
                  return (
                    <option key={m} value={String(m).padStart(2, "0")}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Only show "Week" dropdown if we have data */}
            {availableWeeks.length > 0 && (
              <div className="mb-2">
                <label className="block font-medium mb-1">
                  Week in {month}/{year}
                </label>
                <select
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                             bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                >
                  {availableWeeks.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {/* Monthly fields => Year + Month */}
        {frequency === "monthly" && (
          <div className="flex space-x-2 mb-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                           bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Month</label>
              <select
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                           bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => {
                  const m = i + 1;
                  return (
                    <option key={m} value={String(m).padStart(2, "0")}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        {/* Yearly fields => Year */}
        {frequency === "yearly" && (
          <div className="mb-2">
            <label className="block font-medium mb-1">Year</label>
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                         bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        )}

        {/* Designation (optional) */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Designation (optional)</label>
          <select
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full
                       bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">-- All --</option>
            {designations.map((d) => (
              <option key={d.id || d._id} value={d.designation}>
                {d.designation}
              </option>
            ))}
          </select>
        </div>

        {/* Download Template Button */}
        <button
          onClick={handleDownloadTemplate}
          disabled={
            (frequency === "weekly" && (!year || !month || !week)) ||
            (frequency === "monthly" && (!year || !month)) ||
            (frequency === "yearly" && !year) ||
            (frequency === "daily" && !date)
          }
          className={`
            mt-2 px-4 py-2 rounded text-white transition-colors
            ${
              (frequency === "weekly" && (!year || !month || !week)) ||
              (frequency === "monthly" && (!year || !month)) ||
              (frequency === "yearly" && !year) ||
              (frequency === "daily" && !date)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            }
          `}
        >
          Download Template
        </button>
      </div>

      {/* Upload Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Upload Filled Excel</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".xlsx, .xls"
          className="mb-2 
                     text-gray-800 dark:text-gray-100
                     file:bg-gray-200 dark:file:bg-gray-700 
                     file:text-gray-600 dark:file:text-gray-200 
                     file:px-4 file:py-2 file:rounded file:border-none
                     hover:file:cursor-pointer"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600
                     text-white rounded transition-colors"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default BulkRating;
