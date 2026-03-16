"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { MonthView } from "./MonthView";
import { DateRange } from "./utils";

export type CalendarListProps = {
  baseMonth: Date;
  draftRange: DateRange;
  hoveredDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
};

export function CalendarList({
  baseMonth,
  draftRange,
  hoveredDate,
  onDayClick,
  onDayHover,
}: CalendarListProps) {
  const [monthsBackToLoad, setMonthsBackToLoad] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  const previousScrollHeightRef = useRef<number>(0);

  const monthsToRender = useMemo(() => {
    const totalMonths = 6 + monthsBackToLoad;
    return Array.from({ length: totalMonths }).map(
      (_, i) => new Date(baseMonth.getFullYear(), baseMonth.getMonth() - monthsBackToLoad + i, 1)
    );
  }, [baseMonth, monthsBackToLoad]);


  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        if (scrollContainerRef.current) {
          previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
        }


        setMonthsBackToLoad((prev) => prev + 3);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: scrollContainerRef.current,
      rootMargin: "50% 0px 0px 0px",
      threshold: 0,
    });

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  // Scroll to selected date range when it changes
  useEffect(() => {
    if (draftRange.startDate) {
      const startMonth = new Date(draftRange.startDate.getFullYear(), draftRange.startDate.getMonth(), 1);
      const firstRenderedMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() - monthsBackToLoad, 1);
      
      let newMonthsBack = monthsBackToLoad;
      if (startMonth < firstRenderedMonth) {
        const monthDiff = (firstRenderedMonth.getFullYear() - startMonth.getFullYear()) * 12 + (firstRenderedMonth.getMonth() - startMonth.getMonth());
        newMonthsBack = monthsBackToLoad + monthDiff;
        setMonthsBackToLoad(newMonthsBack);
      }
      
      // Delay to allow render if monthsBackToLoad changed
      setTimeout(() => {
        const monthElement = document.getElementById(`month-${startMonth.getFullYear()}-${startMonth.getMonth()}`);
        if (monthElement && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          
          const containerTop = container.scrollTop;
          const containerBottom = containerTop + container.clientHeight;
          const elemTop = monthElement.offsetTop - container.offsetTop;
          const elemBottom = elemTop + monthElement.clientHeight;
          
          const isVisible = elemTop >= containerTop && elemBottom <= containerBottom;
          
          if (!isVisible) {
            container.scrollTo({
              top: elemTop,
              behavior: "smooth"
            });
          }
        }
      }, 50);
    }
  }, [draftRange.startDate, draftRange.endDate, baseMonth, monthsBackToLoad]); // Watch draftRange changes

  useEffect(() => {
    if (scrollContainerRef.current && previousScrollHeightRef.current > 0) {
      const container = scrollContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;


      if (heightDifference > 0) {
        container.scrollTop = container.scrollTop + heightDifference;
      }

      previousScrollHeightRef.current = 0; // Reset
    }
  }, [monthsToRender.length]);


  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto px-4 py-4 h-[300px] sm:h-[540px] max-h-[50vh] sm:max-h-[540px]"
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

      {monthsToRender.map((m) => (
        <MonthView
          key={m.getTime()}
          month={m}
          startDate={draftRange.startDate}
          endDate={draftRange.endDate}
          hoveredDate={hoveredDate}
          onDayClick={onDayClick}
          onDayHover={onDayHover}
        />
      ))}
    </div>
  );
}
