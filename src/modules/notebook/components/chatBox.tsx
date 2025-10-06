import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";

import { BeatLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { isMarkdown } from "@/utils/helper";
import { Upload, Send, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChatWithDocs } from "../hooks/notebook";

interface ChatForm {
  input: string;
  messages: { role: "user" | "bot"; text: string }[];
}

interface ChatBoxProps {
  setOpen: (open: boolean) => void;
  setContextCreated: (created: boolean) => void;
  contextCreated: boolean;
}

const ChatBox = ({ setOpen, contextCreated }: ChatBoxProps) => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<ChatForm>({
    defaultValues: {
      input: "",
      messages: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "messages",
  });

  const { mutateAsync: chatWithDocs, isPending: isLoading } = useChatWithDocs();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = watch("messages");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fields]);

  const onSubmit = async (data: ChatForm) => {
    if (!data.input.trim()) return;

    append({ role: "user", text: data.input });
    setValue("input", "");

    try {
      const response = await chatWithDocs(data.input);
      if (response.success) {
        append({ role: "bot", text: response.data.reply });
      }
    } catch {
      append({ role: "bot", text: "❌ Error fetching reply" });
    } finally {
      setValue("input", "");
    }
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
            onClick={() =>
              reset({
                input: "",
                messages: [],
              })
            }
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

          {fields.map((msg) => (
            <div
              key={msg.id}
              className={`w-full flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block max-w-[60%] px-4 py-2 rounded-2xl text-base leading-relaxed break-words shadow-md ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-neutral-800 text-neutral-100 rounded-bl-none"
                }`}
              >
                {msg.role === "bot" ? (
                  isMarkdown(msg.text) ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    <p>{msg.text}</p>
                  )
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center items-center gap-2 bg-neutral-800 px-4 py-4 rounded-2xl max-w-[10%] text-neutral-400 mr-auto rounded-bl-none shadow-md">
              <BeatLoader size={9} color="#9CA3AF" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex items-center gap-2"
      >
        <Controller
          name="input"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder={`${
                !contextCreated
                  ? "Upload file to start chatting"
                  : "Start Typing..."
              }`}
              className="p-5 text-base  bg-neutral-800 text-white border-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              {...field}
              disabled={!contextCreated || isLoading}
            />
          )}
        />
        <Button
          size="icon"
          type="submit"
          disabled={isLoading || !contextCreated}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
