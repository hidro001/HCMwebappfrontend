



// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { getWeeksInMonth } from "./calendarUtils"; // your date-fns utility
// import useRatingStore from "../../store/useRatingNewStore";

// const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

// function RateEmployee() {
//   const {
//     subordinates,
//     fetchSubordinates,
//     fetchKpiSet,
//     kpiSet,
//     createRating,
//     loading,
//     error,
//   } = useRatingStore();

//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // For rating
//   const [frequency, setFrequency] = useState("daily");
//   const [date, setDate] = useState(""); // daily
//   const [year, setYear] = useState(""); // weekly/monthly/yearly
//   const [month, setMonth] = useState(""); // monthly or weekly
//   const [week, setWeek] = useState(""); // weekly
//   const [availableWeeks, setAvailableWeeks] = useState([]); // computed from year+month
//   const [kpis, setKpis] = useState([]); // local copy to store rating scores/comments
//   const [comment, setComment] = useState("");

//   // On mount, fetch subordinates
//   useEffect(() => {
//     fetchSubordinates();
//   }, [fetchSubordinates]);

//   // Handle opening the rating modal
//   const handleOpenModal = (emp) => {
//     setSelectedEmployee(emp);
//     setShowModal(true);
//     // Reset form
//     setFrequency("daily");
//     setDate("");
//     setYear("");
//     setMonth("");
//     setWeek("");
//     setComment("");
//     setKpis([]);
//     setAvailableWeeks([]);
//   };

//   // Whenever frequency or selectedEmployee changes, fetch KPI set
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedEmployee) return;
//       try {
//         const data = await fetchKpiSet(selectedEmployee.designation, frequency);
//         if (data) {
//           // Initialize local kpis with "score" + "comment"
//           const initialKpis = data.kpis.map((k) => ({
//             ...k,
//             score: 0,
//             comment: "",
//           }));
//           setKpis(initialKpis);
//         }
//       } catch (err) {
//         toast.error("No KPI Set found for this designation + frequency");
//       }
//     };

//     if (showModal) {
//       fetchData();
//     }
//   }, [selectedEmployee, frequency, showModal, fetchKpiSet]);

//   // Weekly: whenever year or month changes, recalc available weeks
//   useEffect(() => {
//     if (frequency === "weekly" && year && month) {
//       const yearNum = parseInt(year, 10);
//       const monthNum = parseInt(month, 10) - 1; // 0-based
//       if (yearNum > 0 && monthNum >= 0) {
//         const weeksArr = getWeeksInMonth(yearNum, monthNum);
//         setAvailableWeeks(weeksArr);
//       } else {
//         setAvailableWeeks([]);
//       }
//     } else {
//       setAvailableWeeks([]);
//     }
//   }, [frequency, year, month]);

//   // Compute total score
//   const totalScore = kpis.reduce((acc, k) => acc + Number(k.score || 0), 0);

//   // Submit rating
//   const handleSubmitRating = async () => {
//     if (!selectedEmployee) return;
//     // Basic validations
//     if (frequency === "daily" && !date) {
//       toast.error("Please select a date for daily frequency");
//       return;
//     }
//     if (frequency === "weekly") {
//       if (!year) {
//         toast.error("Please select a year for weekly frequency");
//         return;
//       }
//       if (!month) {
//         toast.error("Please select a month for weekly frequency");
//         return;
//       }
//       if (!week) {
//         toast.error("Please select which week in the month");
//         return;
//       }
//     }
//     if (frequency === "monthly" && (!year || !month)) {
//       toast.error("Please select year & month");
//       return;
//     }
//     if (frequency === "yearly" && !year) {
//       toast.error("Please select year");
//       return;
//     }

//     try {
//       // Build payload
//       const payload = {
//         employeeId: selectedEmployee._id,
//         frequency,
//         version: kpiSet?.version || 1,
//         date: frequency === "daily" ? date : undefined,
//         // For weekly/monthly/yearly
//         year: ["weekly", "monthly", "yearly"].includes(frequency) ? year : undefined,
//         month: ["weekly", "monthly"].includes(frequency) ? month : undefined,
//         week: frequency === "weekly" ? week : undefined,

//         kpis: kpis.map((k) => ({
//           kpiName: k.kpiName,
//           type: k.type,      // now "quantitative" or "qualitative"
//           score: Number(k.score),
//           comment: k.comment,
//         })),
//         totalScore,
//         comment,
//       };

//       await createRating(payload);
//       toast.success("Rating submitted successfully!");
//       setShowModal(false);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || err.message || "Error");
//     }
//   };

