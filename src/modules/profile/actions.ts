"use server";

import { type z } from "zod";
import { type createAdFormSchema } from "./schemas";
import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

export const createAd = async (data: z.infer<typeof createAdFormSchema>) => {
  const session = await getAppServerAuthSession();
  if (!session) return null;

  const ad = await prisma.ad.create({
    data: {
      title: data.name,
      description: data.description,
      price: data.price,
      negotiable: data.negotiable,
      userId: session.user.id,
      conditionId: data.conditionId,
      categoryId: data.categoryId,
      contactData: {
        create: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phoneNumber,
        },
      },
    },
  });

  return ad.id;
};

export const updateAd = async (
  id: string,
  data: z.infer<typeof createAdFormSchema>
) => {
  const session = await getAppServerAuthSession();
  if (!session) return null;

  const ad = await prisma.ad.update({
    where: { id },
    data: {
      title: data.name,
      description: data.description,
      price: data.price,
      negotiable: data.negotiable,
      conditionId: data.conditionId,
      categoryId: data.categoryId,
      contactData: {
        update: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phoneNumber,
        },
      },
    },
  });

  return ad.id;
};

export const getCategoryParameters = async (categoryId: string) => {
  const session = await getAppServerAuthSession();
  if (!session) return null;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { parameters: true },
  });

  return category?.parameters;
};
