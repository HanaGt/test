"use client";

import { useDateRangePicker } from "./useDateRangePicker";
import { PresetSidebar } from "./PresetSidebar";
import { DateDisplayHeader } from "./DateDisplayHeader";
import { WeekdayHeader } from "./WeekdayHeader";
import { PickerFooter } from "./PickerFooter";
import { CalendarList } from "./CalendarList";
import { DateRange, PresetKey } from "./utils";

export * from "./presets";
export * from "./utils";

export type DateRangePickerProps = {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onApply?(range: DateRange, preset?: PresetKey): void;
  onCancel?(): void;
};

export function DateRangePicker({
  initialStartDate = null,
  initialEndDate = null,
  onApply,
  onCancel,
}: DateRangePickerProps) {
  const {
    draftRange,
    hoveredDate,
    setHoveredDate,
    baseMonth,
    hasSelection,
    handleDayClick,
    handleApply,
    handleCancel,
    handlePresetClick,
  } = useDateRangePicker(initialStartDate, initialEndDate, onApply, onCancel);

  return (
    <div className="flex w-fit max-w-full flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-xl">
      <div className="flex min-h-[460px] flex-col sm:flex-row">
        
        <PresetSidebar 
          draftRange={draftRange} 
          onPresetClick={handlePresetClick} 
        />

        {/* Right Area */}
        <div className="flex flex-1 flex-col min-w-0 sm:min-w-[256px]">
          <DateDisplayHeader draftRange={draftRange} />
          
          <WeekdayHeader />

          <CalendarList
            baseMonth={baseMonth}
            draftRange={draftRange}
            hoveredDate={hoveredDate}
            onDayClick={handleDayClick}
            onDayHover={setHoveredDate}
          />
        </div>
      </div>

      <PickerFooter 
        hasSelection={hasSelection} 
        onCancel={handleCancel} 
        onApply={handleApply} 
      />
    </div>
  );
}
