"use server";

import { type z } from "zod";
import { prisma } from "@/server/db";
import { getAppServerAuthSession } from "@/server/auth";
import { type sendMessageSchema } from "./schemas";

export const sendMessage = async (data: z.infer<typeof sendMessageSchema>) => {
  const session = await getAppServerAuthSession();
  if (!session) return null;

  await prisma.message.create({
    data: {
      senderId: session.user.id,
      content: data.message,
      chatId: data.chatId,
    },
  });
};
