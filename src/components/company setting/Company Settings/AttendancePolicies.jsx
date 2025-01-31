// // src/components/AttendancePolicies.jsx
// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { Switch } from "@headlessui/react";

// const AttendancePolicies = () => {
//   const [fullDayHours, setFullDayHours] = useState("9 Hours");
//   const [halfDayHours, setHalfDayHours] = useState("4.5 Hours");
//   const [notEvenHalfDay, setNotEvenHalfDay] = useState("3 Hours");
//   const [autoAbsenceHours, setAutoAbsenceHours] = useState("6 Hours");
//   const [maxLeaveCarryover, setMaxLeaveCarryover] = useState("0");
//   const [monthsBetweenHikes, setMonthsBetweenHikes] = useState("0");

//   const [enableOvertime, setEnableOvertime] = useState(false);
//   const [lateComing, setLateComing] = useState(false);

//   const [overtimeRate, setOvertimeRate] = useState("1.5x");
//   const [minOvertimeHours, setMinOvertimeHours] = useState("10 Hours");
//   const [lateComingGrace, setLateComingGrace] = useState("30 Min");
//   const [latePenaltyType, setLatePenaltyType] = useState("");
//   const [latePenaltyValue, setLatePenaltyValue] = useState("");
//   const [maxMonthlyLateness, setMaxMonthlyLateness] = useState("");

//   const handleSave = () => {
//     // Just show a success toast
//     toast.success("Attendance Policies Saved!");
//     // ... You could POST these values to an API, etc.
//   };

//   return (
//     <div className="bg-white shadow rounded p-6 mb-8">
//       <h2 className="text-xl font-bold mb-4">Attendance Policies</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Full Day Hours */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Full Day Hours</label>
//           <input
//             type="text"
//             value={fullDayHours}
//             onChange={(e) => setFullDayHours(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         {/* Maximum Leave Carryover */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Maximum Leave Carryover</label>
//           <input
//             type="text"
//             value={maxLeaveCarryover}
//             onChange={(e) => setMaxLeaveCarryover(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         {/* Half Day Hours */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Half Day Hours</label>
//           <input
//             type="text"
//             value={halfDayHours}
//             onChange={(e) => setHalfDayHours(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         {/* Not Even a Half Day */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Not Even a Half Day</label>
//           <input
//             type="text"
//             value={notEvenHalfDay}
//             onChange={(e) => setNotEvenHalfDay(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         {/* Auto‐Absence Hours */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Auto‐Absence Hours</label>
//           <input
//             type="text"
//             value={autoAbsenceHours}
//             onChange={(e) => setAutoAbsenceHours(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         {/* Months Between Hikes */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Months Between Hikes/Advances</label>
//           <input
//             type="text"
//             value={monthsBetweenHikes}
//             onChange={(e) => setMonthsBetweenHikes(e.target.value)}
//             className="mt-1 w-full border border-gray-300 rounded p-2"
//           />
//         </div>
//       </div>

//       {/* Toggles */}
//       <div className="flex space-x-8 mt-6">
//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-medium text-gray-700">Enable Overtime</label>
//           <Switch
//             checked={enableOvertime}
//             onChange={setEnableOvertime}
//             className={`${enableOvertime ? "bg-green-500" : "bg-gray-200"}
//               relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//           >
//             <span
//               className={`${
//                 enableOvertime ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//             />
//           </Switch>
//         </div>

//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-medium text-gray-700">Late Coming</label>
//           <Switch
//             checked={lateComing}
//             onChange={setLateComing}
//             className={`${lateComing ? "bg-green-500" : "bg-gray-200"}
//               relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//           >
//             <span
//               className={`${
//                 lateComing ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//             />
//           </Switch>
//         </div>
//       </div>

//       {/* If “Enable Overtime” is true, show extra fields */}
//       {enableOvertime && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Overtime Rate Multiplier</label>
//             <input
//               type="text"
//               value={overtimeRate}
//               onChange={(e) => setOvertimeRate(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//               placeholder="e.g., 1.5x"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Min Overtime Hours</label>
//             <input
//               type="text"
//               value={minOvertimeHours}
//               onChange={(e) => setMinOvertimeHours(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//               placeholder="e.g. 10 hours"
//             />
//           </div>
//         </div>
//       )}

