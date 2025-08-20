// api/pdfApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UploadResponse {
  message: string;
  summary: string;
  collectionName: string;
}

interface ChatResponse {
  message: string;
  reply: string;
  success: boolean;
}

export const pdfApi = createApi({
  reducerPath: "pdfApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Next.js API routes
  endpoints: (builder) => ({
    uploadPdf: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "pdfchat", // /api/pdfchat
        method: "POST",
        body: formData,
      }),
    }),
    uploadWebsite: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "webIndexing", // /api/webIndexing
        method: "POST",
        body: formData,
      }),
    }),
     uploadText: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "textIndexing", // /api/textIndexing
        method: "POST",
        body: formData,
      }),
    }),

    uploadYoutube: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "ytIndexing", // /api/ytIndexing
        method: "POST",
        body: formData,
      }),
    }),

    chatWithPdf: builder.mutation<ChatResponse, { userQuery: string; collectionName: string }>({
      query: (body) => ({
        url: "chat", // /api/chat
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadPdfMutation, useUploadWebsiteMutation, useUploadTextMutation, useUploadYoutubeMutation, useChatWithPdfMutation } = pdfApi;
