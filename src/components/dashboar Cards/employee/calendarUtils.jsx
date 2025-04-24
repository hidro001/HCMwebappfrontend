


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
 * and also the actual start/end Date objects in each week.
 */
export function getWeeksInMonth(year, monthIndex) {
  // monthIndex is 0-based in JS Date (0 = Jan, 11 = Dec)
  const start = startOfMonth(new Date(year, monthIndex, 1));
  const end = endOfMonth(start);

  // eachWeekOfInterval gives the Monday of each week in [start, end]
  const weekStarts = eachWeekOfInterval(
    { start, end },
    { weekStartsOn: 1 } // 1 = Monday
  );

  const weeks = weekStarts.map((weekStart, idx) => {
    // End of that week is Sunday => weekStart + 6 days
    const weekEnd = addDays(weekStart, 6);

    // For label: e.g. "Week 1 (May 1 - May 7)"
    const label = `Week ${idx + 1} (${format(weekStart, "MMM d")} - ${format(
      weekEnd,
      "MMM d"
    )})`;

    return {
      value: (idx + 1).toString(), // e.g. "1", "2", etc.
      label,
      startDate: weekStart,
      endDate: weekEnd,
    };
  });

  return weeks;
}
