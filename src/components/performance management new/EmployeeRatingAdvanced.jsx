// // components/EmployeeRatingAdvanced.jsx

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; 
// import { toast } from "react-hot-toast";
// import useRatingStore from "../../store/useRatingNewStore";

// const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

// function EmployeeRatingAdvanced() {
//   // If using react-router, get employeeId from URL param
//   // e.g. path="/employee-advanced/:employeeId"
//   const { employeeId } = useParams();

//   // If you prefer receiving employeeId as a prop: 
//   // function EmployeeRatingAdvanced({ employeeId }) { ... }

//   // Zustand store
//   const { getEmployeeRatingsAdvanced, loading, error } = useRatingStore();

//   // UI states
//   const [frequency, setFrequency] = useState("daily");

//   // For daily date range
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // For weekly/monthly/yearly range
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [startMonth, setStartMonth] = useState("");
//   const [endMonth, setEndMonth] = useState("");
//   const [startWeek, setStartWeek] = useState("");
//   const [endWeek, setEndWeek] = useState("");

//   // The fetched data
//   // { employee, filteredRatings, averageRating, ratingCount }
//   const [employeeData, setEmployeeData] = useState(null);
//   const [filteredRatings, setFilteredRatings] = useState([]);

//   // Reset date fields whenever frequency changes
//   useEffect(() => {
//     setStartDate("");
//     setEndDate("");
//     setStartYear("");
//     setEndYear("");
//     setStartMonth("");
//     setEndMonth("");
//     setStartWeek("");
//     setEndWeek("");
//   }, [frequency]);

//   // If you want to auto-fetch on mount with default frequency,
//   // you can call handleFetch here. But let's do a button-based approach.

//   const handleFetchRatings = async () => {
//     if (!employeeId) {
//       toast.error("No employee selected or invalid route param.");
//       return;
//     }
//     try {
//       const params = { frequency };
//       // daily
//       if (frequency === "daily" && startDate && endDate) {
//         params.startDate = startDate;
//         params.endDate = endDate;
//       }
//       // weekly
//       if (frequency === "weekly" && startYear && endYear && startWeek && endWeek) {
//         params.startYear = startYear;
//         params.endYear = endYear;
//         params.startWeek = startWeek;
//         params.endWeek = endWeek;
//       }
//       // monthly
//       if (frequency === "monthly" && startYear && endYear && startMonth && endMonth) {
//         params.startYear = startYear;
//         params.endYear = endYear;
//         params.startMonth = startMonth;
//         params.endMonth = endMonth;
//       }
//       // yearly
//       if (frequency === "yearly" && startYear && endYear) {
//         params.startYear = startYear;
//         params.endYear = endYear;
//       }

//       const res = await getEmployeeRatingsAdvanced(employeeId, params);
//       if (res.success) {
//         const { employee, filteredRatings, averageRating, ratingCount } = res.data;
//         setEmployeeData({
//           ...employee,
//           averageRating,
//           ratingCount
//         });
//         setFilteredRatings(filteredRatings);
//       } else {
//         toast.error(res.message || "Could not fetch data");
//       }
//     } catch (err) {
//       toast.error(err.message || "Error fetching employee advanced ratings");
//     }
//   };

//   return (
//     <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
//       <h1 className="text-2xl font-bold mb-4">Employee Rating (Advanced)</h1>

//       {loading && <p className="text-blue-500 mb-2">Loading...</p>}
//       {error && <p className="text-red-500 mb-2">Error: {error}</p>}

//       {/* Filter Panel */}
//       <div className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
//         <label className="block font-medium mb-1">Frequency</label>
//         <select
//           className="border p-2 rounded w-48 dark:bg-gray-700 dark:border-gray-600"
//           value={frequency}
//           onChange={(e) => setFrequency(e.target.value)}
//         >
//           {FREQUENCIES.map((freq) => (
//             <option key={freq} value={freq}>{freq}</option>
//           ))}
//         </select>

