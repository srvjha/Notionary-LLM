import { chat } from "@/rag/chat";
import { indexing } from "@/rag/Indexing";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { validatePDFIndexing } from "@/validators/indexingApi.validator";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const pdf = formData.get("pdf") as File;
  const userSessionId = req?.headers.get("x-user-session");
  if (!userSessionId) {
    throw new ApiError("x-user-session header is required", 400);
  }
  const validations = validatePDFIndexing({ file: pdf, userSessionId });
  if (!validations.success) {
    throw new ApiError(`Invalid PDF indexing data ${validations.error}`, 400);
  }
  const indexingFileId = await indexing(pdf, userSessionId);
  if (!indexingFileId) {
    throw new ApiError("Indexing Failed ❌", 500);
  }

  return NextResponse.json(
    new ApiResponse(
      200,
      {
        fileId: indexingFileId,
      },
      "File Indexing Successfully ✅"
    ),
    { status: 200 }
  );
}
