"use server";

import { type z } from "zod";
import { addCategorySchema, removeCategorySchema } from "./schemas";
import { prisma } from "@/server/db";

export const addCategory = async (input: z.infer<typeof addCategorySchema>) => {
  const data = await addCategorySchema.parse(input);
  await prisma.category.create({ data });
  return data;
};

export const removeCategory = async (
  input: z.infer<typeof removeCategorySchema>,
) => {
  const data = await removeCategorySchema.parse(input);
  await prisma.category.delete({ where: { id: data.id } });
  return data;
};
