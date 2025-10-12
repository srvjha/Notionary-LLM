import { z } from "zod";

const pdfIndexingSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "File must be a PDF",
  }),
  chatSessionId: z
    .string({ message: "session id is required" })
    
    ,
});

const websiteIndexingSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  chatSessionId: z
     .string({ message: "session id is required" })
});

const textIndexingSchema = z.object({
  text: z.string().min(2).max(10000),
  chatSessionId: z
     .string({ message: "session id is required" })
});



const youtubeIndexingSchema = z.object({
  url: z.string().url({ message: "Invalid YouTube URL" }),
  chatSessionId: z
    .string({ message: "session id is required" })
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