//         {/* daily => date range */}
//         {frequency === "daily" && (
//           <div className="mt-4 flex space-x-4">
//             <div>
//               <label className="block font-medium mb-1">Start Date</label>
//               <input
//                 type="date"
//                 className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Date</label>
//               <input
//                 type="date"
//                 className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>
//           </div>
//         )}

//         {/* weekly => year+week range */}
//         {frequency === "weekly" && (
//           <div className="mt-4 flex space-x-4">
//             <div>
//               <label className="block font-medium mb-1">Start Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={startYear}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 placeholder="2025"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={endYear}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 placeholder="2025"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Start Week</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
//                 value={startWeek}
//                 onChange={(e) => setStartWeek(e.target.value)}
//                 placeholder="1"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Week</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
//                 value={endWeek}
//                 onChange={(e) => setEndWeek(e.target.value)}
//                 placeholder="8"
//               />
//             </div>
//           </div>
//         )}

//         {/* monthly => year+month range */}
//         {frequency === "monthly" && (
//           <div className="mt-4 flex space-x-4">
//             <div>
//               <label className="block font-medium mb-1">Start Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={startYear}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 placeholder="2024"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Start Month</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
//                 value={startMonth}
//                 onChange={(e) => setStartMonth(e.target.value)}
//                 placeholder="1-12"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={endYear}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 placeholder="2025"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Month</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
//                 value={endMonth}
//                 onChange={(e) => setEndMonth(e.target.value)}
//                 placeholder="1-12"
//               />
//             </div>
//           </div>
//         )}

//         {/* yearly => year range */}
//         {frequency === "yearly" && (
//           <div className="mt-4 flex space-x-4">
//             <div>
//               <label className="block font-medium mb-1">Start Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={startYear}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 placeholder="2023"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">End Year</label>
//               <input
//                 type="number"
//                 className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
//                 value={endYear}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 placeholder="2025"
//               />
//             </div>
//           </div>
//         )}

//         <button
//           onClick={handleFetchRatings}
//           className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
//         >
//           Fetch Ratings
//         </button>
//       </div>

//       {/* Employee Info + Ratings */}
//       {employeeData ? (
//         <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
//           <div className="flex items-center space-x-4 mb-4">
//             <img
//               src={employeeData.user_Avatar}
//               alt="avatar"
//               className="w-16 h-16 rounded-full"
//             />
//             <div>
//               <h2 className="text-xl font-semibold">
//                 {employeeData.first_Name} {employeeData.last_Name} (
//                 {employeeData.employee_Id})
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400">
//                 {employeeData.designation} 
//                 {/* If you have department: ` - ${employeeData.department}` */}
//               </p>
//             </div>
//             <div className="ml-auto text-right">
//               <p className="text-gray-600 dark:text-gray-400 text-sm">
//                 Ratings Found: {employeeData.ratingCount}
//               </p>
//               <p className="font-bold">
//                 Avg Rating: {employeeData.averageRating.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           {filteredRatings.length === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400">
//               No rating docs match your filters.
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-900/50">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Frequency</th>
//                     <th className="px-4 py-2 text-left">Date/Period</th>
//                     <th className="px-4 py-2 text-left">TotalScore</th>
//                     <th className="px-4 py-2 text-left"># of KPIs</th>
//                     <th className="px-4 py-2 text-left">Comment</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {filteredRatings.map((rdoc) => {
//                     return (
//                       <tr key={rdoc._id}>
//                         <td className="px-4 py-2">{rdoc.frequency}</td>
//                         <td className="px-4 py-2">
//                           {/* For daily => rdoc.date, for monthly => rdoc.year/month, etc. */}
//                           {renderPeriod(rdoc)}
//                         </td>
//                         <td className="px-4 py-2">{rdoc.totalScore}</td>
//                         <td className="px-4 py-2">
//                           {rdoc.kpis ? rdoc.kpis.length : 0}
//                         </td>
//                         <td className="px-4 py-2">{rdoc.comment || "—"}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="text-gray-500 dark:text-gray-400">
//           No employee data loaded yet. Choose filters and click "Fetch Ratings."
//         </p>
//       )}
//     </div>
//   );
// }

