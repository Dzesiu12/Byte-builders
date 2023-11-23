import { z } from "zod";

export const sendMessageSchema = z.object({
  chatId: z.string(),
  message: z.string().min(1).max(1000),
});

export const sendMessageFormSchema = z.object({
  message: z.string().min(1).max(1000),
});
