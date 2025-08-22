import { chat } from "@/rag/chat";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { validateChat } from "@/validators/chat.validator";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userQuery } = await req.json();
  const userSessionId = req?.headers.get("x-user-session");
  if (!userSessionId) {
    throw new ApiError("x-user-session header is required", 400);
  }
  const validate = validateChat({ userQuery, userSessionId });
  if (!validate.success) {
    throw new ApiError(`Invalid request:${validate.error}`, 400);
  }

  const modelResponse = await chat(userQuery, userSessionId);
  return NextResponse.json(
    new ApiResponse(
      200,
      {
        reply: modelResponse,
      },
      "Chat response successfully generated ✅"
    ),
    { status: 200 }
  );
}