//   // Group by type for UI
//   // changed "formal" → "quantitative", "informal" → "qualitative"
//   const groupedKpis = {
//     quantitative: kpis.filter((k) => k.type === "quantitative"),
//     qualitative: kpis.filter((k) => k.type === "qualitative"),
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Rate Employees (One-by-One)</h2>

//       {/* Error / Loading */}
//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Subordinate list */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {subordinates.map((emp) => (
//           <div
//             key={emp._id}
//             className="p-4 border border-gray-200 rounded shadow-sm"
//           >
//             <div className="flex items-center space-x-2">
//               <img
//                 src={emp.user_Avatar}
//                 alt="avatar"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <p className="font-semibold">
//                   {emp.first_Name} {emp.last_Name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {emp.designation} - {emp.employee_Id}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleOpenModal(emp)}
//               className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
//             >
//               Rate
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for rating */}
//       {showModal && selectedEmployee && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative">
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-xl"
//             >
//               &times;
//             </button>

//             <h3 className="text-lg font-bold mb-4">
//               Rate {selectedEmployee.first_Name} {selectedEmployee.last_Name}
//             </h3>

//             {/* Frequency */}
//             <div className="mb-2">
//               <label className="block font-medium">Frequency</label>
//               <select
//                 className="border p-2 w-full rounded"
//                 value={frequency}
//                 onChange={(e) => {
//                   setFrequency(e.target.value);
//                   setYear("");
//                   setMonth("");
//                   setWeek("");
//                   setDate("");
//                   setAvailableWeeks([]);
//                 }}
//               >
//                 {FREQUENCIES.map((freq) => (
//                   <option key={freq} value={freq}>
//                     {freq}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* daily */}
//             {frequency === "daily" && (
//               <div className="mb-2">
//                 <label className="block font-medium">Date</label>
//                 <input
//                   type="date"
//                   className="border p-2 w-full rounded"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>
//             )}

