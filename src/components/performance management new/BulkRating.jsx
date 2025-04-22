


import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils";
import useRatingStore from "../../store/useRatingNewStore";
import useDesignationStore from "../../store/designationStore";

// Import icons from react-icons
import {
  FiCalendar as Calendar,
  FiDownload as Download,
  FiUpload as Upload,
  FiCalendar as CalendarIcon,
  FiChevronDown as ChevronDown,
  FiArrowUpCircle as ArrowUpCircle,
  FiClock as Clock,
} from "react-icons/fi";

import { FaFileExcel as FileSpreadsheet } from "react-icons/fa";

function BulkRating() {
  const { generateBulkTemplate, uploadBulkRatings, loading, error } = useRatingStore();
  const {
    designations,
    loading: designationLoading,
    error: designationError,
    fetchDesignations,
  } = useDesignationStore();

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // Date defaults
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];
  const defaultYear = String(today.getFullYear());
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

  // State management
  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState(defaultDate);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [week, setWeek] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState(null);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [fileName, setFileName] = useState("No file selected");

  // Calculate available weeks when frequency, year, and month change
  useEffect(() => {
    if (frequency === "weekly" && year && month) {
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10) - 1;
      if (yearNum > 0 && monthNum >= 0) {
        const weeksArr = getWeeksInMonth(yearNum, monthNum);

        const foundWeek = weeksArr.find((w) => {
          return today >= w.startDate && today <= w.endDate;
        });

        setWeek(foundWeek ? foundWeek.value : weeksArr[0]?.value || "");
        setAvailableWeeks(weeksArr);
      }
    } else {
      setAvailableWeeks([]);
    }
  }, [frequency, year, month, today]);

  // Handle frequency change
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

      if (designation) {
        params.designation = designation;
      }

      const res = await generateBulkTemplate(params);
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

      toast.success("Template downloaded successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Error downloading template"
      );
    }
  };

  // Upload filled Excel
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload");
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
      setFile(null);
      setFileName("No file selected");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error uploading file");
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Check if download button should be disabled
  const isDownloadDisabled =
    (frequency === "weekly" && (!year || !month || !week)) ||
    (frequency === "monthly" && (!year || !month)) ||
    (frequency === "yearly" && !year) ||
    (frequency === "daily" && !date);

  // Get month name
  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(monthNumber, 10) - 1];
  };

  if (designationLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-950 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading designations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-2xl">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bulk Ratings Manager</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Generate and upload employee ratings in bulk
            </p>
          </div>
          <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <FileSpreadsheet size={28} className="text-white" />
          </div>
        </div>

        {loading && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md flex items-center">
            <div className="animate-spin mr-2">
              <Clock size={20} />
            </div>
            <span>Processing your request...</span>
          </div>
        )}

        {designationError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            Error fetching designations: {designationError}
          </div>
        )}

        {/* Main content - Side by side cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card - Download Template */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center space-x-2">
                <Download className="text-blue-600 dark:text-blue-400" size={20} />
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Download Template
                </h3>
              </div>
            </div>

            <div className="p-6">
              {/* Frequency Selection */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Frequency
                </label>
                <div className="relative">
                  <select
                    className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Dynamic Form Fields based on Frequency */}
              <div className="space-y-4">
                {/* Daily fields */}
                {frequency === "daily" && (
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <CalendarIcon size={18} className="text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Weekly fields */}
                {frequency === "weekly" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Year
                        </label>
                        <input
                          type="number"
                          className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="e.g. 2025"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Month
                        </label>
                        <div className="relative">
                          <select
                            className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option value="">Select Month</option>
                            {[...Array(12)].map((_, i) => {
                              const m = i + 1;
                              return (
                                <option key={m} value={String(m).padStart(2, "0")}>
                                  {getMonthName(m)}
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {availableWeeks.length > 0 && (
                      <div>
                        <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Week in {getMonthName(month)} {year}
                        </label>
                        <div className="relative">
                          <select
                            className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={week}
                            onChange={(e) => setWeek(e.target.value)}
                          >
                            {availableWeeks.map((w) => (
                              <option key={w.value} value={w.value}>
                                {w.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Monthly fields */}
                {frequency === "monthly" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Year
                      </label>
                      <input
                        type="number"
                        className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Month
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          <option value="">Select Month</option>
                          {[...Array(12)].map((_, i) => {
                            const m = i + 1;
                            return (
                              <option key={m} value={String(m).padStart(2, "0")}>
                                {getMonthName(m)}
                              </option>
                            );
                          })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Yearly fields */}
                {frequency === "yearly" && (
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Year
                    </label>
                    <input
                      type="number"
                      className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                )}

                {/* Designation Dropdown */}
                <div>
                  <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Designation{" "}
                    <span className="text-gray-500 dark:text-gray-400 text-sm">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      className="appearance-none w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                      <option value="">-- All Designations --</option>
                      {designations.map((d) => (
                        <option key={d.id || d._id} value={d.designation}>
                          {d.designation}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Template Button */}
              <button
                onClick={handleDownloadTemplate}
                disabled={isDownloadDisabled}
                className={`
                  mt-8 w-full flex items-center justify-center py-3 px-6 rounded-lg text-white text-lg transition-all
                  ${
                    isDownloadDisabled
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  }
                `}
              >
                <Download size={20} className="mr-2" />
                Download Template
              </button>
            </div>
          </div>

          {/* Right Card - Upload Template */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center space-x-2">
                <Upload className="text-green-600 dark:text-green-400" size={20} />
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Upload Filled Template
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-4 flex-grow flex items-center justify-center">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-all w-full h-full flex flex-col items-center justify-center">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="mb-4 h-20 w-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                      <ArrowUpCircle size={32} />
                    </div>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {file ? "Change File" : "Choose Excel File"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {file ? fileName : "Click to browse your files"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supported formats: .xlsx, .xls
                    </p>
                  </label>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file}
                className={`
                  w-full flex items-center justify-center py-3 px-6 rounded-lg text-white text-lg transition-all
                  ${
                    !file
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 dark:from-green-500 dark:to-teal-500 dark:hover:from-green-600 dark:hover:to-teal-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  }
                `}
              >
                <Upload size={20} className="mr-2" />
                Upload Ratings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkRating;