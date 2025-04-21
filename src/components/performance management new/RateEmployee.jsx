import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils";
import useRatingStore from "../../store/useRatingNewStore";
import RatingModal from "./modal/RatingModal";
import { FiSearch, FiStar, FiUser, FiFilter } from "react-icons/fi";
import { HiChevronDown, HiOutlineBadgeCheck } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc"); // name-asc, name-desc, designation

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

  // Get unique designations for filter dropdown
  const uniqueDesignations = [...new Set(subordinates.map(emp => emp.designation))];

  // Filter employees based on search and designation
  const filteredEmployees = subordinates.filter(emp => {
    const fullName = `${emp.first_Name} ${emp.last_Name}`.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      fullName.includes(searchQuery.toLowerCase()) || 
      emp.employee_Id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDesignation = filterDesignation === "" || emp.designation === filterDesignation;
    
    return matchesSearch && matchesDesignation;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOrder === "name-asc") {
      return `${a.first_Name} ${a.last_Name}`.localeCompare(`${b.first_Name} ${b.last_Name}`);
    } else if (sortOrder === "name-desc") {
      return `${b.first_Name} ${b.last_Name}`.localeCompare(`${a.first_Name} ${a.last_Name}`);
    } else if (sortOrder === "designation") {
      return a.designation.localeCompare(b.designation);
    }
    return 0;
  });

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
    <div className="p-6 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-2xl ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              <FiStar className="mr-2 text-indigo-500" />
              Performance Ratings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Rate your team members based on key performance indicators
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 bg-white dark:bg-gray-800 w-full md:w-64"
              />
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Filter by Designation</label>
            <div className="relative">
              <select
                value={filterDesignation}
                onChange={(e) => setFilterDesignation(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Designations</option>
                {uniqueDesignations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <HiChevronDown className="text-gray-500" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sort By</label>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="designation">Designation</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <HiChevronDown className="text-gray-500" />
              </div>
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
              onClick={() => {
                setSearchQuery("");
                setFilterDesignation("");
                setSortOrder("name-asc");
              }}
            >
              <FiFilter className="mr-2" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Status/loading indicators */}
        {loading && (
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg mb-6 flex items-center">
            <div className="mr-3">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p>Loading employee data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 flex items-center">
            <div className="mr-3">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p>Error: {error}</p>
          </div>
        )}

        {/* Employee Grid */}
        {sortedEmployees.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <FiUser className="mx-auto text-gray-400 dark:text-gray-500 w-16 h-16 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || filterDesignation ? 
                "Try adjusting your search or filters" : 
                "No subordinates are assigned to you yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedEmployees.map((emp) => (
              <div
                key={emp._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <div className="p-4 flex items-center space-x-3">
                  {emp.user_Avatar ? (
                    <img
                      src={emp.user_Avatar}
                      alt={`${emp.first_Name} ${emp.last_Name}`}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {emp.first_Name?.[0]}{emp.last_Name?.[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {emp.first_Name} {emp.last_Name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MdWorkOutline className="mr-1 flex-shrink-0" />
                      <span className="truncate">{emp.designation}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <HiOutlineBadgeCheck className="mr-1 flex-shrink-0" />
                      <span className="truncate">{emp.employee_Id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto p-4 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <button
                    onClick={() => handleOpenModal(emp)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center"
                  >
                    <FiStar className="mr-1.5" />
                    Rate Performance
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal Component */}
      <RatingModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        selectedEmployee={selectedEmployee}
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
        availableWeeks={availableWeeks}
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