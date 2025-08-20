import { chat } from "@/rag/chat";
import { ytIndexing } from "@/rag/ytIndexing";
import { NextResponse, NextRequest } from "next/server";
import slugify from 'slugify'

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const youtubeURL = formData.get("youtube") as string;
   if (!youtubeURL) {
    return NextResponse.json(
      { error: "No YouTube URL provided" },
      { status: 400 }
    );
  }
  // make collection from youtube url
  const collectionName = slugify(youtubeURL, {
  replacement: "_", // replace invalid chars with _
  lower: true,
  strict: true,     // only letters/numbers/underscore
});
 
  const doIndexing = await ytIndexing(youtubeURL, collectionName);
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
