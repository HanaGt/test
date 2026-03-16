import { DateRange, formatDisplay } from "./utils";

export function DateDisplayHeader({
  draftRange,
}: {
  draftRange: DateRange;
}) {
  return (
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
  );
}
