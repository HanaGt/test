import { useMemo } from "react";
import { buildMonthMatrix, isBefore, isBetween, isSameDay } from "./utils";

export function MonthView(props: {
  month: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoveredDate: Date | null;
  onDayClick(date: Date): void;
  onDayHover(date: Date | null): void;
}) {
  const { month, startDate, endDate, hoveredDate, onDayClick, onDayHover } =
    props;

  const matrix = useMemo(() => buildMonthMatrix(month), [month]);
  const monthLabel = month.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const effectiveEnd =
    startDate && !endDate && hoveredDate && isBefore(startDate, hoveredDate)
      ? hoveredDate
      : endDate;

  return (
    <div className="flex flex-col items-center mb-6">
      <div 
        className="flex flex-col gap-2 w-[224px] sm:w-[224px]"
      >
        <div className="text-[14px] font-semibold text-slate-600 text-left pl-2">
          {monthLabel}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-[13px]">
          {matrix.map((week, weekIndex) => (
            <div 
              key={weekIndex} 
              className="contents"
            >
              {week.map((date, index) => {
                const isCurrentMonth = date.getMonth() === month.getMonth();
                const isStart = isSameDay(date, startDate);
                const isEnd = isSameDay(date, effectiveEnd);
                const inRange =
                  !isStart && !isEnd && isBetween(date, startDate, effectiveEnd);

                const isRangeStart = isStart && (effectiveEnd && !isSameDay(startDate, effectiveEnd));
                const isRangeEnd = isEnd && (startDate && !isSameDay(startDate, effectiveEnd));
                const showBg = inRange || isRangeStart || isRangeEnd;

                return (
                  <div
                    key={`${weekIndex}-${index}`}
                    className="relative flex items-center justify-center cursor-pointer select-none h-8 w-8"
                    onClick={() => onDayClick(date)}
                    onMouseEnter={() => onDayHover(date)}
                    onMouseLeave={() => onDayHover(null)}
                  >
                    {/* Connecting Background */}
                    {showBg && (
                      <div
                        className={`absolute inset-y-0 bg-[#E9F3FF] ${
                          inRange
                            ? "inset-x-0"
                            : isRangeStart
                            ? "left-1/2 right-0"
                            : "left-0 right-1/2"
                        }`}
                      />
                    )}
                    {/* Day Circle */}
                    <button
                      type="button"
                      className={`relative z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[13px] font-medium transition-colors ${
                        isStart || isEnd
                          ? "bg-[#3A80D2] text-white"
                          : isCurrentMonth
                          ? "text-slate-800 hover:bg-slate-100"
                          : "text-slate-300"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
