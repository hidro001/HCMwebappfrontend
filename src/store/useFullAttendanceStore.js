// src/stores/useFullAttendanceStore.js

import { create } from "zustand";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../service/axiosInstance";
import {
  convertTo24Hour,
  convertTo24HourTime,
  getAllDaysInMonth,
} from "../utils/attendanceUtils";

const useFullAttendanceStore = create((set, get) => ({
  // -------------------------------
  //  State
  // -------------------------------
  userProfileData: null,
  approvedLeaves: [],
  attendanceData: [],
  companySettings: null,
  shiftTimingDetails: null,
  employmentTypeDetails: null,
  leaveSystemDetails: null,
  monthlyPaidLeaves: 0,
  totalPaidLeaves: 0,
  deductionDetails: [],
  attendancePolicies: null,
  error: null,
  isLoading: false,

  // If you want to store "dummy data" fallback:
  dummyAttendanceData: [
    // The same placeholder array you had in the new UI.
    // So if real fetch fails or is empty, you can use these.
    {
      sl: 1,
      date: "2025-01-01",
      day: "Wednesday",
      logInTime: "10:39:45",
      logOutTime: "19:07:56",
      totalBreak: "45min 20sec",
      status: "Present",
    },
    // ...
    // replicate your entire dummy array
  ],

  // Example: you might also store a "fetched" boolean or something similar
  hasRealData: false,

  // -------------------------------
  //  Actions (async or sync)
  // -------------------------------
  fetchAllData: async (employeeId) => {
    // This replicates the big useEffect from old code
    try {
      set({ isLoading: true, error: null });

      // 1) Fetch user profile
      const userProfileResponse = await axiosInstance.post(
        `/user/getuser/${employeeId}`
      );
      if (!userProfileResponse.data?.success) {
        throw new Error(
          userProfileResponse.data?.message ||
            "Failed to fetch user profile data"
        );
      }
      const userData = userProfileResponse.data.data;









      // 2) Fetch approved leaves
      const approvedLeavesResponse = await axiosInstance.get(
        `/leave/employee/leaves`,
        {
          params: {
            status: "approved",
            employee_Id: employeeId,
          },
        }
      );
      let approvedLeavesData = [];
      if (Array.isArray(approvedLeavesResponse.data)) {
        approvedLeavesData = approvedLeavesResponse.data;
      } else if (
        approvedLeavesResponse.data?.success &&
        Array.isArray(approvedLeavesResponse.data.data)
      ) {
        approvedLeavesData = approvedLeavesResponse.data.data;
      } else if (
        approvedLeavesResponse.data?.success &&
        Array.isArray(approvedLeavesResponse.data.leave)
      ) {
        approvedLeavesData = approvedLeavesResponse.data.leave;
      }

      // 3) Fetch attendance
      const attendanceResponse = await axiosInstance.get(
        `/employee/attendencev2`,
        {
          params: {
            employee_Id: employeeId,
          },
        }
      );
      if (!attendanceResponse.data?.success) {
        throw new Error(
          attendanceResponse.data?.message || "Failed to fetch attendance data"
        );
      }
      // reduce duplicates by date if needed
      const uniqueData = attendanceResponse.data.data.reduce((acc, current) => {
        const found = acc.find((item) => item.date === current.date);
        if (!found) acc.push(current);
        return acc;
      }, []);

      // 4) Fetch company settings
      const companySettingsResponse = await axiosInstance.get(
        `/superadmin/companysettings/settings`
      );
      if (!companySettingsResponse.data?.success) {
        throw new Error(
          companySettingsResponse.data?.message ||
            "Failed to fetch company settings"
        );
      }
      const settingsData = companySettingsResponse.data.data;

      // 5) find attendancePolicies
      const attendancePoliciesData = settingsData.attendancePolicies || {};

      // parse shift timing from user
      let userShiftStartTime = "10:00";
      let userShiftEndTime = "19:00";
      if (userData.shift_Timing) {
        // e.g. "Day Shift (10:00 - 19:00)"
        const timeMatch = userData.shift_Timing.match(/\(([^)]+)\)/);
        if (timeMatch && timeMatch[1]) {
          const [start, end] = timeMatch[1].split(" - ").map((t) => t.trim());
          userShiftStartTime = start;
          userShiftEndTime = end;
        }
      }
      // find shiftTiming object from settings
      const shiftTiming = settingsData.shiftTimings?.find(
        (st) => st.startTime === userShiftStartTime && st.endTime === userShiftEndTime
      );

      // find employment type object
      const employmentType = settingsData.employmentTypes?.find(
        (et) => et.name === userData.employee_Type
      );
      // find leave system
      let leaveSystem = null;
      let monthlyPaidLeavesValue = 0;
      let totalPaidLeavesValue = 0;
      const dateOfCreation = new Date(userData.createdAt);
      const today = new Date();

      if (employmentType) {
        const leaveSystemId = employmentType.leaveSystemId;
        leaveSystem = settingsData.leaveSystems?.find((ls) => ls.id === leaveSystemId);

        if (leaveSystem) {
          monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;
        }

        // months since creation
        let monthsSinceCreation =
          (today.getFullYear() - dateOfCreation.getFullYear()) * 12 +
          (today.getMonth() - dateOfCreation.getMonth()) -
          1;
        monthsSinceCreation = Math.max(0, monthsSinceCreation);

        totalPaidLeavesValue =
          (userData.no_of_Paid_Leave || 0) + monthsSinceCreation * monthlyPaidLeavesValue;
      }

      // find the deduction objects
      let deduceDetails = [];
      if (employmentType && employmentType.deductions) {
        deduceDetails = employmentType.deductions
          .map((deductionId) =>
            settingsData.deductions?.find((d) => d.id === deductionId)
          )
          .filter(Boolean); // remove undefined
      }

      set({
        userProfileData: userData,
        approvedLeaves: approvedLeavesData,
        attendanceData: uniqueData,
        companySettings: settingsData,
        shiftTimingDetails: shiftTiming || null,
        employmentTypeDetails: employmentType || null,
        leaveSystemDetails: leaveSystem,
        monthlyPaidLeaves: monthlyPaidLeavesValue,
        totalPaidLeaves: totalPaidLeavesValue,
        deductionDetails: deduceDetails,
        attendancePolicies: attendancePoliciesData,
        hasRealData: true,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error(err.message || "An unexpected error occurred.");
      set({
        error: err.message || "An unexpected error occurred.",
        hasRealData: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // ----------------------------------------------------
  // Calculation helpers (just like in old code)
  // Typically you’d keep them as “getters” inside the store
  // so the new UI can call them directly
  // or as separate pure functions in a utils file.
  // ----------------------------------------------------

  calculateTotalShifts: (year, month) => {
    const { attendanceData } = get();
    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        record.login &&
        record.logout
      );
    }).length;
  },

  calculateTotalLates: (year, month) => {
    const { attendanceData, shiftTimingDetails, attendancePolicies } = get();
    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month
      ) {
        const shiftStartTime = shiftTimingDetails?.startTime || "09:00";
        const gracePeriod = attendancePolicies?.gracePeriodMinutes || 15;
        const loginTime = record.login ? record.login : null;
        if (shiftStartTime && loginTime) {
          const shiftStart = new Date(`1970-01-01T${convertTo24Hour(shiftStartTime)}`);
          shiftStart.setMinutes(shiftStart.getMinutes() + gracePeriod);
          const loginDateTime = new Date(`1970-01-01T${convertTo24Hour(loginTime)}`);
          return loginDateTime > shiftStart;
        }
      }
      return false;
    }).length;
  },

  calculateTotalHalfDays: (year, month) => {
    const { attendanceData, attendancePolicies } = get();
    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        record.login &&
        record.logout
      ) {
        const logInTime = new Date(`1970-01-01T${convertTo24Hour(record.login)}`);
        const logOutTime = new Date(`1970-01-01T${convertTo24Hour(record.logout)}`);
        const hoursWorked = (logOutTime - logInTime) / (1000 * 60 * 60);
        return (
          hoursWorked > (attendancePolicies?.minimumWorkingHours || 4.5) &&
          hoursWorked <= (attendancePolicies?.halfDayHours || 5)
        );
      }
      return false;
    }).length;
  },

  calculateNotEvenHalfDays: (year, month) => {
    const { attendanceData } = get();
    let count = 0;
    attendanceData.forEach((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        record.login &&
        record.logout
      ) {
        const loginDate = convertTo24HourTime(record.login);
        const logoutDate = convertTo24HourTime(record.logout);
        if (loginDate && logoutDate) {
          const timeDifferenceInSeconds = (logoutDate - loginDate) / 1000;
          // e.g., < 4.5 hours
          if (timeDifferenceInSeconds < 4.5 * 3600) {
            count++;
          }
        }
      }
    });
    return count;
  },

  calculateNotLoggedOut: (year, month) => {
    const { attendanceData } = get();
    const today = new Date();
    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        record.login &&
        !record.logout &&
        recordDate <= today
      );
    }).length;
  },

  calculateTotalCompletedDays: (year, month) => {
    const { attendanceData, attendancePolicies } = get();
    const completedDays = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        record.login &&
        record.logout
      ) {
        const loginTime = new Date(`1970-01-01T${convertTo24Hour(record.login)}`);
        const logoutTime = new Date(`1970-01-01T${convertTo24Hour(record.logout)}`);
        const hoursWorked = (logoutTime - loginTime) / (1000 * 60 * 60);
        return hoursWorked >= (attendancePolicies?.fullDayHours || 9);
      }
      return false;
    });
    return completedDays.length;
  },

  // ... etc. You’d replicate all the old logic as needed.

  // Example function to generate a PDF (like the old code’s generatePDF).
  // Here, it doesn't tie to any sweetalert2. Instead, you can show your custom ConfirmationDialog
  // in your UI, then if the user confirms, call this method.
  generatePDF: () => {
    // The old code used sweetalert2. Now you can handle the "confirmation" in your custom dialog at the UI level.
    const doc = new jsPDF();
    doc.text("Hello from the PDF logic in Zustand store!", 10, 10);
    doc.save("payroll.pdf");
    toast.success("PDF downloaded successfully!");
  },
}));

export default useFullAttendanceStore;
