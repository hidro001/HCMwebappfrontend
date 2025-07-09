import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPrinter, FiDownload, FiSearch, FiBriefcase, FiCalendar, FiAlertTriangle, FiSun, FiMoon, FiCheckCircle, FiLogOut, FiClock, FiX, 
  FiChevronLeft, FiChevronRight, FiFilter, FiUser, FiDollarSign, FiTrendingUp, FiMenu, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../common/ConfirmationDialog";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";
import axiosInstance from "../../service/axiosInstance";
import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BaseModal from "../common/BaseModal";
import { GiNotebook } from "react-icons/gi";
import ApplyLeaveModal from "../leave management/model/ApplyLeaveModal";

function getAllDaysInMonth(year, month) {
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

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

function formatHoursWorked(hoursWorked) {
  if (hoursWorked === 0) return "0h 0m";

  const totalMinutes = hoursWorked * 60;

  if (totalMinutes < 1) {
    const seconds = Math.round(hoursWorked * 3600);
    return `${seconds}s`;
  }

  if (totalMinutes < 60) {
    const minutes = Math.round(totalMinutes);
    return `${minutes}m`;
  }

  const wholeHours = Math.floor(hoursWorked);
  const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60);

  if (remainingMinutes === 0) {
    return `${wholeHours}h`;
  }

  return `${wholeHours}h ${remainingMinutes}m`;
}

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
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

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

