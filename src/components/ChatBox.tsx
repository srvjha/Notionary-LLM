import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useChatWithPdfMutation } from "@/services/pdfApi";
import { BeatLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { isMarkdown } from "@/utils/helper";
import { Upload, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChatForm {
  input: string;
  messages: { role: "user" | "bot"; text: string }[];
}

// const STORAGE_PREFIX = "chat_history_";

// function getCollectionFromTitle(title: string): string | null {
  
//   let parsed = title;
//   console.log({parsed})
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i) || "";
//     let fileName = key.replace(STORAGE_PREFIX, "").trim();
//     console.log({fileName, key})
//     if (JSON.stringify(parsed) === JSON.stringify(fileName)) {
//       return key;
//     }
//   }
//   return null;
// }
// function restoreChat(collectionName: string) {
//   const savedTitles = collectionName;
//   console.log({savedTitles});

//   if (!savedTitles) return null;

//   const matchedCollectionKey = getCollectionFromTitle(savedTitles);
//   if (!matchedCollectionKey) return null;

//   const savedChat = localStorage.getItem(matchedCollectionKey);
//   console.log({matchedCollectionKey, savedChat});
//   return savedChat ? JSON.parse(savedChat) : null;
// }

const ChatBox = ({
  open,
  setOpen,
  pdf,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  pdf: { name: string; summary: string } | null;
}) => {
  const summary = pdf?.summary || "";
  const collectionName = pdf?.name || "";

  console.log({summary, collectionName});

  const { control, handleSubmit, setValue, watch, reset } = useForm<ChatForm>({
    defaultValues: {
      input: "",
      messages: [],
    },
  });


  const { fields, append, replace } = useFieldArray({
    control,
    name: "messages",
  });

  const [chatWithPdf, { isLoading }] = useChatWithPdfMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = watch("messages");

 useEffect(() => {
  reset({
    input: "",
    messages: [],
  });
}, [collectionName]);


  // useEffect(() => {
  //   if (collectionName && messages.length > 0) {
  //     localStorage.setItem(
  //       STORAGE_PREFIX + collectionName,
  //       JSON.stringify(messages)
  //     );
  //   }
  // }, [messages, collectionName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fields]);

  const onSubmit = async (data: ChatForm) => {
    if (!data.input.trim()) return;

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
    <div className="w-full h-full flex flex-col text-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <p className="text-lg font-semibold">Chat</p>
      </div>

      {/* Chat Area */}
      {!summary && messages.length===0 ? (
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
            <p className="text-base text-neutral-500 mb-4">{summary}</p>
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
                !summary ? "Upload file to start chatting" : "Start Typing..."
              }`}
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
