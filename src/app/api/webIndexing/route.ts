import { chat } from "@/rag/chat";
import { webIndexing } from "@/rag/webIndexing";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const website = formData.get("website") as string;
  const collectionName =
    website
      ? website.replace("https://", "").replace("http://", "").replace(/\//g, "_")
      : `PDF-${Date.now() + Math.floor(Math.random() * 1000)}`;
  if (!website) {
    return NextResponse.json(
      { error: "No website URL provided" },
      { status: 400 }
    );
  }
  const doIndexing = await webIndexing(website, collectionName);
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

