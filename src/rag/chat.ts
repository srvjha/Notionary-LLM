// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI();
export const chat = async (userQuery: string, userSessionId: string) => {
  // const embeddings = new GoogleGenerativeAIEmbeddings({
  //   apiKey: process.env.GEMINI_API_KEY,
  //   model: "models/embedding-001", // Correct Gemini embeddings model
  // });

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: `notecast-${userSessionId}`,
    }
  );

  const vectorRetriver = vectorStore.asRetriever({
    k: 3,
  });

  const relevantChunks = await vectorRetriver.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are an AI Assistent who helps resolving user query based on the given content available like pdf, youtube video , website content or simple text.

    - When User says "Hi" or "Hello" without any context, respond with a friendly greeting and ask them to provide more details or a specific source to assist them better.
    - Information should be within the context.
    - Share reference line no, file page no or any relevant information from the metadata which that from where this information is taken.
    - reference should be at last in the response.
    - Only return file type and page number reference or line number for the reference ( don't return comlete file path or file name)
   
    
    Context:
    ${JSON.stringify(relevantChunks)}
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
  });

  const modelResponse = response.choices[0].message.content;
  return modelResponse;
};
