

import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  format,
  getISOWeek,
} from "date-fns";

/**
 * Returns an array of weeks in the given month of (year, monthIndex),
 * with labels like: "Week 1 (May 1 - May 7)"
 * and also the actual start/end Date objects in each week.
 *
 * Each object now uses `getISOWeek(weekStart)` as its `value`, so that
 * when you select “Week X” in May, you actually send the ISO-week number
 * (e.g. 18, 19, 20, …) back to the API.
 */
export function getWeeksInMonth(year, monthIndex) {
  // monthIndex is 0-based in JS Date (0 = Jan, 11 = Dec)
  const start = startOfMonth(new Date(year, monthIndex, 1));
  const end = endOfMonth(start);

  // eachWeekOfInterval returns the Monday of each ISO-week in [start, end]
  const weekStarts = eachWeekOfInterval(
    { start, end },
    { weekStartsOn: 1 } // 1 = Monday
  );

  const weeks = weekStarts.map((weekStart, idx) => {
    // Compute Sunday = weekStart + 6 days
    const weekEnd = addDays(weekStart, 6);

    // Build a human‐readable label, e.g. "Week 1 (May 1 - May 7)"
    // (This “1, 2, 3, …” is just a display index within the month.)
    const label = `Week ${idx + 1} (${format(weekStart, "MMM d")} - ${format(
      weekEnd,
      "MMM d"
    )})`;

    // Use getISOWeek to find the actual ISO‐week number (1–53) for that Monday
    const isoWeekNumber = getISOWeek(weekStart);

    return {
      value: isoWeekNumber.toString(), // e.g. "18", "19", "20", etc.
      label,
      startDate: weekStart,
      endDate: weekEnd,
    };
  });

  return weeks;
}