//             {/* weekly => year + month => weeks */}
//             {frequency === "weekly" && (
//               <>
//                 <div className="mb-2">
//                   <label className="block font-medium">Year</label>
//                   <input
//                     type="number"
//                     className="border p-2 rounded w-full"
//                     placeholder="2025"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-2">
//                   <label className="block font-medium">Month</label>
//                   <select
//                     className="border p-2 rounded w-full"
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {[...Array(12)].map((_, i) => {
//                       const m = i + 1;
//                       return (
//                         <option key={m} value={m.toString().padStart(2, "0")}>
//                           {m}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>

//                 {year && month && (
//                   <div className="mb-2">
//                     <label className="block font-medium">
//                       Week in {month}/{year}
//                     </label>
//                     <select
//                       className="border p-2 rounded w-full"
//                       value={week}
//                       onChange={(e) => setWeek(e.target.value)}
//                     >
//                       <option value="">Select Week</option>
//                       {availableWeeks.map((wObj) => (
//                         <option key={wObj.value} value={wObj.value}>
//                           {wObj.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* monthly => year + month */}
//             {frequency === "monthly" && (
//               <div className="flex space-x-2 mb-2">
//                 <div>
//                   <label className="block font-medium">Year</label>
//                   <input
//                     type="number"
//                     className="border p-2 rounded w-full"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     placeholder="2025"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">Month</label>
//                   <select
//                     className="border p-2 rounded w-full"
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                   >
//                     <option value="">Select Month</option>
//                     {[...Array(12)].map((_, i) => {
//                       const m = i + 1;
//                       return (
//                         <option key={m} value={m.toString().padStart(2, "0")}>
//                           {m}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* yearly => year */}
//             {frequency === "yearly" && (
//               <div className="mb-2">
//                 <label className="block font-medium">Year</label>
//                 <input
//                   type="number"
//                   className="border p-2 rounded w-full"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   placeholder="2025"
//                 />
//               </div>
//             )}

//             {/* KPI lists */}
//             <div className="mt-4">
//               <h4 className="font-semibold">Quantitative KPIs</h4>
//               {groupedKpis.quantitative.length === 0 && (
//                 <p className="text-sm text-gray-500">No quantitative KPIs.</p>
//               )}
//               {groupedKpis.quantitative.map((k, idx) => (
//                 <div key={idx} className="flex items-center space-x-2 my-2">
//                   <div className="w-1/3">
//                     <p className="font-medium">{k.kpiName}</p>
//                     <p className="text-sm text-gray-400">
//                       Max: {k.marks} | Target: {k.target}
//                     </p>
//                   </div>
//                   <input
//                     type="number"
//                     className="border rounded p-2 w-20"
//                     value={k.score}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       setKpis((prev) =>
//                         prev.map((p, i2) =>
//                           i2 === idx && p.type === "quantitative"
//                             ? { ...p, score: val }
//                             : p
//                         )
//                       );
//                     }}
//                   />
//                   <input
//                     placeholder="Comment"
//                     className="border rounded p-2 w-full"
//                     value={k.comment}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       setKpis((prev) =>
//                         prev.map((p, i2) =>
//                           i2 === idx && p.type === "quantitative"
//                             ? { ...p, comment: val }
//                             : p
//                         )
//                       );
//                     }}
//                   />
//                 </div>
//               ))}

//               <h4 className="font-semibold mt-4">Qualitative KPIs</h4>
//               {groupedKpis.qualitative.length === 0 && (
//                 <p className="text-sm text-gray-500">No qualitative KPIs.</p>
//               )}
//               {groupedKpis.qualitative.map((k, idx) => {
//                 const realIdx = kpis.indexOf(k);
//                 return (
//                   <div key={realIdx} className="flex items-center space-x-2 my-2">
//                     <div className="w-1/3">
//                       <p className="font-medium">{k.kpiName}</p>
//                       <p className="text-sm text-gray-400">Max: {k.marks}</p>
//                     </div>
//                     <input
//                       type="number"
//                       className="border rounded p-2 w-20"
//                       value={k.score}
//                       onChange={(e) => {
//                         const val = e.target.value;
//                         setKpis((prev) =>
//                           prev.map((p, i2) =>
//                             i2 === realIdx ? { ...p, score: val } : p
//                           )
//                         );
//                       }}
//                     />
//                     <input
//                       placeholder="Comment"
//                       className="border rounded p-2 w-full"
//                       value={k.comment}
//                       onChange={(e) => {
//                         const val = e.target.value;
//                         setKpis((prev) =>
//                           prev.map((p, i2) =>
//                             i2 === realIdx ? { ...p, comment: val } : p
//                           )
//                         );
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Overall comment */}
//             <div className="mt-4">
//               <label className="block font-medium">Overall Comment</label>
//               <textarea
//                 className="border p-2 w-full rounded"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </div>

//             {/* Total Score & actions */}
//             <div className="mt-4 flex justify-between items-center">
//               <p className="font-semibold">
//                 Total Score: <span className="text-indigo-600">{totalScore}</span>
//               </p>
//               <button
//                 onClick={handleSubmitRating}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Submit Rating
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RateEmployee;


import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getWeeksInMonth } from "./calendarUtils"; 
import useRatingStore from "../../store/useRatingNewStore";

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

  // Rating period controls
  const [frequency, setFrequency] = useState("daily");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [comment, setComment] = useState("");

  // On mount
  useEffect(() => {
    fetchSubordinates();
  }, [fetchSubordinates]);

  // Open the rating modal
  const handleOpenModal = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
    // Reset
    setFrequency("daily");
    setDate("");
    setYear("");
    setMonth("");
    setWeek("");
    setComment("");
    setKpis([]);
    setAvailableWeeks([]);
  };

  // Fetch KPI set when modal is open & employee/frequency changes
  useEffect(() => {
    if (!showModal || !selectedEmployee) return;
    const fetchData = async () => {
      try {
        const data = await fetchKpiSet(selectedEmployee.designation, frequency);
        if (data) {
          // For each KPI, add "achieved" + "score" so manager can fill either
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
      }
    };
    fetchData();
  }, [showModal, selectedEmployee, frequency, fetchKpiSet]);

  // Weekly: recalc available weeks
  useEffect(() => {
    if (frequency === "weekly" && year && month) {
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10) - 1;
      if (yearNum > 0 && monthNum >= 0) {
        const weeksArr = getWeeksInMonth(yearNum, monthNum);
        setAvailableWeeks(weeksArr);
      } else {
        setAvailableWeeks([]);
      }
    } else {
      setAvailableWeeks([]);
    }
  }, [frequency, year, month]);

  // Calculate total score
  const totalScore = kpis.reduce((acc, k) => acc + Number(k.score || 0), 0);

  // Handler for changing "achieved" in a quantitative KPI
  const handleAchievedChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => {
        if (i !== index) return k;
        if (k.type !== "quantitative") return k;
        const target = k.target || 1;
        const marks = k.marks || 0;
        const achievedVal = Number(newVal || 0);

        // score = (achieved / target) * marks
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

  // Handler for changing "score" in a KPI
  // If it's quantitative, recalc "achieved"
  // If it's qualitative, store directly
  const handleScoreChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => {
        if (i !== index) return k;

        let sVal = Number(newVal || 0);
        if (k.type === "quantitative") {
          const target = k.target || 1;
          const marks = k.marks || 0;

          if (sVal < 0) sVal = 0;
          if (sVal > marks) sVal = marks;

          const newAchieved = (sVal / marks) * target;
          return {
            ...k,
            score: sVal,
            achieved: newAchieved,
          };
        } else {
          // qualitative => just store the score
          return { ...k, score: sVal };
        }
      })
    );
  };

  // Handler for changing the comment
  const handleCommentChange = (index, newVal) => {
    setKpis((prev) =>
      prev.map((k, i) => (i === index ? { ...k, comment: newVal } : k))
    );
  };

  // Submit rating
  const handleSubmitRating = async () => {
    if (!selectedEmployee) return;

    // Validate frequency
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rate Employees (One-by-One)</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Subordinate list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subordinates.map((emp) => (
          <div key={emp._id} className="p-4 border border-gray-200 rounded shadow-sm">
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
                onChange={(e) => {
                  setFrequency(e.target.value);
                  setYear("");
                  setMonth("");
                  setWeek("");
                  setDate("");
                  setAvailableWeeks([]);
                }}
              >
                {FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>

            {/* daily */}
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

            {/* weekly => year + month => weeks */}
            {frequency === "weekly" && (
              <>
                <div className="mb-2">
                  <label className="block font-medium">Year</label>
                  <input
                    type="number"
                    className="border p-2 rounded w-full"
                    placeholder="2025"
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
                    <label className="block font-medium">
                      Week in {month}/{year}
                    </label>
                    <select
                      className="border p-2 rounded w-full"
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                    >
                      <option value="">Select Week</option>
                      {availableWeeks.map((wObj) => (
                        <option key={wObj.value} value={wObj.value}>
                          {wObj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* monthly => year+month */}
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

            {/* yearly => year */}
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

            {/* KPI Rows (Single Map) */}
            <div className="mt-4">
              {kpis.length === 0 ? (
                <p className="text-sm text-gray-500">No KPIs found for this set.</p>
              ) : (
                kpis.map((k, i) => {
                  // If k.type === "quantitative", show Achieved & Score
                  // If k.type === "qualitative", show Score only
                  if (k.type === "quantitative") {
                    return (
                      <div
                        key={i}
                        className="flex flex-col space-y-1 my-3 border-b pb-2"
                      >
                        <div className="font-medium">{k.kpiName}</div>
                        <div className="text-sm text-gray-500">
                          Target: {k.target} | Max: {k.marks}
                          {k.target > 0 && (
                            <>
                              {" "}
                              |{" "}
                              <span className="italic">
                                1 unit = {(k.marks / k.target).toFixed(2)} pts
                              </span>
                            </>
                          )}
                        </div>

                        {/* Achieved => auto-calc Score */}
                        <label className="block text-sm mt-1">
                          Achieved:
                          <input
                            type="number"
                            className="border rounded p-1 ml-2 w-24"
                            value={k.achieved || 0}
                            onChange={(e) => handleAchievedChange(i, e.target.value)}
                          />
                        </label>

                        {/* Score => auto-calc Achieved */}
                        <label className="block text-sm mt-1">
                          Score:
                          <input
                            type="number"
                            className="border rounded p-1 ml-2 w-24"
                            value={k.score || 0}
                            onChange={(e) => handleScoreChange(i, e.target.value)}
                          />
                        </label>

                        <label className="block text-sm mt-1">
                          Comment:
                          <input
                            type="text"
                            className="border rounded p-1 ml-2 w-40"
                            value={k.comment}
                            onChange={(e) => handleCommentChange(i, e.target.value)}
                          />
                        </label>
                      </div>
                    );
                  } else {
                    // qualitative
                    return (
                      <div
                        key={i}
                        className="flex flex-col space-y-1 my-3 border-b pb-2"
                      >
                        <div className="font-medium">{k.kpiName}</div>
                        <div className="text-sm text-gray-500">
                          Max: {k.marks}
                        </div>

                        {/* Score (typed directly) */}
                        <label className="block text-sm mt-1">
                          Score:
                          <input
                            type="number"
                            className="border rounded p-1 ml-2 w-24"
                            value={k.score || 0}
                            onChange={(e) => handleScoreChange(i, e.target.value)}
                          />
                        </label>

                        <label className="block text-sm mt-1">
                          Comment:
                          <input
                            type="text"
                            className="border rounded p-1 ml-2 w-40"
                            value={k.comment}
                            onChange={(e) => handleCommentChange(i, e.target.value)}
                          />
                        </label>
                      </div>
                    );
                  }
                })
              )}
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

            {/* Submit */}
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
