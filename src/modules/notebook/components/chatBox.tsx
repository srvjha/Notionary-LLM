"use client";
import { useEffect, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Response } from "@/components/ai-elements/response";
import { Action, Actions } from "@/components/ai-elements/actions";
import {
  RefreshCcwIcon,
  CopyIcon,
  Upload,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Loader } from "@/components/ai-elements/loader";
import { useCurrentUser } from "@/modules/authentication/hooks/auth";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { addMessages, clearAllChats } from "../actions/chat";
import { convertUIMessageToDB } from "@/utils/chat";
import { cn } from "@/lib/utils";

interface ChatBoxProps {
  setOpen: (open: boolean) => void;
  setContextCreated: (created: boolean) => void;
  UserMessages: UIMessage[];
  contextCreated: boolean;
}

const SUGGESTED_PROMPTS = [
  "Summarize the key points",
  "List the main arguments",
  "What are the open questions?",
  "Give me three takeaways",
];

const ChatBox = ({ setOpen, contextCreated, UserMessages }: ChatBoxProps) => {
  const { messages, sendMessage, status, regenerate, setMessages } = useChat();
  const [input, setInput] = useState("");
  const { data: user } = useCurrentUser();
  const params = useParams();
  const chatSessionId = params.id as string;

  useEffect(() => {
    if (UserMessages?.length > 0) {
      setMessages(UserMessages);
    }
  }, [UserMessages, setMessages]);

  useEffect(() => {
    const saveAssistantMessage = async () => {
      if (status === "ready") {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === "assistant") {
          const dbMsg = convertUIMessageToDB(lastMessage, chatSessionId);
          await addMessages(dbMsg);
        }
      }
    };
    saveAssistantMessage();
  }, [status]);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text?.trim());
    if (!hasText) return;
    sendMessage({ text: message.text || "" });
    setInput("");
  };

  const handleSuggestion = (prompt: string) => {
    if (!contextCreated) return;
    sendMessage({ text: prompt });
  };

  const handleClearChat = async () => {
    try {
      setMessages([]);
      const deleted = await clearAllChats(chatSessionId);
      if (deleted) toast.success("Chat cleared");
      else toast.error("Couldn’t clear chat");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear chats");
    }
  };

  const hasMessages = messages.length > 0;
  const isStreaming = status === "submitted" || status === "streaming";

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="h-14 px-5 flex justify-between items-center border-b border-stone-900/80 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <p className="text-sm font-medium text-stone-200 tracking-tight">
            Chat
          </p>
          {contextCreated && (
            <span className="text-[10px] uppercase tracking-[0.16em] text-stone-500 ml-1">
              · grounded
            </span>
          )}
        </div>
        {hasMessages && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearChat}
            className="h-7 px-2 text-xs text-stone-500 hover:text-amber-400 hover:bg-stone-900 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Body */}
      {!contextCreated ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 flex flex-col items-center justify-center text-center px-6 cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mb-5 group-hover:border-amber-400/40 transition-colors">
            <Upload className="w-6 h-6 text-stone-400 group-hover:text-amber-400 transition-colors" />
          </div>
          <p className="text-base font-medium text-stone-200">
            Add a source to begin
          </p>
          <p className="text-sm text-stone-500 mt-1.5 max-w-sm leading-relaxed">
            Drop in a PDF, paste a URL or article, or link a YouTube video.
            Then ask anything about it.
          </p>
        </button>
      ) : (
        <div className="flex-1 overflow-hidden relative">
          {!hasMessages ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-medium text-stone-100 tracking-tight">
                Ask your sources anything
              </h2>
              <p className="text-sm text-stone-500 mt-1.5 max-w-md">
                Try one of these to get started, or write your own question.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mt-6 w-full max-w-xl">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSuggestion(p)}
                    className={cn(
                      "text-left text-sm text-stone-300 leading-relaxed",
                      "px-3.5 py-3 rounded-md border border-stone-800/80 bg-stone-900/30",
                      "hover:bg-stone-900 hover:border-stone-700 hover:text-stone-100",
                      "transition-colors cursor-pointer"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <Conversation className="h-full">
              <ConversationContent className="max-w-3xl mx-auto px-5 py-6 space-y-7">
                {messages.map((message, mi) => {
                  const isUser = message.role === "user";
                  const isLast = mi === messages.length - 1;
                  return (
                    <div key={message.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[10px] uppercase tracking-[0.16em] font-medium",
                            isUser ? "text-stone-500" : "text-amber-400/80"
                          )}
                        >
                          {isUser ? user?.name?.split(" ")[0] || "You" : "Notionary"}
                        </span>
                        <div className="flex-1 h-px bg-stone-900/80" />
                      </div>
                      <div
                        className={cn(
                          "text-[15px] leading-relaxed",
                          isUser ? "text-stone-200" : "text-stone-100"
                        )}
                      >
                        {message.parts.map((part, i) => {
                          if (part.type !== "text") return null;
                          return (
                            <div key={`${message.id}-${i}`}>
                              <Response>{part.text}</Response>
                              {!isUser && isLast && !isStreaming && (
                                <Actions className="mt-3 -ml-1.5">
                                  <Action
                                    onClick={() => regenerate()}
                                    label="Retry"
                                    className="text-stone-500 hover:text-amber-400"
                                  >
                                    <RefreshCcwIcon className="size-3.5" />
                                  </Action>
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                    className="text-stone-500 hover:text-amber-400"
                                  >
                                    <CopyIcon className="size-3.5" />
                                  </Action>
                                </Actions>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {status === "submitted" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-amber-400/80">
                        Notionary
                      </span>
                      <div className="flex-1 h-px bg-stone-900/80" />
                    </div>
                    <div className="py-1">
                      <Loader tone="muted" size={6} />
                    </div>
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          )}
        </div>
      )}

      {/* Composer */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-900/80 flex-shrink-0">
        <PromptInput
          onSubmit={handleSubmit}
          className={cn(
            "max-w-3xl mx-auto flex items-end gap-2 p-2 rounded-xl",
            "bg-stone-900/60 border border-stone-800",
            "focus-within:border-stone-700 focus-within:bg-stone-900",
            "transition-colors"
          )}
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              !contextCreated
                ? "Add a source to start chatting…"
                : "Ask a question about your sources…"
            }
            disabled={!contextCreated}
            className="flex-1 px-3 py-2 text-[15px] text-stone-100 placeholder:text-stone-500 bg-transparent border-none focus:ring-0 focus-visible:ring-0 resize-none"
          />
          <PromptInputSubmit
            className={cn(
              "h-9 w-9 rounded-lg shrink-0",
              "bg-amber-400 hover:bg-amber-300 text-stone-950 disabled:bg-stone-800 disabled:text-stone-600"
            )}
            disabled={!input || !contextCreated}
            status={status}
          />
        </PromptInput>
        <p className="text-[10px] text-stone-600 text-center mt-2 max-w-3xl mx-auto">
          Notionary can make mistakes. Verify important information against your
          sources.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
