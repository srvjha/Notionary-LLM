"use server";

import { currentUser } from "@/modules/authentication/actions";
import { ApiError } from "@/utils/ApiError";
import { validateChat } from "@/validators/chat.validator";
import { chat } from "../../rag/retrieval";
import { ApiResponse } from "@/utils/ApiResponse";

export const chatWithDocs = async (userQuery: string) => {
  try {
    const session = await currentUser();
    if (!session) {
      throw new ApiError("Unauthorized", 401);
    }
    const userSessionId = session.id;
    const validate = validateChat({ userQuery, userSessionId });
    if (!validate.success) {
      throw new ApiError(`Invalid request:${validate.error}`, 400);
    }

    const modelResponse = await chat(userQuery, userSessionId);
    return new ApiResponse(
      200,
      {
        reply: modelResponse,
      },
      "Chat response successfully generated ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in chatWithDocs:", error);
    throw error;
  }
};
