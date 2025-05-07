import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";
import { parse } from "date-fns";

/* --------------------------------------
   HELPER FUNCTIONS
-------------------------------------- */

// Convert 12-hour "hh:mm:ss AM/PM" → 24-hour "HH:mm:ss"
function convertTo24Hour(time) {
  if (!time) return null;
  let [hourPart, modifier] = time.split(" ");
  let [hours, minutes, seconds] = hourPart.split(":");
  hours = parseInt(hours, 10);
  minutes = minutes || "00";
  seconds = seconds || "00";

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
}

// Calculate hours difference
function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const loginDate = parse(convertTo24Hour(login), "HH:mm:ss", new Date());
  const logoutDate = parse(convertTo24Hour(logout), "HH:mm:ss", new Date());
  const diff = logoutDate - loginDate;
  return diff / (1000 * 60 * 60);
}

// Return all working days (if needed)
function getTotalWorkingDays(
  leaveSystemDetails,
  companySettings,
  year,
  month,
  upToToday = false
) {
  // Implementation from your original code, if needed
  // Or keep your existing logic
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  const today = new Date();

  while (date.getMonth() === month - 1) {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const isWorkingDay =
      leaveSystemDetails?.workingDays?.includes(dayName) || false;

    const isHoliday = companySettings?.holidays?.some((h) => {
      const holidayDate = new Date(h.date);
      return holidayDate.toDateString() === date.toDateString();
    });

    if (isWorkingDay && !isHoliday) {
      if (upToToday && date > today) {
        // skip future dates if upToToday
      } else {
        days.push(new Date(date));
      }
    }
    date.setDate(date.getDate() + 1);
  }

  return days.length;
}

// Calculate total leaves used
function calculateTotalLeaves({
  attendanceData,
  approvedLeaves,
  leaveSystemDetails,
  companySettings,
  year,
  month,
}) {
  // EXACT logic from your snippet (you can unify if you like).
  // For brevity, let's do a simple example:
  let totalLeaves = 0;
  // ...
  // your code to figure out how many days are absent (that are not holidays, not weekends, etc.)
  // ...
  return totalLeaves;
}

// Calculate not even half days
function calculateNotEvenHalfDays(attendanceData, year, month) {
  let count = 0;
  attendanceData.forEach((rec) => {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > 0 && hoursWorked < 4.5) {
          count++;
        }
      }
    }
  });
  return count;
}

// Example “calculateFinalSalary” pulled from your snippet
function calculateFinalSalary({
  baseSalary,
  attendanceData,
  approvedLeaves,
  companySettings,
  employmentTypeDetails,
  userProfileData,
  leaveSystemDetails,
  attendancePolicies,
  year,
  month,
}) {
  // If baseSalary is 0 or missing, bail out
  if (!baseSalary || !attendancePolicies || baseSalary <= 0) {
    return {
      finalSalary: "₹ 0.00",
      deduction: "₹ 0.00",
      leaves: 0,
      unpaidLeaves: 0,
      remainingPaidLeaves: 0,
      deductionsBreakdown: [],
    };
  }

  // Example from your snippet:
  const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
  const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

  // denominator
  const denom =
    calcMethod === "CALENDAR_DAYS"
      ? new Date(year, month, 0).getDate()
      : getTotalWorkingDays(leaveSystemDetails, companySettings, year, month);

  // up to today if current
  const isCurrentMonthAndYear =
    year === new Date().getFullYear() && month === new Date().getMonth() + 1;
  let daysUpToToday = denom;
  if (isCurrentMonthAndYear) {
    daysUpToToday =
      calcMethod === "CALENDAR_DAYS"
        ? Math.min(new Date().getDate(), denom)
        : getTotalWorkingDays(
            leaveSystemDetails,
            companySettings,
            year,
            month,
            true
          );
  }

  // total leaves
  const totalLeaves = calculateTotalLeaves({
    attendanceData,
    approvedLeaves,
    leaveSystemDetails,
    companySettings,
    year,
    month,
  });
  const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

  // figure out how many of those are "unpaid" vs "paid"
  let paidLeavesUsed = 0;
  for (const lv of approvedLeaves) {
    const from = new Date(lv.leave_From);
    const to = new Date(lv.leave_To);
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      if (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        lv.is_Paid === true
      ) {
        paidLeavesUsed++;
      }
    }
  }
  const totalUnpaidLeaves = totalLeaves + notEvenHalfDays; // simplified
  const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

  // standard deductions
  const deductionIds = employmentTypeDetails?.deductions || [];
  const allDeductions = companySettings?.deductions || [];
  const deductionDetails = deductionIds
    .map((id) => allDeductions.find((d) => d.id === id))
    .filter(Boolean);

  let totalDeductionsAmount = 0;
  const breakdown = [];

  for (const ded of deductionDetails) {
    const amount = (ded.percentage / 100) * baseSalary;
    totalDeductionsAmount += amount;
    breakdown.push({
      name: ded.name,
      percentage: ded.percentage + "%",
      amount,
    });
  }

  const leftoverAfterDeductions = Math.max(
    0,
    baseSalary - totalDeductionsAmount
  );

  // fraction
  const fractionOfMonthWorked = daysUpToToday / denom;
  const payForDaysUpToToday = leftoverAfterDeductions * fractionOfMonthWorked;

  // daily rate
  const dailyRate = leftoverAfterDeductions / denom;
  const leavesDeduction = unpaidLeaves * dailyRate;
  breakdown.push({
    name: "Leaves Deduction",
    percentage: "-",
    amount: leavesDeduction,
  });

  const finalSalaryAmount = Math.max(0, payForDaysUpToToday - leavesDeduction);

  return {
    finalSalary: "₹ " + finalSalaryAmount.toFixed(2),
    deduction: "₹ " + totalDeductionsAmount.toFixed(2),
    leaves: totalUnpaidLeaves,
    unpaidLeaves,
    remainingPaidLeaves: Math.max(totalPaidLeaves - paidLeavesUsed, 0),
    deductionsBreakdown: breakdown,
  };
}

