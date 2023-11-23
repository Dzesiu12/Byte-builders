import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  parentId: z.string().nullable(),
});

export const addCategoryFormSchema = z.object({
  name: z.string().min(1),
});

export const removeCategorySchema = z.object({
  id: z.string(),
});
