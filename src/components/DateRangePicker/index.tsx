"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { MonthView } from "./MonthView";
import { presets } from "./presets";
import { PresetSidebar } from "./PresetSidebar";
import { DateDisplayHeader } from "./DateDisplayHeader";
import { WeekdayHeader } from "./WeekdayHeader";
import { PickerFooter } from "./PickerFooter";
import {
  DateRange,
  PresetKey,
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
  
  // Track how many months we've loaded backwards
  const [monthsBackToLoad, setMonthsBackToLoad] = useState(0);

  const [baseMonth] = useState<Date>(
    new Date(initialBaseMonth.getFullYear(), initialBaseMonth.getMonth(), 1)
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);
  
  // To restore scroll position when new months are prepended
  const previousScrollHeightRef = useRef<number>(0);

  const monthsToRender = useMemo(() => {
    // Generate months from (baseMonth - monthsBackToLoad) to (baseMonth + 5)
    // The view always shows at least 6 months forward from the base month
    const totalMonths = 6 + monthsBackToLoad;
    return Array.from({ length: totalMonths }).map(
      (_, i) => new Date(baseMonth.getFullYear(), baseMonth.getMonth() - monthsBackToLoad + i, 1)
    );
  }, [baseMonth, monthsBackToLoad]);

  // Handle loading previous months when scrolling to the top
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        // Record current scroll height before adding new months
        if (scrollContainerRef.current) {
          previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
        }
        
        // Load 3 more months at a time
        setMonthsBackToLoad((prev) => prev + 3);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: scrollContainerRef.current,
      rootMargin: "50% 0px 0px 0px", // Trigger when getting close to the top
      threshold: 0,
    });

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  // Adjust scroll position after new months are rendered
  useEffect(() => {
    if (scrollContainerRef.current && previousScrollHeightRef.current > 0) {
      const container = scrollContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;
      
      // If content was added (scrollHeight increased), adjust scroll position
      if (heightDifference > 0) {
        container.scrollTop = container.scrollTop + heightDifference;
      }
      
      previousScrollHeightRef.current = 0; // Reset
    }
  }, [monthsToRender.length]); // Run when the number of rendered months changes


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
        
        <PresetSidebar 
          draftRange={draftRange} 
          onPresetClick={handlePresetClick} 
        />

        {/* Right Area */}
        <div className="flex flex-1 flex-col min-w-0 sm:min-w-[320px]">
          <DateDisplayHeader draftRange={draftRange} />
          
          <WeekdayHeader />

          {/* Scrolling Calendars (two months visible, scroll for more) */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto px-6 py-4 h-[540px] max-h-[540px]"
            style={{
              scrollbarWidth: "thin", 
              scrollbarColor: "#CCCCCC transparent", 
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
            
            {/* Observer target for infinite scrolling */}
            <div ref={observerTargetRef} className="h-1 w-full" />

            {monthsToRender.map((m, idx) => (
              <MonthView
                key={m.getTime()}
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

      <PickerFooter 
        hasSelection={hasSelection} 
        onCancel={handleCancel} 
        onApply={handleApply} 
      />
    </div>
  );
}
