'use client';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import {useState} from 'react'


export default function SideBar() {

  let [switchDefault, setSwitchDefault] = useState(false)

  return (
    <div className="flex h-full flex-col space-y-4">
      <button className="rounded-lg bg-primary px-4 py-4 text-center   text-sm font-medium text-white ">
        + New Chat
      </button>

      <div className="rounded-lg  p-1 flex justify-between items-center">
        <label htmlFor="temporaryChat" className="text-sm font-medium text-slate-700">
          Temporary Chat
        </label>
        <div className="mt-2 flex items-center gap-2 flex justify-center" 
        onClick= {() => setSwitchDefault(!switchDefault)}
        >
          {switchDefault ? (
            (
            <ToggleOnIcon fontSize="large" className="text-primary" />
          )
          ): (
            <ToggleOffIcon fontSize="large" className="text-slate-400" />
          )}
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