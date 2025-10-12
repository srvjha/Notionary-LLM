'use server'
import { ApiError } from "@/utils/ApiError";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import crypto from "crypto";
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "@/lib/env";

const client = new QdrantClient({
  url: env.QDRANT_URL,
  apiKey: env.QDRANT_API_KEY,
});

export const pdfIndexing = async (pdf: File, chatSessionId: string) => {
  const loader = new PDFLoader(pdf);

  //page by page load the pdf file
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  if (!splitDocs || splitDocs.length === 0) {
    // return res.status(400).json({ error: 'No content could be extracted from the file' });
    throw new ApiError("No content could be extracted from the file", 400);
  }

  const fileID = crypto.randomBytes(5).toString("hex");
  const newDocs = await splitDocs.map((chunk) => ({
    ...chunk,
    metadata: {
      ...chunk.metadata,
      fileID,
    },
  }));
  // ready the openAI embedding model
   const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });
  // const embeddings = new GoogleGenerativeAIEmbeddings({
  //   apiKey: env.GEMINI_API_KEY,
  //   model: "models/embedding-001",
  // });

  await QdrantVectorStore.fromDocuments(newDocs, embeddings, {
    url: env.QDRANT_URL,
    apiKey: env.QDRANT_API_KEY,
    collectionName: `${env.NEXT_PUBLIC_COLLECTION_NAME}-${chatSessionId}`,
  });

  await client.createPayloadIndex(`notionary-${chatSessionId}`, {
    field_name: "fileID",
    field_schema: { type: "keyword" },
  });

  return fileID;
};
