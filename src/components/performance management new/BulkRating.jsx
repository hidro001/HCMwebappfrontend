
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils"; // your new utility
import useRatingStore from "../../store/useRatingNewStore";

function BulkRating() {
  const { generateBulkTemplate, uploadBulkRatings, loading, error } = useRatingStore();

  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [designation, setDesignation] = useState(""); // optional filter

  const [file, setFile] = useState(null);

  // We'll store the array of weeks for the chosen year + month
  const [availableWeeks, setAvailableWeeks] = useState([]);

  // Whenever year or month changes (and frequency = weekly), recalc the available weeks
  useEffect(() => {
    if (frequency === "weekly" && year && month) {
      // year is e.g. "2025", month is "05"
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10) - 1; // convert "05" => 4 for 0-based index
      if (yearNum > 0 && monthNum >= 0) {
        const weeksArr = getWeeksInMonth(yearNum, monthNum);
        setAvailableWeeks(weeksArr);
      }
    } else {
      setAvailableWeeks([]);
    }
  }, [frequency, year, month]);

  // Download template
  const handleDownloadTemplate = async () => {
    try {
      // Build query params
      let params = { frequency };

      if (frequency === "daily") {
        params.date = date;
      }

      if (frequency === "weekly") {
        // We store year & month & week
        // The backend expects: year, month, week => "2" for the second week in that month
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

      // res.data is an ArrayBuffer
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

  // Upload Excel
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      // extra fields if needed
      const res = await uploadBulkRatings(formData);
      toast.success(`Bulk ratings uploaded. Inserted: ${res.data.newCount || 0}, Updated: ${res.data.updatedCount || 0}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error uploading.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bulk Rating via Excel</h2>

      {loading && <p className="text-blue-500">Processing...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="border rounded p-4 mb-4">
        <h3 className="font-semibold mb-2">Select Rating Period</h3>

        {/* Frequency */}
        <div className="mb-2">
          <label className="block font-medium">Frequency</label>
          <select
            className="border p-2 rounded w-full"
            value={frequency}
            onChange={(e) => {
              setFrequency(e.target.value);
              // Reset fields
              setDate("");
              setYear("");
              setMonth("");
              setWeek("");
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Daily */}
        {frequency === "daily" && (
          <div className="mb-2">
            <label className="block font-medium">Date</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        {/* Weekly => Year, Month, then Week */}
        {frequency === "weekly" && (
          <>
            <div className="mb-2">
              <label className="block font-medium">Year</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                placeholder="e.g. 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block font-medium">Month</label>
              <select
                className="border p-2 rounded w-full"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => {
                  const m = i + 1;
                  return (
                    <option key={m} value={m.toString().padStart(2, "0")}>
                      {m} 
                    </option>
                  );
                })}
              </select>
            </div>

            {year && month && (
              <div className="mb-2">
                <label className="block font-medium">Week in {month}/{year}</label>
                <select
                  className="border p-2 rounded w-full"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                >
                  <option value="">Select Week</option>
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

        {/* Monthly => Year + Month */}
        {frequency === "monthly" && (
          <div className="flex space-x-2 mb-2">
            <div>
              <label className="block font-medium">Year</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Month</label>
              <select
                className="border p-2 rounded w-full"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => {
                  const m = i + 1;
                  return (
                    <option key={m} value={m.toString().padStart(2, "0")}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        {/* Yearly => Year */}
        {frequency === "yearly" && (
          <div className="mb-2">
            <label className="block font-medium">Year</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        )}

        {/* Optional designation filter */}
        <div className="mb-2">
          <label className="block font-medium">Designation (optional)</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="e.g. Full Stack Web Developer"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
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
          className={`mt-2 px-4 py-2 rounded text-white ${
            (frequency === "weekly" && (!year || !month || !week)) ||
            (frequency === "monthly" && (!year || !month)) ||
            (frequency === "yearly" && !year) ||
            (frequency === "daily" && !date)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Download Template
        </button>
      </div>

      {/* Upload */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Upload Filled Excel</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".xlsx, .xls"
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default BulkRating;
