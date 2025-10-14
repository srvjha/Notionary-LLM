import { Message, MessageRole } from "@prisma/client";
import { UIMessage } from "ai";
import { ApiError } from "./ApiError";

export const convertDbMessagesToUI = (dbMessages: Message[]): UIMessage[] => {
  return dbMessages.map((msg) => ({
    id: msg.id,
    role:
      msg.role === MessageRole.USER
        ? "user"
        : msg.role === MessageRole.ASSISTANT
        ? "assistant"
        : "system",
    parts: [{ type: "text", text: msg.content }],
  }));
};

export const convertUIMessageToDB = (
  uiMessage: UIMessage,
  chatSessionId: string
): {
  chatSessionId: string;
  role: MessageRole;
  content: string;
  metadata?: object;
} => {
  if (!uiMessage.role || !uiMessage.parts || !chatSessionId) {
    throw new ApiError("Invalid UIMessage or chatSessionId", 400);
  }
 
  const roleMap: Record<string, MessageRole> = {
    user: MessageRole.USER,
    assistant: MessageRole.ASSISTANT,
    system: MessageRole.SYSTEM,
  };

  return {
    chatSessionId,
    role: roleMap[uiMessage.role],
    content: uiMessage.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join("\n"),
    metadata: {},
  };
};
