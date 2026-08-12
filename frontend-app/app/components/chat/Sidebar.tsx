import { HistoryItem } from "../../lib/types";
import Button from "../ui/Button";
import ToggleSwitch from "../ui/ToggleSwitch";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isSignedIn: boolean;
  history: HistoryItem[];
  activeHistoryId: string | null;
  temporaryChat: boolean;
  onNewChat: () => void;
  onSelectHistory: (item: HistoryItem) => void;
  onToggleTemporary: (checked: boolean) => void;
}

export default function Sidebar({
  isSignedIn,
  history,
  activeHistoryId,
  temporaryChat,
  onNewChat,
  onSelectHistory,
  onToggleTemporary,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Button onClick={onNewChat} className="w-full">
        + New chat
      </Button>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text">Temporary chat</label>
        <ToggleSwitch checked={temporaryChat} onChange={onToggleTemporary} label="Temporary chat" />
      </div>

      {!isSignedIn && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-text">
          Sign in to save chat history across your devices.
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
          History
        </h2>
        <ul className="flex flex-col gap-1">
          {history.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectHistory(item)}
                className={cn(
                  "w-full min-h-[44px] rounded-lg px-3 py-2 text-left transition-colors",
                  item.id === activeHistoryId ? "bg-primary-tint" : "hover:bg-surface-alt"
                )}
              >
                <p className="truncate text-sm font-semibold text-text">{item.title}</p>
                <p className="truncate text-xs text-text-muted">{item.preview}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
