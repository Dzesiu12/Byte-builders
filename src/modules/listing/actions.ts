"use server";

import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

export const createChat = async (adId: string) => {
  const session = await getAppServerAuthSession();
  if (!session) return null;

  const ad = await prisma.ad.findFirst({
    where: { id: adId },
  });

  if (!ad) return null;

  const existingChat = await prisma.chat.findFirst({
    where: { AND: [{ creatorId: session.user.id }, { adId }] },
  });

  if (existingChat) return existingChat.id;

  const newChat = await prisma.chat.create({
    data: {
      adId,
      ownerId: ad.userId,
      creatorId: session.user.id,
    },
  });

  return newChat.id;
};
