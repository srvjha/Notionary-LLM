"use server";

import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  validatePDFIndexing,
  validateTextIndexing,
  validateWebsiteIndexing,
} from "@/validators/indexingApi.validator";
import { pdfIndexing } from "../../rag/indexing/pdf";
import { currentUser } from "@/modules/authentication/actions";
import { textIndexing } from "../../rag/indexing/text";
import { websiteIndexing } from "../../rag/indexing/website";
import { youtubeIndexing } from "../../rag/indexing/youtube";


export async function handlePdfIndexing(formData: FormData) {
  try {
    const pdf = formData.get("pdf") as File;
    const session = await currentUser();
    if (!session) {
      throw new ApiError("Unauthorized", 401);
    }
    const userSessionId = session.id;

    if (!userSessionId) {
      throw new ApiError("x-user-session field is required", 400);
    }

    const validations = validatePDFIndexing({ file: pdf, userSessionId });
    console.log("validations", validations);
    if (!validations.success) {
      const errorMessage = validations.error.issues[0]?.message;
      throw new ApiError(`Invalid PDF indexing data :${errorMessage}`, 400);
    }

    const indexingFileId = await pdfIndexing(pdf, userSessionId);
    if (!indexingFileId) {
      throw new ApiError("Indexing Failed ❌", 500);
    }

    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "PDF File Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handlePdfIndexing:", error);
    throw error;
  }
}

export async function handleTextIndexing(formData: FormData) {
  try {
    const copiedText = formData.get("copiedText") as string;
    const session = await currentUser();
    if (!session) {
      throw new ApiError("Unauthorized", 401);
    }
    const userSessionId = session.id;

    const validations = validateTextIndexing({
      text: copiedText,
      userSessionId,
    });
    if (!validations.success) {
       const errorMessage = validations.error.issues[0]?.message;
      throw new ApiError(
        `Invalid Text indexing data ${errorMessage}`,
        400
      );
    }
    const indexingFileId = await textIndexing(copiedText, userSessionId);
    if (!indexingFileId) {
      throw new ApiError("Indexing Failed ❌", 500);
    }
    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "Text Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handlePdfIndexing:", error);
    throw error;
  }
}

export async function handleWebsiteIndexing(formData: FormData) {
  try {
    const website = formData.get("website") as string;
    const session = await currentUser();
    if (!session) {
      throw new ApiError("Unauthorized", 401);
    }
    const userSessionId = session.id;

    const validations = validateWebsiteIndexing({
      url: website,
      userSessionId,
    });
    if (!validations.success) {
       const errorMessage = validations.error.issues[0]?.message;
      throw new ApiError(
        `Invalid website indexing data ${errorMessage}`,
        400
      );
    }
    const indexingFileId = await websiteIndexing(website, userSessionId);
    if (!indexingFileId) {
      throw new ApiError("Indexing Failed ❌", 500);
    }
    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "Website Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handlePdfIndexing:", error);
    throw error;
  }
}

export async function handleYoutubeIndexing(formData: FormData) {
  try {
    const youtube = formData.get("youtube") as string;
    const session = await currentUser();
    if (!session) {
      throw new ApiError("Unauthorized", 401);
    }
    const userSessionId = session.id;

    const validations = validateWebsiteIndexing({
      url: youtube,
      userSessionId,
    });
    if (!validations.success) {
       const errorMessage = validations.error.issues[0]?.message;
      throw new ApiError(
        `Invalid website indexing data ${errorMessage}`,
        400
      );
    }
    const indexingFileId = await youtubeIndexing(youtube, userSessionId);
    if (!indexingFileId) {
      throw new ApiError("Indexing Failed ❌", 500);
    }

    return new ApiResponse(
      200,
      {
        fileId: indexingFileId,
      },
      "Youtube Video Indexed Successfully"
    ).toJSON();
  } catch (error) {
    console.error("Error in handlePdfIndexing:", error);
    throw error;
  }
}
