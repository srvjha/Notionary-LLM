import { z } from "zod";

const pdfIndexingSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "File must be a PDF",
  }),
  userSessionId: z
    .string({ message: "x-user-session header is required" })
    .uuid("Invalid session id")
    ,
});

const websiteIndexingSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  userSessionId: z
    .string({ message: "x-user-session header is required" })
    .uuid("Invalid session id"),
});

const textIndexingSchema = z.object({
  text: z.string().min(2).max(10000),
  userSessionId: z
    .string({ message: "x-user-session header is required" })
    .uuid("Invalid session id"),
});



const youtubeIndexingSchema = z.object({
  url: z.string().url({ message: "Invalid YouTube URL" }),
  userSessionId: z
    .string({ message: "x-user-session header is required" })
    .uuid("Invalid session id"),
});

// types
type PdfIndexingData = z.infer<typeof pdfIndexingSchema>;
type WebsiteIndexingData = z.infer<typeof websiteIndexingSchema>;
type TextIndexingData = z.infer<typeof textIndexingSchema>;
type YoutubeIndexingData = z.infer<typeof youtubeIndexingSchema>;

const validatePDFIndexing = (data: PdfIndexingData) => {
  return pdfIndexingSchema.safeParse(data);
};

const validateWebsiteIndexing = (data: WebsiteIndexingData) => {
  return websiteIndexingSchema.safeParse(data);
};

const validateTextIndexing = (data: TextIndexingData) => {
  return textIndexingSchema.safeParse(data);
};

const validateYoutubeIndexing = (data: YoutubeIndexingData) => {
  return youtubeIndexingSchema.safeParse(data);
};

export {
  validatePDFIndexing,
  validateWebsiteIndexing,
  validateTextIndexing,
  validateYoutubeIndexing,
};
