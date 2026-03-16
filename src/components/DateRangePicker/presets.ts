import { PresetKey } from "./utils";

export const presets: { key: PresetKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "thisWeek", label: "This week (Sun – Today)" },
  { key: "last7Days", label: "Last 7 days" },
  { key: "lastWeek", label: "Last week (Sun – Sat)" },
  { key: "last30Days", label: "Last 30 days" },
  { key: "thisMonth", label: "This month" },
  { key: "lastMonth", label: "Last month" },
  { key: "last90Days", label: "Last 90 days" },
  { key: "thisYear", label: "This year (Jan – Today)" },
];
