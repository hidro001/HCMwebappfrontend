import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPrinter, FiDownload, FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../common/ConfirmationDialog";
import 'react-clock/dist/Clock.css';      // React Clock's default styles
import 'react-time-picker/dist/TimePicker.css'; 
import TimePicker from 'react-time-picker';
import axiosInstance from "../../service/axiosInstance";

// If your store has a PDF method, import that from your Zustand store
import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";
import {
  FiBriefcase,
  FiCalendar,
  FiAlertTriangle,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiLogOut,
} from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* 
  --------------------------------------------------------------------------------------
  HELPER FUNCTIONS (no TypeScript, purely JS)
  --------------------------------------------------------------------------------------
*/

// Returns all days of a given (year, month) pinned around noon to avoid TZ shift:
function getAllDaysInMonth(year, month) {
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Convert "hh:mm:ss AM/PM" → "HH:mm:ss" in 24-hour format
function convertTo24Hour(timeString) {
  if (!timeString) return null;
  const [timePart, ampm] = timeString.split(" ");
  if (!timePart || !ampm) return null;

  let [hours, minutes, seconds] = timePart.split(":").map(Number);
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;

  if (ampm.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (ampm.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

// Calculate hours difference between login/logout
function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const login24 = convertTo24Hour(login);
  const logout24 = convertTo24Hour(logout);
  if (!login24 || !logout24) return 0;

  const loginDate = new Date("1970-01-01T" + login24);
  const logoutDate = new Date("1970-01-01T" + logout24);
  const diffMs = logoutDate - loginDate;
  return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
}

// If your breaks contain either durations in minutes or start/end times:
function getTotalBreakTime(breaks = []) {
  let totalMinutes = 0;
  for (const br of breaks) {
    if (typeof br.duration === "number" && br.duration > 0) {
      totalMinutes += br.duration;
    } else if (br.start && br.end) {
      const start = new Date(br.start);
      const end = new Date(br.end);
      const diffMs = end - start;
      const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
      totalMinutes += diffMins;
    }
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

// Return only unique dates from attendance to avoid duplicates
function getUniqueAttendanceData(attendanceData = []) {
  const unique = [];
  const seen = new Set();
  for (const record of attendanceData) {
    if (!seen.has(record.date)) {
      unique.push(record);
      seen.add(record.date);
    }
  }
  return unique;
}

// total shifts (old snippet logic)
function calculateTotalShifts(attendanceData, year, month) {
  return attendanceData.filter((rec) => {
    const d = new Date(rec.date);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      rec.login &&
      rec.logout
    );
  }).length;
}

// total leaves (excluding approved, ignoring holidays, etc.)
function calculateTotalLeaves({
  attendanceData,
  approvedLeaves,
  leaveSystemDetails,
  companySettings,
  year,
  month,
}) {
  const allDays = getAllDaysInMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const approvedLeaveDates = new Set();
  for (const leave of approvedLeaves) {
    const fromDate = new Date(leave.leave_From);
    const toDate = new Date(leave.leave_To);
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      approvedLeaveDates.add(d.toISOString().split("T")[0]);
    }
  }

  let totalLeaves = 0;
  for (const dateObj of allDays) {
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const isWorkingDay =
      leaveSystemDetails &&
      leaveSystemDetails.workingDays &&
      leaveSystemDetails.workingDays.includes(dayName);
    const isHoliday =
      companySettings &&
      companySettings.holidays &&
      companySettings.holidays.some(
        (h) => new Date(h.date).toISOString().split("T")[0] === formatted
      );

    if (!isWorkingDay || isHoliday) {
      continue;
    }
    if (approvedLeaveDates.has(formatted)) {
      continue;
    }

    const rec = attendanceData.find((r) => r.date === formatted);
    if (dateObj <= today) {
      if (!rec || !rec.login) {
        totalLeaves++;
      }
    }
  }
  return totalLeaves;
}

// total half days
function calculateTotalHalfDays(
  attendanceData,
  year,
  month,
  attendancePolicies
) {
  const halfDayHours = attendancePolicies?.halfDayHours || 5;
  const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > minWork && hoursWorked <= halfDayHours) {
          count++;
        }
      }
    }
  }
  return count;
}

// not even half day
function calculateNotEvenHalfDays(attendanceData, year, month) {
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > 0 && hoursWorked < 4.5) {
          count++;
        }
      }
    }
  }
  return count;
}

