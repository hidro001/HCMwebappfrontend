// components/BulkRating.jsx

import React, { useState } from "react";
import useRatingStore from "../../store/useRatingNewStore";
import { toast } from "react-hot-toast";

function BulkRating() {
  const { generateBulkTemplate, uploadBulkRatings, loading, error } = useRatingStore();

  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [designation, setDesignation] = useState(""); // optional filter

  const [file, setFile] = useState(null);

  // Download template
  const handleDownloadTemplate = async () => {
    try {
      // Build query params
      let params = { frequency };
      if (frequency === "daily") params.date = date;
      if (["weekly", "monthly", "yearly"].includes(frequency)) params.year = year;
      if (frequency === "monthly") params.month = month;
      if (frequency === "weekly") params.week = week;
      if (designation) params.designation = designation;

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
      toast.success(`Bulk ratings uploaded. Inserted: ${res.data.insertedCount}`);
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
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Inputs by frequency */}
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
        {frequency === "weekly" && (
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
              <label className="block font-medium">Week #</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
              />
            </div>
          </div>
        )}
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

        <button
          onClick={handleDownloadTemplate}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Download Template
        </button>
      </div>

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
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default BulkRating;
