import { z } from "zod";

const chatSchema = z.object({
  userQuery: z.string().min(2).max(10000),
  userSessionId: z
    .string({ message: "x-user-session header is required" })
    .uuid("Invalid session id"),
});

// types
type ChatData = z.infer<typeof chatSchema>;

const validateChat = (data: ChatData) => {
  return chatSchema.safeParse(data);
};

export { validateChat };