// completed days (≥ attendancePolicies.fullDayHours or 9 default)
function calculateTotalCompletedDays(
  attendanceData,
  year,
  month,
  attendancePolicies
) {
  const fullDayHours = attendancePolicies?.fullDayHours || 9;
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked >= fullDayHours) {
          count++;
        }
      }
    }
  }
  return count;
}

// total lates
function calculateTotalLates(
  attendanceData,
  year,
  month,
  shiftStart,
  attendancePolicies
) {
  if (!shiftStart) return 0;
  const graceMins = attendancePolicies?.gracePeriodMinutes || 15;

  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month && rec.login) {
      const shiftStart24 = convertTo24Hour(shiftStart);
      if (!shiftStart24) continue;
      const shiftDate = new Date("1970-01-01T" + shiftStart24);
      shiftDate.setMinutes(shiftDate.getMinutes() + graceMins);

      const loginDate = new Date("1970-01-01T" + convertTo24Hour(rec.login));
      if (loginDate > shiftDate) {
        count++;
      }
    }
  }
  return count;
}

// not logged out
function calculateNotLoggedOut(attendanceData, year, month) {
  const today = new Date();
  return attendanceData.filter((rec) => {
    const d = new Date(rec.date);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      rec.login &&
      !rec.logout &&
      d <= today
    );
  }).length;
}

// get total working days
function getTotalWorkingDays(
  leaveSystemDetails,
  companySettings,
  year,
  month,
  upToToday = false
) {
  const allDays = getAllDaysInMonth(year, month);
  const today = new Date();
  const workingDays = allDays.filter((dateObj) => {
    if (
      upToToday &&
      year === today.getFullYear() &&
      month === today.getMonth() + 1 &&
      dateObj > today
    ) {
      return false;
    }
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const isWorkingDay =
      leaveSystemDetails &&
      leaveSystemDetails.workingDays &&
      leaveSystemDetails.workingDays.includes(dayName);
    const isHoliday =
      companySettings &&
      companySettings.holidays &&
      companySettings.holidays.some(
        (h) =>
          new Date(h.date).toISOString().split("T")[0] ===
          dateObj.toISOString().split("T")[0]
      );
    return isWorkingDay && !isHoliday;
  });
  return workingDays.length;
}

// next payroll date
function getPayrollPeriodDates({
  year,
  month,
  userProfileData,
  companySettings,
  employmentTypeDetails,
}) {
  if (!employmentTypeDetails || !companySettings || !userProfileData) {
    return { startDate: null, endDate: null, nextPayrollDate: null };
  }
  const payrollCycleId = employmentTypeDetails.payrollCycleId;
  const payrollCycle = companySettings?.payrollCycles?.find(
    (pc) => pc.id === payrollCycleId
  );
  if (!payrollCycle) {
    return { startDate: null, endDate: null, nextPayrollDate: null };
  }

  const processingDate = payrollCycle.processingDate;
  let startDate, endDate;

  if (processingDate === 1) {
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month, 0);
  } else {
    startDate = new Date(year, month - 2, processingDate);
    endDate = new Date(year, month - 1, processingDate - 1);
  }

  const doj = new Date(userProfileData.date_of_Joining);
  if (startDate < doj) startDate = doj;

  const now = new Date();
  if (endDate > now) endDate = now;

  let nextPayrollDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    processingDate
  );

  return { startDate, endDate, nextPayrollDate };
}

// parse shift timing (e.g., "Saket (09:00 - 07:00)")
function parseShiftTiming(shiftString) {
  if (!shiftString) return null;
  const regex = /(.+?)\s*\((\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\)/;
  const match = shiftString.match(regex);
  if (!match) return null;
  const [_, name, start, end] = match;
  return { name: name.trim(), startTime: start.trim(), endTime: end.trim() };
}

// old snippet approach to final salary
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

  const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
  const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

  // determine denominator
  const denom =
    calcMethod === "CALENDAR_DAYS"
      ? new Date(year, month, 0).getDate()
      : getTotalWorkingDays(
          leaveSystemDetails,
          companySettings,
          year,
          month,
          false
        );

  const isCurrentMonthAndYear =
    year === new Date().getFullYear() && month === new Date().getMonth() + 1;
  const daysUpToToday = isCurrentMonthAndYear
    ? calcMethod === "CALENDAR_DAYS"
      ? Math.min(new Date().getDate(), denom)
      : getTotalWorkingDays(
          leaveSystemDetails,
          companySettings,
          year,
          month,
          true
        )
    : denom;

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
  const notLoggedOutDays = calculateNotLoggedOut(attendanceData, year, month);
  const totalUnpaidLeaves = totalLeaves + notEvenHalfDays + notLoggedOutDays;

  // how many of those are "paid" leaves
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
  const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

  // standard deductions from employmentType
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

  // fraction of the month
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

  // final
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

// monthName
function monthName(m) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[m - 1] || "Unknown";
}

