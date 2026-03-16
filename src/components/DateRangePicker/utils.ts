export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export type PresetKey =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "last7Days"
  | "lastWeek"
  | "last30Days"
  | "thisMonth"
  | "lastMonth"
  | "last90Days"
  | "thisYear";

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

export function startOfWeekSunday(date: Date): Date {
  const d = startOfDay(date);
  const diff = d.getDay(); // 0 is Sunday
  return addDays(d, -diff);
}

export function startOfMonth(date: Date): Date {
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function endOfMonth(date: Date): Date {
  return startOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBefore(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getTime() < b.getTime();
}

export function isBetween(
  target: Date,
  start: Date | null,
  end: Date | null,
  inclusive = true,
): boolean {
  if (!start || !end) return false;
  const t = startOfDay(target).getTime();
  const s = startOfDay(start).getTime();
  const e = startOfDay(end).getTime();
  if (inclusive) {
    return t >= s && t <= e;
  }
  return t > s && t < e;
}

export function formatDisplay(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getPresetRange(key: PresetKey, todayInput?: Date): DateRange {
  const today = startOfDay(todayInput ?? new Date());

  switch (key) {
    case "today":
      return { startDate: today, endDate: today };
    case "yesterday": {
      const y = addDays(today, -1);
      return { startDate: y, endDate: y };
    }
    case "thisWeek": {
      const start = startOfWeekSunday(today);
      return { startDate: start, endDate: today };
    }
    case "last7Days":
      return { startDate: addDays(today, -6), endDate: today };
    case "lastWeek": {
      const thisWeekStart = startOfWeekSunday(today);
      const lastWeekEnd = addDays(thisWeekStart, -1);
      const lastWeekStart = addDays(lastWeekEnd, -6);
      return { startDate: lastWeekStart, endDate: lastWeekEnd };
    }
    case "last30Days":
      return { startDate: addDays(today, -29), endDate: today };
    case "thisMonth": {
      const start = startOfMonth(today);
      return { startDate: start, endDate: today };
    }
    case "lastMonth": {
      const startThisMonth = startOfMonth(today);
      const endLastMonth = addDays(startThisMonth, -1);
      const startLastMonth = startOfMonth(endLastMonth);
      return { startDate: startLastMonth, endDate: endLastMonth };
    }
    case "last90Days":
      return { startDate: addDays(today, -89), endDate: today };
    case "thisYear": {
      const start = startOfDay(new Date(today.getFullYear(), 0, 1));
      return { startDate: start, endDate: today };
    }
    default:
      return { startDate: null, endDate: null };
  }
}

export function buildMonthMatrix(baseMonth: Date): Date[][] {
  const firstOfMonth = startOfMonth(baseMonth);
  const diff = firstOfMonth.getDay() === 0 ? -6 : 1 - firstOfMonth.getDay();
  let current = addDays(firstOfMonth, diff);

  const days: Date[][] = [];

  for (let week = 0; week < 6; week++) {
    const row: Date[] = [];
    for (let day = 0; day < 7; day++) {
      row.push(current);
      current = addDays(current, 1);
    }
    days.push(row);
  }

  return days;
}
