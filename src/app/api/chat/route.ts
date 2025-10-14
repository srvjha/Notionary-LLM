import { currentUser } from "@/modules/authentication/actions";
import {
  addMessages,
  getLastActiveChatSession,
} from "@/modules/notebook/actions/chat";
import { chat } from "@/modules/notebook/rag/retrieval";
import { ApiError } from "@/utils/ApiError";
import { convertUIMessageToDB } from "@/utils/chat";
import { UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();
  const chatSession = await getLastActiveChatSession();
  const chatSessionId = chatSession?.id;
  if (!chatSessionId) {
    throw new ApiError("Chat Session Id required", 400);
  }
  for (const msg of messages) {
    const dbMsg = convertUIMessageToDB(msg, chatSessionId);
    await addMessages(dbMsg);
  }
  const result = await chat(messages, chatSessionId);

  const stream =  result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });

  // console.log("ai response stream: ",stream)
  return stream
  
}
