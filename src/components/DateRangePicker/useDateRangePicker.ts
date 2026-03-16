import { useState } from "react";
import { DateRange, PresetKey, getPresetRange, isBefore, isSameDay, startOfDay } from "./utils";
import { presets } from "./presets";

export function useDateRangePicker(
  initialStartDate: Date | null,
  initialEndDate: Date | null,
  onApply?: (range: DateRange, preset?: PresetKey) => void
) {
  const today = startOfDay(new Date());

  const [appliedRange, setAppliedRange] = useState<DateRange>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  const [draftRange, setDraftRange] = useState<DateRange>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const initialBaseMonth = draftRange.startDate ?? today;
  const [baseMonth] = useState<Date>(
    new Date(initialBaseMonth.getFullYear(), initialBaseMonth.getMonth(), 1)
  );

  const hasSelection = !!(draftRange.startDate && draftRange.endDate);

  const handleDayClick = (date: Date) => {
    const day = startOfDay(date);

    setDraftRange((prev) => {
      const { startDate, endDate } = prev;

      if (!startDate || (startDate && endDate)) {
        return { startDate: day, endDate: null };
      }

      if (isBefore(day, startDate)) {
        return { startDate: day, endDate: startDate };
      }

      return { startDate, endDate: day };
    });
  };

  const handleApply = () => {
    setAppliedRange(draftRange);

    let matchedPreset: PresetKey | undefined;
    for (const preset of presets) {
      const presetRange = getPresetRange(preset.key, today);
      if (
        draftRange.startDate && draftRange.endDate &&
        isSameDay(draftRange.startDate, presetRange.startDate) &&
        isSameDay(draftRange.endDate, presetRange.endDate)
      ) {
        matchedPreset = preset.key;
        break;
      }
    }

    if (onApply) {
      onApply(draftRange, matchedPreset);
    }
  };

  const handleCancel = () => {
    setDraftRange(appliedRange);
  };

  const handlePresetClick = (key: PresetKey) => {
    const range = getPresetRange(key, today);
    setDraftRange(range);
  };

  return {
    draftRange,
    hoveredDate,
    setHoveredDate,
    baseMonth,
    hasSelection,
    handleDayClick,
    handleApply,
    handleCancel,
    handlePresetClick,
  };
}
