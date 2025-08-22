import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantClient } from "@qdrant/js-client-rest";
import crypto from "crypto";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ApiError } from "@/utils/ApiError";
import { OpenAIEmbeddings } from "@langchain/openai";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const ytIndexing = async (url: string, userSessionId: string) => {
  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });

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
  //   apiKey: process.env.GEMINI_API_KEY,
  //   model: "models/embedding-001",
  // });

  await QdrantVectorStore.fromDocuments(newDocs, embeddings, {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: `notecast-${userSessionId}`,
  });

  await client.createPayloadIndex(`notecast-${userSessionId}`, {
    field_name: "fileID",
    field_schema: { type: "keyword" },
  });

  return fileID;
};
