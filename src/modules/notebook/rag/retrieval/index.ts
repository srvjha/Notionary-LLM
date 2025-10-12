"use server";
import { env } from "@/lib/env";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { convertToModelMessages, streamText, UIMessage } from "ai";


export const chat = async (messages: UIMessage[], chatSessionId: string) => {
  const userLastMessage = messages[messages.length - 1];
  const userQuery =
    userLastMessage.parts.find((p) => p.type === "text")?.text ?? "";

  const embeddings = new OpenAIEmbeddings({
    apiKey:env.OPENAI_API_KEY,
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: env.QDRANT_URL,
      apiKey: env.QDRANT_API_KEY,
      collectionName: `${env.NEXT_PUBLIC_COLLECTION_NAME}-${chatSessionId}`,
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

  const response = streamText({
    model: "gpt-4.1",
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    
  });

  return response;
};
