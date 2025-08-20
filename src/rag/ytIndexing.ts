import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const ytIndexing = async (url: string, collectionName: string) => {
  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });

  //page by page load the pdf file
  const docs = await loader.load();

  // ready the openAI embedding model
  //  const embeddings = new OpenAIEmbeddings({
  //   model: "text-embedding-3-large",
  // });
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "models/embedding-001", // Correct Gemini embeddings model
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName,
  });

  console.log("Indexing done")

  return true;
};
