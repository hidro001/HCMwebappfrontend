

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils";
import useRatingStore from "../../store/useRatingNewStore";

// 1) Import the new modal component
import RatingModal from "./modal/RatingModal";

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

  // Default date/time
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];
  const defaultYear = String(today.getFullYear());
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState(defaultDate);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [week, setWeek] = useState("");
  const [availableWeeks, setAvailableWeeks] = useState([]);

  const [kpis, setKpis] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchSubordinates();
  }, [fetchSubordinates]);

  // open modal
  const handleOpenModal = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);

    // Reset form to defaults
    setFrequency("daily");
    setDate(defaultDate);
    setYear(defaultYear);
    setMonth(defaultMonth);
    setWeek("");
    setComment("");
    setKpis([]);
    setAvailableWeeks([]);
  };

  // handle frequency changes
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
    setAvailableWeeks([]);
    setKpis([]);
  };

  // fetch KPI set
  useEffect(() => {
    if (!showModal || !selectedEmployee) return;

    const fetchData = async () => {
      try {
        const data = await fetchKpiSet(selectedEmployee.designation, frequency);
        if (data) {
          const initialKpis = data.kpis.map((k) => ({
            ...k,
            achieved: 0,
            score: 0,
            comment: "",
          }));
          setKpis(initialKpis);
        }
      } catch (err) {
        toast.error("No KPI Set found for this designation + frequency");
        setKpis([]);
      }
    };

    fetchData();
  }, [showModal, selectedEmployee, frequency, fetchKpiSet]);

  // recalc available weeks
  useEffect(() => {
    if (!showModal) return;
    if (frequency === "weekly" && year && month) {
      const yNum = parseInt(year, 10);
      const mNum = parseInt(month, 10) - 1;
      if (yNum > 0 && mNum >= 0) {
        setAvailableWeeks(getWeeksInMonth(yNum, mNum));
      } else {
        setAvailableWeeks([]);
      }
    } else {
      setAvailableWeeks([]);
    }
  }, [showModal, frequency, year, month]);

  // total score
  const totalScore = kpis.reduce((acc, k) => acc + Number(k.score || 0), 0);

  // KPI input changes
  const handleAchievedChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => {
        if (i !== index) return k;
        if (k.type !== "quantitative") return k;
        const achievedVal = Number(newVal || 0);
        const target = k.target || 1;
        const marks = k.marks || 0;
        let newScore = (achievedVal / target) * marks;
        if (newScore < 0) newScore = 0;
        if (newScore > marks) newScore = marks;
        return {
          ...k,
          achieved: achievedVal,
          score: newScore,
        };
      })
    );
  };

  const handleScoreChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => {
        if (i !== index) return k;
        let sVal = Number(newVal || 0);
        if (k.type === "quantitative") {
          const marks = k.marks || 0;
          const target = k.target || 1;
          if (sVal < 0) sVal = 0;
          if (sVal > marks) sVal = marks;
          const newAchieved = (sVal / marks) * target;
          return { ...k, score: sVal, achieved: newAchieved };
        } else {
          // qualitative
          return { ...k, score: sVal };
        }
      })
    );
  };

  const handleCommentChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => (i === index ? { ...k, comment: newVal } : k))
    );
  };

  // submit rating
  const handleSubmitRating = async () => {
    if (!selectedEmployee) return;

    // Validate
    if (frequency === "daily" && !date) {
      toast.error("Please select a date for daily frequency");
      return;
    }
    if (frequency === "weekly") {
      if (!year) return toast.error("Please select year");
      if (!month) return toast.error("Please select month");
      if (!week) return toast.error("Please select which week");
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
        month: ["weekly", "monthly"].includes(frequency) ? month : undefined,
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
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 ">
      <h2 className="text-xl font-bold mb-4">Rate Employees (One-by-One)</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subordinates.map((emp) => (
          <div
            key={emp._id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="flex items-center space-x-2">
              <img
                src={emp.user_Avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {emp.first_Name} {emp.last_Name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {emp.designation} - {emp.employee_Id}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal(emp)}
              className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
            >
              Rate
            </button>
          </div>
        ))}
      </div>

      {/* 2) Use the new RatingModal component */}
      <RatingModal
        // show/hide
        showModal={showModal}
        onClose={() => setShowModal(false)}

        // Employee
        selectedEmployee={selectedEmployee}

        // Frequency & date states
        frequency={frequency}
        handleFrequencyChange={handleFrequencyChange}
        date={date}
        setDate={setDate}
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        week={week}
        setWeek={setWeek}

        // Weeks array
        availableWeeks={availableWeeks}

        // KPI rating data & handlers
        kpis={kpis}
        handleAchievedChange={handleAchievedChange}
        handleScoreChange={handleScoreChange}
        handleCommentChange={handleCommentChange}
        comment={comment}
        setComment={setComment}
        totalScore={totalScore}
        handleSubmitRating={handleSubmitRating}
      />
    </div>
  );
}

export default RateEmployee;
