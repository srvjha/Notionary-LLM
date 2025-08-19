"use client";

import { Upload, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useChatWithPdfMutation } from "@/services/pdfApi";

interface ChatForm {
  input: string;
  messages: { role: "user" | "bot"; text: string }[];
}

const ChatBox = ({ pdf }: { pdf: { name: string; summary: string } | null }) => {
  const summary = pdf?.summary || "";
  const collectionName = pdf?.name || "";

  const { control, handleSubmit, setValue, watch } = useForm<ChatForm>({
    defaultValues: {
      input: "",
      messages: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "messages",
  });

  const [chatWithPdf, { isLoading }] = useChatWithPdfMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Watch messages so we know when chat starts
  const messages = watch("messages");

  // auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fields]);

  const onSubmit = async (data: ChatForm) => {
    if (!data.input.trim()) return;

    // append user message
    append({ role: "user", text: data.input });

    try {
      const response = await chatWithPdf({
        userQuery: data.input,
        collectionName,
      }).unwrap();

      append({ role: "bot", text: response.reply });
    } catch {
      append({ role: "bot", text: "❌ Error fetching reply" });
    }

    setValue("input", "");
  };

  return (
    <div className="w-full h-full flex flex-col  text-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <p className="text-lg font-semibold">Chat</p>
      </div>

      {/* Chat Area */}
      {!summary ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="bg-blue-600/20 p-4 rounded-full mb-3">
            <Upload className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-lg font-medium">Upload a file to get started</p>
          <p className="text-sm text-neutral-500 mt-1">Drag and Drop files</p>
        </div>
      ) : (
        <div className="p-4 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-700">
         {messages.length === 0 && <p className="text-base text-neutral-500 mb-4">{summary}</p>}
          {fields.map((msg, i) => (
            <div
              key={msg.id}
              className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto rounded-br-none shadow-md"
                  : "bg-neutral-800 text-neutral-100 mr-auto rounded-bl-none shadow-md"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Loader while bot is typing */}
          {isLoading && (
            <div className="flex items-center space-x-2 bg-neutral-800 px-4 py-2 rounded-2xl max-w-[70%] text-neutral-400 mr-auto rounded-bl-none shadow-md">
              <span className="dot animate-bounce delay-0">●</span>
              <span className="dot animate-bounce delay-150">●</span>
              <span className="dot animate-bounce delay-300">●</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex items-center gap-2 "
      >
        <Controller
          name="input"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Start typing..."
              className="p-3 bg-neutral-800 text-white border-none focus:ring-2 focus:ring-blue-500 rounded-xl"
              {...field}
              disabled={!summary || isLoading}
            />
          )}
        />
        <Button
          size="icon"
          type="submit"
          disabled={!summary || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
