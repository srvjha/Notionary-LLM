"use client";
import { useEffect, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Action, Actions } from "@/components/ai-elements/actions";
import { RefreshCcwIcon, CopyIcon, Upload, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface ChatBoxProps {
  setOpen: (open: boolean) => void;
  setContextCreated: (created: boolean) => void;
  UserMessages: UIMessage[];
  contextCreated: boolean;
}

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

  const handleClearChat = async () => {
    try {
      setMessages([]);
      const deleted = await clearAllChats(chatSessionId);
      if (deleted) toast.success("Cleared All Chats");
      else toast.error("Error occurred while clearing chats");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear chats");
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="w-full h-full flex flex-col text-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
        <p className="text-lg font-semibold">Chat</p>
        {hasMessages && (
          <Button className="cursor-pointer" variant="destructive" onClick={handleClearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      {/* Chat Content */}
      {!contextCreated ? (
        <div
          className="flex-1 flex flex-col items-center justify-center text-center p-4"
          onClick={() => setOpen(true)}
        >
          <div className="bg-blue-600/20 p-4 rounded-full mb-3">
            <Upload className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-lg font-medium">Upload a file to get started</p>
          <p className="text-sm text-neutral-500 mt-1">Drag and Drop files</p>
        </div>
      ) : (
        <div className="p-4 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scroll-hidden max-h-[420px]">
          {!hasMessages ? (
            <div className="flex flex-col justify-center items-center h-full text-center text-neutral-400">
              <Brain className="w-12 h-12 text-indigo-200 mb-3" />
              <h2 className="text-xl font-semibold text-white">
                Welcome to Chat
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Ask a question or upload a source to begin.
              </p>
            </div>
          ) : (
            <Conversation className="h-full rounded-xl">
              <ConversationContent>
                {messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://avatar.iran.liara.run/public/32"
                          alt="assistant"
                        />
                      )}

                      <MessageContent className="max-w-full text-sm py-2">
                        {message.parts.map((part, i) => {
                          if (part.type !== "text") return null;
                          const isLast =
                            messages[messages.length - 1].id === message.id;
                          return (
                            <div key={`${message.id}-${i}`}>
                              <Response>{part.text}</Response>
                              {message.role === "assistant" && isLast && (
                                <Actions className="mt-2">
                                  <Action onClick={() => regenerate()} label="Retry">
                                    <RefreshCcwIcon className="size-4" />
                                  </Action>
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-4" />
                                  </Action>
                                </Actions>
                              )}
                            </div>
                          );
                        })}
                      </MessageContent>

                      {message.role === "user" && (
                        <Avatar>
                          <AvatarImage
                            src={
                              user?.image ||
                              "https://avatar.iran.liara.run/public/32"
                            }
                            alt="avatar"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </Message>
                ))}
                {status === "submitted" && <Loader />}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          )}
        </div>
      )}

      {/* Input */}
      <PromptInput onSubmit={handleSubmit} className="p-4 flex items-center gap-2">
        <PromptInputTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            !contextCreated
              ? "Upload a file to start chatting"
              : "Start typing..."
          }
          disabled={!contextCreated}
          className="px-4 text-base text-white border-none bg-red-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        <div className="p-2">
          <PromptInputSubmit
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            disabled={!input}
            status={status}
          />
        </div>
      </PromptInput>
    </div>
  );
};

export default ChatBox;
