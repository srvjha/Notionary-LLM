import { SourceType } from "@prisma/client";

export interface ContextSourceInput {
  title: string;
  sourceType: SourceType;
  size?: number;
  charLength?: number;
  url?: string;
  qdrantCollection: string; 
}

export interface ContextIndexingType {
  source: ContextSourceInput;
  chatSessionId: string;
}