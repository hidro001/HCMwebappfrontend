// utils/calendarUtils.js
import {
    startOfMonth,
    endOfMonth,
    eachWeekOfInterval,
    addDays,
    format,
  } from "date-fns";
  
  /**
   * Returns an array of weeks in the given month of (year, month),
   * with labels like: "Week 1 (May 1 - May 7)"
   */
  export function getWeeksInMonth(year, monthIndex) {
    // monthIndex is 0-based in JS Date (0 = Jan, 11 = Dec)
    // but you might store your 'month' as 1-12 in state. So we subtract 1 if needed.
    const start = startOfMonth(new Date(year, monthIndex, 1));
    const end = endOfMonth(start);
  
    // eachWeekOfInterval gives us the starting Monday of each week in that interval
    const weekStarts = eachWeekOfInterval(
      { start, end },
      { weekStartsOn: 1 } // 1 = Monday
    );
  
    const weeks = weekStarts.map((weekStart, idx) => {
      // End of that week is Sunday => weekStart + 6 days
      const weekEnd = addDays(weekStart, 6);
      const label = `Week ${idx + 1} (${format(weekStart, "MMM d")} - ${format(
        weekEnd,
        "MMM d"
      )})`;
      return {
        value: (idx + 1).toString(), // e.g. "1", "2", ...
        label,
      };
    });
  
    return weeks;
  }
  