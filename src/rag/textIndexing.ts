import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const textIndexing = async (userInput: string, collectionName: string) => {
  // 1. Split text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // max characters per chunk
    chunkOverlap: 200, // overlap between chunks
  });

  const docs = await splitter.createDocuments([userInput]);

  // 2. Embed chunks
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "models/embedding-001", // Correct Gemini embeddings model
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: collectionName,
  });

  return true;
};
