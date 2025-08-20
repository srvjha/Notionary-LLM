import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI();
export const chat = async (userQuery: string, collectionName: string) => {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "models/embedding-001", // Correct Gemini embeddings model
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName,
      
    });

  const vectorRetriver = vectorStore.asRetriever({
    k: 3,
  });

  const relevantChunks = await vectorRetriver.invoke(userQuery);

  const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving user query based on 
    the context available to you from a PDF file with the content and page number.

    Only ans based on the available context from file only.
    
    Context:
    ${JSON.stringify(relevantChunks)}
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
  });

  const modelResponse = response.choices[0].message.content;
  return modelResponse;
};
