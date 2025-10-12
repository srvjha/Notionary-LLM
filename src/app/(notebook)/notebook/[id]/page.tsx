"use client";
import { getContextAndMessagesFromChatSessionById } from "@/modules/notebook/actions/chat";
import ChatBox from "@/modules/notebook/components/chatBox";
import SourceBox from "@/modules/notebook/components/sourceBox";
import { ContextSource, Message } from "@prisma/client";
import { UIMessage } from "ai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [contextCreated, setContextCreated] = useState(false);
  const [contexts, setContexts] = useState<ContextSource[]>([]);
  const [messages, setMessages] = useState<UIMessage[]>([]);

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
        setContextCreated(true)
      }
    }
  };
  useEffect(() => {
    getChatSessionData(chatSessionId);
  }, []);

  return (
    <>
      <div className="max-w-8xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-4 min-h-[85vh]">
          <div className="bg-neutral-900/40  lg:w-1/4 rounded-xl">
            <SourceBox
              open={open}
              setOpen={setOpen}
              contexts={contexts}
              contextCreated={contextCreated}
              setContextCreated={setContextCreated}
            />
          </div>

          <div className="bg-neutral-900/40 w-full lg:flex-1 rounded-xl">
            <ChatBox
              setOpen={setOpen}
              UserMessages={messages}
              setContextCreated={setContextCreated}
              contextCreated={contextCreated}
            />
          </div>
        </div>
      </div>
    </>
  );
}
