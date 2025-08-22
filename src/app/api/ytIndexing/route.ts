import { ytIndexing } from "@/rag/ytIndexing";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { validateWebsiteIndexing } from "@/validators/indexingApi.validator";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const youtube = formData.get("youtube") as string;
  const userSessionId = req?.headers.get("x-user-session");
  if (!userSessionId) {
    throw new ApiError("x-user-session header is required", 400);
  }
  const validations = validateWebsiteIndexing({ url: youtube, userSessionId });
  if (!validations.success) {
    throw new ApiError(
      `Invalid website indexing data ${validations.error}`,
      400
    );
  }
  const indexingFileId = await ytIndexing(youtube, userSessionId);
  if (!indexingFileId) {
    throw new ApiError("Indexing Failed ❌", 500);
  }

  return NextResponse.json(
    new ApiResponse(
      200,
      {
        fileId: indexingFileId,
      },
      "Website Indexing Successfully ✅"
    ),
    { status: 200 }
  );
}
