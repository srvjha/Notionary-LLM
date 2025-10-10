import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
    QDRANT_API_KEY: z.string().min(1),
    QDRANT_URL: z.string().min(1),
    QDRANT_HOST: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_COLLECTION_NAME: z.string().default("qdrantdb"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_COLLECTION_NAME: process.env.NEXT_PUBLIC_COLLECTION_NAME,
  },
});