/* 
  --------------------------------------------------------------------------------------
  MAIN COMPONENT
  --------------------------------------------------------------------------------------
*/
export default function OwmFullAttendance() {
const [punchReason, setPunchReason] = useState("");
  const [missedPunchModalOpen, setMissedPunchModalOpen] = useState(false);
const [selectedDateForPunch, setSelectedDateForPunch] = useState(null);
const [punchInTime, setPunchInTime] = useState("");
const [punchOutTime, setPunchOutTime] = useState("");
  const fetchAttendanceData = useOwnFullAttendanceStore(
    (s) => s.fetchAttendanceData
  );
  const attendanceDataRaw = useOwnFullAttendanceStore((s) => s.attendanceData);
  const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
  const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
  const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);

  const attendancePolicies = useOwnFullAttendanceStore(
    (s) => s.attendancePolicies
  );
  const employmentTypeDetails = useOwnFullAttendanceStore(
    (s) => s.employmentTypeDetails
  );
  const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);
  const attendanceError = useOwnFullAttendanceStore((s) => s.error);
  const leaveSystemDetails = useOwnFullAttendanceStore(
    (s) => s.leaveSystemDetails
  );

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function openMissedPunchModal(dateRow) {
  // 'dateRow' is the object containing date info, etc.
  setSelectedDateForPunch(dateRow);
  setMissedPunchModalOpen(true);
}

  // Date controls
  const today = new Date();
  const defaultMonthString =
    today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

  // Search & pagination
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  // parse year & month
  const parts = selectedMonth.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  // Make sure we have unique attendance records
  const attendanceData = getUniqueAttendanceData(attendanceDataRaw || []);

  // SHIFT TIMING
  const shiftTimingDetails = parseShiftTiming(
    userProfileData?.shift_Timing || ""
  );

  // Build daily table
  const allDaysInMonth = getAllDaysInMonth(year, month);

  // set of approved leaves
  const approvedLeaveDates = new Set();
  if (approvedLeaves) {
    for (const lv of approvedLeaves) {
      const fromDate = new Date(lv.leave_From);
      const toDate = new Date(lv.leave_To);
      for (
        let d = new Date(fromDate);
        d <= toDate;
        d.setDate(d.getDate() + 1)
      ) {
        approvedLeaveDates.add(d.toISOString().split("T")[0]);
      }
    }
  }

  const todayObj = new Date();
  const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    let row = {
      sl: idx + 1,
      date: formatted,
      day: dayName,
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "N/A",
      status: "------",
    };

    // Check if holiday or not working or an approved leave
    const isHoliday = companySettings?.holidays?.some(
      (h) => new Date(h.date).toISOString().split("T")[0] === formatted
    );
    const isWorkingDay =
      leaveSystemDetails?.workingDays?.includes(dayName) || false;
    const isApprovedLeave = approvedLeaveDates.has(formatted);

    if (isApprovedLeave) {
      // old code might say "Paid Leave" or "Unpaid Leave" – up to you
      row.status = "Holiday";
      return row;
    }
    if (!isWorkingDay || isHoliday) {
      row.status = "Holiday";
      return row;
    }

    // find attendance record
    const record = attendanceData.find((r) => r.date === formatted);
    if (!record) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // fill in login/logout
    if (record.login) row.logInTime = record.login;
    if (record.logout) row.logOutTime = record.logout;

    // breaks
    if (record.breaks && record.breaks.length > 0) {
      row.totalBreak = getTotalBreakTime(record.breaks);
    }

    // if no logout in the past => absent
    if (!record.logout) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // Calculate total hours worked
    const hoursWorked = getHoursWorked(record.login, record.logout);

    // Convert decimal hours to “h m” format
    const wholeHours = Math.floor(hoursWorked); //total hours worked
    const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60); //total hours worked

    // Now store a string like "7h 21m"
    row.hoursWorked = `${wholeHours}h ${remainingMinutes}m`; //total hours worked

    if (hoursWorked >= 9) {
      row.status = "Present";
    } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
      row.status = hoursWorked <= 5 ? "Half Day" : "Not Even Half Day";
    } else if (hoursWorked > 0 && hoursWorked < 4.5) {
      row.status = "Not Even Half Day";
    } else {
      row.status = "Present";
    }
    return row;
  });

  // filter by search
  const filteredData = finalAttendanceData.filter((item) => {
    const combined = (item.date + " " + item.day + " " + item.status)
      .toLowerCase()
      .trim();
    return combined.includes(searchText.toLowerCase().trim());
  });

  // pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // "Old snippet" stats
  const totalShifts = calculateTotalShifts(attendanceData, year, month);
  const totalLates = calculateTotalLates(
    attendanceData,
    year,
    month,
    shiftTimingDetails?.startTime || null,
    attendancePolicies
  );
  const notLoggedOut = calculateNotLoggedOut(attendanceData, year, month);
  const totalLeaves = calculateTotalLeaves({
    attendanceData,
    approvedLeaves,
    leaveSystemDetails,
    companySettings,
    year,
    month,
  });
  const totalCompletedDays = calculateTotalCompletedDays(
    attendanceData,
    year,
    month,
    attendancePolicies
  );
  const halfDays = calculateTotalHalfDays(
    attendanceData,
    year,
    month,
    attendancePolicies
  );
  const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

  // final salary
  // Parse the userProfileData?.salary as a number to avoid the toFixed() crash:
  const numericBaseSalary =
    parseFloat(userProfileData?.current_Base_Salary) || 0;

  const {
    finalSalary,
    deduction,
    leaves,
    remainingPaidLeaves,
    deductionsBreakdown,
  } = calculateFinalSalary({
    baseSalary: numericBaseSalary,
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

  // next payroll date
  const { nextPayrollDate } = getPayrollPeriodDates({
    year,
    month,
    userProfileData,
    companySettings,
    employmentTypeDetails,
  });
  const formattedNextPayrollDate = nextPayrollDate
    ? nextPayrollDate.toDateString()
    : "Not available";

  // event handlers
  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  }
  function handleSearch(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }
  function handleRowsPerPage(e) {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }
  function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }

  function onRequestPDF() {
    setConfirmDialogOpen(true);
  }

  function onConfirmPDF() {
    setConfirmDialogOpen(false);
    // Generate PDF for the selected month/year
    if (generatePDF) {
      generatePDF(year, month);
    } else {
      toast.error("No PDF generator found in the store!");
    }
  }

  function onCancelPDF() {
    setConfirmDialogOpen(false);
    toast("PDF download cancelled", { icon: "❌" });
  }
  if (attendanceError) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-300">
        <p>Error: {attendanceError}</p>
      </div>
    );
  }

  const empName =
    (userProfileData?.first_Name || "") +
    " " +
    (userProfileData?.last_Name || "");
  const empCode = userProfileData?.employee_Id || "N/A";

  function renderStatusBadge(status) {
    let bgColor = "bg-gray-100 dark:bg-gray-700";
    let textColor = "text-gray-600 dark:text-gray-200";

    switch ((status || "").toLowerCase()) {
      case "present":
        bgColor = "bg-green-100 dark:bg-green-900";
        textColor = "text-green-700 dark:text-green-100";
        break;
      case "absent":
        bgColor = "bg-red-100 dark:bg-red-900";
        textColor = "text-red-700 dark:text-red-100";
        break;
      case "holiday":
        bgColor = "bg-black";
        textColor = "text-white";
        break;
      case "half day":
        bgColor = "bg-pink-100 dark:bg-pink-900";
        textColor = "text-pink-700 dark:text-pink-100";
        break;
      case "not even half day":
        bgColor = "bg-gray-100 dark:bg-gray-700";
        textColor = "text-gray-600 dark:text-gray-200";
        break;
      default:
        break;
    }

    return (
      <span
        className={`px-2 py-1 text-sm rounded-md font-medium ${bgColor} ${textColor}`}
      >
        {status || "------"}
      </span>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <motion.h1
        className="text-xl md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Attendance for {monthName(month)} {year} ( {empName.trim()} ({empCode})
        )
      </motion.h1>

      {/* Controls row */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between 
                   bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center gap-4">
          {/* Rows Per Page */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Show
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
              value={rowsPerPage}
              onChange={handleRowsPerPage}
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
            </select>
          </div>

          {/* Month-Year input */}
          <div>
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm 
                         text-gray-700 dark:text-gray-200
                         bg-white dark:bg-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Right group: Search + icons */}

        {/* Search box */}
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
                         rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
          />
          <FiSearch
            className="absolute right-2 top-1/2 -translate-y-1/2 
                         text-gray-400 dark:text-gray-400"
            size={16}
          />
        </div>

        {/* Print */}
        <div className="flex justify-end space-x-3">
          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded bg-green-100 hover:bg-green-200"
          >
            <FiPrinter className="text-green-600" size={16} />
          </button>

          {/* Download Payslip button (with confirmation) */}
          <button
            className="p-2 rounded bg-pink-100 hover:bg-pink-200"
            onClick={onRequestPDF}
          >
            <FiDownload className="text-pink-600" size={16} />
            {/* Or label: "Download Payslip" */}
          </button>
        </div>
      </motion.div>

      {/* Main area: table + side overview */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Table (3/4) */}
        <div className="lg:col-span-3">
          <motion.div
            className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full text-left min-w-max">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  <th className="py-3 px-4">S.L</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Log In Time</th>
                  <th className="py-3 px-4">Log Out Time</th>
                  <th className="py-3 px-4">Hours Worked</th>
                  <th className="py-3 px-4">Total Break</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item) => (
                  <tr
                    key={item.sl}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <td className="py-3 px-4">
                      {String(item.sl).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.day}</td>
                    <td className="py-3 px-4">{item.logInTime}</td>
                    <td className="py-3 px-4">{item.logOutTime}</td>
                    <td className="py-3 px-4">{item.hoursWorked}</td>
                    <td className="py-3 px-4">{item.totalBreak}</td>
                    
                    <td className="py-3 px-4">
  {renderStatusBadge(item.status)}

  {/* If there's no login or it's a holiday, show "Request Punch" button */}
  {((item.status === "Absent") || (item.status === "Holiday")) && (
    <button
      className="ml-2 text-blue-500 hover:underline"
      onClick={() => openMissedPunchModal(item)}
    >
      Request Punch
    </button>
  )}
</td>
                  </tr>
                ))}
                {displayedData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between mt-3 text-sm 
                       text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-2 sm:mb-0">
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
              {totalEntries} entries
            </p>
            <div className="space-x-1">
              <button
                onClick={() => goToPage(safeCurrentPage - 1)}
                className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                           text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                    ${
                      safeCurrentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(safeCurrentPage + 1)}
                className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded 
                           text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                &gt;
              </button>
            </div>
          </motion.div>
        </div>

        {/* Side panel (1/4) */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-md shadow p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
            Employee Overview
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>
                <FiBriefcase className="inline-block mr-1 text-blue-500 animate-bounce" />
                Total Shifts
              </span>
              <span className="font-medium">{totalShifts}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiCalendar className="inline-block mr-1 text-red-500 animate-pulse" />
                Total Leaves
              </span>
              <span className="font-medium">{totalLeaves}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiAlertTriangle className="inline-block mr-1 text-yellow-500 animate-ping" />
                Total Lates
              </span>
              <span className="font-medium">{totalLates}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiSun className="inline-block mr-1 text-purple-500 animate-bounce" />
                Half Days
              </span>
              <span className="font-medium">{halfDays}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiMoon className="inline-block mr-1 text-pink-500 animate-spin" />
                Not Even Half Days
              </span>
              <span className="font-medium">{notEvenHalfDays}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiCheckCircle className="inline-block mr-1 text-green-500 animate-pulse" />
                Completed Shifts
              </span>
              <span className="font-medium">{totalCompletedDays}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>
                <FiLogOut className="inline-block mr-1 text-orange-500 animate-bounce" />
                Not Logged Out
              </span>
              <span className="font-medium">{notLoggedOut}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Payroll Summary */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
          Payroll Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-max w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <th className="py-2 px-4">Base Salary</th>
                <th className="py-2 px-4">Standard Deductions</th>
                <th className="py-2 px-4">Leaves (Unpaid)</th>
                <th className="py-2 px-4">Remaining Paid Leaves</th>
                <th className="py-2 px-4">Final Salary</th>
              </tr>
            </thead>
            <tbody className="border-t border-gray-200 dark:border-gray-600">
              <tr>
                {/* numericBaseSalary is guaranteed a number */}
                <td className="py-2 px-4">₹ {numericBaseSalary.toFixed(2)}</td>
                <td className="py-2 px-4">{deduction}</td>
                <td className="py-2 px-4">{leaves}</td>
                <td className="py-2 px-4">{remainingPaidLeaves}</td>
                <td className="py-2 px-4">{finalSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deductions breakdown */}
        {deductionsBreakdown && deductionsBreakdown.length > 0 && (
          <div className="mt-4">
            <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Deductions Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-max w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <th className="py-2 px-4">Deduction Name</th>
                    <th className="py-2 px-4">Percentage</th>
                    <th className="py-2 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="border-t border-gray-200 dark:border-gray-600">
                  {deductionsBreakdown.map((d, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4">{d.name}</td>
                      <td className="py-2 px-4">{d.percentage}</td>
                      <td className="py-2 px-4">₹ {d.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {missedPunchModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">
        Request Missed Punch for: {selectedDateForPunch?.date}
      </h2>

      {/* Punch In Time (Fancy TimePicker) */}
      <label className="block mb-2 text-sm font-medium">Punch In Time</label>
      <TimePicker
        onChange={(timeVal) => setPunchInTime(timeVal)}
        value={punchInTime}
        disableClock
        clearIcon={null}
        format="hh:mm a"  // 12-hour format with AM/PM
        className="w-full mb-4 border border-gray-300 dark:border-gray-600 
             rounded p-2 bg-white dark:bg-gray-800 text-gray-800 
             dark:text-gray-100"
      />

      {/* Punch Out Time (Fancy TimePicker) */}
      <label className="block mb-2 text-sm font-medium">Punch Out Time</label>
      <TimePicker
        onChange={(timeVal) => setPunchOutTime(timeVal)}
        value={punchOutTime}
        disableClock
        clearIcon={null}
        format="hh:mm a"
        className="w-full mb-4 border border-gray-300 dark:border-gray-600 
             rounded p-2 bg-white dark:bg-gray-800 text-gray-800 
             dark:text-gray-100"
      />

      {/* Reason Textarea */}
      <label className="block mb-2 text-sm font-medium">Reason/Message</label>
      <textarea
        className="w-full h-20 mb-4 border border-gray-300 dark:border-gray-600 rounded p-2"
        placeholder="Brief reason for missed punch..." onChange={(e) => setPunchReason(e.target.value)}
      />

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            // Reset or keep times as you wish
            setPunchInTime("");
            setPunchOutTime("");
            setMissedPunchModalOpen(false);
          }}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
        >
          Cancel
        </button>
        <button
  onClick={async () => {
    try {
      // Call your missed-punch request API
      await axiosInstance.post("/attendance-user/missed-punch-request", {
        date: selectedDateForPunch?.date,      // e.g. "2023-08-15"
        punchIn: punchInTime,                  // e.g. "09:00 AM"
        punchOut: punchOutTime,               // e.g. "05:30 PM"
        reason: punchReason,
      });
      toast.success("Missed Punch request submitted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit missed punch request.");
    } finally {
      // Clean up and close modal
      setPunchInTime("");
      setPunchOutTime("");
     setPunchReason("");
      setMissedPunchModalOpen(false);
    }
  }}
  className="px-3 py-1 bg-blue-600 text-white rounded"
>
  Submit
</button>

      </div>
    </div>
  </div>
)}



        {/* SHIFT TIMING TABLE */}
        <div className="mt-6">
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Shift Timings
          </h3>
          {shiftTimingDetails ? (
            <table className="min-w-max text-sm w-full border dark:border-gray-700">
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700 w-40">
                    Shift Name
                  </th>
                  <td className="px-4 py-2">{shiftTimingDetails.name}</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700">
                    Start Time
                  </th>
                  <td className="px-4 py-2">{shiftTimingDetails.startTime}</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700">
                    End Time
                  </th>
                  <td className="px-4 py-2">{shiftTimingDetails.endTime}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-sm">No shift timing details available.</p>
          )}
        </div>

        {/* Next Payroll Date */}
        <div className="mt-6">
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Next Payroll Date
          </h3>
          <p className="text-sm">{formattedNextPayrollDate}</p>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Download PDF?"
        message="Are you sure you want to download the payslip PDF?"
        onConfirm={onConfirmPDF}
        onCancel={onCancelPDF}
        confirmText="Yes"
        cancelText="No"
      />
    </motion.div>
  );
}
