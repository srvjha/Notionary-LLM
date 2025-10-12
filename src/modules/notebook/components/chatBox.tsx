import { useEffect, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Upload, Brain, RefreshCcwIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Action, Actions } from "@/components/ai-elements/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/ai-elements/loader";
import {
  PromptInput,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { useCurrentUser } from "@/modules/authentication/hooks/auth";

interface ChatBoxProps {
  setOpen: (open: boolean) => void;
  setContextCreated: (created: boolean) => void;
  UserMessages: UIMessage[];
  contextCreated: boolean;
}

const ChatBox = ({ setOpen, contextCreated, UserMessages }: ChatBoxProps) => {
  let { messages, sendMessage, status, regenerate } = useChat();
  const [input, setInput] = useState("");
  const { data: user } = useCurrentUser();


  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text?.trim());
    if (!hasText) {
      return;
    }

    sendMessage({
      text: message.text || "",
    });
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col text-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
        <p className="text-lg font-semibold">Chat</p>
        {messages.length > 0 && (
          <Button
            variant="destructive"
            className="cursor-pointer "
            onClick={() => (messages = [])}
          >
            Clear Chat
          </Button>
        )}
      </div>

      {/* Chat Area */}
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
        <div
          className="p-4 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scroll-hidden"
          style={{ maxHeight: "420px" }}
        >
          {messages.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full text-center text-neutral-400">
              <Brain className="w-12 h-12 text-indigo-200 mb-3" />
              <h2 className="text-xl font-semibold text-white">
                Welcome to Chat
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Lets get started by asking a question or uploading a source.
              </p>
            </div>
          )}

          <Conversation className="h-full rounded-xl">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.id}>
                  <Message from={message.role} key={message.id}>
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://avatar.iran.liara.run/public/32"
                          alt="assitant"
                        />
                      )}

                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              const isLastMessage =
                                messages[messages.length - 1].id === message.id;
                              return (
                                <div key={`${message.id}-${i}`}>
                                  <Response>{part.text}</Response>
                                  {message.role === "assistant" &&
                                    isLastMessage && (
                                      <Actions className="mt-2">
                                        <Action
                                          onClick={() => regenerate()}
                                          label="Retry"
                                        >
                                          <RefreshCcwIcon className="size-4" />
                                        </Action>
                                        <Action
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              part.text
                                            )
                                          }
                                          label="Copy"
                                        >
                                          <CopyIcon className="size-4" />
                                        </Action>
                                      </Actions>
                                    )}
                                </div>
                              );

                            default:
                              return null;
                          }
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
                </div>
              ))}
              {status === "submitted" && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* {isLoading && (
            <div className="flex justify-center items-center gap-2 bg-neutral-800 px-4 py-4 rounded-2xl max-w-[10%] text-neutral-400 mr-auto rounded-bl-none shadow-md">
              <BeatLoader size={9} color="#9CA3AF" />
            </div>
          )} */}

          {/* <div ref={messagesEndRef} /> */}
        </div>
      )}

      {/* Input */}
      <PromptInput
        onSubmit={handleSubmit}
        className="p-4 flex items-center gap-2 "
      >
        <PromptInputTextarea
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${
            !contextCreated
              ? "Upload file to start chatting"
              : "Start Typing..."
          }`}
          disabled={!contextCreated}
          value={input}
          className="px-4 text-base min-h-[10px]   text-white border-none bg-red-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
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
