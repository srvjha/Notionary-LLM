import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export const indexing = async (pdf: File,collectionName:string) => {
  const loader = new PDFLoader(pdf);

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


  return true
};
