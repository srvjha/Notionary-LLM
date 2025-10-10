"use server";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { ContextIndexingType } from "@/types/context.type";
import { db } from "@/db";
import { Source } from "../../components/sourceBox";


export const addContext = async ({ source, userSessionId }: ContextIndexingType) => {
  try {
    if (!userSessionId) {
      throw new ApiError("Missing user session ID", 400);
    }

    const { title, sourceType, size, charLength, url, qdrantCollection } = source;

    const context = await db.contextSource.create({
      data: {
        title,
        sourceType,
        size,
        charLength,
        url,
        qdrantCollection,
        userId: userSessionId,
      },
    });

    return new ApiResponse(200, { context }, "Context added successfully ✅").toJSON();
  } catch (error) {
    console.error("Error in addContext:", error);
    throw error;
  }
};

export const getAllContextsForActiveSession = async (userId: string): Promise<Source[]> => {
  try {
    const allContexts = await db.contextSource.findMany({ where: { userId } });

    return allContexts.map((context) => {
      const typeMap: Record<string, Source["type"]> = {
        pdf: "pdf",
        website: "website",
        text: "text",
        youtube: "youtube",
      };

      return {
        title: context.title,
        type: typeMap[context.sourceType.toLowerCase()] || "text", // fallback
      };
    });
  } catch (error: any) {
    console.error("Error fetching contexts:", error);
    return [];
  }
};

