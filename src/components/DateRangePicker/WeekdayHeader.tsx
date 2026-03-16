export function WeekdayHeader() {
  return (
    <div className="border-b border-slate-200">
      <div className="flex justify-center w-full px-4 pb-3">
        <div className="grid grid-cols-7 text-[13px] font-medium text-slate-400 w-[224px]">
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
  );
}
