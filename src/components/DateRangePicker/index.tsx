"use client";

import { useMemo, useState } from "react";
import { MonthView } from "./MonthView";
import { presets } from "./presets";
import {
  DateRange,
  PresetKey,
  formatDisplay,
  getPresetRange,
  isBefore,
  isSameDay,
  startOfDay,
} from "./utils";

export * from "./presets";
export * from "./utils";

export type DateRangePickerProps = {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onApply?(range: DateRange, preset?: PresetKey): void;
};

export function DateRangePicker({
  initialStartDate = null,
  initialEndDate = null,
  onApply,
}: DateRangePickerProps) {
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

  const monthsToRender = useMemo(() => {
    return Array.from({ length: 6 }).map(
      (_, i) => new Date(baseMonth.getFullYear(), baseMonth.getMonth() + i, 1)
    );
  }, [baseMonth]);

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

    // Find if the draft range exactly matches a preset
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

  return (
    <div className="flex w-fit max-w-full flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-xl">
      <div className="flex min-h-[460px] flex-col sm:flex-row">
        {/* Left Sidebar */}
        <aside className="flex w-full flex-col border-b border-slate-200 sm:w-[220px] sm:flex-shrink-0 sm:border-b-0 sm:border-r">
          <div className="border-b border-slate-100 p-4">
            <h3 className="text-[14px] font-semibold text-slate-800">Custom</h3>
          </div>
          <div className="flex-none sm:flex-1 overflow-x-auto sm:overflow-y-auto p-4 sm:p-2 scrollbar-hide">
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-0.5 w-max sm:w-full">
              {presets.map((preset) => {
                const range = getPresetRange(preset.key, today);
                const isActive =
                  draftRange.startDate &&
                  draftRange.endDate &&
                  isSameDay(draftRange.startDate, range.startDate) &&
                  isSameDay(draftRange.endDate, range.endDate);

                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => handlePresetClick(preset.key)}
                    className={[
                      "w-auto sm:w-full rounded-full sm:rounded-md px-4 py-2 sm:px-3 sm:py-4 text-center sm:text-left transition-colors flex items-center justify-center whitespace-nowrap",
                      "font-sans font-medium text-[14px] leading-[11px] tracking-[-0.17px] align-middle lining-nums proportional-nums stacked-fractions",
                      isActive
                        ? "bg-[#E9F3FF] text-[#3A80D2]"
                        : "text-[#7C7F81] hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Area */}
        <div className="flex flex-1 flex-col min-w-0 sm:min-w-[320px]">
          {/* Header Row */}
          <div className="flex items-center gap-2 sm:gap-3 p-4">
            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-500">
                Start Date
              </span>
              <div className="flex h-9 items-center rounded-lg border border-slate-300 bg-white px-3 text-[13px] sm:text-[14px] text-slate-800 shadow-sm overflow-hidden whitespace-nowrap">
                {formatDisplay(draftRange.startDate)}
              </div>
            </div>
            <div className="mt-5 text-slate-400 shrink-0">—</div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-500">
                End Date
              </span>
              <div className="flex h-9 items-center rounded-lg border border-slate-300 bg-white px-3 text-[13px] sm:text-[14px] text-slate-800 shadow-sm overflow-hidden whitespace-nowrap">
                {formatDisplay(draftRange.endDate)}
              </div>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="border-b border-slate-200">
            <div className="flex justify-center w-full px-6 pb-3">
              <div
                className="grid grid-cols-7 text-[13px] font-medium text-slate-400 w-[224px]"
              >
                <div className="flex justify-center">Mo</div>
                <div className="flex justify-center">Tu</div>
                <div className="flex justify-center">We</div>
                <div className="flex justify-center">Th</div>
                <div className="flex justify-center">Fr</div>
                <div className="flex justify-center">Sa</div>
                <div className="flex justify-center">Su</div>
              </div>
            </div>
          </div>

          {/* Scrolling Calendars (two months visible, scroll for more) */}
          <div
            className="overflow-y-auto px-6 py-4 h-[540px] max-h-[540px]"
            style={{
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#CCCCCC transparent", // For Firefox
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 8px;
                height: 36px;
              }
              div::-webkit-scrollbar-thumb {
                background-color: #CCCCCC;
                border-radius: 31px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
            `}</style>

            {monthsToRender.map((m, idx) => (
              <MonthView
                key={idx}
                month={m}
                startDate={draftRange.startDate}
                endDate={draftRange.endDate}
                hoveredDate={hoveredDate}
                onDayClick={handleDayClick}
                onDayHover={setHoveredDate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between sm:justify-end gap-3 border-t border-slate-200 bg-white p-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 sm:flex-none rounded-lg border border-slate-300 px-6 py-2 text-[13px] font-medium text-[#3A80D2] transition-colors hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!hasSelection}
          onClick={handleApply}
          className="flex-1 sm:flex-none rounded-lg bg-[#3A80D2] px-6 py-2 text-[13px] font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
