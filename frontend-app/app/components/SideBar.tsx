

export default function SideBar() {
  return (
    <div className="flex h-full flex-col space-y-4">
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-left text-sm font-medium text-white">
        + New Chat
      </button>

      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <label htmlFor="temporaryChat" className="text-sm font-medium text-slate-700">
          Temporary Chat
        </label>
        <div className="mt-2 flex items-center gap-2">
          <input id="temporaryChat" type="radio" />
          <label htmlFor="temporaryChat" className="text-sm text-slate-600">
            Enabled
          </label>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Chat History
        </h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="rounded-lg bg-slate-100 px-3 py-2">Admissions help</li>
          <li className="rounded-lg bg-slate-100 px-3 py-2">Campus timetable</li>
          <li className="rounded-lg bg-slate-100 px-3 py-2">Library support</li>
        </ul>
      </div>
    </div>
  );
}