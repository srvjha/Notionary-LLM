import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { QdrantClient } from "@qdrant/js-client-rest";
import { NextResponse } from "next/server";
const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export async function DELETE(req: Request) {
  const { fileID } = await req.json();
  const userSessionId = req.headers.get("x-user-session");

  if (!fileID) {
    throw new ApiError("Missing file ID", 400);
  }
  if (!userSessionId) {
    throw new ApiError("Missing user session ID", 400);
  }
  const collectionName = `notecast-${userSessionId}`;

  await client.delete(collectionName, {
    filter: {
      must: [
        {
          key: "fileID",
          match: { value: fileID },
        },
      ],
    },
  });
  return NextResponse.json(
    new ApiResponse(200, {}, "File deleted successfully")
  );
}