// /**
//  * Helper to render the "date or period" for a rating doc.
//  */
// function renderPeriod(rdoc) {
//   if (rdoc.frequency === "daily") {
//     if (!rdoc.date) return "No date";
//     const d = new Date(rdoc.date);
//     return d.toLocaleDateString(); // e.g. "4/05/2025"
//   } else if (rdoc.frequency === "weekly") {
//     // e.g. "2025-Wk2 (Month:05?)"
//     return `Yr${rdoc.year}-Wk${rdoc.week} (M:${rdoc.month})`;
//   } else if (rdoc.frequency === "monthly") {
//     // e.g. "2025-04"
//     return `${rdoc.year || "??"}-${rdoc.month || "??"}`;
//   } else if (rdoc.frequency === "yearly") {
//     // e.g. "2025"
//     return rdoc.year || "??";
//   } else {
//     // fallback
//     return "??";
//   }
// }

// export default EmployeeRatingAdvanced;


// components/EmployeeRatingAdvanced.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useRatingStore from "../../store/useRatingNewStore";

// 1) Import your helper to get weeks in a month
import { getWeeksInMonth } from "./calendarUtils";

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

function EmployeeRatingAdvanced() {
  // If using react-router, get employeeId from URL param
  const { employeeId } = useParams();

  // Zustand store
  const { getEmployeeRatingsAdvanced, loading, error } = useRatingStore();

  // -------------------------
  // Frequency
  // -------------------------
  const [frequency, setFrequency] = useState("daily");

  // -------------------------
  // For daily date range
  // -------------------------
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // -------------------------
  // For weekly / monthly / yearly
  // We'll store a start range and an end range
  // -------------------------
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");

  // We'll store two separate arrays of "weeks" for the start range and for the end range
  const [startAvailableWeeks, setStartAvailableWeeks] = useState([]);
  const [endAvailableWeeks, setEndAvailableWeeks] = useState([]);

  // The fetched data
  // { employee, filteredRatings, averageRating, ratingCount }
  const [employeeData, setEmployeeData] = useState(null);
  const [filteredRatings, setFilteredRatings] = useState([]);

  // -------------------------
  // When frequency changes, set defaults
  // (like "today" for daily, or current month for monthly, etc.)
  // -------------------------
  useEffect(() => {
    const today = new Date();
    const isoToday = today.toISOString().split("T")[0];
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, "0");

    switch (frequency) {
      case "daily":
        // default start/end date to today
        setStartDate(isoToday);
        setEndDate(isoToday);
        // clear everything else
        setStartYear("");
        setEndYear("");
        setStartMonth("");
        setEndMonth("");
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      case "weekly":
        // default startYear/endYear to current, startMonth/endMonth to current
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
        // clear weeks until we fetch them
        setStartWeek("");
        setEndWeek("");
        // clear daily
        setStartDate("");
        setEndDate("");
        break;

      case "monthly":
        // default startYear/endYear to current, startMonth/endMonth to current
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
        // clear daily/weekly
        setStartDate("");
        setEndDate("");
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      case "yearly":
        // default startYear/endYear to current
        setStartYear(String(currentYear));
        setEndYear(String(currentYear));
        // clear daily/week/month
        setStartDate("");
        setEndDate("");
        setStartMonth("");
        setEndMonth("");
        setStartWeek("");
        setEndWeek("");
        setStartAvailableWeeks([]);
        setEndAvailableWeeks([]);
        break;

      default:
        break;
    }
  }, [frequency]);

  // -------------------------
  // If frequency=weekly, load the "start" weeks
  // whenever startYear or startMonth changes
  // -------------------------
  useEffect(() => {
    if (frequency !== "weekly") return;

    if (startYear && startMonth) {
      const y = parseInt(startYear, 10);
      const m = parseInt(startMonth, 10) - 1; // 0-based
      if (y >= 0 && m >= 0) {
        const weeksArr = getWeeksInMonth(y, m);
        setStartAvailableWeeks(weeksArr);

        // If there's no startWeek selected or it's invalid, pick a default
        if (!startWeek || !weeksArr.find((w) => w.value === startWeek)) {
          // Optionally pick today's week if found
          const found = weeksArr.find(
            (w) => todayInRange(w.startDate, w.endDate)
          );
          setStartWeek(found ? found.value : weeksArr[0]?.value || "");
        }
      } else {
        setStartAvailableWeeks([]);
      }
    } else {
      setStartAvailableWeeks([]);
    }
  }, [frequency, startYear, startMonth, startWeek]);

  // -------------------------
  // If frequency=weekly, load the "end" weeks
  // whenever endYear or endMonth changes
  // -------------------------
  useEffect(() => {
    if (frequency !== "weekly") return;

    if (endYear && endMonth) {
      const y = parseInt(endYear, 10);
      const m = parseInt(endMonth, 10) - 1; // 0-based
      if (y >= 0 && m >= 0) {
        const weeksArr = getWeeksInMonth(y, m);
        setEndAvailableWeeks(weeksArr);

        // If there's no endWeek selected or it's invalid, pick a default
        if (!endWeek || !weeksArr.find((w) => w.value === endWeek)) {
          const found = weeksArr.find(
            (w) => todayInRange(w.startDate, w.endDate)
          );
          setEndWeek(found ? found.value : weeksArr[0]?.value || "");
        }
      } else {
        setEndAvailableWeeks([]);
      }
    } else {
      setEndAvailableWeeks([]);
    }
  }, [frequency, endYear, endMonth, endWeek]);

  // A tiny helper to check if "today" is in [start, end]
  const todayInRange = (start, end) => {
    const now = new Date();
    return now >= start && now <= end;
  };

  // -------------------------
  // Fetch Ratings
  // -------------------------
  const handleFetchRatings = async () => {
    if (!employeeId) {
      toast.error("No employee selected or invalid route param.");
      return;
    }
    try {
      const params = { frequency };

      // daily
      if (frequency === "daily" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      // weekly
      if (
        frequency === "weekly" &&
        startYear &&
        endYear &&
        startMonth &&
        endMonth &&
        startWeek &&
        endWeek
      ) {
        params.startYear = startYear;
        params.endYear = endYear;
        params.startMonth = startMonth;
        params.endMonth = endMonth;
        params.startWeek = startWeek;
        params.endWeek = endWeek;
      }

      // monthly
      if (
        frequency === "monthly" &&
        startYear &&
        endYear &&
        startMonth &&
        endMonth
      ) {
        params.startYear = startYear;
        params.endYear = endYear;
        params.startMonth = startMonth;
        params.endMonth = endMonth;
      }

      // yearly
      if (frequency === "yearly" && startYear && endYear) {
        params.startYear = startYear;
        params.endYear = endYear;
      }

      const res = await getEmployeeRatingsAdvanced(employeeId, params);
      if (res.success) {
        const { employee, filteredRatings, averageRating, ratingCount } = res.data;
        setEmployeeData({
          ...employee,
          averageRating,
          ratingCount,
        });
        setFilteredRatings(filteredRatings);
      } else {
        toast.error(res.message || "Could not fetch data");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching employee advanced ratings");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <h1 className="text-2xl font-bold mb-4">Employee Rating (Advanced)</h1>

      {loading && <p className="text-blue-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">Error: {error}</p>}

      {/* Filter Panel */}
      <div className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
        <label className="block font-medium mb-1">Frequency</label>
        <select
          className="border p-2 rounded w-48 dark:bg-gray-700 dark:border-gray-600"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {FREQUENCIES.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>

        {/* daily => date range */}
        {frequency === "daily" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* weekly => year+month => week range */}
        {frequency === "weekly" && (
          <>
            {/* START range */}
            <div className="mt-4 flex space-x-4">
              <div>
                <label className="block font-medium mb-1">Start Year</label>
                <input
                  type="number"
                  className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  placeholder="2025"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Start Month</label>
                <input
                  type="number"
                  className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  placeholder="1-12"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Start Week</label>
                <select
                  className="border p-2 rounded w-28 dark:bg-gray-700 dark:border-gray-600"
                  value={startWeek}
                  onChange={(e) => setStartWeek(e.target.value)}
                >
                  <option value="">Select Week</option>
                  {startAvailableWeeks.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* END range */}
            <div className="mt-4 flex space-x-4">
              <div>
                <label className="block font-medium mb-1">End Year</label>
                <input
                  type="number"
                  className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  placeholder="2025"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Month</label>
                <input
                  type="number"
                  className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  placeholder="1-12"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Week</label>
                <select
                  className="border p-2 rounded w-28 dark:bg-gray-700 dark:border-gray-600"
                  value={endWeek}
                  onChange={(e) => setEndWeek(e.target.value)}
                >
                  <option value="">Select Week</option>
                  {endAvailableWeeks.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* monthly => year+month range */}
        {frequency === "monthly" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Start Month</label>
              <input
                type="number"
                className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                placeholder="1-12"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="2025"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Month</label>
              <input
                type="number"
                className="border p-2 rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                placeholder="1-12"
              />
            </div>
          </div>
        )}

        {/* yearly => year range */}
        {frequency === "yearly" && (
          <div className="mt-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="2023"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Year</label>
              <input
                type="number"
                className="border p-2 rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="2025"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleFetchRatings}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Fetch Ratings
        </button>
      </div>

      {/* Employee Info + Ratings */}
      {employeeData ? (
        <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={employeeData.user_Avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {employeeData.first_Name} {employeeData.last_Name} (
                {employeeData.employee_Id})
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {employeeData.designation}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ratings Found: {employeeData.ratingCount}
              </p>
              <p className="font-bold">
                Avg Rating: {employeeData.averageRating.toFixed(2)}
              </p>
            </div>
          </div>

          {filteredRatings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No rating docs match your filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Date/Period</th>
                    <th className="px-4 py-2 text-left">TotalScore</th>
                    <th className="px-4 py-2 text-left"># of KPIs</th>
                    <th className="px-4 py-2 text-left">Comment</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRatings.map((rdoc) => {
                    return (
                      <tr key={rdoc._id}>
                        <td className="px-4 py-2">{rdoc.frequency}</td>
                        <td className="px-4 py-2">{renderPeriod(rdoc)}</td>
                        <td className="px-4 py-2">{rdoc.totalScore}</td>
                        <td className="px-4 py-2">
                          {rdoc.kpis ? rdoc.kpis.length : 0}
                        </td>
                        <td className="px-4 py-2">{rdoc.comment || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No employee data loaded yet. Choose filters and click "Fetch Ratings."
        </p>
      )}
    </div>
  );
}

/**
 * Helper to render the "date or period" for a rating doc.
 */
function renderPeriod(rdoc) {
  if (rdoc.frequency === "daily") {
    if (!rdoc.date) return "No date";
    const d = new Date(rdoc.date);
    return d.toLocaleDateString(); // e.g. "4/05/2025"
  } else if (rdoc.frequency === "weekly") {
    // e.g. "2025-Wk2 (Month:05?)"
    return `Yr${rdoc.year}-M${rdoc.month}-Wk${rdoc.week}`;
  } else if (rdoc.frequency === "monthly") {
    // e.g. "2025-04"
    return `${rdoc.year || "??"}-${rdoc.month || "??"}`;
  } else if (rdoc.frequency === "yearly") {
    // e.g. "2025"
    return rdoc.year || "??";
  } else {
    // fallback
    return "??";
  }
}

export default EmployeeRatingAdvanced;
