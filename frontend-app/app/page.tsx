"use client";

import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "./lib/auth/AuthContext";
import { HistoryItem, Message, Source } from "./lib/types";
import { generateId } from "./lib/utils";
import { sendChatMessage } from "./lib/chat/api";
import { getSeedHistory } from "./lib/chat/mock-history";
import { getSuggestedChips } from "./lib/chat/suggested-chips";
import Sidebar from "./components/chat/Sidebar";
import MessageList from "./components/chat/MessageList";
import ChatInput from "./components/chat/ChatInput";
import SuggestedChips from "./components/chat/SuggestedChips";
import SourcesPanel from "./components/chat/SourcesPanel";
import MobileDrawer from "./components/layout/MobileDrawer";
import IconButton from "./components/ui/IconButton";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I'm the CTU Campus Assistant. Ask me anything about admissions, courses, timetables or student services.",
};

function historyStorageKey(email: string) {
  return `ctu-assistant:history:${email}`;
}

export default function ChatPage() {
  const { user } = useAuth();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [temporaryChat, setTemporaryChat] = useState(false);
  const [openSources, setOpenSources] = useState<Source[] | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load this user's saved history on sign-in (or seed it the first time). localStorage is
  // only readable client-side, so this sync-after-mount/after-login hydration is unavoidable.
  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory([]);
      return;
    }
    const stored = window.localStorage.getItem(historyStorageKey(user.email));
    if (stored) {
      setHistory(JSON.parse(stored) as HistoryItem[]);
    } else {
      const seeded = getSeedHistory();
      setHistory(seeded);
      window.localStorage.setItem(historyStorageKey(user.email), JSON.stringify(seeded));
    }
  }, [user]);

  function persistHistory(next: HistoryItem[]) {
    setHistory(next);
    if (user && !temporaryChat) {
      window.localStorage.setItem(historyStorageKey(user.email), JSON.stringify(next));
    }
  }

  function handleNewChat() {
    setMessages([WELCOME_MESSAGE]);
    setActiveHistoryId(null);
    setOpenSources(null);
    setMobileSidebarOpen(false);
  }

  function handleSelectHistory(item: HistoryItem) {
    setMessages(item.messages);
    setActiveHistoryId(item.id);
    setOpenSources(null);
    setMobileSidebarOpen(false);
  }

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: generateId(), role: "user", text: trimmed };
    const withUserMessage = [...messages, userMessage];
    setMessages(withUserMessage);
    setInputValue("");
    setIsThinking(true);

    const reply = await sendChatMessage(trimmed);
    const finalMessages = [...withUserMessage, { id: generateId(), ...reply }];
    setMessages(finalMessages);
    setIsThinking(false);

    if (!user || temporaryChat) return;

    if (activeHistoryId) {
      persistHistory(
        history.map((item) =>
          item.id === activeHistoryId ? { ...item, messages: finalMessages } : item
        )
      );
    } else {
      const newItem: HistoryItem = {
        id: generateId(),
        title: trimmed.length > 40 ? `${trimmed.slice(0, 40)}...` : trimmed,
        preview: trimmed,
        messages: finalMessages,
      };
      setActiveHistoryId(newItem.id);
      persistHistory([newItem, ...history]);
    }
  }

  const suggestedChips = getSuggestedChips(user?.role ?? null);
  const isEmptyChat = messages.length <= 1;

  const sidebarProps = {
    isSignedIn: !!user,
    history,
    activeHistoryId,
    temporaryChat,
    onNewChat: handleNewChat,
    onSelectHistory: handleSelectHistory,
    onToggleTemporary: setTemporaryChat,
  };

  return (
    <div className="flex h-full min-h-0">
      <aside className="hidden w-72 shrink-0 border-r border-border md:block">
        <Sidebar {...sidebarProps} />
      </aside>

      <MobileDrawer open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} side="left">
        <div className="flex items-center justify-between border-b border-border p-2">
          <span className="pl-2 font-heading text-sm font-bold text-text">Menu</span>
          <IconButton aria-label="Close menu" onClick={() => setMobileSidebarOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Sidebar {...sidebarProps} />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border p-2 md:hidden">
          <IconButton aria-label="Open chat history" onClick={() => setMobileSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <span className="font-heading text-sm font-bold text-text-muted">Chat history</span>
        </div>

        {isEmptyChat ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-4">
            <div className="max-w-md text-center">
              <p className="font-heading text-lg font-bold text-text">
                {WELCOME_MESSAGE.text}
              </p>
            </div>
            <SuggestedChips chips={suggestedChips} onSelect={handleSend} />
          </div>
        ) : (
          <MessageList messages={messages} isThinking={isThinking} onOpenSources={setOpenSources} />
        )}

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => handleSend(inputValue)}
          disabled={isThinking}
        />
      </div>

      <SourcesPanel sources={openSources} onClose={() => setOpenSources(null)} />
    </div>
  );
}
