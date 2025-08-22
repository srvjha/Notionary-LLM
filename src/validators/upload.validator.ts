import { z } from "zod";

const uploadPDFSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "File must be a PDF",
  }),
});

const uploadWebsiteURLSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

const uploadTextSchema = z.object({
  text: z.string().min(2).max(10000),
  collectionName: z.string().optional(),
});

const uploadYoutubeSchema = z.object({
  url: z.string().url({ message: "Invalid YouTube URL" }),
});

// types
type UploadPDFData = z.infer<typeof uploadPDFSchema>;
type UploadWebsiteURLData = z.infer<typeof uploadWebsiteURLSchema>;
type UploadTextData = z.infer<typeof uploadTextSchema>;
type UploadYoutubeData = z.infer<typeof uploadYoutubeSchema>;

const validateUploadPDF = (data: UploadPDFData) => {
  return uploadPDFSchema.safeParse(data);
};

const validateUploadWebsiteURL = (data: UploadWebsiteURLData) => {
  return uploadWebsiteURLSchema.safeParse(data);
};

const validateUploadText = (data: UploadTextData) => {
  return uploadTextSchema.safeParse(data);
};

const validateUploadYoutubeURL = (data: UploadYoutubeData) => {
  return uploadYoutubeSchema.safeParse(data);
};

export {
  validateUploadPDF,
  validateUploadWebsiteURL,
  validateUploadText,
  validateUploadYoutubeURL,
};
