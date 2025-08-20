import { chat } from "@/rag/chat";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  const { userQuery, collectionName } = await req.json();
  if (!userQuery || !collectionName) {
    return NextResponse.json(
      { error: "No user query or collection name provided" },
      { status: 400 }
    );
  }

  const modelResponse = await chat(userQuery, collectionName);
  return NextResponse.json(
    {
      message: "Chat Fetched Successfully",
      reply: modelResponse,
      success: true,
    },
    { status: 200 }
  );
}