function parseShiftTiming(shiftString) {
  if (!shiftString) return null;
  const regex = /(.+?)\s*\((\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\)/;
  const match = shiftString.match(regex);
  if (!match) return null;
  const [_, name, start, end] = match;
  return { name: name.trim(), startTime: start.trim(), endTime: end.trim() };
}

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

  const fractionOfMonthWorked = daysUpToToday / denom;
  const payForDaysUpToToday = leftoverAfterDeductions * fractionOfMonthWorked;

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

function debugAttendanceData(attendanceDataRaw, year, month) {
  if (!attendanceDataRaw || attendanceDataRaw.length === 0) {
    return;
  }

  const currentMonthData = attendanceDataRaw.filter((rec) => {
    const d = new Date(rec.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

  if (currentMonthData.length === 0) {
    return;
  }

  // Check each record
  currentMonthData.forEach((record, index) => {
    if (record.login && record.logout) {
      const hoursWorked = getHoursWorked(record.login, record.logout);
    }
  });
  return currentMonthData;
}

function checkFilteringIssues(finalAttendanceData, searchText) {
  const recordsWithData = finalAttendanceData.filter(
    (item) => item.logInTime !== "------" || item.logOutTime !== "------"
  );

  if (searchText) {
    const filteredCount = finalAttendanceData.filter((item) => {
      const combined = (item.date + " " + item.day + " " + item.status)
        .toLowerCase()
        .trim();
      return combined.includes(searchText.toLowerCase().trim());
    }).length;
  }
}

export default function OwnFullAttendance() {

  const [punchReason, setPunchReason] = useState("");
  const [missedPunchModalOpen, setMissedPunchModalOpen] = useState(false);
  const [onLeave, setOnLeave] = useState(false);
  const [selectedDateForPunch, setSelectedDateForPunch] = useState(null);
  const [punchInTime, setPunchInTime] = useState("");
  const [punchOutTime, setPunchOutTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showPayrollDetails, setShowPayrollDetails] = useState(false);
  const fetchAttendanceData = useOwnFullAttendanceStore(
    (s) => s.fetchAttendanceData
  );
  const attendanceDataRaw = useOwnFullAttendanceStore((s) => s.attendanceData);
  const monthSummary = useOwnFullAttendanceStore((s) => s.userAttendanceSummary);
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

  const today = new Date();
  const defaultMonthString =
    today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  fetchAttendanceData(selectedMonth);
}, [fetchAttendanceData, selectedMonth]);

  const parts = selectedMonth.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  const attendanceData = getUniqueAttendanceData(attendanceDataRaw || []);
  
  useEffect(() => {
    if (attendanceDataRaw) {
      debugAttendanceData(attendanceDataRaw, year, month);
    }
  }, [attendanceDataRaw, year, month, leaveSystemDetails, companySettings]);

  const shiftTimingDetails = parseShiftTiming(
    userProfileData?.shift_Timing || ""
  );

  const allDaysInMonth = getAllDaysInMonth(year, month);


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
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    let row = {
      sl: idx + 1,
      date: formatted,
      day: dayName,
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "N/A",
      status: "------",
    };

    const isHoliday = companySettings?.holidays?.some(
      (h) => new Date(h.date).toISOString().split("T")[0] === formatted
    );
    const isWorkingDay =
      leaveSystemDetails?.workingDays?.includes(dayName) || false;

    
    if (!isWorkingDay || isHoliday) {
      row.status = "Holiday";
      return row;
    }

    const record = attendanceData.find((r) => r.date === formatted);

    if (!record) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    if (record.login) row.logInTime = record.login;
    if (record.logout) row.logOutTime = record.logout;

    if (record.breaks && record.breaks.length > 0) {
      row.totalBreak = getTotalBreakTime(record.breaks);
    }

    if (!record.logout && record.status !== 'Leave') {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    const hoursWorked = getHoursWorked(record.login, record.logout);
    row.hoursWorked = formatHoursWorked(hoursWorked);

    row.status = record.status;
    
    return row;
  });

  const handleClose =() => {
    setOnLeave(false)
  }
  useEffect(() => {
    if (finalAttendanceData.length > 0) {
      checkFilteringIssues(finalAttendanceData, searchText);
    }
  }, [finalAttendanceData, searchText]);

  const filteredData = finalAttendanceData.filter((item) => {
    const combined = (item.date + " " + item.day + " " + item.status)
      .toLowerCase()
      .trim();
    return combined.includes(searchText.toLowerCase().trim());
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const totalShifts = calculateTotalShifts(attendanceData, year, month);

  const {
  totalLateDays,
  totalGraceUsed,
  totalHalfDays,
  totalAbsents,
  completeDays,
  lessThanHalfDays,
  totalLeavesUsed,
  graceRemaining
} = monthSummary || {};

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

  function requestAction(dateRow, req) {
    setSelectedDateForPunch(dateRow);
    if(req === 'punch'){
      setMissedPunchModalOpen(true);
    }
    if(req === 'leave'){
      setOnLeave(true)
    }
  }

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

  function isSameMonth(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    return (
      date.getFullYear() === currentYear &&
      date.getMonth() + 1 === currentMonth
    );
  }

  function onConfirmPDF() {
    setConfirmDialogOpen(false);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center p-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {attendanceError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const empName =
    (userProfileData?.first_Name || "") +
    " " +
    (userProfileData?.last_Name || "");
  const empCode = userProfileData?.employee_Id || "N/A";

  const renderStatusBadge = (status) => {
    const badgeConfig = {
      Present: {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-200 dark:border-green-700",
        icon: FiCheckCircle,
        iconColor: "text-green-500 dark:text-green-400",
      },
      Absent: {
        bg: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
        text: "text-red-700 dark:text-red-400",
        border: "border-red-200 dark:border-red-700",
        icon: FiX,
        iconColor: "text-red-500 dark:text-red-400",
      },
      "Half Day": {
        bg: "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        text: "text-yellow-700 dark:text-yellow-400",
        border: "border-yellow-200 dark:border-yellow-700",
        icon: FiSun,
        iconColor: "text-yellow-500 dark:text-yellow-400",
      },
      "Not Even Half Day": {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-700",
        icon: FiMoon,
        iconColor: "text-purple-500 dark:text-purple-400",
      },
      Holiday: {
        bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-700",
        icon: FiCalendar,
        iconColor: "text-blue-500 dark:text-blue-400",
      },
      Leave: {
        bg: "bg-gradient-to-r from-orange-50 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/20",
        text: "text-orange-700 dark:text-orange-400",
        border: "border-blue-200 dark:border-orange-700",
        icon: FiCalendar,
        iconColor: "text-orange-500 dark:text-orange-400",
      },
      Late: {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-700",
        icon: FiClock,
        iconColor: "text-purple-500 dark:text-purple-400",
      },
    };

    const config = badgeConfig[status] || badgeConfig.Holiday;
    const IconComponent = config.icon;

    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        <IconComponent className={`w-3 h-3 ${config.iconColor}`} />
        {status}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-40 "
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Attendance Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {monthName(month)} {year} • {empName.trim()} ({empCode})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={sidebarOpen ? "Hide Overview" : "Show Overview"}
              >
                <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors"
              >
                <FiPrinter className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestPDF}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

     <div className="flex flex-row-reverse h-screen ">
        <motion.aside
          className={` bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700   
            ${sidebarOpen 
                ? 'fixed top-0 right-0 bottom-0 z-40 w-full lg:w-[30%]  h-full' 
                : 'hidden '}
                `}
        >
          <div className="p-6 h-screen  bg-white/95 dark:bg-gray-800/95 ">
            <div className="flex items-center justify-between mb-6 ">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Overview</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-6 border border-blue-100 dark:border-blue-800 "
            >
              <div className="flex items-center gap-3 mb-4  bg-white/95 dark:bg-gray-800/95 ">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Employee Stats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Overview
                  </p>
                </div>
              </div>

              <div className="space-y-4  bg-white/95 dark:bg-gray-800/95 ">
                {[
                  {
                    label: "Total Shifts",
                    value: totalShifts,
                    icon: FiBriefcase,
                    color: "blue",
                  },
                  {
                    label: "Total Leaves",
                    value: totalLeavesUsed,
                    icon: FiCalendar,
                    color: "red",
                  },
                  {
                    label: "Late Arrivals",
                    value: totalLateDays,
                    icon: FiAlertTriangle,
                    color: "yellow",
                  },
                  {
                    label: "Half Days",
                    value: totalHalfDays,
                    icon: FiSun,
                    color: "orange",
                  },
                  {
                    label: "Incomplete Days",
                    value: lessThanHalfDays,
                    icon: FiMoon,
                    color: "purple",
                  },
                  {
                    label: "Completed Days",
                    value: completeDays,
                    icon: FiCheckCircle,
                    color: "green",
                  },
                  {
                    label: "Not Logged Out",
                    value: totalAbsents,
                    icon: FiLogOut,
                    color: "pink",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon
                        className={`w-4 h-4 text-${stat.color}-500 dark:text-${stat.color}-400`}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {stat.label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}
                    >
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800 min-w-56"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Payroll
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Salary Summary
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPayrollDetails(!showPayrollDetails)}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  {showPayrollDetails ? (
                    <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Base Salary
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ₹ {numericBaseSalary.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Deductions
                  </span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {deduction}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Final Salary
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                    {finalSalary}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {showPayrollDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Breakdown:
                    </div>
                    {deductionsBreakdown.map((breakdown, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-white/40 dark:bg-gray-700/40 rounded-lg text-xs border border-gray-200/30 dark:border-gray-600/30"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {breakdown.name}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          ₹ {breakdown.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {shiftTimingDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Shift Timing
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Working Hours
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Shift Name
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {shiftTimingDetails.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Start Time
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {shiftTimingDetails.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      End Time
                    </span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {shiftTimingDetails.endTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.aside>

        <main className="flex-1 lg:ml-0 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FiFilter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      value={rowsPerPage}
                      onChange={handleRowsPerPage}
                    >
                      <option value={7}>7 rows</option>
                      <option value={10}>10 rows</option>
                      <option value={30}>30 rows</option>
                      <option value={31}>All days</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search by date, day, or status..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-64"
                  />
                </div>
              </div>
            </motion.div>

            {/* Attendance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div
                className="overflow-auto   [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300"
              >
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <tr>
                      {[
                        "S.L",
                        "Date",
                        "Day",
                        "Check In/Out",
                        "Hours",
                        "Break",
                        "Status",
                        "Action",
                      ].map((header, index) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {displayedData.map((item, index) => (
                        <motion.tr
                          key={item.sl}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                              {String(item.sl).padStart(2, "0")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {item.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {item.day}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                  {item.logInTime}
                                </span>
                                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                                <span className="font-semibold text-red-600 dark:text-red-400">
                                  {item.logOutTime}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.hoursWorked || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {item.totalBreak}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(item.status === "Absent" && isSameMonth(item.date)  ) && (
                              <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => requestAction(item, 'punch')}
                                className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-xs font-medium transition-colors"
                              >
                                <FiClock className="w-3 h-3" />
                                Missed?
                              </motion.button>
                               <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => requestAction(item, 'leave')}
                                className="inline-flex items-center gap-2 ml-2 px-3 py-1.5 border border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded-lg text-xs font-medium transition-colors"
                              >
                                <GiNotebook className="w-3 h-3" />
                                Ask Leave
                              </motion.button>
                              </>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {displayedData.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                      No records found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalEntries)}{" "}
                    of {totalEntries} results
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </motion.button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                page === safeCurrentPage
                                  ? "bg-blue-600 dark:bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {page}
                            </motion.button>
                          );
                        }
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-8"
            >
              <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-6 text-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="w-4 h-4 text-white" />
                </div>
                Payroll Summary
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 rounded-lg">
                      <th className="py-3 px-4 text-left font-semibold">
                        Base Salary
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Standard Deductions
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Leaves (Unpaid)
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Remaining Paid Leaves
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Final Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-t border-gray-200 dark:border-gray-600">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-800 dark:text-gray-200">
                        ₹ {numericBaseSalary.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 font-semibold text-red-600 dark:text-red-400">
                        {deduction}
                      </td>
                      <td className="py-4 px-4 font-semibold text-orange-600 dark:text-orange-400">
                        {leaves}
                      </td>
                      <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                        {remainingPaidLeaves}
                      </td>
                      <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                        {finalSalary}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Deductions breakdown - KEEPING ORIGINAL BREAKDOWN TABLE */}
              {deductionsBreakdown && deductionsBreakdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-blue-500" />
                    Deductions Breakdown
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300">
                          <th className="py-3 px-4 text-left font-semibold">
                            Deduction Name
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Percentage
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-t border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
                        {deductionsBreakdown.map((d, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                              {d.name}
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                              {d.percentage}
                            </td>
                            <td className="py-3 px-4 font-semibold text-red-600 dark:text-red-400">
                              ₹ {d.amount.toFixed(2)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
        <AnimatePresence>
            <BaseModal isOpen={missedPunchModalOpen} onClose={!missedPunchModalOpen}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                          <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Missed Punch Request
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: {selectedDateForPunch?.date}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setPunchInTime("");
                          setPunchOutTime("");
                          setPunchReason("");
                          setMissedPunchModalOpen(false);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center w-full justify-between">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Punch In Time
                      </label>
                      <TimePicker
                        onChange={(timeVal) => setPunchInTime(timeVal)}
                        value={punchInTime}
                        disableClock
                        clearIcon={null}
                        format="hh:mm a"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>

                    <div className="w-full pl-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Punch Out Time
                      </label>
                      <TimePicker
                        onChange={(timeVal) => setPunchOutTime(timeVal)}
                        value={punchOutTime}
                        disableClock
                        clearIcon={null}
                        format="hh:mm a"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    </div>  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Reason for Missed Punch
                      </label>
                      <textarea
                        value={punchReason}
                        onChange={(e) => setPunchReason(e.target.value)}
                        placeholder="Please provide a brief explanation..."
                        rows={4}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setPunchInTime("");
                        setPunchOutTime("");
                        setPunchReason("");
                        setMissedPunchModalOpen(false);
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        try {
                          await axiosInstance.post(
                            "/attendance-user/missed-punch-request",
                            {
                              date: selectedDateForPunch?.date,
                              punchIn: punchInTime,
                              punchOut: punchOutTime,
                              reason: punchReason,
                            }
                          );
                          toast.success(
                            "Missed Punch request submitted successfully!"
                          );
                        } catch (error) {
                          console.error(error);
                          toast.error("Failed to submit missed punch request.");
                        } finally {
                          setPunchInTime("");
                          setPunchOutTime("");
                          setPunchReason("");
                          setMissedPunchModalOpen(false);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      Submit Request
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </BaseModal>
          
        </AnimatePresence>
        <AnimatePresence>
            {selectedDateForPunch &&
           <ApplyLeaveModal show={onLeave} onClose={handleClose} leaveDate={selectedDateForPunch.date} />
           }
        </AnimatePresence>
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Download Payslip PDF"
        message="Are you sure you want to download the payslip PDF for this month?"
        onConfirm={onConfirmPDF}
        onCancel={onCancelPDF}
        confirmText="Download"
        cancelText="Cancel"
      />
    </div>
  );
}
