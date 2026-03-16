"use client";

import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";

export function ProfileAnalyticsHeader() {
  const [isOpen, setIsOpen] = useState(false);

  // Set up dynamic states for the DateRangePicker
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const [selectedPresetLabel, setSelectedPresetLabel] = useState("Last 7 days");

  const formatRange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return "";
    const startStr = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      ...(start.getFullYear() !== end.getFullYear() ? { year: 'numeric' } : {}) 
    });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const formattedRange = formatRange(dateRange.startDate, dateRange.endDate);

  return (
    <header className="relative flex flex-col sm:flex-row min-h-14 py-3 sm:py-0 gap-4 sm:gap-0 items-center justify-between rounded-3xl bg-[#4D94CD] px-4 sm:px-6 text-white shadow-sm">
      <div className="flex items-center gap-3">
        {/* Profile Analytics Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="#4D94CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 8H20" stroke="#4D94CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 15L11 12L14 15L17 11" stroke="#4D94CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 11V15" stroke="#4D94CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[17px] font-medium">Profile Analytics</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 sm:gap-3 rounded-full bg-white px-2 py-1.5 shadow-sm transition-colors hover:bg-slate-50 max-w-full"
        >
          <span className="rounded-md bg-[#E9F3FF] px-2 sm:px-2.5 py-1 text-[11px] sm:text-[12px] font-medium text-[#3A80D2] whitespace-nowrap">
            {selectedPresetLabel}
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">
            {formattedRange}
          </span>
          <div className="pr-1.5 pl-1">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      {isOpen ? (
        <div className="absolute left-0 sm:left-auto right-0 sm:right-6 top-[110px] sm:top-[68px] z-20 flex justify-center w-full sm:w-auto">
          <DateRangePicker 
            initialStartDate={dateRange.startDate}
            initialEndDate={dateRange.endDate}
            onApply={(range, presetKey) => {
              if (range.startDate && range.endDate) {
                setDateRange({ startDate: range.startDate, endDate: range.endDate });
              }
              
              import("./DateRangePicker").then(module => {
                 const found = module.presets.find(p => p.key === presetKey);
                 setSelectedPresetLabel(found ? found.label : "Custom");
              });
              
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
}
