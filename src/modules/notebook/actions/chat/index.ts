"use server";

import { db } from "@/db";
import { currentUser } from "@/modules/authentication/actions";
import { ApiError } from "@/utils/ApiError";
import { convertDbMessagesToUI, convertUIMessageToDB } from "@/utils/chat";
import {
  ChatSessionStatus,
  ContextSource,
  Message,
  MessageRole,
} from "@prisma/client";
import { UIMessage } from "ai";

export const createChatSession = async () => {
  try {
    const currentUserSession = await currentUser();
    if (!currentUserSession) {
      throw new ApiError("Current User Session Not Found", 400);
    }

    const { id } = currentUserSession;
    const createChat = await db.chatSession.create({
      data: {
        userId: id,
      },
    });

    return createChat;
  } catch (error: any) {
    console.log("Error while creating chat session: ", error.message);
    return null;
  }
};

export const clearAllChats = async (chatSessionId: string) => {
  try {
    const deleteChat = await db.message.deleteMany({
      where: { chatSessionId },
    });

    return deleteChat;
  } catch (error: any) {
    console.log("Error while deleting chat session: ", error.message);
    return null;
  }
};

export const getLastActiveChatSession = async () => {
  try {
    const currentUserSession = await currentUser();
    if (!currentUserSession) {
      throw new ApiError("Current User Session Not Found", 400);
    }
    const { id: userId } = currentUserSession;

    const session = await db.chatSession.findFirst({
      where: {
        userId: userId,
        chatSessionStatus: ChatSessionStatus.ACTIVE,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return session;
  } catch (error: any) {
    console.log("Error while fetching Session", error.message);
    return null;
  }
};

export const getContextAndMessagesFromChatSessionById = async (
  chatSessionId: string
) => {
  const chatSession = await db.chatSession.findUnique({
    where: { id: chatSessionId },
    select: {
      contexts: true,
      messages: true,
    },
  });

  if (!chatSession) {
    throw new ApiError("Chat session not found", 404);
  }

  const messages = convertDbMessagesToUI(chatSession.messages);
  const contexts = chatSession.contexts as ContextSource[];

  return { messages, contexts };
};


export const addMessages = async ({
  chatSessionId,
  role,
  content,
}: Partial<Message>) => {
  // validation baadme waise bhi server action function hai public nhi hai
  if (!chatSessionId || !role || !content) {
    throw new ApiError("Missing fields required", 400);
  }
  const createMessage = await db.message.create({
    data: {
      chatSessionId,
      role,
      content,
    },
  });
  return createMessage;
};
