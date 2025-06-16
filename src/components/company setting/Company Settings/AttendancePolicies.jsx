import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

export default function AttendancePolicies() {
  const {
    attendancePolicies,
    monthsBetweenHikesOrAdvances,
    fetchAttendancePolicies,
    updateAttendancePolicies,
  } = useCompanySettingsStore();

  const [localPolicies, setLocalPolicies] = useState(attendancePolicies);
  const [localMonths, setLocalMonths] = useState(monthsBetweenHikesOrAdvances);

  useEffect(() => {
    fetchAttendancePolicies();
  }, [fetchAttendancePolicies]);

  useEffect(() => {
    setLocalPolicies(attendancePolicies);
    setLocalMonths(monthsBetweenHikesOrAdvances);
  }, [attendancePolicies, monthsBetweenHikesOrAdvances]);

  const handleChange = (name, value) => {
    setLocalPolicies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitch = (name) => {
    setLocalPolicies((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    updateAttendancePolicies({
      attendancePolicies: localPolicies,
      monthsBetweenHikesOrAdvances: Number(localMonths),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Attendance Policies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Full Day Hours
          </label>
          <input
            type="number"
            value={localPolicies.fullDayHours ?? ""}
            onChange={(e) => handleChange("fullDayHours", Number(e.target.value))}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Maximum Leave Carryover
          </label>
          <input
            type="number"
            value={localPolicies.maximumLeaveCarryover ?? ""}
            onChange={(e) =>
              handleChange("maximumLeaveCarryover", Number(e.target.value))
            }
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Half Day Hours
          </label>
          <input
            type="number"
            value={localPolicies.halfDayHours ?? ""}
            onChange={(e) => handleChange("halfDayHours", Number(e.target.value))}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Minimum Working Hours
          </label>
          <input
            type="number"
            value={localPolicies.minimumWorkingHours ?? ""}
            onChange={(e) =>
              handleChange("minimumWorkingHours", Number(e.target.value))
            }
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Auto‐Absence Threshold
          </label>
          <input
            type="number"
            value={localPolicies.autoAbsenceThreshold ?? ""}
            onChange={(e) =>
              handleChange("autoAbsenceThreshold", Number(e.target.value))
            }
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Months Between Hikes/Advances
          </label>
          <input
            type="number"
            value={localMonths ?? ""}
            onChange={(e) => setLocalMonths(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Grace  (Minutes)
          </label>
          <input
            type="number"
            value={localPolicies.gracePeriodMinutes ?? ""}
            onChange={(e) =>
              handleChange("gracePeriodMinutes", Number(e.target.value))
            }
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Calculate Salary Based On
          </label>
          <select
            value={localPolicies.calcSalaryBasedOn ?? "WORKING_DAYS"}
            onChange={(e) => handleChange("calcSalaryBasedOn", e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
          >
            <option value="WORKING_DAYS">Working Days in the Month</option>
            <option value="CALENDAR_DAYS">Total Calendar Days in the Month</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-8 mt-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Enable Overtime
          </label>
          <Switch
            checked={localPolicies.enableOvertime ?? false}
            onChange={() => handleSwitch("enableOvertime")}
            className={`${
              localPolicies.enableOvertime
                ? "bg-green-500"
                : "bg-gray-200 dark:bg-gray-700"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                localPolicies.enableOvertime ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Late Coming
          </label>
          <Switch
            checked={localPolicies.enableLateComing ?? false}
            onChange={() => handleSwitch("enableLateComing")}
            className={`${
              localPolicies.enableLateComing
                ? "bg-green-500"
                : "bg-gray-200 dark:bg-gray-700"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                localPolicies.enableLateComing ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
      {localPolicies.enableOvertime && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Overtime Rate Multiplier
            </label>
            <input
              type="number"
              step="0.1"
              value={localPolicies.overtimeRate ?? ""}
              onChange={(e) => handleChange("overtimeRate", Number(e.target.value))}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
              placeholder="e.g., 1.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Min Overtime Hours
            </label>
            <input
              type="number"
              value={localPolicies.overtimeEligibilityHours ?? ""}
              onChange={(e) =>
                handleChange("overtimeEligibilityHours", Number(e.target.value))
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
              placeholder="e.g. 10"
            />
          </div>
        </div>
      )}
      {localPolicies.enableLateComing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Grace Minutes
            </label>
            <input
              type="number"
              value={localPolicies.lateComingGraceMinutes ?? ""}
              onChange={(e) =>
                handleChange("lateComingGraceMinutes", Number(e.target.value))
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Penalty Type
            </label>
            <select
              value={localPolicies.lateComingPenaltyType ?? "fixed"}
              onChange={(e) => handleChange("lateComingPenaltyType", e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Late Coming Penalty Value
            </label>
            <input
              type="number"
              value={localPolicies.lateComingPenaltyValue ?? ""}
              onChange={(e) =>
                handleChange("lateComingPenaltyValue", Number(e.target.value))
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Max Monthly Lateness Allowed
            </label>
            <input
              type="number"
              value={localPolicies.maxMonthlyLatenessAllowed ?? ""}
              onChange={(e) =>
                handleChange("maxMonthlyLatenessAllowed", Number(e.target.value))
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700"
              placeholder="e.g. 3"
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
}