/* Parse shift timing strings like "Saket (09:00 - 07:00)" */
function parseShiftTiming(shiftTimingString) {
  if (!shiftTimingString) return null;
  const regex = /(.+?)\s*\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/;
  const match = shiftTimingString.match(regex);
  if (match) {
    const [, name, startTime, endTime] = match;
    return {
      name: name.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    };
  }
  return null;
}

export const useOwnFullAttendanceStore = create(
  persist(
    (set, get) => ({
      // ---------- STATES ----------
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
      attendancePolicies: {},
      error: null,

      // ---------- ACTIONS ----------

      fetchAttendanceData: async () => {
        try {
          // 1) User profile
          const userProfileRes = await axiosInstance.get("/user/profile");
          if (!userProfileRes.data.success) {
            throw new Error(
              userProfileRes.data.message || "Failed to fetch user profile"
            );
          }
          const userData = userProfileRes.data.response;

          // 2) Approved Leaves
          const approvedLeavesRes = await axiosInstance.get(
            "/leaves/employee/?status=approved"
          );
          let approvedLeavesData = [];
          if (Array.isArray(approvedLeavesRes.data)) {
            approvedLeavesData = approvedLeavesRes.data;
          } else if (
            approvedLeavesRes.data.success &&
            Array.isArray(approvedLeavesRes.data.leave)
          ) {
            approvedLeavesData = approvedLeavesRes.data.leave;
          }
          const currentEmployeeId = userData.employee_Id;
          const filteredApprovedLeaves = approvedLeavesData.filter(
            (leave) => leave.employee?.employee_Id === currentEmployeeId
          );

          // 3) Attendance
          const attendanceRes = await axiosInstance.get("/attendance-user");
          if (!attendanceRes.data.success) {
            throw new Error(
              attendanceRes.data.message || "Failed to fetch attendance data"
            );
          }
          const uniqueData = attendanceRes.data.data.reduce((acc, item) => {
            if (!acc.find((x) => x.date === item.date)) {
              acc.push(item);
            }
            return acc;
          }, []);

          // 4) Company Settings
          const settingsRes = await axiosInstance.get(
            "/company-settings"
          );
          if (!settingsRes.data.success) {
            throw new Error(
              settingsRes.data.message || "Failed to fetch company settings"
            );
          }
          const settingsData = settingsRes.data.data;
          const allShifts = settingsData.shifts || [];
          // SHIFT TIMING
          let finalShiftTiming = null;
          // 1) If userData.shift_Timing is an object with name/startTime/endTime
          if (
            userData.shift_Timing &&
            typeof userData.shift_Timing === "object" &&
            userData.shift_Timing.name &&
            userData.shift_Timing.startTime &&
            userData.shift_Timing.endTime
          ) {
            finalShiftTiming = {
              name: userData.shift_Timing.name,
              startTime: userData.shift_Timing.startTime,
              endTime: userData.shift_Timing.endTime,
            };
          }
          // 2) If userData.shift_Timing is a string that looks like "Name (00:00 - 00:00)"
          else if (
            typeof userData.shift_Timing === "string" &&
            userData.shift_Timing.includes("(") // just a quick guess
          ) {
            finalShiftTiming = parseShiftTiming(userData.shift_Timing) || null;
          }
          // 3) If userData.shift_Timing is a string that looks like an ID
          else if (
            typeof userData.shift_Timing === "string" &&
            userData.shift_Timing.length > 15 // or some other check
          ) {
            // NEW CODE: Try to find it in allShifts by ID
            const shiftId = userData.shift_Timing;
            const foundShift = allShifts.find((sh) => sh.id === shiftId);
            if (foundShift) {
              finalShiftTiming = {
                name: foundShift.name,
                startTime: foundShift.startTime,
                endTime: foundShift.endTime,
              };
            }
          }

          const attendancePoliciesData = settingsData.attendancePolicies || {};
          const employmentType = settingsData.employmentTypes?.find(
            (et) => et.name === userData.employee_Type
          );
          if (!employmentType) {
            throw new Error(
              `Employment type "${userData.employee_Type}" not found in company settings.`
            );
          }
          const leaveSystemId = employmentType.leaveSystemId;
          const leaveSystem = settingsData.leaveSystems?.find(
            (ls) => ls.id === leaveSystemId
          );

          const monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;
          const totalPaidLeavesValue = userData?.no_of_Paid_Leave || 0;

          const employeeDeductions = (employmentType.deductions || [])
            .map((dedId) => settingsData.deductions.find((d) => d.id === dedId))
            .filter(Boolean);

          // Store everything
          set(() => ({
            userProfileData: userData,
            approvedLeaves: filteredApprovedLeaves,
            attendanceData: uniqueData,
            companySettings: settingsData,
            shiftTimingDetails: finalShiftTiming,
            employmentTypeDetails: employmentType,
            leaveSystemDetails: leaveSystem,
            monthlyPaidLeaves: monthlyPaidLeavesValue,
            totalPaidLeaves: totalPaidLeavesValue,
            deductionDetails: employeeDeductions,
            attendancePolicies: attendancePoliciesData,
            error: null,
          }));
        } catch (err) {
          console.error(err);
          set(() => ({ error: err?.message || "Something went wrong" }));
          toast.error(err?.message || "Something went wrong", {
            position: "top-center",
          });
        }
      },

      // Generate PDF for a specific (year, month)
      generatePDF: async (year, month) => {
        try {
          // 1) Grab data from the store
          const {
            attendanceData,
            approvedLeaves,
            companySettings,
            employmentTypeDetails,
            userProfileData,
            leaveSystemDetails,
            attendancePolicies,
          } = get();

          // 2) Calculate final salary for that (year, month)
          const baseSalary = parseFloat(userProfileData?.current_Base_Salary) || 0;
          const { finalSalary, deduction, leaves } = calculateFinalSalary({
            baseSalary,
            attendanceData,
            approvedLeaves,
            companySettings,
            employmentTypeDetails,
            userProfileData,
            leaveSystemDetails,
            attendancePolicies,
            year,
            month,
          });

          // Dynamically import jsPDF and jspdf-autotable
          const { default: JSPDF } = await import("jspdf");
          await import("jspdf-autotable"); // extends jsPDF

          // Create doc after imports
          const doc = new JSPDF();

          // Title
          doc.setFontSize(14);
          doc.text(
            `Payslip for ${userProfileData?.first_Name || "Employee"}`,
            10,
            10
          );

          // Example table
          doc.autoTable({
            head: [["Description", "Value"]],
            body: [
              ["Employee ID", userProfileData?.employee_Id || "N/A"],
              ["Month/Year", `${month}/${year}`],
              ["Base Salary", `₹ ${baseSalary.toFixed(2)}`],
              ["Leaves (Unpaid)", String(leaves)],
              ["Deductions", deduction],
              ["Final Salary", finalSalary],
            ],
            startY: 20,
            theme: "grid",
          });

          doc.save(`Payslip_${month}_${year}.pdf`);
          toast.success("Payslip PDF downloaded!", { position: "top-center" });
        } catch (err) {
          console.error(err);
          toast.error("Failed to generate PDF");
        }
      },
    }),
    {
      name: "own-attendance-store",
    }
  )
);
