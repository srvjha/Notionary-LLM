import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export const indexing = async (pdf: File,collectionName:string) => {
  const loader = new PDFLoader(pdf);

  //page by page load the pdf file
  const docs = await loader.load();

  // ready the openAI embedding model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: "http://localhost:6333",
    collectionName,
  });

  return true
};
