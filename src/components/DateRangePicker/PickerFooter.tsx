export function PickerFooter({
  hasSelection,
  onCancel,
  onApply,
}: {
  hasSelection: boolean;
  onCancel: () => void;
  onApply: () => void;
}) {
  return (
    <div className="flex justify-between sm:justify-end gap-3 border-t border-slate-200 bg-white p-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 sm:flex-none rounded-lg border border-slate-300 px-6 py-2 text-[13px] font-medium text-[#3A80D2] transition-colors hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={!hasSelection}
        onClick={onApply}
        className="flex-1 sm:flex-none rounded-lg bg-[#3A80D2] px-6 py-2 text-[13px] font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
}
