"use server";

import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  validatePDFIndexing,
  validateTextIndexing,
  validateWebsiteIndexing,
} from "@/validators/indexingApi.validator";
import { pdfIndexing } from "../../rag/indexing/pdf";
import { textIndexing } from "../../rag/indexing/text";
import { websiteIndexing } from "../../rag/indexing/website";
import { youtubeIndexing } from "../../rag/indexing/youtube";
import { addContext } from "../context";
import { SourceType } from "@prisma/client";
import { getLastActiveChatSession } from "../chat";

/* ---------------------- PDF Indexing ---------------------- */
export async function handlePdfIndexing(formData: FormData) {
  try {
    const pdf = formData.get("pdf") as File;
    const chatSession = await getLastActiveChatSession();
    if (!chatSession?.id) throw new ApiError("Unauthorized", 401);

    const validations = validatePDFIndexing({
      file: pdf,
      chatSessionId: chatSession.id,
    });
    if (!validations.success) {
      throw new ApiError(
        `Invalid PDF indexing data: ${validations.error.issues[0]?.message}`,
        400
      );
    }

    const indexingFileId = await pdfIndexing(pdf, chatSession.id);
    if (!indexingFileId) throw new ApiError("Indexing Failed ❌", 500);

    const contextData = {
      source: {
        title: pdf.name,
        sourceType: SourceType.PDF,
        size: pdf.size,
        qdrantCollection: indexingFileId,
      },
      chatSessionId: chatSession.id,
    };
    await safeAddContext(contextData, "pdf");

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

/* ---------------------- TEXT Indexing ---------------------- */
export async function handleTextIndexing(formData: FormData) {
  try {
    const copiedText = formData.get("copiedText") as string;
    const chatSession = await getLastActiveChatSession();
    if (!chatSession?.id) throw new ApiError("Unauthorized", 401);

    const validations = validateTextIndexing({
      text: copiedText,
      chatSessionId: chatSession.id,
    });
    if (!validations.success) {
      throw new ApiError(
        `Invalid Text indexing data: ${validations.error.issues[0]?.message}`,
        400
      );
    }

    const indexingFileId = await textIndexing(copiedText, chatSession.id);
    if (!indexingFileId) throw new ApiError("Indexing Failed ❌", 500);

    const contextData = {
      source: {
        title: copiedText.slice(0, 30),
        sourceType: SourceType.TEXT,
        charLength: copiedText.length,
        qdrantCollection: indexingFileId,
      },
      chatSessionId: chatSession.id,
    };
    await safeAddContext(contextData, "text");

    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "Text Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handleTextIndexing:", error);
    throw error;
  }
}

/* ---------------------- WEBSITE Indexing ---------------------- */
export async function handleWebsiteIndexing(formData: FormData) {
  try {
    const website = formData.get("website") as string;
    const chatSession = await getLastActiveChatSession();
    if (!chatSession?.id) throw new ApiError("Unauthorized", 401);

    const validations = validateWebsiteIndexing({
      url: website,
      chatSessionId: chatSession.id,
    });
    if (!validations.success) {
      throw new ApiError(
        `Invalid Website indexing data: ${validations.error.issues[0]?.message}`,
        400
      );
    }

    const indexingFileId = await websiteIndexing(website, chatSession.id);
    if (!indexingFileId) throw new ApiError("Indexing Failed ❌", 500);

    const { hostname } = new URL(website);
    const contextData = {
      source: {
        title: hostname,
        sourceType: SourceType.WEBSITE,
        url: website,
        qdrantCollection: indexingFileId,
      },
      chatSessionId: chatSession.id,
    };
    await safeAddContext(contextData, "website");

    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "Website Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handleWebsiteIndexing:", error);
    throw error;
  }
}

/* ---------------------- YOUTUBE Indexing ---------------------- */
export async function handleYoutubeIndexing(formData: FormData) {
  try {
    const youtubeUrl = formData.get("youtube") as string;
    const chatSession = await getLastActiveChatSession();
    if (!chatSession?.id) throw new ApiError("Unauthorized", 401);

    const validations = validateWebsiteIndexing({
      url: youtubeUrl,
      chatSessionId: chatSession.id,
    });
    if (!validations.success) {
      throw new ApiError(
        `Invalid YouTube indexing data: ${validations.error.issues[0]?.message}`,
        400
      );
    }

    const indexingFileId = await youtubeIndexing(youtubeUrl, chatSession.id);
    if (!indexingFileId) throw new ApiError("Indexing Failed ❌", 500);

    const contextData = {
      source: {
        title: youtubeUrl,
        sourceType: SourceType.YOUTUBE,
        url: youtubeUrl,
        qdrantCollection: indexingFileId,
      },
      chatSessionId: chatSession.id,
    };
    await safeAddContext(contextData, "youtube");

    return new ApiResponse(
      200,
      { fileId: indexingFileId },
      "YouTube Video Indexed Successfully ✅"
    ).toJSON();
  } catch (error) {
    console.error("Error in handleYoutubeIndexing:", error);
    throw error;
  }
}

/* ---------------------- Helper ---------------------- */
async function safeAddContext(contextData: any, label: string) {
  try {
    await addContext(contextData);
  } catch (error: any) {
    console.log(`Error while adding ${label} to context:`, error.message);
  }
}
