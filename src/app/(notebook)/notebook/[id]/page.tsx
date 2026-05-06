"use client";
import { getContextAndMessagesFromChatSessionById } from "@/modules/notebook/actions/chat";
import ChatBox from "@/modules/notebook/components/chatBox";
import SourceBox from "@/modules/notebook/components/sourceBox";
import { ContextSource } from "@prisma/client";
import { UIMessage } from "ai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [contextCreated, setContextCreated] = useState(false);
  const [contexts, setContexts] = useState<ContextSource[]>([]);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const params = useParams();
  const chatSessionId = params.id as string;

  const getChatSessionData = async (chatSessionId: string) => {
    const data = await getContextAndMessagesFromChatSessionById(chatSessionId);
    if (!data) {
      console.log("No Data Found");
    } else {
      const { messages, contexts } = data;
      if (messages.length > 0) setMessages(messages);
      if (contexts.length > 0) {
        setContexts(contexts);
        setContextCreated(true);
      }
    }
  };

  useEffect(() => {
    getChatSessionData(chatSessionId);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-[300px] lg:w-[300px] flex-shrink-0",
          "bg-stone-950/80 lg:bg-stone-950/40 backdrop-blur-xl",
          "border-r border-stone-900/80",
          "flex flex-col",
          "transition-[transform,margin] duration-300 ease-in-out",
          isSidebarOpen
            ? "translate-x-0 lg:ml-0"
            : "-translate-x-full lg:ml-[-300px]"
        )}
      >
        {/* Sidebar header */}
        <div className="h-14 flex justify-between items-center px-4 flex-shrink-0 border-b border-stone-900/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
          >
            <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center">
              <span className="text-stone-950 text-[13px] font-bold tracking-tight">
                N
              </span>
            </div>
            <span className="text-[13px] font-medium text-stone-200 tracking-tight">
              Notionary
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-stone-500 hover:text-stone-200 hover:bg-stone-900 lg:flex hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-stone-500 hover:text-stone-200 hover:bg-stone-900 lg:hidden flex"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <SourceBox
            open={open}
            setOpen={setOpen}
            contexts={contexts}
            contextCreated={contextCreated}
            setContextCreated={setContextCreated}
          />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top bar */}
        <div className="h-14 flex items-center px-4 border-b border-stone-900/80 flex-shrink-0 lg:bg-transparent bg-stone-950/60 backdrop-blur-md gap-3">
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-stone-400 hover:text-stone-100 hover:bg-stone-900 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Desktop expand */}
          {!isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-stone-400 hover:text-stone-100 hover:bg-stone-900 hidden lg:flex"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </Button>
          )}

          <span className="text-sm font-medium text-stone-200 tracking-tight lg:hidden">
            Notionary
          </span>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          <ChatBox
            setOpen={setOpen}
            UserMessages={messages}
            setContextCreated={setContextCreated}
            contextCreated={contextCreated}
          />
        </div>
      </div>
    </div>
  );
}
