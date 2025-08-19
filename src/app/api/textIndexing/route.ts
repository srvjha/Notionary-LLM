import { chat } from "@/rag/chat";
import { textIndexing } from "@/rag/textIndexing";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const copiedText = formData.get("copiedText") as string;
  const collectionName = formData.get("collectionName") as string;

  if (!copiedText) {
    return NextResponse.json(
      { error: "No copied text provided" },
      { status: 400 }
    );
  }
  const doIndexing = await textIndexing(copiedText, collectionName);
  if (!doIndexing) {
    return NextResponse.json({ error: "Indexing Failed ❌" }, { status: 500 });
  }

  const modelResponse = await chat("Summarize the content", collectionName);
  return NextResponse.json(
    {
      message: "Chat Fetched Successfully",
      summary: modelResponse,
      collectionName,
      success: true,
    },
    { status: 200 }
  );
}
