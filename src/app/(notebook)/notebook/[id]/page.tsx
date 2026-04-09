"use client";
import { getContextAndMessagesFromChatSessionById } from "@/modules/notebook/actions/chat";
import ChatBox from "@/modules/notebook/components/chatBox";
import SourceBox from "@/modules/notebook/components/sourceBox";
import { ContextSource, Message } from "@prisma/client";
import { UIMessage } from "ai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      if (messages.length > 0) {
        setMessages(messages);
      }
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
    <div className="flex h-screen w-full bg-black overflow-hidden relative selection:bg-blue-900 selection:text-blue-100">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div 
        className={`${isSidebarOpen ? "translate-x-0 lg:ml-0" : "-translate-x-full lg:ml-[-320px]"} transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 w-[280px] lg:w-[320px] bg-[#0a0a0a] lg:bg-blue-950/5 flex flex-col flex-shrink-0 shadow-[4px_0_24px_rgba(30,58,138,0.05)] z-50`}
      >
        <div className="h-16 flex justify-between items-center px-4 flex-shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <img src="/favicon.ico" alt="Logo" className="w-[32px] h-[32px] rounded-lg shadow-sm" />
          </Link>
          <Button variant="ghost" size="icon" className="hidden lg:flex text-neutral-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <PanelLeftClose className="w-7 h-7" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-1 custom-scrollbar">
          <SourceBox
            open={open}
            setOpen={setOpen}
            contexts={contexts}
            contextCreated={contextCreated}
            setContextCreated={setContextCreated}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-black relative min-w-0">
        
        {/* Chat Toggle for Desktop */}
        <div className="hidden lg:flex absolute top-0 left-0 h-16 items-center px-4 z-40">
           {!isSidebarOpen && (
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="text-neutral-400 hover:text-white">
                <PanelLeftOpen className="w-5 h-5" />
             </Button>
           )}
        </div>

        {/* Mobile Header (Hamburger) */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-blue-900/20 flex-shrink-0 bg-black/80 backdrop-blur-md absolute top-0 inset-x-0 z-30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-200 hover:text-blue-100 hover:bg-blue-900/30"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="ml-4 font-semibold text-blue-100 tracking-tight">Notionary LLM</span>
        </div>

        {/* Chat Box Container */}
        <div className="flex-1 overflow-hidden lg:pt-0 pt-16 relative p-2 lg:p-4">
          <div className="h-full w-full max-w-5xl mx-auto bg-neutral-900/40 rounded-xl border border-neutral-800 flex flex-col overflow-hidden shadow-lg">
            <ChatBox
              setOpen={setOpen}
              UserMessages={messages}
              setContextCreated={setContextCreated}
              contextCreated={contextCreated}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
