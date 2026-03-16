import { PresetKey, DateRange, getPresetRange, isSameDay, startOfDay } from "./utils";
import { presets } from "./presets";

export function PresetSidebar({
  draftRange,
  onPresetClick,
}: {
  draftRange: DateRange;
  onPresetClick: (key: PresetKey) => void;
}) {
  const today = startOfDay(new Date());

  return (
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
                onClick={() => onPresetClick(preset.key)}
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
  );
}
