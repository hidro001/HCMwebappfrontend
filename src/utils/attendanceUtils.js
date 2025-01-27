// src/utils/attendanceUtils.js

/**
 * Converts 12-hour time (AM/PM) to 24-hour "HH:mm:ss" string.
 * If invalid, returns "00:00:00".
 */
export function convertTo24Hour(time) {
    if (!time) return "00:00:00";
    const [timeString, modifier] = time.split(" ");
    if (!timeString || !modifier) return "00:00:00";
  
    let [hours, minutes, seconds] = timeString.split(":").map(Number);
    minutes = minutes || 0;
    seconds = seconds || 0;
  
    if (modifier.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
  
    hours = Math.min(Math.max(hours, 0), 23);
    minutes = Math.min(Math.max(minutes, 0), 59);
    seconds = Math.min(Math.max(seconds, 0), 59);
  
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }
  
  /**
   * Converts 12-hour time (AM/PM) to a Date object for the day 1970-01-01.
   * Returns null if invalid.
   */
  export function convertTo24HourTime(time) {
    if (!time) return null;
    const [timeString, modifier] = time.split(" ");
    if (!timeString || !modifier) return null;
  
    let [hours, minutes, seconds] = timeString.split(":").map(Number);
  
    if (modifier.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
  
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      (seconds !== undefined && isNaN(seconds))
    ) {
      return null;
    }
  
    return new Date(1970, 0, 1, hours, minutes, seconds || 0);
  }
  
  /** Returns array of all days (Date objects) in a given year-month. */
  export function getAllDaysInMonth(year, month /* 1-based */) {
    const days = [];
    let date = new Date(year, month - 1, 1); // JS months are 0-based
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  