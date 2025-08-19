import { chat } from "@/rag/chat";
import { indexing } from "@/rag/Indexing";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const pdf = formData.get("pdf") as File;
  const collectionName =
    pdf instanceof File
      ? pdf.name
      : `PDF-${Date.now() + Math.floor(Math.random() * 1000)}`;
  if (!pdf) {
    return NextResponse.json(
      { error: "No PDF file provided" },
      { status: 400 }
    );
  }
  const doIndexing = await indexing(pdf, collectionName);
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

