
import { APIResponse, ChatUploadType } from "@/types/chat.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

let sessionId: string | null = null;
if (typeof window !== "undefined") {
  sessionId = localStorage.getItem("userSessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("userSessionId", sessionId);
  }
}

export const pdfApi = createApi({
  reducerPath: "pdfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      if (sessionId) {
        headers.set("x-user-session", sessionId);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    uploadPdf: builder.mutation<APIResponse, FormData>({
      query: (formData) => ({
        url: "fileIndexing", // /api/fileIndexing
        method: "POST",
        body: formData,
      }),
    }),
    uploadWebsite: builder.mutation<APIResponse, FormData>({
      query: (formData) => ({
        url: "webIndexing", // /api/webIndexing
        method: "POST",
        body: formData,
      }),
    }),
    uploadText: builder.mutation<APIResponse, FormData>({
      query: (formData) => ({
        url: "textIndexing", // /api/textIndexing
        method: "POST",
        body: formData,
      }),
    }),

    uploadYoutube: builder.mutation<APIResponse, FormData>({
      query: (formData) => ({
        url: "ytIndexing", // /api/ytIndexing
        method: "POST",
        body: formData,
      }),
    }),

    chatWithDocs: builder.mutation<APIResponse, ChatUploadType>({
      query: (body) => ({
        url: "chat", // /api/chat
        method: "POST",
        body,
      }),
    }),

    deleteSource: builder.mutation<APIResponse, { fileID: string }>({
      query: ({ fileID }) => ({
        url: "deleteFile", // /api/deleteFile
        method: "DELETE",
        body: { fileID },
      }),
    }),
  }),
});

export const {
  useUploadPdfMutation,
  useUploadWebsiteMutation,
  useUploadTextMutation,
  useUploadYoutubeMutation,
  useChatWithDocsMutation,
  useDeleteSourceMutation,
} = pdfApi;
