// components/RateEmployee.jsx

import React, { useEffect, useState } from "react";
import useRatingStore from "../../store/useRatingNewStore";
import { toast } from "react-hot-toast";

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

function RateEmployee() {
  const {
    subordinates,
    fetchSubordinates,
    fetchKpiSet,
    kpiSet,
    createRating,
    loading,
    error,
  } = useRatingStore();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // For rating
  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState(""); // for daily
  const [year, setYear] = useState(""); // for weekly/monthly/yearly
  const [month, setMonth] = useState(""); // for monthly
  const [week, setWeek] = useState(""); // for weekly
  const [kpis, setKpis] = useState([]); // local copy of fetched KPI set to store scores/comments
  const [comment, setComment] = useState("");

  // On mount, fetch subordinates
  useEffect(() => {
    fetchSubordinates();
  }, [fetchSubordinates]);

  // Handle opening the rating modal
  const handleOpenModal = async (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
    // Reset form
    setFrequency("daily");
    setDate("");
    setYear("");
    setMonth("");
    setWeek("");
    setComment("");
    setKpis([]);
  };

  // Whenever frequency or selectedEmployee changes, fetch KPI set
  // (in real code, you'd let the user pick frequency first, then fetch)
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEmployee) return;
      try {
        const data = await fetchKpiSet(selectedEmployee.designation, frequency);
        // data structure: { ... kpis: [{kpiName, type, marks, target, ...}], version, ... }
        if (data) {
          // Initialize local kpis with a "score" + "comment" field
          const initialKpis = data.kpis.map((k) => ({
            ...k,
            score: 0,
            comment: "",
          }));
          setKpis(initialKpis);
        }
      } catch (err) {
        toast.error("No KPI Set found for this designation + frequency");
      }
    };

    if (showModal) {
      fetchData();
    }
  }, [selectedEmployee, frequency, showModal, fetchKpiSet]);

  // Compute total score
  const totalScore = kpis.reduce((acc, k) => acc + Number(k.score || 0), 0);

  // Submit rating
  const handleSubmitRating = async () => {
    if (!selectedEmployee) return;
    // Basic validations
    if (frequency === "daily" && !date) {
      toast.error("Please select a date for daily frequency");
      return;
    }
    if (frequency === "weekly" && (!year || !week)) {
      toast.error("Please select year & week");
      return;
    }
    if (frequency === "monthly" && (!year || !month)) {
      toast.error("Please select year & month");
      return;
    }
    if (frequency === "yearly" && !year) {
      toast.error("Please select year");
      return;
    }

    try {
      const payload = {
        employeeId: selectedEmployee._id,
        frequency,
        version: kpiSet?.version || 1,
        date: frequency === "daily" ? date : undefined,
        year: ["weekly", "monthly", "yearly"].includes(frequency) ? year : undefined,
        month: frequency === "monthly" ? month : undefined,
        week: frequency === "weekly" ? week : undefined,
        kpis: kpis.map((k) => ({
          kpiName: k.kpiName,
          type: k.type,
          score: Number(k.score),
          comment: k.comment,
        })),
        totalScore,
        comment,
      };
      await createRating(payload);
      toast.success("Rating submitted successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error");
    }
  };

  const groupedKpis = {
    formal: kpis.filter((k) => k.type === "formal"),
    informal: kpis.filter((k) => k.type === "informal"),
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rate Employees (One-by-One)</h2>

      {/* Error / Loading */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Subordinate list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subordinates.map((emp) => (
          <div
            key={emp._id}
            className="p-4 border border-gray-200 rounded shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <img
                src={emp.user_Avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {emp.first_Name} {emp.last_Name}
                </p>
                <p className="text-sm text-gray-500">
                  {emp.designation} - {emp.employee_Id}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal(emp)}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Rate
            </button>
          </div>
        ))}
      </div>

      {/* Modal for rating */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold mb-4">
              Rate {selectedEmployee.first_Name} {selectedEmployee.last_Name}
            </h3>

            {/* Frequency */}
            <div className="mb-2">
              <label className="block font-medium">Frequency</label>
              <select
                className="border p-2 w-full rounded"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                {FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>

            {/* Date pickers depending on frequency */}
            {frequency === "daily" && (
              <div className="mb-2">
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
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
                    placeholder="2025"
                  />
                </div>
                <div>
                  <label className="block font-medium">Week #</label>
                  <input
                    type="number"
                    className="border p-2 rounded w-full"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    placeholder="1-52"
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
                    placeholder="2025"
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
                  placeholder="2025"
                />
              </div>
            )}

            {/* KPI lists */}
            <div className="mt-4">
              <h4 className="font-semibold">Formal KPIs</h4>
              {groupedKpis.formal.length === 0 && (
                <p className="text-sm text-gray-500">No formal KPIs.</p>
              )}
              {groupedKpis.formal.map((k, idx) => (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <div className="w-1/3">
                    <p className="font-medium">{k.kpiName}</p>
                    <p className="text-sm text-gray-400">
                      Max: {k.marks} | Target: {k.target}
                    </p>
                  </div>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    value={k.score}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKpis((prev) =>
                        prev.map((p, i2) =>
                          i2 === idx && p.type === "formal"
                            ? { ...p, score: val }
                            : p
                        )
                      );
                    }}
                  />
                  <input
                    placeholder="Comment"
                    className="border rounded p-2 w-full"
                    value={k.comment}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKpis((prev) =>
                        prev.map((p, i2) =>
                          i2 === idx && p.type === "formal"
                            ? { ...p, comment: val }
                            : p
                        )
                      );
                    }}
                  />
                </div>
              ))}

              <h4 className="font-semibold mt-4">Informal KPIs</h4>
              {groupedKpis.informal.length === 0 && (
                <p className="text-sm text-gray-500">No informal KPIs.</p>
              )}
              {groupedKpis.informal.map((k, idx) => {
                // We need a separate index offset for the informal array
                const realIdx = kpis.indexOf(k);
                return (
                  <div
                    key={realIdx}
                    className="flex items-center space-x-2 my-2"
                  >
                    <div className="w-1/3">
                      <p className="font-medium">{k.kpiName}</p>
                      <p className="text-sm text-gray-400">Max: {k.marks}</p>
                    </div>
                    <input
                      type="number"
                      className="border rounded p-2 w-20"
                      value={k.score}
                      onChange={(e) => {
                        const val = e.target.value;
                        setKpis((prev) =>
                          prev.map((p, i2) =>
                            i2 === realIdx ? { ...p, score: val } : p
                          )
                        );
                      }}
                    />
                    <input
                      placeholder="Comment"
                      className="border rounded p-2 w-full"
                      value={k.comment}
                      onChange={(e) => {
                        const val = e.target.value;
                        setKpis((prev) =>
                          prev.map((p, i2) =>
                            i2 === realIdx ? { ...p, comment: val } : p
                          )
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Overall comment */}
            <div className="mt-4">
              <label className="block font-medium">Overall Comment</label>
              <textarea
                className="border p-2 w-full rounded"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Total Score & actions */}
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold">
                Total Score: <span className="text-indigo-600">{totalScore}</span>
              </p>
              <button
                onClick={handleSubmitRating}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateEmployee;
