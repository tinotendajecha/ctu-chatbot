import SideBar from "./components/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] flex-col border-t border-slate-200 bg-white">
      <div className="flex flex-1">
        <aside className="w-72 shrink-0 border-r border-slate-200 bg-slate-50 p-4">
          <div className="space-y-3">
            <div className="rounded border border-slate-300 p-2 text-sm text-slate-600">
              <SideBar />
            </div>
            <div className="rounded border border-slate-300 p-2 text-sm text-slate-600">
              Chat history goes here
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col">
          <header className="border-b border-slate-200 p-4 text-sm text-slate-600">
            Campus chat screen here
          </header>

          <div className="flex-1 p-4 text-sm text-slate-600">
            Chat messages go here
          </div>

          <div className="border-t border-slate-200 p-4 text-sm text-slate-600">
            Message input goes here
          </div>
        </main>
      </div>
    </div>
  );
}
