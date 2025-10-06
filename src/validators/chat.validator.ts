import { z } from "zod";

const chatSchema = z.object({
  userQuery: z.string().min(2).max(10000),
  userSessionId: z
    .string({ message: "session-id header is required" })
});

// types
type ChatData = z.infer<typeof chatSchema>;

const validateChat = (data: ChatData) => {
  return chatSchema.safeParse(data);
};

export { validateChat };