//       {/* If “Late Coming” is true, show extra fields */}
//       {lateComing && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Late Coming Grace Minutes</label>
//             <input
//               type="text"
//               value={lateComingGrace}
//               onChange={(e) => setLateComingGrace(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//               placeholder="30 Min"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Late Coming Penalty Type</label>
//             <select
//               value={latePenaltyType}
//               onChange={(e) => setLatePenaltyType(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//             >
//               <option value="">Select Type</option>
//               <option value="percentage">Percentage</option>
//               <option value="fixed">Fixed Amount</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Late Coming Penalty Value</label>
//             <input
//               type="text"
//               value={latePenaltyValue}
//               onChange={(e) => setLatePenaltyValue(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//               placeholder="e.g. 5% or 500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Max Monthly Lateness Allowed</label>
//             <input
//               type="text"
//               value={maxMonthlyLateness}
//               onChange={(e) => setMaxMonthlyLateness(e.target.value)}
//               className="mt-1 w-full border border-gray-300 rounded p-2"
//               placeholder="e.g. 10% or 1000"
//             />
//           </div>
//         </div>
//       )}

//       {/* Save button */}
//       <button
//         onClick={handleSave}
//         className="mt-6 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default AttendancePolicies;


// src/components/AttendancePolicies.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Switch } from "@headlessui/react";

const AttendancePolicies = () => {
  const [fullDayHours, setFullDayHours] = useState("9 Hours");
  const [halfDayHours, setHalfDayHours] = useState("4.5 Hours");
  const [notEvenHalfDay, setNotEvenHalfDay] = useState("3 Hours");
  const [autoAbsenceHours, setAutoAbsenceHours] = useState("6 Hours");
  const [maxLeaveCarryover, setMaxLeaveCarryover] = useState("0");
  const [monthsBetweenHikes, setMonthsBetweenHikes] = useState("0");

  const [enableOvertime, setEnableOvertime] = useState(false);
  const [lateComing, setLateComing] = useState(false);

  const [overtimeRate, setOvertimeRate] = useState("1.5x");
  const [minOvertimeHours, setMinOvertimeHours] = useState("10 Hours");
  const [lateComingGrace, setLateComingGrace] = useState("30 Min");
  const [latePenaltyType, setLatePenaltyType] = useState("");
  const [latePenaltyValue, setLatePenaltyValue] = useState("");
  const [maxMonthlyLateness, setMaxMonthlyLateness] = useState("");

  const handleSave = () => {
    toast.success("Attendance Policies Saved!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6  ">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Attendance Policies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Day Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Full Day Hours
          </label>
          <input
            type="text"
            value={fullDayHours}
            onChange={(e) => setFullDayHours(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Maximum Leave Carryover */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Maximum Leave Carryover
          </label>
          <input
            type="text"
            value={maxLeaveCarryover}
            onChange={(e) => setMaxLeaveCarryover(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Half Day Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Half Day Hours
          </label>
          <input
            type="text"
            value={halfDayHours}
            onChange={(e) => setHalfDayHours(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Not Even a Half Day */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Not Even a Half Day
          </label>
          <input
            type="text"
            value={notEvenHalfDay}
            onChange={(e) => setNotEvenHalfDay(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Auto‐Absence Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Auto‐Absence Hours
          </label>
          <input
            type="text"
            value={autoAbsenceHours}
            onChange={(e) => setAutoAbsenceHours(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Months Between Hikes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Months Between Hikes/Advances
          </label>
          <input
            type="text"
            value={monthsBetweenHikes}
            onChange={(e) => setMonthsBetweenHikes(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex space-x-8 mt-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Enable Overtime
          </label>
          <Switch
            checked={enableOvertime}
            onChange={setEnableOvertime}
            className={`${
              enableOvertime ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                enableOvertime ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Late Coming
          </label>
          <Switch
            checked={lateComing}
            onChange={setLateComing}
            className={`${
              lateComing ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                lateComing ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>

      {enableOvertime && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Overtime Rate Multiplier
            </label>
            <input
              type="text"
              value={overtimeRate}
              onChange={(e) => setOvertimeRate(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="e.g., 1.5x"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Min Overtime Hours
            </label>
            <input
              type="text"
              value={minOvertimeHours}
              onChange={(e) => setMinOvertimeHours(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="e.g. 10 hours"
            />
          </div>
        </div>
      )}

      {lateComing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Grace Minutes
            </label>
            <input
              type="text"
              value={lateComingGrace}
              onChange={(e) => setLateComingGrace(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="30 Min"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Penalty Type
            </label>
            <select
              value={latePenaltyType}
              onChange={(e) => setLatePenaltyType(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select Type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Penalty Value
            </label>
            <input
              type="text"
              value={latePenaltyValue}
              onChange={(e) => setLatePenaltyValue(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="e.g. 5% or 500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Max Monthly Lateness Allowed
            </label>
            <input
              type="text"
              value={maxMonthlyLateness}
              onChange={(e) => setMaxMonthlyLateness(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="e.g. 10% or 1000"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSave}
        className="mt-6 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
      >
        Save
      </button>
    </div>
  );
};

export default AttendancePolicies;
